import {defineArrayMember, defineField, defineType} from 'sanity'

import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'

export const destinationsPage = defineType({
  name: 'destinationsPage',
  title: 'Destinations Page',
  type: 'document',
  description:
    'The fixed editorial entrance to the southern Negros destination guide at /destinations.',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    internalTitle: 'Destinations Page',
    workflowStatus: 'draft',
  },
  fields: [
    defineInternalTitleField(),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'pageHero',
      group: 'content',
      description: 'Quiet opening title and introduction for the destinations index.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Short statement introducing Joshua’s Point as a starting place for the region.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredDestinations',
      title: 'Featured Destinations',
      type: 'array',
      group: 'content',
      description: 'A small, manually ordered selection of destinations that introduces the guide.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'destination'}]})],
      validation: (rule) => rule.required().min(1).max(6).unique(),
    }),
    defineField({
      name: 'editorialCopy',
      title: 'Introductory Editorial Copy',
      type: 'portableText',
      group: 'content',
      description: 'Longer introductory copy establishing the pace and point of view of the guide.',
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
