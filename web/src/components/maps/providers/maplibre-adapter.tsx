'use client'

import * as maplibregl from 'maplibre-gl'
import type {Map as MapLibreMap, MapOptions} from 'maplibre-gl'
import {useEffect, useMemo, useRef, useState} from 'react'

import {EditorialMapPlaceholder} from '../editorial-map-placeholder'
import type {
  MapCoordinates,
  MapProviderAdapterProps,
  NormalizedEditorialMapData,
} from '../types'

// MapLibre v6's worker imports its shared ESM sibling. Serving both files from a
// stable, same-origin path keeps that import intact in Next.js dev and production.
maplibregl.setWorkerUrl('/maps/maplibre/maplibre-gl-worker.mjs')

type MapStatus = 'failed' | 'loading' | 'ready'
type ResolvedTheme = 'dark' | 'light'

type RenderedMarker = {
  element: HTMLButtonElement
}

type RenderedRouteLabel = {
  element: HTMLButtonElement
}

const ROUTE_SOURCE_ID = 'jp-editorial-routes'
const ROUTE_LAYER_ID = 'jp-editorial-routes-line'

function getResolvedTheme(): ResolvedTheme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function useResolvedTheme() {
  const [theme, setTheme] = useState<ResolvedTheme>('light')

  useEffect(() => {
    function updateTheme() {
      setTheme(getResolvedTheme())
    }

    updateTheme()
    window.addEventListener('jp-theme-change', updateTheme)
    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {attributeFilter: ['data-theme'], attributes: true})

    return () => {
      observer.disconnect()
      window.removeEventListener('jp-theme-change', updateTheme)
    }
  }, [])

  return theme
}

function getMapLibreConfiguration(theme: ResolvedTheme) {
  const lightStyle =
    process.env.NEXT_PUBLIC_MAPLIBRE_STYLE_URL_LIGHT?.trim() ||
    '/maps/styles/joshuas-point-light.json'
  const darkStyle =
    process.env.NEXT_PUBLIC_MAPLIBRE_STYLE_URL_DARK?.trim() ||
    '/maps/styles/joshuas-point-dark.json'

  return {style: theme === 'dark' ? darkStyle : lightStyle}
}

function toLngLat(coordinates: MapCoordinates): [number, number] {
  return [coordinates.longitude, coordinates.latitude]
}

function getAllCoordinates(data: NormalizedEditorialMapData) {
  return [
    ...data.markers.map((marker) => marker.coordinates),
    ...data.labels.map((label) => label.coordinates),
    ...data.routes.flatMap((route) => route.coordinates),
  ]
}

function getMapBounds(data: NormalizedEditorialMapData) {
  if (data.viewport.bounds) {
    return [
      toLngLat(data.viewport.bounds.southWest),
      toLngLat(data.viewport.bounds.northEast),
    ] as [[number, number], [number, number]]
  }

  const coordinates = getAllCoordinates(data)
  if (coordinates.length < 2) return undefined

  const longitudes = coordinates.map(({longitude}) => longitude)
  const latitudes = coordinates.map(({latitude}) => latitude)
  return [
    [Math.min(...longitudes), Math.min(...latitudes)],
    [Math.max(...longitudes), Math.max(...latitudes)],
  ] as [[number, number], [number, number]]
}

function getMapCenterLongitude(data: NormalizedEditorialMapData) {
  if (data.viewport.center) return data.viewport.center.longitude
  if (data.viewport.bounds) {
    return (
      (data.viewport.bounds.southWest.longitude + data.viewport.bounds.northEast.longitude) / 2
    )
  }

  const coordinates = getAllCoordinates(data)
  if (coordinates.length === 0) return 0
  const longitudes = coordinates.map(({longitude}) => longitude)
  return (Math.min(...longitudes) + Math.max(...longitudes)) / 2
}

function getRouteLabelCoordinates(route: NormalizedEditorialMapData['routes'][number]) {
  return route.coordinates[Math.floor((route.coordinates.length - 1) / 2)]
}

function createPopupContent(label: string, description?: string) {
  const content = document.createElement('div')
  content.className = 'jp-map-popup-content'

  const heading = document.createElement('p')
  heading.className = 'jp-map-popup-title'
  heading.textContent = label
  content.append(heading)

  if (description) {
    const body = document.createElement('p')
    body.className = 'jp-map-popup-description'
    body.textContent = description
    content.append(body)
  }

  return content
}

function createRouteData(data: NormalizedEditorialMapData) {
  return {
    features: data.routes.map((route) => ({
      geometry: {
        coordinates: route.coordinates.map(toLngLat),
        type: 'LineString' as const,
      },
      id: route.id,
      properties: {id: route.id, label: route.label ?? 'Scenic route'},
      type: 'Feature' as const,
    })),
    type: 'FeatureCollection' as const,
  }
}

function routeWidth(selectedItemId: string | undefined) {
  return [
    'case',
    ['==', ['get', 'id'], selectedItemId ?? ''],
    6,
    3,
  ] as maplibregl.ExpressionSpecification
}

