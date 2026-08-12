export type MapProviderName = 'google-maps' | 'leaflet' | 'maplibre'

export type MapCoordinates = {
  latitude: number
  longitude: number
}

export type MapMarkerKind = 'destination' | 'dive-site' | 'origin' | 'route-stop'

export type EditorialMapMarker = {
  coordinates: MapCoordinates
  description?: string
  featuredLabel?: boolean
  id: string
  kind?: MapMarkerKind
  label: string
}

export type EditorialMapLabel = {
  coordinates: MapCoordinates
  id: string
  text: string
}

export type EditorialMapRoute = {
  coordinates: readonly MapCoordinates[]
  description?: string
  featuredLabel?: boolean
  id: string
  label?: string
}

export type EditorialMapBounds = {
  northEast: MapCoordinates
  southWest: MapCoordinates
}

export type EditorialMapViewport = {
  bounds?: EditorialMapBounds
  center?: MapCoordinates
  padding?: number
  zoom?: number
}

/**
 * The shared, provider-neutral map interface used by every page-level map.
 * Provider SDK objects must never cross this boundary.
 */
export type EditorialMapData = {
  coordinates?: MapCoordinates
  labels?: readonly EditorialMapLabel[]
  markers?: readonly EditorialMapMarker[]
  routes?: readonly EditorialMapRoute[]
  viewport?: EditorialMapViewport
}

export type NormalizedEditorialMapData = {
  coordinates?: MapCoordinates
  labels: readonly EditorialMapLabel[]
  markers: readonly EditorialMapMarker[]
  routes: readonly EditorialMapRoute[]
  viewport: EditorialMapViewport
}

export type MapProviderAdapterProps = {
  ariaLabel: string
  data: NormalizedEditorialMapData
  onItemSelect?: (id: string) => void
  selectedItemId?: string
}
