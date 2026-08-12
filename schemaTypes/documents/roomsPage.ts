import {defineArrayMember, defineField, defineType} from 'sanity'

import {prepareEditorialPreview} from '../editorial/preview'
import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'

export const roomsPage = defineType({
  name: 'roomsPage',
  title: 'Rooms Page',
  type: 'document',
  description:
    'The fixed editorial accommodation page at /rooms. Room facts remain on the referenced Room documents.',
  groups: [
    {name: 'opening', title: 'Opening', default: true},
    {name: 'collection', title: 'Room Collection'},
    {name: 'editorial', title: 'Editorial Sections'},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    internalTitle: 'Rooms Page',
    workflowStatus: 'draft',
  },
  fields: [
    defineInternalTitleField(),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'roomsPageHero',
      group: 'opening',
      description: 'The factual, quiet introduction to the Rooms page.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'editorialIntroduction',
      title: 'Editorial Introduction',
      type: 'roomsEditorialIntroduction',
      group: 'opening',
      description: 'Accommodation philosophy shown immediately after the Hero.',
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'collectionIntroduction',
      title: 'Collection Introduction',
      type: 'roomsCollectionIntroduction',
      group: 'collection',
      description: 'Short introduction to the ordered suite collection.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredRooms',
      title: 'Featured Rooms',
      type: 'array',
      group: 'collection',
      description:
        'The two verified suites in their intended page order. Room facts are edited on each Room document.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'room'}]})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'imageBreak',
      title: 'Editorial Image Break',
      type: 'editorialImage',
      group: 'editorial',
      description:
        'Optional development or production photograph. Use the image caption as the only public caption source.',
    }),
    defineField({
      name: 'comfortPhilosophy',
      title: 'Comfort Philosophy',
      type: 'roomsComfortPhilosophy',
      group: 'editorial',
      description:
        'Optional section. Leave empty until its claims have been approved; the frontend will omit it.',
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'closingReflection',
      title: 'Closing Reflection',
      type: 'roomsClosingReflection',
      group: 'editorial',
      description: 'Optional quiet closing paragraph.',
      options: {collapsible: true, collapsed: false},
    }),
    defineSeoField(),
    defineWorkflowStatusField(),
    defineLastReviewedAtField(),
  ],
  preview: {
    select: {
      lastReviewedAt: 'lastReviewedAt',
      media: 'imageBreak',
      title: 'hero.title',
      workflowStatus: 'workflowStatus',
    },
    prepare({lastReviewedAt, media, title, workflowStatus}) {
      return prepareEditorialPreview({
        lastReviewedAt,
        media,
        subtitle: 'Rooms Page',
        title,
        workflowStatus,
      })
    },
  },
})
