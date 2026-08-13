import {EmailConfigurationError} from '@/lib/email/types'

export function getSubscriptionMode() {
  return process.env.SUBSCRIPTION_EMAIL_MODE?.trim().toLowerCase() === 'live' ? 'live' : 'disabled'
}

export function requireSubscriptionValue(name: string) {
  const value = process.env[name]?.trim()
  if (!value) throw new EmailConfigurationError(`${name} is not configured.`)
  if (value.includes('\r') || value.includes('\n')) {
    throw new EmailConfigurationError(`${name} contains an invalid line break.`)
  }
  return value
}

export function getSubscriptionConfiguration() {
  return {
    confirmationSecret: requireSubscriptionValue('SUBSCRIPTION_CONFIRMATION_SECRET'),
    contactsApiKey: requireSubscriptionValue('RESEND_CONTACTS_API_KEY'),
    from: requireSubscriptionValue('SUBSCRIPTION_FROM_EMAIL'),
    replyTo: requireSubscriptionValue('SUBSCRIPTION_REPLY_TO_EMAIL'),
    resendApiKey: requireSubscriptionValue('RESEND_API_KEY'),
    segmentId: requireSubscriptionValue('RESEND_UPDATES_SEGMENT_ID'),
    topicId: requireSubscriptionValue('RESEND_UPDATES_TOPIC_ID'),
  }
}
