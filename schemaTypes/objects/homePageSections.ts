import {defineField, defineType} from 'sanity'

export const homeSharedLife = defineType({
  name: 'homeSharedLife',
  title: 'Shared Life',
  type: 'object',
  description:
    'The public-safe story of cooking, dining, conversation, and time shared between the house and landscape.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small editorial context for the section.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'A restrained heading about the shared life of the house.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      description:
        'Describe approved observations of cooking, dining, conversation, and being together. Do not include private family memories or invented guest stories.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      description:
        'Photography showing the connected shared spaces. Use the image Caption field for any public caption.',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const homeSouthernNegrosIntroduction = defineType({
  name: 'homeSouthernNegrosIntroduction',
  title: 'Southern Negros',
  type: 'object',
  description:
    'A nature-first doorway from Joshua’s Point into the wider Southern Negros region, not a catalogue of attractions.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small editorial context for the regional introduction.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'A calm heading that keeps nature ahead of regional discovery.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 5,
      description:
        'Introduce nature, islands, diving, waterfalls, mountains, and regional discovery only through approved information. Avoid lists, superlatives, and tourism language.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      description:
        'Optional verified regional photography. Leave empty until a truthful Joshua’s Point image is available; the section may remain text-led.',
    }),
    defineField({
      name: 'primaryLink',
      title: 'Editorial Link',
      type: 'link',
      description:
        'Optional intentional link into the regional guide. Do not add a link merely to fill the section.',
    }),
  ],
})

export const homeClosingReflection = defineType({
  name: 'homeClosingReflection',
  title: 'Closing Reflection',
  type: 'object',
  description:
    'The quiet ending to Home: an invitation into the Joshua’s Point world without a booking call to action.',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      description:
        'One public-safe closing observation grounded in approved source material. Do not include private memories or sales language.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      description:
        'Optional quiet closing photograph. Leave empty when a text-only ending creates the stronger editorial pause.',
    }),
  ],
})
