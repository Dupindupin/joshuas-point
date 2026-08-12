import Link from 'next/link'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {PremiumGuideCover} from '@/components/premium-guide/premium-guide-cover'
import {PremiumJourneyCard} from '@/components/premium-guide/premium-journey-card'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {
  getPremiumGuideEditionOneJourneys,
  premiumGuideChapters,
} from '@/lib/premium-guide/edition-one'

export function generateMetadata() {
  return createPageMetadata({
    description:
      'Edition 1 of the Southern Negros guide from Joshua’s Point: five considered journeys, owner perspective, maps and field notes.',
    noIndex: true,
    pathname: '/premium-guide',
    title: "Southern Negros from Joshua's Point | Edition 1",
  })
}

export default async function PremiumGuidePage() {
  const journeys = await getPremiumGuideEditionOneJourneys()

  return (
    <>
      <SiteHeader appearance="transparent" />
      <main className="bg-canvas">
        <PremiumGuideCover
          edition="Southern Negros Oriental · Edition 01"
          introduction="Five journeys from Joshua’s Point, shaped by Tobias’s experience, verified place knowledge and enough practical guidance to carry the day offline."
          statusLabel="First production edition · private review"
          title="Southern Negros, one journey at a time."
        />

        <SectionSpacing aria-labelledby="premium-guide-note-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                A note from Joshua’s Point
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-4">
                <EditorialText
                  as="h2"
                  headingSize="medium"
                  id="premium-guide-note-title"
                  variant="heading"
                >
                  This guide begins at the house, but it is really about what lies around it.
                </EditorialText>
                <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
                  <EditorialText variant="body">
                    Tobias has shaped each journey from places and roads he knows. The guide keeps
                    his observations separate from general place knowledge, then brings both
                    together in a day that can be followed without overfilling it.
                  </EditorialText>
                  <EditorialText variant="body">
                    Conditions and services change. Use the maps for orientation, carry the useful
                    notes offline and confirm anything time-sensitive before leaving.
                  </EditorialText>
                </div>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="premium-guide-contents-title"
          className="bg-surface-soft"
          size="generous"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <div className="lg:col-span-3">
                <EditorialText variant="eyebrow">The book</EditorialText>
                <EditorialText
                  as="h2"
                  className="mt-7"
                  headingSize="small"
                  id="premium-guide-contents-title"
                  variant="heading"
                >
                  Nine chapters, five journeys.
                </EditorialText>
                <div className="mt-10 flex flex-wrap gap-5">
                  <a
                    className="rounded-sm border-b border-ink/35 pb-1 font-body text-sm font-semibold text-ink hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                    href="/downloads/southern-negros-from-joshuas-point-edition-1.pdf"
                  >
                    Print edition · PDF
                  </a>
                  <a
                    className="rounded-sm border-b border-ink/35 pb-1 font-body text-sm font-semibold text-ink hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                    href="/downloads/southern-negros-from-joshuas-point-edition-1.epub"
                  >
                    Reader edition · EPUB
                  </a>
                </div>
              </div>
              <ol className="border-t border-border lg:col-span-8 lg:col-start-5">
                {premiumGuideChapters.map((chapter) => (
                  <li className="border-b border-border" key={chapter.slug}>
                    <Link
                      className="group grid rounded-sm py-7 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-8"
                      href={`/premium-guide/chapters/${chapter.slug}`}
                    >
                      <span className="font-body text-xs tracking-[0.12em] text-ink-subtle">
                        {chapter.number}
                      </span>
                      <span className="mt-2 font-display text-2xl text-ink sm:mt-0 sm:text-3xl">
                        {chapter.title}
                      </span>
                      <span aria-hidden="true" className="mt-3 text-ink-subtle group-hover:text-ink sm:mt-0">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="premium-guide-journeys-title" size="generous">
          <EditorialContainer>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div>
                <EditorialText variant="eyebrow">Edition 01 · Journey collection</EditorialText>
                <EditorialText
                  as="h2"
                  className="mt-7"
                  headingSize="medium"
                  id="premium-guide-journeys-title"
                  variant="heading"
                >
                  Choose the character of the day.
                </EditorialText>
              </div>
              <p className="max-w-xs font-body text-xs leading-6 text-ink-subtle">
                Each journey begins and ends at Joshua’s Point. Missing imagery is reserved
                honestly; no other place is used to stand in for it.
              </p>
            </div>

            <div className="mt-14 grid gap-x-12 gap-y-20 lg:grid-cols-2 xl:gap-x-20">
              {journeys.map((journey) => (
                <PremiumJourneyCard
                  href={`/premium-guide/journeys/${journey.slug}`}
                  image={journey.image}
                  imagePosition={journey.imagePosition}
                  key={journey.slug}
                  number={journey.number}
                  route={journey.route}
                  summary={journey.summary}
                  title={journey.title}
                />
              ))}
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="Guide closing reflection" className="bg-inverse-surface" size="immersive">
          <EditorialContainer size="reading">
            <EditorialText className="text-inverse" tone="inverse" variant="lead">
              A useful guide does not make the day louder. It gives you enough context to leave
              well, pay attention and find your way home.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
