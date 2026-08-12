'use client'

import Link from 'next/link'
import {useMemo, useState} from 'react'

import {EditorialMap} from '@/components/maps'
import type {
  EditorialMapBounds,
  EditorialMapMarker,
  EditorialMapRoute,
  MapCoordinates,
} from '@/components/maps'
import type {ExplorerCategoryId, ExplorerItem} from '@/sanity/queries/explorer'

type ExplorerMapExperienceProps = {
  items: readonly ExplorerItem[]
}

type ExplorerFilter = 'all' | ExplorerCategoryId

const categoryDetails: Record<
  ExplorerCategoryId,
  {label: string; markerClass: string; pluralLabel: string}
> = {
  destination: {
    label: 'Destination',
    markerClass: 'bg-accent',
    pluralLabel: 'Destinations',
  },
  'dive-site': {
    label: 'Dive area',
    markerClass: 'bg-ocean',
    pluralLabel: 'Dive Areas',
  },
  'joshua-point': {
    label: "Joshua's Point",
    markerClass: 'bg-timber',
    pluralLabel: "Joshua's Point",
  },
  'scenic-route': {
    label: 'Scenic route',
    markerClass: 'bg-forest',
    pluralLabel: 'Scenic Routes',
  },
}

const categoryOrder: readonly ExplorerCategoryId[] = [
  'joshua-point',
  'destination',
  'scenic-route',
  'dive-site',
]

function getBounds(coordinates: readonly MapCoordinates[]): EditorialMapBounds | undefined {
  if (coordinates.length === 0) return undefined

  const latitudes = coordinates.map(({latitude}) => latitude)
  const longitudes = coordinates.map(({longitude}) => longitude)

  return {
    northEast: {
      latitude: Math.max(...latitudes),
      longitude: Math.max(...longitudes),
    },
    southWest: {
      latitude: Math.min(...latitudes),
      longitude: Math.min(...longitudes),
    },
  }
}

function hasMapData(item: ExplorerItem) {
  return Boolean(item.coordinates || (item.route && item.route.length > 1))
}

function coordinateKey(coordinates: MapCoordinates) {
  return `${coordinates.latitude.toFixed(6)},${coordinates.longitude.toFixed(6)}`
}

