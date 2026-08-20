import {NextRequest, NextResponse} from 'next/server'

import {getEmailBrand} from '@/lib/email/email-brand'
import {ResendEmailService} from '@/lib/email/resend-email-service'
import {createSubscriptionWelcomeEmail} from '@/lib/email/subscription-emails'
import {getSiteUrl} from '@/lib/site-url'
import {getSubscriptionConfiguration, getSubscriptionMode} from '@/lib/subscriptions/config'
import {confirmResendSubscription} from '@/lib/subscriptions/resend-contacts'
import {subscriptionHash} from '@/lib/subscriptions/rate-limit'
import {readSubscriptionToken} from '@/lib/subscriptions/token'

function redirect(status: string) {
  return NextResponse.redirect(new URL(`/coming-soon?subscription=${status}`, getSiteUrl()), 303)
}

function confirmationPage(token: string) {
  const escapedToken = token
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

  return new NextResponse(
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Confirm updates — Joshua's Point</title><style>:root{color-scheme:light dark}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:2rem;background:#f3ede6;color:#282828;font-family:Georgia,'Times New Roman',serif}.card{width:min(100%,36rem);padding:clamp(2rem,7vw,4rem);border:1px solid #d8cec0;background:#faf7f2;text-align:center}picture,img{display:block}img{width:min(100%,18rem);height:auto;margin:0 auto 2rem}h1{margin:0 0 1rem;color:#1f3d3a;font-size:clamp(2rem,7vw,3.3rem);font-weight:400;line-height:1.05}p{line-height:1.7}button{min-height:3rem;margin-top:1rem;border:0;border-radius:999px;background:#1f3d3a;color:#f3ede6;cursor:pointer;font:700 .8rem Arial,sans-serif;letter-spacing:.08em;padding:.75rem 1.5rem;text-transform:uppercase;transition:background-color 180ms ease,color 180ms ease}button:hover{background:#c8a26a;color:#282828}button:focus-visible{outline:3px solid #c8a26a;outline-offset:4px}@media(prefers-color-scheme:dark){body{background:#20201f;color:#f3ede6}.card{background:#282828;border-color:#496b5b}h1{color:#f3ede6}}</style></head><body><main class="card"><picture><source media="(prefers-color-scheme: dark)" srcset="/brand/logo-light.png"><img src="/brand/logo-horizontal.png" alt="Joshua's Point"></picture><h1>Confirm your email</h1><p>Choose confirm to receive occasional news from Joshua’s Point.</p><form action="/api/subscriptions/confirm" method="post"><input type="hidden" name="token" value="${escapedToken}"><button type="submit">Confirm my email</button></form></main></body></html>`,
    {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'text/html; charset=utf-8',
        'Referrer-Policy': 'no-referrer',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    },
  )
}

export async function GET(request: NextRequest) {
  if (getSubscriptionMode() !== 'live') return redirect('unavailable')
  const token = request.nextUrl.searchParams.get('token') ?? ''
  try {
    const {confirmationSecret} = getSubscriptionConfiguration()
    if (!readSubscriptionToken(token, confirmationSecret)) return redirect('invalid-link')
    return confirmationPage(token)
  } catch {
    return redirect('unavailable')
  }
}

export async function POST(request: NextRequest) {
  if (getSubscriptionMode() !== 'live') return redirect('unavailable')
  try {
    const configuration = getSubscriptionConfiguration()
    const formData = await request.formData()
    const suppliedToken = formData.get('token')
    const email = readSubscriptionToken(
      typeof suppliedToken === 'string' ? suppliedToken : '',
      configuration.confirmationSecret,
    )
    if (!email) return redirect('invalid-link')
    await confirmResendSubscription({
      apiKey: configuration.contactsApiKey,
      email,
      segmentId: configuration.segmentId,
      topicId: configuration.topicId,
    })
    const brand = await getEmailBrand()
    await new ResendEmailService(configuration.resendApiKey).sendBatch({
      idempotencyKey: `jp-subscription-welcome-${subscriptionHash(email)}`,
      messages: [
        createSubscriptionWelcomeEmail({
          brand,
          email,
          from: configuration.from,
          replyTo: configuration.replyTo,
        }),
      ],
    })
    return redirect('confirmed')
  } catch {
    console.error('Subscription confirmation failed.')
    return redirect('unavailable')
  }
}
