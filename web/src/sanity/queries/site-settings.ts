import {cache} from 'react'

import {sanityClient} from '../client'
import type {SanityImage, SanityInstagramPost} from '../types'

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

const siteSeoSettingsQuery = /* groq */ `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    compactLogo ${editorialImageProjection},
    defaultSocialImage ${editorialImageProjection},
    instagramHighlights[] {
      _key,
      caption,
      image ${editorialImageProjection},
      postUrl
    },
    propertyLocation {
      coordinates,
      directionsUrl,
      label
    },
    primaryLogo ${editorialImageProjection},
    "socialProfiles": footer.socialLinks[] {
      platform,
      url
    },
    siteDescription,
    squareProfileImage ${editorialImageProjection},
    siteTitle,
    siteUrl
  }
`

export type SiteSocialProfile = {
  platform?: string | null
  url?: string | null
}

export type SiteSeoSettings = {
  compactLogo?: SanityImage | null
  defaultSocialImage?: SanityImage | null
  instagramHighlights?: SanityInstagramPost[] | null
  propertyLocation?: {
    coordinates?: {lat?: number | null; lng?: number | null} | null
    directionsUrl?: string | null
    label?: string | null
  } | null
  primaryLogo?: SanityImage | null
  siteDescription?: string | null
  siteTitle?: string | null
  siteUrl?: string | null
  socialProfiles?: SiteSocialProfile[] | null
  squareProfileImage?: SanityImage | null
}

export const getSiteSeoSettings = cache(async (): Promise<SiteSeoSettings | null> => {
  try {
    return await sanityClient.fetch<SiteSeoSettings | null>(
      siteSeoSettingsQuery,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['sanity:site-settings'],
        },
      },
    )
  } catch (error) {
    console.error('Unable to load SEO settings from Sanity.', error)
    return null
  }
})
