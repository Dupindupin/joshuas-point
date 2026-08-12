import {defineArrayMember, defineField, defineType} from 'sanity'

import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'
import {prepareEditorialPreview} from '../editorial/preview'
import {defineEditorialWarnings} from '../editorial/warnings'

type ReferenceValue = {
  _ref?: string
}

export const diveSite = defineType({
  name: 'diveSite',
  title: 'Dive Site',
  type: 'document',
  description:
    'An editorial field guide to one dive site or established dive area in Southern Negros.',
  validation: defineEditorialWarnings({
    creditImagePaths: ['heroImage'],
    heroImagePath: 'heroImage',
    staleAfterDays: 90,
  }),
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'story', title: 'Editorial Guide'},
    {name: 'conditions', title: 'Dive Conditions'},
    {name: 'location', title: 'Map and Location'},
    {name: 'relationships', title: 'Related Content'},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    interactiveMapEnabled: false,
    workflowStatus: 'draft',
  },
  fields: [
    defineInternalTitleField(),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'identity',
      description: 'Verified public name of this dive site or established dive area.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      description: 'Stable URL path generated from the site name. Review before publishing.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'identity',
      description: 'Concise editorial introduction used in listings and related content.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'editorialImage',
      group: 'identity',
      description: 'Primary underwater or place photograph for this dive-site guide.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'gallery',
      group: 'story',
      description: 'Optional ordered photography that adds editorial understanding of the site.',
      options: {collapsible: true, collapsed: true},
    }),
    defineField({
      name: 'editorialPhotography',
      title: 'Editorial Photography Story',
      type: 'editorialPhotography',
      group: 'story',
      description:
        'Guided upload sections for the page’s Hero, Opening, Journey, Details and Closing photography.',
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableText',
      group: 'story',
      description: 'The main editorial account of the place and the experience of diving it.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'marineLife',
      title: 'Marine Life',
      type: 'array',
      group: 'story',
      description:
        'Ordered factual names or qualified observations. Never promise that a species will be seen.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'photographyNotes',
      title: 'Photography Notes',
      type: 'portableText',
      group: 'story',
      description: 'Optional practical and editorial guidance for underwater photography.',
    }),
    defineField({
      name: 'safetyNotes',
      title: 'Safety Notes',
      type: 'text',
      rows: 5,
      group: 'story',
      description:
        'Factual guidance reviewed by a qualified local source. Do not publish unverified advice.',
    }),
    defineField({
      name: 'diveLevel',
      title: 'Dive Level',
      type: 'string',
      group: 'conditions',
      description: 'Minimum appropriate experience level based on locally reviewed conditions.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
      },
    }),
    defineField({
      name: 'maximumDepthMeters',
      title: 'Maximum Depth in Meters',
      type: 'number',
      group: 'conditions',
      description: 'Verified maximum depth in metric units.',
      validation: (rule) => rule.positive(),
    }),
    defineField({
      name: 'averageDepthMeters',
      title: 'Average Depth in Meters',
      type: 'number',
      group: 'conditions',
      description: 'Optional verified average depth in metric units.',
      validation: (rule) =>
        rule.positive().custom((value, context) => {
          if (value === undefined) return true
          const maximumDepth = context.document?.maximumDepthMeters
          if (typeof maximumDepth === 'number' && value > maximumDepth) {
            return 'Average depth cannot exceed maximum depth.'
          }
          return true
        }),
    }),
    defineField({
      name: 'visibility',
      title: 'Visibility',
      type: 'visibilityRange',
      group: 'conditions',
      description: 'Observed visibility range with context about natural variability.',
    }),
    defineField({
      name: 'current',
      title: 'Current',
      type: 'string',
      group: 'conditions',
      description: 'Qualified current conditions. Natural conditions are never guaranteed.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Calm', value: 'calm'},
          {title: 'Moderate', value: 'moderate'},
          {title: 'Strong', value: 'strong'},
          {title: 'Variable', value: 'variable'},
        ],
      },
    }),
    defineField({
      name: 'entryType',
      title: 'Entry Type',
      type: 'string',
      group: 'conditions',
      description: 'Verified way divers normally enter this site.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Shore', value: 'shore'},
          {title: 'Boat', value: 'boat'},
          {title: 'Mixed', value: 'mixed'},
        ],
      },
    }),
    defineField({
      name: 'bestSeason',
      title: 'Best Season',
      type: 'text',
      rows: 3,
      group: 'conditions',
      description: 'Qualified seasonal guidance acknowledging weather and natural variability.',
    }),
    defineField({
      name: 'mapLocation',
      title: 'Map Location',
      type: 'mapLocation',
      group: 'location',
      description:
        'Verified provider-neutral coordinates. Use a safe meeting point when exact coordinates are sensitive.',
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'interactiveMapEnabled',
      title: 'Enable Interactive Map',
      type: 'boolean',
      group: 'location',
      description:
        'Permits a future enhanced map without replacing the accessible text location fallback.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedDiveSites',
      title: 'Related Dive Sites',
      type: 'array',
      group: 'relationships',
      description: 'Up to four manually curated dive sites that offer a meaningful continuation.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'diveSite'}]})],
      validation: (rule) =>
        rule
          .max(4)
          .unique()
          .custom((references, context) => {
            const documentId = context.document?._id?.replace(/^drafts\./, '')
            const includesSelf = (references as ReferenceValue[] | undefined)?.some(
              (reference) => reference._ref?.replace(/^drafts\./, '') === documentId,
            )
            return includesSelf ? 'A dive site cannot relate to itself.' : true
          }),
    }),
    defineField({
      name: 'nearbyDestinations',
      title: 'Nearby Destinations',
      type: 'array',
      group: 'relationships',
      description: 'Optional places that add relevant on-land context near this dive site.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'destination'}]})],
      validation: (rule) => rule.unique(),
    }),
    defineSeoField(),
    defineWorkflowStatusField(),
    defineLastReviewedAtField({required: true}),
  ],
  preview: {
    select: {
      lastReviewedAt: 'lastReviewedAt',
      media: 'heroImage',
      subtitle: 'diveLevel',
      title: 'name',
      workflowStatus: 'workflowStatus',
    },
    prepare({lastReviewedAt, media, subtitle, title, workflowStatus}) {
      const formattedLevel = subtitle
        ? `${String(subtitle).replace(/^./, (value) => value.toUpperCase())} dive site`
        : 'Dive site'
      return prepareEditorialPreview({
        lastReviewedAt,
        media,
        subtitle: formattedLevel,
        title,
        workflowStatus,
      })
    },
  },
})
