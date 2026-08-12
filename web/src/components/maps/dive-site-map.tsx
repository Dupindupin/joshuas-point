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
  const hasMapData = Boolean(coordinates || labels?.length || markers?.length || routes?.length)

  return (
    <EditorialMapSection
      coordinates={coordinates}
      directionsUrl={directionsUrl}
      eyebrow={hasMapData ? 'Dive map' : 'Dive location'}
      explorerHref="/explorer"
      heading={hasMapData ? 'A point below the surface.' : 'The dive area in the guide.'}
      locationLabel={locationLabel ?? diveSiteName}
      titleId="dive-site-map-title"
    >
      {hasMapData ? (
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
      ) : null}
    </EditorialMapSection>
  )
}
