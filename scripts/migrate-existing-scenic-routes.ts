import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-10'})
const reviewedAt = '2026-08-10T00:00:00.000Z'
const routeMapSource = 'https://joshuaspoint.com/explore-all-destinations/'

type RouteDifficulty = 'demanding' | 'easy' | 'moderate'
type RoadQuality = 'mixed' | 'paved' | 'rough' | 'variable'

type RouteSource = {
  distanceKilometres: number
  editorialIntroduction: string
  excerpt: string
  fuel: string
  id: string
  mapUrl: string
  parking: string
  photography: string
  relatedDestinations: string[]
  roadQuality: RoadQuality
  routeDifficulty: RouteDifficulty
  routeNotes: string
  safetyNotes: string
  slug: string
  stops: Array<{destinationId?: string; label: string; note: string}>
  story: Array<{body: string; heading: string}>
  title: string
  travelMinutes: number
  travelTime: string
}

const routes: RouteSource[] = [
  {
    distanceKilometres: 32.1,
    editorialIntroduction:
      'This is the simplest road north from Joshua’s Point: one coastal highway through Dauin and onward to Dumaguete. The sea stays close, and there is always a reason to pause for coffee or a look at the shore.',
    excerpt:
      'A relaxed coastal ride through Dauin to Dumaguete, with sea views and space to stop along the way.',
    fuel: 'Fuel stations are available around Dauin and on the approach to Dumaguete. Start with enough fuel for the return journey.',
    id: 'scenic-route-coastal-ride-to-dumaguete',
    mapUrl: '/coastal-ride-to-dumaguete/',
    parking:
      'Use established parking in Dauin or Dumaguete according to the place you choose to visit.',
    photography:
      'The coast near Dauin and the softer light along Dumaguete’s Rizal Boulevard offer natural places to pause with a camera.',
    relatedDestinations: ['destination-dauin', 'destination-dumaguete'],
    roadQuality: 'paved',
    routeDifficulty: 'easy',
    routeNotes:
      'Follow the coastal highway north through Dauin to Dumaguete. The route becomes busier as it approaches the city.',
    safetyNotes:
      'The highway is shared with jeepneys, tricycles and pedestrians. Ride or drive at an unhurried pace, especially through town centres.',
    slug: 'coastal-ride-to-dumaguete',
    stops: [
      {
        label: 'Joshua’s Point',
        note: 'The journey begins in the hills above Zamboanguita.',
      },
      {
        destinationId: 'destination-dauin',
        label: 'Dauin',
        note: 'A natural pause along the black-sand dive coast.',
      },
      {
        destinationId: 'destination-dumaguete',
        label: 'Dumaguete',
        note: 'Walk the boulevard, find coffee and let the city set the pace.',
      },
    ],
    story: [
      {
        body: 'The road leaves the hills and meets the coast before turning north. Fishing villages, small roadside stores and openings toward the sea make the journey feel close to everyday life.',
        heading: 'Along the Coast',
      },
      {
        body: 'Dauin is a good place to pause. The black-sand shore and the diving community give this stretch of coast a character of its own.',
        heading: 'A Pause in Dauin',
      },
      {
        body: 'Dumaguete changes the rhythm again. Coffee, the boulevard and a walk through the city make an easy ending before following the same road home.',
        heading: 'Into Dumaguete',
      },
    ],
    title: 'Coastal Ride to Dumaguete',
    travelMinutes: 40,
    travelTime: 'Around 40 minutes each way, before time spent at the stops.',
  },
  {
    distanceKilometres: 31,
    editorialIntroduction:
      'Valencia sits above the coast in the foothills. The road rises through farmland and forest, and the change in air and landscape is what makes this short journey memorable.',
    excerpt:
      'A climb from the coast into Valencia’s cooler highlands, with quiet roads and mountain scenery.',
    fuel: 'Begin the climb with enough fuel rather than depending on smaller highland stops.',
    id: 'scenic-route-valencia-highlands-loop',
    mapUrl: '/valencia-highlands-loop/',
    parking: 'Use established parking in Valencia or at the specific highland place you visit.',
    photography:
      'The climb opens back toward the coast in places, while farmland and forest give the higher road a different texture.',
    relatedDestinations: [
      'destination-valencia',
      'destination-casaroro-falls',
      'destination-pulangbato-falls',
    ],
    roadQuality: 'paved',
    routeDifficulty: 'moderate',
    routeNotes:
      'The paved road climbs steadily through a series of curves. Take time on both the ascent and descent.',
    safetyNotes:
      'Highland roads can be damp after rain. Slow down on the descent and ride or drive within your comfort level.',
    slug: 'valencia-highlands-loop',
    stops: [
      {
        label: 'Joshua’s Point',
        note: 'Begin above the coast before joining the road toward the highlands.',
      },
      {
        destinationId: 'destination-valencia',
        label: 'Valencia',
        note: 'A highland town and a doorway to waterfalls, forest and mountain roads.',
      },
    ],
    story: [
      {
        body: 'The road begins near the coast and gradually starts to climb. Farmland, forest and widening views make the transition visible long before Valencia arrives.',
        heading: 'Leaving Sea Level',
      },
      {
        body: 'Valencia is worth treating as part of the journey rather than only a junction. Coffee, markets and the cooler air give the day room to slow down.',
        heading: 'Time in the Highlands',
      },
      {
        body: 'The return reveals the coast again. Taking the descent quietly is part of the pleasure of this route.',
        heading: 'The Road Back Down',
      },
    ],
    title: 'Valencia Highlands Loop',
    travelMinutes: 39,
    travelTime: 'Around 40 minutes each way, before time spent in the highlands.',
  },
  {
    distanceKilometres: 53.5,
    editorialIntroduction:
      'This highland route brings together Casaroro Falls and Pulangbato Falls. They are very different places, and the road between them gives the day its shape.',
    excerpt:
      'A highland journey connecting the jungle gorge of Casaroro Falls with the mineral-red landscape of Pulangbato Falls.',
    fuel: 'Refuel in or before Valencia rather than relying on stops near the falls.',
    id: 'scenic-route-waterfall-explorer',
    mapUrl: '/waterfall-explorer/',
    parking: 'Use the established visitor parking at each waterfall and follow local instructions.',
    photography:
      'Casaroro’s narrow gorge and Pulangbato’s mineral-coloured rock tell two different stories of water in the highlands.',
    relatedDestinations: [
      'destination-valencia',
      'destination-casaroro-falls',
      'destination-pulangbato-falls',
    ],
    roadQuality: 'paved',
    routeDifficulty: 'demanding',
    routeNotes:
      'The verified route climbs through Valencia and continues along paved highland roads to the two waterfall areas.',
    safetyNotes:
      'Casaroro involves a long stairway and a walk through the gorge. Good footwear matters, particularly when surfaces are wet.',
    slug: 'waterfall-explorer',
    stops: [
      {
        label: 'Joshua’s Point',
        note: 'Start early enough to let the highland day unfold without rushing.',
      },
      {
        destinationId: 'destination-valencia',
        label: 'Valencia',
        note: 'Pause in the highland town before continuing toward the falls.',
      },
      {
        destinationId: 'destination-casaroro-falls',
        label: 'Casaroro Falls',
        note: 'The walk, the gorge and the waterfall are all part of the experience.',
      },
      {
        destinationId: 'destination-pulangbato-falls',
        label: 'Pulangbato Falls',
        note: 'A second waterfall landscape shaped by mineral-coloured rock.',
      },
    ],
    story: [
      {
        body: 'The day begins with the climb toward Valencia. Cooler air and greener roads prepare the way for two places shaped by water.',
        heading: 'Into the Highlands',
      },
      {
        body: 'At Casaroro, the descent and walk through the gorge matter as much as the waterfall. The effort gives the arrival its meaning.',
        heading: 'The Gorge',
      },
      {
        body: 'Pulangbato changes the atmosphere with mineral-red rock and a more open setting. Seeing both in one journey shows how varied the highlands can be.',
        heading: 'A Different Waterfall',
      },
    ],
    title: 'Waterfall Explorer',
    travelMinutes: 80,
    travelTime: 'Around 1 hour 20 minutes of travel before time spent at the stops.',
  },
  {
    distanceKilometres: 60.7,
    editorialIntroduction:
      'The road to Twin Lakes climbs beyond Valencia into rainforest and cooler mountain air. The journey is longer, but that gradual distance from the coast is part of the experience.',
    excerpt:
      'A longer mountain road into the rainforest landscape of Twin Lakes, with forest, water and cooler air at the end.',
    fuel: 'Refuel in or before Valencia before continuing into the higher roads.',
    id: 'scenic-route-twin-lakes-escape',
    mapUrl: '/twin-lakes-escape/',
    parking:
      'Use the established visitor parking at Twin Lakes and follow current local instructions.',
    photography:
      'Forest, lake water and changing mountain weather give this route its visual character. Leave space for mist and softer light rather than looking only for wide views.',
    relatedDestinations: ['destination-valencia', 'destination-twin-lakes'],
    roadQuality: 'paved',
    routeDifficulty: 'moderate',
    routeNotes:
      'The route climbs through Valencia and continues along paved mountain roads, with tighter bends in the final approach.',
    safetyNotes:
      'Take the higher bends slowly and allow more time when mist or rain changes visibility. Plan the return before dark.',
    slug: 'twin-lakes-escape',
    stops: [
      {
        label: 'Joshua’s Point',
        note: 'The long climb begins from the coast-facing hills.',
      },
      {
        destinationId: 'destination-valencia',
        label: 'Valencia',
        note: 'A natural pause before the road continues higher.',
      },
      {
        destinationId: 'destination-twin-lakes',
        label: 'Twin Lakes',
        note: 'Rainforest, lake water and mountain air at the end of the climb.',
      },
    ],
    story: [
      {
        body: 'The route first follows the familiar climb toward Valencia, then continues beyond it. With every turn, the coast feels a little farther away.',
        heading: 'Higher Into the Mountains',
      },
      {
        body: 'Rainforest closes around the road near the lakes. The air cools, the light softens and the journey settles into a quieter rhythm.',
        heading: 'Through the Forest',
      },
      {
        body: 'Lake Balinsasayao and Lake Danao reward time rather than a quick photograph. Water, forest and changing weather make the place feel different from one visit to the next.',
        heading: 'Time by the Water',
      },
    ],
    title: 'Twin Lakes Escape',
    travelMinutes: 80,
    travelTime: 'Around 1 hour 20 minutes each way, before time spent at Twin Lakes.',
  },
  {
    distanceKilometres: 86.2,
    editorialIntroduction:
      'This is the longest Joshua’s Point route: south to Siaton, inland toward Lake Balanan and onward to Najandig Peak. The changing road and landscape make it a full-day journey.',
    excerpt:
      'A full-day southern journey through Siaton toward Lake Balanan and the mountain landscape of Najandig Peak.',
    fuel: 'Refuel in Siaton before continuing inland and begin the return with enough fuel for the full route.',
    id: 'scenic-route-southern-explorer',
    mapUrl: '/southern-explorer/',
    parking:
      'Use established parking in Siaton and at the inland destinations, following local guidance.',
    photography:
      'The southern coast, the still water of Lake Balanan and the mountain outlook near Najandig give the journey three distinct visual chapters.',
    relatedDestinations: [
      'destination-siaton',
      'destination-lake-balanan',
      'destination-najandig-peak',
    ],
    roadQuality: 'mixed',
    routeDifficulty: 'demanding',
    routeNotes:
      'The verified route follows the coastal highway to Siaton, then turns inland toward Lake Balanan and Najandig Peak over mixed road surfaces.',
    safetyNotes:
      'This is a long day with more variable inland roads. Start early, travel within your experience and leave enough daylight for the return.',
    slug: 'southern-explorer',
    stops: [
      {
        label: 'Joshua’s Point',
        note: 'Begin early for the longest journey in the collection.',
      },
      {
        destinationId: 'destination-siaton',
        label: 'Siaton',
        note: 'The southern town marks the turn from the coast toward the interior.',
      },
      {
        destinationId: 'destination-lake-balanan',
        label: 'Lake Balanan',
        note: 'Lake, jungle and mountain landscape make a natural pause inland.',
      },
      {
        destinationId: 'destination-najandig-peak',
        label: 'Najandig Peak',
        note: 'A mountain outlook that gives the southern journey its final perspective.',
      },
    ],
    story: [
      {
        body: 'The journey follows the coast south toward Siaton. It is a longer road than the northern routes, with the sea appearing and disappearing beside everyday town life.',
        heading: 'South Along the Coast',
      },
      {
        body: 'Beyond Siaton, the road turns inland. Lake Balanan brings together water, jungle and mountains, and the journey becomes quieter as it moves away from the highway.',
        heading: 'Toward the Lake',
      },
      {
        body: 'The climb toward Najandig changes the perspective again. Returning by the same route makes the scale of the day visible, from mountain roads back to the coast and Joshua’s Point.',
        heading: 'The Long Return',
      },
    ],
    title: 'Southern Explorer',
    travelMinutes: 105,
    travelTime: 'Allow around 1½–2 hours of travel each way, plus time at the stops.',
  },
]

