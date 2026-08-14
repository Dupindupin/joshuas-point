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
    {name: 'email', title: 'Email Content'},
    {name: 'location', title: 'Location'},
    {name: 'navigation', title: 'Navigation'},
    {name: 'footer', title: 'Footer'},
    {name: 'social', title: 'Social Presence'},
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
      name: 'primaryLogo',
      title: 'Primary Logo',
      type: 'editorialImage',
      group: 'identity',
      description:
        'Approved horizontal Joshua’s Point logo. Upload the production PNG from the brand asset package without changing its artwork, colour, or proportions.',
    }),
    defineField({
      name: 'compactLogo',
      title: 'Compact Logo Mark',
      type: 'editorialImage',
      group: 'identity',
      description:
        'Approved square JP signature mark for compact identity and structured data. Upload the production application icon or social-profile asset.',
    }),
    defineField({
      name: 'faviconImage',
      title: 'Favicon Reference',
      type: 'editorialImage',
      group: 'identity',
      description:
        'Approved compact JP mark used as the source reference for future browser icon exports. Do not upload redesigned artwork here.',
    }),
    defineField({
      name: 'appIconImage',
      title: 'App Icon Reference',
      type: 'editorialImage',
      group: 'identity',
      description:
        'Approved square application icon used as the source reference for touch and application icons.',
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
      description:
        'Approved 1200 × 630 landscape image used by Open Graph and Twitter/X when a page does not provide its own social image.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'squareProfileImage',
      title: 'Square Profile Image',
      type: 'editorialImage',
      group: 'social',
      description:
        'Owner-approved square Joshua’s Point identity image used to keep official social profiles consistent. Account platforms may crop it to a circle.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'instagramHighlights',
      title: 'Home Instagram Selection',
      type: 'array',
      group: 'social',
      description:
        'Optional editorial selection for the Home page. Add no more than three approved posts; leave empty for a quiet Instagram profile link instead.',
      of: [defineArrayMember({type: 'instagramPost'})],
      validation: (rule) => rule.max(3),
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
      name: 'emailContent',
      title: 'Email Content',
      type: 'object',
      group: 'email',
      description:
        'Short, approved wording reused by Joshua’s Point emails. Contact details, social links, logos, and identity continue to come from their existing Site Settings fields.',
      fields: [
        defineField({
          name: 'subscriptionWelcomeText',
          title: 'Subscription Welcome Text',
          type: 'text',
          rows: 4,
          description:
            'A short welcome paragraph for people who have confirmed Joshua’s Point updates. Plain text only; do not add HTML, links, or placeholders.',
          validation: (rule) =>
            rule
              .max(600)
              .custom((value) =>
                !value || !/[<>]/.test(value)
                  ? true
                  : 'Use plain text without HTML or angle brackets.',
              ),
        }),
        defineField({
          name: 'transactionalFooterText',
          title: 'Transactional Footer Text',
          type: 'text',
          rows: 3,
          description:
            'A short closing line for enquiry and other transactional emails. Plain text only; contact details remain managed separately.',
          validation: (rule) =>
            rule
              .max(240)
              .custom((value) =>
                !value || !/[<>]/.test(value)
                  ? true
                  : 'Use plain text without HTML or angle brackets.',
              ),
        }),
        defineField({
          name: 'updatesFooterText',
          title: 'Updates Footer Text',
          type: 'text',
          rows: 3,
          description:
            'An optional closing line for subscription and update emails. This does not replace Resend unsubscribe handling.',
          validation: (rule) =>
            rule
              .max(240)
              .custom((value) =>
                !value || !/[<>]/.test(value)
                  ? true
                  : 'Use plain text without HTML or angle brackets.',
              ),
        }),
        defineField({
          name: 'responseTimeText',
          title: 'Response-Time Text',
          type: 'text',
          rows: 3,
          description:
            'Owner-approved wording about when guests can normally expect a reply. Leave empty until the timing is confirmed.',
          validation: (rule) =>
            rule
              .max(240)
              .custom((value) =>
                !value || !/[<>]/.test(value)
                  ? true
                  : 'Use plain text without HTML or angle brackets.',
              ),
        }),
      ],
    }),
    defineField({
      name: 'propertyLocation',
      title: "Joshua's Point Location",
      type: 'mapLocation',
      group: 'location',
      description: 'Verified property location used as the origin for destination travel guidance.',
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
