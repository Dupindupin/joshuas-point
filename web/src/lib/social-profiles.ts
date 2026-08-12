export const supportedSocialPlatforms = [
  'instagram',
  'facebook',
  'youtube',
  'tiktok',
  'pinterest',
] as const

export type SocialPlatform = (typeof supportedSocialPlatforms)[number]

export type SocialProfileInput = {
  platform?: string | null
  url?: string | null
}

export type SocialProfile = {
  href: string
  label: string
  platform: SocialPlatform
}

export function normalizeInstagramUrl(value: string | null | undefined): string | undefined {
  const rawUrl = value?.trim()
  if (!rawUrl) return undefined

  try {
    const url = new URL(rawUrl)
    const hostname = url.hostname.replace(/^www\./, '')
    return url.protocol === 'https:' && hostname === 'instagram.com' ? url.toString() : undefined
  } catch {
    return undefined
  }
}

const platformLabels: Record<SocialPlatform, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  pinterest: 'Pinterest',
  tiktok: 'TikTok',
  youtube: 'YouTube',
}

function isSocialPlatform(value: string): value is SocialPlatform {
  return supportedSocialPlatforms.includes(value as SocialPlatform)
}

/**
 * Converts approved Site Settings values into a small public profile model.
 * Empty, duplicate, unsupported, non-HTTPS, and malformed entries stay private.
 */
export function normalizeSocialProfiles(
  profiles: readonly SocialProfileInput[] | null | undefined,
): SocialProfile[] {
  const seen = new Set<SocialPlatform>()

  return (profiles ?? []).flatMap((profile) => {
    const platform = profile.platform?.trim().toLowerCase() ?? ''
    const rawUrl = profile.url?.trim()
    if (!isSocialPlatform(platform) || !rawUrl || seen.has(platform)) return []

    try {
      const url = new URL(rawUrl)
      if (url.protocol !== 'https:') return []

      seen.add(platform)
      return [{href: url.toString(), label: platformLabels[platform], platform}]
    } catch {
      return []
    }
  })
}
