import {cache} from 'react'

import {sanityClient} from '../client'

export type ExplorerCategoryId = 'destination' | 'dive-site' | 'joshua-point' | 'scenic-route'

export type ExplorerCoordinates = {
  latitude: number
  longitude: number
}

export type ExplorerItem = {
  category: ExplorerCategoryId
  coordinates?: ExplorerCoordinates
  description?: string
  href: string
  id: string
  route?: readonly ExplorerCoordinates[]
  title: string
}

type RawCoordinates = {
  lat?: number | null
  lng?: number | null
}

type RawExplorerItem = {
  _id?: string | null
  coordinates?: RawCoordinates | null
  description?: string | null
  name?: string | null
  routePath?: Array<(RawCoordinates & {_key?: string | null}) | null> | null
  slug?: string | null
  title?: string | null
}

type ExplorerQueryResult = {
  destinations?: RawExplorerItem[] | null
  diveSites?: RawExplorerItem[] | null
  scenicRoutes?: RawExplorerItem[] | null
  site?: RawExplorerItem | null
}

const explorerQuery = /* groq */ `
  {
    "site": *[_type == "siteSettings" && _id == "siteSettings"][0] {
      "_id": _id,
      "title": siteTitle,
      "description": coalesce(propertyLocation.label, siteDescription),
      "coordinates": propertyLocation.coordinates
    },
    "destinations": *[
      _type == "destination" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current) &&
      coalesce(seo.noIndex, false) != true
    ] | order(title asc) {
      _id,
      "slug": slug.current,
      title,
      "description": editorialIntroduction,
      "coordinates": mapLocation.coordinates
    },
    "scenicRoutes": *[
      _type == "scenicRoute" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current) &&
      coalesce(seo.noIndex, false) != true
    ] | order(title asc) {
      _id,
      "slug": slug.current,
      title,
      "description": editorialIntroduction,
      "routePath": routePath[] { _key, lat, lng }
    },
    "diveSites": *[
      _type == "diveSite" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current) &&
      coalesce(seo.noIndex, false) != true
    ] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      "description": excerpt,
      "coordinates": mapLocation.coordinates
    }
  }
`

const MAX_ROUTE_POINTS = 180

const approvedGatewayItems: readonly ExplorerItem[] = [
  {
    category: 'destination',
    coordinates: {latitude: 9.1216208, longitude: 123.2139803},
    href: '/destinations/apo-island',
    id: 'gateway-malatapay',
    title: 'Malatapay — boat departure for Apo Island',
  },
]

function normalizeCoordinates(value: RawCoordinates | null | undefined) {
  if (
    typeof value?.lat !== 'number' ||
    !Number.isFinite(value.lat) ||
    value.lat < -90 ||
    value.lat > 90 ||
    typeof value.lng !== 'number' ||
    !Number.isFinite(value.lng) ||
    value.lng < -180 ||
    value.lng > 180
  ) {
    return undefined
  }

  return {latitude: value.lat, longitude: value.lng}
}

function normalizeRoute(points: RawExplorerItem['routePath']) {
  const route = (points ?? [])
    .map(normalizeCoordinates)
    .filter((point): point is ExplorerCoordinates => Boolean(point))

  if (route.length < 2) return undefined
  if (route.length <= MAX_ROUTE_POINTS) return route

  const lastIndex = route.length - 1
  const sampled = Array.from({length: MAX_ROUTE_POINTS}, (_, index) =>
    route[Math.round((index * lastIndex) / (MAX_ROUTE_POINTS - 1))],
  )

  return sampled.filter(
    (point, index) =>
      index === 0 ||
      point.latitude !== sampled[index - 1]?.latitude ||
      point.longitude !== sampled[index - 1]?.longitude,
  )
}

function normalizeItems(
  items: RawExplorerItem[] | null | undefined,
  category: Exclude<ExplorerCategoryId, 'joshua-point'>,
  path: string,
) {
  return (items ?? []).reduce<ExplorerItem[]>((normalized, item) => {
    const id = item._id?.trim()
    const slug = item.slug?.trim()
    const title = (item.title ?? item.name)?.trim()
    if (!id || !slug || !title) return normalized

    normalized.push({
      category,
      coordinates: normalizeCoordinates(item.coordinates),
      description: item.description?.trim() || undefined,
      href: `${path}/${encodeURIComponent(slug)}`,
      id,
      route: category === 'scenic-route' ? normalizeRoute(item.routePath) : undefined,
      title,
    })
    return normalized
  }, [])
}

function normalizeSite(site: RawExplorerItem | null | undefined): ExplorerItem | null {
  if (!site) return null

  const id = site._id?.trim()
  const title = site.title?.trim()
  if (!id || !title) return null

  return {
    category: 'joshua-point',
    coordinates: normalizeCoordinates(site.coordinates),
    description: site.description?.trim() || undefined,
    href: '/the-house',
    id,
    title,
  }
}

export const getExplorerItems = cache(async (): Promise<ExplorerItem[]> => {
  try {
    const result = await sanityClient.fetch<ExplorerQueryResult | null>(
      explorerQuery,
      {},
      {next: {revalidate: 3600, tags: ['sanity:explorer']}},
    )

    if (!result) return []

    const site = normalizeSite(result.site)
    return [
      ...(site ? [site] : []),
      ...normalizeItems(result.destinations, 'destination', '/destinations'),
      ...approvedGatewayItems,
      ...normalizeItems(result.scenicRoutes, 'scenic-route', '/scenic-routes'),
      ...normalizeItems(result.diveSites, 'dive-site', '/dive-sites'),
    ]
  } catch (error) {
    console.error('Unable to load the Explorer map content from Sanity.', error)
    return []
  }
})
