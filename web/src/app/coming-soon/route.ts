import {NextRequest, NextResponse} from 'next/server'

import {getPlausibleConfiguration, type PlausibleConfiguration} from '@/lib/analytics/config'
import {analyticsEvents} from '@/lib/analytics/event-names'
import {
  comingSoonAccessCookie,
  createComingSoonAccessValue,
  getComingSoonBypassSecret,
  securelyMatches,
} from '@/lib/coming-soon'
import {getSiteUrl} from '@/lib/site-url'
import {getSubscriptionMode} from '@/lib/subscriptions/config'

const accessDurationSeconds = 60 * 60 * 24

function pageHeaders(status: number, analytics?: {nonce: string; origin: string}) {
  return {
    'Cache-Control': 'no-store, max-age=0',
    'Content-Security-Policy': `default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; script-src ${analytics ? `'nonce-${analytics.nonce}' ${analytics.origin}` : "'none'"}; connect-src ${analytics ? analytics.origin : "'none'"}; form-action 'self'; base-uri 'none'; frame-ancestors 'none'`,
    'Content-Type': 'text/html; charset=utf-8',
    'Referrer-Policy': 'no-referrer',
    ...(status === 503 ? {'Retry-After': '3600'} : {}),
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex',
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function documentShell(content: string, title: string, analyticsMarkup = '') {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
    <title>${escapeHtml(title)}</title>
    ${analyticsMarkup}
    <style>
      :root {
        color-scheme: light dark;
        --canvas: #f3ede6;
        --surface: #faf7f2;
        --ink: #282828;
        --muted: rgb(40 40 40 / 68%);
        --ocean: #1f3d3a;
        --forest: #496b5b;
        --sand: #c8a26a;
        --line: rgb(31 61 58 / 22%);
      }
      * { box-sizing: border-box; }
      html { min-height: 100%; background: var(--canvas); }
      body {
        min-height: 100vh;
        margin: 0;
        background:
          linear-gradient(90deg, transparent 0 72%, rgb(200 162 106 / 9%) 72% 100%),
          var(--canvas);
        color: var(--ink);
        font-family: Arial, Helvetica, sans-serif;
      }
      main {
        display: grid;
        min-height: 100vh;
        place-items: center;
        padding: clamp(1.5rem, 4vw, 3.5rem);
      }
      .frame {
        width: min(100%, 74rem);
        border: 1px solid var(--line);
        background: color-mix(in srgb, var(--surface) 88%, transparent);
        padding: clamp(2rem, 5vw, 4.75rem);
        box-shadow: 0 2rem 6rem rgb(31 61 58 / 7%);
      }
      picture, img { display: block; }
      .logo {
        width: min(68vw, 25rem);
        height: auto;
        margin: 0;
      }
      .brand-line {
        margin: 1.1rem 0 0;
        color: var(--muted);
        font-size: 0.72rem;
        letter-spacing: 0.12em;
        line-height: 1.6;
        text-transform: uppercase;
      }
      .opening {
        display: grid;
        gap: clamp(2.5rem, 7vw, 6.5rem);
        margin-top: clamp(3.5rem, 9vw, 7.5rem);
      }
      .opening-copy {
        align-self: end;
      }
      .eyebrow {
        margin: 0 0 1.25rem;
        color: var(--forest);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }
      h1 {
        max-width: 12ch;
        margin: 0;
        color: var(--ocean);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(2.8rem, 6.5vw, 5.65rem);
        font-weight: 400;
        letter-spacing: -0.025em;
        line-height: 0.98;
      }
      .introduction {
        max-width: 30rem;
        margin: 0;
        color: var(--muted);
        font-size: clamp(1rem, 2vw, 1.18rem);
        line-height: 1.75;
      }
      .contact {
        display: inline-block;
        margin-top: 1.75rem;
        border-bottom: 1px solid var(--sand);
        color: var(--ocean);
        font-size: 0.83rem;
        letter-spacing: 0.08em;
        padding: 0.35rem 0;
        text-decoration: none;
      }
      .contact:focus-visible, button:focus-visible, input:focus-visible {
        outline: 3px solid var(--sand);
        outline-offset: 4px;
      }
      .subscription a:focus-visible {
        outline: 3px solid var(--sand);
        outline-offset: 3px;
      }
      form {
        display: grid;
        max-width: 25rem;
        gap: 1rem;
        margin: 2.5rem 0 0;
        text-align: left;
      }
      .subscription {
        display: grid;
        gap: 2rem;
        margin: clamp(3.5rem, 8vw, 6.5rem) 0 0;
        border-top: 1px solid var(--line);
        padding-top: clamp(2.5rem, 5vw, 4rem);
      }
      .subscription-heading { max-width: 28rem; }
      .subscription-title {
        margin: 0;
        color: var(--ocean);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(1.8rem, 4vw, 2.7rem);
        font-weight: 400;
        line-height: 1.08;
      }
      .subscription form { margin-top: 1rem; }
      .subscription-note { max-width: 28rem; margin: 1rem 0 0; color: var(--muted); font-size: 0.9rem; line-height: 1.7; }
      .subscription-consent { max-width: 25rem; margin: 1rem 0 0; color: var(--muted); font-size: 0.76rem; line-height: 1.6; }
      .subscription-consent a, .subscription-recovery { color: var(--ocean); text-underline-offset: 0.18em; }
      .subscription-status { max-width: 25rem; margin: 1.25rem 0 0; color: var(--ocean); font-size: 0.95rem; line-height: 1.6; }
      .honeypot { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
      label { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.03em; }
      input {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 0;
        background: rgb(255 255 255 / 45%);
        color: var(--ink);
        font: inherit;
        padding: 0.9rem 1rem;
      }
      button {
        border: 1px solid var(--ocean);
        border-radius: 999px;
        background: var(--ocean);
        color: #f3ede6;
        cursor: pointer;
        font: inherit;
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        min-height: 3rem;
        padding: 0.75rem 1.5rem;
        text-transform: uppercase;
        transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease;
      }
      button:hover { border-color: var(--sand); background: var(--sand); color: #282828; }
      .error { margin: 0; color: #8a4a32; font-size: 0.9rem; line-height: 1.5; }
      .review-frame { max-width: 50rem; text-align: center; }
      .review-frame .logo { margin-inline: auto; }
      .review-frame h1, .review-frame .introduction { margin-inline: auto; }
      .review-frame .eyebrow { margin-top: 3.5rem; }
      .review-frame form { margin-inline: auto; }
      @media (min-width: 48rem) {
        .opening { grid-template-columns: minmax(0, 1.45fr) minmax(18rem, 0.55fr); }
        .subscription { grid-template-columns: minmax(0, 1fr) minmax(19rem, 0.72fr); }
        .subscription form { margin-top: 0; }
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --canvas: #20201f;
          --surface: #282828;
          --ink: #f3ede6;
          --muted: rgb(243 237 230 / 72%);
          --ocean: #f3ede6;
          --forest: #d8b77e;
          --line: rgb(243 237 230 / 18%);
        }
        body {
          background:
            radial-gradient(circle at 82% 14%, rgb(31 61 58 / 45%), transparent 32rem),
            var(--canvas);
        }
        input { background: rgb(255 255 255 / 6%); }
        button { color: #282828; }
      }
      @media (prefers-reduced-motion: no-preference) {
        .frame { animation: reveal 700ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes reveal { from { opacity: 0; transform: translateY(0.65rem); } }
      }
      @media (max-width: 30rem) and (max-height: 56.25rem) {
        main { padding-block: 1.5rem; }
        .frame { padding-block: 2rem; }
        .opening { margin-top: 2.75rem; }
        .contact { margin-top: 1.5rem; }
        .subscription { margin-top: 2.25rem; padding-top: 2.25rem; }
      }
    </style>
  </head>
  <body>
    <main>${content}</main>
  </body>
</html>`
}

function plausibleMarkup(
  configuration: PlausibleConfiguration | null,
  nonce: string,
  subscriptionStatus: string | null,
) {
  if (!configuration) return ''

  const event = JSON.stringify(analyticsEvents.subscriptionConfirmed)
  const confirmedEvent =
    subscriptionStatus === 'confirmed'
      ? `try{if(!sessionStorage.getItem('jp-subscription-confirmed')){window.plausible(${event});sessionStorage.setItem('jp-subscription-confirmed','1')}}catch{window.plausible(${event})}`
      : ''

  return `<script nonce="${nonce}">window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)};${confirmedEvent}</script>
    <script nonce="${nonce}" defer data-domain="${escapeHtml(configuration.domain)}" src="${escapeHtml(configuration.scriptSource)}"></script>`
}

function subscriptionMessage(status: string | null) {
  switch (status) {
    case 'check-email':
      return 'Please check your inbox. If the address is valid, a confirmation link is on its way.'
    case 'confirmed':
      return 'Thank you. Your email is confirmed, and you are now part of Joshua’s Point updates.'
    case 'invalid':
      return 'Please enter a valid email address.'
    case 'invalid-link':
      return 'This confirmation link is invalid or has expired. Please subscribe again.'
    case 'unavailable':
      return 'Email updates are not available just yet. Please try again another time.'
    default:
      return null
  }
}

function comingSoonDocument(
  subscriptionStatus: string | null,
  analytics: PlausibleConfiguration | null,
  nonce: string,
) {
  const message = subscriptionMessage(subscriptionStatus)
  const subscriptionsEnabled = getSubscriptionMode() === 'live'
  return documentShell(
    `<article class="frame" aria-labelledby="coming-soon-title">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="/brand/logo-light.png" />
        <img class="logo" src="/brand/logo-horizontal.png" alt="Joshua's Point" width="1200" height="360" />
      </picture>
      <p class="brand-line">A private whole-house stay in Southern Negros</p>
      <div class="opening">
        <div>
          <p class="eyebrow">Between sea and mountain</p>
          <h1 id="coming-soon-title">A quieter beginning is taking shape.</h1>
        </div>
        <div class="opening-copy">
          <p class="introduction">Joshua’s Point is a private whole-house stay in Zamboanguita. While we prepare the full website, enquiries remain warmly welcome.</p>
          <a class="contact" href="mailto:mail@joshuaspoint.com">mail@joshuaspoint.com</a>
        </div>
      </div>
      ${
        subscriptionsEnabled
          ? `<section class="subscription" aria-labelledby="subscription-title">
        <div class="subscription-heading">
          <p class="eyebrow">Stay in touch</p>
          <h2 class="subscription-title" id="subscription-title">Occasional notes from Joshua’s Point.</h2>
          <p class="subscription-note">Leave your email for a quiet note when the new website is ready. We’ll send one email first to confirm your address.</p>
        </div>
        <div><form action="/api/subscriptions/request" method="post">
          <label for="subscription-email">Email address</label>
          <input id="subscription-email" name="email" type="email" required autocomplete="email" maxlength="254" />
          <div class="honeypot" aria-hidden="true"><label for="subscription-website">Website</label><input id="subscription-website" name="website" type="text" tabindex="-1" autocomplete="off" /></div>
          <button type="submit">Keep me informed</button>
        </form>
        <p class="subscription-consent">By subscribing, you agree to receive occasional Joshua’s Point updates. You can unsubscribe at any time. Read our <a href="/privacy">Privacy information</a>.</p>
        ${message ? `<p class="subscription-status" role="status">${escapeHtml(message)}</p>` : ''}
        ${subscriptionStatus === 'invalid-link' ? '<p class="subscription-consent"><a class="subscription-recovery" href="/coming-soon#subscription-title">Return to the signup form and request a new confirmation email.</a></p>' : ''}
        </div>
      </section>`
          : ''
      }
    </article>`,
    "Joshua's Point — Coming Soon",
    plausibleMarkup(analytics, nonce, subscriptionStatus),
  )
}

function accessDocument(error?: string) {
  return documentShell(
    `<section class="frame review-frame" aria-labelledby="access-title">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="/brand/logo-light.png" />
        <img class="logo" src="/brand/logo-horizontal.png" alt="Joshua's Point" width="1200" height="360" />
      </picture>
      <p class="eyebrow">Internal website review</p>
      <h1 id="access-title">Enter the review password.</h1>
      <p class="introduction">Approved reviewers can continue to the complete website while the public page remains protected.</p>
      <form action="/coming-soon" method="post">
        <label for="review-password">Review password</label>
        <input id="review-password" name="password" type="password" required autocomplete="current-password" />
        ${error ? `<p class="error" role="alert">${escapeHtml(error)}</p>` : ''}
        <button type="submit">Open website</button>
      </form>
    </section>`,
    "Internal Review — Joshua's Point",
  )
}

export function GET(request: NextRequest) {
  const accessRequested = request.nextUrl.searchParams.get('access') === '1'
  const status = accessRequested ? 200 : 503
  const analytics = accessRequested ? null : getPlausibleConfiguration()
  const nonce = crypto.randomUUID()
  const analyticsPolicy = analytics
    ? {nonce, origin: new URL(analytics.scriptSource).origin}
    : undefined

  return new NextResponse(
    accessRequested
      ? accessDocument()
      : comingSoonDocument(request.nextUrl.searchParams.get('subscription'), analytics, nonce),
    {
      headers: pageHeaders(status, analyticsPolicy),
      status,
    },
  )
}

export async function POST(request: NextRequest) {
  const bypassSecret = getComingSoonBypassSecret()
  const formData = await request.formData()
  const suppliedSecret = formData.get('password')
  const suppliedValue = typeof suppliedSecret === 'string' ? suppliedSecret.trim() : ''

  if (!bypassSecret || !suppliedValue) {
    return new NextResponse(accessDocument('Internal review access is not configured.'), {
      headers: pageHeaders(503),
      status: 503,
    })
  }

  const [suppliedAccessValue, expectedAccessValue] = await Promise.all([
    createComingSoonAccessValue(suppliedValue),
    createComingSoonAccessValue(bypassSecret),
  ])

  if (!securelyMatches(suppliedAccessValue, expectedAccessValue)) {
    return new NextResponse(accessDocument('That review password was not accepted.'), {
      headers: pageHeaders(401),
      status: 401,
    })
  }

  const response = NextResponse.redirect(getSiteUrl(), 303)
  response.cookies.set(comingSoonAccessCookie, expectedAccessValue, {
    httpOnly: true,
    maxAge: accessDurationSeconds,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })
  response.headers.set('Cache-Control', 'no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')

  return response
}
