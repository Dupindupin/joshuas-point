'use client'

import {EditorialMapPlaceholder} from '../editorial-map-placeholder'
import type {MapProviderAdapterProps} from '../types'

/** Integration boundary for a future Leaflet renderer and approved tile source. */
export function LeafletAdapter(props: MapProviderAdapterProps) {
  return <EditorialMapPlaceholder {...props} provider="leaflet" />
}
