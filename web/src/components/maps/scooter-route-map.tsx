import {EditorialMap, type EditorialMapProps} from './editorial-map'
import {EditorialMapSection} from './editorial-map-section'
import type {EditorialMapMarker} from './types'

export type ScooterRouteMapProps = Omit<EditorialMapProps, 'ariaLabel' | 'caption'> & {
  directionsUrl?: string
  originLabel?: string
  routeName: string
}

export function ScooterRouteMap({
  coordinates,
  directionsUrl,
  labels,
  markers,
  originLabel,
  provider,
  routeName,
  routes,
  viewport,
}: ScooterRouteMapProps) {
  if (!coordinates && !originLabel && !labels?.length && !markers?.length && !routes?.length) {
    return null
  }

  const routeMarkers: readonly EditorialMapMarker[] =
    markers ??
    (coordinates
      ? [
          {
            coordinates,
            id: 'route-origin',
            kind: 'origin',
            label: originLabel ?? `${routeName} origin`,
          },
        ]
      : [])

  return (
    <EditorialMapSection
      coordinates={coordinates}
      directionsUrl={directionsUrl}
      eyebrow="Route"
      heading="The road as part of the journey."
      locationLabel={originLabel}
      titleId="scooter-route-map-title"
    >
      <EditorialMap
        ariaLabel={`Map of ${routeName}`}
        caption="Route information is editorial guidance, not turn-by-turn navigation or a guarantee of current road conditions."
        coordinates={coordinates}
        labels={labels}
        markers={routeMarkers}
        provider={provider}
        routes={routes}
        viewport={viewport}
      />
    </EditorialMapSection>
  )
}
