import {defineField, defineType} from 'sanity'

export const roomAmenity = defineType({
  name: 'roomAmenity',
  title: 'Room Amenity',
  type: 'object',
  fields: [
    defineField({
      name: 'amenity',
      title: 'Amenity',
      type: 'reference',
      to: [{type: 'amenity'}],
      description: 'Choose only a verified, active amenity.',
      options: {
        filter: 'active == true',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Room-specific Note',
      type: 'string',
      description:
        'Optional factual clarification for this room. Do not repeat the shared description.',
      validation: (rule) => rule.max(140),
    }),
  ],
  preview: {
    select: {
      note: 'note',
      title: 'amenity.name',
    },
    prepare({note, title}) {
      return {
        subtitle: note,
        title: title || 'Amenity',
      }
    },
  },
})
