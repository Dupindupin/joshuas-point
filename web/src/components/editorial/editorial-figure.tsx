import type {ComponentProps, ReactNode} from 'react'

import {
  EditorialContainer,
  type EditorialContainerSize,
} from '@/components/editorial/editorial-container'
import {EditorialMedia} from '@/components/editorial/editorial-media'
import {EditorialText, type EditorialTextTone} from '@/components/editorial/editorial-text'

export type EditorialFigureMedia = ComponentProps<typeof EditorialMedia>
export type EditorialFigureCaptionContainer = EditorialContainerSize | false
export type EditorialFigureCaptionAlignment = 'end' | 'start'

export type EditorialFigureProps = {
  caption?: ReactNode
  captionAlignment?: EditorialFigureCaptionAlignment
  captionClassName?: string
  captionContainer?: EditorialFigureCaptionContainer
  captionTone?: EditorialTextTone
  className?: string
  media: EditorialFigureMedia
}

export function EditorialFigure({
  caption,
  captionAlignment = 'start',
  captionClassName = '',
  captionContainer = false,
  captionTone = 'default',
  className = '',
  media,
}: EditorialFigureProps) {
  const captionElement = caption ? (
    <EditorialText
      as="figcaption"
      className={`mt-4 max-w-sm ${captionAlignment === 'end' ? 'ml-auto' : ''} ${captionClassName}`}
      tone={captionTone}
      variant="caption"
    >
      {caption}
    </EditorialText>
  ) : null

  return (
    <figure className={className}>
      <EditorialMedia {...media} />
      {captionElement && captionContainer ? (
        <EditorialContainer size={captionContainer}>{captionElement}</EditorialContainer>
      ) : (
        captionElement
      )}
    </figure>
  )
}
