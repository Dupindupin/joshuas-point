import {getCliClient} from 'sanity/cli'

declare const process: {argv: string[]}

const client = getCliClient({apiVersion: '2026-08-10'})
const applyChanges = process.argv.includes('--apply')
const routeFuelOnly = process.argv.includes('--route-fuel-only')

type StorySection = {
  body: string
  heading: string
}

function paragraphBlock(text: string, key: string) {
  return [
    {
      _key: `${key}-body`,
      _type: 'block',
      children: [
        {
          _key: `${key}-text`,
          _type: 'span',
          marks: [],
          text,
        },
      ],
      markDefs: [],
      style: 'normal',
    },
  ]
}

function storyBlocks(sections: StorySection[], prefix: string) {
  return sections.flatMap((section, index) => {
    const key = `${prefix}-${index + 1}`
    return [
      {
        _key: `${key}-heading`,
        _type: 'block',
        children: [
          {
            _key: `${key}-heading-text`,
            _type: 'span',
            marks: [],
            text: section.heading,
          },
        ],
        markDefs: [],
        style: 'h2',
      },
      {
        _key: `${key}-body`,
        _type: 'block',
        children: [
          {
            _key: `${key}-body-text`,
            _type: 'span',
            marks: [],
            text: section.body,
          },
        ],
        markDefs: [],
        style: 'normal',
      },
    ]
  })
}

