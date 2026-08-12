import type {PortableTextBlock} from '@portabletext/react'

export type SanityImage = {
  alt?: string | null
  asset?: {
    _ref: string
    _type: 'reference'
  } | null
  caption?: string | null
  credit?: string | null
  creditUrl?: string | null
  crop?: {
    bottom: number
    left: number
    right: number
    top: number
  } | null
  decorative?: boolean | null
  hotspot?: {
    height: number
    width: number
    x: number
    y: number
  } | null
  lqip?: string | null
}

export type SanityInstagramPost = {
  _key?: string | null
  caption?: string | null
  image?: SanityImage | null
  postUrl?: string | null
}

export type SeoData = {
  canonicalUrl?: string | null
  metaDescription?: string | null
  metaTitle?: string | null
  noIndex?: boolean | null
  socialDescription?: string | null
  socialImage?: SanityImage | null
  socialTitle?: string | null
}

export type SanityAmenity = {
  _id: string
  active?: boolean | null
  category?:
    | 'bathing'
    | 'climate'
    | 'connectivity'
    | 'cooking'
    | 'energy'
    | 'entertainment'
    | 'outdoorLiving'
    | 'parking'
    | 'service'
    | 'sharedLiving'
    | 'stayArrangement'
    | 'transport'
    | 'water'
    | null
  internalKey?: string | null
  name?: string | null
  shortDescription?: string | null
}

export type SanityRoomAmenity = {
  amenity?: SanityAmenity | null
  note?: string | null
}

export type SanityLinkReference = {
  _id?: string | null
  _type?:
    | 'destination'
    | 'destinationsPage'
    | 'diveSite'
    | 'diveSitesPage'
    | 'homePage'
    | 'housePage'
    | 'room'
    | 'scenicRoute'
    | 'scenicRoutesPage'
    | null
  slug?: string | null
}

export type SanityLink = {
  email?: string | null
  externalUrl?: string | null
  kind?: 'email' | 'external' | 'internal' | 'phone' | null
  label?: string | null
  openInNewTab?: boolean | null
  phone?: string | null
  reference?: SanityLinkReference | null
}

type SanityHomeImageSection = {
  body?: string | null
  eyebrow?: string | null
  heading?: string | null
  image?: SanityImage | null
}

export type SanityHomePageData = {
  _id: string
  closingReflection?: {
    body?: string | null
    image?: SanityImage | null
  } | null
  hero?: {
    eyebrow?: string | null
    heading?: string | null
    image?: SanityImage | null
    introduction?: string | null
  } | null
  morningNarrative?: SanityHomeImageSection | null
  placeStory?: SanityHomeImageSection | null
  seo?: SeoData | null
  sharedLife?: SanityHomeImageSection | null
  southernNegrosIntroduction?: {
    body?: string | null
    eyebrow?: string | null
    heading?: string | null
    image?: SanityImage | null
    primaryLink?: SanityLink | null
  } | null
}

export type SanityHouseStoryImage = {
  _key?: string | null
  image?: SanityImage | null
  role?: 'deckShelter' | 'poolRelationship' | 'threshold' | null
}

export type SanityHouseDailyRhythmMoment = {
  body?: string | null
  image?: SanityImage | null
}

export type SanityHouseMaterialEntry = {
  _key?: string | null
  description?: string | null
  image?: SanityImage | null
  name?: string | null
}

export type SanityHousePageData = {
  _id: string
  closingReflection?: {
    body?: string | null
  } | null
  dailyRhythms?: {
    evening?: SanityHouseDailyRhythmMoment | null
    morning?: SanityHouseDailyRhythmMoment | null
    rain?: SanityHouseDailyRhythmMoment | null
  } | null
  hero?: {
    eyebrow?: string | null
    image?: SanityImage | null
    introduction?: string | null
    title?: string | null
  } | null
  indoorOutdoorStory?: {
    body?: string | null
    heading?: string | null
    images?: Array<SanityHouseStoryImage | null> | null
  } | null
  lastReviewedAt?: string | null
  materialsAndArchitecture?: {
    body?: string | null
    heading?: string | null
    materials?: Array<SanityHouseMaterialEntry | null> | null
  } | null
  openingReflection?: {
    body?: string | null
    heading?: string | null
  } | null
  seo?: SeoData | null
  sharedHeart?: {
    body?: string | null
    heading?: string | null
    images?: Array<SanityImage | null> | null
  } | null
  view?: {
    caption?: string | null
    image?: SanityImage | null
  } | null
  workflowStatus?: 'approved' | 'draft' | 'inReview' | null
}

export type SanityBedConfiguration = {
  _key?: string | null
  notes?: string | null
  quantity?: number | null
  roomLabel?: string | null
  type?: 'bunk' | 'double' | 'king' | 'queen' | 'single' | 'sofaBed' | null
}

export type SanityRoomPreview = {
  _id?: string | null
  amenities?: Array<SanityRoomAmenity | null> | null
  bathroom?: 'privateEnsuite' | null
  beds?: Array<SanityBedConfiguration | null> | null
  capacity?: {
    displayLabel?: string | null
    maxGuests?: number | null
  } | null
  excerpt?: string | null
  outlooks?: Array<'boholSea' | 'garden' | 'pool' | null> | null
  previewImage?: SanityImage | null
  title?: string | null
}

export type SanityRoomsPageData = {
  _id: string
  closingReflection?: {
    body?: string | null
  } | null
  collectionIntroduction?: {
    eyebrow?: string | null
    heading?: string | null
  } | null
  comfortPhilosophy?: {
    body?: string | null
    eyebrow?: string | null
    heading?: string | null
  } | null
  editorialIntroduction?: {
    body?: string | null
    heading?: string | null
  } | null
  featuredRooms?: Array<SanityRoomPreview | null> | null
  hero?: {
    eyebrow?: string | null
    introduction?: string | null
    title?: string | null
  } | null
  imageBreak?: SanityImage | null
  lastReviewedAt?: string | null
  seo?: SeoData | null
  workflowStatus?: 'approved' | 'draft' | 'inReview' | null
}

export type FeaturedDestination = {
  _id: string
  editorialIntroduction: string
  heroImage?: SanityImage
  slug: string
  title: string
}

export type PublishedDestination = FeaturedDestination & {
  _updatedAt?: string
  destinationType?: string
}

export type SanityEditorialPhotography = {
  stories?: Array<{
    _key?: string
    accessibleLabel?: string | null
    closingImages?: Array<SanityImage | null> | null
    detailImages?: Array<SanityImage | null> | null
    heroImage?: SanityImage | null
    introduction?: string | null
    journeyImages?: Array<SanityImage | null> | null
    openingImages?: Array<SanityImage | null> | null
    title?: string | null
  } | null> | null
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
  editorialPhotography?: SanityEditorialPhotography | null
  excerpt?: string
  gallery?: {
    accessibleLabel?: string
    caption?: string
    images: SanityImage[]
  }
  heroImage?: SanityImage
  highlights: string[]
  instagramHighlights: SanityInstagramPost[]
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
