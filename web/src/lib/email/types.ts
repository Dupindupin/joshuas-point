export type EmailMessage = {
  from: string
  html?: string
  replyTo?: string
  subject: string
  text: string
  to: readonly string[]
}

export type EmailBrand = {
  contactEmail: string
  location: string
  logoUrl: string
  siteName: string
  siteUrl: string
  socialLinks: Array<{label: string; url: string}>
}

export type EmailPurpose = 'subscription' | 'transactional'

export type SendEmailBatchOptions = {
  idempotencyKey: string
  messages: readonly EmailMessage[]
}

export interface EmailService {
  sendBatch(options: SendEmailBatchOptions): Promise<void>
}

export class EmailConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailConfigurationError'
  }
}

export class EmailDeliveryError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'EmailDeliveryError'
  }
}
