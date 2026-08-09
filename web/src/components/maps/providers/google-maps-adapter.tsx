'use client'

import {EditorialMapPlaceholder} from '../editorial-map-placeholder'
import type {MapProviderAdapterProps} from '../types'

/** Integration boundary for the future Google Maps JavaScript API implementation. */
export function GoogleMapsAdapter(props: MapProviderAdapterProps) {
  return <EditorialMapPlaceholder {...props} provider="google-maps" />
}
