import type {PortableTextBlock} from '@portabletext/react'

export type SanityImage = {
  alt?: string
  asset?: {
    _ref: string
    _type: 'reference'
  }
  crop?: {
    bottom: number
    left: number
    right: number
    top: number
  }
  decorative?: boolean
  hotspot?: {
    height: number
    width: number
    x: number
    y: number
  }
  lqip?: string
}

export type FeaturedDestination = {
  _id: string
  editorialIntroduction: string
  heroImage?: SanityImage
  title: string
}

export type DestinationsPageData = {
  _id: string
  editorialCopy: PortableTextBlock[]
  featuredDestinations: FeaturedDestination[]
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
