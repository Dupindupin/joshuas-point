import {
  createSubscriptionConfirmationEmail,
  createSubscriptionWelcomeEmail,
} from '../src/lib/email/subscription-emails'
import {defaultEmailBrand} from '../src/lib/email/email-shell'
import {createSubscriptionToken, readSubscriptionToken} from '../src/lib/subscriptions/token'

const email = 'tobiassteger@me.com'
const secret = 'test-only-confirmation-secret-that-is-not-used-in-production'
const now = Date.UTC(2026, 7, 13, 12)
const token = createSubscriptionToken(email, secret, now)
const confirmationUrl = `https://joshuaspoint.com/api/subscriptions/confirm?token=${token}`
const messages = [
  createSubscriptionConfirmationEmail({
    brand: defaultEmailBrand,
    confirmationUrl,
    email,
    from: "Joshua's Point <updates@updates.joshuaspoint.com>",
    replyTo: 'mail@joshuaspoint.com',
  }),
  createSubscriptionWelcomeEmail({
    brand: defaultEmailBrand,
    email,
    from: "Joshua's Point <updates@updates.joshuaspoint.com>",
    replyTo: 'mail@joshuaspoint.com',
  }),
]

if (readSubscriptionToken(token, secret, now + 60_000) !== email) {
  throw new Error('A valid subscription token could not be read.')
}
if (readSubscriptionToken(token, `${secret}-wrong`, now) !== null) {
  throw new Error('A subscription token was accepted with the wrong secret.')
}
if (readSubscriptionToken(token, secret, now + 24 * 60 * 60 * 1_000 + 1_000) !== null) {
  throw new Error('An expired subscription token was accepted.')
}

for (const message of messages) {
  if (!message.html || !message.text || message.to[0] !== email) {
    throw new Error(`Subscription email rendering failed for ${message.subject}.`)
  }
  if (message.html.includes('undefined') || message.text.includes('undefined')) {
    throw new Error(`Subscription email contains an unresolved value: ${message.subject}.`)
  }
  process.stdout.write(
    `- ${message.subject}: rendered (${message.html.length} HTML / ${message.text.length} plain-text characters)\n`,
  )
}

process.stdout.write('Subscription token and template checks passed. No email was sent.\n')
