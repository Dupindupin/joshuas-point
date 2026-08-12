import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-09'})
const reviewedAt = '2026-08-10T00:00:00.000Z'

type SourceImage = {
  alt: string
  filename: string
  url: string
}

type DestinationSource = {
  bestTime: string
  coordinates: {lat: number; lng: number}
  destinationType: string
  difficulty: 'easy' | 'moderate' | 'demanding'
  directionsUrl: string
  excerpt: string
  heroImage?: SourceImage
  highlights: string[]
  id: string
  introduction: string
  related: string[]
  scooterGuide?: {
    difficulty: 'easy' | 'moderate' | 'demanding'
    fuel: string
    parking: string
    roadQuality: 'paved' | 'mixed' | 'rough' | 'variable'
    routeNotes: string
  }
  slug: string
  story: Array<{heading: string; body: string}>
  thingsToBring: string[]
  tips: string[]
  title: string
  transport: string[]
  travelMinutes: number
  travelTime: string
  whyVisit: string
}

const sources: DestinationSource[] = [
  {
    bestTime:
      'Morning departures usually offer the gentlest start. Sea conditions change, so confirm the crossing locally before setting out.',
    coordinates: {lat: 9.0768235, lng: 123.2688201},
    destinationType: 'island',
    difficulty: 'moderate',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Calango,+Zamboanguita,+Negros+Oriental,+Philippines&destination=Malatapay,+Zamboanguita,+Negros+Oriental,+Philippines&travelmode=driving',
    excerpt:
      'An island day shaped by coral gardens, sea turtles, village life and time in the water.',
    heroImage: {
      alt: 'A sea turtle swimming underwater among a school of fish.',
      filename: 'apo-island-sea-turtle.webp',
      url: 'https://joshuaspoint.com/wp-content/uploads/2026/07/WPO3061.webp',
    },
    highlights: [
      'The journey combines a coastal drive with a boat crossing.',
      'Snorkelling and diving reveal different parts of the reef.',
      'The island is also a living fishing community, not only a place to enter the water.',
    ],
    id: 'destination-apo-island',
    introduction:
      'Apo Island is a place to slow down and spend time in and around the water. Coral gardens, sea turtles and everyday island life sit beside a long community relationship with the reef.',
    related: ['destination-dauin', 'destination-dumaguete', 'destination-valencia'],
    scooterGuide: {
      difficulty: 'easy',
      fuel: 'Fuel is available along the coastal corridor; begin the boat portion with the scooter parked at the departure area.',
      parking:
        'Use the established parking area at the Malatapay boat departure point and follow current local guidance.',
      roadQuality: 'paved',
      routeNotes:
        'Follow the coastal highway to Malatapay. The scooter journey ends at the boat departure point.',
    },
    slug: 'apo-island',
    story: [
      {
        heading: 'Sharing the Water',
        body: 'One of the lasting memories of Apo Island is seeing green sea turtles moving calmly above the seagrass. The pleasure comes from watching without crowding or touching them.',
      },
      {
        heading: 'Beneath the Coral Gardens',
        body: 'The reef changes as you move from the shallows into deeper water. Coral, tropical fish and smaller marine life reward time and attention rather than a hurried checklist.',
      },
      {
        heading: 'Life on the Island',
        body: 'Away from the water, the village follows the rhythm of fishing, boats and the sea. That everyday life is part of the island and should be approached with the same care as the reef.',
      },
    ],
    thingsToBring: [
      'Swimwear and a towel',
      'Drinking water and sun protection',
      'Reef-safe sunscreen',
    ],
    tips: [
      'Confirm the boat crossing and sea conditions locally before departure.',
      'Observe coral and marine life without touching or disturbing them.',
    ],
    title: 'Apo Island',
    transport: ['car', 'scooter', 'boat'],
    travelMinutes: 45,
    travelTime: 'Around 15–20 minutes to the departure point, followed by the boat crossing.',
    whyVisit:
      'We recommend Apo Island for the whole experience: the crossing, the reef, the turtles and the chance to spend a day following the rhythm of the sea.',
  },
  {
    bestTime:
      'Early mornings often give the coast its quietest atmosphere. Diving and snorkelling plans should follow current local conditions.',
    coordinates: {lat: 9.1897165, lng: 123.26577},
    destinationType: 'town',
    difficulty: 'easy',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Calango,+Zamboanguita,+Negros+Oriental,+Philippines&destination=Dauin,+Negros+Oriental,+Philippines&travelmode=driving',
    excerpt:
      'Black volcanic sand, a strong diving culture and an easy coastal rhythm north of Joshua’s Point.',
    heroImage: {
      alt: 'A white spotted frogfish resting on the sandy ocean floor.',
      filename: 'dauin-warty-frogfish.webp',
      url: 'https://joshuaspoint.com/wp-content/uploads/2026/07/Warty-Frogfish-Antennarius-maculatus02.webp',
    },
    highlights: [
      'The black volcanic sand gives the shoreline its distinctive character.',
      'Dauin brings together reef diving, macro life and relaxed time along the coast.',
      'The town is closely connected with departures toward Apo Island.',
    ],
    id: 'destination-dauin',
    introduction:
      'Dauin is known for what lies beneath the surface, but the shore has its own pace. Black sand, fishing boats and beachfront places to pause make it enjoyable even when the day is not centred on a dive.',
    related: ['destination-apo-island', 'destination-dumaguete', 'destination-valencia'],
    scooterGuide: {
      difficulty: 'easy',
      fuel: 'Fuel is available along the main coastal highway.',
      parking:
        'Use the parking offered by the place you are visiting and ask before leaving the scooter for a longer dive or snorkelling trip.',
      roadQuality: 'paved',
      routeNotes:
        'The main journey follows the coastal highway. Beach and dive-site access roads vary, so follow the directions of the chosen local operator.',
    },
    slug: 'dauin',
    story: [
      {
        heading: 'Beneath the Surface',
        body: 'Dauin rewards close looking. Coral, reef fish, turtles and small marine life make every dive or snorkelling visit feel different from the last.',
      },
      {
        heading: 'Along the Shore',
        body: 'The volcanic-sand coastline has a character of its own. A simple lunch near the beach and time watching fishing boats return can be as much a part of the day as entering the water.',
      },
      {
        heading: 'Toward Apo Island',
        body: 'Dauin and the neighbouring coast are closely tied to Apo Island. Boats heading out across the water make the connection between the mainland and the island visible.',
      },
    ],
    thingsToBring: [
      'Swimwear and a towel',
      'Drinking water and sun protection',
      'A camera if you enjoy marine photography',
    ],
    tips: [
      'Speak with a qualified local operator before choosing a dive or snorkelling site.',
      'Leave enough time to enjoy the shore rather than treating Dauin only as a departure point.',
    ],
    title: 'Dauin',
    transport: ['car', 'scooter'],
    travelMinutes: 23,
    travelTime: 'Around 20–25 minutes along the coast.',
    whyVisit:
      'We recommend Dauin because the underwater world and the everyday coastline belong together here. It is easy to spend time in the water, eat by the shore and let the day move slowly.',
  },
  {
    bestTime:
      'Morning and late afternoon suit a slower walk along the boulevard and leave space for coffee, markets and the waterfront.',
    coordinates: {lat: 9.3054777, lng: 123.3080446},
    destinationType: 'culture',
    difficulty: 'easy',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Calango,+Zamboanguita,+Negros+Oriental,+Philippines&destination=Dumaguete,+Negros+Oriental,+Philippines&travelmode=driving',
    excerpt:
      'A coastal city best experienced through an unhurried walk, coffee, markets and time beside the sea.',
    heroImage: {
      alt: 'The historic stone bell tower beside a town plaza in Dumaguete.',
      filename: 'dumaguete-bell-tower.jpg',
      url: 'https://joshuaspoint.com/wp-content/uploads/2026/03/24251887_1792559951049159_765625734_n.jpg',
    },
    highlights: [
      'Rizal Boulevard gives the city a long, walkable relationship with the sea.',
      'Coffee, markets and heritage buildings are best discovered without a packed itinerary.',
      'Everyday street life matters as much as named landmarks.',
    ],
    id: 'destination-dumaguete',
    introduction:
      'Dumaguete rewards a slower pace. A walk beside the water, coffee, a market and a few unplanned streets often say more about the city than trying to collect every landmark.',
    related: ['destination-dauin', 'destination-apo-island', 'destination-valencia'],
    scooterGuide: {
      difficulty: 'easy',
      fuel: 'Fuel is available along the coastal highway and in Dumaguete.',
      parking: 'Choose established city parking near the part of Dumaguete you plan to explore.',
      roadQuality: 'paved',
      routeNotes:
        'The ride follows the coastal highway through Dauin. Traffic becomes busier when approaching and entering the city.',
    },
    slug: 'dumaguete',
    story: [
      {
        heading: 'Morning on the Boulevard',
        body: 'The city begins gently beside the sea. People walk, fishermen return and cafés open while the light is still soft along Rizal Boulevard.',
      },
      {
        heading: 'Time for Coffee',
        body: 'Coffee and something sweet are part of the rhythm of Dumaguete. The point is not only where you stop, but allowing enough time to sit and watch the city around you.',
      },
      {
        heading: 'Everyday Discovery',
        body: 'Markets, heritage buildings and the streets around the university invite wandering. The most memorable part may be a small encounter that was never on the plan.',
      },
    ],
    thingsToBring: [
      'Comfortable walking shoes',
      'Light clothing and sun protection',
      'A camera for the softer morning or afternoon light',
    ],
    tips: [
      'Begin near the boulevard and let the day expand naturally from there.',
      'Allow time for a market or café instead of moving quickly between landmarks.',
    ],
    title: 'Dumaguete',
    transport: ['car', 'scooter', 'hiredDriver', 'publicTransport'],
    travelMinutes: 40,
    travelTime: 'Around 35–45 minutes along the coast.',
    whyVisit:
      'We recommend Dumaguete for a different rhythm from the house: a morning walk, good coffee, everyday city life and the sea always nearby.',
  },
  {
    bestTime:
      'Morning usually brings cooler air and clearer views before cloud builds over the highlands.',
    coordinates: {lat: 9.2817803, lng: 123.2446771},
    destinationType: 'town',
    difficulty: 'easy',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Calango,+Zamboanguita,+Negros+Oriental,+Philippines&destination=Valencia,+Negros+Oriental,+Philippines&travelmode=driving',
    excerpt:
      'Cooler highland air, forest roads, waterfalls and everyday town life above the coast.',
    heroImage: {
      alt: 'A person standing before Casaroro Falls in the forested Valencia highlands.',
      filename: 'valencia-casaroro-falls.jpg',
      url: 'https://joshuaspoint.com/wp-content/uploads/2026/03/539588359_1206921484786755_8903495630037873207_n.jpg',
    },
    highlights: [
      'The climb from coast to highlands changes both the air and the landscape.',
      'Valencia connects several waterfall, spring and forest journeys.',
      'The town’s markets, cafés and roadside stalls are part of the experience.',
    ],
    id: 'destination-valencia',
    introduction:
      'Valencia is where the coast gives way to cooler mountain air, forest and cultivated highland landscapes. It works best as an unhurried day, with room for both nature and the small town itself.',
    related: [
      'destination-casaroro-falls',
      'destination-pulangbato-falls',
      'destination-twin-lakes',
      'destination-dumaguete',
    ],
    scooterGuide: {
      difficulty: 'moderate',
      fuel: 'Refuel before the highland climb or in Valencia rather than depending on smaller mountain roads.',
      parking:
        'Use established parking in town or at the specific highland destination being visited.',
      roadQuality: 'paved',
      routeNotes:
        'The route climbs from the coast into the highlands and becomes steeper near the foothills.',
    },
    slug: 'valencia',
    story: [
      {
        heading: 'A Morning in the Highlands',
        body: 'As the road climbs toward the foothills, coconut palms give way to forest and mountain gardens. The change arrives gradually, through cooler air and greener views.',
      },
      {
        heading: 'Waterfalls and Springs',
        body: 'Valencia is a doorway to several of the region’s best-known natural places. The pleasure is in taking time between them rather than treating the highlands as a list of stops.',
      },
      {
        heading: 'The Town Between',
        body: 'Markets, cafés and roadside fruit stalls give a glimpse of everyday life in the highlands and make a natural pause before the road back to the coast.',
      },
    ],
    thingsToBring: ['Comfortable walking shoes', 'A light rain layer', 'Drinking water'],
    tips: [
      'Start early enough to enjoy the cooler morning air.',
      'Treat Valencia as part of the day, not only the road to another destination.',
    ],
    title: 'Valencia',
    transport: ['car', 'scooter', 'hiredDriver'],
    travelMinutes: 40,
    travelTime: 'Around 35–45 minutes into the highlands.',
    whyVisit:
      'We recommend Valencia for the change of atmosphere: cooler air, green roads, waterfalls and a small town that lets the journey unfold at an easy pace.',
  },
  {
    bestTime:
      'The colour and water flow change with season and weather. Visit in daylight and follow current local access guidance.',
    coordinates: {lat: 9.320995, lng: 123.192917},
    destinationType: 'waterfall',
    difficulty: 'easy',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=9.320995,123.192917',
    excerpt:
      'Red, mineral-streaked stone, falling water and warm springs in the Valencia highlands.',
    highlights: [
      'The red-orange rock gives the waterfall its distinctive character.',
      'The falls and nearby springs create two different experiences of water.',
      'The approach is gentler than the long descent to Casaroro Falls.',
    ],
    id: 'destination-pulangbato-falls',
    introduction:
      'Pulangbato is shaped by contrast: red mineral-streaked stone against green vegetation, cool falling water near warm springs, and a gentle visit compared with the deeper journey into Casaroro’s gorge.',
    related: ['destination-valencia', 'destination-casaroro-falls', 'destination-twin-lakes'],
    scooterGuide: {
      difficulty: 'moderate',
      fuel: 'Refuel in or before Valencia before continuing farther into the highlands.',
      parking:
        'Use the established parking area near the entrance and follow current local instructions.',
      roadQuality: 'mixed',
      routeNotes:
        'The journey uses the paved highland route through Valencia, followed by quieter local roads near the falls.',
    },
    slug: 'pulangbato-falls',
    story: [
      {
        heading: 'The Red Rock Falls',
        body: 'Water moving over the red-orange stone gives Pulangbato its identity. The scale is modest, and that is part of its appeal: it is a place to look closely rather than rush toward a spectacle.',
      },
      {
        heading: 'The Springs Nearby',
        body: 'Warm mineral pools nearby offer a different sensation from the waterfall. Moving between the two gives the visit its own natural rhythm.',
      },
      {
        heading: 'The Walk Between',
        body: 'The connecting path passes forest edge, farmland and everyday highland life. It is a simple part of the day, but one worth allowing time for.',
      },
    ],
    thingsToBring: [
      'Swimwear and a towel',
      'Footwear with grip',
      'A little cash for local facilities',
    ],
    tips: [
      'Allow time for both the falls and the nearby springs.',
      'Take care on wet stone even though the approach is relatively short.',
    ],
    title: 'Pulangbato Falls',
    transport: ['car', 'scooter', 'hiredDriver'],
    travelMinutes: 50,
    travelTime: 'Around 45–55 minutes into the Valencia highlands.',
    whyVisit:
      'We recommend Pulangbato for an easy highland pause: the unusual red stone, the water and the contrast between the falls and the warm springs nearby.',
  },
  {
    bestTime:
      'Morning brings cooler air and often the calmest atmosphere on the lakes. Mountain weather can change quickly.',
    coordinates: {lat: 9.3528347, lng: 123.1776342},
    destinationType: 'lake',
    difficulty: 'moderate',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=9.3528347,123.1776342',
    excerpt:
      'Two highland lakes held by rainforest, with changing mist, forest paths and time on the water.',
    highlights: [
      'The mountain journey is part of the change from coast to rainforest.',
      'Mist, birdsong and changing light shape the lakes from hour to hour.',
      'Forest paths may be uneven or muddy after rain.',
    ],
    id: 'destination-twin-lakes',
    introduction:
      'Twin Lakes offers a full change of atmosphere from the coast. The air is cooler, forest gathers around the water, and the day invites walking, looking and moving slowly across the lake.',
    related: ['destination-valencia', 'destination-casaroro-falls', 'destination-dumaguete'],
    slug: 'twin-lakes',
    story: [
      {
        heading: 'Morning on the Lake',
        body: 'Early in the day, mist can sit above the water while the forest comes alive around it. The quiet is not empty; it is full of small sounds and changing light.',
      },
      {
        heading: 'Through the Rainforest',
        body: 'The forest paths make the journey between viewpoints as important as the lakes themselves. Birds, butterflies and dense tropical planting reward a slower walk.',
      },
      {
        heading: 'A View from the Water',
        body: 'Crossing the lake changes the scale of the surrounding mountains and forest. It is a simple way to feel how completely the water sits within the landscape.',
      },
    ],
    thingsToBring: [
      'Comfortable walking shoes',
      'Water and insect repellent',
      'A light rain layer',
    ],
    tips: [
      'Begin in the morning and leave space for changing mountain weather.',
      'Choose footwear for forest paths rather than only the viewing areas.',
    ],
    title: 'Twin Lakes',
    transport: ['car', 'hiredDriver'],
    travelMinutes: 80,
    travelTime: 'Around 1 hour 15–25 minutes through the highlands.',
    whyVisit:
      'We recommend Twin Lakes when you want a complete change from the coast: cooler air, rainforest, water and enough distance to make the journey feel meaningful.',
  },
  {
    bestTime:
      'Early morning or late afternoon brings gentler temperatures and changing light. Visibility depends on current mountain weather.',
    coordinates: {lat: 9.1967629, lng: 123.143522},
    destinationType: 'viewpoint',
    difficulty: 'moderate',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=9.1967629,123.143522',
    excerpt: 'A green ridge and an elevated view across the mountains, countryside and Bohol Sea.',
    heroImage: {
      alt: 'The green ridge trail at Najandig Peak beneath a blue sky.',
      filename: 'najandig-peak-ridge.jpg',
      url: 'https://joshuaspoint.com/wp-content/uploads/2026/03/499367693_122213200064120364_6903412973555069464_n.jpg',
    },
    highlights: [
      'The drive climbs from villages and coconut groves into open mountain views.',
      'The viewpoint is about pausing in the landscape rather than conquering a summit.',
      'Light and visibility change quickly with mountain weather.',
    ],
    id: 'destination-najandig-peak',
    introduction:
      'Najandig Peak offers a different way to understand southern Negros: from above, with forested hills, countryside and the sea unfolding together. The drive, short walk and time at the viewpoint form one continuous experience.',
    related: ['destination-lake-balanan', 'destination-siaton', 'destination-apo-island'],
    slug: 'najandig-peak',
    story: [
      {
        heading: 'Above the Coast',
        body: 'As the road climbs, villages and coconut groves give way to wider views. Looking back, the landscape begins to arrange itself in layers from mountain to sea.',
      },
      {
        heading: 'A Place to Pause',
        body: 'The viewpoint asks for very little beyond time. Wind, birds and the scale of the countryside are enough reason to stop and look.',
      },
      {
        heading: 'First and Last Light',
        body: 'Morning and evening change the ridge through longer shadows and warmer colour. No two visits feel exactly the same because the mountain weather is always part of the view.',
      },
    ],
    thingsToBring: ['Comfortable footwear', 'Drinking water', 'Sun protection and a light layer'],
    tips: [
      'Give the viewpoint time rather than treating it as a quick photograph.',
      'Check current weather and access conditions before the mountain drive.',
    ],
    title: 'Najandig Peak',
    transport: ['car', 'hiredDriver'],
    travelMinutes: 35,
    travelTime: 'Around 30–40 minutes, followed by the walk to the viewpoint.',
    whyVisit:
      'We recommend Najandig Peak for the journey upward and the chance to stop above the coast, where mountains, countryside and sea can be seen together.',
  },
  {
    bestTime:
      'Morning is when the market and fishing port are most active and leaves the rest of the day for the southern hills.',
    coordinates: {lat: 9.0627498, lng: 123.0337961},
    destinationType: 'town',
    difficulty: 'easy',
    directionsUrl:
      'https://www.google.com/maps/dir/?api=1&origin=Calango,+Zamboanguita,+Negros+Oriental,+Philippines&destination=Siaton,+Negros+Oriental,+Philippines&travelmode=driving',
    excerpt:
      'A working market and fishing town that opens the road toward Lake Balanan and the southern hills.',
    highlights: [
      'The market and port show the everyday working rhythm of the town.',
      'Siaton is a natural pause before continuing inland.',
      'The road beyond town marks a change toward the quieter southern hills.',
    ],
    id: 'destination-siaton',
    introduction:
      'Siaton is less a conventional attraction than a working town on the journey south. Its market, fishing port and place on the road to Lake Balanan and Najandig Peak make it worth noticing rather than simply passing through.',
    related: ['destination-lake-balanan', 'destination-najandig-peak', 'destination-dumaguete'],
    scooterGuide: {
      difficulty: 'easy',
      fuel: 'Fuel is available in Siaton and should be taken on before continuing into the hills.',
      parking: 'Use established town-centre or market parking and avoid obstructing working areas.',
      roadQuality: 'paved',
      routeNotes:
        'Follow the coastal highway south. Siaton is the practical junction before the roads toward Lake Balanan and Najandig Peak.',
    },
    slug: 'siaton',
    story: [
      {
        heading: 'The Morning Market',
        body: 'Fish, vegetables and the practical business of the day fill the market early. It is everyday provincial life, not a performance arranged for visitors.',
      },
      {
        heading: 'The Fishing Port',
        body: 'Outrigger boats return to the small harbour and the catch moves into town. Watching quietly offers a glimpse of how closely Siaton remains connected to the sea.',
      },
      {
        heading: 'The Road South',
        body: 'Beyond Siaton, the road begins to climb toward Lake Balanan and Najandig Peak. The town is the hinge between the coast and the greener interior.',
      },
    ],
    thingsToBring: [
      'A little cash for market or food stops',
      'Drinking water for the onward journey',
    ],
    tips: [
      'Visit the market and port respectfully; they are working places.',
      'Use Siaton as a practical pause before continuing into the hills.',
    ],
    title: 'Siaton',
    transport: ['car', 'scooter', 'hiredDriver', 'publicTransport'],
    travelMinutes: 25,
    travelTime: 'Around 20–30 minutes south along the coast.',
    whyVisit:
      'We recommend paying attention to Siaton because it shows everyday southern Negros and gives the journey toward the lake and mountains a natural beginning.',
  },
]

