import {cache} from 'react'

import {sanityClient} from '../client'
import type {
  DestinationDetailData,
  DestinationsPageData,
  FeaturedDestination,
  SanityImage,
} from '../types'

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

const destinationsPageQuery = /* groq */ `
  *[_type == "destinationsPage" && _id == "destinationsPage"][0] {
    _id,
    hero {
      "eyebrow": coalesce(eyebrow, "Travel Guide"),
      "title": coalesce(title, "Destinations"),
      "introduction": coalesce(introduction, "A slowly gathered guide to southern Negros."),
      image ${editorialImageProjection}
    },
    introduction,
    "editorialCopy": editorialCopy[_type == "block"],
    "featuredDestinations": featuredDestinations[]-> {
      _id,
      title,
      editorialIntroduction,
      heroImage ${editorialImageProjection}
    },
    seo ${seoProjection}
  }
`

const destinationBySlugQuery = /* groq */ `
  *[_type == "destination" && slug.current == $slug][0] {
    _id,
    destinationType,
    editorialIntroduction,
    excerpt,
    gallery {
      accessibleLabel,
      caption,
      "images": images[] ${editorialImageProjection}
    },
    heroImage ${editorialImageProjection},
    highlights,
    lastReviewedAt,
    mapLocation {
      coordinates,
      directionsUrl,
      label
    },
    "photographyNotes": photographyNotes[_type == "block"],
    seo ${seoProjection},
    "slug": slug.current,
    "story": story[_type == "block"],
    thingsToBring,
    tips,
    title,
    travelInformation {
      bestTimeToVisit,
      difficulty,
      entranceFee {
        amount,
        currency,
        notes
      },
      openingHours {
        hours,
        qualification
      },
      recommendedTransport,
      travelTimeFromJoshuaPoint {
        displayLabel,
        durationMinutes
      }
    },
    whyVisit
  }
`

const destinationSlugsQuery = /* groq */ `
  *[_type == "destination" && defined(slug.current)].slug.current
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

type DestinationDetailQueryResult = Omit<
  DestinationDetailData,
  'gallery' | 'highlights' | 'photographyNotes' | 'story' | 'thingsToBring' | 'tips'
> & {
  gallery?: {
    accessibleLabel?: string
    caption?: string
    images?: Array<SanityImage | null>
  }
  highlights?: Array<string | null>
  photographyNotes?: DestinationDetailData['photographyNotes']
  story?: DestinationDetailData['story']
  thingsToBring?: Array<string | null>
  tips?: Array<string | null>
}

function normalizeStrings(values: Array<string | null> | undefined) {
  return (values ?? []).filter((value): value is string => Boolean(value?.trim()))
}

export const getDestinationBySlug = cache(
  async (slug: string): Promise<DestinationDetailData | null> => {
    try {
      const destination = await sanityClient.fetch<DestinationDetailQueryResult | null>(
        destinationBySlugQuery,
        {slug},
        {
          next: {
            revalidate: 3600,
            tags: [`sanity:destination:${slug}`],
          },
        },
      )

      if (!destination?._id || !destination.slug || !destination.title) return null

      const galleryImages = (destination.gallery?.images ?? []).filter(
        (image): image is SanityImage => Boolean(image?.asset?._ref),
      )

      return {
        ...destination,
        gallery: destination.gallery
          ? {
              ...destination.gallery,
              images: galleryImages,
            }
          : undefined,
        highlights: normalizeStrings(destination.highlights),
        photographyNotes: destination.photographyNotes ?? [],
        story: destination.story ?? [],
        thingsToBring: normalizeStrings(destination.thingsToBring),
        tips: normalizeStrings(destination.tips),
        travelInformation: destination.travelInformation
          ? {
              ...destination.travelInformation,
              recommendedTransport: normalizeStrings(
                destination.travelInformation.recommendedTransport,
              ),
            }
          : undefined,
      }
    } catch (error) {
      console.error(`Unable to load destination “${slug}” from Sanity.`, error)
      return null
    }
  },
)

export const getDestinationSlugs = cache(async (): Promise<string[]> => {
  try {
    const slugs = await sanityClient.fetch<Array<string | null>>(
      destinationSlugsQuery,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['sanity:destination-slugs'],
        },
      },
    )

    return normalizeStrings(slugs)
  } catch (error) {
    console.error('Unable to load destination slugs from Sanity.', error)
    return []
  }
})
