import {defineField, defineType} from 'sanity'

export const availabilityStatusOptions = [
  {title: 'Reserved', value: 'reserved'},
  {title: 'Owner stay', value: 'ownerStay'},
  {title: 'Closed', value: 'closed'},
  {title: 'Maintenance', value: 'maintenance'},
] as const

type AvailabilityPeriodParent = {
  startDate?: string
}

export const availabilityPeriod = defineType({
  name: 'availabilityPeriod',
  title: 'Unavailable Period',
  type: 'object',
  description:
    'A period when the whole house is unavailable. The start date is included; the end date is the first available day.',
  fields: [
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'The first unavailable date.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'The first available date after this period.',
      validation: (rule) =>
        rule.required().custom((endDate, context) => {
          const {startDate} = (context.parent ?? {}) as AvailabilityPeriodParent
          if (!endDate || !startDate) return true

          return endDate > startDate ? true : 'End date must be after the start date.'
        }),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      description: 'The internal reason the whole house is unavailable.',
      initialValue: 'reserved',
      options: {
        list: [...availabilityStatusOptions],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description:
        'Studio-only operational notes. These are not projected to the public website. Do not include guest contact, payment, or other sensitive information.',
      validation: (rule) => rule.max(500),
    }),
  ],
  preview: {
    select: {
      endDate: 'endDate',
      startDate: 'startDate',
      status: 'status',
    },
    prepare({endDate, startDate, status}) {
      const statusTitle =
        availabilityStatusOptions.find((option) => option.value === status)?.title ??
        'Status not set'

      return {
        title: startDate && endDate ? `${startDate} → ${endDate}` : 'Dates not complete',
        subtitle: statusTitle,
      }
    },
  },
})
