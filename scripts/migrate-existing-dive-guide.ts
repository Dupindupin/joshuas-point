import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-10'})
const reviewedAt = '2026-08-10T00:00:00.000Z'

type DiveAreaSource = {
  excerpt: string
  heroFromDestination?: string
  id: string
  marineLife: string[]
  name: string
  nearbyDestinations: string[]
  photographyNotes: string
  relatedDiveSites: string[]
  slug: string
  story: Array<{body: string; heading: string}>
}

const diveAreas: DiveAreaSource[] = [
  {
    excerpt:
      'A community-protected island reef known for coral, sea turtles and dive sites with very different characters.',
    heroFromDestination: 'destination-apo-island',
    id: 'dive-site-apo-island',
    marineLife: [
      'Green and hawksbill turtle observations',
      'Schools of reef fish',
      'Soft and hard coral',
      'Occasional reef shark observations',
    ],
    name: 'Apo Island',
    nearbyDestinations: ['destination-apo-island', 'destination-dauin'],
    photographyNotes:
      'Apo Island offers both wider reef scenes and quieter turtle encounters. Keep distance, never chase marine life and follow the direction of the local guide.',
    relatedDiveSites: ['dive-site-dauin', 'dive-site-zamboanguita'],
    slug: 'apo-island',
    story: [
      {
        body: 'Apo Island’s relationship with the sea is inseparable from the community that chose to protect part of its reef. That history is still present in the way the island is approached: with a local guide, attention and respect for the water.',
        heading: 'A Reef Shaped by Community',
      },
      {
        body: 'The island is not one single dive. Some areas are calm enough for time near the shallows, while others are known for walls and stronger water. A qualified local operator chooses the site according to the day and the diver.',
        heading: 'Different Sides of the Island',
      },
      {
        body: 'One of the lasting memories is a turtle moving through the water without hurry. Watching without touching or crowding it is part of what makes the encounter worth remembering.',
        heading: 'Time With the Turtles',
      },
    ],
  },
  {
    excerpt:
      'Black volcanic sand and slow, attentive diving where small and well-camouflaged marine life becomes the focus.',
    heroFromDestination: 'destination-dauin',
    id: 'dive-site-dauin',
    marineLife: [
      'Frogfish observations',
      'Nudibranch and sea-slug observations',
      'Seahorse observations',
      'Ghost pipefish observations',
      'Mimic octopus observations',
    ],
    name: 'Dauin',
    nearbyDestinations: ['destination-dauin', 'destination-dumaguete'],
    photographyNotes:
      'Dauin rewards patient macro photography and careful buoyancy above the sand. A local guide can find details that are easy to pass without noticing.',
    relatedDiveSites: ['dive-site-apo-island', 'dive-site-zamboanguita'],
    slug: 'dauin',
    story: [
      {
        body: 'Dauin’s black volcanic sand asks for a different way of seeing. Instead of covering distance, divers move slowly and look for the small signs of marine life hiding in plain sight.',
        heading: 'Looking More Closely',
      },
      {
        body: 'Frogfish, nudibranchs, seahorses and pipefish have all been observed along this coast. None is guaranteed. The pleasure lies in the search and in the skill of a guide who knows how to read the sand.',
        heading: 'Life on the Sand',
      },
      {
        body: 'Many areas are reached from shore, which gives a dive day in Dauin an easy rhythm. The right site and current conditions should always be chosen with a qualified local operator.',
        heading: 'A Coast of Shore Dives',
      },
    ],
  },
  {
    excerpt:
      'The closest dive area to Joshua’s Point, with quieter reefs and a mix of sand, coral and everyday coastal life.',
    id: 'dive-site-zamboanguita',
    marineLife: [
      'Frogfish observations',
      'Nudibranch observations',
      'Moray eel observations',
      'Reef fish',
      'Occasional turtle observations',
    ],
    name: 'Zamboanguita',
    nearbyDestinations: ['destination-apo-island', 'destination-siaton'],
    photographyNotes:
      'The area can offer both smaller subjects over sand and wider reef scenes. Photograph what is present without moving, touching or crowding marine life.',
    relatedDiveSites: ['dive-site-apo-island', 'dive-site-dauin'],
    slug: 'zamboanguita',
    story: [
      {
        body: 'Zamboanguita is the closest of the three dive areas we recommend from Joshua’s Point. The short coastal journey makes it easy to give the water part of a day without turning the whole stay into a dive schedule.',
        heading: 'Close to the House',
      },
      {
        body: 'The coast does not commit to only one style. Sand and smaller marine life sit near coral and reef fish, creating a quieter mix of the underwater landscapes found farther north and offshore.',
        heading: 'Between Sand and Reef',
      },
      {
        body: 'Malatapay also connects this coast with Apo Island. Boats, shore entries and the working life around the water make the departure part of the story rather than only a transfer.',
        heading: 'The Crossing Begins Here',
      },
    ],
  },
]

