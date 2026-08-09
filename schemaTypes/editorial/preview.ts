import type {PreviewValue} from 'sanity'

type EditorialPreviewValue = {
  lastReviewedAt?: unknown
  media?: PreviewValue['media']
  subtitle?: unknown
  title?: unknown
  workflowStatus?: unknown
}

const workflowLabels: Record<string, string> = {
  approved: 'Approved',
  draft: 'Draft',
  inReview: 'In review',
}

const reviewedDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function cleanString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function formatReviewDate(value: unknown) {
  const reviewDate = cleanString(value)
  if (!reviewDate) return 'Review date missing'

  const parsedDate = new Date(reviewDate)
  if (Number.isNaN(parsedDate.getTime())) return 'Review date needs attention'

  return `Reviewed ${reviewedDateFormatter.format(parsedDate)}`
}

export function prepareEditorialPreview({
  lastReviewedAt,
  media,
  subtitle,
  title,
  workflowStatus,
}: EditorialPreviewValue): PreviewValue {
  const context = cleanString(subtitle)
  const workflow = cleanString(workflowStatus)
  const workflowLabel = workflow ? (workflowLabels[workflow] ?? workflow) : 'Status missing'

  return {
    media,
    subtitle: [context, workflowLabel, formatReviewDate(lastReviewedAt)]
      .filter(Boolean)
      .join(' · '),
    title: cleanString(title) ?? 'Untitled',
  }
}
