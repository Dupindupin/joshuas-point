import type {PortableTextBlock} from '@portabletext/react'
import {cache} from 'react'

import {sanityClient} from '../client'
import type {SanityEditorialPhotography, SanityImage, SeoData} from '../types'

const editorialImageProjection = /* groq */ `{
  alt,
  asset,
  caption,
  credit,
  creditUrl,
  crop,
  decorative,
  hotspot,
  "lqip": asset->metadata.lqip
}`

const seoProjection = /* groq */ `{
  canonicalUrl,
  metaDescription,
  metaTitle,
  noIndex,
  socialDescription,
  socialImage ${editorialImageProjection},
  socialTitle
}`

const mapLocationProjection = /* groq */ `{
  coordinates,
  directionsUrl,
  label
}`

export type ScenicRouteSummary = {
  _id: string
  _updatedAt?: string | null
  editorialIntroduction: string
  excerpt: string
  heroImage?: SanityImage | null
  slug: string
  title: string
}

export type ScenicRoutesPageData = {
  _id: string
  editorialCopy: PortableTextBlock[]
  featuredRoutes: ScenicRouteSummary[]
  hero: {
    eyebrow: string
    image?: SanityImage | null
    introduction: string
    title: string
  }
  introduction: string
  seo?: SeoData | null
}

export type ScenicRouteStop = {
  _key: string
  destination?: {
    _id: string
    mapLocation?: ScenicRouteMapLocation | null
    slug?: string | null
    title: string
  } | null
  label: string
  location?: ScenicRouteMapLocation | null
  note?: string | null
}

export type ScenicRouteMapLocation = {
  coordinates?: {
    lat: number
    lng: number
  } | null
  directionsUrl?: string | null
  label?: string | null
}

export type ScenicRoutePathPoint = {
  _key: string
  lat: number
  lng: number
}

export type ScenicRouteDetailData = ScenicRouteSummary & {
  editorialPhotography?: SanityEditorialPhotography | null
  photographyNotes: PortableTextBlock[]
  relatedDestinations: Array<{
    _id: string
    slug: string
    title: string
  }>
  routePath: ScenicRoutePathPoint[]
  routeStops: ScenicRouteStop[]
  safetyNotes?: string | null
  scooterGuide?: {
    difficulty?: 'demanding' | 'easy' | 'moderate' | null
    fuel?: string | null
    lastReviewedAt?: string | null
    parking?: string | null
    roadQuality?: 'mixed' | 'paved' | 'rough' | 'variable' | null
    routeNotes?: string | null
  } | null
  seo?: SeoData | null
  story: PortableTextBlock[]
  travelTime?: {
    displayLabel?: string | null
    durationMinutes?: number | null
  } | null
}

const scenicRoutesPageQuery = /* groq */ `
  *[_type == "scenicRoutesPage" && _id == "scenicRoutesPage"][0] {
    _id,
    hero {
      "eyebrow": coalesce(eyebrow, "Scenic Routes"),
      "title": coalesce(title, "The road as part of the journey."),
      introduction,
      image ${editorialImageProjection}
    },
    introduction,
    "editorialCopy": editorialCopy[_type == "block"],
    "featuredRoutes": featuredRoutes[]-> {
      _id,
      _updatedAt,
      "noIndex": coalesce(seo.noIndex, false),
      "slug": slug.current,
      title,
      excerpt,
      editorialIntroduction,
      heroImage ${editorialImageProjection}
    },
    seo ${seoProjection}
  }
`

const publishedScenicRoutesQuery = /* groq */ `
  *[
    _type == "scenicRoute" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current) &&
    coalesce(seo.noIndex, false) != true
  ] | order(title asc) {
    _id,
    _updatedAt,
    "slug": slug.current,
    title,
    excerpt,
    editorialIntroduction,
    heroImage ${editorialImageProjection}
  }
`

const scenicRouteSlugsQuery = /* groq */ `
  *[
    _type == "scenicRoute" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current) &&
    coalesce(seo.noIndex, false) != true
  ].slug.current
`

const scenicRouteBySlugQuery = /* groq */ `
  *[_type == "scenicRoute" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    "slug": slug.current,
    title,
    excerpt,
    editorialIntroduction,
    editorialPhotography {
      "stories": stories[] {
        _key,
        accessibleLabel,
        "closingImages": closingImages[defined(asset)] ${editorialImageProjection},
        "detailImages": detailImages[defined(asset)] ${editorialImageProjection},
        heroImage ${editorialImageProjection},
        introduction,
        "journeyImages": journeyImages[defined(asset)] ${editorialImageProjection},
        "openingImages": openingImages[defined(asset)] ${editorialImageProjection},
        title,
      }
    },
    heroImage ${editorialImageProjection},
    "story": story[_type == "block"],
    "photographyNotes": photographyNotes[_type == "block"],
    "routeStops": routeStops[] {
      _key,
      label,
      note,
      location ${mapLocationProjection},
      destination-> {
        _id,
        title,
        "slug": slug.current,
        mapLocation ${mapLocationProjection}
      }
    },
    "routePath": routePath[] {
      _key,
      lat,
      lng
    },
    travelTime {
      displayLabel,
      durationMinutes
    },
    scooterGuide {
      difficulty,
      fuel,
      lastReviewedAt,
      parking,
      roadQuality,
      routeNotes
    },
    safetyNotes,
    "relatedDestinations": relatedDestinations[]-> {
      _id,
      "slug": slug.current,
      title
    },
    seo ${seoProjection}
  }
`

