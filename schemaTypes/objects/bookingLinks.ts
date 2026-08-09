import {defineField, defineType} from 'sanity'

type BookingLinksValue = {
  enabled?: boolean
  primary?: unknown
}

export const bookingLinks = defineType({
  name: 'bookingLinks',
  title: 'Booking Links',
  type: 'object',
  description: 'Central booking destinations used across the website.',
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Disable to hide booking links without deleting their configuration.',
      initialValue: false,
    }),
    defineField({
      name: 'primary',
      title: 'Primary Booking Link',
      type: 'link',
      description: 'Required whenever booking links are enabled.',
    }),
    defineField({
      name: 'inquiry',
      title: 'Inquiry Link',
      type: 'link',
      description: 'Optional contact or inquiry destination.',
    }),
    defineField({
      name: 'disclosure',
      title: 'Disclosure',
      type: 'text',
      rows: 2,
      description: 'Optional note explaining that booking continues on an external service.',
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const booking = value as BookingLinksValue | undefined
      if (!booking?.enabled) return true
      return booking.primary ? true : 'Add a primary booking link when booking links are enabled.'
    }),
})
