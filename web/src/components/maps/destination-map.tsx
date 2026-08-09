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
  if (!coordinates && !locationLabel && !labels?.length && !markers?.length && !routes?.length) {
    return null
  }

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

  return (
    <EditorialMapSection
      coordinates={coordinates}
      directionsUrl={directionsUrl}
      eyebrow="Map"
      heading="A point in the landscape."
      locationLabel={locationLabel}
      titleId="destination-map-title"
    >
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
    </EditorialMapSection>
  )
}
