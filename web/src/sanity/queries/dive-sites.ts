import type {PortableTextBlock} from '@portabletext/react'
import {cache} from 'react'

import {sanityClient} from '../client'
import type {SanityImage} from '../types'

export type FeaturedDiveSite = {
  _id: string
  excerpt: string
  heroImage?: SanityImage
  name: string
}

export type DiveSitesPageData = {
  _id: string
  editorialCopy: PortableTextBlock[]
  featuredDiveSites: FeaturedDiveSite[]
  hero: {
    eyebrow: string
    image?: SanityImage
    introduction: string
    title: string
  }
  introduction: string
  seo?: {
    metaDescription?: string
    metaTitle?: string
    noIndex?: boolean
    socialDescription?: string
    socialImage?: SanityImage
    socialTitle?: string
  }
}

const diveSitesPageQuery = /* groq */ `
  *[_type == "diveSitesPage" && _id == "diveSitesPage"][0] {
    _id,
    hero {
      "eyebrow": coalesce(eyebrow, "Dive Guide"),
      "title": coalesce(title, "Dive Sites"),
      "introduction": coalesce(introduction, "A carefully reviewed field guide to diving in Southern Negros."),
      image {
        alt,
        asset,
        crop,
        decorative,
        hotspot,
        "lqip": asset->metadata.lqip
      }
    },
    introduction,
    "editorialCopy": editorialCopy[_type == "block"],
    "featuredDiveSites": featuredDiveSites[]-> {
      _id,
      name,
      excerpt,
      heroImage {
        alt,
        asset,
        crop,
        decorative,
        hotspot,
        "lqip": asset->metadata.lqip
      }
    },
    seo {
      metaDescription,
      metaTitle,
      noIndex,
      socialDescription,
      socialImage {
        alt,
        asset,
        crop,
        decorative,
        hotspot,
        "lqip": asset->metadata.lqip
      },
      socialTitle
    }
  }
`

type DiveSitesPageQueryResult = Omit<DiveSitesPageData, 'featuredDiveSites'> & {
  featuredDiveSites?: Array<FeaturedDiveSite | null>
}

function isFeaturedDiveSite(diveSite: FeaturedDiveSite | null): diveSite is FeaturedDiveSite {
  return Boolean(diveSite?._id && diveSite.name && diveSite.excerpt)
}

export const getDiveSitesPage = cache(async (): Promise<DiveSitesPageData | null> => {
  try {
    const page = await sanityClient.fetch<DiveSitesPageQueryResult | null>(
      diveSitesPageQuery,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['sanity:dive-sites-page'],
        },
      },
    )

    if (!page?._id || !page.hero || !page.introduction || !page.editorialCopy) return null

    return {
      ...page,
      featuredDiveSites: (page.featuredDiveSites ?? []).filter(isFeaturedDiveSite),
    }
  } catch (error) {
    console.error('Unable to load the published Dive Sites Page from Sanity.', error)
    return null
  }
})
