import assert from 'node:assert/strict'
import test from 'node:test'

import type {EnquirySubmission} from '@/lib/enquiry/types'

import {createEnquiryEmails} from './enquiry-emails'
import {emailHeading, emailParagraph, renderEmailShell} from './email-shell'
import {createSubscriptionConfirmationEmail, createSubscriptionWelcomeEmail} from './subscription-emails'
import type {EmailBrand} from './types'

const brand: EmailBrand = {
  contactEmail: 'mail@joshuaspoint.com',
  location: 'Calango, Zamboanguita, Negros Oriental, Philippines',
  logoUrl: 'https://joshuaspoint.com/brand/logo-light.png',
  siteName: "Joshua's Point",
  siteUrl: 'https://joshuaspoint.com',
  socialLinks: [
    {label: 'Facebook', url: 'https://www.facebook.com/joshuaspoint'},
    {label: 'Instagram', url: 'https://www.instagram.com/joshuaspoint'},
  ],
}

const enquiry: EnquirySubmission = {
  arrivalDate: '2026-11-12',
  departureDate: '2026-11-16',
  email: 'alex@example.com',
  guests: 4,
  message: 'We are planning a quiet stay.',
  name: 'Alex Morgan',
  phone: '+63 912 345 6789',
}

function relativeLuminance(hex: string) {
  const channels = hex
    .match(/[\da-f]{2}/gi)
    ?.map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    )

  assert.ok(channels)
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background))
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background))
  return (lighter + 0.05) / (darker + 0.05)
}

const [internalNotification, guestConfirmation] = createEnquiryEmails({
  brand,
  enquiry,
  from: "Joshua's Point <enquiries@updates.joshuaspoint.com>",
  internalRecipient: brand.contactEmail,
  replyTo: brand.contactEmail,
})

const subscriptionConfirmation = createSubscriptionConfirmationEmail({
  brand,
  confirmationUrl:
    'https://joshuaspoint.com/api/subscriptions/confirm?token=owner-preview-not-valid',
  email: enquiry.email,
  from: "Joshua's Point <updates@updates.joshuaspoint.com>",
  replyTo: brand.contactEmail,
})

const welcome = createSubscriptionWelcomeEmail({
  brand,
  email: enquiry.email,
  from: "Joshua's Point <updates@updates.joshuaspoint.com>",
  replyTo: brand.contactEmail,
})

const broadcastBase = renderEmailShell({
  brand,
  content: [
    emailHeading('A note from Joshua’s Point'),
    emailParagraph('Sample editorial content for the shared updates visual language.'),
  ].join(''),
  preheader: 'Sample Joshua’s Point update.',
  purpose: 'subscription',
})

const templates = [
  ['internal enquiry notification', internalNotification.html],
  ['guest enquiry confirmation', guestConfirmation.html],
  ['subscription confirmation', subscriptionConfirmation.html],
  ['welcome email', welcome.html],
  ['newsletter/broadcast base', broadcastBase],
] as const

test('all email templates use accessible and recognizable footer links', () => {
  for (const [name, html] of templates) {
    assert.ok(html, `${name} must include HTML`)
    const footer = html.slice(html.indexOf('<tr><td class="email-footer"'))
    const footerLinks = [...footer.matchAll(/<a class="email-link footer-link"[^>]+>/g)]

    assert.ok(footerLinks.length >= 3, `${name} must use the complete shared footer hierarchy`)
    for (const [anchor] of footerLinks) {
      assert.match(anchor, /color:#f3ede6!important/)
      assert.match(anchor, /font-weight:600/)
      assert.match(anchor, /text-decoration:underline/)
      assert.match(anchor, /text-decoration-color:#c8a26a/)
    }
  }
})

test('email palette meets WCAG AA contrast thresholds', () => {
  const normalTextPairs = [
    ['#282828', '#faf7f2'],
    ['#1f3d3a', '#faf7f2'],
    ['#496b5b', '#faf7f2'],
    ['#f3ede6', '#1f3d3a'],
    ['#d8cec0', '#14211f'],
    ['#f3ede6', '#14211f'],
    ['#f3ede6', '#202420'],
    ['#e7c78f', '#202420'],
    ['#d8b77e', '#202420'],
  ] as const

  for (const [foreground, background] of normalTextPairs) {
    assert.ok(
      contrastRatio(foreground, background) >= 4.5,
      `${foreground} on ${background} must meet WCAG AA`,
    )
  }
})

test('the shared shell keeps email-client accessibility fallbacks', () => {
  for (const [name, html] of templates) {
    assert.ok(html, `${name} must include HTML`)
    assert.match(html, /name="x-apple-disable-message-reformatting"/)
    assert.match(html, /name="color-scheme" content="light dark"/)
    assert.match(html, /\[data-ogsc\] \.email-footer/)
    assert.match(html, /<!--\[if mso\]>/)
    assert.match(html, /<table[^>]+role="presentation"/)
    assert.match(html, /<img[^>]+alt="Joshua&#039;s Point"/)
  }

  assert.match(subscriptionConfirmation.html ?? '', /mso-padding-alt:12px 22px/)
  assert.match(welcome.html ?? '', /mso-padding-alt:12px 22px/)
})
