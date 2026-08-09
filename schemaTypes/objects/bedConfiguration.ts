import {defineField, defineType} from 'sanity'

export const bedConfiguration = defineType({
  name: 'bedConfiguration',
  title: 'Bed Configuration',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Bed Type',
      type: 'string',
      description: 'Choose the factual bed type.',
      options: {
        list: [
          {title: 'King', value: 'king'},
          {title: 'Queen', value: 'queen'},
          {title: 'Double', value: 'double'},
          {title: 'Single', value: 'single'},
          {title: 'Bunk', value: 'bunk'},
          {title: 'Sofa Bed', value: 'sofaBed'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      description: 'Number of beds of this type.',
      validation: (rule) => rule.required().integer().greaterThan(0),
    }),
    defineField({
      name: 'roomLabel',
      title: 'Room Label',
      type: 'string',
      description: 'Optional location such as “Main bedroom”.',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 2,
      description: 'Optional operational clarification, not promotional copy.',
    }),
  ],
  preview: {
    select: {
      title: 'type',
    },
  },
})
