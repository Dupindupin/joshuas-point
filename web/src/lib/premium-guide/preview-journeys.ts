import {cache} from 'react'

import type {
  PremiumJourneyDetailProps,
  PremiumJourneySequenceItem,
} from '@/components/premium-guide/premium-journey-detail'
import type {
  EditorialMapBounds,
  EditorialMapMarker,
  EditorialMapRoute,
  MapCoordinates,
} from '@/components/maps'
import {getEditorialImage} from '@/sanity/image'
import {getDestinationBySlug} from '@/sanity/queries/destinations'
import {getExplorerItems} from '@/sanity/queries/explorer'
import {getScenicRouteBySlug} from '@/sanity/queries/scenic-routes'

export type PremiumGuidePreviewJourney = PremiumJourneyDetailProps & {
  slug: string
  summary: string
}

export const premiumGuideJourneySlugs = [
  'waterfall-explorer',
  'apo-island-explorer',
  'mountain-lake-explorer',
] as const

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

const waterfallSequence: readonly PremiumJourneySequenceItem[] = [
  {
    body: 'Leave enough room for the highland day to unfold. Confirm current access, weather and local guidance before setting out.',
    label: '01',
    title: "Joshua's Point",
  },
  {
    body: 'The road rises from the coast. Valencia is the transition into the highlands, not another stop to collect.',
    label: '02',
    title: 'Toward Valencia',
  },
  {
    body: 'The steps, old bamboo, canyon and small river are part of the experience. The waterfall remains out of view until the final approach.',
    label: '03',
    title: 'Casaroro Falls',
  },
  {
    body: 'A more open setting and mineral-coloured rock offer a different expression of water in the same highlands.',
    label: '04',
    title: 'Pulangbato Falls',
  },
  {
    body: 'The road home completes the day. There is no need to add another destination after the highlands.',
    label: '05',
    title: 'The return',
  },
]

const apoSequence: readonly PremiumJourneySequenceItem[] = [
  {
    body: 'Begin early and confirm current weather, crossing conditions and local guidance before leaving the house.',
    label: '01',
    title: "Joshua's Point",
  },
  {
    body: 'The road ends at the working coast. Malatapay is where the journey changes from land to sea.',
    label: '02',
    title: 'Malatapay',
  },
  {
    body: 'A traditional Filipino banka carries the journey away from the mainland. The island is first understood from the water.',
    label: '03',
    title: 'The crossing',
  },
  {
    body: 'Snorkeling, diving and time on land are different experiences. The island asks for patience and respect rather than a list of activities.',
    label: '04',
    title: 'Apo Island',
  },
  {
    body: 'Return through Malatapay and let the road back restore Joshua’s Point as the center of the guide.',
    label: '05',
    title: 'The return',
  },
]

const mountainLakeSequence: readonly PremiumJourneySequenceItem[] = [
  {
    body: 'Leave Joshua’s Point with water and sun protection, while keeping the exact route open until its geography is confirmed.',
    label: '01',
    title: "Joshua's Point",
  },
  {
    body: 'The smaller roads are the center of the day. The journey should leave room for changing views and everyday rural surroundings.',
    label: '02',
    title: 'Into the mountains',
  },
  {
    body: 'Tobias remembers roosters on the road, carabao in rice fields and people harvesting sugar cane. These are memories, not promised sights.',
    label: '03',
    title: 'Life beside the road',
  },
  {
    body: 'A lake gives the journey a quieter center once Tobias confirms the exact place, current access and whether a water stop belongs in the day.',
    label: '04',
    title: 'The lake',
  },
  {
    body: 'The return keeps the road and the observed landscape connected, without adding another stop simply to make the day fuller.',
    label: '05',
    title: 'The return',
  },
]

