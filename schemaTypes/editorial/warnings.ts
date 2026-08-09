import type {DocumentRule, SanityDocument, ValidationBuilder} from '@sanity/types'

type ImageValue = {
  asset?: {_ref?: string}
  credit?: string
}

type GalleryValue = {
  images?: ImageValue[]
}

type EditorialDocument = SanityDocument & {
  gallery?: GalleryValue
  lastReviewedAt?: string
  seo?: {metaDescription?: string}
}

type EditorialWarningOptions = {
  creditImagePaths: string[]
  heroImagePath: string
  staleAfterDays: number
}

const millisecondsPerDay = 24 * 60 * 60 * 1000

function valueAtPath(value: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((current, segment) => {
    if (!current || typeof current !== 'object') return undefined
    return (current as Record<string, unknown>)[segment]
  }, value)
}

function imageAtPath(document: EditorialDocument, path: string) {
  return valueAtPath(document, path) as ImageValue | undefined
}

function hasAsset(image: ImageValue | undefined) {
  return Boolean(image?.asset?._ref)
}

function hasCredit(image: ImageValue | undefined) {
  return Boolean(image?.credit?.trim())
}

export function defineEditorialWarnings({
  creditImagePaths,
  heroImagePath,
  staleAfterDays,
}: EditorialWarningOptions): ValidationBuilder<DocumentRule, SanityDocument> {
  return (rule) => [
    rule
      .custom((value) => {
        const document = value as EditorialDocument | undefined
        if (!document || hasAsset(imageAtPath(document, heroImagePath))) return true
        return 'Add a hero image so this story has a clear visual identity.'
      })
      .warning(),
    rule
      .custom((value) => {
        const document = value as EditorialDocument | undefined
        if (document?.seo?.metaDescription?.trim()) return true
        return 'Add a page-specific SEO description before final review.'
      })
      .warning(),
    rule
      .custom((value) => {
        const document = value as EditorialDocument | undefined
        if (document?.gallery?.images?.length) return true
        return 'Add an editorial gallery when photography is available.'
      })
      .warning(),
    rule
      .custom((value) => {
        const document = value as EditorialDocument | undefined
        if (!document) return true

        const creditedImages = [
          ...creditImagePaths.map((path) => imageAtPath(document, path)),
          ...(document.gallery?.images ?? []),
        ].filter(hasAsset)
        const missingCredits = creditedImages.filter((image) => !hasCredit(image)).length

        if (missingCredits === 0) return true
        return `${missingCredits} photograph${missingCredits === 1 ? '' : 's'} still need credit information.`
      })
      .warning(),
    rule
      .custom((value) => {
        const document = value as EditorialDocument | undefined
        if (!document?.lastReviewedAt)
          return 'Add a review date after the material facts are checked.'

        const reviewedAt = new Date(document.lastReviewedAt)
        if (Number.isNaN(reviewedAt.getTime())) return true

        const ageInDays = (Date.now() - reviewedAt.getTime()) / millisecondsPerDay
        if (ageInDays <= staleAfterDays) return true

        return `The factual review is more than ${staleAfterDays} days old. Recheck changeable information before reuse or publication.`
      })
      .warning(),
  ]
}
