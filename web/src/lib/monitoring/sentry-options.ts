type SentryEvent = {
  breadcrumbs?: Array<{data?: Record<string, unknown>}>
  request?: {
    cookies?: unknown
    data?: unknown
    headers?: Record<string, unknown>
    query_string?: unknown
    url?: string
  }
  user?: unknown
}

function isEnabled(value: string | undefined) {
  return value?.trim().toLowerCase() === 'true'
}

function sanitizeUrl(value: unknown) {
  if (typeof value !== 'string') return undefined

  try {
    const url = new URL(value, 'https://joshuaspoint.com')
    return `${url.origin}${url.pathname}`
  } catch {
    return value.split(/[?#]/, 1)[0]
  }
}

function sampleRate(value: string | undefined) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return 0.05
  return Math.min(1, Math.max(0, parsed))
}

export function isSentryEnabled() {
  return (
    process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === 'production' &&
    isEnabled(process.env.NEXT_PUBLIC_SENTRY_ENABLED)
  )
}

export function getSentryOptions(dsn: string | undefined) {
  return {
    beforeBreadcrumb(breadcrumb: {data?: Record<string, unknown>}) {
      if (!breadcrumb.data) return breadcrumb

      const data = {...breadcrumb.data}
      for (const key of ['from', 'to', 'url']) {
        if (key in data) data[key] = sanitizeUrl(data[key])
      }
      delete data.body
      delete data.query
      return {...breadcrumb, data}
    },
    beforeSend<T extends SentryEvent>(event: T): T {
      delete event.user

      if (event.request) {
        delete event.request.cookies
        delete event.request.data
        delete event.request.headers
        delete event.request.query_string
        event.request.url = sanitizeUrl(event.request.url)
      }

      event.breadcrumbs = event.breadcrumbs?.map((breadcrumb) => {
        if (!breadcrumb.data) return breadcrumb
        const data = {...breadcrumb.data}
        for (const key of ['from', 'to', 'url']) {
          if (key in data) data[key] = sanitizeUrl(data[key])
        }
        delete data.body
        delete data.query
        return {...breadcrumb, data}
      })

      return event
    },
    dataCollection: {
      cookies: false,
      databaseQueryData: false,
      frameContextLines: 0,
      genAI: {inputs: false, outputs: false},
      graphQL: {document: false, variables: false},
      httpBodies: [],
      httpHeaders: {request: false, response: false},
      stackFrameVariables: false,
      urlQueryParams: false,
      userInfo: false,
    },
    dsn: isSentryEnabled() ? dsn : undefined,
    enabled: isSentryEnabled() && Boolean(dsn),
    environment:
      process.env.SENTRY_ENVIRONMENT ??
      process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT ??
      'development',
    sendDefaultPii: false,
    tracesSampleRate: sampleRate(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE),
  }
}
