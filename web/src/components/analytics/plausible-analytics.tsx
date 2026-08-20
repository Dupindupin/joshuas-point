import Script from 'next/script'

import {getPlausibleConfiguration} from '@/lib/analytics/config'

import {AnalyticsInteractions} from './analytics-interactions'

export function PlausibleAnalytics() {
  const configuration = getPlausibleConfiguration()
  if (!configuration) return null

  return (
    <>
      <AnalyticsInteractions />
      <Script id="plausible-event-queue" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(window.plausible.q=window.plausible.q||[]).push(arguments)}`}
      </Script>
      <Script
        data-domain={configuration.domain}
        src={configuration.scriptSource}
        strategy="afterInteractive"
      />
    </>
  )
}
