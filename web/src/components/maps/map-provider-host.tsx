'use client'

import dynamic from 'next/dynamic'
import type {ComponentType} from 'react'

import type {MapProviderAdapterProps, MapProviderName} from './types'

const GoogleMapsAdapter = dynamic<MapProviderAdapterProps>(() =>
  import('./providers/google-maps-adapter').then((module) => module.GoogleMapsAdapter),
)
const LeafletAdapter = dynamic<MapProviderAdapterProps>(() =>
  import('./providers/leaflet-adapter').then((module) => module.LeafletAdapter),
)
const MapLibreAdapter = dynamic<MapProviderAdapterProps>(() =>
  import('./providers/maplibre-adapter').then((module) => module.MapLibreAdapter),
)

const providerAdapters: Record<MapProviderName, ComponentType<MapProviderAdapterProps>> = {
  'google-maps': GoogleMapsAdapter,
  leaflet: LeafletAdapter,
  maplibre: MapLibreAdapter,
}

type MapProviderHostProps = MapProviderAdapterProps & {
  provider: MapProviderName
}

export function MapProviderHost({provider, ...adapterProps}: MapProviderHostProps) {
  const Adapter = providerAdapters[provider]
  return <Adapter {...adapterProps} />
}
