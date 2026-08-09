import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react'

import {EditorialText} from './editorial-text'

type EditorialPortableTextProps = {
  value: PortableTextBlock[]
}

const components: PortableTextComponents = {
  block: {
    blockquote: ({children}) => (
      <EditorialText className="my-12" variant="quote">
        {children}
      </EditorialText>
    ),
    h2: ({children}) => (
      <EditorialText as="h2" className="mt-16 mb-8" headingSize="small" variant="heading">
        {children}
      </EditorialText>
    ),
    h3: ({children}) => (
      <EditorialText as="h3" className="mt-12 mb-6" headingSize="small" variant="heading">
        {children}
      </EditorialText>
    ),
    normal: ({children}) => (
      <EditorialText className="mb-7 last:mb-0" variant="body">
        {children}
      </EditorialText>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="mb-8 list-disc space-y-3 pl-6 font-body text-base leading-8 text-charcoal/75 marker:text-charcoal/40 sm:text-lg sm:leading-9">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="mb-8 list-decimal space-y-3 pl-6 font-body text-base leading-8 text-charcoal/75 marker:text-charcoal/50 sm:text-lg sm:leading-9">
        {children}
      </ol>
    ),
  },
}

export function EditorialPortableText({value}: EditorialPortableTextProps) {
  return <PortableText components={components} value={value} />
}
