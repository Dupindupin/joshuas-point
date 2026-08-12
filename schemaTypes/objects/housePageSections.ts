import {defineArrayMember, defineField, defineType} from 'sanity'

type HouseStoryImageValue = {
  role?: string
}

type EditorialImageValue = {
  asset?: {_ref?: string}
}

type HouseMaterialEntryValue = {
  name?: string
}

function hasUniqueAssets(images: EditorialImageValue[] | undefined) {
  const assetReferences = images?.map(({asset}) => asset?._ref).filter(Boolean)
  if (!assetReferences) return true
  return new Set(assetReferences).size === assetReferences.length
}

const indoorOutdoorRoles = [
  {title: 'Open threshold', value: 'threshold'},
  {title: 'Deck and shelter', value: 'deckShelter'},
  {title: 'Pool relationship', value: 'poolRelationship'},
]

export const houseHero = defineType({
  name: 'houseHero',
  title: 'House Hero',
  type: 'object',
  description:
    'The photography-first opening to The House, focused on its relationship with the landscape.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small context label above the title.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Primary page heading. Keep it restrained and factual.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      description:
        'A short public-safe introduction to the relationship between the house and landscape.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      description:
        'Defining landscape-led photograph. Development photography must not be treated as final approval.',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const houseOpeningReflection = defineType({
  name: 'houseOpeningReflection',
  title: 'Opening Reflection',
  type: 'object',
  description: 'A short reflection on the house as a home rather than a display object.',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Moves the reader from the opening landscape into the feeling of home.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      description:
        'One restrained reflection grounded in approved owner experience. Do not include private family memories or the private meaning of the Joshua name.',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const houseSharedHeart = defineType({
  name: 'houseSharedHeart',
  title: 'Shared Heart of the House',
  type: 'object',
  description: 'The connected living, dining, kitchen, deck, and outside story.',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Editorial heading for the shared spaces.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 5,
      description:
        'Describe verified everyday use without turning private gatherings into public stories.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description:
        'One or two ordered photographs showing how the shared rooms relate to the deck and outside.',
      of: [defineArrayMember({type: 'editorialImage'})],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(2)
          .custom((images) =>
            hasUniqueAssets(images as EditorialImageValue[] | undefined)
              ? true
              : 'Use each photograph only once in the Shared Heart sequence.',
          ),
    }),
  ],
})

export const houseView = defineType({
  name: 'houseView',
  title: 'The View',
  type: 'object',
  description:
    'The landscape-led pause. Photography and geographical wording require asset-specific verification.',
  groups: [
    {name: 'content', title: 'Public Content', default: true},
    {name: 'verification', title: 'Editorial Verification'},
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      group: 'content',
      description:
        'Verified panoramic view photography. This may remain empty in Draft while the required photograph is missing.',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      group: 'content',
      description:
        'Optional factual context. Name landmarks only after matching them to this specific frame.',
    }),
    defineField({
      name: 'verificationNotes',
      title: 'Verification Notes',
      type: 'text',
      rows: 4,
      group: 'verification',
      description:
        'Studio-only non-sensitive summary of viewpoint and landmark checks. This field must be excluded from frontend queries. Do not store coordinates, private memories, evidence files, or access details here.',
    }),
  ],
})

export const houseStoryImage = defineType({
  name: 'houseStoryImage',
  title: 'House Story Image',
  type: 'object',
  description: 'One image with a controlled role in the indoor/outdoor sequence.',
  fields: [
    defineField({
      name: 'role',
      title: 'Editorial Role',
      type: 'string',
      description: 'Determines the image position in the approved editorial composition.',
      options: {
        list: indoorOutdoorRoles,
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      description:
        'Photography showing a real relationship between the house, threshold, shelter, pool, and landscape.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      role: 'role',
    },
    prepare({media, role}) {
      const roleTitle = indoorOutdoorRoles.find(({value}) => value === role)?.title
      return {
        media,
        title: roleTitle ?? 'House story image',
      }
    },
  },
})

export const houseIndoorOutdoorStory = defineType({
  name: 'houseIndoorOutdoorStory',
  title: 'Indoor Outdoor Story',
  type: 'object',
  description:
    'A controlled sequence about the deck, sliding doors, shelter, pool, landscape, and daily use.',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Frames the lived threshold between the house and landscape.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 5,
      description:
        'Use verified architectural relationships and observed use. Avoid amenity lists and unverified performance claims.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      description:
        'One to three ordered images. Each approved editorial role may appear only once.',
      of: [defineArrayMember({type: 'houseStoryImage'})],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(3)
          .custom((images) => {
            const roles = (images as HouseStoryImageValue[] | undefined)
              ?.map(({role}) => role)
              .filter(Boolean)
            if (!roles) return true
            return new Set(roles).size === roles.length
              ? true
              : 'Each editorial image role may appear only once.'
          }),
    }),
  ],
})

