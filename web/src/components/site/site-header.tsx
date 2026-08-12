import {getDestinationsPage, getPublishedDestinations} from '@/sanity/queries/destinations'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'
import {normalizeSocialProfiles} from '@/lib/social-profiles'
import {getBrandImageSource} from '@/sanity/image'

import {SiteHeaderClient, type SiteHeaderClientProps} from './site-header-client'

const MAX_FEATURED_DESTINATIONS = 3

function destinationLink(destination: {slug: string; title: string}) {
  return {
    href: `/destinations/${destination.slug}`,
    label: destination.title,
  }
}

export async function SiteHeader(props: SiteHeaderClientProps) {
  const [destinationsPage, publishedDestinations, siteSettings] = await Promise.all([
    getDestinationsPage(),
    getPublishedDestinations(),
    getSiteSeoSettings(),
  ])
  const featuredDestinations = destinationsPage?.featuredDestinations ?? []
  const newestDestinations = [...publishedDestinations].sort((left, right) =>
    (right._updatedAt ?? '').localeCompare(left._updatedAt ?? ''),
  )
  const seen = new Set<string>()
  const logoSources = {
    horizontal: getBrandImageSource(siteSettings?.primaryLogo, 1200),
    mark: getBrandImageSource(siteSettings?.compactLogo, 512),
  }
  const destinationLinks = [...featuredDestinations, ...newestDestinations]
    .filter((destination) => {
      if (seen.has(destination.slug)) return false
      seen.add(destination.slug)
      return true
    })
    .slice(0, MAX_FEATURED_DESTINATIONS)
    .map(destinationLink)

  return (
    <SiteHeaderClient
      {...props}
      bookingLink={
        siteSettings?.bookingLinks?.enabled ? siteSettings.bookingLinks.primary : undefined
      }
      featuredDestinations={destinationLinks}
      logoSources={logoSources}
      primaryNavigation={siteSettings?.primaryNavigation ?? []}
      socialProfiles={normalizeSocialProfiles(siteSettings?.socialProfiles)}
    />
  )
}
