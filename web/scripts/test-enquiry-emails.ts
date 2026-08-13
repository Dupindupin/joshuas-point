import {randomUUID} from 'node:crypto'

import {createEnquiryEmails} from '../src/lib/email/enquiry-emails'
import {ResendEmailService} from '../src/lib/email/resend-email-service'

const ownerTestAddress = 'tobiassteger@me.com'
const requiredConfirmation = 'SEND_TO_TOBIAS_ONLY'

function requireEnvironmentValue(name: string) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`${name} is not configured.`)
  if (value.includes('\r') || value.includes('\n')) {
    throw new Error(`${name} contains an invalid line break.`)
  }
  return value
}

const sampleEnquiry = {
  arrivalDate: '2026-11-12',
  departureDate: '2026-11-16',
  email: ownerTestAddress,
  guests: 2,
  message:
    'We are planning a quiet stay and would love to spend time around the house, the coast and nearby nature. Could you let us know whether these dates may be available?',
  name: 'Tobias Test Guest',
  phone: '+63 900 000 0000',
} as const

const sendRequested = process.argv.includes('--send')
const publicEmailMode = process.env.ENQUIRY_EMAIL_MODE?.trim().toLowerCase()

if (sendRequested && publicEmailMode && publicEmailMode !== 'disabled') {
  throw new Error('Refusing to send because ENQUIRY_EMAIL_MODE is not disabled.')
}

const from =
  process.env.ENQUIRY_FROM_EMAIL?.trim() || "Joshua's Point <enquiries@updates.joshuaspoint.com>"
const replyTo = process.env.ENQUIRY_REPLY_TO_EMAIL?.trim() || 'mail@joshuaspoint.com'

const renderedMessages = createEnquiryEmails({
  enquiry: sampleEnquiry,
  from,
  internalRecipient: ownerTestAddress,
  replyTo,
}).map((message) => ({
  ...message,
  subject: `[TEST] ${message.subject}`,
  to: [ownerTestAddress],
}))

for (const message of renderedMessages) {
  if (message.to.length !== 1 || message.to[0] !== ownerTestAddress) {
    throw new Error('The test recipient safety check failed.')
  }
  if (
    !message.subject ||
    !message.text ||
    !message.html ||
    message.text.includes('undefined') ||
    message.html.includes('undefined')
  ) {
    throw new Error(`Template rendering failed for ${message.subject || 'an unnamed message'}.`)
  }
}

process.stdout.write("Joshua's Point enquiry email template test\n")
process.stdout.write(`Mode: ${sendRequested ? 'SEND' : 'DRY RUN'}\n`)
process.stdout.write(`Permitted recipient: ${ownerTestAddress}\n`)
for (const message of renderedMessages) {
  process.stdout.write(
    `- ${message.subject}: rendered (${message.html?.length ?? 0} HTML / ${message.text.length} plain-text characters), reply-to ${message.replyTo}\n`,
  )
}

if (!sendRequested) {
  process.stdout.write('\nDry run complete. No email was sent.\n')
  process.stdout.write(
    `To send, provide RESEND_API_KEY and set EMAIL_TEMPLATE_TEST_CONFIRM=${requiredConfirmation}, then rerun with --send.\n`,
  )
  process.exit(0)
}

if (process.env.EMAIL_TEMPLATE_TEST_CONFIRM !== requiredConfirmation) {
  throw new Error(
    `Refusing to send. EMAIL_TEMPLATE_TEST_CONFIRM must equal ${requiredConfirmation}.`,
  )
}

async function sendTestMessages() {
  const service = new ResendEmailService(requireEnvironmentValue('RESEND_API_KEY'))
  await service.sendBatch({
    idempotencyKey: `jp-owner-email-template-test-${randomUUID()}`,
    messages: renderedMessages,
  })

  process.stdout.write(
    '\nResend accepted both test messages. Public enquiry mode was not changed.\n',
  )
}

sendTestMessages().catch((error) => {
  process.stderr.write(
    `${error instanceof Error ? error.message : 'The owner email template test failed.'}\n`,
  )
  process.exitCode = 1
})
