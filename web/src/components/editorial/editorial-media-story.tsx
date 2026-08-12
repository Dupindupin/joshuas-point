import type {HTMLAttributes, ReactNode} from 'react'

import {
  EditorialFigure,
  type EditorialFigureCaptionAlignment,
  type EditorialFigureMedia,
} from '@/components/editorial/editorial-figure'
import {EditorialContainer} from '@/components/editorial/editorial-container'
import {EditorialGrid} from '@/components/editorial/editorial-grid'
import {EditorialText, type EditorialTextTone} from '@/components/editorial/editorial-text'
import {SectionSpacing, type SectionSpacingSize} from '@/components/editorial/section-spacing'
import {MotionReveal} from '@/components/motion'

export type EditorialMediaStoryPosition = 'end' | 'start'

type EditorialMediaStoryProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  body: ReactNode
  caption?: ReactNode
  captionAlignment?: EditorialFigureCaptionAlignment
  eyebrow?: ReactNode
  heading: ReactNode
  headingId: string
  media: EditorialFigureMedia
  mediaPosition?: EditorialMediaStoryPosition
  spacing?: SectionSpacingSize
  tone?: EditorialTextTone
}

const mediaPositionClasses: Record<EditorialMediaStoryPosition, string> = {
  start: 'lg:col-span-7 lg:row-span-2',
  end: 'lg:col-span-7 lg:col-start-6 lg:row-span-2',
}

const textPositionClasses: Record<EditorialMediaStoryPosition, string> = {
  start: 'lg:col-span-4 lg:col-start-9',
  end: 'lg:col-span-4 lg:col-start-1 lg:row-start-1',
}

export function EditorialMediaStory({
  body,
  caption,
  captionAlignment,
  className = '',
  eyebrow,
  heading,
  headingId,
  media,
  mediaPosition = 'start',
  spacing = 'generous',
  tone = 'default',
  ...props
}: EditorialMediaStoryProps) {
  return (
    <SectionSpacing aria-labelledby={headingId} className={className} size={spacing} {...props}>
      <EditorialContainer>
        <EditorialGrid className="items-start" gap="generous">
          <EditorialFigure
            caption={caption}
            captionAlignment={captionAlignment}
            captionTone={tone}
            className={mediaPositionClasses[mediaPosition]}
            media={media}
          />

          <MotionReveal
            className={`max-w-xl lg:pt-24 ${textPositionClasses[mediaPosition]}`}
            delay="short"
            direction={mediaPosition === 'start' ? 'left' : 'right'}
          >
            {eyebrow ? (
              <EditorialText tone={tone} variant="eyebrow">
                {eyebrow}
              </EditorialText>
            ) : null}
            <EditorialText
              className={eyebrow ? 'mt-7' : ''}
              headingSize="medium"
              id={headingId}
              tone={tone}
              variant="heading"
            >
              {heading}
            </EditorialText>
            <div className="mt-10 sm:mt-12">{body}</div>
          </MotionReveal>
        </EditorialGrid>
      </EditorialContainer>
    </SectionSpacing>
  )
}