let keyIndex = 0

function nextKey(prefix: string) {
  keyIndex += 1
  return `${prefix}-${keyIndex}`
}

function textBlocks(entries: Array<{body: string; heading: string}>) {
  return entries.flatMap(({body, heading}) => [
    {
      _key: nextKey('heading'),
      _type: 'block',
      children: [{_key: nextKey('span'), _type: 'span', marks: [], text: heading}],
      markDefs: [],
      style: 'h2',
    },
    {
      _key: nextKey('body'),
      _type: 'block',
      children: [{_key: nextKey('span'), _type: 'span', marks: [], text: body}],
      markDefs: [],
      style: 'normal',
    },
  ])
}

function paragraphBlock(text: string) {
  return [
    {
      _key: nextKey('body'),
      _type: 'block',
      children: [{_key: nextKey('span'), _type: 'span', marks: [], text}],
      markDefs: [],
      style: 'normal',
    },
  ]
}

async function getApprovedMapRoutes() {
  const response = await fetch(routeMapSource)
  if (!response.ok) throw new Error(`Unable to load route map source: ${response.status}`)

  const html = await response.text()
  const match = html.match(/var data = (\{[\s\S]*?\});/)
  if (!match?.[1]) throw new Error('Unable to locate the verified route map data.')

  const data = JSON.parse(match[1]) as {
    routes?: Array<{
      coords?: Array<[number, number]>
      distance_km?: number
      label?: string
      url?: string
    }>
  }
  return data.routes ?? []
}

