import {defineField, defineType} from 'sanity'

type VisibilityRangeValue = {
  maximumMeters?: number
  minimumMeters?: number
  notes?: string
}

export const visibilityRange = defineType({
  name: 'visibilityRange',
  title: 'Visibility Range',
  type: 'object',
  description:
    'Observed underwater visibility in meters, qualified because natural conditions vary.',
  fields: [
    defineField({
      name: 'minimumMeters',
      title: 'Minimum Visibility in Meters',
      type: 'number',
      description: 'Optional lower end of the locally reviewed visibility range.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'maximumMeters',
      title: 'Maximum Visibility in Meters',
      type: 'number',
      description: 'Optional upper end of the locally reviewed visibility range.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'notes',
      title: 'Context',
      type: 'text',
      rows: 3,
      description: 'Optional context about seasonal, weather, or site-related variability.',
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const visibility = value as VisibilityRangeValue | undefined
      if (!visibility) return true

      const hasMinimum = visibility.minimumMeters !== undefined
      const hasMaximum = visibility.maximumMeters !== undefined
      const hasNotes = Boolean(visibility.notes?.trim())

      if (!hasMinimum && !hasMaximum && !hasNotes) {
        return 'Add a visibility value or contextual notes.'
      }

      if (
        hasMinimum &&
        hasMaximum &&
        Number(visibility.maximumMeters) < Number(visibility.minimumMeters)
      ) {
        return 'Maximum visibility cannot be less than minimum visibility.'
      }

      return true
    }),
})
