import {EditorialMap} from './editorial-map'
import {EditorialMapSection} from './editorial-map-section'
import type {MapCoordinates} from './types'

export type GettingHereMapProps = {
  coordinates?: MapCoordinates
  directionsUrl?: string
  locationLabel: string
}

export function GettingHereMap({
  coordinates,
  directionsUrl,
  locationLabel,
}: GettingHereMapProps) {
  return (
    <EditorialMapSection
      coordinates={coordinates}
      directionsUrl={directionsUrl}
      eyebrow="Orientation"
      explorerHref="/explorer"
      heading="The final part of the journey."
      locationLabel={locationLabel}
      titleId="getting-here-map-title"
    >
      {coordinates ? (
        <EditorialMap
          ariaLabel="Map showing the published Joshua’s Point arrival location"
          caption="The written arrival guidance remains available if the interactive map cannot load."
          coordinates={coordinates}
          markers={[
            {
              coordinates,
              id: 'joshua-point-arrival',
              kind: 'origin',
              label: locationLabel,
            },
          ]}
          viewport={{center: coordinates, zoom: 11}}
        />
      ) : null}
    </EditorialMapSection>
  )
}
