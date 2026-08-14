export type DashboardStatus = 'blocked' | 'complete' | 'needsAttention'

export type DashboardLiveStatus = {
  analyticsEnabled: boolean
  checkedAt: string
  comingSoon: boolean
  enquiryMode: 'disabled' | 'live' | 'test'
  newsletterReadiness: 'needsAttention' | 'ready'
  resendConfigured: boolean
  senderConfigured: boolean
  sendingDomainConfigured: boolean
  sentryEnabled: boolean
  siteDomainConfigured: boolean
  subscriptionMode: 'disabled' | 'live'
}

export type DashboardImage = {
  asset?: {_ref?: string} | null
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
  canonicalUrl?: string | null
  heroImage?: DashboardImage | null
  mapLocation?: {coordinates?: unknown} | null
  name?: string | null
  noIndex?: boolean | null
  routePathCount?: number
  seoDescription?: string | null
  seoSocialImage?: DashboardImage | null
  seoTitle?: string | null
  slug?: string | null
  stories?: DashboardPhotoStory[] | null
  title?: string | null
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
  settings?: DashboardSiteSettings | null
}
