import {EditorialMap, type EditorialMapProps} from './editorial-map'
import {EditorialMapSection} from './editorial-map-section'
import type {EditorialMapMarker} from './types'

export type DiveSiteMapProps = Omit<EditorialMapProps, 'ariaLabel' | 'caption'> & {
  directionsUrl?: string
  diveSiteName: string
  locationLabel?: string
}

export function DiveSiteMap({
  coordinates,
  directionsUrl,
  diveSiteName,
  labels,
  locationLabel,
  markers,
  provider,
  routes,
  viewport,
}: DiveSiteMapProps) {
  if (!coordinates && !locationLabel && !labels?.length && !markers?.length && !routes?.length) {
    return null
  }

  const diveSiteMarkers: readonly EditorialMapMarker[] =
    markers ??
    (coordinates
      ? [
          {
            coordinates,
            id: 'dive-site',
            kind: 'dive-site',
            label: locationLabel ?? diveSiteName,
          },
        ]
      : [])

  return (
    <EditorialMapSection
      coordinates={coordinates}
      directionsUrl={directionsUrl}
      eyebrow="Dive map"
      heading="A point below the surface."
      locationLabel={locationLabel}
      titleId="dive-site-map-title"
    >
      <EditorialMap
        ariaLabel={`Map of ${diveSiteName}`}
        caption="Coordinates provide orientation only and do not replace a current professional dive briefing."
        coordinates={coordinates}
        labels={labels}
        markers={diveSiteMarkers}
        provider={provider}
        routes={routes}
        viewport={viewport ?? (coordinates ? {center: coordinates, zoom: 13} : undefined)}
      />
    </EditorialMapSection>
  )
}
