import type {
  DashboardDocument,
  DashboardImage,
  DashboardSiteSettings,
  DashboardStatus,
} from './types'

export type ContentReadiness = {
  canonicalReady: boolean
  effectiveDescription: string | null
  effectiveTitle: string | null
  photographyIssues: string[]
  photographyStatus: DashboardStatus
  reviewStatus: 'current' | 'missing' | 'stale' | 'unknown'
  seoStatus: DashboardStatus
  socialImageSource: 'default' | 'hero' | 'page' | 'unknown'
}

const fixedPaths: Record<string, string> = {
  destinationsPage: '/destinations',
  diveSitesPage: '/dive-sites',
  homePage: '/',
  housePage: '/the-house',
  roomsPage: '/rooms',
  scenicRoutesPage: '/scenic-routes',
}

const detailPaths: Record<string, string> = {
  destination: '/destinations',
  diveSite: '/dive-sites',
  scenicRoute: '/scenic-routes',
}

const informationPaths: Record<string, string> = {
  accessibilityStatement: '/accessibility',
  cancellationAndRebookingPolicy: '/cancellation-policy',
  cookiePolicy: '/cookies',
  emergencyInformation: '/emergency-information',
  guestInformation: '/guest-information',
  houseGuide: '/house-guide',
  planningYourStay: '/plan-your-stay',
  privacyPolicy: '/privacy',
  termsAndConditions: '/terms',
}

const reviewWindows: Partial<Record<string, number>> = {
  destination: 90,
  diveSite: 90,
  room: 365,
  scenicRoute: 90,
}

export const ownerPhotographyNeeds = [
  {documentType: 'destination', label: 'Pulangbato Falls', slug: 'pulangbato-falls'},
  {documentType: 'destination', label: 'Twin Lakes', slug: 'twin-lakes'},
  {documentType: 'destination', label: 'Valencia', slug: 'valencia'},
  {documentType: 'destination', label: 'Siaton', slug: 'siaton'},
  {documentType: 'scenicRoute', label: 'Twin Lakes Escape', slug: 'twin-lakes-escape'},
  {documentType: 'diveSite', label: 'Zamboanguita Dive Guide', slug: 'zamboanguita'},
  {
    documentType: 'scenicRoute',
    label: 'Coastal Ride to Dumaguete',
    slug: 'coastal-ride-to-dumaguete',
  },
  {documentType: 'scenicRoute', label: 'Southern Explorer', slug: 'southern-explorer'},
  {
    documentType: 'scenicRoute',
    label: 'Valencia Highlands Loop',
    slug: 'valencia-highlands-loop',
  },
  {documentType: 'scenicRoute', label: 'Waterfall Explorer', slug: 'waterfall-explorer'},
] as const

export function ownerPhotographyNeedFor(document: DashboardDocument) {
  return ownerPhotographyNeeds.find(
    (need) => need.documentType === document._type && need.slug === document.slug?.trim(),
  )
}

function hasImage(image: DashboardImage | null | undefined) {
  return Boolean(image?.asset?._ref)
}

function hasAnyImage(images: DashboardImage[] | null | undefined) {
  return (images ?? []).some(hasImage)
}

