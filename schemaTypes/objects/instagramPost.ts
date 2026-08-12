import {defineField, defineType} from 'sanity'

export const instagramPost = defineType({
  name: 'instagramPost',
  title: 'Selected Instagram Post',
  type: 'object',
  description:
    'An editorial image and outbound link to one approved Instagram post. The website does not load an Instagram embed or Meta script.',
  fields: [
    defineField({
      name: 'image',
      title: 'Editorial Image',
      type: 'editorialImage',
      description:
        'Use the approved original image in Sanity so the website remains fast and independent of Instagram.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Editorial Caption',
      type: 'text',
      rows: 2,
      description:
        'Optional short context in the Joshua’s Point voice. Do not copy a long social caption into the website.',
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: 'postUrl',
      title: 'Instagram Post URL',
      type: 'url',
      description: 'Exact HTTPS URL of the approved Instagram post or reel.',
      validation: (rule) =>
        rule
          .required()
          .uri({scheme: ['https']})
          .custom((value) => {
            if (!value) return true
            try {
              const hostname = new URL(value).hostname.replace(/^www\./, '')
              return hostname === 'instagram.com'
                ? true
                : 'Use an official instagram.com post or reel URL.'
            } catch {
              return 'Add a valid Instagram URL.'
            }
          }),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      subtitle: 'postUrl',
      title: 'caption',
    },
    prepare({media, subtitle, title}) {
      return {
        media,
        subtitle,
        title: title || 'Selected Instagram post',
      }
    },
  },
})
