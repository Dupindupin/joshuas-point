import {defineField, defineType} from 'sanity'

export const homeHero = defineType({
  name: 'homeHero',
  title: 'Homepage Hero',
  type: 'object',
  description: 'The opening image and words visitors encounter on the Homepage.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'A small location or context label above the heading.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'The primary Homepage statement. Keep it calm and concise.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      description:
        'A short introduction that supports the image and heading without marketing language.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      description: 'Full-width Homepage photography with enough space for readable text.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryLink',
      title: 'Primary Link',
      type: 'link',
      description: 'Optional primary editorial destination.',
    }),
    defineField({
      name: 'secondaryLink',
      title: 'Secondary Link',
      type: 'link',
      description: 'Optional quieter editorial destination.',
    }),
  ],
})
