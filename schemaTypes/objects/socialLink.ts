import {defineField, defineType} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      description: 'Human-readable platform name.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Complete public profile URL.',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {
      title: 'platform',
    },
  },
})
