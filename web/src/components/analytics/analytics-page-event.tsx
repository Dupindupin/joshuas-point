'use client'

import {useEffect, useRef} from 'react'

import type {AnalyticsEvent} from '@/lib/analytics/event-names'
import {trackAnalyticsEvent} from '@/lib/analytics/events'

export function AnalyticsPageEvent({event}: {event: AnalyticsEvent}) {
  const tracked = useRef(false)

  useEffect(() => {
    if (tracked.current) return
    tracked.current = true
    trackAnalyticsEvent(event)
  }, [event])

  return null
}
