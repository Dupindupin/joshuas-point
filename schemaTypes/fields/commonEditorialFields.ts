import {defineField} from 'sanity'

export const defineInternalTitleField = () =>
  defineField({
    name: 'internalTitle',
    title: 'Internal Title',
    type: 'string',
    group: 'governance',
    description:
      'Studio-only working title used to distinguish this document in editorial views. It may match the public title.',
    validation: (rule) => rule.required(),
  })

export const defineWorkflowStatusField = () =>
  defineField({
    name: 'workflowStatus',
    title: 'Workflow Status',
    type: 'string',
    group: 'governance',
    description:
      'Draft means work is in progress; In Review requests an editor’s attention; Approved means review is complete. Publishing remains a separate Sanity action.',
    options: {
      layout: 'radio',
      list: [
        {title: 'Draft', value: 'draft'},
        {title: 'In Review', value: 'inReview'},
        {title: 'Approved', value: 'approved'},
      ],
    },
    validation: (rule) => rule.required(),
  })

export const defineSeoField = () =>
  defineField({
    name: 'seo',
    title: 'SEO',
    type: 'seo',
    group: 'seo',
    description:
      'Page-specific search and sharing details. Empty values inherit the defaults from Site Settings, but editorial pages should normally include their own description.',
    options: {collapsible: true, collapsed: false},
  })

export const defineLastReviewedAtField = ({required = false}: {required?: boolean} = {}) =>
  defineField({
    name: 'lastReviewedAt',
    title: 'Last Reviewed At',
    type: 'datetime',
    group: 'governance',
    description: required
      ? 'Set this only after the changeable facts have been materially rechecked. Required because this content contains practical guidance.'
      : 'Set this only after a material factual review—not after a copy edit or simply opening the document.',
    validation: required ? (rule) => rule.required() : undefined,
  })
