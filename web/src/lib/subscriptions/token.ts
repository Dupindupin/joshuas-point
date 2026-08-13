import {createHmac, timingSafeEqual} from 'node:crypto'

const tokenLifetimeSeconds = 60 * 60 * 24

function encode(value: string) {
  return Buffer.from(value).toString('base64url')
}

function signature(payload: string, secret: string) {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

export function createSubscriptionToken(email: string, secret: string, now = Date.now()) {
  const payload = encode(
    JSON.stringify({email, expires: Math.floor(now / 1000) + tokenLifetimeSeconds}),
  )
  return `${payload}.${signature(payload, secret)}`
}

export function readSubscriptionToken(token: string, secret: string, now = Date.now()) {
  const [payload, suppliedSignature, ...remainder] = token.split('.')
  if (!payload || !suppliedSignature || remainder.length > 0) return null
  const expectedSignature = signature(payload, secret)
  const supplied = Buffer.from(suppliedSignature)
  const expected = Buffer.from(expectedSignature)
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null

  try {
    const value = JSON.parse(Buffer.from(payload, 'base64url').toString()) as {
      email?: unknown
      expires?: unknown
    }
    if (
      typeof value.email !== 'string' ||
      typeof value.expires !== 'number' ||
      value.expires < Math.floor(now / 1000)
    ) {
      return null
    }
    return value.email
  } catch {
    return null
  }
}
