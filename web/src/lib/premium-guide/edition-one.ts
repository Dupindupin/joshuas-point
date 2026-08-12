import {cache} from 'react'

import type {PremiumJourneyDetailProps} from '@/components/premium-guide/premium-journey-detail'
import type {
  EditorialMapBounds,
  EditorialMapMarker,
  EditorialMapRoute,
  MapCoordinates,
} from '@/components/maps'
import {
  getPremiumGuidePreviewJourneys,
  type PremiumGuidePreviewJourney,
} from '@/lib/premium-guide/preview-journeys'
import {getEditorialImage} from '@/sanity/image'
import {getDestinationBySlug} from '@/sanity/queries/destinations'
import {getDiveSiteBySlug} from '@/sanity/queries/dive-sites'
import {
  getScenicRouteBySlug,
  type ScenicRouteDetailData,
} from '@/sanity/queries/scenic-routes'

export type PremiumGuideChapterSection = {
  body: readonly string[]
  title: string
}

export type PremiumGuideChapter = {
  introduction: string
  journeySlugs: readonly string[]
  number: string
  sections: readonly PremiumGuideChapterSection[]
  slug: string
  title: string
}

export type PremiumGuideJourney = PremiumGuidePreviewJourney

export const premiumGuideChapters: readonly PremiumGuideChapter[] = [
  {
    introduction:
      'Every day in this guide begins and ends at Joshua’s Point. The house is the center; the wider region is the world around it.',
    journeySlugs: [],
    number: '01',
    sections: [
      {
        title: 'Begin with the day in front of you',
        body: [
          'Morning at Joshua’s Point does not begin with a checklist. Open the glass doors, make coffee, listen to the birds and look toward the sea or mountain before deciding how far the day should travel.',
          'Weather, energy and curiosity matter more than completing a list. One meaningful journey usually leaves more room to notice where you are.',
        ],
      },
      {
        title: 'Leave well, return without rushing',
        body: [
          'Carry the information that matters offline, confirm changing details and leave enough daylight for the return. The journey home is part of each day, not the empty space after it.',
        ],
      },
    ],
    slug: 'from-joshuas-point',
    title: 'From Joshua’s Point',
  },
  {
    introduction:
      'Dumaguete is the practical northern gateway for many journeys, but arrival is easier when the final road south is planned as carefully as the flight or ferry.',
    journeySlugs: [],
    number: '02',
    sections: [
      {
        title: 'A useful pause',
        body: [
          'Treat the city as a place to gather what is needed, eat, find cash or connectivity and settle after the first part of the journey. Current schedules and services should always be checked close to travel.',
        ],
      },
      {
        title: 'Continue south calmly',
        body: [
          'Keep the confirmed Joshua’s Point address, contact channel and arrival instructions available offline. Leave room for schedules, weather and road conditions to change.',
        ],
      },
    ],
    slug: 'arriving-through-dumaguete',
    title: 'Arriving Through Dumaguete',
  },
  {
    introduction:
      'Discovery begins close to home, along a coastline Tobias uses for ordinary errands as well as unplanned pauses.',
    journeySlugs: ['coast-around-home'],
    number: '03',
    sections: [
      {
        title: 'The coast around home',
        body: [
          'Small stores, beaches, fishing villages and everyday activity sit along the road around Zamboanguita. The value is not a sequence of attractions; it is the chance to slow down and notice local life without turning it into a performance.',
        ],
      },
      {
        title: 'Malatapay changes the direction of the guide',
        body: [
          'Malatapay is both a local place and the mainland gateway for the Apo Island crossing. On an island day, the road ends here and the journey continues by sea.',
        ],
      },
    ],
    slug: 'zamboanguita-and-the-coast',
    title: 'Zamboanguita and the Coast Around Home',
  },
  {
    introduction:
      'Dauin is a small coastal town where diving, cafés, food and everyday life share the same slower rhythm.',
    journeySlugs: ['dauin-marine-coast'],
    number: '04',
    sections: [
      {
        title: 'A coast, not a directory',
        body: [
          'Black volcanic sand gives the shoreline its own atmosphere. Dive centres and house reefs make the water part of daily activity, while cafés, restaurants and the public market keep the town present between dives.',
        ],
      },
      {
        title: 'Choose one place for the day',
        body: [
          'Tobias recommends using one resort or dive centre as a base. Dive or snorkel with current local guidance, have lunch nearby, walk the coast and let the day stay simple.',
        ],
      },
    ],
    slug: 'dauin-and-the-marine-coast',
    title: 'Dauin and the Marine Coast',
  },
  {
    introduction:
      'The road to Valencia changes the air and landscape before the waterfalls appear.',
    journeySlugs: ['waterfall-explorer'],
    number: '05',
    sections: [
      {
        title: 'Water shapes the highlands differently',
        body: [
          'Casaroro is reached through steps, bamboo, canyon and river. Pulangbato is more open, shaped by mineral-coloured rock. The contrast gives the day its rhythm without asking either place to compete.',
        ],
      },
    ],
    slug: 'valencia-and-the-highlands',
    title: 'Valencia and the Highlands',
  },
  {
    introduction:
      'South of Joshua’s Point, the road moves between coast, cultivated landscape, forest, lake and mountain views.',
    journeySlugs: ['mountain-lake-explorer'],
    number: '06',
    sections: [
      {
        title: 'The road is the experience',
        body: [
          'Tobias remembers roosters on the road, carabao in rice fields and people harvesting sugar cane. These are personal observations from many journeys, not sights promised to every reader.',
          'Lake Balanan brings water and forest into the day. Only the verified route and confirmed stops should be used when the journey is taken outside the guide.',
        ],
      },
    ],
    slug: 'siaton-lake-forest-and-coast',
    title: 'Siaton: Lake, Forest and Coast',
  },
  {
    introduction:
      'Apo Island begins with the road to Malatapay and the moment the mainland is left behind in a traditional banka.',
    journeySlugs: ['apo-island-explorer'],
    number: '07',
    sections: [
      {
        title: 'The island begins from the water',
        body: [
          'Snorkeling, diving and time on land are different ways of experiencing Apo Island. The guide keeps them distinct and never makes the day depend on a guaranteed wildlife sighting.',
        ],
      },
      {
        title: 'Experience it with care',
        body: [
          'Current sea conditions, crossing arrangements and local rules shape every visit. The island, its community and the surrounding water deserve patience rather than a list of activities to complete.',
        ],
      },
    ],
    slug: 'apo-island',
    title: 'Apo Island',
  },
  {
    introduction:
      'Some days are remembered for the road itself: the changing coast, cooler highlands, forest or long southern return.',
    journeySlugs: [],
    number: '08',
    sections: [
      {
        title: 'Five owner-approved routes',
        body: [
          'The Coastal Ride to Dumaguete, Valencia Highlands Loop, Waterfall Explorer, Twin Lakes Escape and Southern Explorer each have verified geometry and ordered stops in the Joshua’s Point route system.',
          'Use those canonical routes for orientation. Fuel, weather, road conditions, access and daylight still need to be checked on the day.',
        ],
      },
      {
        title: 'Leave space to turn around',
        body: [
          'A route remains enjoyable when it is not treated as a target that must be completed. Travel within your experience, keep enough fuel for the return and allow changing conditions to shorten the day.',
        ],
      },
    ],
    slug: 'roads-worth-taking',
    title: 'Roads Worth Taking',
  },
  {
    introduction:
      'The useful parts of the guide belong together: what to confirm, what to carry offline and when to change the plan.',
    journeySlugs: [],
    number: '09',
    sections: [
      {
        title: 'Before leaving',
        body: [
          'Confirm current access, weather, local rules, transport or operator arrangements and the return plan. Carry the confirmed address, contact details and essential information offline.',
        ],
      },
      {
        title: 'Travel with respect',
        body: [
          'Observe without interrupting work or entering private land. Ask before photographing people. In the water, never touch, move, feed or stage marine life for a photograph.',
        ],
      },
      {
        title: 'The guide is a companion, not live advice',
        body: [
          'Prices, schedules, access, conditions and services can change. The public Joshua’s Point pages remain the place for corrections and current updates.',
        ],
      },
    ],
    slug: 'practical-field-notes',
    title: 'Practical Field Notes',
  },
]

