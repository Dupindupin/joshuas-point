import type {PortableTextBlock} from '@portabletext/react'

export type SanityImage = {
  alt?: string
  asset?: {
    _ref: string
    _type: 'reference'
  }
  caption?: string
  credit?: string
  creditUrl?: string
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

export type SeoData = {
  canonicalUrl?: string
  metaDescription?: string
  metaTitle?: string
  noIndex?: boolean
  socialDescription?: string
  socialImage?: SanityImage
  socialTitle?: string
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
  seo?: SeoData
}

export type DestinationDetailData = {
  _id: string
  destinationType?: string
  editorialIntroduction?: string
  excerpt?: string
  gallery?: {
    accessibleLabel?: string
    caption?: string
    images: SanityImage[]
  }
  heroImage?: SanityImage
  highlights: string[]
  lastReviewedAt?: string
  mapLocation?: {
    coordinates?: {
      lat: number
      lng: number
    }
    directionsUrl?: string
    label?: string
  }
  photographyNotes: PortableTextBlock[]
  seo?: SeoData
  slug: string
  story: PortableTextBlock[]
  thingsToBring: string[]
  tips: string[]
  title: string
  travelInformation?: {
    bestTimeToVisit?: string
    difficulty?: string
    entranceFee?: {
      amount?: number
      currency?: string
      notes?: string
    }
    openingHours?: {
      hours?: string
      qualification?: string
    }
    recommendedTransport: string[]
    travelTimeFromJoshuaPoint?: {
      displayLabel?: string
      durationMinutes?: number
    }
  }
  whyVisit?: string
}
