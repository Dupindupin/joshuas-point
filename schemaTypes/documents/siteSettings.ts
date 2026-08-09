import {defineArrayMember, defineField, defineType} from 'sanity'

type DefaultSeoValue = {
  metaDescription?: string
  metaTitle?: string
}

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description:
    'Global identity, search defaults, contact details, navigation, footer, and booking links.',
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'seo', title: 'SEO'},
    {name: 'contact', title: 'Contact'},
    {name: 'navigation', title: 'Navigation'},
    {name: 'footer', title: 'Footer'},
    {name: 'booking', title: 'Booking'},
  ],
  initialValue: {
    siteTitle: "Joshua's Point",
    defaultLocale: 'en',
  },
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      group: 'identity',
      description: 'The official site title used in metadata and shared contexts.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      group: 'identity',
      description: 'Canonical production origin using HTTPS, without a trailing path.',
      validation: (rule) => rule.required().uri({scheme: ['https']}),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      group: 'identity',
      description:
        'A short factual description that can support metadata and editorial introductions.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'defaultLocale',
      title: 'Default Locale',
      type: 'string',
      group: 'identity',
      description:
        'The current authoring locale. The field prepares the model for future localization.',
      options: {
        list: [{title: 'English', value: 'en'}],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      group: 'seo',
      description:
        'Fallback search title and description used when a page does not provide overrides.',
      validation: (rule) =>
        rule.required().custom((value) => {
          const seoValue = value as DefaultSeoValue | undefined
          if (!seoValue?.metaTitle?.trim()) return 'Add a default meta title.'
          if (!seoValue.metaDescription?.trim()) return 'Add a default meta description.'
          return true
        }),
    }),
    defineField({
      name: 'defaultSocialImage',
      title: 'Default Social Image',
      type: 'editorialImage',
      group: 'seo',
      description: 'Landscape image used when a page does not provide its own social image.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'contactDetails',
      title: 'Contact Details',
      type: 'contactDetails',
      group: 'contact',
      description: 'Public contact details shared across the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'primaryNavigation',
      title: 'Primary Navigation',
      type: 'array',
      group: 'navigation',
      description:
        'Primary navigation items appear in this order. Keep the list deliberately small.',
      of: [defineArrayMember({type: 'navigationItem'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footer',
      group: 'footer',
      description: 'Shared footer content and links.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookingLinks',
      title: 'Booking Links',
      type: 'bookingLinks',
      group: 'booking',
      description: 'Central booking and inquiry destinations.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
    },
  },
})
