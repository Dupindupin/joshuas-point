import {isComingSoonModeEnabled} from '@/lib/coming-soon'
import {getDeploymentEnvironment, isSearchIndexingAllowed} from '@/lib/deployment'
import {getEnquiryEmailMode} from '@/lib/email/email-service'
import {getSubscriptionMode} from '@/lib/subscriptions/config'

export type OwnerDashboardLiveStatus = {
  analyticsEnabled: boolean
  checkedAt: string
  comingSoon: boolean
  enquiryReplyToConfigured: boolean
  enquiryMode: 'disabled' | 'live' | 'test'
  newsletterReadiness: 'needsAttention' | 'ready'
  productionDomain: string | null
  resendConfigured: boolean
  senderConfigured: boolean
  segmentConfigured: boolean
  sendingDomainConfigured: boolean
  sentryEnabled: boolean
  siteDomainConfigured: boolean
  sitemapEnabled: boolean
  sslReady: boolean
  subscriptionReplyToConfigured: boolean
  subscriptionMode: 'disabled' | 'live'
  topicConfigured: boolean
}

const emailAddressPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const productionSiteOrigin = 'https://joshuaspoint.com'

function configured(name: string) {
  const value = process.env[name]?.trim()
  return Boolean(value && !/^(?:replace_|re_replace_|<)/i.test(value))
}

function enabled(name: string) {
  return process.env[name]?.trim().toLowerCase() === 'true'
}

function validHttpsUrl(value: string | undefined) {
  if (!value?.trim()) return false

  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

function analyticsEnabled() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim()
  return (
    getDeploymentEnvironment() === 'production' &&
    enabled('NEXT_PUBLIC_ANALYTICS_ENABLED') &&
    Boolean(domain && /^[a-z0-9.-]+$/i.test(domain)) &&
    validHttpsUrl(process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC)
  )
}

function sentryEnabled() {
  return (
    getDeploymentEnvironment() === 'production' &&
    enabled('NEXT_PUBLIC_SENTRY_ENABLED') &&
    Boolean(process.env.SENTRY_DSN?.trim() || process.env.NEXT_PUBLIC_SENTRY_DSN?.trim())
  )
}

function senderAddress(name: string) {
  const value = process.env[name]?.trim()
  if (!value) return null

  const bracketedAddress = value.match(/^.+\s<([^<>]+)>$/)?.[1]?.trim()
  const address = bracketedAddress ?? value

  return emailAddressPattern.test(address) ? address : null
}

function hasConfiguredSiteDomain() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!value) return false

  try {
    const url = new URL(value)
    return url.origin === productionSiteOrigin && url.pathname === '/' && !url.search && !url.hash
  } catch {
    return false
  }
}

export function getOwnerDashboardLiveStatus(): OwnerDashboardLiveStatus {
  const enquirySender = senderAddress('ENQUIRY_FROM_EMAIL')
  const subscriptionSender = senderAddress('SUBSCRIPTION_FROM_EMAIL')
  const enquirySendingDomain = enquirySender?.split('@')[1]
  const productionDomain = process.env.NEXT_PUBLIC_SITE_URL?.trim() || null

  const resendConfigured =
    process.env.ENQUIRY_EMAIL_PROVIDER?.trim().toLowerCase() === 'resend' &&
    configured('RESEND_API_KEY')

  const newsletterConfigured =
    resendConfigured &&
    Boolean(subscriptionSender) &&
    Boolean(senderAddress('SUBSCRIPTION_REPLY_TO_EMAIL')) &&
    configured('SUBSCRIPTION_CONFIRMATION_SECRET') &&
    configured('RESEND_CONTACTS_API_KEY') &&
    configured('RESEND_UPDATES_SEGMENT_ID') &&
    configured('RESEND_UPDATES_TOPIC_ID')

  return {
    analyticsEnabled: analyticsEnabled(),
    checkedAt: new Date().toISOString(),
    comingSoon: isComingSoonModeEnabled(),
    enquiryReplyToConfigured: Boolean(senderAddress('ENQUIRY_REPLY_TO_EMAIL')),
    enquiryMode: getEnquiryEmailMode(),
    newsletterReadiness: newsletterConfigured ? 'ready' : 'needsAttention',
    productionDomain,
    resendConfigured,
    senderConfigured: Boolean(enquirySender),
    segmentConfigured: configured('RESEND_UPDATES_SEGMENT_ID'),
    sendingDomainConfigured: Boolean(enquirySendingDomain),
    sentryEnabled: sentryEnabled(),
    siteDomainConfigured: getDeploymentEnvironment() === 'production' && hasConfiguredSiteDomain(),
    sitemapEnabled: isSearchIndexingAllowed(),
    sslReady: Boolean(productionDomain && validHttpsUrl(productionDomain)),
    subscriptionReplyToConfigured: Boolean(senderAddress('SUBSCRIPTION_REPLY_TO_EMAIL')),
    subscriptionMode: getSubscriptionMode(),
    topicConfigured: configured('RESEND_UPDATES_TOPIC_ID'),
  }
}
