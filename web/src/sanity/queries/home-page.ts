import {cache} from 'react'

import {sanityClient} from '../client'
import type {SanityHomePageData} from '../types'

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

const linkProjection = /* groq */ `{
  email,
  externalUrl,
  kind,
  label,
  openInNewTab,
  phone,
  reference->{
    _id,
    _type,
    "slug": slug.current
  }
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

const homePageQuery = /* groq */ `
  *[_type == "homePage" && _id == "homePage"][0] {
    _id,
    hero {
      eyebrow,
      heading,
      introduction,
      image ${editorialImageProjection}
    },
    placeStory {
      eyebrow,
      heading,
      body,
      image ${editorialImageProjection}
    },
    sharedLife {
      eyebrow,
      heading,
      body,
      image ${editorialImageProjection}
    },
    morningNarrative {
      eyebrow,
      heading,
      body,
      image ${editorialImageProjection}
    },
    southernNegrosIntroduction {
      eyebrow,
      heading,
      body,
      image ${editorialImageProjection},
      primaryLink ${linkProjection}
    },
    closingReflection {
      body,
      image ${editorialImageProjection}
    },
    seo ${seoProjection}
  }
`

export const getHomePage = cache(async (): Promise<SanityHomePageData | null> => {
  const page = await sanityClient.fetch<SanityHomePageData | null>(
    homePageQuery,
    {},
    {
      next: {
        revalidate: 3600,
        tags: ['sanity:home-page'],
      },
    },
  )

  if (!page?._id) return null
  return page
})
