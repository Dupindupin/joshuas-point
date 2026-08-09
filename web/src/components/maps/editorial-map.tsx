import {EditorialText} from '@/components/editorial'

import {EditorialMapPlaceholder} from './editorial-map-placeholder'
import {MapProviderHost} from './map-provider-host'
import {resolveMapProvider} from './map-provider'
import {normalizeEditorialMapData} from './normalize-map-data'
import type {EditorialMapData, MapProviderName, NormalizedEditorialMapData} from './types'

export type EditorialMapProps = EditorialMapData & {
  ariaLabel: string
  caption?: string
  className?: string
  provider?: MapProviderName | null
}

function formatCoordinates({latitude, longitude}: {latitude: number; longitude: number}) {
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
}

function EditorialMapSummary({data}: {data: NormalizedEditorialMapData}) {
  const primaryCoordinates = data.coordinates ?? data.viewport.center

  return (
    <div className="sr-only">
      {primaryCoordinates ? <p>Map center: {formatCoordinates(primaryCoordinates)}.</p> : null}
      {data.markers.length > 0 ? (
        <ul>
          {data.markers.map((marker) => (
            <li key={marker.id}>
              {marker.label}: {formatCoordinates(marker.coordinates)}
              {marker.description ? `. ${marker.description}` : ''}
            </li>
          ))}
        </ul>
      ) : null}
      {data.labels.length > 0 ? (
        <ul>
          {data.labels.map((label) => (
            <li key={label.id}>
              {label.text}: {formatCoordinates(label.coordinates)}
            </li>
          ))}
        </ul>
      ) : null}
      {data.routes.map((route) => (
        <p key={route.id}>
          {route.label ?? 'Route'} with {route.coordinates.length} mapped points
          {route.description ? `. ${route.description}` : ''}.
        </p>
      ))}
    </div>
  )
}

export function EditorialMap({
  ariaLabel,
  caption,
  className = '',
  coordinates,
  labels,
  markers,
  provider: providerOverride,
  routes,
  viewport,
}: EditorialMapProps) {
  const data = normalizeEditorialMapData({coordinates, labels, markers, routes, viewport})
  const provider = resolveMapProvider(providerOverride)

  return (
    <figure className={className}>
      {provider ? (
        <MapProviderHost ariaLabel={ariaLabel} data={data} provider={provider} />
      ) : (
        <EditorialMapPlaceholder ariaLabel={ariaLabel} data={data} />
      )}
      <EditorialMapSummary data={data} />
      {caption ? (
        <EditorialText as="figcaption" className="mt-4 max-w-xl" variant="caption">
          {caption}
        </EditorialText>
      ) : null}
    </figure>
  )
}
