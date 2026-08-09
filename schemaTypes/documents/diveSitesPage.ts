import {defineArrayMember, defineField, defineType} from 'sanity'

import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'

export const diveSitesPage = defineType({
  name: 'diveSitesPage',
  title: 'Dive Sites Page',
  type: 'document',
  description: 'The fixed editorial entrance to the Southern Negros dive guide at /dive-sites.',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    internalTitle: 'Dive Sites Page',
    workflowStatus: 'draft',
  },
  fields: [
    defineInternalTitleField(),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'pageHero',
      group: 'content',
      description: 'Quiet opening title and introduction for the dive guide.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Short editorial statement introducing the regional dive guide.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredDiveSites',
      title: 'Featured Dive Sites',
      type: 'array',
      group: 'content',
      description: 'A small, manually ordered selection introducing the dive guide.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'diveSite'}]})],
      validation: (rule) => rule.required().min(1).max(6).unique(),
    }),
    defineField({
      name: 'editorialCopy',
      title: 'Introductory Editorial Copy',
      type: 'portableText',
      group: 'content',
      description: 'Longer copy establishing the purpose and point of view of the dive guide.',
      validation: (rule) => rule.required().min(1),
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