type ScenicRoutesPageQueryResult = Omit<ScenicRoutesPageData, 'featuredRoutes'> & {
  featuredRoutes?: Array<(ScenicRouteSummary & {noIndex?: boolean | null}) | null> | null
}

function isRouteSummary(
  route: (ScenicRouteSummary & {noIndex?: boolean | null}) | null,
): route is ScenicRouteSummary {
  return Boolean(
    route?._id &&
    route.slug &&
    route.title &&
    route.excerpt &&
    route.editorialIntroduction &&
    !route.noIndex,
  )
}

function normalizeRoutes(routes: Array<ScenicRouteSummary | null> | null | undefined) {
  return (routes ?? []).filter((route): route is ScenicRouteSummary =>
    Boolean(
      route?._id && route.slug && route.title && route.excerpt && route.editorialIntroduction,
    ),
  )
}

export const getScenicRoutesPage = cache(async (): Promise<ScenicRoutesPageData | null> => {
  try {
    const page = await sanityClient.fetch<ScenicRoutesPageQueryResult | null>(
      scenicRoutesPageQuery,
      {},
      {
        next: {revalidate: 3600, tags: ['sanity:scenic-routes-page']},
      },
    )

    if (!page?._id || !page.hero?.introduction || !page.introduction || !page.editorialCopy) {
      return null
    }

    return {
      ...page,
      featuredRoutes: (page.featuredRoutes ?? []).filter(isRouteSummary),
    }
  } catch (error) {
    console.error('Unable to load the published Scenic Routes Page from Sanity.', error)
    return null
  }
})

export const getPublishedScenicRoutes = cache(async (): Promise<ScenicRouteSummary[]> => {
  try {
    const routes = await sanityClient.fetch<Array<ScenicRouteSummary | null>>(
      publishedScenicRoutesQuery,
      {},
      {
        next: {revalidate: 3600, tags: ['sanity:scenic-routes']},
      },
    )
    return normalizeRoutes(routes)
  } catch (error) {
    console.error('Unable to load published scenic routes from Sanity.', error)
    return []
  }
})

export const getScenicRouteSlugs = cache(async (): Promise<string[]> => {
  try {
    const slugs = await sanityClient.fetch<Array<string | null>>(
      scenicRouteSlugsQuery,
      {},
      {
        next: {revalidate: 3600, tags: ['sanity:scenic-route-slugs']},
      },
    )
    return slugs.filter((slug): slug is string => Boolean(slug?.trim()))
  } catch (error) {
    console.error('Unable to load scenic route slugs from Sanity.', error)
    return []
  }
})

type ScenicRouteDetailQueryResult = Omit<
  ScenicRouteDetailData,
  'photographyNotes' | 'relatedDestinations' | 'routePath' | 'routeStops' | 'story'
> & {
  photographyNotes?: PortableTextBlock[] | null
  relatedDestinations?: ScenicRouteDetailData['relatedDestinations'] | null
  routePath?: Array<ScenicRoutePathPoint | null> | null
  routeStops?: Array<ScenicRouteStop | null> | null
  story?: PortableTextBlock[] | null
}

export const getScenicRouteBySlug = cache(
  async (slug: string): Promise<ScenicRouteDetailData | null> => {
    try {
      const route = await sanityClient.fetch<ScenicRouteDetailQueryResult | null>(
        scenicRouteBySlugQuery,
        {slug},
        {
          next: {revalidate: 3600, tags: [`sanity:scenic-route:${slug}`]},
        },
      )

      if (!route?._id || !route.slug || !route.title || !route.excerpt) return null

      return {
        ...route,
        photographyNotes: route.photographyNotes ?? [],
        relatedDestinations: (route.relatedDestinations ?? []).filter((destination) =>
          Boolean(destination?._id && destination.title && destination.slug),
        ),
        routePath: (route.routePath ?? []).filter((point): point is ScenicRoutePathPoint =>
          Boolean(point?._key && Number.isFinite(point.lat) && Number.isFinite(point.lng)),
        ),
        routeStops: (route.routeStops ?? []).filter((stop): stop is ScenicRouteStop =>
          Boolean(stop?._key && stop.label),
        ),
        story: route.story ?? [],
      }
    } catch (error) {
      console.error(`Unable to load scenic route “${slug}” from Sanity.`, error)
      return null
    }
  },
)
