import {defineArrayMember, defineType} from 'sanity'

export const portableText = defineType({
  name: 'portableText',
  title: 'Editorial Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bulleted', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [defineArrayMember({type: 'link'})],
      },
    }),
    defineArrayMember({type: 'editorialImage'}),
    defineArrayMember({type: 'gallery'}),
    defineArrayMember({type: 'quote'}),
    defineArrayMember({type: 'video'}),
  ],
})
