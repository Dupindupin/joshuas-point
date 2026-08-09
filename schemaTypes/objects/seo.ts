import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description: 'Optional search and social overrides. Empty values inherit the site defaults.',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Optional search title. Keep it concise and specific to this page.',
      validation: (rule) =>
        rule.max(60).warning('Search titles are usually clearest at 60 characters or fewer.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Write one natural summary of this specific page. Describe its value plainly; do not list keywords or repeat the title.',
      validation: (rule) =>
        rule
          .max(160)
          .warning('Search descriptions are usually clearest at 160 characters or fewer.'),
    }),
    defineField({
      name: 'socialTitle',
      title: 'Social Title',
      type: 'string',
      description: 'Optional title used when this page is shared.',
    }),
    defineField({
      name: 'socialDescription',
      title: 'Social Description',
      type: 'text',
      rows: 3,
      description: 'Optional description used when this page is shared.',
    }),
    defineField({
      name: 'socialImage',
      title: 'Social Image',
      type: 'editorialImage',
      description: 'Optional page-specific sharing image. The site default is used when empty.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide From Search Engines',
      type: 'boolean',
      description: 'Enable only when this page should not appear in search results.',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Use only when this content intentionally duplicates a page at another URL.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
})
