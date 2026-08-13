import type {PortableTextBlock} from '@portabletext/react'
import {cache} from 'react'

import {sanityClient} from '../client'
import type {SanityEditorialPhotography, SanityGallery, SanityImage, SeoData} from '../types'

const editorialImageProjection = /* groq */ `{
  alt,
  asset,
  caption,
  credit,
  creditUrl,
  crop,
  decorative,
  "dimensions": asset->metadata.dimensions,
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

export type FeaturedDiveSite = {
  _id: string
  _updatedAt?: string | null
  excerpt: string
  heroImage?: SanityImage | null
  name: string
  slug: string
}

export type DiveSitesPageData = {
  _id: string
  editorialCopy: PortableTextBlock[]
  featuredDiveSites: FeaturedDiveSite[]
  hero: {
    eyebrow: string
    image?: SanityImage | null
    introduction: string
    title: string
  }
  introduction: string
  seo?: SeoData | null
}

export type DiveSiteDetailData = FeaturedDiveSite & {
  averageDepthMeters?: number | null
  bestSeason?: string | null
  current?: 'calm' | 'moderate' | 'strong' | 'variable' | null
  description: PortableTextBlock[]
  diveLevel?: 'advanced' | 'beginner' | 'intermediate' | null
  entryType?: 'boat' | 'mixed' | 'shore' | null
  editorialPhotography?: SanityEditorialPhotography | null
  gallery?: SanityGallery | null
  mapLocation?: {
    coordinates?: {lat: number; lng: number} | null
    directionsUrl?: string | null
    label?: string | null
  } | null
  marineLife: string[]
  maximumDepthMeters?: number | null
  nearbyDestinations: Array<{_id: string; slug: string; title: string}>
  photographyNotes: PortableTextBlock[]
  safetyNotes?: string | null
  seo?: SeoData | null
  visibility?: {
    maximumMeters?: number | null
    minimumMeters?: number | null
    notes?: string | null
  } | null
}

const summaryProjection = /* groq */ `{
  _id,
  _updatedAt,
  name,
  "slug": slug.current,
  excerpt,
  heroImage ${editorialImageProjection}
}`

const diveSitesPageQuery = /* groq */ `
  *[_type == "diveSitesPage" && _id == "diveSitesPage"][0] {
    _id,
    hero {
      "eyebrow": coalesce(eyebrow, "Dive Guide"),
      "title": coalesce(title, "Dive Sites"),
      introduction,
      image ${editorialImageProjection}
    },
    introduction,
    "editorialCopy": editorialCopy[_type == "block"],
    "featuredDiveSites": featuredDiveSites[]-> {
      _id,
      _updatedAt,
      "noIndex": coalesce(seo.noIndex, false),
      name,
      "slug": slug.current,
      excerpt,
      heroImage ${editorialImageProjection}
    },
    seo ${seoProjection}
  }
`

const publishedDiveSitesQuery = /* groq */ `
  *[
    _type == "diveSite" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current) &&
    coalesce(seo.noIndex, false) != true
  ] | order(name asc) ${summaryProjection}
`

const diveSiteSlugsQuery = /* groq */ `
  *[
    _type == "diveSite" &&
    !(_id in path("drafts.**")) &&
    defined(slug.current) &&
    coalesce(seo.noIndex, false) != true
  ].slug.current
`

const diveSiteBySlugQuery = /* groq */ `
  *[_type == "diveSite" && slug.current == $slug][0] {
    _id,
    _updatedAt,
    name,
    "slug": slug.current,
    excerpt,
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
    gallery {
      accessibleLabel,
      caption,
      "images": images[defined(asset)] ${editorialImageProjection}
    },
    heroImage ${editorialImageProjection},
    "description": description[_type == "block"],
    marineLife,
    "photographyNotes": photographyNotes[_type == "block"],
    safetyNotes,
    diveLevel,
    maximumDepthMeters,
    averageDepthMeters,
    visibility {
      minimumMeters,
      maximumMeters,
      notes
    },
    current,
    entryType,
    bestSeason,
    mapLocation {
      coordinates,
      directionsUrl,
      label
    },
    "nearbyDestinations": nearbyDestinations[]-> {
      _id,
      "slug": slug.current,
      title
    },
    seo ${seoProjection}
  }
