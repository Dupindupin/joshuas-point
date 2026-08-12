import {
  EditorialContainer,
  EditorialFigure,
  EditorialGrid,
  EditorialMedia,
  EditorialText,
  SectionSpacing,
  type EditorialImage,
} from '@/components/editorial'

export type PremiumPhotoEssayItem = {
  caption: string
  image?: EditorialImage
  objectPosition?: string
  role: string
}

export type PremiumPhotoEssayData = {
  introduction: string
  items: readonly PremiumPhotoEssayItem[]
  title: string
}

type PremiumPhotoEssayProps = PremiumPhotoEssayData & {
  essayNumber: number
}

export function PremiumPhotoEssay({
  essayNumber,
  introduction,
  items,
  title,
}: PremiumPhotoEssayProps) {
  return (
    <section aria-labelledby={`premium-photo-essay-${essayNumber}`}>
      <EditorialContainer>
        <EditorialGrid gap="generous">
          <div className="lg:col-span-3">
            <EditorialText variant="eyebrow">
              Photo essay {String(essayNumber).padStart(2, '0')}
            </EditorialText>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <EditorialText
              as="h3"
              headingSize="medium"
              id={`premium-photo-essay-${essayNumber}`}
              variant="heading"
            >
              {title}
            </EditorialText>
            <EditorialText className="mt-8 max-w-2xl" variant="body">
              {introduction}
            </EditorialText>
          </div>
        </EditorialGrid>
      </EditorialContainer>

      <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28">
        {items.map((item, index) => (
          <div key={`${item.role}-${index}`}>
            {item.image ? (
              <EditorialFigure
                caption={item.caption}
                captionContainer="wide"
                media={{
                  image: item.image,
                  objectPosition: item.objectPosition,
                  ratio: index % 3 === 1 ? 'portrait' : 'panoramic',
                  sizes: index % 3 === 1 ? '(min-width: 1024px) 54vw, 100vw' : '100vw',
                  tone: 'stone',
                }}
              />
            ) : (
              <EditorialContainer size={index % 2 === 0 ? 'wide' : 'reading'}>
                <figure>
                  <EditorialMedia ratio={index % 3 === 1 ? 'portrait' : 'landscape'} tone="stone" />
                  <figcaption className="mt-5 border-l border-accent/45 pl-5">
                    <EditorialText variant="eyebrow">Photography reserved</EditorialText>
                    <EditorialText className="mt-3" variant="caption">
                      {item.role}. {item.caption}
                    </EditorialText>
                  </figcaption>
                </figure>
              </EditorialContainer>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export function PremiumPhotoEssays({essays}: {essays: readonly PremiumPhotoEssayData[]}) {
  if (essays.length === 0) return null

  return (
    <SectionSpacing aria-label="Editorial photography essays" size="immersive">
      <div className="space-y-32 sm:space-y-44">
        {essays.map((essay, index) => (
          <PremiumPhotoEssay essayNumber={index + 1} key={essay.title} {...essay} />
        ))}
      </div>
    </SectionSpacing>
  )
}