export const houseDailyRhythmMoment = defineType({
  name: 'houseDailyRhythmMoment',
  title: 'Daily Rhythm Moment',
  type: 'object',
  description: 'One optional, observed moment in the life of the house.',
  fields: [
    defineField({
      name: 'body',
      title: 'Observation',
      type: 'text',
      rows: 4,
      description:
        'One real, public-safe observation. Do not invent routines, memories, weather patterns, or guest responses.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      description:
        'Photography made in the relevant light or weather. Record accurate context before publication.',
      validation: (rule) => rule.required(),
    }),
  ],
})

export const houseDailyRhythms = defineType({
  name: 'houseDailyRhythms',
  title: 'Daily Rhythms',
  type: 'object',
  description:
    'Optional Morning, Rain, and Evening moments. Leave any incomplete moment empty rather than adding filler.',
  fields: [
    defineField({
      name: 'morning',
      title: 'Morning',
      type: 'houseDailyRhythmMoment',
      description:
        'Optional observed morning moment. The required production photograph is currently missing.',
      options: {collapsible: true, collapsed: false},
    }),
    defineField({
      name: 'rain',
      title: 'Rain',
      type: 'houseDailyRhythmMoment',
      description:
        'Optional honest account of the house during rainfall. The required production photograph is currently missing.',
      options: {collapsible: true, collapsed: true},
    }),
    defineField({
      name: 'evening',
      title: 'Evening',
      type: 'houseDailyRhythmMoment',
      description: 'Optional observed evening moment across the connected shared spaces.',
      options: {collapsible: true, collapsed: true},
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value) return true
      const rhythms = value as {evening?: unknown; morning?: unknown; rain?: unknown}
      return rhythms.morning || rhythms.rain || rhythms.evening
        ? true
        : 'Add at least one completed moment or remove the Daily Rhythms section.'
    }),
})

export const houseMaterialEntry = defineType({
  name: 'houseMaterialEntry',
  title: 'Verified Material Entry',
  type: 'object',
  description:
    'Public material story added only after its name, application, and wording are verified.',
  fields: [
    defineField({
      name: 'name',
      title: 'Verified Name',
      type: 'string',
      description:
        'Use the confirmed public material or architectural-element name. “Stone detail on cement” is not yet approved terminology.',
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            value?.trim().toLowerCase() === 'stone detail on cement'
              ? 'This terminology is still awaiting verification and cannot be published.'
              : true,
          ),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description:
        'Explain the verified application or lived role without private construction details or unsupported claims.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'editorialImage',
      description: 'Optional verified detail photograph supporting this material story.',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'name',
    },
  },
})

export const houseMaterialsAndArchitecture = defineType({
  name: 'houseMaterialsAndArchitecture',
  title: 'Materials and Architecture',
  type: 'object',
  description: 'A restrained account containing only verified material and architectural entries.',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Introduces the tactile and architectural account.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Introduction',
      type: 'text',
      rows: 4,
      description:
        'Optional context for how verified materials relate to use, weather, and landscape.',
    }),
    defineField({
      name: 'materials',
      title: 'Verified Materials',
      type: 'array',
      description:
        'Only add an entry after its public name, application, and description have been confirmed.',
      of: [defineArrayMember({type: 'houseMaterialEntry'})],
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(6)
          .custom((materials) => {
            const names = (materials as HouseMaterialEntryValue[] | undefined)
              ?.map(({name}) => name?.trim().toLocaleLowerCase())
              .filter(Boolean)
            if (!names) return true
            return new Set(names).size === names.length
              ? true
              : 'Each verified material name may appear only once.'
          }),
    }),
  ],
})

export const houseClosingReflection = defineType({
  name: 'houseClosingReflection',
  title: 'Closing Reflection',
  type: 'object',
  description: 'One quiet, real observation that closes the page without a call to action.',
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      description:
        'Use one approved public-safe observation. Do not invent sentiment or expose a private family memory.',
      validation: (rule) => rule.required(),
    }),
  ],
})
