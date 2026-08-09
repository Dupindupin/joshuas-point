import {defineArrayMember, defineField, defineType} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  description: 'A quiet closing area shared by the public website.',
  fields: [
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 2,
      description: 'One short closing statement.',
    }),
    defineField({
      name: 'navigationGroups',
      title: 'Navigation Groups',
      type: 'array',
      description: 'Footer link groups appear in this order.',
      of: [defineArrayMember({type: 'navigationGroup'})],
    }),
    defineField({
      name: 'contactDetailsOverride',
      title: 'Contact Details Override',
      type: 'contactDetails',
      description:
        'Optional footer-specific details. Leave empty to use the global contact details.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Only include actively maintained profiles.',
      of: [defineArrayMember({type: 'socialLink'})],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      description: 'Legal and policy links appear in this order.',
      of: [defineArrayMember({type: 'navigationItem'})],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'Do not include a year; the website can add the current year automatically.',
    }),
  ],
})