export function ExplorerMapExperience({items}: ExplorerMapExperienceProps) {
  const categoryIds = categoryOrder.filter((category) =>
    items.some((item) => item.category === category),
  )
  const initialSelection = items.find(hasMapData)?.id ?? items[0]?.id ?? null
  const [activeFilter, setActiveFilter] = useState<ExplorerFilter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(initialSelection)
  const visibleItems = useMemo(
    () => items.filter((item) => activeFilter === 'all' || item.category === activeFilter),
    [activeFilter, items],
  )
  const selectedItem = visibleItems.find((item) => item.id === selectedId) ?? visibleItems[0]
  const markers: EditorialMapMarker[] = Array.from(
    visibleItems.reduce<Map<string, {coordinates: MapCoordinates; item: ExplorerItem}>>(
      (uniqueItems, item) => {
        if (!item.coordinates) return uniqueItems

        const key = coordinateKey(item.coordinates)
        const existing = uniqueItems.get(key)
        if (
          !existing ||
          (existing.item.category !== 'destination' && item.category === 'destination')
        ) {
          uniqueItems.set(key, {coordinates: item.coordinates, item})
        }
        return uniqueItems
      },
      new Map(),
    ),
    ([, {coordinates, item}]) => ({
      coordinates,
      description: item.description,
      featuredLabel: item.category === 'joshua-point',
      id: item.id,
      kind:
        item.id.startsWith('gateway-')
          ? 'route-stop'
          : item.category === 'destination'
          ? 'destination'
          : item.category === 'dive-site'
            ? 'dive-site'
            : 'origin',
      label: item.title,
    }),
  )
  const routes: EditorialMapRoute[] = visibleItems.flatMap((item) =>
    item.route && item.route.length > 1
      ? [
          {
            coordinates: item.route,
            description: item.description,
            id: item.id,
            label: item.title,
          },
        ]
      : [],
  )
  const bounds = getBounds([
    ...markers.map((marker) => marker.coordinates),
    ...routes.flatMap((route) => route.coordinates),
  ])
  const mappedCount = markers.length + routes.length
  const selectedCoordinates = selectedItem?.coordinates
  const selectedMapItemId = selectedCoordinates
    ? markers.find(
        (marker) => coordinateKey(marker.coordinates) === coordinateKey(selectedCoordinates),
      )?.id
    : selectedItem?.route
      ? selectedItem.id
      : undefined

  function selectFilter(filter: ExplorerFilter) {
    const nextItems = items.filter((item) => filter === 'all' || item.category === filter)
    setActiveFilter(filter)
    setSelectedId(nextItems.find(hasMapData)?.id ?? nextItems[0]?.id ?? null)
  }

  return (
    <div>
      <div aria-label="Filter Explorer map" className="flex flex-wrap gap-2" role="group">
        <button
          aria-pressed={activeFilter === 'all'}
          className="min-h-11 rounded-full border border-border px-5 py-2 font-body text-xs font-semibold tracking-[0.06em] text-ink transition-colors hover:border-ink/50 hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus aria-pressed:border-ink aria-pressed:bg-inverse-surface aria-pressed:text-inverse"
          onClick={() => selectFilter('all')}
          type="button"
        >
          Places & routes
        </button>
        {categoryIds.map((category) => (
          <button
            aria-pressed={activeFilter === category}
            className="min-h-11 rounded-full border border-border px-5 py-2 font-body text-xs font-semibold tracking-[0.06em] text-ink transition-colors hover:border-ink/50 hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus aria-pressed:border-ink aria-pressed:bg-inverse-surface aria-pressed:text-inverse"
            key={category}
            onClick={() => selectFilter(category)}
            type="button"
          >
            {categoryDetails[category].pluralLabel}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-y border-border py-5">
        <ul aria-label="Map legend" className="flex flex-wrap gap-x-6 gap-y-3">
          {categoryIds.map((category) => (
            <li className="flex items-center gap-2 font-body text-xs text-ink-muted" key={category}>
              <span
                aria-hidden="true"
                className={`size-2 rounded-full ${categoryDetails[category].markerClass}`}
              />
              {categoryDetails[category].pluralLabel}
            </li>
          ))}
        </ul>
        <p className="font-body text-xs text-ink-subtle" role="status">
          {mappedCount} {mappedCount === 1 ? 'place or route' : 'places and routes'} on the map
        </p>
      </div>

      <div className="mt-10 grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1.7fr)_minmax(20rem,0.8fr)] xl:items-start">
        <div className="min-w-0 xl:sticky xl:top-28">
          <EditorialMap
            ariaLabel={`Southern Negros Explorer showing ${mappedCount} mapped ${mappedCount === 1 ? 'place' : 'places'}`}
            caption="Use the list alongside the map. Every story remains available when a marker or the interactive map is unavailable."
            className="min-w-0"
            markers={markers}
            onItemSelect={setSelectedId}
            routes={routes}
            selectedItemId={selectedMapItemId}
            viewport={bounds ? {bounds, padding: 48} : undefined}
          />

          {selectedItem ? (
            <div
              aria-live="polite"
              className="border-r border-b border-l border-border bg-surface px-6 py-6 sm:px-8"
            >
              <p className="font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-ink-subtle uppercase">
                Selected · {categoryDetails[selectedItem.category].label}
              </p>
              <div className="mt-3 flex flex-wrap items-baseline justify-between gap-4">
                <h2 className="font-display text-3xl leading-tight text-ink">
                  {selectedItem.title}
                </h2>
                <Link
                  className="rounded-sm font-body text-sm font-semibold text-ink underline decoration-ink/35 underline-offset-4 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                  href={selectedItem.href}
                >
                  Read the story
                </Link>
              </div>
              {selectedItem.description ? (
                <p className="mt-4 max-w-2xl font-body text-sm leading-7 text-ink-muted">
                  {selectedItem.description}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="min-w-0">
          <h2 className="font-display text-4xl leading-tight text-ink">Explore the guide</h2>
          <p className="mt-5 max-w-md font-body text-sm leading-7 text-ink-muted">
            Choose a place or route, find its position in the wider landscape, then continue to the
            full story.
          </p>

          <div className="mt-10 space-y-12">
            {categoryIds.map((category) => {
              const categoryItems = visibleItems.filter((item) => item.category === category)
              if (categoryItems.length === 0) return null

              return (
                <section aria-labelledby={`explorer-${category}-title`} key={category}>
                  <h3
                    className="font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-ink-subtle uppercase"
                    id={`explorer-${category}-title`}
                  >
                    {categoryDetails[category].pluralLabel}
                  </h3>
                  <ul className="mt-4 border-t border-border">
                    {categoryItems.map((item) => {
                      const isSelected = item.id === selectedItem?.id
                      return (
                        <li className="border-b border-border py-5" key={item.id}>
                          <div className="flex items-start justify-between gap-5">
                            <button
                              aria-label={`Select ${item.title} in the Explorer`}
                              aria-pressed={isSelected}
                              className="min-w-0 flex-1 rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                              onClick={() => setSelectedId(item.id)}
                              type="button"
                            >
                              <span className="block font-display text-2xl leading-tight text-ink">
                                {item.title}
                              </span>
                              <span className="mt-2 block font-body text-xs text-ink-subtle">
                                {hasMapData(item) ? 'Shown on map' : 'Read the guide'}
                                {isSelected ? ' · Selected' : ''}
                              </span>
                            </button>
                            <Link
                              aria-label={`Read about ${item.title}`}
                              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border font-body text-sm text-ink transition-colors hover:border-ink/50 hover:bg-surface-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                              href={item.href}
                            >
                              <span aria-hidden="true">↗</span>
                            </Link>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
