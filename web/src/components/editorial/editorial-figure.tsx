import type {ComponentProps, ReactNode} from 'react'

import {
  EditorialContainer,
  type EditorialContainerSize,
} from '@/components/editorial/editorial-container'
import {EditorialMedia} from '@/components/editorial/editorial-media'
import {EditorialText, type EditorialTextTone} from '@/components/editorial/editorial-text'
import {
  MotionReveal,
  type MotionRevealDelay,
  type MotionRevealDirection,
} from '@/components/motion'

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
  motionDelay?: MotionRevealDelay
  motionDirection?: MotionRevealDirection
}

export function EditorialFigure({
  caption,
  captionAlignment = 'start',
  captionClassName = '',
  captionContainer = false,
  captionTone = 'default',
  className = '',
  media,
  motionDelay = 'none',
  motionDirection = 'up',
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
    <MotionReveal
      as="figure"
      className={className}
      delay={motionDelay}
      direction={motionDirection}
    >
      <EditorialMedia {...media} />
      {captionElement && captionContainer ? (
        <EditorialContainer size={captionContainer}>{captionElement}</EditorialContainer>
      ) : (
        captionElement
      )}
    </MotionReveal>
  )
}