let keyIndex = 0

function nextKey(prefix: string) {
  keyIndex += 1
  return `${prefix}-${keyIndex}`
}

function portableText(entries: Array<{body: string; heading: string}>) {
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
  return portableText([{body: text, heading: ''}]).slice(1)
}

async function getDestinationImage(destinationId?: string) {
  if (!destinationId) return undefined
  return client.fetch<unknown>(`*[_id == $id][0].heroImage`, {id: destinationId})
}

async function migrateDiveArea(source: DiveAreaSource) {
  const heroImage = await getDestinationImage(source.heroFromDestination)
  await client.createOrReplace({
    _id: source.id,
    _type: 'diveSite',
    description: portableText(source.story),
    excerpt: source.excerpt,
    ...(heroImage ? {heroImage} : {}),
    interactiveMapEnabled: false,
    internalTitle: `${source.name} Dive Guide`,
    lastReviewedAt: reviewedAt,
    marineLife: source.marineLife,
    name: source.name,
    nearbyDestinations: source.nearbyDestinations.map((id) => ({
      _key: id,
      _ref: id,
      _type: 'reference',
    })),
    photographyNotes: paragraphBlock(source.photographyNotes),
    seo: {
      _type: 'seo',
      metaDescription: source.excerpt,
      metaTitle: `${source.name} Diving | Joshua's Point`,
      noIndex: false,
    },
    slug: {_type: 'slug', current: source.slug},
    workflowStatus: 'approved',
  })
  console.log(`Published ${source.name} Dive Guide.`)
}

async function migrateIndex() {
  await client.createOrReplace({
    _id: 'diveSitesPage',
    _type: 'diveSitesPage',
    editorialCopy: paragraphBlock(
      'Apo Island, Dauin and Zamboanguita are close to one another, but each feels different below the surface. Current conditions, site choice and technical decisions always belong in a briefing with a qualified local operator.',
    ),
    featuredDiveSites: diveAreas.map((area) => ({
      _key: area.slug,
      _ref: area.id,
      _type: 'reference',
    })),
    hero: {
      _type: 'pageHero',
      eyebrow: 'Dive Guide',
      introduction:
        'Apo Island, Dauin and Zamboanguita each have their own character below the surface.',
      title: 'Below the surface of Southern Negros.',
    },
    internalTitle: 'Dive Sites Page',
    introduction:
      'Apo Island brings coral and turtles; Dauin rewards close looking over black volcanic sand; Zamboanguita offers a quieter mix of reef and smaller marine life close to the house.',
    lastReviewedAt: reviewedAt,
    seo: {
      _type: 'seo',
      metaDescription:
        'A guide to diving around Apo Island, Dauin and Zamboanguita from Joshua’s Point.',
      metaTitle: `Southern Negros Dive Guide | Joshua's Point`,
      noIndex: false,
    },
    workflowStatus: 'approved',
  })
  console.log('Published Dive Sites Page.')
}

async function main() {
  for (const area of diveAreas) await migrateDiveArea(area)
  for (const area of diveAreas) {
    await client
      .patch(area.id)
      .set({
        relatedDiveSites: area.relatedDiveSites.map((id) => ({
          _key: id,
          _ref: id,
          _type: 'reference',
        })),
      })
      .commit()
  }
  await migrateIndex()
}

main().catch((error) => {
  console.error(error)
  throw error
})
