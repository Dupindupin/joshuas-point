import {EditorialMap, type EditorialMapProps} from './editorial-map'
import {EditorialMapSection} from './editorial-map-section'
import type {EditorialMapMarker} from './types'

export type DestinationMapProps = Omit<EditorialMapProps, 'ariaLabel' | 'caption'> & {
  destinationTitle: string
  directionsUrl?: string
  locationLabel?: string
}

export function DestinationMap({
  coordinates,
  destinationTitle,
  directionsUrl,
  labels,
  locationLabel,
  markers,
  provider,
  routes,
  viewport,
}: DestinationMapProps) {
  const destinationMarkers: readonly EditorialMapMarker[] =
    markers ??
    (coordinates
      ? [
          {
            coordinates,
            id: 'destination',
            kind: 'destination',
            label: locationLabel ?? destinationTitle,
          },
        ]
      : [])
  const hasMapData = Boolean(coordinates || labels?.length || markers?.length || routes?.length)

  return (
    <EditorialMapSection
      coordinates={coordinates}
      directionsUrl={directionsUrl}
      eyebrow={hasMapData ? 'Map' : 'Location'}
      explorerHref="/explorer"
      heading={hasMapData ? 'A point in the landscape.' : 'The place in the guide.'}
      locationLabel={locationLabel ?? destinationTitle}
      titleId="destination-map-title"
    >
      {hasMapData ? (
        <EditorialMap
          ariaLabel={`Map of ${destinationTitle}`}
          caption="Location details remain available beside the map when an interactive provider is unavailable."
          coordinates={coordinates}
          labels={labels}
          markers={destinationMarkers}
          provider={provider}
          routes={routes}
          viewport={viewport ?? (coordinates ? {center: coordinates, zoom: 12} : undefined)}
        />
      ) : null}
    </EditorialMapSection>
  )
}
