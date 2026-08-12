import type {DocumentBadgeComponent, SanityDocument} from 'sanity'

const editorialDocumentTypes = new Set([
  'destination',
  'diveSite',
  'experience',
  'homePage',
  'housePage',
  'journalArticle',
  'room',
  'scenicRoute',
])

const staleAfterDays: Record<string, number> = {
  destination: 90,
  diveSite: 90,
  experience: 365,
  homePage: 365,
  housePage: 365,
  journalArticle: 365,
  room: 365,
  scenicRoute: 90,
}

type EditorialDocument = SanityDocument & {
  lastReviewedAt?: string
  workflowStatus?: string
}

function currentDocument(draft: SanityDocument | null, published: SanityDocument | null) {
  return (draft ?? published) as EditorialDocument | null
}

export const workflowStatusBadge: DocumentBadgeComponent = ({draft, published}) => {
  const document = currentDocument(draft, published)
  if (!document || !editorialDocumentTypes.has(document._type)) return null

  switch (document.workflowStatus) {
    case 'approved':
      return {color: 'success', label: 'Approved', title: 'Editorial review is complete'}
    case 'inReview':
      return {color: 'warning', label: 'In review', title: 'Editorial review is in progress'}
    case 'draft':
      return {label: 'Draft', title: 'Editorial work is in progress'}
    default:
      return {color: 'danger', label: 'Status missing', title: 'Choose a workflow status'}
  }
}

export const reviewDateBadge: DocumentBadgeComponent = ({draft, published}) => {
  const document = currentDocument(draft, published)
  if (!document || !editorialDocumentTypes.has(document._type)) return null

  if (!document.lastReviewedAt) {
    return {color: 'warning', label: 'Review date missing', title: 'Material facts are not dated'}
  }

  const reviewedAt = new Date(document.lastReviewedAt)
  if (Number.isNaN(reviewedAt.getTime())) return null

  const maximumAge = staleAfterDays[document._type] ?? 365
  const ageInDays = (Date.now() - reviewedAt.getTime()) / (24 * 60 * 60 * 1000)
  if (ageInDays <= maximumAge) return null

  return {
    color: 'warning',
    label: 'Review stale',
    title: `Material facts were last reviewed more than ${maximumAge} days ago`,
  }
}

export function supportsEditorialBadges(schemaType: string) {
  return editorialDocumentTypes.has(schemaType)
}
