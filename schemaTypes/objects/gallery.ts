import {defineArrayMember, defineField, defineType} from 'sanity'

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  description: 'An ordered group of photographs. Layout is determined by the frontend context.',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description: 'Add at least two images in their intended reading order.',
      of: [defineArrayMember({type: 'editorialImage'})],
      validation: (rule) => rule.required().min(2),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Optional context for the gallery as a whole.',
    }),
    defineField({
      name: 'accessibleLabel',
      title: 'Accessible Label',
      type: 'string',
      description: 'Concise description of the gallery’s subject for assistive technology.',
      validation: (rule) => rule.required(),
    }),
  ],
})
