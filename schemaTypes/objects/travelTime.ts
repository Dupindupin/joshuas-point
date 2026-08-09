import {defineField, defineType} from 'sanity'

export const travelTime = defineType({
  name: 'travelTime',
  title: 'Travel Time',
  type: 'object',
  description: 'An editorially reviewed estimate rather than a live routing promise.',
  fields: [
    defineField({
      name: 'durationMinutes',
      title: 'Approximate Duration in Minutes',
      type: 'number',
      description: 'Whole-number estimate used for sorting and future structured presentation.',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'displayLabel',
      title: 'Display Label',
      type: 'string',
      description: 'Qualified public wording, such as “Around 45 minutes by scooter.”',
      validation: (rule) => rule.required(),
    }),
  ],
})
