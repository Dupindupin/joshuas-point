import {cache} from 'react'

import {sanityClient} from '../client'
import type {DestinationsPageData, FeaturedDestination} from '../types'

const destinationsPageQuery = /* groq */ `
  *[_type == "destinationsPage" && _id == "destinationsPage"][0] {
    _id,
    hero {
      "eyebrow": coalesce(eyebrow, "Travel Guide"),
      "title": coalesce(title, "Destinations"),
      "introduction": coalesce(introduction, "A slowly gathered guide to southern Negros."),
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
    "featuredDestinations": featuredDestinations[]-> {
      _id,
      title,
      editorialIntroduction,
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

type DestinationsPageQueryResult = Omit<DestinationsPageData, 'featuredDestinations'> & {
  featuredDestinations?: Array<FeaturedDestination | null>
}

function isFeaturedDestination(
  destination: FeaturedDestination | null,
): destination is FeaturedDestination {
  return Boolean(destination?._id && destination.title && destination.editorialIntroduction)
}

export const getDestinationsPage = cache(async (): Promise<DestinationsPageData | null> => {
  try {
    const page = await sanityClient.fetch<DestinationsPageQueryResult | null>(
      destinationsPageQuery,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['sanity:destinations-page'],
        },
      },
    )

    if (!page?._id || !page.hero || !page.introduction || !page.editorialCopy) return null

    return {
      ...page,
      featuredDestinations: (page.featuredDestinations ?? []).filter(isFeaturedDestination),
    }
  } catch (error) {
    console.error('Unable to load the published Destinations Page from Sanity.', error)
    return null
  }
})
