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

const destinationTypes = [
  {title: 'Waterfall', value: 'waterfall'},
  {title: 'Lake', value: 'lake'},
  {title: 'Beach', value: 'beach'},
  {title: 'Island', value: 'island'},
  {title: 'Viewpoint', value: 'viewpoint'},
  {title: 'Town', value: 'town'},
  {title: 'Coffee', value: 'coffee'},
  {title: 'Restaurant', value: 'restaurant'},
  {title: 'Nature', value: 'nature'},
  {title: 'Culture', value: 'culture'},
]

export const destination = defineType({
  name: 'destination',
  title: 'Destination',
  type: 'document',
  description:
    'A carefully written, locally verified guide to one place guests can explore from Joshua’s Point.',
  validation: defineEditorialWarnings({
    creditImagePaths: ['heroImage'],
    heroImagePath: 'heroImage',
    staleAfterDays: 90,
  }),
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'story', title: 'Editorial Story'},
    {name: 'travel', title: 'Travel Information'},
    {name: 'location', title: 'Map and Location'},
    {name: 'relationships', title: 'Related Content'},
    {name: 'social', title: 'Social Presence'},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    workflowStatus: 'draft',
    interactiveMapEnabled: false,
  },
  fields: [
    defineInternalTitleField(),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'identity',
      description: 'Public place name used as the destination page title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      description: 'Stable URL path generated from the public title. Review before publishing.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destinationType',
      title: 'Destination Type',
      type: 'string',
      group: 'identity',
      description: 'Choose the single type that best describes what this place fundamentally is.',
      options: {
        list: destinationTypes,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'identity',
      description: 'Concise journal-style summary used in listings and related content.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'editorialImage',
      group: 'identity',
      description:
        'Optional opening photograph. Leave empty when no truthful, place-specific image is available; do not substitute unrelated photography.',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'gallery',
      group: 'story',
      description:
        'Optional ordered photography that expands the visual understanding of the place.',
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
      name: 'editorialIntroduction',
      title: 'Editorial Introduction',
      type: 'text',
      rows: 4,
      group: 'story',
      description: 'Short opening that establishes how the place feels and why it matters.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'story',
      title: 'Story',
      type: 'portableText',
      group: 'story',
      description:
        'The main travel-journal narrative, including the journey when it belongs in the story.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'whyVisit',
      title: 'Why Visit',
      type: 'text',
      rows: 3,
      group: 'story',
      description: 'Concise reason to spend time here, written without promotional language.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'What to Expect',
      type: 'array',
      group: 'story',
      description:
        'Ordered editorial observations about terrain, weather, access, facilities, or pace—not feature claims.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'photographyNotes',
      title: 'Photography Notes',
      type: 'portableText',
      group: 'story',
      description:
        'Optional guidance about light, respectful camera use, or practical equipment protection.',
    }),
    defineField({
      name: 'instagramHighlights',
      title: 'Selected Instagram Posts',
      type: 'array',
      group: 'social',
      description:
        'Optional and editorially selective. Add up to three approved posts only when they deepen this destination story. Leave empty on most destinations.',
      of: [defineArrayMember({type: 'instagramPost'})],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'travelInformation',
      title: 'Travel Information',
      type: 'travelInformation',
      group: 'travel',
      description: 'Reviewed practical details for planning an independent visit.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scooterFriendly',
      title: 'Scooter Friendly',
      type: 'boolean',
      group: 'travel',
      description:
        'Editorial assessment only. Enable when a scooter guide can be supported with current local knowledge.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scooterGuide',
      title: 'Scooter Guide',
      type: 'scooterGuide',
      group: 'travel',
      description:
        'Required when Scooter Friendly is enabled. Remove it when scooter travel is unsuitable.',
      options: {collapsible: true, collapsed: true},
      validation: (rule) =>
        rule.custom((value, context) => {
          const scooterFriendly = context.document?.scooterFriendly
          if (scooterFriendly === true && !value) {
            return 'Add locally reviewed scooter guidance for a scooter-friendly destination.'
          }
          if (scooterFriendly === false && value) {
            return 'Remove the scooter guide when this destination is not scooter friendly.'
          }
          return true
        }),
    }),
    defineField({
      name: 'thingsToBring',
      title: 'Things to Bring',
      type: 'array',
      group: 'travel',
      description: 'Optional ordered practical items specific to this visit.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'tips',
      title: 'Tips',
      type: 'array',
      group: 'travel',
      description: 'Optional concise guidance that reduces uncertainty or explains local context.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'mapLocation',
      title: 'Map Location',
      type: 'mapLocation',
      group: 'location',
      description: 'Verified provider-neutral location used for maps and accessible orientation.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'interactiveMapEnabled',
      title: 'Enable Interactive Map',
      type: 'boolean',
      group: 'location',
      description:
        'Permits a future enhanced map. Text location and external directions remain required fallbacks.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedDestinations',
      title: 'Related Destinations',
      type: 'array',
      group: 'relationships',
      description: 'Up to four manually curated places that offer a meaningful continuation.',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'destination'}],
        }),
      ],
      validation: (rule) =>
        rule
          .max(4)
          .unique()
          .custom((references, context) => {
            const documentId = context.document?._id?.replace(/^drafts\./, '')
            const includesSelf = (references as ReferenceValue[] | undefined)?.some(
              (reference) => reference._ref?.replace(/^drafts\./, '') === documentId,
            )
            return includesSelf ? 'A destination cannot relate to itself.' : true
          }),
    }),
    defineSeoField(),
    defineWorkflowStatusField(),
    defineLastReviewedAtField({required: true}),
  ],
  preview: {
    select: {
      lastReviewedAt: 'lastReviewedAt',
      media: 'heroImage',
      subtitle: 'destinationType',
      title: 'title',
      workflowStatus: 'workflowStatus',
    },
    prepare({lastReviewedAt, media, subtitle, title, workflowStatus}) {
      const formattedType = subtitle
        ? String(subtitle)
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (value) => value.toUpperCase())
        : 'Destination'
      return prepareEditorialPreview({
        lastReviewedAt,
        media,
        subtitle: formattedType,
        title,
        workflowStatus,
      })
    },
  },
})
