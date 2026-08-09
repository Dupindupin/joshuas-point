import {defineArrayMember, defineField, defineType} from 'sanity'

import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'
import {prepareEditorialPreview} from '../editorial/preview'
import {defineEditorialWarnings} from '../editorial/warnings'

export const room = defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  description:
    'One accommodation and its editorial story. Pricing and availability do not belong here.',
  validation: defineEditorialWarnings({
    creditImagePaths: ['previewImage', 'hero.image'],
    heroImagePath: 'hero.image',
    staleAfterDays: 365,
  }),
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'story', title: 'Story'},
    {name: 'details', title: 'Room Details'},
    {name: 'seo', title: 'SEO'},
    {name: 'governance', title: 'Governance'},
  ],
  initialValue: {
    workflowStatus: 'draft',
  },
  fields: [
    defineInternalTitleField(),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'identity',
      description: 'Public room name.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      description: 'URL path generated from the title. Review before publishing.',
      options: {
        source: 'title',
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
      description: 'Concise editorial summary used on the Rooms page and in related content.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'editorialImage',
      group: 'identity',
      description: 'Primary image used when this room appears in a collection.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'pageHero',
      group: 'story',
      description: 'Opening content for the individual room page.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'story',
      description: 'Short plain-text room description.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'editorialContent',
      title: 'Editorial Content',
      type: 'portableText',
      group: 'story',
      description: 'Long-form room story using the approved editorial blocks.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'gallery',
      group: 'story',
      description:
        'Optional ordered room gallery. Include different views that help a guest understand the space.',
      options: {collapsible: true, collapsed: true},
    }),
    defineField({
      name: 'closingReflection',
      title: 'Closing Reflection',
      type: 'text',
      rows: 3,
      group: 'story',
      description: 'Optional quiet paragraph closing the room page.',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'capacity',
      group: 'details',
      description: 'Factual occupancy information.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beds',
      title: 'Beds',
      type: 'array',
      group: 'details',
      description: 'Bed configurations appear in this order.',
      of: [defineArrayMember({type: 'bedConfiguration'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineSeoField(),
    defineWorkflowStatusField(),
    defineLastReviewedAtField(),
  ],
  preview: {
    select: {
      capacityLabel: 'capacity.displayLabel',
      heroMedia: 'hero.image',
      lastReviewedAt: 'lastReviewedAt',
      maxGuests: 'capacity.maxGuests',
      previewMedia: 'previewImage',
      title: 'title',
      workflowStatus: 'workflowStatus',
    },
    prepare({
      capacityLabel,
      heroMedia,
      lastReviewedAt,
      maxGuests,
      previewMedia,
      title,
      workflowStatus,
    }) {
      const subtitle = capacityLabel
        ? String(capacityLabel)
        : maxGuests
          ? `Up to ${maxGuests} guest${Number(maxGuests) === 1 ? '' : 's'}`
          : 'Capacity not set'

      return prepareEditorialPreview({
        lastReviewedAt,
        media: heroMedia ?? previewMedia,
        subtitle,
        title,
        workflowStatus,
      })
    },
  },
})
