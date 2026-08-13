export const comingSoonAccessCookie = 'jp_internal_preview'

const comingSoonEnabledValue = 'enabled'

export function isComingSoonModeEnabled() {
  return process.env.COMING_SOON_MODE?.trim().toLowerCase() === comingSoonEnabledValue
}

export function getComingSoonBypassSecret() {
  return process.env.COMING_SOON_BYPASS_SECRET?.trim() ?? ''
}

export async function createComingSoonAccessValue(secret: string) {
  const bytes = new TextEncoder().encode(secret)
  const digest = await crypto.subtle.digest('SHA-256', bytes)

  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function securelyMatches(left: string, right: string) {
  if (left.length !== right.length) return false

  let difference = 0

  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }

  return difference === 0
}
