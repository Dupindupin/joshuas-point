import {EditorialContainer} from './editorial-container'
import {EditorialFigure} from './editorial-figure'
import {EditorialGrid} from './editorial-grid'
import type {EditorialImage, EditorialMediaRatio} from './editorial-media'
import {SectionSpacing} from './section-spacing'
import {EditorialText} from './editorial-text'

export type EditorialPhotoStoryPhase = 'closing' | 'detail' | 'journey' | 'opening'

export type EditorialPhotoStoryFrame = {
  caption?: string
  credit?: string
  creditUrl?: string
  id: string
  image: EditorialImage
  phase: EditorialPhotoStoryPhase
}

export type EditorialPhotoStoryData = {
  accessibleLabel: string
  id: string
  introduction?: string
  frames: EditorialPhotoStoryFrame[]
  title: string
}

function getFramePresentation(phase: EditorialPhotoStoryPhase, index: number) {
  if (phase === 'opening') {
    return {container: false as const, ratio: 'panoramic' as EditorialMediaRatio, sizes: '100vw'}
  }
  if (phase === 'closing') {
    return {
      container: 'wide' as const,
      ratio: 'panoramic' as EditorialMediaRatio,
      sizes: '(min-width: 1024px) 88vw, 100vw',
    }
  }
  if (phase === 'detail') {
    return {
      container: 'reading' as const,
      ratio: 'portrait' as EditorialMediaRatio,
      sizes: '(min-width: 1024px) 52vw, 100vw',
    }
  }
  return {
    container: index % 2 === 0 ? ('wide' as const) : ('reading' as const),
    ratio: 'landscape' as EditorialMediaRatio,
    sizes: '(min-width: 1024px) 72vw, 100vw',
  }
}

function normalizeCredit(credit: string | undefined) {
  return credit
    ?.trim()
    .replace(/^(?:photograph(?:y|er)?|photo)(?:\s+by)?\s*:\s*/i, '')
    .trim()
}

function FrameCaption({frame}: {frame: EditorialPhotoStoryFrame}) {
  const credit = normalizeCredit(frame.credit)
  if (!frame.caption && !credit) return null

  return (
    <span>
      {frame.caption}
      {frame.caption && credit ? ' ' : null}
      {credit ? (
        <span>
          Photograph:{' '}
          {frame.creditUrl ? (
            <a
              className="rounded-sm underline decoration-ink/30 underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              href={frame.creditUrl}
            >
              {credit}
            </a>
          ) : (
            credit
          )}
          .
        </span>
      ) : null}
    </span>
  )
}

export function EditorialPhotoStory({story}: {story: EditorialPhotoStoryData}) {
  if (story.frames.length < 2) return null

  return (
    <section aria-labelledby={`${story.id}-title`} aria-label={story.accessibleLabel}>
      <EditorialContainer>
        <EditorialGrid gap="generous">
          <EditorialText className="lg:col-span-2" variant="eyebrow">
            Photo story
          </EditorialText>
          <div className="lg:col-span-7 lg:col-start-4">
            <EditorialText as="h2" headingSize="medium" id={`${story.id}-title`} variant="heading">
              {story.title}
            </EditorialText>
            {story.introduction ? (
              <EditorialText className="mt-8 max-w-2xl" variant="body">
                {story.introduction}
              </EditorialText>
            ) : null}
          </div>
        </EditorialGrid>
      </EditorialContainer>

      <div className="mt-16 space-y-24 sm:mt-24 sm:space-y-32 lg:space-y-48">
        {story.frames.map((frame, index) => {
          const presentation = getFramePresentation(frame.phase, index)
          const figure = (
            <EditorialFigure
              caption={<FrameCaption frame={frame} />}
              captionAlignment={frame.phase === 'closing' ? 'end' : 'start'}
              captionContainer={presentation.container ? false : 'wide'}
              media={{
                image: frame.image,
                ratio: presentation.ratio,
                sizes: presentation.sizes,
                tone: frame.phase === 'detail' ? 'stone' : 'morning',
              }}
            />
          )

          return presentation.container ? (
            <EditorialContainer key={frame.id} size={presentation.container}>
              {figure}
            </EditorialContainer>
          ) : (
            <div key={frame.id}>{figure}</div>
          )
        })}
      </div>
    </section>
  )
}

export function EditorialPhotoStories({
  pace = 'standard',
  stories,
}: {
  pace?: 'compact' | 'standard'
  stories: EditorialPhotoStoryData[]
}) {
  const visibleStories = stories.filter((story) => story.frames.length >= 2)
  if (visibleStories.length === 0) return null

  return (
    <SectionSpacing
      aria-label="Editorial photo stories"
      size={pace === 'compact' ? 'generous' : 'immersive'}
    >
      <div
        className={
          pace === 'compact'
            ? 'space-y-24 sm:space-y-32 lg:space-y-40'
            : 'space-y-32 sm:space-y-44 lg:space-y-56'
        }
      >
        {visibleStories.map((story) => (
          <div
            className={
              pace === 'compact'
                ? '[&_section>div:last-child]:!mt-14 [&_section>div:last-child]:!space-y-20 sm:[&_section>div:last-child]:!mt-20 sm:[&_section>div:last-child]:!space-y-24 lg:[&_section>div:last-child]:!space-y-32'
                : undefined
            }
            key={story.id}
          >
            <EditorialPhotoStory story={story} />
          </div>
        ))}
      </div>
    </SectionSpacing>
  )
}
