import type {EditorialImage, EditorialMediaRatio} from './editorial-media'
import {EditorialContainer} from './editorial-container'
import {EditorialMedia} from './editorial-media'
import {EditorialText} from './editorial-text'
import {SectionSpacing} from './section-spacing'

export type MasonryGalleryImage = {
  caption?: string
  credit?: string
  creditUrl?: string
  id: string
  image: EditorialImage
  orientation?: EditorialMediaRatio
}

export type MasonryGalleryData = {
  accessibleLabel: string
  caption?: string
  heading?: string
  images: readonly MasonryGalleryImage[]
}

type MasonryGalleryProps = MasonryGalleryData

type ItemPresentation = {
  className: string
  ratio: EditorialMediaRatio
  sizes: string
}

const itemPresentations: readonly ItemPresentation[] = [
  {
    className: 'md:col-span-4 lg:col-span-7',
    ratio: 'landscape',
    sizes: '(min-width: 1024px) 58vw, (min-width: 768px) 67vw, 100vw',
  },
  {
    className: 'md:col-span-2 lg:col-span-4 lg:col-start-9',
    ratio: 'portrait',
    sizes: '(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw',
  },
  {
    className: 'md:col-span-3 md:col-start-1 lg:col-span-5 lg:col-start-2',
    ratio: 'portrait',
    sizes: '(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw',
  },
  {
    className: 'md:col-span-3 lg:col-span-6 lg:col-start-7',
    ratio: 'landscape',
    sizes: '(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw',
  },
  {
    className: 'md:col-span-2 lg:col-span-4',
    ratio: 'portrait',
    sizes: '(min-width: 1024px) 33vw, (min-width: 768px) 33vw, 100vw',
  },
  {
    className: 'md:col-span-4 lg:col-span-7 lg:col-start-6',
    ratio: 'landscape',
    sizes: '(min-width: 1024px) 58vw, (min-width: 768px) 67vw, 100vw',
  },
]

function normalizeCredit(credit: string | undefined) {
  return credit
    ?.trim()
    .replace(/^(?:photograph(?:y|er)?|photo)(?:\s+by)?\s*:\s*/i, '')
    .trim()
}

function GalleryCaption({item}: {item: MasonryGalleryImage}) {
  const credit = normalizeCredit(item.credit)
  if (!item.caption && !credit) return null

  return (
    <EditorialText as="figcaption" className="mt-4 max-w-md" variant="caption">
      {item.caption}
      {item.caption && credit ? ' ' : null}
      {credit ? (
        <span>
          Photograph:{' '}
          {item.creditUrl ? (
            <a
              className="rounded-sm underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              href={item.creditUrl}
            >
              {credit}
            </a>
          ) : (
            credit
          )}
          .
        </span>
      ) : null}
    </EditorialText>
  )
}

export function MasonryGallery({
  accessibleLabel,
  caption,
  heading,
  images,
  pace = 'standard',
}: MasonryGalleryProps & {pace?: 'compact' | 'standard'}) {
  if (images.length < 2) return null

  return (
    <SectionSpacing
      aria-label={accessibleLabel}
      size={pace === 'compact' ? 'generous' : 'immersive'}
    >
      <EditorialContainer>
        {heading ? (
          <EditorialText as="h2" className="mb-12 sm:mb-16" headingSize="small" variant="heading">
            {heading}
          </EditorialText>
        ) : (
          <h2 className="sr-only">Photography</h2>
        )}
        <div
          className={`grid grid-cols-1 gap-x-8 md:grid-cols-6 lg:grid-cols-12 lg:gap-x-10 ${
            pace === 'compact'
              ? 'gap-y-16 md:gap-y-20 lg:gap-y-24'
              : 'gap-y-20 md:gap-y-24 lg:gap-y-36'
          }`}
        >
          {images.map((item, index) => {
            const presentation = itemPresentations[index % itemPresentations.length]

            return (
              <figure className={presentation.className} key={item.id}>
                <EditorialMedia
                  image={item.image}
                  ratio={item.orientation ?? presentation.ratio}
                  sizes={presentation.sizes}
                  tone={index % 2 === 0 ? 'morning' : 'stone'}
                />
                <GalleryCaption item={item} />
              </figure>
            )
          })}
        </div>

        {caption ? (
          <EditorialText className="mt-16 max-w-lg md:ml-auto lg:mt-24" variant="caption">
            {caption}
          </EditorialText>
        ) : null}
      </EditorialContainer>
    </SectionSpacing>
  )
}
