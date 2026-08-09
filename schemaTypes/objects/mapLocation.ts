import {defineField, defineType} from 'sanity'

export const mapLocation = defineType({
  name: 'mapLocation',
  title: 'Map Location',
  type: 'object',
  description:
    'Provider-neutral location details. Map provider configuration does not belong in content.',
  fields: [
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
      description:
        'Verified latitude and longitude. Use a safe public meeting point for sensitive locations.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Location Label',
      type: 'string',
      description: 'Accessible place name shown when a map is unavailable.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'directionsUrl',
      title: 'Directions URL',
      type: 'url',
      description: 'Optional verified external directions link for the published location.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
  ],
})
