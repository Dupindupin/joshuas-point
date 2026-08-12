import {
  EditorialContainer,
  EditorialGrid,
  EditorialMedia,
  EditorialText,
  SectionSpacing,
  type EditorialImage,
} from '@/components/editorial'

export type DestinationPhotograph = {
  caption?: string
  credit?: string
  creditUrl?: string
  id: string
  image: EditorialImage
}

type DestinationPhotographyProps = {
  galleryCaption?: string
  galleryLabel?: string
  hero?: DestinationPhotograph
  images?: DestinationPhotograph[]
}

function PhotographCaption({photograph}: {photograph: DestinationPhotograph}) {
  if (!photograph.caption && !photograph.credit) return null

  return (
    <EditorialText as="figcaption" className="mt-4 max-w-md" variant="caption">
      {photograph.caption}
      {photograph.caption && photograph.credit ? ' ' : null}
      {photograph.credit ? (
        <span>
          Photograph:{' '}
          {photograph.creditUrl ? (
            <a
              className="rounded-sm underline decoration-ink/30 underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              href={photograph.creditUrl}
            >
              {photograph.credit}
            </a>
          ) : (
            photograph.credit
          )}
          .
        </span>
      ) : null}
    </EditorialText>
  )
}

export function DestinationPhotography({
  galleryCaption,
  galleryLabel = 'Destination photography',
  hero,
  images = [],
}: DestinationPhotographyProps) {
  if (!hero && images.length === 0) return null

  return (
    <SectionSpacing aria-label={galleryLabel} size="generous">
      <h2 className="sr-only">Photography</h2>

      {hero ? (
        <figure>
          <EditorialMedia image={hero.image} preload ratio="panoramic" sizes="100vw" />
          <EditorialContainer>
            <EditorialGrid>
              <div className="lg:col-span-4 lg:col-start-9">
                <PhotographCaption photograph={hero} />
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </figure>
      ) : null}

      {images.length > 0 ? (
        <EditorialContainer className={hero ? 'mt-24 sm:mt-32 lg:mt-48' : ''}>
          <div className="space-y-24 sm:space-y-32 lg:space-y-48">
            {images.map((photograph, index) => {
              const isEven = index % 2 === 0

              return (
                <figure key={photograph.id}>
                  <EditorialGrid gap="generous">
                    <div
                      className={
                        isEven
                          ? 'lg:col-span-8'
                          : 'lg:col-span-7 lg:col-start-6 lg:row-start-1'
                      }
                    >
                      <EditorialMedia
                        image={photograph.image}
                        ratio={isEven ? 'landscape' : 'portrait'}
                        sizes={isEven ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 58vw, 100vw'}
                        tone={isEven ? 'morning' : 'stone'}
                      />
                      <PhotographCaption photograph={photograph} />
                    </div>
                  </EditorialGrid>
                </figure>
              )
            })}
          </div>

          {galleryCaption ? (
            <EditorialText className="mt-12 max-w-lg lg:ml-auto" variant="caption">
              {galleryCaption}
            </EditorialText>
          ) : null}
        </EditorialContainer>
      ) : null}
    </SectionSpacing>
  )
}
