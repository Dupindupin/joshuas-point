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
      description:
        'Choose only an official Joshua’s Point account that Tobias has approved for publication.',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'YouTube', value: 'youtube'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'Pinterest', value: 'pinterest'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description:
        'Complete HTTPS URL for the confirmed public profile. Leave the profile out when it is not approved.',
      validation: (rule) => rule.required().uri({scheme: ['https']}),
    }),
  ],
  preview: {
    select: {
      subtitle: 'url',
      title: 'platform',
    },
  },
})
