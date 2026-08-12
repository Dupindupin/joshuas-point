import type {MapProviderName} from './types'

const supportedProviders = new Set<MapProviderName>(['google-maps', 'leaflet', 'maplibre'])

export function isMapProviderName(value: string | undefined): value is MapProviderName {
  return Boolean(value && supportedProviders.has(value as MapProviderName))
}

export function resolveMapProvider(
  override: MapProviderName | null | undefined,
): MapProviderName | null {
  if (override !== undefined) return override

  const configuredProvider = process.env.NEXT_PUBLIC_MAP_PROVIDER
  return isMapProviderName(configuredProvider) ? configuredProvider : null
}
