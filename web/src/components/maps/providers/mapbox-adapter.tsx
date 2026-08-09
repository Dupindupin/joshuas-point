'use client'

import {EditorialMapPlaceholder} from '../editorial-map-placeholder'
import type {MapProviderAdapterProps} from '../types'

/** Integration boundary for the future Mapbox GL JS implementation. */
export function MapboxAdapter(props: MapProviderAdapterProps) {
  return <EditorialMapPlaceholder {...props} provider="mapbox" />
}
