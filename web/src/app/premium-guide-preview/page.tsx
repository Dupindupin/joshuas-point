import type {Metadata} from 'next'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {PremiumGuideCover} from '@/components/premium-guide/premium-guide-cover'
import {PremiumJourneyCard} from '@/components/premium-guide/premium-journey-card'
import {SiteHeader} from '@/components/site/site-header'
import {getPremiumGuidePreviewJourneys} from '@/lib/premium-guide/preview-journeys'

export const metadata: Metadata = {
  description: "An internal visual prototype for Joshua's Point Premium Guide journeys.",
  robots: {follow: false, index: false},
  title: "Premium Guide Preview | Joshua's Point",
}

export default async function PremiumGuidePreviewPage() {
  const journeys = await getPremiumGuidePreviewJourneys()

  return (
    <>
      <SiteHeader appearance="transparent" />
      <main className="bg-canvas">
        <PremiumGuideCover
          edition="Southern Negros Oriental · Edition 01"
          introduction="Three journeys from Joshua’s Point, shaped by the road, the water and Tobias’s own reasons for returning."
          statusLabel="Local visual prototype · not for publication"
          title="A guide for days that stay with you."
        />

        <SectionSpacing aria-labelledby="premium-guide-introduction-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                The companion
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-4">
                <EditorialText
                  as="h2"
                  headingSize="medium"
                  id="premium-guide-introduction-title"
                  variant="heading"
                >
                  Begin at the house. Let one journey shape the day.
                </EditorialText>
                <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-12">
                  <EditorialText variant="body">
                    This is not a longer list of places. It is a field companion for choosing a
                    day, understanding its rhythm and carrying the useful parts offline.
                  </EditorialText>
                  <EditorialText variant="body">
                    The public stories remain complete. The premium guide adds verified place
                    context, Tobias’s perspective, a considered sequence and maps designed to
                    travel with you.
                  </EditorialText>
                </div>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="premium-guide-layers-title"
          className="bg-inverse-surface"
          size="generous"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <div className="lg:col-span-4">
                <EditorialText tone="inverse" variant="eyebrow">
                  What belongs inside
                </EditorialText>
                <EditorialText
                  as="h2"
                  className="mt-7"
                  headingSize="medium"
                  id="premium-guide-layers-title"
                  tone="inverse"
                  variant="heading"
                >
                  Knowledge, experience, and a way through the day.
                </EditorialText>
              </div>
              <ol className="border-t border-inverse/20 lg:col-span-7 lg:col-start-6">
                {[
                  ['01', 'The place', 'Enough verified context to understand where you are going.'],
                  [
                    '02',
                    'Local perspective',
                    'What Tobias remembers, notices and recommends from real visits.',
                  ],
                  [
                    '03',
                    'The journey',
                    'A calm sequence that saves planning time without overfilling the day.',
                  ],
                ].map(([number, title, body]) => (
                  <li
                    className="grid gap-4 border-b border-inverse/20 py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-8"
                    key={number}
                  >
                    <span className="font-body text-xs tracking-[0.14em] text-inverse/45">
                      {number}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl text-inverse">{title}</h3>
                      <p className="mt-3 max-w-lg font-body text-sm leading-7 text-inverse/65">
                        {body}
                      </p>
                    </div>
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
                Highlands, island water, or the quieter roads between mountain and lake. Every day
                begins and ends at Joshua’s Point.
              </p>
            </div>

            <div className="mt-14 grid gap-x-12 gap-y-20 lg:grid-cols-2 xl:gap-x-20">
              {journeys.map((journey, index) => (
                <div className={index === 2 ? 'lg:col-span-2 lg:w-[calc(50%-1.5rem)]' : ''} key={journey.slug}>
                  <PremiumJourneyCard
                    href={`/premium-guide-preview/journeys/${journey.slug}`}
                    image={journey.image}
                    imagePosition={journey.imagePosition}
                    number={journey.number}
                    route={journey.route}
                    summary={journey.summary}
                    title={journey.title}
                  />
                </div>
              ))}
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-label="Premium Guide closing reflection"
          className="bg-surface-soft"
          size="immersive"
        >
          <EditorialContainer>
            <EditorialGrid>
              <EditorialText className="lg:col-span-9 lg:col-start-3" variant="lead">
                A useful guide does not make the day louder. It gives you enough context to leave
                well, pay attention and find your way home.
              </EditorialText>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
