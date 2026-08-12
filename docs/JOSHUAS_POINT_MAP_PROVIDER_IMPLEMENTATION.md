# Joshua's Point — MapLibre Provider Implementation

**Status:** MapLibre adapter implemented; environment activation and launch review remain
**Decision date:** 11 August 2026

## Decision

Joshua's Point uses **MapLibre GL JS** as its interactive map renderer. MapLibre preserves the
existing provider-neutral interface while keeping the renderer open source and independent of a
proprietary map SDK.

The bundled Joshua's Point light and dark styles use vector tiles and glyphs from the
**OpenFreeMap public instance**. OpenFreeMap publishes OpenStreetMap-derived OpenMapTiles data for
MapLibre without API keys, accounts, cookies, or tracking. It also publishes its production stack
for self-hosting, so the project can move to owner-controlled infrastructure without changing page
components or editorial content.

The project does **not** use `tile.openstreetmap.org`. OpenStreetMap data is open, but the OSM
Foundation's public raster tile servers have a separate usage policy, limited capacity, and no SLA.

## Architecture

The provider boundary remains unchanged:

- `EditorialMapData` carries coordinates, markers, labels, routes, and viewport values.
- `MapProviderHost` dynamically imports only the selected provider adapter.
- `MapLibreAdapter` owns all MapLibre objects and browser behavior.
- Page components, GROQ results, Sanity documents, and the Relationship Engine contain no provider
  SDK objects.
- Explorer, destination, scenic-route, and dive-area maps use the same adapter automatically.
- A missing provider, unsupported WebGL, invalid style, network error, or load timeout returns the
  existing editorial fallback.
- Every map retains its adjacent semantic list or textual location information.

Map creation and tile requests are deferred until the map is within 480 pixels of the viewport.
This keeps below-the-fold maps from competing with hero photography and primary page content.

## Configuration

```dotenv
NEXT_PUBLIC_MAP_PROVIDER=maplibre

# Optional. These local styles are used automatically when the variables are omitted.
NEXT_PUBLIC_MAPLIBRE_STYLE_URL_LIGHT=/maps/styles/joshuas-point-light.json
NEXT_PUBLIC_MAPLIBRE_STYLE_URL_DARK=/maps/styles/joshuas-point-dark.json
```

No access token or browser credential is required for the OpenFreeMap public instance. Style URLs
remain configurable so Joshua's Point can later use an owner-controlled CDN or self-hosted
OpenMapTiles-compatible service.

To test the no-provider experience, omit `NEXT_PUBLIC_MAP_PROVIDER` or give it an unsupported value.
Do not place secrets in `NEXT_PUBLIC_*` variables.

## Joshua's Point styles

The styles are stored with the frontend:

- `/maps/styles/joshuas-point-light.json`
- `/maps/styles/joshuas-point-dark.json`

They intentionally use a small, editorial layer set rather than a generic travel-map treatment.

### Light

- warm linen land canvas;
- quiet forest, grass, farmland, and sand;
- restrained blue-green water;
- pale roads with warm primary-road emphasis;
- charcoal place labels and muted water labels;
- no dense commercial POI layer, 3D buildings, or decorative clutter.

### Dark

- deep charcoal land rather than pure black;
- muted forest and warm stone land uses;
- deep ocean and legible waterways;
- restrained timber warmth on major roads;
- warm off-white labels with dark halos;
- the same information hierarchy as light mode rather than a simple inversion.

Marker and route overlays use Joshua's Point semantic UI colors. Photography is never tinted or
altered by the map theme.

## Tile and style source

The bundled styles reference:

- TileJSON/vector source: `https://tiles.openfreemap.org/planet`
- Glyphs: `https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf`
- Schema: OpenMapTiles
- Underlying geographic data: OpenStreetMap contributors

OpenFreeMap's public service is free and permits commercial use, but it is provided as-is with no
SLA or personalized support. It must be treated as an external operational dependency. Before
launch:

