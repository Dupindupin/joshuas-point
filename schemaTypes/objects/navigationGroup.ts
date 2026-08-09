import {defineArrayMember, defineField, defineType} from 'sanity'

export const navigationGroup = defineType({
  name: 'navigationGroup',
  title: 'Navigation Group',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Group Title',
      type: 'string',
      description: 'Short heading used to organize footer links.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      description: 'Links appear in this order.',
      of: [defineArrayMember({type: 'navigationItem'})],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
