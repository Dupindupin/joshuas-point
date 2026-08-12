import {SIGNATURE_HEADER_NAME, isValidSignature} from '@sanity/webhook'
import {revalidateTag} from 'next/cache'
import {NextResponse} from 'next/server'

import {getSanityRevalidationTags, type SanityRevalidationPayload} from '@/sanity/revalidation'

export const runtime = 'nodejs'

const maximumPayloadBytes = 64 * 1024

function response(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {'Cache-Control': 'no-store'},
  })
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim()
  if (!secret) return response({ok: false, message: 'Revalidation is not configured.'}, 503)

  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > maximumPayloadBytes) {
    return response({ok: false, message: 'Payload is too large.'}, 413)
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME)
  if (!signature) return response({ok: false, message: 'Signature is required.'}, 401)

  const rawBody = await request.text()
  if (!rawBody || new TextEncoder().encode(rawBody).byteLength > maximumPayloadBytes) {
    return response({ok: false, message: 'Payload is empty or too large.'}, 413)
  }

  if (!(await isValidSignature(rawBody, signature, secret))) {
    return response({ok: false, message: 'Signature is invalid.'}, 401)
  }

  let payload: SanityRevalidationPayload
  try {
    const parsed = JSON.parse(rawBody) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new TypeError()
    payload = parsed as SanityRevalidationPayload
  } catch {
    return response({ok: false, message: 'Payload is not valid JSON.'}, 400)
  }

  const tags = getSanityRevalidationTags(payload)
  for (const tag of tags) revalidateTag(tag, 'max')

  return response({ok: true, revalidated: tags}, 200)
}