1. review the current OpenFreeMap terms and privacy policy;
2. preserve normal browser caching;
3. do not scrape, bulk-download, pre-seed, or use automated map movement to harvest tiles;
4. monitor availability and frontend errors;
5. maintain the text/list fallback;
6. plan self-hosting or another OpenMapTiles-compatible host if traffic or availability requires it;
7. consider supporting OpenFreeMap if the public service remains the production source.

The project must not silently switch to OSM Foundation raster tiles as a fallback.

## Attribution

Attribution is embedded in both local style sources and displayed by MapLibre's attribution
control:

> OpenFreeMap © OpenMapTiles Data from OpenStreetMap

The linked attribution must remain visible and readable on desktop and mobile in both themes. Do
not cover it, remove it, move it off-screen, or recolor it into illegibility. Printed, downloaded,
or future offline map products require a separate attribution review.

## Accessibility

- Markers are native buttons with descriptive labels and visible focus.
- Enter and Space activate focused markers.
- Selected markers use `aria-pressed` plus shape/scale—not color alone.
- MapLibre keyboard navigation and zoom controls remain enabled.
- Rotation is disabled to keep orientation predictable.
- Cooperative gestures protect page scrolling on touch and desktop.
- The editorial list remains the complete, keyboard-accessible discovery interface.
- Route stories remain reachable from the list even though a canvas route line is not itself the
  primary keyboard interaction.
- Reduced-motion preferences remove marker transitions.

## Privacy and performance

- No tracking SDK or provider analytics script is installed.
- Only the npm `maplibre-gl` package is loaded; there is no external JavaScript CDN.
- The provider is code-split behind the existing dynamic adapter.
- Map creation and external style/tile requests are deferred until near the viewport.
- One map is initialized per visible editorial experience.
- Routes use existing compact GeoJSON and no geocoding or directions request is made at runtime.
- Failure does not remove content, links, or textual locations.

Using the OpenFreeMap public instance still sends normal browser requests to its tile CDN. The
privacy notice should identify that external map source before launch. OpenFreeMap states that it
does not use cookies or tracking, while its CDN and security procedures remain governed by its
published privacy policy and terms.

## Coordinate boundaries

- Joshua's Point receives no map marker until Tobias approves a safe public coordinate.
- The approved public location label remains Calango, Zamboanguita, Negros Oriental, Philippines.
- Broad Apo Island, Dauin, and Zamboanguita area markers may be shown where already approved.
- Technical dive-site coordinates, depth, current, difficulty, conditions, and safety information
  remain excluded until qualified review.
- Missing coordinates produce text-only content and never estimated markers.

## Launch checklist

- [x] MapLibre replaces Mapbox in the selected provider adapter.
- [x] Mapbox SDK, token, and style requirements are removed.
- [x] Local light and dark Joshua's Point styles are included.
- [x] OpenFreeMap/OpenMapTiles/OpenStreetMap attribution is embedded in both styles.
- [x] Markers, routes, viewport fitting, selection, controls, and theme switching use the shared
      provider-neutral contract.
- [x] Map loading is deferred until near the viewport.
- [x] The missing-provider and runtime-error fallback remains available.
- [ ] Set `NEXT_PUBLIC_MAP_PROVIDER=maplibre` in the intended local/deployment environment.
- [ ] Review the final styles with live OpenFreeMap tiles on representative Southern Negros pages.
- [ ] Add the map source to the public privacy disclosure.
- [ ] Establish availability monitoring and a self-hosting/alternate-host contingency.
- [ ] Approve a safe Joshua's Point public coordinate only if a property marker is desired.

## Official references

- [MapLibre GL JS documentation](https://maplibre.org/maplibre-gl-js/docs/)
- [OpenFreeMap quick start and custom styles](https://openfreemap.org/quick_start/)
- [OpenFreeMap service overview and attribution](https://openfreemap.org/)
- [OpenFreeMap terms](https://openfreemap.org/tos/)
- [OpenFreeMap privacy policy](https://openfreemap.org/privacy/)
- [OpenStreetMap Foundation tile usage policy](https://operations.osmfoundation.org/policies/tiles/)
