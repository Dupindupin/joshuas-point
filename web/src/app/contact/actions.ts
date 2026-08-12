'use server'

import {headers} from 'next/headers'

import {createEnquiryEmails} from '@/lib/email/enquiry-emails'
import {getEnquiryEmailConfiguration, getEnquiryEmailMode} from '@/lib/email/email-service'
import {EmailConfigurationError} from '@/lib/email/types'
import {checkEnquiryRateLimit, hashEnquiryValue} from '@/lib/enquiry/rate-limit'
import type {EnquiryFormState} from '@/lib/enquiry/types'
import {validateEnquiryForm} from '@/lib/enquiry/validation'

function errorState(
  message: string,
  fieldErrors?: EnquiryFormState['fieldErrors'],
): EnquiryFormState {
  return {fieldErrors, message, status: 'error'}
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
    const configuration = getEnquiryEmailConfiguration()
    const messages = createEnquiryEmails({
      enquiry: validation.data,
      from: configuration.from,
      internalRecipient: configuration.to,
      replyTo: configuration.replyTo,
    })

    await configuration.service.sendBatch({
      idempotencyKey: `jp-enquiry-${fingerprint}`,
      messages,
    })

    return {
      message: 'Thank you. Your enquiry has been sent, and a confirmation is on its way.',
      status: 'success',
    }
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      console.error('Enquiry email delivery is not configured correctly.')
      return errorState(
        'We could not send your enquiry just now. Nothing was stored. Please wait a moment and try again.',
      )
    }

    console.error('Enquiry email delivery failed without storing the submission.')
    return errorState(
      'We could not send your enquiry just now. Nothing was stored. Please wait a moment and try again.',
    )
  }
}
