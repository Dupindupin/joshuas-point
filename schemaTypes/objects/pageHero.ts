import {defineField, defineType} from 'sanity'

export const pageHero = defineType({
  name: 'pageHero',
  title: 'Page Hero',
  type: 'object',
  description: 'Editorial opening content for an interior page or entry.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small context label above the title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title Override',
      type: 'string',
      description: 'Optional title used in the Hero instead of the document title.',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      description: 'A short, quiet introduction to the page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'editorialImage',
      description: 'Optional opening image when the approved page treatment includes photography.',
    }),
  ],
})
