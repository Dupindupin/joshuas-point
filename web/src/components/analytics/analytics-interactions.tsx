'use client'

import {useEffect} from 'react'

import {analyticsEvents} from '@/lib/analytics/event-names'
import {trackAnalyticsEvent} from '@/lib/analytics/events'

export function AnalyticsInteractions() {
  useEffect(() => {
    function trackContactEmail(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest<HTMLAnchorElement>('a[href^="mailto:"]')) return
      trackAnalyticsEvent(analyticsEvents.contactEmailClicked)
    }

    document.addEventListener('click', trackContactEmail)
    return () => document.removeEventListener('click', trackContactEmail)
  }, [])

  return null
}
