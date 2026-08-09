import {defineField, defineType} from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Quote',
      type: 'text',
      rows: 4,
      description: 'The quoted words without quotation marks.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'Optional person or source.',
    }),
    defineField({
      name: 'context',
      title: 'Context',
      type: 'string',
      description: 'Optional short source, place, or occasion.',
    }),
    defineField({
      name: 'style',
      title: 'Editorial Scale',
      type: 'string',
      description: 'Choose only from the approved editorial treatments.',
      options: {
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'Large', value: 'large'},
        ],
      },
      initialValue: 'standard',
    }),
  ],
})
