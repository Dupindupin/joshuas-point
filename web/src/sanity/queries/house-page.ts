import {cache} from 'react'

import {sanityClient} from '../client'
import type {SanityHousePageData} from '../types'

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

const housePageQuery = /* groq */ `
  *[_type == "housePage" && _id == "housePage"][0] {
    _id,
    hero {
      eyebrow,
      title,
      introduction,
      image ${editorialImageProjection}
    },
    openingReflection {
      heading,
      body
    },
    sharedHeart {
      heading,
      body,
      "images": images[] ${editorialImageProjection}
    },
    view {
      image ${editorialImageProjection},
      caption
    },
    indoorOutdoorStory {
      heading,
      body,
      images[] {
        _key,
        role,
        image ${editorialImageProjection}
      }
    },
    dailyRhythms {
      morning {
        body,
        image ${editorialImageProjection}
      },
      rain {
        body,
        image ${editorialImageProjection}
      },
      evening {
        body,
        image ${editorialImageProjection}
      }
    },
    materialsAndArchitecture {
      heading,
      body,
      materials[] {
        _key,
        name,
        description,
        image ${editorialImageProjection}
      }
    },
    closingReflection {
      body
    },
    seo ${seoProjection},
    workflowStatus,
    lastReviewedAt
  }
`

export const getHousePage = cache(async (): Promise<SanityHousePageData | null> => {
  try {
    const page = await sanityClient.fetch<SanityHousePageData | null>(
      housePageQuery,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['sanity:house-page'],
        },
      },
    )

    if (!page?._id) return null
    return page
  } catch (error) {
    console.error('Unable to load the published House Page from Sanity.', error)
    return null
  }
})
