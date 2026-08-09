import {defineField, defineType} from 'sanity'

export const scooterGuide = defineType({
  name: 'scooterGuide',
  title: 'Scooter Guide',
  type: 'object',
  description:
    'Locally reviewed journey guidance. It is not navigation or a guarantee of road conditions.',
  fields: [
    defineField({
      name: 'roadQuality',
      title: 'Road Quality',
      type: 'string',
      description: 'Current overall road-surface assessment.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Paved', value: 'paved'},
          {title: 'Mixed Surface', value: 'mixed'},
          {title: 'Rough Sections', value: 'rough'},
          {title: 'Condition Variable', value: 'variable'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Scooter Difficulty',
      type: 'string',
      description: 'Assessment of the route for a guest riding a scooter.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Easy', value: 'easy'},
          {title: 'Moderate', value: 'moderate'},
          {title: 'Demanding', value: 'demanding'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parking',
      title: 'Parking',
      type: 'text',
      rows: 2,
      description: 'Where parking is normally possible and any access consideration.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fuel',
      title: 'Fuel',
      type: 'text',
      rows: 2,
      description: 'Reliable fuel guidance without promising availability.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'routeNotes',
      title: 'Route Notes',
      type: 'text',
      rows: 4,
      description: 'Concise notes about difficult sections, junctions, crossings, or final access.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastReviewedAt',
      title: 'Route Last Reviewed At',
      type: 'date',
      description: 'Date this scooter guidance was last checked locally.',
      validation: (rule) => rule.required(),
    }),
  ],
})