function routeColor(selectedItemId: string | undefined, theme: ResolvedTheme) {
  const selectedColor = theme === 'dark' ? '#e0b982' : '#a56f3a'
  const routeColorValue = theme === 'dark' ? '#d0a16b' : '#405548'
  return [
    'case',
    ['==', ['get', 'id'], selectedItemId ?? ''],
    selectedColor,
    routeColorValue,
  ] as maplibregl.ExpressionSpecification
}

export function MapLibreAdapter({
  ariaLabel,
  data,
  onItemSelect,
  selectedItemId,
}: MapProviderAdapterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const renderedMarkersRef = useRef<Map<string, RenderedMarker>>(new Map())
  const renderedRouteLabelsRef = useRef<Map<string, RenderedRouteLabel>>(new Map())
  const selectionHandlerRef = useRef(onItemSelect)
  const [internalSelectedId, setInternalSelectedId] = useState(
    data.markers[0]?.id ?? data.routes[0]?.id,
  )
  const [status, setStatus] = useState<MapStatus>('loading')
  const [shouldInitialize, setShouldInitialize] = useState(false)
  const theme = useResolvedTheme()
  const configuration = useMemo(() => getMapLibreConfiguration(theme), [theme])
  const activeSelectedId = selectedItemId ?? internalSelectedId
  const activeSelectedIdRef = useRef(activeSelectedId)
  const dataSignature = JSON.stringify(data)
  const stableData = useMemo(
    () => JSON.parse(dataSignature) as NormalizedEditorialMapData,
    [dataSignature],
  )

  useEffect(() => {
    selectionHandlerRef.current = onItemSelect
  }, [onItemSelect])

  useEffect(() => {
    activeSelectedIdRef.current = activeSelectedId
  }, [activeSelectedId])

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    if (!('IntersectionObserver' in window)) {
      queueMicrotask(() => setShouldInitialize(true))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setShouldInitialize(true)
        observer.disconnect()
      },
      {rootMargin: '480px 0px'},
    )
    observer.observe(wrapper)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldInitialize) return

    if (!containerRef.current) {
      setStatus('failed')
      return
    }

    setStatus('loading')
    const currentData = stableData
    const bounds = getMapBounds(currentData)
    const centerLongitude = getMapCenterLongitude(currentData)
    let removed = false
    let loaded = false
    const renderedMarkers = new Map<string, RenderedMarker>()
    const renderedRouteLabels = new Map<string, RenderedRouteLabel>()
    renderedMarkersRef.current = renderedMarkers
    renderedRouteLabelsRef.current = renderedRouteLabels

    const mapOptions: MapOptions = {
      attributionControl: {},
      boxZoom: true,
      container: containerRef.current,
      cooperativeGestures: true,
      dragRotate: false,
      keyboard: true,
      pitchWithRotate: false,
      style: configuration.style,
    }

    if (bounds) {
      mapOptions.bounds = bounds
      mapOptions.fitBoundsOptions = {
        maxZoom: currentData.viewport.zoom ?? 14,
        padding: currentData.viewport.padding ?? 48,
      }
    } else {
      mapOptions.center = toLngLat(
        currentData.viewport.center ?? {latitude: 0, longitude: 0},
      )
      mapOptions.zoom = currentData.viewport.zoom ?? 10
    }

    containerRef.current.replaceChildren()
    let map: MapLibreMap
    try {
      map = new maplibregl.Map(mapOptions)
    } catch {
      containerRef.current.replaceChildren()
      queueMicrotask(() => setStatus('failed'))
      return
    }
    mapRef.current = map
    map.touchZoomRotate.disableRotation()
    map.addControl(new maplibregl.NavigationControl({showCompass: false}), 'top-right')

    for (const markerData of currentData.markers) {
      const selectMarker = () => {
        setInternalSelectedId(markerData.id)
        selectionHandlerRef.current?.(markerData.id)
      }
      const element = document.createElement('button')
      element.type = 'button'
      element.className = 'jp-map-marker'
      element.dataset.featuredLabel = String(markerData.featuredLabel === true)
      element.dataset.kind = markerData.kind ?? 'destination'
      element.dataset.labelSide =
        markerData.coordinates.longitude >= centerLongitude ? 'left' : 'right'
      element.setAttribute('aria-label', `Show ${markerData.label} on the map`)
      element.setAttribute('aria-pressed', String(markerData.id === activeSelectedIdRef.current))
      element.title = markerData.label
      const label = document.createElement('span')
      label.ariaHidden = 'true'
      label.className = 'jp-map-marker-label'
      label.textContent = markerData.label
      element.append(label)
      const popup = new maplibregl.Popup({closeButton: true, maxWidth: '20rem', offset: 18}).setDOMContent(
        createPopupContent(markerData.label, markerData.description),
      )
      popup.on('open', selectMarker)
      new maplibregl.Marker({anchor: 'center', element})
        .setLngLat(toLngLat(markerData.coordinates))
        .setPopup(popup)
        .addTo(map)
      element.addEventListener('click', selectMarker, {capture: true})
      renderedMarkers.set(markerData.id, {element})
    }

    for (const route of currentData.routes) {
      const coordinates = getRouteLabelCoordinates(route)
      if (!coordinates || !route.label) continue

      const selectRoute = () => {
        setInternalSelectedId(route.id)
        selectionHandlerRef.current?.(route.id)
      }
      const element = document.createElement('button')
      const labelSide = coordinates.longitude >= centerLongitude ? 'left' : 'right'
      element.type = 'button'
      element.className = 'jp-map-route-label'
      element.dataset.featuredLabel = String(route.featuredLabel === true)
      element.dataset.labelSide = labelSide
      element.setAttribute('aria-label', `Select ${route.label} on the map`)
      element.setAttribute('aria-pressed', String(route.id === activeSelectedIdRef.current))
      element.textContent = route.label
      element.addEventListener('click', selectRoute)
      new maplibregl.Marker({
        anchor: labelSide === 'left' ? 'right' : 'left',
        element,
        offset: labelSide === 'left' ? [-14, 0] : [14, 0],
      })
        .setLngLat(toLngLat(coordinates))
        .addTo(map)
      renderedRouteLabels.set(route.id, {element})
    }

    for (const label of currentData.labels) {
      const element = document.createElement('span')
      element.ariaHidden = 'true'
      element.className = 'jp-map-label'
      element.textContent = label.text
      new maplibregl.Marker({anchor: 'bottom', element})
        .setLngLat(toLngLat(label.coordinates))
        .addTo(map)
    }

    const resizeObserver = new ResizeObserver(() => map.resize())
    resizeObserver.observe(containerRef.current)

    const loadTimeout = window.setTimeout(() => {
      if (loaded || removed) return
      removed = true
      resizeObserver.disconnect()
      map.remove()
      mapRef.current = null
      renderedMarkers.clear()
      renderedRouteLabels.clear()
      setStatus('failed')
    }, 20_000)

    map.on('style.load', () => {
      if (removed) return
      loaded = true
      if (loadTimeout) window.clearTimeout(loadTimeout)

      if (currentData.routes.length > 0) {
        map.addSource(ROUTE_SOURCE_ID, {data: createRouteData(currentData), type: 'geojson'})
        map.addLayer({
          id: ROUTE_LAYER_ID,
          layout: {'line-cap': 'round', 'line-join': 'round'},
          paint: {
            'line-color': routeColor(activeSelectedIdRef.current, theme),
            'line-opacity': 0.88,
            'line-width': routeWidth(activeSelectedIdRef.current),
          },
          source: ROUTE_SOURCE_ID,
          type: 'line',
        })

        map.on('click', ROUTE_LAYER_ID, (event) => {
          const routeId = (event.features?.[0] as {properties?: {id?: unknown}} | undefined)
            ?.properties?.id
          if (typeof routeId !== 'string') return
          setInternalSelectedId(routeId)
          selectionHandlerRef.current?.(routeId)
        })
        map.on('mouseenter', ROUTE_LAYER_ID, () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', ROUTE_LAYER_ID, () => {
          map.getCanvas().style.cursor = ''
        })
      }

      setStatus('ready')
    })

    return () => {
      removed = true
      window.clearTimeout(loadTimeout)
      resizeObserver.disconnect()
      renderedMarkers.clear()
      renderedRouteLabels.clear()
      if (mapRef.current === map) mapRef.current = null
      map.remove()
    }
  }, [configuration, shouldInitialize, stableData, theme])

  useEffect(() => {
    for (const [id, renderedMarker] of renderedMarkersRef.current) {
      renderedMarker.element.setAttribute('aria-pressed', String(id === activeSelectedId))
    }
    for (const [id, renderedRouteLabel] of renderedRouteLabelsRef.current) {
      renderedRouteLabel.element.setAttribute('aria-pressed', String(id === activeSelectedId))
    }

    const map = mapRef.current
    if (map?.getLayer(ROUTE_LAYER_ID)) {
      map.setPaintProperty(ROUTE_LAYER_ID, 'line-color', routeColor(activeSelectedId, theme))
      map.setPaintProperty(ROUTE_LAYER_ID, 'line-width', routeWidth(activeSelectedId))
    }
  }, [activeSelectedId, status, theme])

  if (status === 'failed') {
    return <EditorialMapPlaceholder ariaLabel={ariaLabel} data={data} provider="maplibre" />
  }

  return (
    <div
      aria-label={ariaLabel}
      className="relative min-h-[28rem] overflow-hidden bg-map-surface lg:min-h-[42rem]"
      data-map-provider="maplibre"
      data-map-theme={theme}
      ref={wrapperRef}
      role="region"
    >
      <div className="jp-maplibre-container absolute inset-0" ref={containerRef} />
      {status === 'loading' ? (
        <p
          aria-live="polite"
          className="absolute right-6 bottom-6 left-6 font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-inverse/72 uppercase"
        >
          {shouldInitialize ? 'Opening the map…' : 'Map ready when in view'}
        </p>
      ) : null}
    </div>
  )
}
