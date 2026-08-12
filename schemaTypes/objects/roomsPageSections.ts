import {defineField, defineType} from 'sanity'

export const roomsPageHero = defineType({
  name: 'roomsPageHero',
  title: 'Rooms Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small context label above the Rooms page title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Public Rooms page title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      description: 'A short factual introduction to the accommodation.',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const roomsEditorialIntroduction = defineType({
  name: 'roomsEditorialIntroduction',
  title: 'Editorial Introduction',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      description: 'Approved accommodation philosophy. Do not introduce unverified room claims.',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const roomsCollectionIntroduction = defineType({
  name: 'roomsCollectionIntroduction',
  title: 'Collection Introduction',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const roomsComfortPhilosophy = defineType({
  name: 'roomsComfortPhilosophy',
  title: 'Comfort Philosophy',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      description:
        'Optional public-safe comfort statement. Do not claim cooling, quietness, orientation, or environmental performance without verification.',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const roomsClosingReflection = defineType({
  name: 'roomsClosingReflection',
  title: 'Closing Reflection',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      description: 'Optional quiet closing paragraph without a booking call to action.',
      validation: (rule) => rule.required(),
    }),
  ],
})
