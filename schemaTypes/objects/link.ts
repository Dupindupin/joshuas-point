import {defineField, defineType} from 'sanity'

type LinkKind = 'email' | 'external' | 'internal' | 'route' | 'phone'

type LinkValue = {
  email?: string
  externalUrl?: string
  internalRoute?: string
  kind?: LinkKind
  phone?: string
  reference?: {_ref?: string}
}

const parentKind = (parent: unknown) => (parent as LinkValue | undefined)?.kind

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  description: 'A reusable destination. Only fields relevant to the selected link type are shown.',
  fields: [
    defineField({
      name: 'kind',
      title: 'Link Type',
      type: 'string',
      description: 'Choose how this link should resolve.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'Website Route', value: 'route'},
          {title: 'External', value: 'external'},
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'phone'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'internalRoute',
      title: 'Website Route',
      type: 'string',
      description:
        'Choose an existing public website page that is not represented by a Sanity document.',
      options: {
        list: [
          {title: 'Home', value: '/'},
          {title: 'The House', value: '/the-house'},
          {title: 'Rooms', value: '/rooms'},
          {title: 'Destinations', value: '/destinations'},
          {title: 'Explorer Map', value: '/explorer'},
          {title: 'Scenic Routes', value: '/scenic-routes'},
          {title: 'Southern Negros Guide', value: '/guide'},
          {title: 'Dive Guide', value: '/dive-sites'},
          {title: 'Getting Here', value: '/getting-here'},
          {title: 'Plan Your Stay', value: '/plan-your-stay'},
          {title: 'FAQ', value: '/faq'},
          {title: 'Contact', value: '/contact'},
          {title: 'Privacy', value: '/privacy'},
          {title: 'Terms', value: '/terms'},
        ],
      },
      hidden: ({parent}) => parentKind(parent) !== 'route',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (parentKind(context.parent) !== 'route') return true
          return value ? true : 'Choose a website route.'
        }),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Use concise text that makes the destination clear without surrounding context.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reference',
      title: 'Internal Destination',
      type: 'reference',
      description:
        'Choose an intentional published destination. Only routes supported by the current frontend are available.',
      to: [
        {type: 'homePage'},
        {type: 'housePage'},
        {type: 'destinationsPage'},
        {type: 'destination'},
        {type: 'diveSitesPage'},
        {type: 'diveSite'},
        {type: 'scenicRoutesPage'},
        {type: 'scenicRoute'},
        {type: 'roomsPage'},
        {type: 'room'},
      ],
      hidden: ({parent}) => parentKind(parent) !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (parentKind(context.parent) !== 'internal') return true
          return value ? true : 'Choose an internal destination.'
        }),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Enter the complete HTTPS address.',
      hidden: ({parent}) => parentKind(parent) !== 'external',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).custom((value, context) => {
          if (parentKind(context.parent) !== 'external') return true
          return value ? true : 'Enter an external URL.'
        }),
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Enter the destination email address without a mailto prefix.',
      hidden: ({parent}) => parentKind(parent) !== 'email',
      validation: (rule) =>
        rule.email().custom((value, context) => {
          if (parentKind(context.parent) !== 'email') return true
          return value ? true : 'Enter an email address.'
        }),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description:
        'Use an international number beginning with +. The frontend will create the tel link.',
      hidden: ({parent}) => parentKind(parent) !== 'phone',
      validation: (rule) =>
        rule
          .regex(/^\+[1-9]\d{7,14}$/, {
            name: 'international phone number',
            invert: false,
          })
          .custom((value, context) => {
            if (parentKind(context.parent) !== 'phone') return true
            return value ? true : 'Enter an international phone number.'
          }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'Available for external destinations only.',
      initialValue: false,
      hidden: ({parent}) => parentKind(parent) !== 'external',
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const linkValue = value as LinkValue | undefined
      if (!linkValue) return true
      if (!linkValue?.kind) return 'Choose a link type.'

      const destinationByKind: Record<LinkKind, unknown> = {
        internal: linkValue.reference,
        route: linkValue.internalRoute,
        external: linkValue.externalUrl,
        email: linkValue.email,
        phone: linkValue.phone,
      }

      return destinationByKind[linkValue.kind] ? true : 'Complete the destination for this link.'
    }),
})
