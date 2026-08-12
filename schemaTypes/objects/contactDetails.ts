import {defineField, defineType} from 'sanity'

type ContactDetailsValue = {
  phone?: string
  phoneHref?: string
}

export const contactDetails = defineType({
  name: 'contactDetails',
  title: 'Contact Details',
  type: 'object',
  description: 'Public contact channels. Include only channels that are actively monitored.',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Public inquiry email address.',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Human-readable phone number shown to visitors.',
    }),
    defineField({
      name: 'phoneHref',
      title: 'Phone Link Value',
      type: 'string',
      description:
        'Normalized international value including the tel: prefix, for example tel:+63123456789.',
      validation: (rule) =>
        rule.regex(/^tel:\+[1-9]\d{7,14}$/, {
          name: 'international tel link',
          invert: false,
        }),
    }),
    defineField({
      name: 'whatsappUrl',
      title: 'WhatsApp Link',
      type: 'url',
      description:
        'Optional approved public WhatsApp conversation link. Leave empty until Tobias has approved this contact channel.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'postalAddress',
      description: 'Structured public address.',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Map URL',
      type: 'url',
      description: 'Optional external map destination.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'inquiryNote',
      title: 'Inquiry Note',
      type: 'text',
      rows: 2,
      description: 'Optional short guidance shown near contact details.',
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const contact = value as ContactDetailsValue | undefined
      if (!contact?.phone) return true
      return contact.phoneHref
        ? true
        : 'Add a normalized phone link value when a phone number is provided.'
    }),
})
