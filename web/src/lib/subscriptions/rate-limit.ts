import {createHash} from 'node:crypto'

const windowMs = 15 * 60 * 1000
const duplicateMs = 2 * 60 * 1000
const maximumAttempts = 5
const attempts = new Map<string, {emails: Map<string, number>; timestamps: number[]}>()

export function subscriptionHash(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

export function checkSubscriptionRateLimit(client: string, email: string) {
  const now = Date.now()
  const entry = attempts.get(client) ?? {emails: new Map(), timestamps: []}
  entry.timestamps = entry.timestamps.filter((timestamp) => now - timestamp < windowMs)
  for (const [key, timestamp] of entry.emails) {
    if (now - timestamp >= duplicateMs) entry.emails.delete(key)
  }
  const emailKey = subscriptionHash(email)
  if (entry.emails.has(emailKey) || entry.timestamps.length >= maximumAttempts) return false
  entry.timestamps.push(now)
  entry.emails.set(emailKey, now)
  attempts.set(client, entry)
  return true
}
