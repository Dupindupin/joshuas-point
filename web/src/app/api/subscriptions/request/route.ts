import {headers} from 'next/headers'
import {NextRequest, NextResponse} from 'next/server'

import {getEmailBrand} from '@/lib/email/email-brand'
import {ResendEmailService} from '@/lib/email/resend-email-service'
import {createSubscriptionConfirmationEmail} from '@/lib/email/subscription-emails'
import {getSiteUrl} from '@/lib/site-url'
import {getSubscriptionConfiguration, getSubscriptionMode} from '@/lib/subscriptions/config'
import {checkSubscriptionRateLimit, subscriptionHash} from '@/lib/subscriptions/rate-limit'
import {prepareResendSubscriptionRequest} from '@/lib/subscriptions/resend-contacts'
import {createSubscriptionToken} from '@/lib/subscriptions/token'
import {normalizeSubscriptionEmail} from '@/lib/subscriptions/validation'

function redirect(status: string) {
  return NextResponse.redirect(new URL(`/coming-soon?subscription=${status}`, getSiteUrl()), 303)
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  if (String(formData.get('website') ?? '').trim()) return redirect('check-email')
  if (getSubscriptionMode() !== 'live') return redirect('unavailable')

  const email = normalizeSubscriptionEmail(formData.get('email'))
  if (!email) return redirect('invalid')
  const requestHeaders = await headers()
  const client = subscriptionHash(
    `${requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() || requestHeaders.get('x-real-ip') || 'unknown'}|${requestHeaders.get('user-agent') || 'unknown'}`,
  )
  if (!checkSubscriptionRateLimit(client, email)) return redirect('check-email')

  try {
    const configuration = getSubscriptionConfiguration()
    const status = await prepareResendSubscriptionRequest({
      apiKey: configuration.contactsApiKey,
      email,
      topicId: configuration.topicId,
    })
    if (status !== 'send-confirmation') return redirect('check-email')

    const brand = await getEmailBrand()
    const token = createSubscriptionToken(email, configuration.confirmationSecret)
    const confirmationUrl = new URL('/api/subscriptions/confirm', getSiteUrl())
    confirmationUrl.searchParams.set('token', token)
    const service = new ResendEmailService(configuration.resendApiKey)
    await service.sendBatch({
      idempotencyKey: `jp-subscription-confirm-${subscriptionHash(token)}`,
      messages: [
        createSubscriptionConfirmationEmail({
          brand,
          confirmationUrl: confirmationUrl.toString(),
          email,
          from: configuration.from,
          replyTo: configuration.replyTo,
        }),
      ],
    })
  } catch {
    console.error('Subscription confirmation delivery failed.')
    return redirect('unavailable')
  }

  return redirect('check-email')
}
