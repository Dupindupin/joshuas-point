import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-12'})
const rawClient = client.withConfig({perspective: 'raw'})

type EditorialImage = {_key?: string; asset?: {_ref?: string}}
type LegacyFrame = {image?: EditorialImage; phase?: string}
type ExistingStory = {
  closingImages?: EditorialImage[]
  detailImages?: EditorialImage[]
  frames?: LegacyFrame[]
  heroImage?: EditorialImage
  journeyImages?: EditorialImage[]
  openingImages?: EditorialImage[]
}

type StoryPlan = {
  accessibleLabel: string
  introduction: string
  purpose: string
  title: string
}

const plans: Record<string, StoryPlan[]> = {
  'destination-apo-island': [
    {
      title: 'Arrival by sea and island life',
      purpose:
        'Move from the banka approach and shoreline arrival into reef context, observed island life and the return crossing.',
      introduction:
        'The photographs should connect the sea crossing, time on the island and the underwater world without turning wildlife into a promise.',
      accessibleLabel: 'A visual story of approaching, experiencing and leaving Apo Island',
    },
  ],
  'destination-casaroro-falls': [
    {
      title: 'Descent, gorge and reveal',
      purpose:
        'Follow the actual experience from the steps and bamboo through the canyon and river to the late reveal of the waterfall and the climb back.',
      introduction:
        'The sequence should let the approach carry as much meaning as the waterfall itself.',
      accessibleLabel: 'A visual journey down to Casaroro Falls and back through the gorge',
    },
  ],
  'destination-dauin': [
    {
      title: 'Underwater World',
      purpose:
        'Begin with black volcanic sand and habitat, move through patient macro observation and reef detail, then return to the wider underwater environment.',
      introduction:
        'The underwater story should show habitat and observation without implying guaranteed encounters.',
      accessibleLabel: 'Dauin underwater photography from black sand and macro life to reef context',
    },
    {
      title: 'Life Around Dauin',
      purpose:
        'Show the quiet coastline, preparation around dive centres, cafés, working shore and late-day light as one lived coastal rhythm.',
      introduction:
        'Dauin is more than a dive entry point; the photographs should preserve the daily life around the coast.',
      accessibleLabel: 'A visual story of daily life along the Dauin coast',
    },
  ],
  'destination-dumaguete': [
    {
      title: 'A city beside the sea',
      purpose:
        'Move from the waterfront into streets, market or food detail and back to the sea so Dumaguete feels lived-in rather than landmark-led.',
      introduction:
        'The sequence should establish Dumaguete as a gateway with its own everyday rhythm.',
      accessibleLabel: 'A visual walk from Dumaguete waterfront into the city and back',
    },
  ],
  'destination-lake-balanan': [
    {
      title: 'Across the lake and into the forest',
      purpose:
        'Follow the mountain approach, canoe journey, forest walk and small waterfall, closing again on the lake and surrounding hills.',
      introduction:
        'The photographs should make the movement across water and into forest the centre of the story.',
      accessibleLabel: 'A visual journey across Lake Balanan and into the surrounding forest',
    },
  ],
  'destination-najandig-peak': [
    {
      title: 'The ridge and the return',
      purpose:
        'Show the road into higher country, the changing ridge landscape, observed rural detail and the wider view before the journey returns.',
      introduction:
        'The sequence should preserve the road, mountain landscape and honest scale of the journey.',
      accessibleLabel: 'A visual journey through the highland road and ridge landscape of Najandig Peak',
    },
  ],
  'destination-pulangbato-falls': [
    {
      title: 'Water and mineral-coloured stone',
      purpose:
        'Orient the reader in the wider setting, follow the approach, observe water and stone, and close with the surrounding highlands.',
      introduction:
        'Water, stone and the wider highland setting should unfold as one story rather than a collection of waterfall views.',
      accessibleLabel: 'A visual journey through water and mineral-coloured stone at Pulangbato Falls',
    },
  ],
  'destination-siaton': [
    {
      title: 'Coast, town and inland road',
      purpose:
        'Establish Siaton in its coastal setting, move through everyday town and road detail, then open toward the inland landscape.',
      introduction:
        'The photographs should connect everyday coastal life with the roads leading inland.',
      accessibleLabel: 'A visual story connecting the coast, town and inland landscape around Siaton',
    },
  ],
  'destination-twin-lakes': [
    {
      title: 'Into forest and lake country',
      purpose:
        'Show the climb from the coast, first water, forest and mist detail, then the landscape opening again on the return.',
      introduction:
        'The story should preserve the change from road to forest, water and mountain weather.',
      accessibleLabel: 'A visual journey from the mountain approach into the forest and lake atmosphere of Twin Lakes',
    },
  ],
  'destination-valencia': [
    {
      title: 'From town into the highlands',
      purpose:
        'Begin with Valencia as a lived-in town, then follow water, forest and agricultural detail into the wider highland landscape.',
      introduction:
        'The sequence should connect everyday town life with the mountain environment around it.',
      accessibleLabel: 'A visual journey from Valencia town into its water, forest and highland landscape',
    },
  ],
  'dive-site-apo-island': [
    {
      title: 'Reef, wildlife and island context',
      purpose:
        'Move from island and surface context into a wide reef view, observed wildlife and coral detail, then close with the island or boat above.',
      introduction:
        'The dive story should establish habitat before individual encounters and keep sightings observational rather than guaranteed.',
      accessibleLabel: 'A visual dive story connecting Apo Island, its reef environment and observed marine life',
    },
  ],
  'dive-site-dauin': [
    {
      title: 'Underwater World',
      purpose:
        'Establish the dark sand habitat, follow a careful dive observation, include truthful macro and wider environmental details, and return to the coast.',
      introduction:
        'The sequence should show why patient observation matters in Dauin without becoming a species catalogue.',
      accessibleLabel: 'A visual dive story of Dauin’s dark sand habitat and observed marine life',
    },
  ],
  'dive-site-zamboanguita': [
    {
      title: 'A broader dive coast',
      purpose:
        'Orient the reader along the Zamboanguita coast, show preparation and water entry, move into confirmed habitat, and return to the wider coast.',
      introduction:
        'The visual story should distinguish the wider Zamboanguita coast without exposing technical or sensitive site coordinates.',
      accessibleLabel: 'A visual dive story connecting the Zamboanguita coast with its underwater environment',
    },
  ],
  'scenic-route-coastal-ride-to-dumaguete': [
    {
      title: 'Life along the coast road',
      purpose:
        'Follow the road from Joshua’s Point through small stops, working coast and village detail toward Dumaguete, then close with the changing coast.',
      introduction:
        'The photographs should make the ordinary coastal journey the subject rather than a list of attractions.',
      accessibleLabel: 'A visual journey along the coast road from Joshua’s Point toward Dumaguete',
    },
  ],
  'scenic-route-southern-explorer': [
    {
      title: 'Roads through the southern landscape',
      purpose:
        'Move from the coast into southern roads, working landscape and high ground, using only correctly identified places and respectful observations.',
      introduction:
        'The sequence should show how the landscape changes along the journey without assigning one photograph to an entire region.',
      accessibleLabel: 'A visual journey through the changing coastal, rural and highland landscape of southern Negros',
    },
  ],
  'scenic-route-twin-lakes-escape': [
    {
      title: 'From coast to mountain water',
      purpose:
        'Follow the route’s change in elevation from the lowland road into forest, lake and mountain weather, then show the descent home.',
      introduction:
        'The visual story should make the transition from coast to lake country clearly felt.',
      accessibleLabel: 'A visual road journey from the coast into the forest and water of Twin Lakes',
    },
  ],
  'scenic-route-valencia-highlands-loop': [
    {
      title: 'A loop through the highlands',
      purpose:
        'Establish the climb, show road transitions and verified highland details, then close with the coast or lower landscape returning into view.',
      introduction:
        'The route should read as a changing highland journey rather than a collection of endpoint photographs.',
      accessibleLabel: 'A visual loop through Valencia’s roads, water and highland landscape',
    },
  ],
  'scenic-route-waterfall-explorer': [
    {
      title: 'The road between two waterfall journeys',
      purpose:
        'Connect departure, Valencia highlands, the Casaroro descent and Pulangbato setting, ending with the road home rather than repeating destination galleries.',
      introduction:
        'The photographs should tell one day’s movement through road, gorge, water and return.',
      accessibleLabel: 'A visual journey from Joshua’s Point through Valencia to Casaroro and Pulangbato Falls',
    },
  ],
}

