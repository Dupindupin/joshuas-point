import type {EditorialImage} from '@/components/editorial'

export type ReaderChapterSection = {
  body: readonly string[]
  kind?: 'field-notes' | 'prose'
  title: string
}

export type ReaderChapter = {
  image?: EditorialImage
  imageCaption?: string
  introduction: string
  journeySlug?: string
  mapCaption?: string
  number: string
  sections: readonly ReaderChapterSection[]
  slug: string
  title: string
}

export const readerChapters: readonly ReaderChapter[] = [
  {
    image: {
      alt: 'Morning light across the sea and green landscape seen from Joshua’s Point.',
      src: '/images/home/morning/1BB34E83-3CE5-45A0-B1BD-28FF9CB0E861_1_105_c.jpeg',
    },
    imageCaption: 'Morning at Joshua’s Point, before the day has chosen its direction.',
    introduction:
      'Every journey in this guide begins and ends at Joshua’s Point. The house is the centre; the wider region is the world around it.',
    number: '01',
    sections: [
      {
        body: [
          'Joshua’s Point is where this guide begins and where each journey returns.',
          'The house sits in Calango, Zamboanguita, with the Bohol Sea, Apo Island, Siquijor and Mount Talinis all belonging to its wider view. They do not appear in the same way every day. Weather moves across the sea and mountain, light changes, and sometimes the first useful decision is to wait before deciding where to go.',
          'I begin here: opening the glass doors, making coffee, sitting outside, listening to birds and looking towards sea and mountain. The day can take its direction from there.',
          'Joshua’s Point is a home before it is a base. The kitchen, dining area, living room and covered deck work as connected spaces. People can cook, eat, talk, sit quietly or move outdoors without the house asking everyone to do the same thing. The architecture frames the landscape, but nature sets the rhythm.',
        ],
        title: 'The place from which every journey begins',
      },
      {
        body: [
          'A clear plan is useful. So is being willing to change it.',
          'Before leaving, look at the conditions and at the people making the journey. An island day asks different questions from a waterfall walk. A flexible drive along the coast does not need the same preparation as a long descent into a gorge.',
          'This guide helps with sequence, preparation, maps and the small details I have learned from making these journeys. It cannot decide the weather, sea, road, access, energy or comfort of the group on a particular day. Those remain part of choosing well.',
          'The aim is not to fit the greatest number of places into a stay. It is to choose a journey that matches the day and leave enough room to notice it.',
        ],
        title: 'Reading the day',
      },
      {
        body: [
          'Choose the Waterfall Explorer when you want forest, water and a physical journey into the Valencia highlands.',
          'Choose Apo Island when the sea permits and the crossing itself is part of what you want to experience.',
          'Choose Lake Balanan for smaller roads, cultivated landscapes, mountain views and time beside the water.',
          'Choose The Coast Around Home when you want to stay close and allow ordinary local life to set the pace.',
          'Choose the Dauin Marine Coast when one place beside the water, rather than a circuit of stops, feels right for the day.',
        ],
        title: 'Choosing a journey',
      },
      {
        body: [
          'Coming back is part of the journey.',
          'At Joshua’s Point, evenings move between the deck, dining table, pool and living room. Warm air, lights around the house and distant island lights can give the day a quieter ending. On windy days, the bamboo moves and can be heard. When rain comes, the covered deck offers another way to remain close to the weather.',
          'There is no need to turn the evening into another itinerary. Food, conversation, a corner of the deck or time listening to the rain can be enough.',
        ],
        title: 'Returning',
      },
    ],
    slug: 'from-joshuas-point',
    title: 'From Joshua’s Point',
  },
  {
    introduction:
      'Dumaguete is the practical eastern gateway for a stay at Joshua’s Point, and the first quiet transition towards the south.',
    number: '02',
    sections: [
      {
        body: [
          'Dumaguete (Sibulan) Airport is in neighbouring Sibulan, the city port serves regional ferry connections, and the road south passes through Dauin before continuing towards Calango and Zamboanguita.',
          'The city can be treated as a connection, but it is often useful as a pause. Rizal Boulevard, the public market, cafés, local restaurants and the streets around the centre offer a way to arrive without moving immediately from one vehicle to the next.',
        ],
        title: 'Dumaguete as the gateway',
      },
      {
        body: [
          'Treat a flight and the final road journey as one arrival plan. Confirm the meeting point, onward transport and a working contact method. Keep the address and personal arrival instructions available offline, and share delays before the final leg begins.',
          'For a ferry arrival, confirm the operator, vessel, terminal and onward meeting point before travel. Build a sensible buffer around the connection; the sea does not follow a tightly planned road transfer.',
        ],
        title: 'Arriving by air or sea',
      },
      {
        body: [
          'If the arrival is early and the group has energy, a walk and something to eat may make the road south feel less like the last stage of a long transfer. If the journey has already been tiring, collect what is needed and continue.',
          'Food, drinking water, cash, personal medication, mobile data and other journey essentials are easier to consider here than after an avoidable need becomes urgent. No particular shopping centre, tenant or service is relied upon in this edition.',
        ],
        title: 'A useful pause in the city',
      },
      {
        body: [
          'The main road south passes through Dauin and onward towards Joshua’s Point. The city gives way to the Dauin coast, roadside communities, small stores and openings towards the sea.',
          'Near the end of the journey, follow the personal arrival instructions rather than a public map pin alone. The final approach should feel less like finding another destination and more like arriving at the place from which the rest of the guide begins.',
        ],
        title: 'Continuing south',
      },
    ],
    slug: 'arriving-through-dumaguete',
    title: 'Arriving Through Dumaguete',
  },
  {
    introduction:
      'Discovery begins close to home, along the coast I use for ordinary errands as well as unplanned pauses.',
    journeySlug: 'coast-around-home',
    mapCaption:
      'The coastal relationship around Joshua’s Point. Individual pauses remain flexible and public access must always be respected.',
    number: '03',
    sections: [
      {
        body: [
          'Joshua’s Point is in Calango, Zamboanguita. The coastline around it is not one named attraction. It is the road I use for food and daily essentials, the nearby communities, the shore, and the small places where an ordinary trip can become more interesting because I decide not to hurry.',
          'Small coffee shops, local restaurants, sari-sari stores, beaches, fishing villages and everyday activity appear along the coast. They are not fixed stops. They are the kinds of places and moments I have learned to notice on a road I travel regularly.',
          'I remember children playing beside the road, boys playing basketball, fishermen preparing boats for night fishing and the morning catch being unloaded. Roosters and village sounds accompany the road, and karaoke sometimes drifts through small communities.',
        ],
        title: 'The area around home',
      },
      {
        body: [
          'Malatapay is a working local place where trade, shore, boats and the road meet. Historical Joshua’s Point material records Wednesday as its main market day, but the current market schedule should be confirmed locally before planning a visit around it.',
          'Malatapay also serves as the mainland gateway for Apo Island. A market visit and an island departure are different experiences: being present for one does not arrange the other.',
        ],
        title: 'Malatapay',
      },
      {
        body: [
          'I recommend this nearby journey because it asks very little beyond curiosity. Leave Joshua’s Point without a fixed attraction to complete. If travelling by scooter, begin with enough fuel. Take the coast slowly and stop only where public access is clear and the pause feels natural.',
          'Be respectful, curious and open-minded. A smile, patience and kindness often create the best conversations. Return when the journey feels complete; its value is not measured by how many stops were made.',
        ],
        title: 'The Coast Around Home',
      },
    ],
    slug: 'zamboanguita-and-the-coast',
    title: 'Zamboanguita and the Coast Around Home',
  },
  {
    introduction:
      'Dauin is a small coastal town where black sand, water and everyday life share one slower rhythm.',
    journeySlug: 'dauin-marine-coast',
    mapCaption:
      'The coastal road places Dauin between Joshua’s Point and Dumaguete. It is orientation, not a dive map.',
    number: '04',
    sections: [
      {
        body: [
          'Dauin’s dark volcanic sand and marine life have made it closely associated with diving, but I do not think of it only through what happens underwater. Cafés, restaurants, the public market, the shore and the ordinary preparation of a dive day all belong to the place.',
          'I am an underwater photographer, and in Dauin I notice how the dark sand creates a clean, distinctive background for smaller marine life. Frogfish, nudibranchs, seahorses and pipefish have all been observed along this coast, but no particular encounter is promised.',
        ],
        title: 'A coast, not only a dive destination',
      },
      {
        body: [
          'I prefer spending the day at one resort or dive centre rather than moving among several. Divers, snorkellers and non-divers can shape different parts of the day without losing its centre.',
          'A dive day does not need to become a schedule of repeated entries. Lunch, coffee, a short walk or time watching the shore can give the day a different rhythm.',
          'Joshua’s Point does not operate dives. Site choice, certification, health, equipment and every technical decision belong to the guest and a qualified operator working with the conditions of that day.',
        ],
        title: 'Dauin Marine Coast Day',
      },
      {
        body: [
          'Stay with one place long enough to notice its rhythm. The coast between activities can remain in the memory as clearly as a particular marine sighting.',
        ],
        kind: 'field-notes',
        title: 'Field note',
      },
    ],
    slug: 'dauin-and-the-marine-coast',
    title: 'Dauin and the Marine Coast',
  },
  {
    introduction: 'The road to Valencia changes the landscape before the waterfalls appear.',
    journeySlug: 'waterfall-explorer',
    mapCaption:
      'The Waterfall Explorer joins Joshua’s Point, Valencia, Casaroro Falls and Pulangbato Falls before returning home.',
    number: '05',
    sections: [
      {
        body: [
          'I have made the journey to Casaroro Falls three times. What I remember begins before the waterfall: the long descent, big old bamboo beside the way, the canyon, a small river and cold water.',
          'I remember more than 300 steps and a walk of approximately 20 minutes, although these are my memories rather than surveyed measurements. The waterfall stayed hidden for much of the approach and appeared only in the final few minutes. That delayed view is part of why I recommend the place.',
          'The return matters too. The steps must be climbed again. I found it hard to keep up, and I still remember feeling happy at the end. I would not soften the effort or reduce the day to difficulty. Both belong to the experience.',
        ],
        title: 'Casaroro: the journey before the waterfall',
      },
      {
        body: [
          'Pulangbato brings the journey into a more open setting shaped by mineral-coloured rock. It can complete the highland day without competing with Casaroro. Continue only if the group still has the time and energy to experience it well.',
        ],
        title: 'Pulangbato: a change of atmosphere',
      },
      {
        body: [
          'I prefer to begin early. In my experience, there were fewer visitors at Casaroro earlier in the day, although crowd levels can never be promised.',
          'Allow the descent, canyon walk, waterfall and return climb the time they need. This is not a journey I generally recommend for elderly guests because of the remembered descent and climb. Age alone does not decide suitability, but strength, mobility, balance, footwear and current trail conditions matter.',
        ],
        title: 'The shape of the day',
      },
      {
        body: [
          'Do not hurry the reveal. Casaroro is memorable because the landscape makes you work towards it.',
        ],
        kind: 'field-notes',
        title: 'Field note',
      },
    ],
    slug: 'valencia-and-the-highlands',
    title: 'Valencia and the Highlands',
  },
  {
    introduction:
      'South of Joshua’s Point, the road moves between cultivated landscape, forest, lake and mountain views.',
    journeySlug: 'mountain-lake-explorer',
    number: '06',
    sections: [
      {
        body: [
          'I remember small roads, roosters, carabao, rice fields and people harvesting sugar cane on journeys through this part of Southern Negros. They will not appear in the same way on every drive. They are reasons to look at the road rather than wait for the destination before paying attention.',
        ],
        title: 'South from Joshua’s Point',
      },
      {
        body: [
          'I have visited Lake Balanan many times, including with guests and family. I remember the beauty of the lake, the mountains, the forest and the drive almost on top of the mountain.',
          'The journey that stays with me crossed the lake by canoe and continued on foot through the forest towards a small waterfall. The drive, lake, crossing and walk belonged together. It felt like a hidden place to discover—not because I can promise silence or few visitors, but because reaching it required curiosity.',
          'The availability and suitability of the canoe, forest walk and remembered waterfall must be confirmed locally. If that sequence cannot be made truthfully and safely, choose a different way to spend time at the lake rather than pretending an older experience can simply be repeated.',
        ],
        title: 'Lake Balanan',
      },
      {
        body: [
          'Look at the road as carefully as the lake. In my memory, the drive, water, forest and walk are one journey.',
        ],
        kind: 'field-notes',
        title: 'Field note',
      },
    ],
    slug: 'siaton-lake-forest-and-coast',
    title: 'Siaton: Lake, Forest and Coast',
  },
  {
    introduction:
      'Apo Island begins with the road to Malatapay and the moment the mainland is left behind in a traditional Filipino banka.',
    journeySlug: 'apo-island-explorer',
    mapCaption:
      'The journey reaches Malatapay by road before continuing across the water. The sea line is an editorial connection, not a navigation route.',
    number: '07',
    sections: [
      {
        body: [
          'For me, Apo Island is one of the places in the region that should be experienced. The reason is larger than one dive or photograph. It is the road to Malatapay, the crossing in a banka—a traditional Filipino outrigger boat—the island appearing from the water, time around the island and reef, and the crossing home.',
          'I have made the trip twice as a guest experience and many times as a diver. I remember underwater wildlife, coral, turtles, the character of the island and the relationship among them. Turtles have commonly been part of my snorkelling experience, but no encounter is promised.',
        ],
        title: 'The whole journey matters',
      },
      {
        body: [
          'I prefer an early beginning. It gives the day room to respond to weather and sea conditions and lets the departure become part of the experience rather than a logistical rush.',
          'Malatapay is the mainland gateway for this journey. It is where the road ends and the sea crossing begins. Unsuitable weather or sea conditions can change or prevent the crossing.',
          'The outrigger form, movement across the water and approach to the island are part of what I remember. The crossing is not time lost before Apo. The island arrives gradually from the water.',
        ],
        title: 'From road to sea',
      },
      {
        body: [
          'Snorkelling, diving, time on land, the community and the coast are distinct parts of the island. They do not need to be compressed into one activity, and the day should not be measured by a particular wildlife sighting.',
          'Joshua’s Point does not operate dives. Every technical diving decision belongs to a qualified operator working with the guest and the conditions of the day.',
        ],
        title: 'Around the island',
      },
      {
        body: [
          'Let the island arrive from the water. The crossing is part of why I recommend the journey.',
        ],
        kind: 'field-notes',
        title: 'Field note',
      },
    ],
    slug: 'apo-island',
    title: 'Apo Island',
  },
  {
    introduction:
      'Some days are remembered for the road itself: the changing coast, cooler highlands, forest or long southern return.',
    number: '08',
    sections: [
      {
        body: [
          'The routes in this guide are ways of understanding how the coast, towns, highlands and water relate to Joshua’s Point. Their maps are for orientation rather than turn-by-turn navigation.',
          'Choose the northbound coast when Dumaguete is the practical destination or when Dauin is the centre of the day.',
          'Choose Valencia when you want the movement from coast to highland without committing to the full Waterfall Explorer.',
          'Choose the southbound journey when there is enough time for the long road to Lake Balanan and back. The lake remains the destination; no additional peak or coastal stop is required.',
        ],
        title: 'Choosing by direction',
      },
      {
        body: [
          'Each map begins and ends with Joshua’s Point at public-safe precision. A route line expresses the relationship among places; it is not evidence that every road is open or suitable. The text sequence beside each map should remain complete when the map cannot be viewed.',
        ],
        title: 'Reading the maps',
      },
      {
        body: [
          'Do not ask only how quickly a place can be reached. Ask what the road allows you to notice before you arrive.',
        ],
        kind: 'field-notes',
        title: 'Field note',
      },
    ],
    slug: 'roads-worth-taking',
    title: 'Roads Worth Taking',
  },
  {
    image: {
      alt: 'The deck at Joshua’s Point opening towards green landscape and the sea.',
      src: '/images/home/closing-reflection/B20B565B-9359-4FBD-BAA0-9647E963AD2D_1_105_c.jpeg',
    },
    imageCaption: 'The point of return: Joshua’s Point after a day beyond the house.',
    introduction:
      'The useful parts of the guide belong together: what to confirm, where to confirm it and when to change the plan.',
    number: '09',
    sections: [
      {
        body: [
          'Southern Negros changes with weather, sea, road, operator, season and ordinary local life. For guidance connected directly to a stay, use the personal confirmation supplied by Joshua’s Point. For boats, protected areas, diving and other operated activities, confirm with the responsible authority or qualified operator.',
          'Safety, access, conservation, closures and material corrections must remain freely available. A dated edition can preserve a way of travelling, but it must not hide information needed for a safe decision.',
        ],
        title: 'Check what can change',
      },
      {
        body: [
          'Official climate normals for Dumaguete show warm temperatures and rainfall throughout the year. They describe a long pattern, not tomorrow’s conditions at Joshua’s Point, in the highlands or at sea.',
          'Use the guide maps for orientation and confirm current road conditions locally. Before a long route, check fuel, tyres, lights, available daylight and the return plan.',
        ],
        title: 'Weather, roads and transport',
      },
      {
        body: [
          'The official airport name is Dumaguete (Sibulan) Airport. Dumaguete also has an official port passenger terminal. Flight, ferry, terminal, baggage, payment and onward transport details should be confirmed directly with the provider.',
          'Historical Joshua’s Point material records Wednesday as Malatapay’s main market day. Confirm the current market schedule locally before planning a visit around it.',
          'For Apo Island, confirm the boat arrangement, registration, protected-area requirements, fees, permitted activities, weather assessment, safety equipment and return process with the responsible local authority or operator close to the day.',
        ],
        title: 'Gateways, boats and protected areas',
      },
      {
        body: [
          'Joshua’s Point does not operate dives, and this is not a technical diving guide. Site, depth, current, visibility, entry, equipment, certification, health and emergency decisions belong to a qualified operator working with the guest and current conditions.',
          'Follow the operator, protected-area and site briefing. Do not touch, move, feed, crowd or stage marine life. Keep fins and equipment away from coral and sediment.',
        ],
        title: 'Diving and snorkelling',
      },
      {
        body: [
          'Carry personal medication and information needed for a known condition. Match the day to health, mobility, swimming ability, certification where relevant, heat, sun, terrain and current conditions.',
          'Before a condition-sensitive journey, obtain current official emergency contacts from the responsible authority or operator and keep them available offline. Use the contact supplied in the personal stay confirmation for Joshua’s Point.',
        ],
        title: 'Health and emergencies',
      },
      {
        body: [
          'Ask before photographing identifiable people or private work. Follow local and protected-area rules. Carry out what the place cannot responsibly receive. Keep a respectful distance from wildlife. Change the plan when current conditions ask for it.',
        ],
        kind: 'field-notes',
        title: 'Respectful travel',
      },
      {
        body: [
          'Decide what kind of day the conditions support, confirm the few details that matter and leave room to notice what was not on the list. Then return to Joshua’s Point without rushing.',
        ],
        title: 'Returning',
      },
    ],
    slug: 'practical-field-notes',
    title: 'Practical Field Notes',
  },
]

export const readerChapterSlugs = readerChapters.map(({slug}) => slug)

export function getReaderChapter(slug: string) {
  return readerChapters.find((chapter) => chapter.slug === slug)
}
