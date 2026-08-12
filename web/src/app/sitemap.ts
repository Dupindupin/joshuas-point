import type {MetadataRoute} from 'next'

import {isSearchIndexingAllowed} from '@/lib/deployment'
import {getSiteUrl} from '@/lib/site-url'
import {getPublishedDestinations} from '@/sanity/queries/destinations'
import {getPublishedDiveSites} from '@/sanity/queries/dive-sites'
import {getPublishedScenicRoutes} from '@/sanity/queries/scenic-routes'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'

const publicRoutes = [
  '/',
  '/the-house',
  '/rooms',
  '/destinations',
  '/explorer',
  '/scenic-routes',
  '/guide',
  '/dive-sites',
  '/getting-here',
  '/faq',
  '/contact',
  '/plan-your-stay',
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isSearchIndexingAllowed()) return []

  const [destinations, diveSites, scenicRoutes, siteSettings] = await Promise.all([
    getPublishedDestinations(),
    getPublishedDiveSites(),
    getPublishedScenicRoutes(),
    getSiteSeoSettings(),
  ])
  const siteUrl = getSiteUrl(siteSettings?.siteUrl)

  return [
    ...publicRoutes.map((pathname) => ({
      url: new URL(pathname, siteUrl).toString(),
    })),
    ...destinations.map((destination) => ({
      lastModified: destination._updatedAt ? new Date(destination._updatedAt) : undefined,
      url: new URL(`/destinations/${encodeURIComponent(destination.slug)}`, siteUrl).toString(),
    })),
    ...scenicRoutes.map((route) => ({
      lastModified: route._updatedAt ? new Date(route._updatedAt) : undefined,
      url: new URL(`/scenic-routes/${encodeURIComponent(route.slug)}`, siteUrl).toString(),
    })),
    ...diveSites.map((diveSite) => ({
      lastModified: diveSite._updatedAt ? new Date(diveSite._updatedAt) : undefined,
      url: new URL(`/dive-sites/${encodeURIComponent(diveSite.slug)}`, siteUrl).toString(),
    })),
  ]
}
