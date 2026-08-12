import type {SanityDocument} from 'sanity'
import {defineField, defineType} from 'sanity'

import {prepareEditorialPreview} from '../editorial/preview'
import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'

type ImageValue = {
  asset?: {_ref?: string}
  credit?: string
}

type HomePageValue = SanityDocument & {
  closingReflection?: {image?: ImageValue}
  hero?: {image?: ImageValue}
  lastReviewedAt?: string
  morningNarrative?: {image?: ImageValue}
  placeStory?: {image?: ImageValue}
  seo?: {metaDescription?: string}
  sharedLife?: {image?: ImageValue}
  southernNegrosIntroduction?: {image?: ImageValue}
  workflowStatus?: string
}

const developmentPhotographyMarkers = [
  'development photography',
  'not production approved',
  'replace before launch',
]

function isApproved(document: HomePageValue | undefined) {
  return document?.workflowStatus === 'approved'
}

function pageImages(document: HomePageValue | undefined) {
  return [
    document?.hero?.image,
    document?.placeStory?.image,
    document?.sharedLife?.image,
    document?.morningNarrative?.image,
    document?.southernNegrosIntroduction?.image,
    document?.closingReflection?.image,
  ].filter((image): image is ImageValue => Boolean(image?.asset?._ref))
}

function usesDevelopmentPhotography(document: HomePageValue | undefined) {
  return pageImages(document).some(({credit}) => {
    const normalizedCredit = credit?.trim().toLowerCase()
    return normalizedCredit
      ? developmentPhotographyMarkers.some((marker) => normalizedCredit.includes(marker))
      : false
  })
}

export const homePage = defineType({
  name: 'homePage',
  title: 'Home',
  type: 'document',
  description:
    'The fixed editorial Home page. Joshua’s Point remains the emotional center before the story opens toward nature and Southern Negros.',
  validation: (rule) => [
    rule.custom((value) => {
      const document = value as HomePageValue | undefined
      if (!isApproved(document) || document?.seo?.metaDescription?.trim()) return true
      return 'Add a page-specific SEO description before marking Home as Approved.'
    }),
    rule.custom((value) => {
      const document = value as HomePageValue | undefined
      if (!isApproved(document) || document?.lastReviewedAt) return true
      return 'Add a material review date before marking Home as Approved.'
    }),
    rule.custom((value) => {
      const document = value as HomePageValue | undefined
      if (!document?.lastReviewedAt) return true
      const reviewedAt = new Date(document.lastReviewedAt)
      if (Number.isNaN(reviewedAt.getTime()) || reviewedAt.getTime() <= Date.now()) return true
      return 'The last reviewed date cannot be in the future.'
    }),
    rule
      .custom((value) => {
        const document = value as HomePageValue | undefined
        if (document?.hero?.image?.credit?.trim()) return true
        return 'Add credit information for the Hero photograph before final review.'
      })
      .warning(),
    rule
      .custom((value) => {
        const document = value as HomePageValue | undefined
        if (!usesDevelopmentPhotography(document)) return true
        return 'Development photography is still in use. Replace it with production-approved photography before final approval.'
      })
      .warning(),
  ],
  groups: [
    {name: 'opening', title: 'Opening', default: true},
    {name: 'place', title: 'The Place'},
    {name: 'sharedLife', title: 'Shared Life'},
    {name: 'morning', title: 'Morning'},
    {name: 'region', title: 'Southern Negros'},
    {name: 'closing', title: 'Closing'},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    internalTitle: 'Home',
    workflowStatus: 'draft',
  },
  fields: [
    defineInternalTitleField(),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'homeHero',
      group: 'opening',
      description:
        'The photography-first introduction to Joshua’s Point. It contains no visible action or regional promotion.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'placeStory',
      title: 'The Place',
      type: 'placeStory',
      group: 'place',
      description: 'The relationship between Joshua’s Point, the house, and the landscape.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sharedLife',
      title: 'Shared Life',
      type: 'homeSharedLife',
      group: 'sharedLife',
      description: 'The public-safe story of cooking, dining, conversation, and being together.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'morningNarrative',
      title: 'Morning Narrative',
      type: 'morningNarrative',
      group: 'morning',
      description: 'The observed morning ritual and its quiet relationship with nature.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'southernNegrosIntroduction',
      title: 'Southern Negros',
      type: 'homeSouthernNegrosIntroduction',
      group: 'region',
      description:
        'Optional nature-first regional doorway. Add the section only when its editorial content is approved; photography and an editorial link remain optional.',
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'closingReflection',
      title: 'Closing Reflection',
      type: 'homeClosingReflection',
      group: 'closing',
      description:
        'A quiet invitation into the Joshua’s Point world. Photography is intentionally optional.',
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
      title: 'hero.heading',
      workflowStatus: 'workflowStatus',
    },
    prepare({lastReviewedAt, media, title, workflowStatus}) {
      return prepareEditorialPreview({
        lastReviewedAt,
        media,
        subtitle: 'Home',
        title,
        workflowStatus,
      })
    },
  },
})
