import {createClient} from '@sanity/client'
import {revalidateTag} from 'next/cache'
import {NextResponse} from 'next/server'

import {createOwnerStayAvailabilitySyncRepository} from '@/lib/operations/sanity-stay-availability-sync-repository'
import {
  cancelStayAndReleaseAvailability,
  confirmStayAndReserveAvailability,
  type StaySyncAction,
} from '@/lib/operations/stay-availability-sync'
import {sanityConfig} from '@/sanity/config'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const operationsProjectId = 'bx0jlvt3'
const operationsDataset = 'operations'
const maximumAuthorizationLength = 4096
const maximumPayloadBytes = 4096
const officialOperationsStudioOrigin = 'https://joshuas-point-operations.sanity.studio'

function isAllowedOrigin(origin: string | null) {
  if (!origin) return false
  try {
    const url = new URL(origin)
    if (url.origin === officialOperationsStudioOrigin) return true
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

async function authenticatedOwner(token: string) {
  try {
    const operationsClient = createClient({
      apiVersion: '2026-08-14',
      dataset: operationsDataset,
      projectId: operationsProjectId,
      token,
      useCdn: false,
    })
    const publicClient = createClient({...sanityConfig, token, useCdn: false})
    const [operationsUser, publicUser] = await Promise.all([
      operationsClient.users.getById('me'),
      publicClient.users.getById('me'),
    ])
    return Boolean(operationsUser.id && operationsUser.role && publicUser.id && publicUser.role)
  } catch {
    return false
  }
}

function validStayId(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length <= 180 &&
    /^wholeHouseStay\.[a-zA-Z0-9_-]+$/.test(value)
  )
}

function validAction(value: unknown): value is StaySyncAction {
  return value === 'confirm' || value === 'cancel'
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin || !isAllowedOrigin(origin)) return response(null, {ok: false}, 403)
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Headers': 'Authorization, Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Max-Age': '600',
      'Cache-Control': 'no-store, max-age=0',
      Vary: 'Origin',
    },
    status: 204,
  })
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (!isAllowedOrigin(origin)) return response(null, {ok: false}, 403)

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > maximumPayloadBytes) {
    return response(origin, {message: 'Request is too large.', ok: false}, 413)
  }

  const token = bearerToken(request)
  if (!token || !(await authenticatedOwner(token))) {
    return response(origin, {message: 'Owner authentication is required.', ok: false}, 401)
  }

  let payload: {action?: unknown; stayId?: unknown}
  try {
    const rawBody = await request.text()
    if (!rawBody || new TextEncoder().encode(rawBody).byteLength > maximumPayloadBytes) {
      return response(origin, {message: 'Request is empty or too large.', ok: false}, 413)
    }
    payload = JSON.parse(rawBody) as {action?: unknown; stayId?: unknown}
  } catch {
    return response(origin, {message: 'Request is not valid JSON.', ok: false}, 400)
  }

  if (!validAction(payload.action) || !validStayId(payload.stayId)) {
    return response(origin, {message: 'Stay action is invalid.', ok: false}, 400)
  }

  try {
    const repository = createOwnerStayAvailabilitySyncRepository(token)
    const result =
      payload.action === 'confirm'
        ? await confirmStayAndReserveAvailability({repository, stayId: payload.stayId})
        : await cancelStayAndReleaseAvailability({repository, stayId: payload.stayId})

    if (result.status === 'conflict') {
      return response(
        origin,
        {
          conflict: result.conflict,
          message: 'These dates overlap an unavailable period. The stay was not confirmed.',
          ok: false,
        },
        409,
      )
    }

    revalidateTag('sanity:house-availability', 'max')
    revalidateTag('sanity:relationships:houseAvailability', 'max')

    return response(origin, {action: result.action, ok: true, status: result.status}, 200)
  } catch (error) {
    const safeMessages = new Set([
      'A cancelled or completed stay cannot be confirmed.',
      'A completed stay cannot be cancelled.',
      'House Availability kept changing. Refresh and try again.',
      'Published House Availability is missing.',
      'The stay could not be found in private Operations.',
      'The stay needs valid arrival and departure dates before synchronization.',
    ])
    const message =
      error instanceof Error && safeMessages.has(error.message)
        ? error.message
        : 'The stay and availability could not be synchronized safely.'
    return response(origin, {message, ok: false}, 409)
  }
}
