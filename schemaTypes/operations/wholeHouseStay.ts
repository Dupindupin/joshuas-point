import {defineField, defineType} from 'sanity'

import {MAXIMUM_WHOLE_HOUSE_GUESTS, wholeHouseOccupancyDescription} from './occupancy'

const stayStatusOptions = [
  {title: 'Proposed', value: 'proposed'},
  {title: 'Confirmed', value: 'confirmed'},
  {title: 'Cancelled', value: 'cancelled'},
  {title: 'Completed', value: 'completed'},
] as const

const availabilitySyncStatusOptions = [
  {title: 'Not started', value: 'notStarted'},
  {title: 'Pending', value: 'pending'},
  {title: 'Synced', value: 'synced'},
  {title: 'Conflict', value: 'conflict'},
  {title: 'Failed', value: 'failed'},
] as const

type StayDatesValue = {
  arrival?: string
  departure?: string
}

export const wholeHouseStay = defineType({
  name: 'wholeHouseStay',
  title: 'Whole-house Stay',
  type: 'document',
  description:
    'Owner-only whole-house stay record. This is not a room booking and belongs only in the private Operations dataset.',
  initialValue: () => ({
    status: 'proposed',
    availabilitySync: {
      status: 'notStarted',
    },
    timestamps: {
      proposedAt: new Date().toISOString(),
      statusChangedAt: new Date().toISOString(),
    },
  }),
  fieldsets: [
    {name: 'stay', title: 'Stay'},
    {name: 'operations', title: 'Operations'},
    {name: 'system', title: 'System record', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'referenceNumber',
      title: 'Reference Number',
      type: 'string',
      fieldset: 'stay',
      description: 'Human-readable stay reference. It must be unique within Operations.',
      validation: (rule) => rule.required().min(4).max(80),
    }),
    defineField({
      name: 'sourceEnquiry',
      title: 'Source Enquiry',
      type: 'reference',
      fieldset: 'stay',
      to: [{type: 'stayEnquiry'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dates',
      title: 'Dates',
      type: 'object',
      fieldset: 'stay',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'arrival',
          title: 'Arrival',
          type: 'date',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'departure',
          title: 'Departure',
          type: 'date',
          description: 'The guest checks out on this date.',
          validation: (rule) =>
            rule.required().custom((departure, context) => {
              const {arrival} = (context.parent ?? {}) as StayDatesValue
              if (!departure || !arrival) return true
              return departure > arrival ? true : 'Departure must be after arrival.'
            }),
        }),
      ],
    }),
    defineField({
      name: 'guestCount',
      title: 'Guest Count',
      type: 'number',
      fieldset: 'stay',
      description: wholeHouseOccupancyDescription,
      validation: (rule) => rule.required().integer().min(1).max(MAXIMUM_WHOLE_HOUSE_GUESTS),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      fieldset: 'operations',
      options: {list: [...stayStatusOptions], layout: 'dropdown'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'availabilitySync',
      title: 'Availability Sync',
      type: 'object',
      fieldset: 'operations',
      description:
        'Status only in Phase 1. No availability record is created or changed by this schema.',
      fields: [
        defineField({
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {list: [...availabilitySyncStatusOptions], layout: 'dropdown'},
          validation: (rule) => rule.required(),
        }),
        defineField({name: 'lastAttemptAt', title: 'Last Attempt At', type: 'datetime'}),
        defineField({name: 'syncedAt', title: 'Synced At', type: 'datetime'}),
      ],
    }),
    defineField({
      name: 'timestamps',
      title: 'Workflow Timestamps',
      type: 'object',
      fieldset: 'system',
      description: 'Sanity also records document creation and update times automatically.',
      fields: [
        defineField({name: 'proposedAt', title: 'Proposed At', type: 'datetime'}),
        defineField({name: 'statusChangedAt', title: 'Status Changed At', type: 'datetime'}),
        defineField({name: 'confirmedAt', title: 'Confirmed At', type: 'datetime'}),
        defineField({name: 'cancelledAt', title: 'Cancelled At', type: 'datetime'}),
        defineField({name: 'completedAt', title: 'Completed At', type: 'datetime'}),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Upcoming arrival',
      name: 'arrivalAsc',
      by: [{field: 'dates.arrival', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      arrival: 'dates.arrival',
      departure: 'dates.departure',
      referenceNumber: 'referenceNumber',
      status: 'status',
    },
    prepare({arrival, departure, referenceNumber, status}) {
      const statusTitle =
        stayStatusOptions.find((option) => option.value === status)?.title ?? 'Status not set'
      const dates = arrival && departure ? `${arrival} → ${departure}` : 'Dates not complete'
      return {
        title: referenceNumber || 'Untitled stay',
        subtitle: `${dates} · ${statusTitle}`,
      }
    },
  },
})
