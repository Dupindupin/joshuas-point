export type DashboardStatus = 'blocked' | 'complete' | 'needsAttention' | 'unknown'

export type DashboardLiveStatus = {
  analyticsEnabled: boolean
  checkedAt: string
  comingSoon: boolean
  enquiryReplyToConfigured: boolean
  enquiryMode: 'disabled' | 'live' | 'test'
  newsletterReadiness: 'needsAttention' | 'ready'
  productionDomain: string | null
  resendConfigured: boolean
  senderConfigured: boolean
  segmentConfigured: boolean
  sendingDomainConfigured: boolean
  sentryEnabled: boolean
  siteDomainConfigured: boolean
  sitemapEnabled: boolean
  sslReady: boolean
  subscriptionReplyToConfigured: boolean
  subscriptionMode: 'disabled' | 'live'
  topicConfigured: boolean
}

export type DashboardImage = {
  asset?: {_ref?: string} | null
}

export type DashboardAvailabilityPeriod = {
  _key?: string
  endDate?: string | null
  startDate?: string | null
  status?: 'closed' | 'maintenance' | 'ownerStay' | 'reserved' | null
}

export type DashboardHouseAvailabilityDocument = {
  _id: string
  _rev?: string | null
  availabilityConfirmedThrough?: string | null
  lastReviewedAt?: string | null
  periods?: DashboardAvailabilityPeriod[] | null
  publicDisplayEnabled?: boolean | null
}

export type DashboardHouseAvailability = {
  draft?: DashboardHouseAvailabilityDocument | null
  published?: DashboardHouseAvailabilityDocument | null
}

export type DashboardPhotoStory = {
  closingImages?: DashboardImage[] | null
  detailImages?: DashboardImage[] | null
  heroImage?: DashboardImage | null
  journeyImages?: DashboardImage[] | null
  openingImages?: DashboardImage[] | null
  title?: string | null
}

export type DashboardDocument = {
  _id: string
  _type: string
  _updatedAt?: string | null
  canonicalUrl?: string | null
  contentBlockCount?: number | null
  eveningImage?: DashboardImage | null
  eveningPresent?: boolean | null
  heroImage?: DashboardImage | null
  indoorOutdoorImageCount?: number | null
  lastReviewedAt?: string | null
  mapLocation?: {coordinates?: unknown} | null
  materialCount?: number | null
  materialImageCount?: number | null
  morningImage?: DashboardImage | null
  morningPresent?: boolean | null
  name?: string | null
  noIndex?: boolean | null
  rainImage?: DashboardImage | null
  rainPresent?: boolean | null
  roomImages?: DashboardImage[] | null
  routePathCount?: number
  seoDescription?: string | null
  seoSocialImage?: DashboardImage | null
  seoTitle?: string | null
  sharedHeartImageCount?: number | null
  slug?: string | null
  stories?: DashboardPhotoStory[] | null
  summaryDescription?: string | null
  title?: string | null
  viewImage?: DashboardImage | null
  workflowStatus?: 'approved' | 'draft' | 'inReview' | null
}

export type DashboardSiteSettings = {
  _id: string
  appIconImage?: DashboardImage | null
  bookingLinks?: {
    enabled?: boolean | null
    primary?: {label?: string | null} | null
  } | null
  compactLogo?: DashboardImage | null
  contactDetails?: {
    address?: {
      country?: string | null
      locality?: string | null
      postalCode?: string | null
      region?: string | null
    } | null
    email?: string | null
    phone?: string | null
    whatsappUrl?: string | null
  } | null
  defaultSeo?: {
    metaDescription?: string | null
    metaTitle?: string | null
  } | null
  defaultSocialImage?: DashboardImage | null
  faviconImage?: DashboardImage | null
  footer?: {
    legalLinks?: Array<{label?: string | null} | null> | null
    socialLinks?: Array<{platform?: string | null; url?: string | null} | null> | null
  } | null
  primaryLogo?: DashboardImage | null
  primaryNavigation?: Array<{label?: string | null} | null> | null
  propertyLocation?: {coordinates?: unknown; label?: string | null} | null
  siteDescription?: string | null
  siteTitle?: string | null
  siteUrl?: string | null
  squareProfileImage?: DashboardImage | null
}

export type DashboardGuideEdition = {
  _id: string
  _type: string
  coverImage?: DashboardImage | null
  epubReady?: boolean | null
  pdfReady?: boolean | null
  photographyComplete?: boolean | null
  status?: string | null
  title?: string | null
}

export type OwnerDashboardData = {
  documents: DashboardDocument[]
  guideChapters: DashboardDocument[]
  guideEdition?: DashboardGuideEdition | null
  guideJourneys: DashboardDocument[]
  houseAvailability?: DashboardHouseAvailability | null
  settings?: DashboardSiteSettings | null
}
