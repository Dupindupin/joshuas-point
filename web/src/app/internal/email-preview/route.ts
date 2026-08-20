import {cookies} from 'next/headers'

import {
  comingSoonAccessCookie,
  createComingSoonAccessValue,
  getComingSoonBypassSecret,
  securelyMatches,
} from '@/lib/coming-soon'
import {getEmailBrand} from '@/lib/email/email-brand'
import {createEnquiryEmails} from '@/lib/email/enquiry-emails'
import {
  createSubscriptionConfirmationEmail,
  createSubscriptionWelcomeEmail,
} from '@/lib/email/subscription-emails'
import type {EmailMessage} from '@/lib/email/types'
import type {EnquirySubmission} from '@/lib/enquiry/types'

export const dynamic = 'force-dynamic'

const responseHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'Content-Type': 'text/html; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
} as const

const sampleEnquiry: EnquirySubmission = {
  arrivalDate: '2026-11-12',
  departureDate: '2026-11-16',
  email: 'alex@example.com',
  guests: 4,
  message:
    'We are planning a quiet stay and would love to spend time around the house, the coast and Southern Negros. Please let us know whether these dates may be available.',
  name: 'Alex Morgan',
  phone: '+63 912 345 6789',
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function renderPreviewCard({
  description,
  id,
  message,
  title,
}: {
  description: string
  id: string
  message: EmailMessage
  title: string
}) {
  return `
    <section class="preview-card" id="${escapeHtml(id)}">
      <div class="preview-card__header">
        <div>
          <p class="eyebrow">${escapeHtml(description)}</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
        <dl>
          <div><dt>Subject</dt><dd>${escapeHtml(message.subject)}</dd></div>
          <div><dt>Sample recipient</dt><dd>${escapeHtml(message.to.join(', '))}</dd></div>
        </dl>
      </div>
      <iframe
        aria-label="${escapeHtml(title)} email preview"
        loading="lazy"
        sandbox=""
        srcdoc="${escapeHtml(message.html ?? '')}"
        title="${escapeHtml(title)} email preview"
      ></iframe>
    </section>`
}

function renderPreviewPage(messages: {
  guestConfirmation: EmailMessage
  internalNotification: EmailMessage
  subscriptionConfirmation: EmailMessage
  welcome: EmailMessage
}) {
  const previews = [
    {
      description: 'Transactional · guest-facing',
      id: 'guest-confirmation',
      message: messages.guestConfirmation,
      title: 'Guest enquiry confirmation',
    },
    {
      description: 'Transactional · owner-facing',
      id: 'internal-notification',
      message: messages.internalNotification,
      title: 'Internal enquiry notification',
    },
    {
      description: 'Subscription · confirmation',
      id: 'subscription-confirmation',
      message: messages.subscriptionConfirmation,
      title: 'Subscription confirmation',
    },
    {
      description: 'Subscription · welcome',
      id: 'welcome-email',
      message: messages.welcome,
      title: 'Welcome email',
    },
  ]

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta content="noindex, nofollow, noarchive, nosnippet" name="robots">
    <title>Email template preview — Joshua's Point</title>
    <style>
      :root { color-scheme: light; --canvas: #f3ede6; --ink: #282828; --ocean: #1f3d3a; --sand: #c8a26a; --surface: #fffaf4; }
      * { box-sizing: border-box; }
      html { scroll-behavior: smooth; }
      body { margin: 0; background: var(--canvas); color: var(--ink); font-family: Arial, Helvetica, sans-serif; line-height: 1.5; }
      a { color: var(--ocean); }
      a:focus-visible { outline: 3px solid var(--sand); outline-offset: 4px; }
      header { padding: 64px 24px 42px; background: var(--ocean); color: #f3ede6; }
      header > div, main { width: min(1120px, 100%); margin: 0 auto; }
      header p { max-width: 700px; margin: 16px 0 0; color: #f3ede6; }
      h1, h2 { font-family: Georgia, 'Times New Roman', serif; font-weight: 400; }
      h1 { margin: 0; font-size: clamp(2.25rem, 6vw, 4.25rem); line-height: 1.04; }
      h2 { margin: 4px 0 0; color: var(--ocean); font-size: clamp(1.5rem, 3vw, 2.1rem); line-height: 1.15; }
      .notice { display: inline-flex; align-items: center; gap: 10px; margin-top: 24px; padding: 10px 14px; border: 1px solid rgba(243, 237, 230, .38); border-radius: 999px; font-size: .82rem; letter-spacing: .05em; text-transform: uppercase; }
      .notice::before { width: 8px; height: 8px; border-radius: 50%; background: var(--sand); content: ''; }
      nav { padding: 24px; background: rgba(255, 250, 244, .72); border-bottom: 1px solid rgba(31, 61, 58, .14); }
      nav ul { display: flex; flex-wrap: wrap; width: min(1120px, 100%); margin: 0 auto; padding: 0; gap: 10px 24px; list-style: none; }
      nav a { font-size: .9rem; text-underline-offset: 4px; }
      main { padding: 56px 24px 88px; }
      .preview-card { overflow: hidden; margin-bottom: 52px; background: var(--surface); border: 1px solid rgba(31, 61, 58, .14); border-radius: 18px; box-shadow: 0 18px 50px rgba(31, 61, 58, .08); }
      .preview-card__header { display: grid; grid-template-columns: minmax(0, 1fr) minmax(280px, .8fr); gap: 28px; padding: 30px 34px; border-bottom: 1px solid rgba(31, 61, 58, .12); }
      .eyebrow { margin: 0; color: #496b5b; font-size: .72rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
      dl { margin: 0; font-size: .84rem; }
      dl div + div { margin-top: 10px; }
      dt { color: #496b5b; font-size: .68rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
      dd { margin: 2px 0 0; overflow-wrap: anywhere; }
      iframe { display: block; width: 100%; height: 840px; border: 0; background: #f3ede6; }
      footer { padding: 0 24px 48px; color: #496b5b; text-align: center; font-size: .82rem; }
      @media (max-width: 680px) {
        header { padding: 42px 20px 32px; }
        nav { padding: 20px; }
        nav ul { display: grid; gap: 8px; }
        main { padding: 34px 12px 64px; }
        .preview-card { margin-bottom: 30px; border-radius: 12px; }
        .preview-card__header { grid-template-columns: 1fr; padding: 24px 20px; }
        iframe { height: 760px; }
      }
      @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
    </style>
  </head>
  <body>
    <header>
      <div>
        <h1>Email template preview</h1>
        <p>The real Joshua's Point email shell rendered with sample information for internal review.</p>
        <div class="notice">Owner-only preview · nothing is sent</div>
      </div>
    </header>
    <nav aria-label="Email previews">
      <ul>
        ${previews.map(({id, title}) => `<li><a href="#${escapeHtml(id)}">${escapeHtml(title)}</a></li>`).join('')}
      </ul>
    </nav>
    <main>
      ${previews.map(renderPreviewCard).join('')}
    </main>
    <footer>Sample names, dates, addresses and links are for preview only.</footer>
  </body>
</html>`
}

async function hasOwnerAccess() {
  const secret = getComingSoonBypassSecret()
  const accessCookie = (await cookies()).get(comingSoonAccessCookie)?.value

  if (!secret || !accessCookie) return false

  const expectedAccessValue = await createComingSoonAccessValue(secret)
  return securelyMatches(accessCookie, expectedAccessValue)
}

export async function GET() {
  if (!(await hasOwnerAccess())) {
    return new Response('Not found', {headers: responseHeaders, status: 404})
  }

  const brand = await getEmailBrand()
  const [internalNotification, guestConfirmation] = createEnquiryEmails({
    brand,
    enquiry: sampleEnquiry,
    from: "Joshua's Point <enquiries@updates.joshuaspoint.com>",
    internalRecipient: 'mail@joshuaspoint.com',
    replyTo: 'mail@joshuaspoint.com',
  })
  const sampleSubscription = {
    brand,
    email: sampleEnquiry.email,
    from: "Joshua's Point <updates@updates.joshuaspoint.com>",
    replyTo: 'mail@joshuaspoint.com',
  }

  const subscriptionConfirmation = createSubscriptionConfirmationEmail({
    ...sampleSubscription,
    confirmationUrl:
      'https://joshuaspoint.com/api/subscriptions/confirm?token=owner-preview-not-valid',
  })
  const welcome = createSubscriptionWelcomeEmail(sampleSubscription)

  return new Response(
    renderPreviewPage({
      guestConfirmation,
      internalNotification,
      subscriptionConfirmation,
      welcome,
    }),
    {headers: responseHeaders, status: 200},
  )
}