export const premiumGuideChapterSlugs = premiumGuideChapters.map(({slug}) => slug)

function getBounds(coordinates: readonly MapCoordinates[]): EditorialMapBounds | undefined {
  if (coordinates.length === 0) return undefined

  const latitudes = coordinates.map(({latitude}) => latitude)
  const longitudes = coordinates.map(({longitude}) => longitude)

  return {
    northEast: {latitude: Math.max(...latitudes), longitude: Math.max(...longitudes)},
    southWest: {latitude: Math.min(...latitudes), longitude: Math.min(...longitudes)},
  }
}

function routeMap(route: ScenicRouteDetailData | null, label: string) {
  const markers: EditorialMapMarker[] =
    route?.routeStops.flatMap((stop) => {
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
  const routes: EditorialMapRoute[] =
    route && route.routePath.length > 1
      ? [
          {
            coordinates: route.routePath.map(({lat, lng}) => ({latitude: lat, longitude: lng})),
            featuredLabel: true,
            id: route._id,
            label,
          },
        ]
      : []
  const bounds = getBounds([
    ...markers.map(({coordinates}) => coordinates),
    ...routes.flatMap(({coordinates}) => coordinates),
  ])

  return {
    markers,
    routes,
    viewport: bounds ? {bounds, padding: 64} : undefined,
  }
}

const coastSequence: PremiumJourneyDetailProps['sequence'] = [
  {
    body: 'Begin from Joshua’s Point without turning the nearby road into a schedule.',
    label: '01',
    title: 'Leave slowly',
  },
  {
    body: 'Follow the coast and let beaches, fishing villages and daily activity decide where attention settles.',
    label: '02',
    title: 'The coastline',
  },
  {
    body: 'Pause at a sari-sari store, café or local food stall when it feels right, without collecting stops.',
    label: '03',
    title: 'Small pauses',
  },
  {
    body: 'Return when the road has given enough. The journey does not require a named attraction.',
    label: '04',
    title: 'The return',
  },
]

const dauinSequence: PremiumJourneyDetailProps['sequence'] = [
  {
    body: 'Leave Joshua’s Point in the morning after confirming one resort or dive centre and the current arrangements.',
    label: '01',
    title: 'The coastal road',
  },
  {
    body: 'Use one place as the base for diving or snorkeling, equipment, briefing and the slower rhythm of the coast.',
    label: '02',
    title: 'One base for the day',
  },
  {
    body: 'Have lunch nearby, notice the small cafés and walk the coast where public access is clear.',
    label: '03',
    title: 'Time on land',
  },
  {
    body: 'Return to Joshua’s Point in the afternoon without adding an island crossing or another dive area.',
    label: '04',
    title: 'The return',
  },
]

export const getPremiumGuideEditionOneJourneys = cache(
  async (): Promise<readonly PremiumGuideJourney[]> => {
    const [existingJourneys, coastalRoute, dauinDestination, dauinDiveSite] = await Promise.all([
      getPremiumGuidePreviewJourneys(),
      getScenicRouteBySlug('coastal-ride-to-dumaguete'),
      getDestinationBySlug('dauin'),
      getDiveSiteBySlug('dauin'),
    ])

    const coastalMap = routeMap(coastalRoute, 'Coastal road')
    const dauinImage = getEditorialImage(
      dauinDestination?.heroImage ?? dauinDiveSite?.heroImage,
      {height: 1440, width: 2560},
    )

    return [
      ...existingJourneys,
      {
        audience: [
          'Guests curious about everyday life around Joshua’s Point.',
          'People who enjoy an unhurried road more than a list of attractions.',
          'Travelers comfortable meeting local communities with patience and respect.',
        ],
        bring: [
          'Very little is needed for this nearby journey.',
          'Carry water if preferred and begin with enough scooter fuel for the return.',
        ],
        confirmNotes: [
          'Current weather, fuel and the daylight available for the return.',
          'Public access before entering any beach, road or property.',
        ],
        fieldNotes: [],
        image: {
          alt: 'The deck and green landscape at Joshua’s Point, where the nearby coastal journey begins.',
          src: '/images/home/closing-reflection/B20B565B-9359-4FBD-BAA0-9647E963AD2D_1_105_c.jpeg',
        },
        imageCaption:
          'The journey begins close to home. Development owner photography; replace before final print production if a dedicated coast image is selected.',
        imagePosition: 'center 54%',
        introduction: 'The destination is not the point. The journey itself is.',
        localPerspective: [
          '“This is my everyday road. Every trip feels different.”',
          'Tobias remembers children playing beside the road, boys playing basketball, fishermen preparing boats for night fishing or unloading the morning catch, roosters, village sounds and karaoke drifting through small communities.',
          'These are memories from ordinary journeys, not scenes promised to every guest. The value is being curious enough to notice what the road offers that day.',
        ],
        mapCaption:
          'The owner-approved coastal route provides regional orientation. Individual pauses remain flexible and public access must always be respected.',
        mapMarkers: coastalMap.markers,
        mapRoutes: coastalMap.routes,
        mapViewport: coastalMap.viewport,
        number: '04',
        photographyRoles: [
          'The road leaving Joshua’s Point.',
          'Truthfully identified coastline and fishing activity.',
          'A respectful sari-sari store or café pause.',
          'Evening light on the return road.',
        ],
        photographySummary:
          'The essay should make the ordinary road visible without staging people or turning local life into scenery.',
        place: [
          'The coast around Joshua’s Point passes small stores, local restaurants, beaches, fishing villages and everyday activity. It is not presented as a named attraction or fixed itinerary.',
          'This journey stays close to Calango and Zamboanguita while keeping exact private property information outside the public map.',
        ],
        practicalNotes: [
          'Tobias uses this road for food and daily essentials.',
          'Two scooters are available at Joshua’s Point; terms and suitability must be confirmed separately.',
          'Almost everything needed for a simple pause can be purchased along the road.',
        ],
        preparation: [
          'Begin with enough fuel and leave room to return before dark.',
          'Observe people without interrupting work or entering private property.',
          'Choose unfamiliar food according to personal comfort.',
        ],
        relatedLinks: [
          {
            description: 'The owner-approved route continuing north through Dauin to Dumaguete.',
            href: '/scenic-routes/coastal-ride-to-dumaguete',
            label: 'Coastal Ride to Dumaguete',
          },
          {
            description: 'The wider map of verified places and routes around Joshua’s Point.',
            href: '/explorer',
            label: 'Explorer Map',
          },
        ],
        route: 'Joshua’s Point → the nearby Zamboanguita coast → Return',
        sequence: coastSequence,
        slug: 'coast-around-home',
        smallDetails: [
          'Stop at a sari-sari store and take time over a simple purchase.',
          'Try local food at your own pace and according to your comfort.',
          'Be respectful, curious and open-minded. A smile, patience and kindness often create the best conversations.',
        ],
        summary:
          'A nearby journey shaped by coastline, small pauses and the everyday Southern Negros life Tobias sees along his own road.',
        title: 'The Coast Around Home',
        why: [
          'Most visitors drive from one attraction to the next. Tobias recommends this road because it asks for the opposite: slow down, observe and let everyday coastal life become the reason for going.',
          'Beaches, fishing boats, villages, cafés, stores and local food are not a checklist. They create a changing journey close to Joshua’s Point.',
        ],
      },
      {
        audience: [
          'Divers using a qualified local operator.',
          'Snorkelers who confirm a suitable area and current guidance.',
          'Couples, photographers and relaxed travelers who enjoy water, food and time on the coast.',
        ],
        bring: [
          'A towel, swimming clothes and sun protection.',
          'A camera used without disturbing marine life.',
          'Personal dive or snorkeling equipment when preferred; confirm rentals directly.',
        ],
        confirmNotes: [
          'The selected resort or dive centre and its current arrangements.',
          'Activity, certification, equipment, fees, weather, sea conditions and local rules.',
          'Lunch, changing, storage and payment arrangements needed by the group.',
        ],
        fieldNotes: [],
        image: dauinImage,
        imageCaption: dauinImage
          ? 'A warty frogfish photographed in Dauin. Owner photography; final credit and print approval remain required.'
          : 'The Dauin hero role remains reserved until truthfully identified owner photography is available.',
        imagePosition: 'center 48%',
        introduction: 'In Dauin, diving belongs to the everyday rhythm of the coast.',
        localPerspective: [
          '“The black sand, the quiet coast and the activity around the dive centres belong together.”',
          'Tobias remembers small cafés along the road, divers preparing for the day and a friendly atmosphere between local people and visitors.',
          'He has often seen turtles in the area, but no sighting is promised. For him, the day remains worthwhile because of the coast itself.',
        ],
        mapCaption:
          'The verified coastal route places Dauin between Joshua’s Point and Dumaguete. It is orientation, not a dive map or turn-by-turn route.',
        mapMarkers: coastalMap.markers,
        mapRoutes: coastalMap.routes,
        mapViewport: coastalMap.viewport,
        number: '05',
        photoEssays: [
          {
            introduction:
              'Dauin’s water story needs patient, truthfully identified photographs. The first image is available; the remaining roles stay open rather than borrowing another coastline or dive area.',
            items: [
              {
                caption:
                  'A warty frogfish against the darker Dauin underwater environment. Final credit and production approval remain required.',
                image: dauinImage,
                role: 'Macro life in Dauin',
              },
              {
                caption: 'Reserve for a confirmed Dauin turtle photograph; never imply a guaranteed sighting.',
                role: 'Turtle encounter',
              },
              {
                caption: 'Reserve for a truthfully identified coral or reef scene from Dauin.',
                role: 'Corals and reef',
              },
              {
                caption: 'Reserve for black volcanic sand and the underwater atmosphere Tobias describes.',
                role: 'Black-sand seascape',
              },
            ],
            title: 'Underwater World',
          },
          {
            introduction:
              'The second essay keeps the town visible: the coast, people preparing for the water and the slower pauses between activities.',
            items: [
              {
                caption: 'Reserve for a confirmed view of Dauin’s black-sand coastline.',
                role: 'The coastline',
              },
              {
                caption: 'Reserve for divers preparing at an approved local centre, with permission.',
                role: 'Morning at a dive centre',
              },
              {
                caption: 'Reserve for a café or roadside food pause approved by Tobias.',
                role: 'A slower pause',
              },
              {
                caption: 'Reserve for fishing activity or sunset on the Dauin coast, truthfully captioned.',
                role: 'Life at the water’s edge',
              },
            ],
            title: 'Life Around Dauin',
          },
        ],
        photographyRoles: [
          'Black-sand coast and shoreline.',
          'Divers preparing at an approved centre.',
          'Underwater black-sand atmosphere and macro life.',
          'Cafés, fishing activity and the late-day coast.',
        ],
        photographySummary:
          'Dauin needs two connected essays: the underwater world and the life around it. The guide reserves missing roles instead of presenting one macro image as the whole coast.',
        place: [
          'Dauin is a small coastal town in Negros Oriental and an established starting point for diving. Resorts and dive centres use house reefs and nearby sites, while some operators also arrange separate Apo Island journeys.',
          'Black volcanic sand, marine sanctuaries and reef areas shape the water context. Cafés, restaurants, massage centres, pickleball courts and the public market give the town a life beyond diving.',
        ],
        practicalNotes: [
          'Use an established operator and follow current certification, briefing, equipment and site decisions.',
          'Personal equipment may be brought; rental availability and fit must be confirmed directly.',
          'Never touch, move, feed or stage marine life for a photograph.',
        ],
        preparation: [
          'Choose and confirm one resort or dive centre before leaving.',
          'Assess swimming ability, health, sun exposure and comfort around the chosen activity.',
          'Treat diving as a separate qualified plan, not an extension of this editorial guide.',
        ],
        relatedLinks: [
          {
            description: 'The public introduction to the town and coast.',
            href: '/destinations/dauin',
            label: 'Dauin',
          },
          {
            description: 'The specialist editorial doorway without unsupported technical claims.',
            href: '/dive-sites/dauin',
            label: 'Dauin Dive Guide',
          },
          {
            description: 'The verified coastal relationship through Dauin.',
            href: '/scenic-routes/coastal-ride-to-dumaguete',
            label: 'Coastal Ride to Dumaguete',
          },
        ],
        route: 'Joshua’s Point → Dauin coast → one chosen base → Return',
        sequence: dauinSequence,
        slug: 'dauin-marine-coast',
        smallDetails: [
          'Stay with one place so the day has a calm base.',
          'Enjoy a café without treating it as time between activities.',
          'Watch the daily preparation around the dive centres without interrupting working areas or briefings.',
          'Keep Apo Island for a separate day.',
        ],
        summary:
          'A considered day where diving or snorkeling, black sand, cafés and the working coast remain part of one place.',
        title: 'Dauin Marine Coast Day',
        why: [
          'Tobias recommends Dauin because a day can stay simple: use one base, spend time in the water, eat nearby, walk the coast and return without rushing.',
          'The town feels different from Apo Island. This is a relaxed coast where diving belongs to everyday life rather than an island crossing.',
        ],
      },
    ]
  },
)

export const premiumGuideJourneySlugs = [
  'waterfall-explorer',
  'apo-island-explorer',
  'mountain-lake-explorer',
  'coast-around-home',
  'dauin-marine-coast',
] as const

export const getPremiumGuideEditionOneJourney = cache(async (slug: string) => {
  const journeys = await getPremiumGuideEditionOneJourneys()
  return journeys.find((journey) => journey.slug === slug)
})

export function getPremiumGuideChapter(slug: string) {
  return premiumGuideChapters.find((chapter) => chapter.slug === slug)
}
