import type {
  EditorialMapData,
  EditorialMapLabel,
  EditorialMapMarker,
  EditorialMapRoute,
  EditorialMapViewport,
  MapCoordinates,
  NormalizedEditorialMapData,
} from './types'

export function isMapCoordinates(value: MapCoordinates | undefined): value is MapCoordinates {
  return Boolean(
    value &&
    Number.isFinite(value.latitude) &&
    value.latitude >= -90 &&
    value.latitude <= 90 &&
    Number.isFinite(value.longitude) &&
    value.longitude >= -180 &&
    value.longitude <= 180,
  )
}

function normalizeMarkers(markers: readonly EditorialMapMarker[] | undefined) {
  return (markers ?? []).filter(
    (marker) => marker.id.trim() && marker.label.trim() && isMapCoordinates(marker.coordinates),
  )
}

function normalizeLabels(labels: readonly EditorialMapLabel[] | undefined) {
  return (labels ?? []).filter(
    (label) => label.id.trim() && label.text.trim() && isMapCoordinates(label.coordinates),
  )
}

function normalizeRoutes(routes: readonly EditorialMapRoute[] | undefined) {
  return (routes ?? []).reduce<EditorialMapRoute[]>((normalizedRoutes, route) => {
    const coordinates = route.coordinates.filter(isMapCoordinates)
    if (!route.id.trim() || coordinates.length < 2) return normalizedRoutes

    normalizedRoutes.push({...route, coordinates})
    return normalizedRoutes
  }, [])
}

function normalizeViewport(
  viewport: EditorialMapViewport | undefined,
  fallbackCenter: MapCoordinates | undefined,
): EditorialMapViewport {
  const center = isMapCoordinates(viewport?.center) ? viewport.center : fallbackCenter
  const bounds =
    isMapCoordinates(viewport?.bounds?.northEast) && isMapCoordinates(viewport?.bounds?.southWest)
      ? viewport.bounds
      : undefined

  return {
    bounds,
    center,
    padding:
      typeof viewport?.padding === 'number' && Number.isFinite(viewport.padding)
        ? Math.max(0, viewport.padding)
        : undefined,
    zoom:
      typeof viewport?.zoom === 'number' && Number.isFinite(viewport.zoom)
        ? viewport.zoom
        : undefined,
  }
}

export function normalizeEditorialMapData({
  coordinates,
  labels,
  markers,
  routes,
  viewport,
}: EditorialMapData): NormalizedEditorialMapData {
  const normalizedCoordinates = isMapCoordinates(coordinates) ? coordinates : undefined
  const normalizedMarkers = normalizeMarkers(markers)
  const normalizedLabels = normalizeLabels(labels)
  const normalizedRoutes = normalizeRoutes(routes)
  const fallbackCenter =
    normalizedCoordinates ??
    normalizedMarkers[0]?.coordinates ??
    normalizedLabels[0]?.coordinates ??
    normalizedRoutes[0]?.coordinates[0]

  return {
    coordinates: normalizedCoordinates,
    labels: normalizedLabels,
    markers: normalizedMarkers,
    routes: normalizedRoutes,
    viewport: normalizeViewport(viewport, fallbackCenter),
  }
}
