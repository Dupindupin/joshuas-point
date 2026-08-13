import {NextRequest, NextResponse} from 'next/server'

import {
  comingSoonAccessCookie,
  createComingSoonAccessValue,
  getComingSoonBypassSecret,
  securelyMatches,
} from '@/lib/coming-soon'

const accessDurationSeconds = 60 * 60 * 24

function pageHeaders(status: number) {
  return {
    'Cache-Control': 'no-store, max-age=0',
    'Content-Security-Policy':
      "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
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

function documentShell(content: string, title: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
    <title>${escapeHtml(title)}</title>
    <style>
      :root {
        color-scheme: light dark;
        --canvas: #f3ede6;
        --ink: #282828;
        --muted: rgb(40 40 40 / 68%);
        --ocean: #1f3d3a;
        --sand: #c8a26a;
        --line: rgb(31 61 58 / 22%);
      }
      * { box-sizing: border-box; }
      html { min-height: 100%; background: var(--canvas); }
      body {
        min-height: 100vh;
        margin: 0;
        background:
          radial-gradient(circle at 18% 14%, rgb(200 162 106 / 15%), transparent 36rem),
          linear-gradient(145deg, var(--canvas), #f8f4ed 58%, #e9e2d8);
        color: var(--ink);
        font-family: Arial, Helvetica, sans-serif;
      }
      main {
        display: grid;
        min-height: 100vh;
        place-items: center;
        padding: clamp(2rem, 7vw, 6rem) 1.5rem;
      }
      .frame {
        width: min(100%, 58rem);
        border-block: 1px solid var(--line);
        padding: clamp(3rem, 9vw, 7rem) 0;
        text-align: center;
      }
      picture, img { display: block; }
      .logo {
        width: min(86vw, 31rem);
        height: auto;
        margin: 0 auto clamp(2rem, 6vw, 4rem);
      }
      .eyebrow {
        margin: 0 0 1.25rem;
        color: var(--sand);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.24em;
        text-transform: uppercase;
      }
      h1 {
        max-width: 18ch;
        margin: 0 auto;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(2.4rem, 7vw, 5.4rem);
        font-weight: 400;
        letter-spacing: -0.025em;
        line-height: 0.98;
      }
      .introduction {
        max-width: 34rem;
        margin: 2rem auto 0;
        color: var(--muted);
        font-size: clamp(1rem, 2vw, 1.18rem);
        line-height: 1.75;
      }
      .contact {
        display: inline-block;
        margin-top: 2rem;
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
      form {
        display: grid;
        max-width: 25rem;
        gap: 1rem;
        margin: 2.5rem auto 0;
        text-align: left;
      }
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
        padding: 0.9rem 1.25rem;
        text-transform: uppercase;
      }
      .error { margin: 0; color: #8a4a32; font-size: 0.9rem; line-height: 1.5; }
      @media (prefers-color-scheme: dark) {
        :root {
          --canvas: #191c1a;
          --ink: #f1ede6;
          --muted: rgb(241 237 230 / 72%);
          --ocean: #d0a16b;
          --line: rgb(241 237 230 / 20%);
        }
        body {
          background:
            radial-gradient(circle at 18% 14%, rgb(73 107 91 / 24%), transparent 36rem),
            linear-gradient(145deg, #191c1a, #202420 58%, #14211f);
        }
        input { background: rgb(255 255 255 / 6%); }
        button { color: #191c1a; }
      }
      @media (prefers-reduced-motion: no-preference) {
        .frame { animation: reveal 700ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes reveal { from { opacity: 0; transform: translateY(0.65rem); } }
      }
    </style>
  </head>
  <body>
    <main>${content}</main>
  </body>
</html>`
}

function comingSoonDocument() {
  return documentShell(
    `<section class="frame" aria-labelledby="coming-soon-title">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="/brand/logo-light.png" />
        <img class="logo" src="/brand/logo-horizontal.png" alt="Joshua's Point" width="1200" height="360" />
      </picture>
      <p class="eyebrow">A place between sea and mountain</p>
      <h1 id="coming-soon-title">We are preparing our new website.</h1>
      <p class="introduction">Joshua's Point will be back soon. For enquiries, you can still reach us directly.</p>
      <a class="contact" href="mailto:mail@joshuaspoint.com">mail@joshuaspoint.com</a>
    </section>`,
    "Joshua's Point — Coming Soon",
  )
}

function accessDocument(error?: string) {
  return documentShell(
    `<section class="frame" aria-labelledby="access-title">
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

  return new NextResponse(accessRequested ? accessDocument() : comingSoonDocument(), {
    headers: pageHeaders(status),
    status,
  })
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

  const response = NextResponse.redirect(new URL('/', request.url), 303)
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