`

type DiveSitesPageQueryResult = Omit<DiveSitesPageData, 'featuredDiveSites'> & {
  featuredDiveSites?: Array<(FeaturedDiveSite & {noIndex?: boolean | null}) | null> | null
}

function isDiveSiteSummary(
  diveSite: (FeaturedDiveSite & {noIndex?: boolean | null}) | null,
): diveSite is FeaturedDiveSite {
  return Boolean(
    diveSite?._id && diveSite.name && diveSite.slug && diveSite.excerpt && !diveSite.noIndex,
  )
}

export const getDiveSitesPage = cache(async (): Promise<DiveSitesPageData | null> => {
  try {
    const page = await sanityClient.fetch<DiveSitesPageQueryResult | null>(
      diveSitesPageQuery,
      {},
      {next: {revalidate: 3600, tags: ['sanity:dive-sites-page']}},
    )

    if (!page?._id || !page.hero?.introduction || !page.introduction || !page.editorialCopy) {
      return null
    }

    return {
      ...page,
      featuredDiveSites: (page.featuredDiveSites ?? []).filter(isDiveSiteSummary),
    }
  } catch (error) {
    console.error('Unable to load the published Dive Sites Page from Sanity.', error)
    return null
  }
})

export const getPublishedDiveSites = cache(async (): Promise<FeaturedDiveSite[]> => {
  try {
    const diveSites = await sanityClient.fetch<Array<FeaturedDiveSite | null>>(
      publishedDiveSitesQuery,
      {},
      {next: {revalidate: 3600, tags: ['sanity:dive-sites']}},
    )
    return (diveSites ?? []).filter(isDiveSiteSummary)
  } catch (error) {
    console.error('Unable to load published dive sites from Sanity.', error)
    return []
  }
})

export const getDiveSiteSlugs = cache(async (): Promise<string[]> => {
  try {
    const slugs = await sanityClient.fetch<Array<string | null>>(
      diveSiteSlugsQuery,
      {},
      {next: {revalidate: 3600, tags: ['sanity:dive-site-slugs']}},
    )
    return (slugs ?? []).filter((slug): slug is string => Boolean(slug?.trim()))
  } catch (error) {
    console.error('Unable to load published dive-site slugs from Sanity.', error)
    return []
  }
})

type DiveSiteDetailQueryResult = Omit<
  DiveSiteDetailData,
  'description' | 'marineLife' | 'nearbyDestinations' | 'photographyNotes'
> & {
  description?: PortableTextBlock[] | null
  marineLife?: Array<string | null> | null
  nearbyDestinations?: Array<DiveSiteDetailData['nearbyDestinations'][number] | null> | null
  photographyNotes?: PortableTextBlock[] | null
}

export const getDiveSiteBySlug = cache(async (slug: string): Promise<DiveSiteDetailData | null> => {
  try {
    const diveSite = await sanityClient.fetch<DiveSiteDetailQueryResult | null>(
      diveSiteBySlugQuery,
      {slug},
      {next: {revalidate: 3600, tags: [`sanity:dive-site:${slug}`]}},
    )
    if (!diveSite?._id || !diveSite.name || !diveSite.slug || !diveSite.excerpt) return null

    return {
      ...diveSite,
      description: diveSite.description ?? [],
      marineLife: (diveSite.marineLife ?? []).filter((item): item is string =>
        Boolean(item?.trim()),
      ),
      nearbyDestinations: (diveSite.nearbyDestinations ?? []).filter(
        (destination): destination is DiveSiteDetailData['nearbyDestinations'][number] =>
          Boolean(destination?._id && destination.slug && destination.title),
      ),
      photographyNotes: diveSite.photographyNotes ?? [],
    }
  } catch (error) {
    console.error(`Unable to load dive site “${slug}” from Sanity.`, error)
    return null
  }
})
