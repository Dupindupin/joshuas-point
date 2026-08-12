import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {EditorialContainer, EditorialText, SectionSpacing} from '@/components/editorial'
import {PremiumJourneyDetail} from '@/components/premium-guide/premium-journey-detail'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {
  getPremiumGuideEditionOneJourney,
  getPremiumGuideEditionOneJourneys,
  premiumGuideJourneySlugs,
} from '@/lib/premium-guide/edition-one'

type PremiumJourneyPageProps = {params: Promise<{slug: string}>}

export const dynamicParams = false

export function generateStaticParams() {
  return premiumGuideJourneySlugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: PremiumJourneyPageProps): Promise<Metadata> {
  const {slug} = await params
  const journey = await getPremiumGuideEditionOneJourney(slug)
  if (!journey) return {}

  return createPageMetadata({
    description: journey.summary,
    noIndex: true,
    pathname: `/premium-guide/journeys/${slug}`,
    title: `${journey.title} | Southern Negros Edition 1`,
  })
}

export default async function PremiumJourneyPage({params}: PremiumJourneyPageProps) {
  const {slug} = await params
  const [journey, journeys] = await Promise.all([
    getPremiumGuideEditionOneJourney(slug),
    getPremiumGuideEditionOneJourneys(),
  ])
  if (!journey) notFound()

  const currentIndex = journeys.findIndex((item) => item.slug === journey.slug)
  const previousJourney = currentIndex > 0 ? journeys[currentIndex - 1] : undefined
  const nextJourney = currentIndex < journeys.length - 1 ? journeys[currentIndex + 1] : undefined

  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-canvas pt-24">
        <div className="border-b border-border bg-surface-soft">
          <EditorialContainer className="flex flex-wrap items-center justify-between gap-4 py-5">
            <Link
              className="rounded-sm font-body text-xs font-semibold tracking-[0.08em] text-ink-muted uppercase underline decoration-border underline-offset-4 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              href="/premium-guide"
            >
              ← Edition 01
            </Link>
            <p className="font-body text-[0.625rem] tracking-[0.18em] text-ink-subtle uppercase">
              Private production edition
            </p>
          </EditorialContainer>
        </div>

        <PremiumJourneyDetail {...journey} />

        <SectionSpacing aria-label="Move between guide journeys" className="border-t border-border bg-surface-soft" size="standard">
          <EditorialContainer>
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
              <div>
                {previousJourney ? (
                  <Link
                    className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-focus"
                    href={`/premium-guide/journeys/${previousJourney.slug}`}
                  >
                    <EditorialText variant="eyebrow">← Previous journey</EditorialText>
                    <p className="mt-4 font-display text-3xl text-ink group-hover:text-accent">{previousJourney.title}</p>
                  </Link>
                ) : null}
              </div>
              <div className="sm:text-right">
                {nextJourney ? (
                  <Link
                    className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-6 focus-visible:outline-focus"
                    href={`/premium-guide/journeys/${nextJourney.slug}`}
                  >
                    <EditorialText variant="eyebrow">Next journey →</EditorialText>
                    <p className="mt-4 font-display text-3xl text-ink group-hover:text-accent">{nextJourney.title}</p>
                  </Link>
                ) : null}
              </div>
            </div>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
