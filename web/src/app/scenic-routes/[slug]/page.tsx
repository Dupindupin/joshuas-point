import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialMedia,
  EditorialPageHero,
  EditorialPhotographyPlaceholder,
  EditorialPhotoStories,
  EditorialPortableText,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {ScooterRouteMap, type EditorialMapMarker, type EditorialMapRoute} from '@/components/maps'
import {RelatedPlaces} from '@/components/relationships'
import {ScenicRoutePractical} from '@/components/scenic-routes/scenic-route-practical'
import {EditorialShare} from '@/components/share'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {requiresTextLedScenicRoute} from '@/lib/editorial/photography-readiness'
import {isInternalEditorialCopy} from '@/lib/editorial/public-copy'
import {getEditorialImage} from '@/sanity/image'
import {mapEditorialPhotoStories} from '@/sanity/photography'
import {getScenicRouteBySlug, getScenicRouteSlugs} from '@/sanity/queries/scenic-routes'
import {getScenicRouteRelationships} from '@/sanity/relationships'

type ScenicRoutePageProps = {
  params: Promise<{slug: string}>
}

export async function generateStaticParams() {
  const slugs = await getScenicRouteSlugs()
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: ScenicRoutePageProps): Promise<Metadata> {
  const {slug} = await params
  const route = await getScenicRouteBySlug(slug)

  if (!route) {
    return {
      robots: {follow: false, index: false},
      title: "Scenic route not found | Joshua's Point",
    }
  }

  const title = route.seo?.metaTitle || `${route.title} | Joshua's Point`
  const description = route.seo?.metaDescription || route.excerpt
  const hideRoutePhotography =
    requiresTextLedScenicRoute(route.slug) || isInternalEditorialCopy(route.heroImage?.credit)

  return createPageMetadata({
    description,
    pathname: `/scenic-routes/${encodeURIComponent(route.slug)}`,
    seo: hideRoutePhotography ? {...route.seo, socialImage: null} : route.seo,
    socialImage: hideRoutePhotography ? undefined : route.heroImage,
    title,
    type: 'article',
  })
}

export default async function ScenicRoutePage({params}: ScenicRoutePageProps) {
  const {slug} = await params
  const route = await getScenicRouteBySlug(slug)
  if (!route) notFound()

  const isTextLed = requiresTextLedScenicRoute(route.slug)
  const relationships = await getScenicRouteRelationships(route._id)
  const photoStories = isTextLed ? [] : mapEditorialPhotoStories(route.editorialPhotography)
  const mappedStops = route.routeStops.flatMap((stop) => {
    const location = stop.location?.coordinates
      ? stop.location
      : stop.destination?.mapLocation?.coordinates
        ? stop.destination.mapLocation
        : undefined
    if (!location?.coordinates) return []

    const marker: EditorialMapMarker = {
      coordinates: {
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
      },
      description: stop.note?.trim() || undefined,
      id: stop._key,
      kind: 'route-stop' as const,
      label: stop.label,
    }
    return [{directionsUrl: location.directionsUrl ?? undefined, marker}]
  })
  const mapMarkers = mappedStops.map(({marker}) => marker)
  const firstMappedStop = mappedStops[0]
  const mapRoutes: EditorialMapRoute[] =
    route.routePath.length > 1
      ? [
          {
            coordinates: route.routePath.map((point) => ({
              latitude: point.lat,
              longitude: point.lng,
            })),
            id: route._id,
            label: route.title,
          },
        ]
      : []

  return (
    <>
      <SiteHeader activeHref="/scenic-routes" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Scenic Route"
          introduction={route.excerpt}
          title={route.title}
        />

        {!isTextLed && route.heroImage && !isInternalEditorialCopy(route.heroImage.credit) ? (
          <figure>
            <EditorialMedia
              image={getEditorialImage(route.heroImage, {height: 1440, width: 2560})}
              preload
              ratio="panoramic"
              sizes="100vw"
            />
          </figure>
        ) : (
          <EditorialPhotographyPlaceholder subject={route.title} />
        )}

        {route.editorialIntroduction ? (
          <SectionSpacing aria-labelledby="route-introduction-title" size="generous">
            <EditorialContainer size="reading">
              <h2 className="sr-only" id="route-introduction-title">
                Route introduction
              </h2>
              <EditorialText variant="lead">{route.editorialIntroduction}</EditorialText>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        {route.story.length > 0 ? (
          <SectionSpacing aria-labelledby="route-story-title" size="generous">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  The journey
                </EditorialText>
                <div className="lg:col-span-7 lg:col-start-4">
                  <EditorialText
                    as="h2"
                    className="mb-12 sm:mb-16"
                    headingSize="medium"
                    id="route-story-title"
                    variant="heading"
                  >
                    What unfolds along the road.
                  </EditorialText>
                  <EditorialPortableText value={route.story} />
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        {route.routeStops.length > 0 ? (
          <SectionSpacing aria-labelledby="route-stops-title" size="generous">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  Along the way
                </EditorialText>
                <div className="lg:col-span-8 lg:col-start-4">
                  <EditorialText
                    as="h2"
                    headingSize="medium"
                    id="route-stops-title"
                    variant="heading"
                  >
                    A sequence, not a checklist.
                  </EditorialText>
                  <ol className="mt-12 border-t border-ink/15 sm:mt-16">
                    {route.routeStops.map((stop, index) => (
                      <li
                        className="grid gap-4 border-b border-ink/15 py-7 sm:grid-cols-[3rem_1fr]"
                        key={stop._key}
                      >
                        <span className="font-body text-xs tracking-[0.12em] text-ink-subtle">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div>
                          {stop.destination?.slug ? (
                            <Link
                              className="rounded-sm font-display text-2xl text-ink underline decoration-ink/25 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                              href={`/destinations/${encodeURIComponent(stop.destination.slug)}`}
                            >
                              {stop.label}
                            </Link>
                          ) : (
                            <h3 className="font-display text-2xl text-ink">{stop.label}</h3>
                          )}
                          {stop.note?.trim() ? (
                            <EditorialText className="mt-4 max-w-xl" variant="body">
                              {stop.note}
                            </EditorialText>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <EditorialPhotoStories stories={photoStories} />

        <ScenicRoutePractical
          safetyNotes={route.safetyNotes}
          scooterGuide={route.scooterGuide}
          travelTime={route.travelTime}
        />

        <ScooterRouteMap
          coordinates={firstMappedStop?.marker.coordinates}
          directionsUrl={firstMappedStop?.directionsUrl}
          markers={mapMarkers}
          originLabel={firstMappedStop?.marker.label}
          routeName={route.title}
          routes={mapRoutes}
        />

        <EditorialShare
          pathname={`/scenic-routes/${encodeURIComponent(route.slug)}`}
          title={route.title}
        />

        {!isTextLed ? <RelatedPlaces items={relationships.all} limit={4} /> : null}
      </main>
    </>
  )
}
