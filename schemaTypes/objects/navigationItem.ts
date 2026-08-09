import {defineField, defineType} from 'sanity'

export const navigationItem = defineType({
  name: 'navigationItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Short visible navigation label.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Destination',
      type: 'link',
      description: 'Where this navigation item leads.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
    },
  },
})
