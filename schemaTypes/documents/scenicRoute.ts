import {defineArrayMember, defineField, defineType} from 'sanity'

import {prepareEditorialPreview} from '../editorial/preview'
import {defineEditorialWarnings} from '../editorial/warnings'
import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'

export const scenicRoute = defineType({
  name: 'scenicRoute',
  title: 'Scenic Route',
  type: 'document',
  description:
    'An editorial journey through Southern Negros. Practical guidance must be locally verified before publication.',
  validation: defineEditorialWarnings({
    creditImagePaths: ['heroImage'],
    heroImagePath: 'heroImage',
    staleAfterDays: 90,
  }),
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'story', title: 'Editorial Story'},
    {name: 'journey', title: 'Route and Stops'},
    {name: 'practical', title: 'Practical Guidance'},
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
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'identity',
      description: 'Verified public route title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      description: 'Stable URL path generated from the public title. Review before publishing.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'identity',
      description: 'Concise editorial introduction used in route listings and related content.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'editorialImage',
      group: 'identity',
      description:
        'Optional route-specific photograph. Development imagery must be clearly credited as temporary and replaced before launch.',
    }),
    defineField({
      name: 'editorialIntroduction',
      title: 'Editorial Introduction',
      type: 'text',
      rows: 4,
      group: 'story',
      description: 'Quiet opening that establishes the purpose and character of the journey.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'story',
      title: 'Route Story',
      type: 'portableText',
      group: 'story',
      description:
        'The observed journey in sequence. Preserve real source material and omit unsupported road or access claims.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'photographyNotes',
      title: 'Photography Notes',
      type: 'portableText',
      group: 'story',
      description:
        'Optional guidance about safe stopping, light, privacy, and respectful photography.',
    }),
    defineField({
      name: 'editorialPhotography',
      title: 'Editorial Photography Story',
      type: 'editorialPhotography',
      group: 'story',
      description:
        'Guided upload sections for the route’s Hero, Opening, Journey, Details and Closing photography.',
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'routeStops',
      title: 'Ordered Route Stops',
      type: 'array',
      group: 'journey',
      description:
        'Text-first route sequence. Add map locations only where coordinates and public access are verified.',
      of: [defineArrayMember({type: 'routeStop'})],
      validation: (rule) => rule.min(2),
    }),
    defineField({
      name: 'routePath',
      title: 'Verified Route Path',
      type: 'array',
      group: 'journey',
      description:
        'Provider-neutral route geometry migrated from the owner-approved Joshua’s Point map. Managed by the migration workflow rather than edited point by point in Studio.',
      of: [defineArrayMember({type: 'geopoint'})],
      hidden: true,
      validation: (rule) => rule.min(2),
    }),
    defineField({
      name: 'interactiveMapEnabled',
      title: 'Enable Interactive Map',
      type: 'boolean',
      group: 'journey',
      description:
        'Permits future provider-enhanced maps. Textual route stops remain the accessible fallback.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'travelTime',
      title: 'Verified Travel Time',
      type: 'travelTime',
      group: 'practical',
      description:
        'Optional locally checked estimate. Leave empty rather than deriving a promise from a map provider.',
      options: {collapsible: true, collapsed: true},
    }),
    defineField({
      name: 'scooterGuide',
      title: 'Scooter Guidance',
      type: 'scooterGuide',
      group: 'practical',
      description: 'Optional locally reviewed road, difficulty, parking, fuel, and route guidance.',
      options: {collapsible: true, collapsed: true},
    }),
    defineField({
      name: 'safetyNotes',
      title: 'Safety and Alternatives',
      type: 'text',
      rows: 5,
      group: 'practical',
      description:
        'Optional verified guidance about changing conditions, reasons to turn back, and alternative transport.',
    }),
    defineField({
      name: 'relatedDestinations',
      title: 'Related Destinations',
      type: 'array',
      group: 'relationships',
      description:
        'Places that genuinely belong to this journey. Their full stories remain on Destination documents.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'destination'}]})],
      validation: (rule) => rule.max(8).unique(),
    }),
    defineSeoField(),
    defineWorkflowStatusField(),
    defineLastReviewedAtField({required: true}),
  ],
  preview: {
    select: {
      lastReviewedAt: 'lastReviewedAt',
      media: 'heroImage',
      title: 'title',
      workflowStatus: 'workflowStatus',
    },
    prepare({lastReviewedAt, media, title, workflowStatus}) {
      return prepareEditorialPreview({
        lastReviewedAt,
        media,
        subtitle: 'Scenic route',
        title,
        workflowStatus,
      })
    },
  },
})