async function migrateRoute(
  source: RouteSource,
  approvedMapRoutes: Awaited<ReturnType<typeof getApprovedMapRoutes>>,
) {
  const mapRoute = approvedMapRoutes.find((route) => route.url === source.mapUrl)
  if (!mapRoute?.coords?.length) throw new Error(`Missing verified map path for ${source.title}`)
  if (Math.abs((mapRoute.distance_km ?? 0) - source.distanceKilometres) > 0.1) {
    throw new Error(`Route distance mismatch for ${source.title}`)
  }

  const document = {
    _id: source.id,
    _type: 'scenicRoute',
    editorialIntroduction: source.editorialIntroduction,
    excerpt: source.excerpt,
    interactiveMapEnabled: true,
    internalTitle: source.title,
    lastReviewedAt: reviewedAt,
    photographyNotes: paragraphBlock(source.photography),
    relatedDestinations: source.relatedDestinations.map((id) => ({
      _key: id,
      _ref: id,
      _type: 'reference',
    })),
    routePath: mapRoute.coords.map(([lat, lng], index) => ({
      _key: `point-${index}`,
      _type: 'geopoint',
      lat,
      lng,
    })),
    routeStops: source.stops.map((stop, index) => ({
      _key: `stop-${index + 1}`,
      _type: 'routeStop',
      ...(stop.destinationId
        ? {destination: {_ref: stop.destinationId, _type: 'reference'}}
        : {
            location: {
              _type: 'mapLocation',
              coordinates: {_type: 'geopoint', lat: 9.137162, lng: 123.175068},
              label: 'Joshua’s Point',
            },
          }),
      label: stop.label,
      note: stop.note,
    })),
    safetyNotes: source.safetyNotes,
    scooterGuide: {
      _type: 'scooterGuide',
      difficulty: source.routeDifficulty,
      fuel: source.fuel,
      lastReviewedAt: reviewedAt.slice(0, 10),
      parking: source.parking,
      roadQuality: source.roadQuality,
      routeNotes: source.routeNotes,
    },
    seo: {
      _type: 'seo',
      metaDescription: source.excerpt,
      metaTitle: `${source.title} | Joshua's Point`,
      noIndex: false,
    },
    slug: {_type: 'slug', current: source.slug},
    story: textBlocks(source.story),
    title: source.title,
    travelTime: {
      _type: 'travelTime',
      displayLabel: source.travelTime,
      durationMinutes: source.travelMinutes,
    },
    workflowStatus: 'approved',
  }

  await client.createOrReplace(document)
  console.log(`Published ${source.title} with ${mapRoute.coords.length} verified map points.`)
}

