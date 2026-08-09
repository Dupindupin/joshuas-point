import {createHash} from 'node:crypto'

type RateLimitEntry = {
  attempts: number[]
  fingerprints: Map<string, number>
}

type RateLimitResult = {allowed: true} | {allowed: false; reason: 'duplicate' | 'rate-limit'}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1_000
const DUPLICATE_WINDOW_MS = 2 * 60 * 1_000
const MAX_ATTEMPTS_PER_WINDOW = 5
const MAX_TRACKED_CLIENTS = 2_000

const globalRateLimits = globalThis as typeof globalThis & {
  enquiryRateLimits?: Map<string, RateLimitEntry>
}

const entries: Map<string, RateLimitEntry> = (globalRateLimits.enquiryRateLimits ??= new Map())

export function hashEnquiryValue(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

export function checkEnquiryRateLimit(clientKey: string, fingerprint: string): RateLimitResult {
  const now = Date.now()

  if (entries.size > MAX_TRACKED_CLIENTS) {
    for (const [key, entry] of entries) {
      const hasRecentAttempt = entry.attempts.some(
        (attempt) => now - attempt < RATE_LIMIT_WINDOW_MS,
      )
      if (!hasRecentAttempt) entries.delete(key)
    }
  }

  const entry = entries.get(clientKey) ?? {attempts: [], fingerprints: new Map<string, number>()}
  entry.attempts = entry.attempts.filter((attempt) => now - attempt < RATE_LIMIT_WINDOW_MS)

  for (const [key, timestamp] of entry.fingerprints) {
    if (now - timestamp >= DUPLICATE_WINDOW_MS) entry.fingerprints.delete(key)
  }

  if (entry.fingerprints.has(fingerprint)) return {allowed: false, reason: 'duplicate'}
  if (entry.attempts.length >= MAX_ATTEMPTS_PER_WINDOW) {
    return {allowed: false, reason: 'rate-limit'}
  }

  entry.attempts.push(now)
  entry.fingerprints.set(fingerprint, now)
  entries.set(clientKey, entry)
  return {allowed: true}
}
