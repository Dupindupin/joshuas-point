import {defineField, defineType} from 'sanity'

type LinkKind = 'email' | 'external' | 'internal' | 'phone'

type LinkValue = {
  email?: string
  externalUrl?: string
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
          {title: 'External', value: 'external'},
          {title: 'Email', value: 'email'},
          {title: 'Phone', value: 'phone'},
        ],
      },
      validation: (rule) => rule.required(),
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
        'Choose a published page or entry. More destination types will be added with future schemas.',
      to: [{type: 'homePage'}, {type: 'room'}],
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
        external: linkValue.externalUrl,
        email: linkValue.email,
        phone: linkValue.phone,
      }

      return destinationByKind[linkValue.kind] ? true : 'Complete the destination for this link.'
    }),
})
