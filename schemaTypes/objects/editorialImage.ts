import {defineField, defineType} from 'sanity'

type EditorialImageValue = {
  alt?: string
  asset?: {_ref?: string}
  decorative?: boolean
}

export const editorialImage = defineType({
  name: 'editorialImage',
  title: 'Editorial Image',
  type: 'image',
  description: 'Photography with the accessibility and credit information needed for publication.',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      description: 'Describe what the image shows. Leave empty only when Decorative is enabled.',
    }),
    defineField({
      name: 'decorative',
      title: 'Decorative',
      type: 'boolean',
      description:
        'Enable only when the image adds no information and should be ignored by screen readers.',
      initialValue: false,
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description:
        'Optional context shown with the image. A caption explains why the image matters.',
    }),
    defineField({
      name: 'credit',
      title: 'Credit',
      type: 'string',
      description: 'Optional photographer or source credit.',
    }),
    defineField({
      name: 'creditUrl',
      title: 'Credit URL',
      type: 'url',
      description: 'Optional destination associated with the image credit.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const image = value as EditorialImageValue | undefined
      if (!image) return true
      if (!image.asset?._ref) return 'Select an image asset.'

      const alt = image?.alt?.trim()

      if (image?.decorative && alt) {
        return 'Decorative images must not include alternative text.'
      }

      if (!image?.decorative && !alt) {
        return 'Add meaningful alternative text or explicitly mark the image as decorative.'
      }

      return true
    }),
})
