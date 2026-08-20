import {createClient} from '@sanity/client'
import {NextResponse} from 'next/server'

import {getOwnerDashboardLiveStatus} from '@/lib/owner-dashboard/live-status'
import {sanityConfig} from '@/sanity/config'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const officialStudioOrigin = 'https://studio.joshuaspoint.com'
const maximumAuthorizationLength = 4096

function isAllowedOrigin(origin: string | null) {
  if (!origin) return false

  try {
    const url = new URL(origin)
    if (url.origin === officialStudioOrigin) return true

    return (
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      (url.hostname === 'localhost' || url.hostname === '127.0.0.1')
    )
  } catch {
    return false
  }
}

function response(origin: string | null, body: Record<string, unknown>, status: number) {
  const headers: Record<string, string> = {
    'Cache-Control': 'no-store, max-age=0',
    'X-Content-Type-Options': 'nosniff',
  }

  if (origin && isAllowedOrigin(origin)) {
    headers['Access-Control-Allow-Origin'] = origin
    headers.Vary = 'Origin'
  }

  return NextResponse.json(body, {headers, status})
}

function bearerToken(request: Request) {
  const authorization = request.headers.get('authorization')
  if (
    !authorization ||
    authorization.length > maximumAuthorizationLength ||
    !authorization.startsWith('Bearer ')
  ) {
    return null
  }

  const token = authorization.slice('Bearer '.length).trim()
  return token && !/[\r\n]/.test(token) ? token : null
}

async function authenticatedStudioClient(token: string) {
  try {
    const client = createClient({
      ...sanityConfig,
      token,
      useCdn: false,
    })
    const user = await client.users.getById('me')
    return user.id && user.role ? client : null
  } catch {
    return null
  }
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin || !isAllowedOrigin(origin)) return response(null, {ok: false}, 403)

  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Max-Age': '600',
      'Cache-Control': 'no-store, max-age=0',
      Vary: 'Origin',
    },
    status: 204,
  })
}

export async function GET(request: Request) {
  const origin = request.headers.get('origin')
  if (!isAllowedOrigin(origin)) return response(null, {ok: false}, 403)

  const token = bearerToken(request)
  if (!token) {
    return response(origin, {ok: false}, 401)
  }

  const studioClient = await authenticatedStudioClient(token)
  if (!studioClient) return response(origin, {ok: false}, 401)

  return response(origin, {ok: true, status: await getOwnerDashboardLiveStatus(studioClient)}, 200)
}
