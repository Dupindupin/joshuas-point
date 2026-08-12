import type {SanityDocument} from 'sanity'
import {defineField, defineType} from 'sanity'

import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'
import {prepareEditorialPreview} from '../editorial/preview'

type ImageValue = {
  asset?: {_ref?: string}
  credit?: string
}

type HousePageValue = SanityDocument & {
  hero?: {image?: ImageValue}
  indoorOutdoorStory?: {images?: Array<{image?: ImageValue}>}
  lastReviewedAt?: string
  materialsAndArchitecture?: {materials?: Array<{image?: ImageValue}>}
  seo?: {metaDescription?: string}
  sharedHeart?: {images?: ImageValue[]}
  dailyRhythms?: {
    evening?: {image?: ImageValue}
    morning?: {image?: ImageValue}
    rain?: {image?: ImageValue}
  }
  view?: {image?: ImageValue}
  workflowStatus?: string
}

const developmentPhotographyMarkers = [
  'development photography',
  'not production approved',
  'replace before launch',
]

function isApproved(document: HousePageValue | undefined) {
  return document?.workflowStatus === 'approved'
}

function pageImages(document: HousePageValue | undefined) {
  return [
    document?.hero?.image,
    ...(document?.sharedHeart?.images ?? []),
    document?.view?.image,
    ...(document?.indoorOutdoorStory?.images ?? []).map(({image}) => image),
    document?.dailyRhythms?.morning?.image,
    document?.dailyRhythms?.rain?.image,
    document?.dailyRhythms?.evening?.image,
    ...(document?.materialsAndArchitecture?.materials ?? []).map(({image}) => image),
  ].filter((image): image is ImageValue => Boolean(image?.asset?._ref))
}

function usesDevelopmentPhotography(document: HousePageValue | undefined) {
  return pageImages(document).some(({credit}) => {
    const normalizedCredit = credit?.trim().toLowerCase()
    return normalizedCredit
      ? developmentPhotographyMarkers.some((marker) => normalizedCredit.includes(marker))
      : false
  })
}

export const housePage = defineType({
  name: 'housePage',
  title: 'The House',
  type: 'document',
  description:
    'The fixed editorial House page at /the-house. Public content must use approved facts and protect private family source material.',
  validation: (rule) => [
    rule.custom((value) => {
      const document = value as HousePageValue | undefined
      if (!isApproved(document) || document?.view?.image?.asset?._ref) return true
      return 'Add verified View photography before marking The House as Approved.'
    }),
    rule.custom((value) => {
      const document = value as HousePageValue | undefined
      if (!isApproved(document) || document?.seo?.metaDescription?.trim()) return true
      return 'Add a page-specific SEO description before marking The House as Approved.'
    }),
    rule.custom((value) => {
      const document = value as HousePageValue | undefined
      if (!isApproved(document) || document?.lastReviewedAt) return true
      return 'Add a material review date before marking The House as Approved.'
    }),
    rule.custom((value) => {
      const document = value as HousePageValue | undefined
      if (!document?.lastReviewedAt) return true
      const reviewedAt = new Date(document.lastReviewedAt)
      if (Number.isNaN(reviewedAt.getTime()) || reviewedAt.getTime() <= Date.now()) return true
      return 'The last reviewed date cannot be in the future.'
    }),
    rule
      .custom((value) => {
        const document = value as HousePageValue | undefined
        if (document?.hero?.image?.credit?.trim()) return true
        return 'Add credit information for the Hero photograph before final review.'
      })
      .warning(),
    rule
      .custom((value) => {
        const document = value as HousePageValue | undefined
        if (!usesDevelopmentPhotography(document)) return true
        return 'Development photography is still in use. Replace it with production-approved photography before launch.'
      })
      .warning(),
  ],
  groups: [
    {name: 'opening', title: 'Opening', default: true},
    {name: 'story', title: 'House Story'},
    {name: 'dailyLife', title: 'Daily Life'},
    {name: 'materials', title: 'Materials'},
    {name: 'closing', title: 'Closing'},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    internalTitle: 'The House',
    workflowStatus: 'draft',
  },
  fields: [
    defineInternalTitleField(),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'houseHero',
      group: 'opening',
      description: 'The photography-first opening to The House.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'openingReflection',
      title: 'Opening Reflection',
      type: 'houseOpeningReflection',
      group: 'opening',
      description: 'The short transition from landscape to the feeling of home.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sharedHeart',
      title: 'Shared Heart of the House',
      type: 'houseSharedHeart',
      group: 'story',
      description: 'The editorial story of the connected shared spaces.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'view',
      title: 'The View',
      type: 'houseView',
      group: 'story',
      description:
        'Landscape photography and its public-safe caption, separated from Studio-only verification notes.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'indoorOutdoorStory',
      title: 'Indoor Outdoor Story',
      type: 'houseIndoorOutdoorStory',
      group: 'story',
      description: 'The controlled image-and-text sequence about the lived threshold.',
      options: {collapsible: true, collapsed: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dailyRhythms',
      title: 'Daily Rhythms',
      type: 'houseDailyRhythms',
      group: 'dailyLife',
      description:
        'Optional Morning, Rain, and Evening observations. The page must omit incomplete moments.',
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'materialsAndArchitecture',
      title: 'Materials and Architecture',
      type: 'houseMaterialsAndArchitecture',
      group: 'materials',
      description:
        'Optional section containing only material stories approved for public use. Remove the section when none are ready.',
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'closingReflection',
      title: 'Closing Reflection',
      type: 'houseClosingReflection',
      group: 'closing',
      description: 'One quiet paragraph closing the page without a call to action.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineSeoField(),
    defineWorkflowStatusField(),
    defineLastReviewedAtField(),
  ],
  preview: {
    select: {
      lastReviewedAt: 'lastReviewedAt',
      media: 'hero.image',
      title: 'hero.title',
      workflowStatus: 'workflowStatus',
    },
    prepare({lastReviewedAt, media, title, workflowStatus}) {
      return prepareEditorialPreview({
        lastReviewedAt,
        media,
        subtitle: 'The House',
        title,
        workflowStatus,
      })
    },
  },
})
