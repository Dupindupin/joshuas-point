import type {SanityDocument} from 'sanity'
import {defineArrayMember, defineField, defineType} from 'sanity'

import {
  defineInternalTitleField,
  defineLastReviewedAtField,
  defineSeoField,
  defineWorkflowStatusField,
} from '../fields/commonEditorialFields'
import {prepareEditorialPreview} from '../editorial/preview'

type RoomDocumentValue = SanityDocument & {
  lastReviewedAt?: string
  previewImage?: {
    asset?: {_ref?: string}
    credit?: string
  }
}

const millisecondsPerDay = 24 * 60 * 60 * 1000

export const room = defineType({
  name: 'room',
  title: 'Room',
  type: 'document',
  description:
    'One verified suite used on the Rooms page. Pricing, availability, and unsupported claims do not belong here.',
  validation: (rule) => [
    rule
      .custom((value) => {
        const document = value as RoomDocumentValue | undefined
        if (document?.previewImage?.asset?._ref) return true
        return 'Add verified suite photography when it is available. Do not guess the room identity.'
      })
      .warning(),
    rule
      .custom((value) => {
        const document = value as RoomDocumentValue | undefined
        if (!document?.previewImage?.asset?._ref || document.previewImage.credit?.trim())
          return true
        return 'Add credit information for the preview photograph.'
      })
      .warning(),
    rule
      .custom((value) => {
        const document = value as RoomDocumentValue | undefined
        if (!document?.lastReviewedAt) return 'Add a review date after the room facts are checked.'

        const reviewedAt = new Date(document.lastReviewedAt)
        if (Number.isNaN(reviewedAt.getTime())) return true

        const ageInDays = (Date.now() - reviewedAt.getTime()) / millisecondsPerDay
        if (ageInDays <= 365) return true
        return 'The factual review is more than 365 days old. Recheck the room facts before publication.'
      })
      .warning(),
  ],
  groups: [
    {name: 'identity', title: 'Identity', default: true},
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
      description: 'Verified public suite name.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identity',
      description:
        'Stable content identifier generated from the title. It does not create an individual room page.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'identity',
      description: 'Owner-approved factual summary used on the Rooms page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'editorialImage',
      group: 'identity',
      description:
        'Optional during development. Assign only after confirming that the photograph shows this suite. Development photography must be replaced before launch.',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'capacity',
      group: 'details',
      description: 'Owner-confirmed maximum occupancy.',
      options: {collapsible: true, collapsed: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beds',
      title: 'Beds',
      type: 'array',
      group: 'details',
      description: 'Owner-confirmed bed configurations shown in this order.',
      of: [defineArrayMember({type: 'bedConfiguration'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'bathroom',
      title: 'Bathroom',
      type: 'string',
      group: 'details',
      description: 'Owner-confirmed bathroom arrangement.',
      options: {
        list: [{title: 'Private ensuite', value: 'privateEnsuite'}],
      },
    }),
    defineField({
      name: 'outlooks',
      title: 'Confirmed Outlooks',
      type: 'array',
      group: 'details',
      description:
        'Use only owner-confirmed outlooks. Do not expand this field from assumptions or photography.',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              {title: 'Bohol Sea', value: 'boholSea'},
              {title: 'Garden', value: 'garden'},
              {title: 'Pool', value: 'pool'},
            ],
          },
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'amenities',
      title: 'Additional Amenities',
      type: 'array',
      group: 'details',
      description:
        'Optional verified details not already represented by capacity, beds, bathroom, or outlooks.',
      of: [defineArrayMember({type: 'roomAmenity'})],
      validation: (rule) => rule.unique(),
    }),
    defineSeoField(),
    defineWorkflowStatusField(),
    defineLastReviewedAtField(),
  ],
  preview: {
    select: {
      capacityLabel: 'capacity.displayLabel',
      lastReviewedAt: 'lastReviewedAt',
      maxGuests: 'capacity.maxGuests',
      previewMedia: 'previewImage',
      title: 'title',
      workflowStatus: 'workflowStatus',
    },
    prepare({capacityLabel, lastReviewedAt, maxGuests, previewMedia, title, workflowStatus}) {
      const subtitle = capacityLabel
        ? String(capacityLabel)
        : maxGuests
          ? `Up to ${maxGuests} guest${Number(maxGuests) === 1 ? '' : 's'}`
          : 'Capacity not set'

      return prepareEditorialPreview({
        lastReviewedAt,
        media: previewMedia,
        subtitle,
        title,
        workflowStatus,
      })
    },
  },
})
