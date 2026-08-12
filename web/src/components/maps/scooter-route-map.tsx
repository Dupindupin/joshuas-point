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
  const labelledRoutes = routes?.map((route, index) => ({
    ...route,
    featuredLabel: route.featuredLabel ?? index === 0,
  }))
  const hasMapData = Boolean(coordinates || labels?.length || markers?.length || routes?.length)

  return (
    <EditorialMapSection
      coordinates={coordinates}
      directionsUrl={directionsUrl}
      eyebrow="Route"
      explorerHref="/explorer"
      heading={hasMapData ? 'The road as part of the journey.' : 'The journey in the guide.'}
      locationLabel={originLabel ?? routeName}
      titleId="scooter-route-map-title"
    >
      {hasMapData ? (
        <EditorialMap
          ariaLabel={`Map of ${routeName}`}
          caption="Use this route for orientation, not as turn-by-turn navigation. Road conditions can change."
          coordinates={coordinates}
          labels={labels}
          markers={routeMarkers}
          provider={provider}
          routes={labelledRoutes}
          selectedItemId={labelledRoutes?.[0]?.id ?? routeMarkers[0]?.id}
          viewport={viewport}
        />
      ) : null}
    </EditorialMapSection>
  )
}
