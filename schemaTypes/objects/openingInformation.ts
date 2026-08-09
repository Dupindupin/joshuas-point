import {defineField, defineType} from 'sanity'

export const openingInformation = defineType({
  name: 'openingInformation',
  title: 'Opening Information',
  type: 'object',
  description: 'Human-readable opening guidance for a place with managed access.',
  fields: [
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'string',
      description: 'Concise current hours. Do not imply that third-party access is guaranteed.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'qualification',
      title: 'Qualification',
      type: 'text',
      rows: 2,
      description: 'Optional seasonal, holiday, weather, or access qualification.',
    }),
  ],
})