function validHttpsUrl(value: string | null | undefined) {
  if (!value?.trim()) return false
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export function baseDocumentId(id: string) {
  return id.replace(/^drafts\./, '')
}

export function isDraftDocument(document: DashboardDocument) {
  return document._id.startsWith('drafts.')
}

export function preferredDocuments(documents: DashboardDocument[]) {
  const preferred = new Map<string, DashboardDocument>()

  for (const document of documents) {
    const id = baseDocumentId(document._id)
    const current = preferred.get(id)
    if (!current || isDraftDocument(document)) preferred.set(id, document)
  }

  return [...preferred.values()]
}

export function publishedDocumentIds(documents: DashboardDocument[]) {
  return new Set(
    documents.filter((document) => !isDraftDocument(document)).map(({_id}) => baseDocumentId(_id)),
  )
}

function photographyReadiness(document: DashboardDocument) {
  if (ownerPhotographyNeedFor(document)) {
    return {
      issues: ['Owner-approved place-specific photography'],
      status: 'needsAttention' as const,
    }
  }

  return photographyContentType(document._type)
    ? {issues: [], status: 'complete' as const}
    : {issues: [], status: 'unknown' as const}
}

function photographyContentType(documentType: string) {
  return ['destination', 'diveSite', 'housePage', 'room', 'scenicRoute'].includes(documentType)
}

function reviewReadiness(document: DashboardDocument): ContentReadiness['reviewStatus'] {
  if (!['destination', 'diveSite', 'scenicRoute', 'room', 'housePage'].includes(document._type)) {
    return 'unknown'
  }
  if (!document.lastReviewedAt) return 'missing'

  const reviewedAt = new Date(document.lastReviewedAt)
  if (Number.isNaN(reviewedAt.getTime()) || reviewedAt.getTime() > Date.now()) return 'missing'

  const windowDays = reviewWindows[document._type]
  if (!windowDays) return 'current'
  const ageDays = (Date.now() - reviewedAt.getTime()) / (24 * 60 * 60 * 1000)
  return ageDays > windowDays ? 'stale' : 'current'
}

function canonicalReady(document: DashboardDocument, settings: DashboardSiteSettings | null) {
  if (document.canonicalUrl?.trim()) return validHttpsUrl(document.canonicalUrl)
  if (!validHttpsUrl(settings?.siteUrl)) return false
  if (fixedPaths[document._type]) return true
  if (detailPaths[document._type]) return Boolean(document.slug?.trim())
  if (document._type === 'informationPage') {
    return Boolean(informationPaths[baseDocumentId(document._id)])
  }

  // Room documents feed the Rooms page and do not own individual public routes.
  return document._type === 'room'
}

export function getContentReadiness(
  document: DashboardDocument,
  settings: DashboardSiteSettings | null,
): ContentReadiness {
  const effectiveTitle = document.seoTitle?.trim() || document.title?.trim() || null
  const effectiveDescription =
    document.seoDescription?.trim() ||
    document.summaryDescription?.trim() ||
    settings?.defaultSeo?.metaDescription?.trim() ||
    settings?.siteDescription?.trim() ||
    null
  const socialImageSource = hasImage(document.seoSocialImage)
    ? 'page'
    : hasImage(document.heroImage) || hasAnyImage(document.roomImages)
      ? 'hero'
      : hasImage(settings?.defaultSocialImage)
        ? 'default'
        : 'unknown'
  const canonical = canonicalReady(document, settings)
  const photography = photographyReadiness(document)
  const seoStatus =
    effectiveTitle && effectiveDescription && socialImageSource !== 'unknown' && canonical
      ? 'complete'
      : 'needsAttention'

  return {
    canonicalReady: canonical,
    effectiveDescription,
    effectiveTitle,
    photographyIssues: photography.issues,
    photographyStatus: photography.status,
    reviewStatus: reviewReadiness(document),
    seoStatus,
    socialImageSource,
  }
}

export function launchContentStatus(
  documents: DashboardDocument[],
  allDocuments: DashboardDocument[],
  settings: DashboardSiteSettings | null,
): DashboardStatus {
  if (!documents.length) return 'unknown'
  const published = publishedDocumentIds(allDocuments)

  const complete = documents.every((document) => {
    const readiness = getContentReadiness(document, settings)
    const reviewed = readiness.reviewStatus === 'current' || readiness.reviewStatus === 'unknown'
    return (
      published.has(baseDocumentId(document._id)) &&
      document.workflowStatus === 'approved' &&
      reviewed &&
      readiness.seoStatus === 'complete'
    )
  })

  return complete ? 'complete' : 'needsAttention'
}
