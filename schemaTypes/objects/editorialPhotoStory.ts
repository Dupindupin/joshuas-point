import {defineArrayMember, defineField, defineType} from 'sanity'

import {
  EditorialPhotoArrayInput,
  EditorialPhotoImageInput,
} from '../components/editorialPhotographyInputs'

type PhotoStoryPreview = {
  closingImages?: unknown[]
  detailImages?: unknown[]
  heroImage?: {asset?: unknown}
  journeyImages?: unknown[]
  openingImages?: unknown[]
}

const captionGuidance =
  'Every image may have a caption. Keep it short, human and editorial—never generic. Describe only what the photograph truthfully shows.'

function photoArrayField({
  description,
  fieldset,
  max,
  name,
  title,
}: {
  description: string
  fieldset: string
  max: number
  name: string
  title: string
}) {
  return defineField({
    name,
    title,
    type: 'array',
    fieldset,
    components: {input: EditorialPhotoArrayInput},
    description: `${description} ${captionGuidance}`,
    of: [defineArrayMember({type: 'editorialImage'})],
    validation: (rule) => rule.max(max),
  })
}

export const editorialPhotoStory = defineType({
  name: 'editorialPhotoStory',
  title: 'Editorial Photo Story',
  type: 'object',
  description:
    'A prepared visual story. Add photographs to the section that describes their role; the website controls the layout and reading order.',
  fieldsets: [
    {
      name: 'identity',
      title: 'Story Title and Purpose',
      description: 'Define what this photo story should help the visitor understand or feel.',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'hero',
      title: '1. Hero Image',
      description: 'Large introduction image. This is the image people remember first.',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'opening',
      title: '2. Opening',
      description: '1–2 images. Introduce the place before the main experience.',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'journey',
      title: '3. Journey',
      description: '3–6 images. Show how the experience unfolds.',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'details',
      title: '4. Details',
      description: '2–6 images. Small moments, wildlife, textures, people and atmosphere.',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'closing',
      title: '5. Closing',
      description: '1–2 images. Leave the visitor with a lasting feeling.',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Story Title',
      type: 'string',
      fieldset: 'identity',
      description: 'Public editorial heading. Keep it specific and restrained.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'purpose',
      title: 'Purpose',
      type: 'text',
      rows: 3,
      fieldset: 'identity',
      description:
        'Internal guidance for choosing photographs. Explain the visual story in plain language. This is not shown publicly.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Story Introduction',
      type: 'text',
      rows: 3,
      fieldset: 'identity',
      description: 'Optional short public introduction to the sequence.',
    }),
    defineField({
      name: 'accessibleLabel',
      title: 'Accessible Label',
      type: 'string',
      fieldset: 'identity',
      description: 'Concise description of the complete sequence for assistive technology.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Story Hero',
      type: 'editorialImage',
      fieldset: 'hero',
      components: {input: EditorialPhotoImageInput},
      description: `Choose one strong photograph that introduces this story. ${captionGuidance}`,
    }),
    photoArrayField({
      name: 'openingImages',
      title: 'Opening Images',
      fieldset: 'opening',
      max: 2,
      description: 'Add up to two photographs that establish the place and atmosphere.',
    }),
    photoArrayField({
      name: 'journeyImages',
      title: 'Journey Images',
      fieldset: 'journey',
      max: 6,
      description: 'Add photographs in the order the experience unfolds.',
    }),
    photoArrayField({
      name: 'detailImages',
      title: 'Detail Images',
      fieldset: 'details',
      max: 6,
      description: 'Add observed details that deepen the story without repeating the wider views.',
    }),
    photoArrayField({
      name: 'closingImages',
      title: 'Closing Images',
      fieldset: 'closing',
      max: 2,
      description: 'Add one or two photographs that bring the visual story to a quiet close.',
    }),
  ],
  preview: {
    select: {
      closingImages: 'closingImages',
      detailImages: 'detailImages',
      heroImage: 'heroImage',
      journeyImages: 'journeyImages',
      openingImages: 'openingImages',
      title: 'title',
    },
    prepare({title, ...selection}) {
      const story = selection as PhotoStoryPreview
      const count =
        (story.heroImage?.asset ? 1 : 0) +
        (story.openingImages?.length ?? 0) +
        (story.journeyImages?.length ?? 0) +
        (story.detailImages?.length ?? 0) +
        (story.closingImages?.length ?? 0)
      return {
        media: story.heroImage as never,
        subtitle: count > 0 ? `${count} photograph${count === 1 ? '' : 's'} added` : 'Photography still needed',
        title: title ?? 'Untitled photo story',
      }
    },
  },
})

export const editorialPhotography = defineType({
  name: 'editorialPhotography',
  title: 'Editorial Photo Stories',
  type: 'object',
  description:
    'Prepared upload positions for the page’s visual story. Add photographs; the website handles composition, pacing and responsive presentation.',
  fields: [
    defineField({
      name: 'stories',
      title: 'Prepared Photo Stories',
      type: 'array',
      description:
        'Each story has the same guided sequence: Hero, Opening, Journey, Details and Closing. Dauin uses two stories because land and underwater life are distinct.',
      of: [defineArrayMember({type: 'editorialPhotoStory'})],
      validation: (rule) => rule.required().min(1).max(2),
    }),
  ],
})
