import {defineField, defineType} from 'sanity'

type FeeInformationValue = {
  amount?: number
  currency?: string
  notes?: string
}

export const feeInformation = defineType({
  name: 'feeInformation',
  title: 'Fee Information',
  type: 'object',
  description: 'Changeable entrance-fee guidance that must be reviewed regularly.',
  fields: [
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      description: 'Current known amount. Use zero only when entry is verified as free.',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      description: 'Three-letter ISO currency code, such as PHP.',
      validation: (rule) => rule.uppercase().regex(/^[A-Z]{3}$/),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 2,
      description: 'Optional qualification for variable, donation-based, or changing fees.',
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const fee = value as FeeInformationValue | undefined
      if (!fee) return true
      if (fee.amount === undefined && !fee.notes?.trim()) {
        return 'Add an amount or explain the fee in Notes.'
      }
      if (fee.amount !== undefined && !fee.currency?.trim()) {
        return 'Add the ISO currency code for this amount.'
      }
      return true
    }),
})
