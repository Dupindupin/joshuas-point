import {defineField, defineType} from 'sanity'

export const placeStory = defineType({
  name: 'placeStory',
  title: 'Place Story',
  type: 'object',
  description: 'The first editorial story following the Homepage Hero.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small editorial context for the story.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Short display heading.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      description: 'One short editorial paragraph. Formatting is intentionally limited.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      description: 'Landscape photography supporting this story.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Brief context shown beneath the image.',
      validation: (rule) => rule.required(),
    }),
  ],
})
