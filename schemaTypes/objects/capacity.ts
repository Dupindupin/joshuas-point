import {defineField, defineType} from 'sanity'

type CapacityValue = {
  adults?: number
  children?: number
  maxGuests?: number
}

export const capacity = defineType({
  name: 'capacity',
  title: 'Capacity',
  type: 'object',
  description: 'Factual occupancy information. Do not add availability or pricing.',
  fields: [
    defineField({
      name: 'maxGuests',
      title: 'Maximum Guests',
      type: 'number',
      description: 'Maximum total occupancy for the room.',
      validation: (rule) => rule.required().integer().greaterThan(0),
    }),
    defineField({
      name: 'adults',
      title: 'Adults',
      type: 'number',
      description: 'Optional adult limit when operationally useful.',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'children',
      title: 'Children',
      type: 'number',
      description: 'Optional child limit when operationally useful.',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'displayLabel',
      title: 'Display Label',
      type: 'string',
      description:
        'Optional editorial wording such as “Two guests”. The website can derive a label when empty.',
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const occupancy = value as CapacityValue | undefined
      if (!occupancy) return true

      const specifiedTotal = (occupancy.adults ?? 0) + (occupancy.children ?? 0)
      if (occupancy.maxGuests && specifiedTotal > occupancy.maxGuests) {
        return 'The combined adult and child limits cannot exceed Maximum Guests.'
      }

      return true
    }),
})
