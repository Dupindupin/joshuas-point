import type {Metadata} from 'next'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialMedia,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'

export const metadata: Metadata = {
  title: "Southern Negros Guide | Joshua's Point",
  description:
    'A slowly gathered editorial guide to destinations, dive sites, roads, food, and everyday discoveries across Southern Negros.',
}

const guideContents = [
  {
    description:
      'Waterfalls, lakes, islands, towns, viewpoints, and cultural places observed with care.',
    title: 'Destinations',
  },
  {
    description:
      'Field notes on underwater landscapes, marine life, conditions, photography, and safety.',
    title: 'Dive Sites',
  },
  {
    description:
      'Road character, travel time, surfaces, fuel, pauses, and reasons to take the longer way.',
    title: 'Scooter Routes',
  },
  {
    description:
      'Markets, growers, everyday dishes, and kitchens understood through the places around them.',
    title: 'Food',
  },
  {
    description:
      'Producers, roasters, quiet stops, and cups that reveal something about the journey.',
    title: 'Coffee',
  },
  {
    description:
      'Dated notes on access, timing, transport, preparation, costs, and local etiquette.',
    title: 'Practical Information',
  },
] as const

const futureEditions = [
  {
    description:
      'A considered introduction to the region, bringing together places, journeys, and practical context.',
    title: 'Explorer',
  },
  {
    description:
      'A closer record of reefs, marine life, seasonal conditions, photography, and responsible diving.',
    title: 'Dive',
  },
  {
    description:
      'Routes shaped by distance, changing roads, useful stops, weather, and the freedom to travel slowly.',
    title: 'Scooter',
  },
  {
    description:
      'Stories of markets, growers, cooks, familiar dishes, and the everyday tables of Southern Negros.',
    title: 'Food',
  },
] as const

export default function GuidePage() {
  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-linen">
        <EditorialPageHero
          eyebrow="Southern Negros Guide"
          introduction="Field notes, practical knowledge, and considered journeys gathered from Joshua’s Point and across the region."
          title="A guide for going slowly."
        />

        <SectionSpacing aria-labelledby="guide-purpose-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Why this guide exists
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="small"
                id="guide-purpose-title"
                variant="heading"
              >
                The region deserves more than a list.
              </EditorialText>
              <div className="space-y-7 lg:col-span-5 lg:col-start-7 lg:row-start-2 lg:mt-14">
                <EditorialText variant="body">
                  Southern Negros unfolds through roads between mountains and sea, conversations,
                  weather, and small changes in pace. This guide is being made to hold those details
                  together—to help guests leave with context, travel with confidence, and give each
                  place enough time.
                </EditorialText>
                <EditorialText variant="body">
                  It will remain selective and carefully maintained: not an inventory of everything
                  to see, but a record of places worth understanding.
                </EditorialText>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="guide-contents-title"
          className="bg-charcoal"
          size="generous"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
                What is included
              </EditorialText>
              <EditorialText
                className="max-w-3xl lg:col-span-8 lg:col-start-3"
                headingSize="medium"
                id="guide-contents-title"
                tone="inverse"
                variant="heading"
              >
                A field guide in six parts.
              </EditorialText>
            </EditorialGrid>

            <ol className="mt-20 border-t border-linen/18 sm:mt-28 lg:ml-[16.666667%]">
              {guideContents.map((item, index) => (
                <li
                  className="grid gap-5 border-b border-linen/18 py-9 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-11 lg:grid-cols-[5rem_minmax(12rem,0.8fr)_minmax(18rem,1.2fr)] lg:items-baseline"
                  key={item.title}
                >
                  <span
                    aria-hidden="true"
                    className="font-body text-xs font-semibold tracking-[0.18em] text-linen/42"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <EditorialText as="h3" headingSize="small" tone="inverse" variant="heading">
                    {item.title}
                  </EditorialText>
                  <EditorialText
                    className="max-w-xl sm:col-start-2 lg:col-start-auto"
                    tone="inverse"
                    variant="body"
                  >
                    {item.description}
                  </EditorialText>
                </li>
              ))}
            </ol>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="sample-preview-title" size="immersive">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <figure className="lg:col-span-6">
                <EditorialMedia ratio="portrait" sizes="(min-width: 1024px) 46vw, 100vw" tone="stone" />
                <EditorialText as="figcaption" className="mt-4 max-w-sm" variant="caption">
                  Photography will be gathered alongside each journey, never separated from its
                  setting.
                </EditorialText>
              </figure>

              <article className="self-center lg:col-span-5 lg:col-start-8">
                <EditorialText variant="eyebrow">Sample editorial preview</EditorialText>
                <EditorialText
                  className="mt-8"
                  headingSize="small"
                  id="sample-preview-title"
                  variant="heading"
                >
                  The road changes before the view.
                </EditorialText>
                <div className="mt-12 space-y-7">
                  <EditorialText variant="body">
                    Morning begins with the coast behind you. The road rises through cultivated
                    slopes and pockets of shade, becoming quieter as the air cools.
                  </EditorialText>
                  <EditorialText variant="body">
                    There is no need to hurry the last part. The journey is already changing the
                    shape of the day.
                  </EditorialText>
                </div>
                <EditorialText className="mt-12 max-w-md" variant="caption">
                  Sample editorial treatment. Final guide entries will be based on first-hand
                  reporting and locally verified practical information.
                </EditorialText>
              </article>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="why-created-title"
          className="bg-stone/20"
          size="generous"
        >
          <EditorialContainer size="reading">
            <EditorialText variant="eyebrow">Why we created it</EditorialText>
            <EditorialText
              className="mt-9 max-w-3xl"
              headingSize="small"
              id="why-created-title"
              variant="heading"
            >
              To share what takes time to learn.
            </EditorialText>
            <div className="mt-14 max-w-2xl space-y-7 sm:ml-auto">
              <EditorialText variant="body">
                Joshua’s Point is a place to begin from. Over time, familiar roads, changing
                seasons, conversations, and repeated visits form a kind of knowledge that search
                results rarely hold.
              </EditorialText>
              <EditorialText variant="body">
                The guide is our way of preserving that knowledge carefully and sharing it without
                turning the region into a checklist.
              </EditorialText>
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="future-editions-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Future editions
              </EditorialText>
              <EditorialText
                className="max-w-3xl lg:col-span-8 lg:col-start-3"
                headingSize="medium"
                id="future-editions-title"
                variant="heading"
              >
                Four ways into the region.
              </EditorialText>
            </EditorialGrid>

            <ol className="mt-20 border-t border-charcoal/18 sm:mt-28 lg:ml-[25%]">
              {futureEditions.map((edition, index) => (
                <li
                  className="grid gap-5 border-b border-charcoal/18 py-10 sm:grid-cols-[3rem_1fr] sm:gap-8 lg:grid-cols-[3rem_minmax(10rem,0.7fr)_minmax(18rem,1.3fr)] lg:items-baseline lg:py-12"
                  key={edition.title}
                >
                  <span
                    aria-hidden="true"
                    className="font-body text-xs font-semibold tracking-[0.18em] text-charcoal/38"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <EditorialText as="h3" headingSize="small" variant="heading">
                    {edition.title}
                  </EditorialText>
                  <EditorialText
                    className="max-w-xl sm:col-start-2 lg:col-start-auto"
                    variant="body"
                  >
                    {edition.description}
                  </EditorialText>
                </li>
              ))}
            </ol>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="Closing reflection" size="immersive">
          <EditorialContainer>
            <EditorialGrid>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                variant="lead"
              >
                A useful guide does not tell you how much to see. It helps you understand what
                deserves your time.
              </EditorialText>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
