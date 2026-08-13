import {
  emailButton,
  emailFallbackUrl,
  emailHeading,
  emailParagraph,
  renderEmailShell,
} from './email-shell'
import type {EmailBrand, EmailMessage} from './types'

type SubscriptionEmailOptions = {
  brand: EmailBrand
  email: string
  from: string
  replyTo: string
}

export function createSubscriptionConfirmationEmail({
  brand,
  confirmationUrl,
  email,
  from,
  replyTo,
}: SubscriptionEmailOptions & {confirmationUrl: string}): EmailMessage {
  return {
    from,
    html: renderEmailShell({
      brand,
      content: [
        emailHeading('Confirm your email'),
        emailParagraph(
          'One quiet step before we write: please confirm that you would like to receive occasional news from Joshua’s Point.',
        ),
        emailButton(confirmationUrl, 'Confirm my email'),
        emailFallbackUrl(confirmationUrl),
        emailParagraph(
          'This link is valid for 24 hours. If you did not request it, you can simply ignore this message.',
        ),
      ].join(''),
      preheader: 'Confirm your Joshua’s Point updates subscription.',
      purpose: 'subscription',
    }),
    replyTo,
    subject: 'Confirm your Joshua’s Point updates',
    text: [
      'Please confirm that you would like to receive occasional news from Joshua’s Point.',
      '',
      confirmationUrl,
      '',
      'This link is valid for 24 hours. If you did not request it, you can ignore this message.',
    ].join('\n'),
    to: [email],
  }
}

export function createSubscriptionWelcomeEmail({
  brand,
  email,
  from,
  replyTo,
}: SubscriptionEmailOptions): EmailMessage {
  return {
    from,
    html: renderEmailShell({
      brand,
      content: [
        emailHeading('Welcome to Joshua’s Point'),
        emailParagraph(
          'Thank you for joining us. We will write occasionally with news from the house and the places around Southern Negros that we genuinely enjoy sharing.',
        ),
        emailButton(brand.siteUrl, 'Visit Joshua’s Point'),
        emailParagraph(
          'Every future update will include a simple way to leave the list whenever you wish.',
        ),
        emailParagraph('Warmly,<br>Joshua’s Point'),
      ].join(''),
      preheader: 'A warm welcome from Joshua’s Point.',
      purpose: 'subscription',
    }),
    replyTo,
    subject: 'Welcome to Joshua’s Point',
    text: [
      'Thank you for joining us.',
      '',
      'We will write occasionally with news from the house and the places around Southern Negros that we genuinely enjoy sharing.',
      '',
      brand.siteUrl,
      '',
      'Every future update will include a simple way to leave the list whenever you wish.',
      '',
      'Warmly,',
      'Joshua’s Point',
    ].join('\n'),
    to: [email],
  }
}
