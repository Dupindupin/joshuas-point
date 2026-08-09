import {defineArrayMember, defineField, defineType} from 'sanity'

export const travelInformation = defineType({
  name: 'travelInformation',
  title: 'Travel Information',
  type: 'object',
  description: 'Reviewed practical guidance supporting an independent visit.',
  fields: [
    defineField({
      name: 'travelTimeFromJoshuaPoint',
      title: "Travel Time From Joshua's Point",
      type: 'travelTime',
      description: 'Approximate journey duration from the property.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'recommendedTransport',
      title: 'Recommended Transport',
      type: 'array',
      description: 'Select every genuinely suitable way to reach this destination.',
      of: [
        defineArrayMember({
          type: 'string',
          options: {
            list: [
              {title: 'Scooter', value: 'scooter'},
              {title: 'Car', value: 'car'},
              {title: 'Hired Driver', value: 'hiredDriver'},
              {title: 'Boat', value: 'boat'},
              {title: 'Walking', value: 'walking'},
              {title: 'Public Transport', value: 'publicTransport'},
            ],
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: 'difficulty',
      title: 'Visitor Difficulty',
      type: 'string',
      description: 'Overall access difficulty from a visitor’s perspective, not a challenge badge.',
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
      name: 'bestTimeToVisit',
      title: 'Best Time to Visit',
      type: 'text',
      rows: 3,
      description: 'Qualified seasonal or time-of-day guidance acknowledging natural variation.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'entranceFee',
      title: 'Entrance Fee',
      type: 'feeInformation',
      description: 'Optional current fee guidance.',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'openingInformation',
      description: 'Optional current access hours.',
    }),
  ],
})
