import {defineField, defineType} from 'sanity'

export const routeStop = defineType({
  name: 'routeStop',
  title: 'Route Stop',
  type: 'object',
  description:
    'One ordered point in a scenic journey. Coordinates remain optional until they are verified.',
  fields: [
    defineField({
      name: 'label',
      title: 'Public Label',
      type: 'string',
      description: 'Clear textual location name that remains useful when no map is available.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Related Destination',
      type: 'reference',
      to: [{type: 'destination'}],
      description:
        'Optional existing destination represented by this stop. Do not create duplicate place content here.',
    }),
    defineField({
      name: 'location',
      title: 'Verified Map Location',
      type: 'mapLocation',
      description:
        'Optional provider-neutral coordinates. Leave empty until the point and public precision are verified.',
      options: {collapsible: true, collapsed: true},
    }),
    defineField({
      name: 'note',
      title: 'Editorial Note',
      type: 'text',
      rows: 3,
      description:
        'Optional concise reason this point belongs in the journey. Do not add unverified access or service claims.',
    }),
  ],
  preview: {
    select: {
      destinationTitle: 'destination.title',
      label: 'label',
      note: 'note',
    },
    prepare({destinationTitle, label, note}) {
      return {
        subtitle: note || destinationTitle || 'Text-only stop',
        title: label || 'Untitled stop',
      }
    },
  },
})
