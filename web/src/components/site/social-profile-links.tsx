import type {SocialProfile} from '@/lib/social-profiles'

type SocialProfileLinksProps = {
  ariaLabel?: string
  className?: string
  profiles: readonly Pick<SocialProfile, 'href' | 'label' | 'platform'>[]
  tone?: 'default' | 'inverse'
}

const linkClasses = {
  default:
    'border-border/70 bg-surface/45 text-ink-muted hover:border-border hover:bg-surface hover:text-ink focus-visible:outline-focus',
  inverse:
    'border-inverse/22 bg-inverse/[0.04] text-inverse/76 hover:border-inverse/38 hover:bg-inverse/[0.08] hover:text-inverse focus-visible:outline-evening-accent',
} as const

function InstagramIcon() {
  return (
    <svg aria-hidden="true" className="size-full" fill="none" viewBox="0 0 24 24">
      <rect height="17" rx="5" stroke="currentColor" strokeWidth="1.6" width="17" x="3.5" y="3.5" />
      <circle cx="12" cy="12" r="3.75" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.75" fill="currentColor" r="1" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="size-full" fill="none" viewBox="0 0 24 24">
      <path
        d="M13.5 20v-7h2.65l.4-3H13.5V8.08c0-.87.24-1.46 1.53-1.46H16.7V3.94c-.29-.04-1.28-.12-2.43-.12-2.4 0-4.05 1.47-4.05 4.16V10H7.5v3h2.72v7h3.28Z"
        fill="currentColor"
      />
    </svg>
  )
}

const profileIcons = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
} as const

type VisibleSocialPlatform = keyof typeof profileIcons

function isVisibleSocialPlatform(
  platform: SocialProfile['platform'],
): platform is VisibleSocialPlatform {
  return platform === 'facebook' || platform === 'instagram'
}

export function SocialProfileLinks({
  ariaLabel = "Joshua's Point social profiles",
  className = '',
  profiles,
  tone = 'default',
}: SocialProfileLinksProps) {
  const visibleProfiles = profiles.flatMap((profile) =>
    isVisibleSocialPlatform(profile.platform) ? [{...profile, platform: profile.platform}] : [],
  )

  if (visibleProfiles.length === 0) return null

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ul className="flex flex-wrap gap-3">
        {visibleProfiles.map((profile) => {
          const Icon = profileIcons[profile.platform]

          return (
            <li key={profile.href}>
              <a
                aria-label={`${profile.label} — Joshua's Point (opens in a new tab)`}
                className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none ${linkClasses[tone]}`}
                href={profile.href}
                rel="noopener noreferrer"
                target="_blank"
                title={profile.label}
              >
                <span className="size-[1.125rem]">
                  <Icon />
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
