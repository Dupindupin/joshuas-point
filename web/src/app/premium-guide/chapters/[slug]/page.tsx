import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {EditorialContainer, EditorialFigure, EditorialText} from '@/components/editorial'
import {EditorialMap} from '@/components/maps'
import {PremiumChapterDivider} from '@/components/premium-guide/premium-chapter-divider'
import {PremiumReaderShell} from '@/components/premium-guide/premium-reader-shell'
import {getPremiumGuideEditionOneJourney} from '@/lib/premium-guide/edition-one'
import {
  getReaderChapter,
  readerChapters,
  readerChapterSlugs,
} from '@/lib/premium-guide/reader-manuscript'
import {createPageMetadata} from '@/lib/seo/metadata'

type PremiumGuideChapterPageProps = {params: Promise<{slug: string}>}

export const dynamicParams = false

export function generateStaticParams() {
  return readerChapterSlugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: PremiumGuideChapterPageProps): Promise<Metadata> {
  const {slug} = await params
  const chapter = getReaderChapter(slug)
  if (!chapter) return {}

  return createPageMetadata({
    description: chapter.introduction,
    noIndex: true,
    pathname: `/premium-guide/chapters/${slug}`,
    title: `${chapter.title} | Southern Negros Explorer`,
  })
}

export default async function PremiumGuideChapterPage({params}: PremiumGuideChapterPageProps) {
  const {slug} = await params
  const chapter = getReaderChapter(slug)
  if (!chapter) notFound()

  const journey = chapter.journeySlug
    ? await getPremiumGuideEditionOneJourney(chapter.journeySlug)
    : undefined
  const featureImage = chapter.image ?? journey?.image
  const currentIndex = readerChapters.findIndex((item) => item.slug === chapter.slug)
  const previousChapter = readerChapters[currentIndex - 1]
  const nextChapter = readerChapters[currentIndex + 1]
  const hasMap = Boolean(
    chapter.mapCaption &&
    journey &&
    (journey.mapMarkers?.length || journey.mapRoutes?.length || journey.mapViewport),
  )

  return (
    <PremiumReaderShell chapterNumber={chapter.number} chapterTitle={chapter.title}>
      <main className="bg-canvas">
        <PremiumChapterDivider
          introduction={chapter.introduction}
          number={chapter.number}
          title={chapter.title}
        />

        {featureImage ? (
          <div className="jp-reader-media bg-inverse-surface">
            <EditorialFigure
              caption={chapter.imageCaption}
              captionClassName="px-6 pb-3 sm:px-8 md:px-10"
              className="mx-auto max-w-[92rem]"
              media={{
                image: featureImage,
                objectPosition: journey?.imagePosition,
                ratio: 'panoramic',
                sizes: '(min-width: 1472px) 1472px, 100vw',
              }}
            />
          </div>
        ) : null}

        <article className="jp-reader-article py-20 sm:py-28 lg:py-36">
          <EditorialContainer className="jp-reader-prose" size="reading">
            {chapter.sections.map((section, index) =>
              section.kind === 'field-notes' ? (
                <aside
                  aria-labelledby={`${chapter.slug}-section-${index}`}
                  className="jp-reader-field-note my-16 border-y border-accent/40 bg-surface-soft px-6 py-10 sm:my-20 sm:px-10"
                  key={section.title}
                >
                  <p className="font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-accent uppercase">
                    Field Notes
                  </p>
                  <h2
                    className="mt-5 font-display text-3xl leading-tight text-ink sm:text-4xl"
                    id={`${chapter.slug}-section-${index}`}
                  >
                    {section.title}
                  </h2>
                  <div className="mt-7 space-y-6">
                    {section.body.map((paragraph) => (
                      <p className="jp-reader-copy text-ink" key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </aside>
              ) : (
                <section
                  aria-labelledby={`${chapter.slug}-section-${index}`}
                  className="jp-reader-section"
                  key={section.title}
                >
                  <p className="font-body text-[0.6875rem] font-semibold tracking-[0.16em] text-ink-subtle uppercase">
                    {chapter.number}.{String(index + 1).padStart(2, '0')}
                  </p>
                  <h2
                    className="mt-5 text-balance font-display text-[clamp(2.1rem,5vw,3.4rem)] leading-[1.03] tracking-[-0.025em] text-ink"
                    id={`${chapter.slug}-section-${index}`}
                  >
                    {section.title}
                  </h2>
                  <div className="mt-8 space-y-7 sm:mt-10">
                    {section.body.map((paragraph) => (
                      <p className="jp-reader-copy text-ink-muted" key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ),
            )}
          </EditorialContainer>
        </article>

        {hasMap && journey ? (
          <section
            aria-labelledby={`${chapter.slug}-map-title`}
            className="jp-reader-map border-y border-border bg-surface-soft py-20 sm:py-28"
          >
            <EditorialContainer>
              <EditorialText variant="eyebrow">The journey</EditorialText>
              <EditorialText
                as="h2"
                className="mt-6"
                headingSize="small"
                id={`${chapter.slug}-map-title`}
                variant="heading"
              >
                The shape of the day
              </EditorialText>
              <EditorialMap
                ariaLabel={`Map for ${chapter.title}`}
                caption={chapter.mapCaption}
                className="mt-10"
                markers={journey.mapMarkers}
                routes={journey.mapRoutes}
                viewport={journey.mapViewport}
              />
            </EditorialContainer>
          </section>
        ) : null}

        <nav
          aria-label="Move between chapters"
          className="border-t border-border bg-canvas py-16 sm:py-20"
        >
          <EditorialContainer>
            <div className="grid gap-10 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <div>
                {previousChapter ? (
                  <Link
                    className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-focus"
                    href={`/premium-guide/chapters/${previousChapter.slug}`}
                  >
                    <EditorialText variant="eyebrow">← Previous</EditorialText>
                    <p className="mt-3 font-display text-2xl text-ink transition-colors group-hover:text-accent sm:text-3xl">
                      {previousChapter.title}
                    </p>
                  </Link>
                ) : null}
              </div>

              <Link
                className="justify-self-start rounded-full border border-border px-5 py-3 font-body text-[0.6875rem] font-semibold tracking-[0.1em] text-ink-muted uppercase hover:border-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-focus sm:justify-self-center"
                href="/premium-guide#contents"
              >
                Contents
              </Link>

              <div className="sm:text-right">
                {nextChapter ? (
                  <Link
                    className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-focus"
                    href={`/premium-guide/chapters/${nextChapter.slug}`}
                  >
                    <EditorialText variant="eyebrow">Next →</EditorialText>
                    <p className="mt-3 font-display text-2xl text-ink transition-colors group-hover:text-accent sm:text-3xl">
                      {nextChapter.title}
                    </p>
                  </Link>
                ) : (
                  <Link
                    className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-focus"
                    href="/premium-guide"
                  >
                    <EditorialText variant="eyebrow">Return</EditorialText>
                    <p className="mt-3 font-display text-2xl text-ink transition-colors group-hover:text-accent sm:text-3xl">
                      Edition 1
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </EditorialContainer>
        </nav>
      </main>
    </PremiumReaderShell>
  )
}
