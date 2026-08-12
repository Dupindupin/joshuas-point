'use client'

import Link from 'next/link'
import {useEffect, useState} from 'react'

import type {SocialProfile} from '@/lib/social-profiles'

import {BrandLogo, type BrandLogoSources} from './brand-logo'
import {DesktopMegaNavigation, type DesktopMegaNavigationGroup} from './desktop-mega-navigation'
import {MobileNavigation, type MobileNavigationItem} from './mobile-navigation'

export type HeaderAppearance = 'transparent' | 'solid'

type NavigationLink = {
  href: string
  label: string
  openInNewTab?: boolean
}

export type SiteHeaderClientProps = {
  activeHref?: string
  appearance?: HeaderAppearance
}

type SiteHeaderClientInternalProps = SiteHeaderClientProps & {
  bookingLink?: NavigationLink
  featuredDestinations: readonly NavigationLink[]
  logoSources: BrandLogoSources
  primaryNavigation: readonly NavigationLink[]
  socialProfiles: readonly SocialProfile[]
}

const defaultPrimaryNavigation: readonly MobileNavigationItem[] = [
  {href: '/', label: 'Home'},
  {href: '/the-house', label: 'The House'},
  {href: '/rooms', label: 'Rooms'},
  {href: '/destinations', label: 'Destinations'},
  {href: '/explorer', label: 'Explorer Map'},
  {href: '/scenic-routes', label: 'Scenic Routes'},
  {href: '/guide', label: 'Southern Negros Explorer'},
  {href: '/dive-sites', label: 'Dive Guide'},
  {href: '/contact', label: 'Contact'},
]

function getDesktopNavigation(
  featuredDestinations: readonly NavigationLink[],
  primaryNavigation: readonly NavigationLink[],
): readonly DesktopMegaNavigationGroup[] {
  const selectLinks = (hrefs: readonly string[]) =>
    hrefs.flatMap((href) => {
      const link = primaryNavigation.find((item) => item.href === href)
      return link ? [link] : []
    })
  const groups: DesktopMegaNavigationGroup[] = [
    {
      id: 'stay',
      links: selectLinks(['/the-house', '/rooms', '/plan-your-stay']),
      title: 'Stay',
    },
    {
      id: 'explore',
      links: selectLinks(['/explorer', '/destinations', '/scenic-routes', '/guide', '/dive-sites']),
      title: 'Explore',
    },
    {
      featuredLabel: 'Featured places',
      id: 'destinations',
      links: featuredDestinations,
      overviewLink: {href: '/destinations', label: 'View all destinations'},
      title: 'Destinations',
    },
    {
      id: 'about',
      links: selectLinks(['/getting-here', '/faq', '/contact']),
      title: 'About',
    },
  ]

  return groups.filter((group) => group.overviewLink || group.links.length > 0)
}

const appearanceClasses: Record<HeaderAppearance, string> = {
  transparent: 'border-transparent bg-transparent text-inverse',
  solid: 'border-border/35 bg-canvas/96 text-ink backdrop-blur-sm',
}

const planStayClasses: Record<HeaderAppearance, string> = {
  transparent: 'border-inverse/55 text-inverse hover:border-inverse hover:bg-canvas hover:text-ink',
  solid: 'border-ink/35 text-ink hover:border-ink hover:bg-inverse-surface hover:text-inverse',
}

const focusClasses: Record<HeaderAppearance, string> = {
  transparent: 'focus-visible:outline-inverse',
  solid: 'focus-visible:outline-focus',
}

function SiteWordmark({
  appearance,
  sources,
}: {
  appearance: HeaderAppearance
  sources: BrandLogoSources
}) {
  return (
    <Link
      aria-label="Joshua’s Point home"
      className={`shrink-0 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 ${focusClasses[appearance]}`}
      href="/"
    >
      <BrandLogo
        alt=""
        className="size-[3.25rem] min-[480px]:hidden"
        priority
        sources={sources}
        tone="inverse"
        variant="mark"
      />
      <BrandLogo
        alt=""
        className="hidden min-[480px]:inline-block min-[480px]:w-[9.5rem] sm:w-[12.5rem] md:w-[13.5rem] lg:w-[14.75rem] xl:w-64"
        priority
        sources={sources}
        tone={appearance === 'transparent' ? 'inverse' : 'adaptive'}
      />
    </Link>
  )
}

export function SiteHeaderClient({
  activeHref,
  appearance = 'transparent',
  bookingLink,
  featuredDestinations,
  logoSources,
  primaryNavigation: sanityPrimaryNavigation,
  socialProfiles,
}: SiteHeaderClientInternalProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)
  const effectiveAppearance =
    appearance === 'transparent' && !isScrolled && !isDesktopMenuOpen ? 'transparent' : 'solid'
  const primaryNavigation =
    sanityPrimaryNavigation.length > 0 ? sanityPrimaryNavigation : defaultPrimaryNavigation
  const desktopNavigation = getDesktopNavigation(featuredDestinations, primaryNavigation)
  const planStayLink = bookingLink ?? {href: '/plan-your-stay', label: 'Plan Your Stay'}

  useEffect(() => {
    function updateScrollState() {
      setIsScrolled(window.scrollY > 24)
    }

    updateScrollState()
    window.addEventListener('scroll', updateScrollState, {passive: true})
    return () => window.removeEventListener('scroll', updateScrollState)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,color] duration-[var(--jp-motion-duration-ui)] ease-[var(--jp-motion-ease-soft)] ${appearanceClasses[effectiveAppearance]}`}
      data-appearance={effectiveAppearance}
      data-scrolled={isScrolled}
    >
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 transition-[height] duration-[var(--jp-motion-duration-ui)] ease-[var(--jp-motion-ease-soft)] sm:px-8 md:px-10 ${
          isScrolled ? 'h-20' : 'h-24'
        }`}
      >
        <SiteWordmark appearance={effectiveAppearance} sources={logoSources} />

        <DesktopMegaNavigation
          activeHref={activeHref}
          appearance={effectiveAppearance}
          groups={desktopNavigation}
          onOpenChange={setIsDesktopMenuOpen}
        />

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            className={`inline-flex min-h-11 items-center justify-center rounded-full border px-3 py-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.04em] transition-colors duration-[var(--jp-motion-duration-hover)] sm:px-5 sm:text-xs focus-visible:outline-2 focus-visible:outline-offset-4 ${planStayClasses[effectiveAppearance]} ${focusClasses[effectiveAppearance]}`}
            href={planStayLink.href}
            rel={planStayLink.openInNewTab ? 'noopener noreferrer' : undefined}
            target={planStayLink.openInNewTab ? '_blank' : undefined}
          >
            {planStayLink.label}
          </Link>
          <MobileNavigation
            activeHref={activeHref}
            appearance={effectiveAppearance}
            items={primaryNavigation}
            socialProfiles={socialProfiles}
          />
        </div>
      </div>
    </header>
  )
}
