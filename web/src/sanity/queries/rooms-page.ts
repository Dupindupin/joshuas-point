import {cache} from 'react'

import {sanityClient} from '../client'
import type {SanityRoomsPageData} from '../types'

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

const roomsPageQuery = /* groq */ `
  *[_type == "roomsPage" && _id == "roomsPage"][0] {
    _id,
    hero {
      eyebrow,
      title,
      introduction
    },
    editorialIntroduction {
      heading,
      body
    },
    collectionIntroduction {
      eyebrow,
      heading
    },
    featuredRooms[]-> {
      _id,
      title,
      excerpt,
      previewImage ${editorialImageProjection},
      capacity {
        maxGuests,
        displayLabel
      },
      beds[] {
        _key,
        type,
        quantity,
        roomLabel,
        notes
      },
      bathroom,
      outlooks,
      amenities[] {
        note,
        amenity-> {
          _id,
          active,
          category,
          internalKey,
          name,
          shortDescription
        }
      }
    },
    imageBreak ${editorialImageProjection},
    comfortPhilosophy {
      eyebrow,
      heading,
      body
    },
    closingReflection {
      body
    },
    seo ${seoProjection},
    workflowStatus,
    lastReviewedAt
  }
`

export const getRoomsPage = cache(async (): Promise<SanityRoomsPageData | null> => {
  try {
    const page = await sanityClient.fetch<SanityRoomsPageData | null>(
      roomsPageQuery,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['sanity:rooms-page'],
        },
      },
    )

    if (!page?._id) return null
    return page
  } catch (error) {
    console.error('Unable to load the published Rooms Page from Sanity.', error)
    return null
  }
})