async function migrateIndex() {
  await client.createOrReplace({
    _id: 'scenicRoutesPage',
    _type: 'scenicRoutesPage',
    editorialCopy: paragraphBlock(
      'These are roads we return to from Joshua’s Point. Some follow the coast; others climb into forest and mountain air. Each is best approached with time to stop, look around, and let the road become part of the day.',
    ),
    featuredRoutes: routes.map((route) => ({
      _key: route.slug,
      _ref: route.id,
      _type: 'reference',
    })),
    hero: {
      _type: 'pageHero',
      eyebrow: 'Scenic Routes',
      introduction:
        'Five journeys from Joshua’s Point, following the coast and quieter roads into Southern Negros.',
      title: 'The road is part of the journey.',
    },
    internalTitle: 'Scenic Routes Page',
    introduction:
      'Exploring from Joshua’s Point is not only about arriving somewhere. The changing coast, towns, forest, and mountain roads are part of the day.',
    lastReviewedAt: reviewedAt,
    seo: {
      _type: 'seo',
      metaDescription:
        'Five scenic journeys from Joshua’s Point through the coast and highlands of Southern Negros.',
      metaTitle: `Scenic Routes | Joshua's Point`,
      noIndex: false,
    },
    workflowStatus: 'approved',
  })
  console.log('Published Scenic Routes Page.')
}

async function main() {
  const approvedMapRoutes = await getApprovedMapRoutes()
  for (const route of routes) await migrateRoute(route, approvedMapRoutes)
  await migrateIndex()
}

main().catch((error) => {
  console.error(error)
  throw error
})
