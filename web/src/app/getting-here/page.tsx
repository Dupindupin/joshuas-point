import type {Metadata} from 'next'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {GettingHereMap} from '@/components/maps'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'

export function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    description:
      'A practical introduction to reaching Joshua’s Point by air, sea, road, and local transport.',
    pathname: '/getting-here',
    title: "Getting Here | Joshua's Point",
  })
}

const arrivalRecommendations = [
  {
    description:
      'Plan the flight or ferry together with the final road journey before committing to a tight connection.',
    title: 'Plan the full arrival.',
  },
  {
    description:
      'Keep the confirmed address, contact details, meeting instructions, and essential travel documents available offline.',
    title: 'Carry the final details offline.',
  },
  {
    description:
      'Schedules, weather, road conditions, and crossings can change. Leave enough time between each part of the journey.',
    title: 'Leave room for change.',
  },
  {
    description:
      'If an arrival changes, contact the host through the confirmed channel before beginning the final leg of the journey.',
    title: 'Share changes early.',
  },
] as const

export default async function GettingHerePage() {
  const siteSettings = await getSiteSeoSettings()
  const publishedCoordinates = siteSettings?.propertyLocation?.coordinates
  const coordinates =
    typeof publishedCoordinates?.lat === 'number' &&
    typeof publishedCoordinates.lng === 'number'
      ? {latitude: publishedCoordinates.lat, longitude: publishedCoordinates.lng}
      : undefined
  const locationLabel =
    siteSettings?.propertyLocation?.label?.trim() ||
    "Joshua's Point, Calango, Zamboanguita 6218, Negros Oriental, Philippines"

  return (
    <>
      <SiteHeader appearance="solid" activeHref="/getting-here" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Getting Here"
          introduction="A practical starting point for the journey to Joshua’s Point. Check changing schedules and transport details close to travel."
          title="The journey here."
        />

        <SectionSpacing aria-labelledby="arrival-orientation-title" size="generous">
          <EditorialContainer size="reading">
            <EditorialText variant="eyebrow">Before setting out</EditorialText>
            <EditorialText className="mt-9" id="arrival-orientation-title" variant="lead">
              A good arrival leaves room for the road.
            </EditorialText>
            <EditorialText className="mt-12 max-w-2xl" variant="body">
              Reaching Joshua’s Point may bring together air, sea, and road travel. Schedules,
              operators, road conditions, and transfer arrangements can change, so confirm the
              details that apply to your journey before setting out.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>

        <GettingHereMap
          coordinates={coordinates}
          directionsUrl={siteSettings?.propertyLocation?.directionsUrl?.trim() || undefined}
          locationLabel={locationLabel}
        />

        <SectionSpacing
          aria-labelledby="arrival-recommendations-title"
          className="bg-surface-soft"
          size="immersive"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <div className="lg:col-span-4">
                <EditorialText variant="eyebrow">A quieter arrival</EditorialText>
                <EditorialText
                  className="mt-7 max-w-md"
                  headingSize="small"
                  id="arrival-recommendations-title"
                  variant="heading"
                >
                  A little preparation makes the journey easier.
                </EditorialText>
              </div>

              <div className="border-t border-ink/18 lg:col-span-7 lg:col-start-6">
                {arrivalRecommendations.map((recommendation) => (
                  <article
                    className="border-b border-ink/18 py-12 sm:py-14"
                    key={recommendation.title}
                  >
                    <EditorialText as="h3" headingSize="small" variant="heading">
                      {recommendation.title}
                    </EditorialText>
                    <EditorialText className="mt-8 max-w-2xl" variant="body">
                      {recommendation.description}
                    </EditorialText>
                  </article>
                ))}
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
