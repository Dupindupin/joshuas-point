import type {SanityDocument} from 'sanity'
import {defineField, defineType} from 'sanity'

import {prepareEditorialPreview} from '../editorial/preview'
import {
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'

type InformationPageValue = SanityDocument & {
  body?: unknown[]
  introduction?: string
  lastReviewedAt?: string
  seo?: {metaDescription?: string}
  title?: string
  workflowStatus?: string
}

export const informationPage = defineType({
  name: 'informationPage',
  title: 'Guest or Legal Page',
  type: 'document',
  description:
    'A fixed public-information page. Open it from Guest Information or Legal in the Studio desk.',
  groups: [
    {name: 'content', title: 'Page Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    workflowStatus: 'draft',
  },
  validation: (rule) => [
    rule.custom((value) => {
      const document = value as InformationPageValue | undefined
      if (document?.workflowStatus !== 'approved') return true
      if (!document.title?.trim() || !document.introduction?.trim() || !document.body?.length) {
        return 'Add the title, introduction, and page content before marking this page Approved.'
      }
      if (!document.seo?.metaDescription?.trim()) {
        return 'Add a page-specific SEO description before marking this page Approved.'
      }
      if (!document.lastReviewedAt) {
        return 'Add a material review date before marking this page Approved.'
      }
      return true
    }),
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'content',
      description:
        'Short context shown above the page title, such as Privacy or Guest Information.',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (rule) => rule.required().max(600),
    }),
    defineField({
      name: 'body',
      title: 'Page Content',
      type: 'portableText',
      group: 'content',
      description:
        'The complete owner-approved page. Use headings to keep longer practical or legal material easy to scan.',
      validation: (rule) => rule.required().min(1),
    }),
    defineSeoField(),
    defineWorkflowStatusField(),
    defineLastReviewedAtField(),
  ],
  preview: {
    select: {
      lastReviewedAt: 'lastReviewedAt',
      title: 'title',
      workflowStatus: 'workflowStatus',
    },
    prepare({lastReviewedAt, title, workflowStatus}) {
      return prepareEditorialPreview({
        lastReviewedAt,
        subtitle: 'Guest or legal information',
        title,
        workflowStatus,
      })
    },
  },
})
