import {defineField, defineType} from 'sanity'

const categoryOptions = [
  {title: 'Bathing', value: 'bathing'},
  {title: 'Climate', value: 'climate'},
  {title: 'Connectivity', value: 'connectivity'},
  {title: 'Cooking', value: 'cooking'},
  {title: 'Energy', value: 'energy'},
  {title: 'Entertainment', value: 'entertainment'},
  {title: 'Outdoor Living', value: 'outdoorLiving'},
  {title: 'Parking', value: 'parking'},
  {title: 'Service', value: 'service'},
  {title: 'Shared Living', value: 'sharedLiving'},
  {title: 'Stay Arrangement', value: 'stayArrangement'},
  {title: 'Transport', value: 'transport'},
  {title: 'Water', value: 'water'},
] as const

export const amenity = defineType({
  name: 'amenity',
  title: 'Amenity',
  type: 'document',
  description:
    'A verified accommodation detail that can be reused without turning the website into a feature catalogue.',
  initialValue: {
    active: true,
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Concise internal and public-facing name.',
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'internalKey',
      title: 'Internal Key',
      type: 'string',
      description:
        'Stable lowercase key used by frontend presentation. Do not change it after the amenity is in use.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            name: 'lowercase hyphenated key',
          })
          .custom(async (value, context) => {
            if (!value) return true
            const currentId = context.document?._id?.replace(/^drafts\./, '')
            if (!currentId) return true
            const duplicateCount = await context
              .getClient({apiVersion: '2026-08-11'})
              .fetch<number>(
                'count(*[_type == "amenity" && internalKey == $key && !(_id in [$publishedId, $draftId])])',
                {
                  draftId: `drafts.${currentId}`,
                  key: value,
                  publishedId: currentId,
                },
              )
            return duplicateCount === 0 ? true : 'Internal key must be unique.'
          }),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Small editorial grouping used for organization, not a public hotel taxonomy.',
      options: {list: [...categoryOptions], layout: 'dropdown'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Public Description',
      type: 'text',
      rows: 3,
      description:
        'One factual, public-safe sentence. Avoid promises, promotional adjectives, and unsupported performance claims.',
      validation: (rule) => rule.required().min(10).max(220),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description:
        'Turn off an outdated amenity without deleting references. Only active amenities may appear publicly.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      active: 'active',
      category: 'category',
      title: 'name',
    },
    prepare({active, category, title}) {
      const categoryTitle =
        categoryOptions.find((option) => option.value === category)?.title ?? 'Uncategorised'
      return {
        subtitle: `${categoryTitle} · ${active ? 'Active' : 'Inactive'}`,
        title: title || 'Untitled amenity',
      }
    },
  },
})
