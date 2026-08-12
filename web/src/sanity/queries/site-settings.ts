import {cache} from 'react'

import {sanityClient} from '../client'
import {mapSanitySiteSettings, type SiteSettingsData} from '../mappers/site-settings'
import type {SanitySiteSettingsData} from '../types'

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

const linkProjection = /* groq */ `{
  email,
  externalUrl,
  internalRoute,
  kind,
  label,
  openInNewTab,
  phone,
  "reference": reference->{
    _id,
    _type,
    "slug": slug.current
  }
}`

const contactDetailsProjection = /* groq */ `{
  address {
    country,
    locality,
    postalCode,
    region
  },
  email,
  inquiryNote,
  mapUrl,
  phone,
  phoneHref,
  whatsappUrl
}`

const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings" && _id == "siteSettings"][0] {
    _id,
    appIconImage ${editorialImageProjection},
    bookingLinks {
      disclosure,
      enabled,
      inquiry ${linkProjection},
      primary ${linkProjection}
    },
    compactLogo ${editorialImageProjection},
    contactDetails ${contactDetailsProjection},
    defaultSeo ${seoProjection},
    defaultSocialImage ${editorialImageProjection},
    faviconImage ${editorialImageProjection},
    footer {
      contactDetailsOverride ${contactDetailsProjection},
      copyrightText,
      introduction,
      legalLinks[] {
        _key,
        label,
        link ${linkProjection}
      },
      navigationGroups[] {
        _key,
        title,
        items[] {
          _key,
          label,
          link ${linkProjection}
        }
      }
    },
    instagramHighlights[] {
      _key,
      caption,
      image ${editorialImageProjection},
      postUrl
    },
    primaryLogo ${editorialImageProjection},
    primaryNavigation[] {
      _key,
      label,
      link ${linkProjection}
    },
    propertyLocation {
      coordinates,
      directionsUrl,
      label
    },
    "socialProfiles": footer.socialLinks[] {
      platform,
      url
    },
    siteDescription,
    siteTitle,
    siteUrl,
    squareProfileImage ${editorialImageProjection}
  }
`

/** Returns the complete, normalized public Site Settings read model. */
export const getSiteSeoSettings = cache(async (): Promise<SiteSettingsData | null> => {
  try {
    const settings = await sanityClient.fetch<SanitySiteSettingsData | null>(
      siteSettingsQuery,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['sanity:site-settings'],
        },
      },
    )

    return mapSanitySiteSettings(settings)
  } catch (error) {
    console.error('Unable to load Site Settings from Sanity.', error)
    return null
  }
})

export type {SiteSettingsData} from '../mappers/site-settings'
