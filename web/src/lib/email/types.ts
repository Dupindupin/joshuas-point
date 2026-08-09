export type EmailMessage = {
  from: string
  replyTo?: string
  subject: string
  text: string
  to: readonly string[]
}

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
