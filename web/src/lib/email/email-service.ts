import {ResendEmailService} from './resend-email-service'
import {EmailConfigurationError, type EmailService} from './types'

export type EnquiryEmailConfiguration = {
  from: string
  replyTo: string
  service: EmailService
  to: string
}

const plainEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function requireEnvironmentValue(name: string) {
  const value = process.env[name]?.trim()
  if (!value) throw new EmailConfigurationError(`${name} is not configured.`)
  if (value.includes('\r') || value.includes('\n')) {
    throw new EmailConfigurationError(`${name} contains an invalid line break.`)
  }
  return value
}

function requireEmailAddress(name: string) {
  const value = requireEnvironmentValue(name)
  if (!plainEmailPattern.test(value) || value.length > 254) {
    throw new EmailConfigurationError(`${name} is not a valid email address.`)
  }
  return value
}

export function getEnquiryEmailConfiguration(): EnquiryEmailConfiguration {
  const provider = requireEnvironmentValue('ENQUIRY_EMAIL_PROVIDER').toLowerCase()
  const from = requireEnvironmentValue('ENQUIRY_FROM_EMAIL')
  const to = requireEmailAddress('ENQUIRY_TO_EMAIL')
  const replyTo = requireEmailAddress('ENQUIRY_REPLY_TO_EMAIL')

  if (from.length > 320) {
    throw new EmailConfigurationError('ENQUIRY_FROM_EMAIL is too long.')
  }

  switch (provider) {
    case 'resend':
      return {
        from,
        replyTo,
        service: new ResendEmailService(requireEnvironmentValue('RESEND_API_KEY')),
        to,
      }
    default:
      throw new EmailConfigurationError(
        `The configured enquiry email provider is not supported by this deployment.`,
      )
  }
}
