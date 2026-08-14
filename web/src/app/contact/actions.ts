'use server'

import {headers} from 'next/headers'

import {createEnquiryEmails} from '@/lib/email/enquiry-emails'
import {getEnquiryEmailConfiguration, getEnquiryEmailMode} from '@/lib/email/email-service'
import {getEmailBrand} from '@/lib/email/email-brand'
import {EmailConfigurationError} from '@/lib/email/types'
import {validateEnquiryAvailability} from '@/lib/enquiry/availability-validation'
import {checkEnquiryRateLimit, hashEnquiryValue} from '@/lib/enquiry/rate-limit'
import type {EnquiryFormState} from '@/lib/enquiry/types'
import {validateEnquiryForm} from '@/lib/enquiry/validation'
import {
  buildStayEnquiryRecord,
  recordAndDeliverEnquiry,
  type OperationsWarning,
} from '@/lib/operations/enquiry-recording'
import {getStayEnquiryRepository} from '@/lib/operations/sanity-stay-enquiry-repository'
import {getCurrentPublicHouseAvailability} from '@/sanity/queries/house-availability'

function errorState(
  message: string,
  fieldErrors?: EnquiryFormState['fieldErrors'],
): EnquiryFormState {
  return {fieldErrors, message, status: 'error'}
}

function reportOperationsWarning(warning: OperationsWarning) {
  console.error('Private enquiry operations warning.', warning)
}

export async function submitEnquiry(
  _previousState: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  if (String(formData.get('website') ?? '').trim()) {
    return {
      message: 'Thank you. Your enquiry has been received.',
      status: 'success',
    }
  }

  if (getEnquiryEmailMode() === 'disabled') {
    return errorState(
      'Online enquiry sending is disabled on this private preview. No message was sent.',
    )
  }

  const validation = validateEnquiryForm(formData)
  if (!validation.success) {
    return errorState('Please review the marked fields and try again.', validation.fieldErrors)
  }

  const requestHeaders = await headers()
  const forwardedAddress = requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim()
  const clientIdentity = [
    forwardedAddress || requestHeaders.get('x-real-ip') || 'unknown-address',
    requestHeaders.get('user-agent') || 'unknown-agent',
  ].join('|')
  const submissionValue = JSON.stringify(validation.data)
  const clientKey = hashEnquiryValue(clientIdentity)
  const fingerprint = hashEnquiryValue(submissionValue)
  const rateLimit = checkEnquiryRateLimit(clientKey, fingerprint)

  if (!rateLimit.allowed) {
    return errorState(
      rateLimit.reason === 'duplicate'
        ? 'This enquiry was already submitted recently. Please wait before trying again.'
        : 'Too many enquiries were submitted from this connection. Please wait and try again later.',
    )
  }

  try {
    const availability = await getCurrentPublicHouseAvailability()
    if (availability) {
      const availabilityValidation = validateEnquiryAvailability(validation.data, availability)
      if (!availabilityValidation.success) {
        return errorState(
          'Please choose dates currently shown as available and try again.',
          availabilityValidation.fieldErrors,
        )
      }
    }
  } catch {
    console.error('Current house availability could not be verified before enquiry delivery.')
    return errorState(
      'We could not verify the latest availability just now. No message was sent. Please try again or write to mail@joshuaspoint.com.',
    )
  }

  const record = buildStayEnquiryRecord({enquiry: validation.data, fingerprint})

  try {
    await recordAndDeliverEnquiry({
      deliver: async () => {
        const configuration = getEnquiryEmailConfiguration()
        const brand = await getEmailBrand()
        const messages = createEnquiryEmails({
          brand,
          enquiry: validation.data,
          from: configuration.from,
          internalRecipient: configuration.to,
          replyTo: configuration.replyTo,
        })

        await configuration.service.sendBatch({
          idempotencyKey: record.idempotencyKey,
          messages,
        })
      },
      record,
      repository: getStayEnquiryRepository(),
      warn: reportOperationsWarning,
    })

    return {
      message: 'Thank you. Your enquiry has been sent, and a confirmation is on its way.',
      status: 'success',
    }
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      console.error('Enquiry email delivery is not configured correctly.')
      return errorState(
        'We could not send your enquiry just now. Please wait a moment and try again.',
      )
    }

    console.error('Enquiry email delivery failed.')
    return errorState(
      'We could not send your enquiry just now. Please wait a moment and try again.',
    )
  }
}
