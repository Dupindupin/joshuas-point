import {defineField, defineType} from 'sanity'

const enquiryStatusOptions = [
  {title: 'New', value: 'new'},
  {title: 'Replied', value: 'replied'},
  {title: 'Awaiting guest', value: 'awaitingGuest'},
  {title: 'Converted to stay', value: 'convertedToStay'},
  {title: 'Closed', value: 'closed'},
] as const

const emailDeliveryStatusOptions = [
  {title: 'Not attempted', value: 'notAttempted'},
  {title: 'Pending', value: 'pending'},
  {title: 'Sent', value: 'sent'},
  {title: 'Partially sent', value: 'partiallySent'},
  {title: 'Failed', value: 'failed'},
  {title: 'Disabled', value: 'disabled'},
] as const

type RequestedStayValue = {
  arrival?: string
  departure?: string
}

export const stayEnquiry = defineType({
  name: 'stayEnquiry',
  title: 'Stay Enquiry',
  type: 'document',
  description:
    'Owner-only enquiry record. This document belongs in the private Operations dataset and must never be queried by the public website.',
  initialValue: () => ({
    receivedAt: new Date().toISOString(),
    status: 'new',
    emailDelivery: {
      status: 'notAttempted',
    },
    source: 'websiteEnquiry',
    timestamps: {
      statusChangedAt: new Date().toISOString(),
    },
  }),
  fieldsets: [
    {name: 'identity', title: 'Enquiry'},
    {name: 'guest', title: 'Guest'},
    {name: 'stay', title: 'Requested stay'},
    {name: 'operations', title: 'Owner operations'},
    {name: 'delivery', title: 'Email delivery'},
    {name: 'system', title: 'System record', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'referenceNumber',
      title: 'Reference Number',
      type: 'string',
      fieldset: 'identity',
      description: 'Human-readable enquiry reference. It must be unique within Operations.',
      validation: (rule) => rule.required().min(4).max(80),
    }),
    defineField({
      name: 'receivedAt',
      title: 'Received At',
      type: 'datetime',
      fieldset: 'identity',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      fieldset: 'identity',
      options: {list: [...enquiryStatusOptions], layout: 'dropdown'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'guest',
      title: 'Guest',
      type: 'object',
      fieldset: 'guest',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (rule) => rule.required().max(160),
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'email',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'phone',
          title: 'Phone',
          type: 'string',
          description: 'Optional. Store only the number supplied by the guest.',
          validation: (rule) => rule.max(80),
        }),
      ],
    }),
    defineField({
      name: 'requestedStay',
      title: 'Requested Stay',
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
              const {arrival} = (context.parent ?? {}) as RequestedStayValue
              if (!departure || !arrival) return true
              return departure > arrival ? true : 'Departure must be after arrival.'
            }),
        }),
        defineField({
          name: 'guestCount',
          title: 'Guest Count',
          type: 'number',
          validation: (rule) => rule.required().integer().min(1),
        }),
      ],
    }),
    defineField({
      name: 'message',
      title: 'Guest Message',
      type: 'text',
      rows: 6,
      fieldset: 'stay',
      validation: (rule) => rule.max(5000),
    }),
    defineField({
      name: 'ownerNotes',
      title: 'Owner Notes',
      type: 'text',
      rows: 5,
      fieldset: 'operations',
      description: 'Private operational notes. Never expose this field to the public website.',
      validation: (rule) => rule.max(5000),
    }),
    defineField({
      name: 'emailDelivery',
      title: 'Email Delivery',
      type: 'object',
      fieldset: 'delivery',
      fields: [
        defineField({
          name: 'status',
          title: 'Status',
          type: 'string',
          options: {list: [...emailDeliveryStatusOptions], layout: 'dropdown'},
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'lastAttemptAt',
          title: 'Last Attempt At',
          type: 'datetime',
        }),
      ],
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      fieldset: 'system',
      options: {
        list: [
          {title: 'Website enquiry', value: 'websiteEnquiry'},
          {title: 'Owner entered', value: 'ownerEntered'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'idempotencyKey',
      title: 'Idempotency Key',
      type: 'string',
      fieldset: 'system',
      description: 'System-generated deduplication key. It is not a credential.',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'timestamps',
      title: 'Workflow Timestamps',
      type: 'object',
      fieldset: 'system',
      description: 'Sanity also records document creation and update times automatically.',
      fields: [
        defineField({name: 'statusChangedAt', title: 'Status Changed At', type: 'datetime'}),
        defineField({name: 'repliedAt', title: 'Replied At', type: 'datetime'}),
        defineField({name: 'convertedAt', title: 'Converted At', type: 'datetime'}),
        defineField({name: 'closedAt', title: 'Closed At', type: 'datetime'}),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'receivedAtDesc',
      by: [{field: 'receivedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      arrival: 'requestedStay.arrival',
      guestName: 'guest.name',
      referenceNumber: 'referenceNumber',
      status: 'status',
    },
    prepare({arrival, guestName, referenceNumber, status}) {
      const statusTitle =
        enquiryStatusOptions.find((option) => option.value === status)?.title ?? 'Status not set'
      return {
        title: referenceNumber || guestName || 'Untitled enquiry',
        subtitle: [guestName, arrival, statusTitle].filter(Boolean).join(' · '),
      }
    },
  },
})
