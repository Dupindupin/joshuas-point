import {defineField} from 'sanity'

export const defineInternalTitleField = () =>
  defineField({
    name: 'internalTitle',
    title: 'Internal Title',
    type: 'string',
    group: 'governance',
    description: 'Studio-only title used to identify this document. It may match the public title.',
    validation: (rule) => rule.required(),
  })

export const defineWorkflowStatusField = () =>
  defineField({
    name: 'workflowStatus',
    title: 'Workflow Status',
    type: 'string',
    group: 'governance',
    description: 'Tracks editorial readiness. Publishing remains a separate Sanity action.',
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
    description: 'Optional overrides. Empty values inherit the defaults from Site Settings.',
  })

export const defineLastReviewedAtField = ({required = false}: {required?: boolean} = {}) =>
  defineField({
    name: 'lastReviewedAt',
    title: 'Last Reviewed At',
    type: 'datetime',
    group: 'governance',
    description: required
      ? 'Date of the most recent material factual review. Required because this content contains changeable guidance.'
      : 'Optional date of the most recent material factual review. This is not displayed publicly.',
    validation: required ? (rule) => rule.required() : undefined,
  })
