import {defineArrayMember, defineField, defineType} from 'sanity'

import {prepareEditorialPreview} from '../editorial/preview'
import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'

export const scenicRoutesPage = defineType({
  name: 'scenicRoutesPage',
  title: 'Scenic Routes Page',
  type: 'document',
  description: 'The fixed editorial entrance to independent journeys at /scenic-routes.',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    internalTitle: 'Scenic Routes Page',
    workflowStatus: 'draft',
  },
  fields: [
    defineInternalTitleField(),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'pageHero',
      group: 'content',
      description: 'Quiet editorial introduction to journeys through Southern Negros.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      group: 'content',
      description:
        'Short explanation of travelling slowly and treating the road as part of the experience.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'editorialCopy',
      title: 'Introductory Editorial Copy',
      type: 'portableText',
      group: 'content',
      description:
        'Longer editorial context. Do not place volatile route instructions in the landing page.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'featuredRoutes',
      title: 'Featured Routes',
      type: 'array',
      group: 'content',
      description: 'Optional small, manually ordered selection of published scenic routes.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'scenicRoute'}]})],
      validation: (rule) => rule.max(6).unique(),
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
        subtitle: 'Scenic Routes Page',
        title: title || 'Scenic Routes',
        workflowStatus,
      })
    },
  },
})
