import {defineField, defineType} from 'sanity'

type AvailabilityPeriodValue = {
  endDate?: string
  startDate?: string
}

function periodsOverlap(periods: AvailabilityPeriodValue[] | undefined) {
  const completePeriods = (periods ?? []).filter(
    (period): period is Required<AvailabilityPeriodValue> =>
      Boolean(period.startDate && period.endDate && period.endDate > period.startDate),
  )

  for (let index = 0; index < completePeriods.length; index += 1) {
    const current = completePeriods[index]

    for (
      let comparisonIndex = index + 1;
      comparisonIndex < completePeriods.length;
      comparisonIndex += 1
    ) {
      const comparison = completePeriods[comparisonIndex]
      if (current.startDate < comparison.endDate && comparison.startDate < current.endDate) {
        return true
      }
    }
  }

  return false
}

export const houseAvailability = defineType({
  name: 'houseAvailability',
  title: 'House Availability',
  type: 'document',
  description:
    "The whole-house availability calendar for Joshua's Point. It is not a room calendar.",
  initialValue: {
    publicDisplayEnabled: false,
    periods: [],
  },
  fields: [
    defineField({
      name: 'publicDisplayEnabled',
      title: 'Public Display Enabled',
      type: 'boolean',
      description:
        'Show available and unavailable dates on the guest website. Internal reasons and notes remain private.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'availabilityConfirmedThrough',
      title: 'Availability Confirmed Through',
      type: 'date',
      description: 'The final date through which the calendar has been reviewed and confirmed.',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.publicDisplayEnabled && !value) {
            return 'Required before public availability can be enabled.'
          }
          return true
        }),
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Last Reviewed At',
      type: 'datetime',
      description: 'When the owner last checked the complete availability calendar.',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true
          return new Date(value).getTime() <= Date.now()
            ? true
            : 'Last reviewed time cannot be in the future.'
        }),
    }),
    defineField({
      name: 'periods',
      title: 'Unavailable Periods',
      type: 'array',
      description:
        'Reserved, owner-stay, closed, and maintenance periods for the whole house. Adjacent periods are allowed.',
      of: [{type: 'availabilityPeriod'}],
      validation: (rule) =>
        rule
          .custom((periods: AvailabilityPeriodValue[] | undefined) =>
            periodsOverlap(periods)
              ? 'Some unavailable periods overlap. Review the dates before relying on this calendar.'
              : true,
          )
          .warning(),
    }),
  ],
  preview: {
    select: {
      confirmedThrough: 'availabilityConfirmedThrough',
      publicDisplayEnabled: 'publicDisplayEnabled',
    },
    prepare({confirmedThrough, publicDisplayEnabled}) {
      return {
        title: 'House Availability',
        subtitle: `${publicDisplayEnabled ? 'Public display prepared' : 'Private calendar'}${
          confirmedThrough ? ` · Confirmed through ${confirmedThrough}` : ''
        }`,
      }
    },
  },
})
