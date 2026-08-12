import {ResendEmailService} from './resend-email-service'
import {EmailConfigurationError, type EmailService} from './types'

export type EnquiryEmailConfiguration = {
  from: string
  replyTo: string
  service: EmailService
  to: string
}

export type EnquiryEmailMode = 'disabled' | 'live' | 'test'

const plainEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function getEnquiryEmailMode(): EnquiryEmailMode {
  const mode = process.env.ENQUIRY_EMAIL_MODE?.trim().toLowerCase()
  if (mode === 'live' || mode === 'test') return mode
  return 'disabled'
}

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

function requireSenderAddress(name: string) {
  const value = requireEnvironmentValue(name)
  const bracketedAddress = value.match(/^.+\s<([^<>]+)>$/)?.[1]?.trim()
  const address = bracketedAddress ?? value

  if (
    value.length > 320 ||
    !plainEmailPattern.test(address) ||
    address.length > 254 ||
    ((value.includes('<') || value.includes('>')) && !bracketedAddress)
  ) {
    throw new EmailConfigurationError(
      `${name} must be an email address or a display name followed by an email address in angle brackets.`,
    )
  }

  return value
}

export function getEnquiryEmailConfiguration(): EnquiryEmailConfiguration {
  if (getEnquiryEmailMode() === 'disabled') {
    throw new EmailConfigurationError('Enquiry email delivery is disabled for this deployment.')
  }

  const provider = requireEnvironmentValue('ENQUIRY_EMAIL_PROVIDER').toLowerCase()
  const from = requireSenderAddress('ENQUIRY_FROM_EMAIL')
  const to = requireEmailAddress('ENQUIRY_TO_EMAIL')
  const replyTo = requireEmailAddress('ENQUIRY_REPLY_TO_EMAIL')

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
