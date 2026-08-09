import Link from 'next/link'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialMedia,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import type {RelatedContentItem} from '@/sanity/relationships'

export type RelatedContentSectionProps = {
  eyebrow: string
  items: RelatedContentItem[]
  limit?: number
  sectionId: string
  title: string
}

const typeLabels: Record<RelatedContentItem['type'], string> = {
  destination: 'Destination',
  diveSite: 'Dive site',
  experience: 'Experience',
  housePage: 'The House',
  journalArticle: 'Journal',
  room: 'Room',
}

export function RelatedContentSection({
  eyebrow,
  items,
  limit = 4,
  sectionId,
  title,
}: RelatedContentSectionProps) {
  const visibleItems = items.slice(0, Math.max(0, limit))
  if (visibleItems.length === 0) return null

  const headingId = `${sectionId}-title`

  return (
    <SectionSpacing aria-labelledby={headingId} size="generous">
      <EditorialContainer>
        <EditorialGrid>
          <EditorialText className="lg:col-span-2" variant="eyebrow">
            {eyebrow}
          </EditorialText>
          <EditorialText
            className="max-w-3xl lg:col-span-8 lg:col-start-3"
            headingSize="medium"
            id={headingId}
            variant="heading"
          >
            {title}
          </EditorialText>
        </EditorialGrid>

        <div className="mt-16 sm:mt-20">
          {visibleItems.map((item) => {
            const itemHeadingId = `${sectionId}-${item.id.replace(/[^a-zA-Z0-9_-]/g, '-')}-title`

            return (
              <article
                aria-labelledby={itemHeadingId}
                className="py-12 first:pt-0 last:pb-0 sm:py-16"
                key={item.id}
              >
                <EditorialGrid gap="generous">
                  <EditorialMedia
                    className="lg:col-span-7"
                    image={item.image}
                    ratio="landscape"
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    tone="stone"
                  />
                  <div className="lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-6">
                    <EditorialText variant="eyebrow">{typeLabels[item.type]}</EditorialText>
                    <EditorialText
                      as="h3"
                      className="mt-5"
                      headingSize="small"
                      id={itemHeadingId}
                      variant="heading"
                    >
                      {item.title}
                    </EditorialText>
                    {item.excerpt ? (
                      <EditorialText className="mt-7 max-w-md" variant="body">
                        {item.excerpt}
                      </EditorialText>
                    ) : null}
                    <Link
                      aria-label={`Read more about ${item.title}`}
                      className="mt-8 inline-flex rounded-sm font-body text-xs font-semibold tracking-[0.04em] text-charcoal underline decoration-charcoal/30 underline-offset-8 hover:decoration-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
                      href={item.href}
                    >
                      Read more
                    </Link>
                  </div>
                </EditorialGrid>
              </article>
            )
          })}
        </div>
      </EditorialContainer>
    </SectionSpacing>
  )
}
