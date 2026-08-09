import {defineField, defineType} from 'sanity'

type VideoSourceType = 'external' | 'file'

type VideoValue = {
  externalUrl?: string
  file?: {asset?: {_ref?: string}}
  sourceType?: VideoSourceType
}

const sourceType = (parent: unknown) => (parent as VideoValue | undefined)?.sourceType

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  description: 'Editorial video with the accessibility information needed for publication.',
  fields: [
    defineField({
      name: 'sourceType',
      title: 'Source Type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'Uploaded File', value: 'file'},
          {title: 'External URL', value: 'external'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Video File',
      type: 'file',
      description: 'Upload the video file.',
      hidden: ({parent}) => sourceType(parent) !== 'file',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Video URL',
      type: 'url',
      description: 'Complete URL for a supported external video.',
      hidden: ({parent}) => sourceType(parent) !== 'external',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'editorialImage',
      description: 'Still image shown before the video plays.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Accessible Title',
      type: 'string',
      description: 'A concise title describing the video.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
      description: 'Optional visible context shown with the video.',
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'text',
      rows: 8,
      description: 'Provide the spoken words and meaningful sounds conveyed by the video.',
      validation: (rule) => rule.required(),
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const videoValue = value as VideoValue | undefined
      if (!videoValue) return true
      if (videoValue.sourceType === 'file' && !videoValue.file?.asset?._ref)
        return 'Upload a video file.'
      if (videoValue.sourceType === 'external' && !videoValue.externalUrl)
        return 'Enter an external video URL.'
      return videoValue.sourceType ? true : 'Choose a video source type.'
    }),
})
