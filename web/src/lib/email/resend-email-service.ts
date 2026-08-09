import {EmailDeliveryError, type EmailService, type SendEmailBatchOptions} from './types'

const RESEND_BATCH_ENDPOINT = 'https://api.resend.com/emails/batch'

export class ResendEmailService implements EmailService {
  constructor(private readonly apiKey: string) {}

  async sendBatch({idempotencyKey, messages}: SendEmailBatchOptions) {
    const response = await fetch(RESEND_BATCH_ENDPOINT, {
      body: JSON.stringify(
        messages.map((message) => ({
          from: message.from,
          ...(message.replyTo ? {reply_to: message.replyTo} : {}),
          subject: message.subject,
          text: message.text,
          to: message.to,
        })),
      ),
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
        'User-Agent': 'joshuas-point-web/1.0',
      },
      method: 'POST',
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      throw new EmailDeliveryError(
        `Resend rejected the email batch with status ${response.status}.`,
      )
    }
  }
}