const existingDestinationCompletions = [
  {
    bestTime:
      'Visit in daylight and allow time for both the descent and the return. Rain can make the route slippery, so check current conditions before leaving.',
    coordinates: {lat: 9.2786432, lng: 123.2052079},
    difficulty: 'demanding',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=9.2786432,123.2052079',
    heroImage: {
      alt: 'A person standing before Casaroro Falls in a deep tropical forest gorge.',
      filename: 'casaroro-falls-owner-photography.jpg',
      url: 'https://joshuaspoint.com/wp-content/uploads/2026/03/539588359_1206921484786755_8903495630037873207_n.jpg',
    },
    id: 'destination-casaroro-falls',
    related: ['destination-valencia', 'destination-pulangbato-falls', 'destination-twin-lakes'],
    scooterGuide: {
      _type: 'scooterGuide',
      difficulty: 'moderate',
      fuel: 'Refuel before the highland climb or in Valencia.',
      lastReviewedAt: reviewedAt.slice(0, 10),
      parking: 'Use the established visitor parking near the beginning of the descent.',
      roadQuality: 'mixed',
      routeNotes:
        'The route climbs through Valencia before the final approach toward the falls. Continue only when current road and weather conditions are suitable.',
    },
    transport: ['car', 'scooter', 'hiredDriver'],
    travelMinutes: 55,
    travelTime: 'Around 55 minutes into the Valencia highlands.',
  },
  {
    bestTime:
      'Begin earlier in the day so the lake journey, forest walk and return do not feel rushed. Mountain weather can change.',
    coordinates: {lat: 9.1377111, lng: 122.9986431},
    difficulty: 'moderate',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=9.1377111,122.9986431',
    heroImage: {
      alt: 'People travelling by boat across green water surrounded by tropical vegetation at Lake Balanan.',
      filename: 'lake-balanan-boat-journey.webp',
      url: 'https://joshuaspoint.com/wp-content/uploads/2026/07/468101457_10161873499284561_9068915744854294222_n.webp',
    },
    id: 'destination-lake-balanan',
    related: ['destination-siaton', 'destination-najandig-peak'],
    scooterGuide: {
      _type: 'scooterGuide',
      difficulty: 'moderate',
      fuel: 'Refuel in Siaton before continuing into the hills.',
      lastReviewedAt: reviewedAt.slice(0, 10),
      parking:
        'Use the established visitor parking at the lake and follow current local instructions.',
      roadQuality: 'mixed',
      routeNotes:
        'Follow the southern coastal highway to Siaton, then continue on the verified inland route toward the lake.',
    },
    transport: ['car', 'scooter', 'hiredDriver'],
    travelMinutes: 45,
    travelTime: 'Around 40–50 minutes through Siaton and into the hills.',
  },
] as const

