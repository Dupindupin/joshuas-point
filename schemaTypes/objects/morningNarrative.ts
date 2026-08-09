import {defineField, defineType} from 'sanity'

export const morningNarrative = defineType({
  name: 'morningNarrative',
  title: 'Morning Narrative',
  type: 'object',
  description: 'The image-first Homepage narrative about morning at Joshua’s Point.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small editorial context for the narrative.',
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
      description: 'One short editorial paragraph.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      description: 'Large landscape photography that remains the focus of the section.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Optional quiet context shown with the image.',
    }),
  ],
})