const patches = [
  {
    id: 'destinationsPage',
    values: {
      editorialCopy: [
        {
          _key: 'travelHeading',
          _type: 'block',
          children: [
            {
              _key: 'travelHeadingText',
              _type: 'span',
              marks: [],
              text: 'Travel without urgency.',
            },
          ],
          markDefs: [],
          style: 'h2',
        },
        ...paragraphBlock(
          'Some places ask for a full day; others begin with a road that is worth taking slowly. We share what helps you understand each place before deciding how to go.',
          'travelBody',
        ),
        ...paragraphBlock(
          'There are fewer recommendations here on purpose. Each one leaves room for the landscape, local life, and the journey itself.',
          'travelBodyTwo',
        ),
      ],
      'hero.introduction':
        'A guide to places we return to from Joshua’s Point, shaped by what we notice along the way.',
      introduction:
        'Joshua’s Point is where the journey begins. Beyond the house, roads pass through changing landscapes and lead to places worth giving time to.',
    },
  },
  {
    id: 'destination-casaroro-falls',
    values: {
      editorialIntroduction:
        'We recommend Casaroro Falls for the landscape, the walk, the sense of adventure, and the waterfall itself. The journey through the jungle is as important as reaching the falls.',
      excerpt:
        'A walk through jungle and canyon, where quiet, effort, and the waterfall belong to the same journey.',
      highlights: [
        'The walk, canyon, and waterfall form one continuous journey.',
        'The jungle and quiet are as memorable as the waterfall.',
        'The return matters as much as the arrival at the falls.',
      ],
      'seo.metaDescription':
        'A walk through jungle and canyon to Casaroro Falls, with the descent, quiet, and return all part of the experience.',
      story: storyBlocks(
        [
          {
            body: 'The experience begins with the way down. The walk draws attention to the jungle, the landscape, and the quiet before reaching the waterfall.',
            heading: 'The Descent',
          },
          {
            body: 'The journey continues through the canyon toward the waterfall. The movement through the place matters as much as the arrival.',
            heading: 'Through the Gorge',
          },
          {
            body: 'The climb back completes the journey. It takes effort, and the happiness at the end is part of why we recommend it.',
            heading: 'The Return',
          },
        ],
        'casaroro',
      ),
      whyVisit:
        'We recommend Casaroro Falls for the walk, the jungle, the quiet, and the waterfall—and for the feeling of having made the whole journey.',
    },
  },
  {
    id: 'destination-lake-balanan',
    values: {
      editorialIntroduction:
        'We have returned to Lake Balanan many times. The lake, mountains, forest, and the journey through them make it a place we are always happy to recommend.',
      excerpt:
        'A journey across the lake and into the jungle, with mountains, quiet, and a small waterfall along the way.',
      highlights: [
        'The lake crossing, jungle walk, and small waterfall belong to one journey.',
        'The mountains, forest, and quiet are what stay in the memory.',
        'The day can feel both peaceful and adventurous.',
      ],
      'seo.metaDescription':
        'A Joshua’s Point guide to Lake Balanan through the lake, mountains, jungle, quiet, and small waterfall.',
      story: storyBlocks(
        [
          {
            body: 'The journey begins on the lake. Crossing by canoe, with water and mountains around you, is not only a way to reach the far side; it is part of what makes the day memorable.',
            heading: 'Across the Lake',
          },
          {
            body: 'From the lake, the walk continues through the jungle toward a small waterfall. The forest and quiet give this part of the journey its own character.',
            heading: 'Into the Jungle',
          },
          {
            body: 'The lake, mountains, forest, and waterfall belong to one journey. Together they make the day both peaceful and adventurous.',
            heading: 'A Journey of Discovery',
          },
        ],
        'balanan',
      ),
      whyVisit:
        'We recommend Lake Balanan for the whole journey: across the lake, through the jungle, and into the mountains, with quiet and a small waterfall along the way.',
    },
  },
  {
    id: 'scenicRoutesPage',
    values: {
      editorialCopy: paragraphBlock(
        'These are roads we return to from Joshua’s Point. Some follow the coast; others climb into forest and mountain air. Each is best approached with time to stop, look around, and let the road become part of the day.',
        'routes',
      ),
      'hero.introduction':
        'Five journeys from Joshua’s Point, following the coast and quieter roads into Southern Negros.',
      introduction:
        'Exploring from Joshua’s Point is not only about arriving somewhere. The changing coast, towns, forest, and mountain roads are part of the day.',
      'seo.metaDescription':
        'Five scenic journeys from Joshua’s Point through the coast and highlands of Southern Negros.',
    },
  },
  {
    id: 'diveSitesPage',
    values: {
      editorialCopy: paragraphBlock(
        'Apo Island, Dauin, and Zamboanguita are close to one another, but each feels different below the surface. Current conditions, site choice, and technical decisions always belong in a briefing with a qualified local operator.',
        'dive-guide',
      ),
      'hero.introduction':
        'Apo Island, Dauin, and Zamboanguita each have their own character below the surface.',
      'hero.title': 'Below the surface of Southern Negros.',
      'seo.metaDescription':
        'A guide to diving around Apo Island, Dauin, and Zamboanguita from Joshua’s Point.',
    },
  },
  {
    id: 'dive-site-apo-island',
    values: {
      description: storyBlocks(
        [
          {
            body: 'Apo Island’s relationship with the sea is inseparable from the community that chose to protect part of its reef. That history is still present in the way the island is approached: with a local guide, attention, and respect for the water.',
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
        'dive-apo',
      ),
    },
  },
  {
    id: 'dive-site-zamboanguita',
    values: {
      description: storyBlocks(
        [
          {
            body: 'Zamboanguita is the closest of the three dive areas we recommend from Joshua’s Point. The short coastal journey makes it easy to give the water part of a day without turning the whole stay into a dive schedule.',
            heading: 'Close to the House',
          },
          {
            body: 'The coast does not commit to only one style. Sand and smaller marine life sit near coral and reef fish, creating a quieter mix of the underwater landscapes found farther north and offshore.',
            heading: 'Between Sand and Reef',
          },
          {
            body: 'Malatapay also connects this coast with Apo Island. Boats, shore entries, and the working life around the water make the departure part of the story rather than only a transfer.',
            heading: 'The Crossing Begins Here',
          },
        ],
        'dive-zamboanguita',
      ),
    },
  },
  {
    id: 'scenic-route-coastal-ride-to-dumaguete',
    values: {
      'scooterGuide.fuel':
        'Fuel stations are available around Dauin and on the approach to Dumaguete. Start with enough fuel for the return journey.',
    },
  },
  {
    id: 'scenic-route-valencia-highlands-loop',
    values: {
      'scooterGuide.fuel':
        'Begin the climb with enough fuel rather than depending on smaller highland stops.',
    },
  },
  {
    id: 'scenic-route-waterfall-explorer',
    values: {
      'scooterGuide.fuel':
        'Refuel in or before Valencia rather than relying on stops near the falls.',
    },
  },
  {
    id: 'scenic-route-twin-lakes-escape',
    values: {
      'scooterGuide.fuel':
        'Refuel in or before Valencia before continuing into the higher roads.',
    },
  },
] as const

const selectedPatches = routeFuelOnly
  ? patches.filter(({id}) => id.startsWith('scenic-route-'))
  : patches

async function main() {
  if (!applyChanges) {
    console.log('Dry run. Documents prepared for editorial polish:')
    selectedPatches.forEach(({id}) => console.log(`- ${id}`))
    console.log('Run with --apply to commit these field-level patches.')
    return
  }

  for (const {id, values} of selectedPatches) {
    const exists = await client.fetch<boolean>('defined(*[_id == $id][0]._id)', {id})
    if (!exists) throw new Error(`Published document not found: ${id}`)
    await client.patch(id).set(values).commit()
    console.log(`Updated ${id}`)
  }
}

main().catch((error) => {
  console.error(error)
  throw error
})