const previouslySelectedPhotography: Record<string, EditorialImage[]> = {
  'scenic-route-southern-explorer': [
    {
      _key: 'detail-najandig-peak',
      _type: 'image',
      alt: 'Najandig Peak seen across the surrounding green landscape',
      asset: {
        _ref: 'image-002907e4827dd253188095d08456193775cb1dc1-1440x786-jpg',
        _type: 'reference',
      },
      credit: "Joshua's Point",
      decorative: false,
    } as EditorialImage,
  ],
}

function keyed(images: EditorialImage[] | undefined, prefix: string) {
  return (images ?? []).map((image, index) => ({...image, _key: image._key || `${prefix}-${index + 1}`}))
}

function imagesFor(existing: ExistingStory | undefined, phase: string) {
  return keyed(
    existing?.frames?.filter((frame) => frame.phase === phase && frame.image?.asset?._ref).map((frame) => frame.image!) ?? [],
    phase,
  )
}

function preparedStory(id: string, plan: StoryPlan, index: number, existing?: ExistingStory) {
  const existingDetails = keyed(existing?.detailImages, 'detail').length
    ? keyed(existing?.detailImages, 'detail')
    : imagesFor(existing, 'detail')
  return {
    _key: `story-${index + 1}`,
    _type: 'editorialPhotoStory',
    accessibleLabel: plan.accessibleLabel,
    closingImages: keyed(existing?.closingImages, 'closing').length
      ? keyed(existing?.closingImages, 'closing')
      : imagesFor(existing, 'closing'),
    detailImages:
      existingDetails.length > 0
        ? existingDetails
        : index === 0
          ? previouslySelectedPhotography[id] ?? []
          : [],
    heroImage: existing?.heroImage,
    introduction: plan.introduction,
    journeyImages: keyed(existing?.journeyImages, 'journey').length
      ? keyed(existing?.journeyImages, 'journey')
      : imagesFor(existing, 'journey'),
    openingImages: keyed(existing?.openingImages, 'opening').length
      ? keyed(existing?.openingImages, 'opening')
      : imagesFor(existing, 'opening'),
    purpose: plan.purpose,
    title: plan.title,
  }
}

