'use client'

import type {AnalyticsEvent} from '@/lib/analytics/event-names'

export {analyticsEvents} from '@/lib/analytics/event-names'

type PlausibleQueue = ((event: AnalyticsEvent) => void) & {q?: [AnalyticsEvent][]}

declare global {
  interface Window {
    plausible?: PlausibleQueue
  }
}

export function trackAnalyticsEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return
  if (
    process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT !== 'production' ||
    process.env.NEXT_PUBLIC_ANALYTICS_ENABLED?.trim().toLowerCase() !== 'true'
  ) {
    return
  }

  window.plausible ??= function plausibleQueue(...args: [AnalyticsEvent]) {
    const queue = window.plausible?.q ?? []
    queue.push(args)
    if (window.plausible) window.plausible.q = queue
  }
  window.plausible(event)
}
