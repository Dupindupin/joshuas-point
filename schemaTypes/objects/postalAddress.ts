import {defineField, defineType} from 'sanity'

export const postalAddress = defineType({
  name: 'postalAddress',
  title: 'Postal Address',
  type: 'object',
  description: 'The structured address used for contact details and future metadata.',
  fields: [
    defineField({
      name: 'locality',
      title: 'Locality',
      type: 'string',
      description: 'City, municipality, or locality.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      description: 'Province, state, or region.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      type: 'string',
      description: 'Postal code when one applies.',
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      description: 'Full country name.',
      validation: (rule) => rule.required(),
    }),
  ],
})