export const getPremiumGuidePreviewJourneys = cache(
  async (): Promise<readonly PremiumGuidePreviewJourney[]> => {
    const [waterfallRoute, casaroro, pulangbato, apoIsland, explorerItems] = await Promise.all([
      getScenicRouteBySlug('waterfall-explorer'),
      getDestinationBySlug('casaroro-falls'),
      getDestinationBySlug('pulangbato-falls'),
      getDestinationBySlug('apo-island'),
      getExplorerItems(),
    ])

    const waterfallImage = getEditorialImage(waterfallRoute?.heroImage ?? casaroro?.heroImage, {
      height: 1440,
      width: 2560,
    })
    const apoImage = getEditorialImage(apoIsland?.heroImage, {height: 1440, width: 2560})

    const waterfallMarkers: EditorialMapMarker[] =
      waterfallRoute?.routeStops.flatMap((stop) => {
        const location = stop.location?.coordinates
          ? stop.location
          : stop.destination?.mapLocation?.coordinates
            ? stop.destination.mapLocation
            : undefined
        if (!location?.coordinates) return []

        return [
          {
            coordinates: {
              latitude: location.coordinates.lat,
              longitude: location.coordinates.lng,
            },
            description: stop.note?.trim() || undefined,
            id: stop._key,
            kind: 'route-stop' as const,
            label: stop.label,
          },
        ]
      }) ?? []
    const waterfallRoutes: EditorialMapRoute[] =
      waterfallRoute && waterfallRoute.routePath.length > 1
        ? [
            {
              coordinates: waterfallRoute.routePath.map((point) => ({
                latitude: point.lat,
                longitude: point.lng,
              })),
              featuredLabel: true,
              id: waterfallRoute._id,
              label: 'Waterfall Explorer',
            },
          ]
        : []
    const waterfallBounds = getBounds([
      ...waterfallMarkers.map((marker) => marker.coordinates),
      ...waterfallRoutes.flatMap((route) => route.coordinates),
    ])

    const apoMapItems = explorerItems.filter(
      (item) => item.id === 'gateway-malatapay' || item.id === 'destination-apo-island',
    )
    const apoMarkers: EditorialMapMarker[] = apoMapItems.flatMap((item) =>
      item.coordinates
        ? [
            {
              coordinates: item.coordinates,
              description: item.description,
              featuredLabel: item.id === 'destination-apo-island',
              id: item.id,
              kind:
                item.id === 'gateway-malatapay'
                  ? ('route-stop' as const)
                  : ('destination' as const),
              label: item.title,
            },
          ]
        : [],
    )
    const malatapayMarker = apoMarkers.find((marker) => marker.id === 'gateway-malatapay')
    const apoIslandMarker = apoMarkers.find((marker) => marker.id === 'destination-apo-island')
    const apoRoutes: EditorialMapRoute[] =
      malatapayMarker && apoIslandMarker
        ? [
            {
              coordinates: [malatapayMarker.coordinates, apoIslandMarker.coordinates],
              description:
                'An editorial connection between the verified Malatapay and Apo Island markers, not a fixed GPS boat track.',
              featuredLabel: true,
              id: 'apo-island-banka-crossing',
              label: 'Banka crossing',
            },
          ]
        : []
    const apoBounds = getBounds([
      ...apoMarkers.map((marker) => marker.coordinates),
      ...apoRoutes.flatMap((route) => route.coordinates),
    ])

    return [
      {
        audience: [
          'Guests who enjoy walking and being physically involved in a landscape.',
          'People who value the canyon, river, bamboo and route as much as the waterfall.',
          'Travelers able to assess the descent and demanding return climb honestly.',
        ],
        bring: [
          'A small backpack, drinking water and something light to eat.',
          'Shoes suited to steps, wet surfaces and walking through water.',
          'A towel and clothing appropriate for water when current local guidance permits entry.',
        ],
        confirmNotes: [
          'Current access, weather, local rules and any temporary closure.',
          'Whether entering the water is permitted and appropriate that day.',
          'Any changing practical information held on the public route and destination pages.',
        ],
        fieldNotes: [],
        image: waterfallImage,
        imageCaption: waterfallImage
          ? 'Development photography from the Casaroro Falls story. A complete route essay is still required for release.'
          : 'Photography role reserved for the highland journey. Final route imagery is still required.',
        imagePosition: 'center 42%',
        introduction: 'Some places make you wait before they show themselves.',
        localPerspective: [
          '“The waterfall is not visible when the journey begins. Only near the end does the canyon open and reveal it.”',
          'Tobias has made the journey to Casaroro three times. He remembers the big old bamboo, the small river, cold water and the strength needed for the return climb.',
          'He found it hard to keep up on the way back and still remembers ending each visit happy. The effort belongs in the story rather than being softened.',
        ],
        mapCaption:
          'The verified Waterfall Explorer route and its mapped stops. Use it for orientation, not turn-by-turn navigation.',
        mapMarkers: waterfallMarkers,
        mapRoutes: waterfallRoutes,
        mapViewport: waterfallBounds ? {bounds: waterfallBounds, padding: 48} : undefined,
        number: '01',
        photographyRoles: [
          'Highland road and Valencia transition.',
          'Casaroro steps, old bamboo and canyon approach.',
          'The final waterfall reveal and the return climb.',
          'Pulangbato as a distinct, truthfully identified second landscape.',
        ],
        photographySummary:
          'The visual essay should make the gradual reveal visible. One waterfall portrait cannot explain the road, descent, canyon and climb that give this journey its meaning.',
        place: [
          'This journey connects the Valencia highlands with Casaroro and Pulangbato Falls. The two waterfall settings are related by the approved scenic route but should not be presented as interchangeable.',
          'Casaroro is experienced through a descent, canyon and river approach. Pulangbato provides a more open second setting shaped by mineral-coloured rock. Changing access and water guidance remain outside this stable context.',
        ],
        practicalNotes: [
          'The descent, wet route and return climb require an individual assessment.',
          'Tobias recommends an early start without guaranteeing visitor levels.',
          'Pulangbato remains a continuation, not an obligation after Casaroro.',
        ],
        preparation: [
          'Assess sustained stairs, balance, wet surfaces and the strength needed for the return.',
          'Be willing to change the day when current access or weather makes the route unsuitable.',
          'Do not treat the guide as a medical assessment or safety guarantee.',
        ],
        relatedLinks: [
          {
            description: 'The canonical route, stop sequence and current public orientation.',
            href: '/scenic-routes/waterfall-explorer',
            label: 'Waterfall Explorer route',
          },
          {
            description: 'The owner-led story of the canyon walk and waterfall approach.',
            href: '/destinations/casaroro-falls',
            label: 'Casaroro Falls',
          },
          ...(pulangbato
            ? [
                {
                  description: 'The more open second waterfall setting in the highlands.',
                  href: '/destinations/pulangbato-falls',
                  label: 'Pulangbato Falls',
                },
              ]
            : []),
        ],
        route: 'Joshua’s Point → Valencia → Casaroro Falls → Pulangbato Falls → Return',
        sequence: waterfallSequence,
        slug: 'waterfall-explorer',
        smallDetails: [
          'Begin early, while treating quieter visitor levels as Tobias’s observation rather than a promise.',
          'Let Casaroro take the time it needs; the concealed approach is the emotional center.',
          'Keep Pulangbato optional in spirit and choose lunch near Valencia according to what is current that day.',
        ],
        summary:
          'A highland day where the steps, canyon and river matter as much as the waterfalls at the center of the route.',
        title: 'Waterfall Explorer Day',
        why: [
          'Tobias returns for the complete approach: the steps, old bamboo, small river and the way Casaroro stays out of sight until the final part of the canyon.',
          'Pulangbato changes the atmosphere with a more open setting and mineral-coloured rock. The contrast gives the day shape without asking one waterfall to compete with the other.',
        ],
      },
      {
        audience: [
          'Guests curious about both island life and the underwater world.',
          'Snorkelers, divers with a separately arranged qualified plan, and mixed-interest groups.',
          'Travelers who value the banka crossing and arrival as part of the day.',
        ],
        bring: [
          'Water, sun protection and reef-safe sunscreen.',
          'Swimming clothes, a towel and snorkeling equipment when independently arranged.',
          'A camera used without crowding wildlife, touching coral or overriding local guidance.',
        ],
        confirmNotes: [
          'Current weather, sea conditions and crossing arrangements.',
          'Current access, registration, fees, local rules and available services.',
          'Qualified arrangements and guidance for snorkeling or diving.',
        ],
        fieldNotes: [],
        image: apoImage,
        imageCaption: apoImage
          ? 'Existing owner photography from the Apo Island story. Final capture details, crop and production approval remain part of the guide edit.'
          : 'Photography role reserved for Apo Island. The journey remains complete while final imagery is selected.',
        imagePosition: 'center 45%',
        introduction:
          'The island begins before arrival, when the mainland recedes and Apo appears from the water.',
        localPerspective: [
          '“The crossing, the island and the water belong to one experience.”',
          'Tobias has made the journey twice as a guest experience and many times as a diver. He keeps snorkeling and diving distinct because each creates a different way of paying attention.',
          'He has commonly seen turtles while snorkeling close to the island. That remains a personal observation, never a promise that wildlife will appear.',
        ],
        mapCaption:
          'The road journey reaches Malatapay before continuing across the water. The sea line is an editorial connection, not a fixed boat track or navigation route.',
        mapMarkers: apoMarkers,
        mapRoutes: apoRoutes,
        mapViewport: apoBounds ? {bounds: apoBounds, padding: 72} : undefined,
        number: '02',
        photographyRoles: [
          'The actual approach to Malatapay and working shore.',
          'Banka, crossing and Apo Island appearing from sea level.',
          'Truthfully identified snorkeling, reef and island context.',
          'The return crossing and quiet arrival back at Joshua’s Point.',
        ],
        photographySummary:
          'The photographic story must connect road, gateway, boat, island, water and return. Underwater images alone cannot carry the journey.',
        place: [
          'Apo Island is approached from the Southern Negros Oriental mainland through Malatapay. It belongs in the guide both as an island to spend time on and as a place to experience the surrounding water.',
          'People come to snorkel, dive and experience the island itself. The place should not be reduced to a wildlife sighting or dive site; time on land gives the water a human context.',
        ],
        practicalNotes: [
          'The journey uses a traditional Filipino banka outrigger boat.',
          'Sun exposure can be strong even when it does not feel especially hot.',
          'Weather and sea conditions can prevent the crossing.',
        ],
        preparation: [
          'Accept that conditions Joshua’s Point does not control can postpone or cancel the day.',
          'Assess comfort around a small boat, open water, swimming, mobility and sun exposure.',
          'Treat diving as a separate activity requiring qualified local decisions.',
        ],
        relatedLinks: [
          {
            description: 'The free introduction to the island, community and visitor context.',
            href: '/destinations/apo-island',
            label: 'Apo Island',
          },
          {
            description: 'A separate editorial doorway for diving, without unsupported technical claims.',
            href: '/dive-sites/apo-island',
            label: 'Apo Island Dive Guide',
          },
          {
            description: 'The wider orientation layer connecting Malatapay and Apo Island.',
            href: '/explorer',
            label: 'Explorer Map',
          },
        ],
        route: 'Joshua’s Point → Malatapay → banka crossing → Apo Island → Return',
        sequence: apoSequence,
        slug: 'apo-island-explorer',
        smallDetails: [
          'Start early without treating that choice as a guarantee of calmer conditions or fewer people.',
          'Tobias has often found low season and Thursdays quieter, while recognizing that every day can differ.',
          'Choose snorkeling, diving or time on land according to the group instead of trying to complete everything.',
        ],
        summary:
          'An island day shaped by the banka crossing, life around the reef and the changing view between mainland and sea.',
        title: 'Apo Island Explorer Day',
        why: [
          'We recommend Apo Island because the whole experience matters: traveling by banka, seeing the island from the water, spending time around the reef and noticing island life on land.',
          'A guest does not need to be a diver to have a meaningful day. The crossing changes how the island is first experienced and asks for one day of attention rather than a list of activities.',
        ],
      },
      {
        audience: [
          'Guests interested in the road and landscape as much as the final stop.',
          'Nature travelers who enjoy mountains, cultivated land and a slower change of scenery.',
          'People who prefer observation and movement over a tightly scheduled activity day.',
        ],
        bring: [
          'Drinking water.',
          'Sun protection, including in the mountains.',
          'A towel only when an approved lake or waterfall stop includes swimming.',
        ],
        confirmNotes: [
          'The exact road, primary lake and whether a nearby waterfall belongs in the journey.',
          'Current access, road conditions and any applicable rules or closures.',
          'Whether swimming is available and appropriate at a confirmed water stop.',
        ],
        fieldNotes: [],
        imageCaption:
          'Photography placeholder for a truthfully identified mountain road and lake journey. No available image is being used to imply an unconfirmed route.',
        introduction:
          'Here, the road is not the space between places. It is the part Tobias remembers.',
        localPerspective: [
          '“The road itself was amazing.”',
          'Tobias has made this journey many times with guests and family. He remembers roosters on the road, carabao in rice fields and people harvesting sugar cane.',
          'He hopes guests feel connected to the surroundings and to the everyday life they notice along the way. The guide does not invent conversations or stories for the people encountered.',
        ],
        mapCaption:
          'The map is held until Tobias confirms the exact route, lake and any optional water stop. No attractive but unsupported track has been drawn.',
        number: '03',
        photographyRoles: [
          'The actual small-road sequence and changing mountain views.',
          'Rice landscape, carabao and roadside details from this journey.',
          'Sugar-cane work photographed respectfully and with consent where required.',
          'The confirmed lake, optional water stop and return road.',
        ],
        photographySummary:
          'The visual essay should make the road and changing landscape visible without turning local work into spectacle or using one place to represent another.',
        place: [
          'This journey is defined by a landscape rather than one verified destination. It moves through mountain roads, cultivated land and water, with the exact route and primary lake still awaiting owner confirmation.',
          'Any explanation of agriculture, culture or community life requires verified sources. Tobias’s memories belong in the local perspective, not in general claims about how people live or work.',
        ],
        practicalNotes: [
          'Tobias has completed the journey many times with guests and family.',
          'The road, mountain views, cultivated landscape and observed local life are central to his recommendation.',
          'Water and sun protection are the only currently approved universal preparation items.',
        ],
        preparation: [
          'Keep the day provisional until its route and destination are confirmed.',
          'Do not infer road quality, vehicle suitability, water access or physical demands.',
          'Observe people and private land respectfully; photography requires appropriate consent.',
        ],
        relatedLinks: [
          {
            description: 'The existing public routes that may provide the canonical geometry after owner review.',
            href: '/scenic-routes',
            label: 'Scenic Routes',
          },
          {
            description: 'The orientation layer where verified places and routes will eventually connect.',
            href: '/explorer',
            label: 'Explorer Map',
          },
        ],
        route: 'Joshua’s Point → local mountain roads → lake → Return',
        sequence: mountainLakeSequence,
        slug: 'mountain-lake-explorer',
        smallDetails: [
          'Let the road be the experience instead of treating it as travel time to minimize.',
          'Notice daily life without interrupting work, entering private land or turning people into scenery.',
          'Add a lake or waterfall only when Tobias confirms that it belongs in this particular day.',
        ],
        summary:
          'A slower mountain journey where the road, cultivated landscape and local life matter before the lake is ever reached.',
        title: 'Mountain & Lake Explorer Day',
        why: [
          'We recommend the journey because it shows another side of the region: mountains and wide views alongside cultivated land, people at work and animals beside the road.',
          'For Tobias, the road is the central part of the day. The experience comes from moving slowly through changing nature rather than collecting visitor stops.',
        ],
      },
    ]
  },
)

export const getPremiumGuidePreviewJourney = cache(async (slug: string) => {
  const journeys = await getPremiumGuidePreviewJourneys()
  return journeys.find((journey) => journey.slug === slug)
})