async function run() {
  const ids = Object.keys(plans)
  const documents = await rawClient.fetch<Array<Record<string, unknown> & {_id: string; _type: string}>>(
    '*[_id in $ids || _id in $draftIds]',
    {ids, draftIds: ids.map((id) => `drafts.${id}`)},
  )

  for (const id of ids) {
    const source =
      documents.find((document) => document._id === `drafts.${id}`) ??
      documents.find((document) => document._id === id)
    if (!source) throw new Error(`Missing source document: ${id}`)

    const existingPhotography = source.editorialPhotography as
      | {stories?: ExistingStory[]}
      | undefined
    const {_createdAt, _rev, _updatedAt, ...content} = source
    void _createdAt
    void _rev
    void _updatedAt

    await client.createOrReplace({
      ...content,
      _id: `drafts.${id}`,
      editorialPhotography: {
        _type: 'editorialPhotography',
        stories: plans[id].map((plan, index) =>
          preparedStory(id, plan, index, existingPhotography?.stories?.[index]),
        ),
      },
    })
  }

  const verification = await rawClient.fetch(
    `*[_id in $draftIds] | order(_type asc, title asc) {
      _id,
      _type,
      title,
      "storyCount": count(editorialPhotography.stories),
      "stories": editorialPhotography.stories[]{
        title,
        "hero": defined(heroImage.asset),
        "opening": count(openingImages[defined(asset)]),
        "journey": count(journeyImages[defined(asset)]),
        "details": count(detailImages[defined(asset)]),
        "closing": count(closingImages[defined(asset)])
      }
    }`,
    {draftIds: ids.map((id) => `drafts.${id}`)},
  )

  console.log(JSON.stringify({documentsPrepared: ids.length, verification}, null, 2))
}

void run()
