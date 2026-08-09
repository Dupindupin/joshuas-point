import {defineField, defineType} from 'sanity'

import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  description: 'The fixed Homepage narrative. Sections appear in the approved editorial sequence.',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    internalTitle: 'Home Page',
    workflowStatus: 'draft',
  },
  fields: [
    defineInternalTitleField(),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'homeHero',
      group: 'content',
      description: 'The opening Homepage image and introduction.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'placeStory',
      title: 'Place Story',
      type: 'placeStory',
      group: 'content',
      description: 'The first editorial story beneath the Hero.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'morningNarrative',
      title: 'Morning Narrative',
      type: 'morningNarrative',
      group: 'content',
      description: 'The image-first morning narrative.',
      validation: (rule) => rule.required(),
    }),
    defineSeoField(),
    defineWorkflowStatusField(),
    defineLastReviewedAtField(),
  ],
  preview: {
    select: {
      title: 'internalTitle',
    },
  },
})
