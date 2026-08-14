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

const reviewWindows: Partial<Record<string, number>> = {
  destination: 90,
  diveSite: 90,
  room: 365,
  scenicRoute: 90,
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
  const issues: string[] = []

  if (['destination', 'diveSite', 'scenicRoute'].includes(document._type)) {
    if (!hasImage(document.heroImage)) issues.push('Hero image')
  } else if (document._type === 'room') {
    if (!hasImage(document.heroImage)) issues.push('Verified room preview image')
  } else if (document._type === 'housePage') {
    if (!hasImage(document.heroImage)) issues.push('Hero image')
    if (!hasImage(document.viewImage)) issues.push('View image')
    if ((document.sharedHeartImageCount ?? 0) < 1) issues.push('Shared Heart image')
    if ((document.indoorOutdoorImageCount ?? 0) < 1) issues.push('Indoor / Outdoor image')
    if (document.morningPresent && !hasImage(document.morningImage)) issues.push('Morning image')
    if (document.rainPresent && !hasImage(document.rainImage)) issues.push('Rain image')
    if (document.eveningPresent && !hasImage(document.eveningImage)) issues.push('Evening image')
    if ((document.materialCount ?? 0) > (document.materialImageCount ?? 0)) {
      issues.push('Materials images')
    }
  } else {
    return {issues, status: 'unknown' as const}
  }

  return {issues, status: issues.length ? ('needsAttention' as const) : ('complete' as const)}
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
    const photographed =
      readiness.photographyStatus === 'complete' || readiness.photographyStatus === 'unknown'

    return (
      published.has(baseDocumentId(document._id)) &&
      document.workflowStatus === 'approved' &&
      reviewed &&
      photographed &&
      readiness.seoStatus === 'complete'
    )
  })

  return complete ? 'complete' : 'needsAttention'
}
