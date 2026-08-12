import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {PremiumChapterDivider} from '@/components/premium-guide/premium-chapter-divider'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {
  getPremiumGuideChapter,
  getPremiumGuideEditionOneJourneys,
  premiumGuideChapters,
  premiumGuideChapterSlugs,
} from '@/lib/premium-guide/edition-one'

type PremiumGuideChapterPageProps = {params: Promise<{slug: string}>}

export const dynamicParams = false

export function generateStaticParams() {
  return premiumGuideChapterSlugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: PremiumGuideChapterPageProps): Promise<Metadata> {
  const {slug} = await params
  const chapter = getPremiumGuideChapter(slug)
  if (!chapter) return {}

  return createPageMetadata({
    description: chapter.introduction,
    noIndex: true,
    pathname: `/premium-guide/chapters/${slug}`,
    title: `${chapter.title} | Southern Negros Edition 1`,
  })
}

export default async function PremiumGuideChapterPage({params}: PremiumGuideChapterPageProps) {
  const {slug} = await params
  const chapter = getPremiumGuideChapter(slug)
  if (!chapter) notFound()

  const journeys = await getPremiumGuideEditionOneJourneys()
  const chapterJourneys = journeys.filter((journey) => chapter.journeySlugs.includes(journey.slug))
  const currentIndex = premiumGuideChapters.findIndex((item) => item.slug === chapter.slug)
  const nextChapter = premiumGuideChapters[currentIndex + 1]

  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-canvas pt-24">
        <PremiumChapterDivider
          introduction={chapter.introduction}
          number={chapter.number}
          title={chapter.title}
        />

        {chapter.sections.map((section, index) => (
          <SectionSpacing
            aria-labelledby={`${chapter.slug}-section-${index}`}
            className={index % 2 === 1 ? 'bg-surface-soft' : undefined}
            key={section.title}
            size="generous"
          >
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  {chapter.number}.{String(index + 1).padStart(2, '0')}
                </EditorialText>
                <div className="lg:col-span-7 lg:col-start-4">
                  <EditorialText
                    as="h2"
                    headingSize="small"
                    id={`${chapter.slug}-section-${index}`}
                    variant="heading"
                  >
                    {section.title}
                  </EditorialText>
                  <div className="mt-10 space-y-7">
                    {section.body.map((paragraph) => (
                      <EditorialText key={paragraph} variant="body">
                        {paragraph}
                      </EditorialText>
                    ))}
                  </div>
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ))}

        {chapterJourneys.length > 0 ? (
          <SectionSpacing aria-label="Journeys in this chapter" className="bg-surface-soft" size="generous">
            <EditorialContainer>
              <EditorialText variant="eyebrow">Journey in this chapter</EditorialText>
              <div className="mt-10 border-t border-border">
                {chapterJourneys.map((journey) => (
                  <Link
                    className="group grid border-b border-border py-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                    href={`/premium-guide/journeys/${journey.slug}`}
                    key={journey.slug}
                  >
                    <span className="font-body text-xs tracking-[0.12em] text-ink-subtle">
                      {journey.number}
                    </span>
                    <span className="mt-2 font-display text-3xl text-ink sm:mt-0">{journey.title}</span>
                    <span aria-hidden="true" className="mt-3 text-ink-subtle group-hover:text-ink sm:mt-0">→</span>
                  </Link>
                ))}
              </div>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        {nextChapter ? (
          <SectionSpacing aria-label="Next chapter" size="standard">
            <EditorialContainer>
              <Link
                className="group block rounded-sm border-t border-border pt-10 focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-focus"
                href={`/premium-guide/chapters/${nextChapter.slug}`}
              >
                <EditorialText variant="eyebrow">Next chapter · {nextChapter.number}</EditorialText>
                <p className="mt-5 font-display text-4xl text-ink group-hover:text-accent sm:text-5xl">
                  {nextChapter.title} →
                </p>
              </Link>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}
      </main>
    </>
  )
}
