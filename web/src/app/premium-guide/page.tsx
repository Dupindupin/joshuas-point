import Link from 'next/link'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {PremiumGuideCover} from '@/components/premium-guide/premium-guide-cover'
import {readerChapters} from '@/lib/premium-guide/reader-manuscript'
import {createPageMetadata} from '@/lib/seo/metadata'

export function generateMetadata() {
  return createPageMetadata({
    description:
      'Southern Negros Explorer, Edition 1: a personal field companion written by Tobias Steger from Joshua’s Point.',
    noIndex: true,
    pathname: '/premium-guide',
    title: 'Southern Negros Explorer | Edition 1',
  })
}

export default function PremiumGuidePage() {
  const firstChapter = readerChapters[0]

  return (
    <main className="jp-edition-reader bg-canvas">
      <PremiumGuideCover
        author="Tobias Steger"
        edition="Edition 1"
        introduction="A personal field companion for leaving Joshua’s Point well, noticing more and returning without rushing."
        title="The journeys around home."
      />

      <SectionSpacing aria-labelledby="premium-guide-opening-title" size="generous">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <EditorialText className="lg:col-span-2" variant="eyebrow">
              Opening note
            </EditorialText>
            <div className="lg:col-span-8 lg:col-start-4">
              <EditorialText
                as="h2"
                headingSize="medium"
                id="premium-guide-opening-title"
                variant="heading"
              >
                Joshua’s Point is the beginning and the end of every journey.
              </EditorialText>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
                <EditorialText variant="body">
                  This is not intended to be the most complete guide to Southern Negros. It is
                  intended to be the most personal: a companion shaped by lived experience, careful
                  observation and information worth carrying into the day.
                </EditorialText>
                <EditorialText variant="body">
                  It exists to help you leave well, notice more and return without rushing. Trust
                  matters more than completeness, and one thoughtfully chosen journey is enough.
                </EditorialText>
              </div>
            </div>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <SectionSpacing aria-labelledby="contents" className="bg-surface-soft" size="generous">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-3">
              <EditorialText variant="eyebrow">Edition 1</EditorialText>
              <EditorialText
                as="h2"
                className="mt-7"
                headingSize="small"
                id="contents"
                variant="heading"
              >
                Contents
              </EditorialText>
              <p className="mt-8 max-w-xs font-body text-sm leading-7 text-ink-muted">
                Nine chapters moving outward from Joshua’s Point and returning home.
              </p>
            </div>

            <ol className="border-t border-border lg:col-span-8 lg:col-start-5">
              {readerChapters.map((chapter) => (
                <li className="border-b border-border" key={chapter.slug}>
                  <Link
                    className="group grid rounded-sm py-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8 sm:py-7"
                    href={`/premium-guide/chapters/${chapter.slug}`}
                  >
                    <span className="font-body text-xs tracking-[0.12em] text-ink-subtle">
                      {chapter.number}
                    </span>
                    <span className="mt-2 font-display text-2xl text-ink transition-colors group-hover:text-accent sm:mt-0 sm:text-3xl">
                      {chapter.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-3 text-ink-subtle transition-transform group-hover:translate-x-1 group-hover:text-ink sm:mt-0"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </EditorialGrid>
        </EditorialContainer>
      </SectionSpacing>

      <SectionSpacing aria-label="Begin reading" className="bg-inverse-surface" size="immersive">
        <EditorialContainer size="reading">
          <EditorialText className="text-inverse" tone="inverse" variant="lead">
            The aim is not to fit the greatest number of places into a stay. It is to choose a
            journey that matches the day and leave enough room to notice it.
          </EditorialText>
          <Link
            className="mt-12 inline-flex rounded-full border border-inverse/35 px-6 py-3 font-body text-xs font-semibold tracking-[0.12em] text-inverse uppercase transition-colors hover:border-inverse hover:bg-inverse hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-inverse"
            href={`/premium-guide/chapters/${firstChapter.slug}`}
          >
            Begin with chapter one
          </Link>
        </EditorialContainer>
      </SectionSpacing>
    </main>
  )
}