let keyIndex = 0

function nextKey(prefix: string) {
  keyIndex += 1
  return `${prefix}-${keyIndex}`
}

function portableText(entries: DestinationSource['story']) {
  return entries.flatMap(({heading, body}) => [
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

async function uploadImage(image: SourceImage) {
  const existingId = await client.fetch<string | null>(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]._id',
    {filename: image.filename},
  )

  const assetId = existingId ?? (await uploadNewImage(image))

  return {
    _type: 'image',
    alt: image.alt,
    asset: {_ref: assetId, _type: 'reference'},
    credit: "Joshua's Point",
    decorative: false,
  }
}

async function uploadNewImage(image: SourceImage) {
  const response = await fetch(image.url)
  if (!response.ok) throw new Error(`Unable to download ${image.url}: ${response.status}`)

  const asset = await client.assets.upload('image', await response.blob(), {
    filename: image.filename,
    source: {id: image.url, name: "Joshua's Point existing website"},
  })
  return asset._id
}

async function migrateDestination(source: DestinationSource) {
  const heroImage = source.heroImage ? await uploadImage(source.heroImage) : undefined
  const document = {
    _id: source.id,
    _type: 'destination',
    destinationType: source.destinationType,
    editorialIntroduction: source.introduction,
    excerpt: source.excerpt,
    highlights: source.highlights,
    ...(heroImage ? {heroImage} : {}),
    interactiveMapEnabled: false,
    internalTitle: source.title,
    lastReviewedAt: reviewedAt,
    mapLocation: {
      _type: 'mapLocation',
      coordinates: {_type: 'geopoint', ...source.coordinates},
      directionsUrl: source.directionsUrl,
      label: source.title,
    },
    scooterFriendly: source.transport.includes('scooter'),
    ...(source.scooterGuide
      ? {
          scooterGuide: {
            _type: 'scooterGuide',
            ...source.scooterGuide,
            lastReviewedAt: reviewedAt.slice(0, 10),
          },
        }
      : {}),
    seo: {
      _type: 'seo',
      metaDescription: source.excerpt,
      metaTitle: `${source.title} | Joshua's Point`,
      noIndex: false,
    },
    slug: {_type: 'slug', current: source.slug},
    story: portableText(source.story),
    thingsToBring: source.thingsToBring,
    tips: source.tips,
    title: source.title,
    travelInformation: {
      _type: 'travelInformation',
      bestTimeToVisit: source.bestTime,
      difficulty: source.difficulty,
      recommendedTransport: source.transport,
      travelTimeFromJoshuaPoint: {
        _type: 'travelTime',
        displayLabel: source.travelTime,
        durationMinutes: source.travelMinutes,
      },
    },
    whyVisit: source.whyVisit,
    workflowStatus: 'approved',
  }

  await client.createOrReplace(document)
  console.log(`Published ${source.title} as ${source.id}`)
}

async function main() {
  for (const source of sources) {
    await migrateDestination(source)
  }

  for (const source of sources) {
    await client
      .patch(source.id)
      .set({
        relatedDestinations: source.related.map((id) => ({
          _key: id,
          _ref: id,
          _type: 'reference',
        })),
      })
      .commit()
  }

  for (const completion of existingDestinationCompletions) {
    const heroImage = await uploadImage(completion.heroImage)
    await client
      .patch(completion.id)
      .set({
        heroImage,
        lastReviewedAt: reviewedAt,
        mapLocation: {
          _type: 'mapLocation',
          coordinates: {_type: 'geopoint', ...completion.coordinates},
          directionsUrl: completion.directionsUrl,
          label: completion.id === 'destination-casaroro-falls' ? 'Casaroro Falls' : 'Lake Balanan',
        },
        relatedDestinations: completion.related.map((id) => ({
          _key: id,
          _ref: id,
          _type: 'reference',
        })),
        scooterFriendly: true,
        scooterGuide: completion.scooterGuide,
        travelInformation: {
          _type: 'travelInformation',
          bestTimeToVisit: completion.bestTime,
          difficulty: completion.difficulty,
          recommendedTransport: [...completion.transport],
          travelTimeFromJoshuaPoint: {
            _type: 'travelTime',
            displayLabel: completion.travelTime,
            durationMinutes: completion.travelMinutes,
          },
        },
      })
      .commit()
  }
}

main().catch((error) => {
  console.error(error)
  throw error
})
