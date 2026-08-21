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
          "Joshua's Point is where this guide begins and where each journey returns.",
          'The house sits in Calango, Zamboanguita, with the Bohol Sea, Apo Island, Siquijor and Mount Talinis all belonging to its wider view. They do not appear in the same way every day. Weather moves across the sea and mountain, light changes, and sometimes the first useful decision is to wait before deciding where to go.',
          'I begin here: opening the glass doors, making coffee, sitting outside, listening to birds and looking towards sea and mountain. The day can take its direction from there.',
          "Joshua's Point is a home before it is a base. The kitchen, dining area, living room and covered deck work as connected spaces. People can cook, eat, talk, sit quietly or move outdoors without the house asking everyone to do the same thing. The architecture frames the landscape, but nature sets the rhythm.",
        ],
        title: 'The place from which every journey begins',
      },
      {
        body: [
          "Southern Negros is compact on a map but not uniform in experience. Joshua's Point stands on the eastern side of the island, where a settled coastal corridor faces the Bohol Sea and the land rises westward towards the volcanic highlands of Cuernos de Negros, more commonly known as Mount Talinis. North lies Dauin and then Dumaguete. South, the road continues through Zamboanguita towards Siaton. Offshore, Apo Island sits much closer than Siquijor, but both help give the sea its sense of depth.",
          'These relationships explain why one forecast is never the whole day. Cloud can gather against the highlands while the coast remains bright. A calm-looking morning at the house does not confirm a safe island crossing, and clear water at sea says little about a shaded river path after highland rain. The mountain, coast and open water belong to the same view, but they respond differently to wind, heat and weather.',
          'The land also carries its volcanic history quietly. Provincial soil records describe volcanic material along the eastern slopes below Cuernos de Negros. In Valencia that history becomes more visible through geothermal ground, mineral-coloured water and the climb into cooler highlands. On the coast it appears less dramatically—in soil, dark sand and the shape of the land meeting the sea.',
        ],
        title: 'Understanding the wider landscape',
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
          'The chapters that follow hold the memories, practical distinctions and preparation that make each choice different.',
        ],
        title: 'Choosing a journey',
      },
      {
        body: [
          'Preparation should fit the journey rather than become a ritual of its own. Check what can change, carry what the particular day needs, and be willing to choose differently when the conditions or the group ask for it.',
          'For the highlands, look beyond the weather at the house and ask what has happened around the trail and watershed. For the island, confirm the boat and sea assessment rather than making the crossing because the sky appears blue. For the nearby coast, enough fuel, daylight and curiosity may be all that the day requires.',
        ],
        title: 'Leaving well',
      },
      {
        body: [
          'Coming back is part of the journey.',
          "At Joshua's Point, evenings move between the deck, dining table, pool and living room. Warm air, lights around the house and distant island lights can give the day a quieter ending. On windy days, the bamboo moves and can be heard. When rain comes, the covered deck offers another way to remain close to the weather.",
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
          "Dumaguete is the practical eastern gateway for a stay at Joshua's Point. Dumaguete (Sibulan) Airport is in neighbouring Sibulan, the city port serves regional ferry connections, and the road south passes through Dauin before continuing towards Calango and Zamboanguita.",
          'The city can be treated as a connection, but it is often useful as a pause. Rizal Boulevard, the public market, cafés, local restaurants and the streets around the centre offer a way to arrive without moving immediately from one vehicle to the next.',
          'The purpose is simple: understand the gateway, make the practical stops that matter, and continue south with enough room for the road.',
        ],
        title: 'Dumaguete as the gateway',
      },
      {
        body: [
          "Dumaguete grew as a coastal settlement looking across the Visayas rather than inward across the mountains of Negros. The city government traces its name to the Cebuano word dagit, meaning to snatch, and to a history of raids on the coastal community. The same official account later gives the name another association: the place's ability to draw people in and keep them.",
          'For much of the Spanish period, Negros was governed as one province even though travel and communication between its eastern and western sides were difficult. Coastal settlements expanded, sugar cultivation grew, and officials based in Bacolod rarely reached the eastern towns. A royal decree eventually separated Negros Oriental from Negros Occidental. The new province formally began on 1 January 1890, with Dumaguete as its capital.',
          'That distinction still matters. Negros Occidental faces west towards the Guimaras Strait and has a history dominated by large-scale sugar. Negros Oriental faces Cebu, Bohol and Siquijor. Sugar also belongs to its landscape, but so do coconut, rice, fishing, universities, marine conservation and the port relationships visible from Dumaguete southwards. The mountain spine makes the island one body while giving its two sides different histories and rhythms.',
        ],
        title: 'A little history',
      },
      {
        body: [
          'Silliman Institute opened in Dumaguete in 1901 with fifteen boys, a small collection of desks and a new educational ambition. It became a university in 1938. Its campus, scholarship and cultural institutions helped turn Dumaguete into a place to which students came from across Negros and the wider Visayas.',
          "The university-city identity is not simply a slogan. Students, teachers, researchers and alumni have shaped the city's scale, cafés, bookishness and cultural life. Silliman's marine scientists also helped create conservation work that reaches far beyond the campus, including the protected reef history encountered later in this guide at Apo Island.",
          'Dumaguete is widely called the City of Gentle People. The name is real and officially used, but a single reliable origin story has not been established for this edition. It is better understood as a civic identity than repeated as an invented anecdote.',
        ],
        title: 'A university city',
      },
      {
        body: [
          'Rizal Boulevard gives the centre an open edge along the water. It is a promenade, an evening meeting place and a reminder that the city developed through the sea. José Rizal passed through Dumaguete in 1896 during his journey from Dapitan to Manila; the boulevard now carries his name, but its importance is also more ordinary: people walk, sit, eat and watch the waterfront change through the day.',
          "The port continues that outward relationship. Ferries connect Dumaguete to other islands and make the city a natural transfer point for travellers moving through the Visayas. The airport and the southbound road later strengthened the same gateway role. Dauin's diving, Apo Island, Valencia's highlands and the southern coast are all reached more easily because Dumaguete concentrates these connections and services.",
          'The public market shows another side of the city. Produce, fish, meat, cooked food and everyday shopping meet there. It is not a curated attraction. Go to understand how the city provisions itself, keep belongings close in busy aisles, ask before photographing people and avoid obstructing work.',
        ],
        title: 'Boulevard, port and market',
      },
      {
        body: [
          'Treat the flight and the final road journey as one arrival plan. Confirm the flight, the agreed meeting point, onward transport and a working contact method. Keep the address and personal arrival instructions available offline, and share delays before the final leg begins.',
          'Taxi, transfer, meeting-point and journey-time details should come from the personal confirmation for that stay rather than from a fixed promise in this guide.',
        ],
        title: 'Arriving by air',
      },
      {
        body: [
          'Dumaguete Port is an important ferry gateway for regional connections. Different operators and vessels may have different terminal, check-in and luggage requirements, while weather can affect port operations.',
          'Confirm the operator, vessel, terminal and onward meeting point before travel. Build a sensible buffer around a ferry connection; the sea does not follow a tightly planned road transfer.',
        ],
        title: 'Arriving by sea',
      },
      {
        body: [
          'With about an hour, choose one purpose. Walk a short part of Rizal Boulevard, have coffee or collect the essential item that would be difficult to find later. Do not turn a short connection into a race across the city.',
          'With two hours, the boulevard and cathedral area can form a compact walk, or the public market can become a focused visit followed by something to eat. Keep luggage and onward transport in mind.',
          'With three or four hours, a pre-arranged Silliman museum or campus visit may add real context, or a longer market and lunch pause can make arrival feel settled. The Anthropology Museum is an academic facility rather than a walk-in attraction: access can be restricted and prior arrangement is normally required.',
          'If the journey has already been tiring, collect what is needed and continue. Food, drinking water, cash, personal medication, mobile data and other essentials are easier to consider here than after an avoidable need becomes urgent.',
        ],
        title: 'If you have one to four hours',
      },
      {
        body: [
          "The main road south passes through Dauin and onward towards Joshua's Point. Leave Dumaguete at an unhurried pace. The city gives way to the Dauin coast, roadside communities, small stores and openings towards the sea.",
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
          "Joshua's Point is in Calango, Zamboanguita. The coastline around it is not one named attraction. It is the road I use for food and daily essentials, the nearby communities, the shore, and the small places where an ordinary trip can become more interesting because I decide not to hurry.",
          'Zamboanguita is often introduced through its marine coast and the Malatapay gateway to Apo Island. Those relationships matter, but they are not the whole place. My experience begins closer to home: driving the coast, noticing what is happening beside the road and stopping when something feels worth a little time.',
        ],
        title: 'The area around home',
      },
      {
        body: [
          'The national road gathers many kinds of life into a narrow corridor between sea and upland. Small stores open towards the road. Tricycles, motorcycles, buses and private vehicles share it with people walking short distances. Coconut, rice and sugarcane belong to the wider agricultural landscape, while fishing connects the shore to the water beyond it.',
          "This is why the road can feel busy without feeling urban. The market, coast and fields are not separate visitor experiences; they are parts of the same local economy. Boats may be prepared near the shore while produce and household goods move along the road. A stop that appears casual to a visitor may be part of somebody else's working day.",
          'Small coffee shops, local restaurants, sari-sari stores, beaches, fishing villages and everyday activity appear along the coast. They are not fixed stops. They are the kinds of places and moments I have learned to notice on a road I travel regularly.',
          'I remember children playing beside the road, boys playing basketball, fishermen preparing boats for night fishing and the morning catch being unloaded. Roosters and village sounds accompany the road, and karaoke sometimes drifts through small communities. These are observations, not scheduled encounters or stories to invent about the people living here.',
        ],
        title: 'A working coast',
      },
      {
        body: [
          "Malatapay is where national road, market, working shore and island departure meet. Historical Joshua's Point and provincial material record Wednesday as the principal market day. That pattern is well established historically, but holidays, local decisions and operating conditions can change it; confirm locally before making the market the reason for a journey.",
          'When the market is operating, produce, fish, prepared food, household goods and livestock bring different kinds of trade together. The livestock area can be confronting for some visitors. Keep a sensible distance from active handling, protect valuables in crowded areas and ask before photographing people. A camera does not create permission.',
          'Malatapay also serves as the mainland gateway for Apo Island. A market visit and an island departure are different experiences: being present for one does not arrange the other. Boat, registration and protected-area arrangements must be confirmed separately.',
        ],
        title: 'Malatapay',
      },
      {
        body: [
          'The ordinary moments along this coast are valuable because they are not arranged for visitors. Photograph a broad scene only when doing so does not intrude. Ask before making an identifiable person the subject. Do not frame children, fishers, vendors or working boats as anonymous local colour when permission would be expected at home.',
          'The same respect applies to the shore. Public access should be clear before stopping. Fishing space, boat landings and private paths must remain usable. Carry waste away when a small stop cannot receive it responsibly; rubbish left on land easily becomes part of the marine environment.',
        ],
        title: 'Looking without taking over',
      },
      {
        body: [
          "I recommend this nearby journey because it asks very little beyond curiosity. Leave Joshua's Point without a fixed attraction to complete. If travelling by scooter, begin with enough fuel. Take the coast slowly and stop only where public access is clear and the pause feels natural.",
          'A sari-sari store can be a good place for something small. A food stall may offer a meal that is unfamiliar; choose according to personal comfort. A beach can invite a walk without needing to become the central destination.',
          'Very little needs to be carried. In my experience, most ordinary needs can be met along the road, although no particular shop, product, meal or payment method should be assumed. Sun, traffic and short tropical rain can matter even on a nearby journey. Keep enough daylight and fuel to return without turning the final part of the road into a hurry.',
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
          "Dauin is a small coastal town north of Joshua's Point. Its dark volcanic sand and marine life have made it closely associated with diving, but I do not think of it only through what happens underwater. Cafés, restaurants, the public market, the shore and the ordinary preparation of a dive day all belong to the place.",
          'A day here does not have to follow one pattern. It may include diving, snorkelling with current local guidance, lunch near the coast or simply time beside the water. I prefer the simplest version: choose one place as a base and allow the day to remain there.',
        ],
        title: 'A coast, not only a dive destination',
      },
      {
        body: [
          'The Dauin coast has become internationally known for muck diving: patient exploration of sand, silt and other soft seabed in search of animals that are easily missed. The name can make the habitat sound dirty or damaged. In reality, the apparently empty ground is a living environment of burrows, fragments of shell, algae, organic material and isolated objects that offer food or shelter.',
          'Soft sediment does not provide the obvious architecture of a coral reef. Animals living there use different solutions. Some bury themselves. Some emerge at night. Others resemble a leaf, a stone, a patch of algae or the sand itself. Frogfish use camouflage and a lure to bring prey close. Nudibranchs combine colour, chemical defence and extraordinary forms. Seahorses, pipefish, crustaceans and small cephalopods can disappear into a background that only begins to look complex after the diver slows down.',
          'Dark sand is particularly useful to an underwater photographer because it can separate a small subject from its surroundings. It also reveals careless technique. A fin stroke or misplaced knee can lift sediment, disturb an animal and remove the clean background the photographer wanted. Good buoyancy and a guide who understands both behaviour and photography matter more than getting close.',
          'I am an underwater photographer, and in Dauin I notice how the dark sand creates a clean, distinctive background for smaller marine life. Frogfish, nudibranchs, seahorses and pipefish have all been observed along this coast, but no particular encounter is promised.',
        ],
        title: 'Why the sand matters',
      },
      {
        body: [
          'Dauin is not one continuous dive site. Sand slopes, reef patches, seagrass and municipal marine sanctuaries create a sequence of different habitats along the shore. Research has documented seven no-take protected areas in the municipality, each small enough that management, enforcement and the surrounding fished coast remain important to its value.',
          'The sanctuaries matter for more than visiting divers. No-take protection can help retain fish and reef life while supporting fisheries beyond the protected boundary. Seagrass and soft sediment are part of the same coastal system, not the empty space between coral attractions. Current sanctuary boundaries, fees, guide rules and permitted activities must still be confirmed locally.',
          'This is one reason Dauin differs from Apo Island. Dauin is an extended mainland coast with many shore and boat sites, town life and several municipal sanctuaries. Apo is a small island whose community, reef and protected-area history form one concentrated journey. One should not be treated as a substitute for the other.',
        ],
        title: 'Sanctuary, reef and seagrass',
      },
      {
        body: [
          'The pleasure lies in looking slowly. A skilled local guide may notice life that is easy to pass. The photograph never matters more than the animal: do not touch, move, feed, crowd or stage marine life, and keep fins and equipment away from coral and sediment.',
          "Macro photography also changes the pace of a group. Discuss lenses, subject interests, guide ratio, strobe use and expectations before entering the water. A non-photographer should not be made to wait through a dive designed entirely around somebody else's image.",
        ],
        title: 'Looking more closely',
      },
      {
        body: [
          'Leave in the morning and follow the coastal road north. Dauin is the destination rather than a pause on the way to Dumaguete.',
          'Arrange one suitable base before leaving. I prefer spending the day at one resort or dive centre rather than moving among several. Divers, snorkellers and non-divers can then shape different parts of the day without losing its centre.',
          "Joshua's Point does not operate dives. Site choice, certification, health, equipment and every technical decision belong to the guest and a qualified operator working with the conditions of that day.",
        ],
        title: "Leaving Joshua's Point",
      },
      {
        body: [
          'A dive day does not need to become a schedule of repeated entries. Lunch, coffee, a short walk or time watching the shore can give the day a different rhythm. Cafés, divers preparing, and ordinary town life are not interruptions to the marine coast; they are part of it.',
          'Before choosing a base, confirm whether outside day visitors are accepted and what is actually available: shore or boat diving, snorkelling guidance, secure equipment space, showers, towels, food, shade, seating, parking and a comfortable place for non-divers. Resort facilities are not automatically included because a dive has been booked.',
        ],
        title: 'Time on land',
      },
      {
        body: [
          "Return to Joshua's Point in the afternoon. There is no need to add Apo Island or turn Dauin into a regional circuit. The coastal road home and the change from town to house are enough to complete the day.",
        ],
        title: 'The return',
      },
      {
        body: [
          'This day can work for divers who enjoy patient observation, underwater photographers, snorkellers using current local guidance, non-divers who enjoy the coast, and mixed groups comfortable spending parts of the day differently.',
          "Actual suitability depends on health, swimming ability, certification where required, current conditions and the qualified operator's assessment. Children require an activity and supervision plan appropriate to their age, swimming confidence and the provider's current rules.",
        ],
        title: 'Who this day may suit',
      },
      {
        body: [
          'Stay with one place long enough to notice its rhythm. The coast between activities can remain in the memory as clearly as a particular marine sighting.',
        ],
        title: 'Field note',
        kind: 'field-notes',
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
          'The road from the coast towards Valencia changes the shape of the day. It climbs into the highlands and the landscape begins to close around it. Valencia is the way into two very different waterfall settings and a reason to notice the movement from coast to mountain.',
          "The Waterfall Explorer joins Joshua's Point, Valencia, Casaroro Falls and Pulangbato Falls before returning home. Casaroro is the emotional centre. Pulangbato offers a more open setting after the enclosed canyon journey and should remain optional when time, energy or conditions say that one waterfall is enough.",
        ],
        title: 'Where the road rises',
      },
      {
        body: [
          'Valencia lies on the eastern side of Cuernos de Negros, the volcanic complex more commonly called Mount Talinis. The landscape holds heat beneath the ground and catches moisture above it. As air rises across the highlands it cools; cloud and rain can gather here even when the coast appears settled. Forest, steep catchments and short rivers then carry that water down through gorges and towards the coastal plain.',
          'Geothermal energy makes the volcanic story visible in a modern way. The Palinpinon complex has generated electricity in Valencia since the 1980s, using steam from the geothermal field. Pipes, vents and working infrastructure are part of the inhabited highland landscape. They should be observed only from legitimate public places and with every barrier respected.',
          'The highlands are also ecologically important. Mount Talinis is recognised as a key biodiversity area and habitat for threatened Negros wildlife. A waterfall visit does not enter the whole mountain ecosystem, but the forest, water and cooler air are connected to it. Keep noise low, stay on the established approach and carry waste back out.',
        ],
        title: 'The volcanic highlands',
      },
      {
        body: [
          'I have made the journey to Casaroro Falls three times. What I remember begins before the waterfall: the long descent, big old bamboo beside the way, the canyon, a small river and cold water.',
          'I remember more than 300 steps and a walk of approximately 20 minutes, although these are my memories rather than surveyed measurements. The waterfall stayed hidden for much of the approach and appeared only in the final few minutes. That delayed view is part of why I recommend the place. You do not simply stand in front of a waterfall; you move through the landscape until it finally belongs to it.',
          'The gorge concentrates water, shade and sound. Rain higher in the catchment may change the river even when rain is not falling at the entrance. Wet steps and rocks can become slippery, and the route that descends must be climbed again.',
          'The return matters too. The steps must be climbed again. I found it hard to keep up, and I still remember feeling happy at the end. I would not soften the effort or reduce the day to difficulty. Both belong to the experience.',
          'Good shoes mattered because parts could be slippery. Current access, weather, water and trail conditions should be checked close to the day.',
        ],
        title: 'Casaroro: the journey before the waterfall',
      },
      {
        body: [
          'Pulangbato brings the journey into a more open and managed setting. Its name refers to the red stone associated with the falls, and mineral deposits from the geothermal landscape colour parts of the rock and watercourse. This edition does not assign the colour to a specific mineral without a current geochemical source.',
          "Pulangbato can complete the highland day without competing with Casaroro. Continue only if the group still has the time and energy to experience it well. Managed pools, facilities and easier viewing can make it more accessible than Casaroro's long descent, but access is not the same as universal suitability.",
          'Current opening, entrance, bathing rules, pool depth, facilities, water condition and geothermal barriers should be confirmed before the visit. Stay away from steaming ground and undeveloped water channels.',
        ],
        title: 'Pulangbato: a change of atmosphere',
      },
      {
        body: [
          'I prefer to begin early. In my experience, there were fewer visitors at Casaroro earlier in the day, although crowd levels can never be promised.',
          'Allow the descent, canyon walk, waterfall and return climb the time they need. Pause in Valencia when the day calls for it, and consider lunch near or in town after the waterfall journey. I have not named a particular place to eat.',
          'This is not a journey I generally recommend for elderly guests because of the remembered descent and climb. Age alone does not decide suitability, but strength, mobility, balance, footwear and current trail conditions matter. Casaroro is also unsuitable for a pushchair and may be difficult for younger children or anybody uncomfortable on long, wet stairs. Pulangbato may offer the simpler highland alternative after its current access has been checked.',
          'Bring suitable shoes, drinking water, a small amount of food, rain protection and a towel if the confirmed plan includes permitted bathing. Protect camera equipment from spray and sudden rain; the gorge can be darker than the coast even in daytime.',
        ],
        title: 'The shape of the day',
      },
      {
        body: [
          'Do not hurry the reveal. Casaroro is memorable because the landscape makes you work towards it.',
        ],
        title: 'Field note',
        kind: 'field-notes',
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
          'The journey towards Siaton moves south from the house through communities and agricultural land before turning inland towards Lake Balanan and the mountain landscape around it.',
          'I remember small roads, roosters, carabao, rice fields and people harvesting sugar cane on journeys through this part of Southern Negros. They will not appear in the same way on every drive. They are reasons to look at the road rather than wait for the destination before paying attention.',
          'The road passes through a landscape that works. Coconut, rice, sugarcane and smaller holdings sit among houses and communities. Negros is strongly associated with sugar, but the eastern and southern parts of the island should not be mistaken for the plantation landscape of Negros Occidental. Here the road reveals a more mixed agricultural pattern, and the mountain interior is never far from the coast.',
        ],
        title: "South from Joshua's Point",
      },
      {
        body: [
          'Lake Balanan exists because the landscape changed suddenly. Historical and academic accounts record a strong earthquake on 5 May 1925. Landslides descended from the Balanan and Nasig-id ridges, blocking the Balanan River with rock, soil and trees. Water gathered behind that natural dam and formed the paired lake visible today.',
          "The local word sampong—to close or block—is associated with the place where the river was stopped. The formation story is not a decorative legend. It explains the lake's narrow shape, steep surrounding slopes and continuing sensitivity to rain, erosion and road conditions. The precise earthquake magnitude and measurements differ among later accounts and remain subject to archival or PHIVOLCS confirmation before final publication.",
          'The lake is therefore both water and watershed. What happens on the surrounding slopes affects sediment, water quality, paths and habitat below. Provincial records place Lake Balanan within social-forestry and conservation work, while later development introduced visitor facilities and recreation. Protection and use have always had to be considered together.',
        ],
        title: 'A lake made by an earthquake',
      },
      {
        body: [
          'I have visited Lake Balanan many times, including with guests and family. I remember the beauty of the lake, the mountains, the forest and the drive almost on top of the mountain.',
          'The journey that stays with me crossed the lake by canoe and continued on foot through the forest towards a small waterfall. The drive, lake, crossing and walk belonged together. It felt like a hidden place to discover—not because I can promise silence or few visitors, but because reaching it required curiosity.',
          'Forest and water create the character of the place, but they also create practical limits. Rain can damage or soften the final road and affect paths around the lake. A trail described as easy in one season may have eroded sections after storms. Lake water, pools and waterfall areas should never be assumed suitable for swimming without current local guidance.',
          'The availability and suitability of the canoe, forest walk and remembered waterfall must be confirmed locally. Paths, facilities, fees, opening arrangements and swimming conditions can change. If that sequence cannot be made truthfully and safely, choose a different way to spend time at the lake rather than pretending an older experience can simply be repeated.',
        ],
        title: 'Lake Balanan',
      },
      {
        body: [
          'Recent visitor reports still mention a trail, small waterfall, paddled or floating crossings and basic entrance facilities. They also disagree about maintenance and road condition. Some describe rough or damaged sections after rain; others report that most of the approach has improved. This is useful evidence that the place remains visited, but it is not sufficient to promise that a canoe, trail, restaurant, toilet, pool or swimming area will be operating on a particular day.',
          'Until the responsible site management confirms the complete current arrangement, treat every activity beyond seeing the lake as optional. Bring food and water rather than relying on service, use daylight for the inland approach and return, and choose a vehicle suited to the locally confirmed road.',
        ],
        title: 'What current evidence can—and cannot—confirm',
      },
      {
        body: [
          'Leave early enough for the long road south and back without promising a drive time. Confirm current road and weather conditions, lake access, the activities actually operating, and what food, water and toilets will be available.',
          'Bring drinking water, sun and rain protection, personal medication and footwear suitable for damp or uneven ground. Connectivity may be limited in the mountain approach; keep the map, contact and return plan offline. A towel belongs in the bag only if the confirmed day includes an appropriate swimming stop.',
          'The lake can suit families who are content with a scenic day, but water edges, boats, trails and limited facilities require close supervision. Accessibility depends on the exact operating area and cannot be assumed from photographs of the boardwalk or entrance.',
          "Do not add Tambobo Bay, Najandig Peak or another distant stop merely to make the journey appear more complete. Their possible place in Edition 1 remains an owner decision. Lake Balanan is the centre of this chapter, and Joshua's Point remains its end.",
        ],
        title: 'The shape of the day',
      },
      {
        body: [
          'Look at the road as carefully as the lake. In my memory, the drive, water, forest and walk are one journey.',
        ],
        title: 'Field note',
        kind: 'field-notes',
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
          'Apo Island is globally important not because it was untouched, but because a community changed the way it used and protected the sea. In the late 1970s and early 1980s, Silliman University marine scientists and social scientists worked with island residents as destructive fishing and pressure on reef resources threatened local livelihoods. National Scientist Angel Alcala was central to that work, building on the no-take reserve experiment begun earlier at Sumilon Island.',
          'The Apo Island sanctuary was established in 1982. A part of the reef was closed to fishing while the surrounding waters remained connected to community life and fisheries. The idea was simple but demanding: allow a protected area to recover, maintain local participation and study whether fish and ecological benefits extended beyond its boundary.',
          "Long-term research helped make Apo one of the world's best-known examples of community-based marine conservation. The lesson was not that a line on a map protects a reef by itself. Local agreement, enforcement, patient monitoring and the willingness to accept short-term limits all mattered.",
          'In 1994, Apo Island and its surrounding waters were declared a national protected landscape and seascape under Proclamation No. 438. Management later moved into the national protected-area system under a Protected Area Management Board. Research and community accounts show that this transition was not without tension: national authority added legal protection while some residents felt that decision-making had moved farther from the people who had built the sanctuary.',
          'That evolution belongs in the story. Apo should not be romanticised as a conservation project that was completed once and then left alone. The reef, fishery, tourism economy and community continue to require choices. Protection only remains meaningful when rules are understood, legitimate and maintained.',
        ],
        title: 'Why Apo Island matters',
      },
      {
        body: [
          'Apo is a small volcanic island surrounded by fringing reef. Reef flats, slopes, walls, seagrass and open water create different habitats around it. Hard corals build structure slowly; fish use that structure for shelter, feeding and reproduction. Seagrass supports another community and is one reason turtles may be encountered in some areas.',
          'The reef is also exposed to disturbance. Storms, heat, sediment, physical contact and changing human use can all affect coral. A famous conservation history does not make the ecosystem indestructible. Do not touch or stand on coral, chase turtles, crowd wildlife or expect a guide to stage an encounter.',
          'Life on the island is not secondary to what visitors see underwater. Apo is a barangay with homes, a school, fishers, guides, small businesses and families whose daily life must continue around arrivals and departures. Ask before photographing people, houses or work. Follow local guidance and avoid treating limited services as a failure to provide a resort experience.',
          'Apo Island is a protected landscape and seascape. Current visitor rules, registration, fees, permitted activities and boat arrangements should be confirmed with the responsible local authority or operator.',
        ],
        title: 'Reef, island and community',
      },
      {
        body: [
          'I prefer an early beginning. It gives the day room to respond to weather and sea conditions and lets the departure become part of the experience rather than a logistical rush.',
        ],
        title: 'Leave early',
      },
      {
        body: [
          "Malatapay is the established mainland relationship in Tobias's journeys and in historical visitor material. Recent reports also refer to changing or alternative departure arrangements. Do not assume that an old wharf, informal offer or map label identifies the authorised process for the day.",
          "Confirm the departure point, responsible boat provider, passenger capacity, registration, life jackets, weather decision, protected-area procedure, payment, return time and cancellation terms before leaving Joshua's Point. Sea travel can be suspended during rough conditions; in February 2026, for example, the Philippine Coast Guard suspended Apo Island trips during strong amihan conditions.",
        ],
        title: 'From road to sea',
      },
      {
        body: [
          'The outrigger form, movement across the water and approach to the island are part of what I remember. The crossing is not time lost before Apo. The island arrives gradually from the water.',
          'A banka crossing can be wet and physically awkward. Pack electronics in a dry bag, wear clothing that can get wet and follow the crew when boarding, sitting and landing. Travellers with limited mobility should discuss the exact boarding and beach-landing arrangement before committing to the journey.',
        ],
        title: 'Cross by banka',
      },
      {
        body: [
          'Snorkelling, diving, time on land, the community and the coast are distinct parts of the island. They do not need to be compressed into one activity, and the day should not be measured by a particular wildlife sighting.',
          'Confirm whether a local guide is required, which activity zones are open, what equipment is provided and whether food and drinking water have been arranged. Carry cash because payment systems and connectivity cannot be assumed. Bring sun protection, a dry bag, drinking water, secure footwear and only the equipment agreed with the responsible provider.',
          "Joshua's Point does not operate dives. Every technical diving decision belongs to a qualified operator working with the guest and the conditions of the day. Dive and snorkel sites vary in current, depth, entry and exposure; the island's reputation is not a substitute for a briefing.",
        ],
        title: 'Around the island',
      },
      {
        body: [
          "The return crossing brings the mainland back into view. From the confirmed landing place, the road leads home to Joshua's Point. Keep enough flexibility that weather, a delayed boat or a changed activity does not turn the return into a missed onward commitment.",
          'The journey ends at the house without needing another destination added to it.',
        ],
        title: 'Returning',
      },
      {
        body: [
          'Let the island arrive from the water. The crossing is part of why I recommend the journey.',
        ],
        title: 'Field note',
        kind: 'field-notes',
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
          "The routes in this guide are ways of understanding how the coast, towns, highlands and water relate to Joshua's Point. Their maps are for orientation rather than turn-by-turn navigation. Road conditions, access and travel time should always be checked for the day itself.",
          'The eastern side of Southern Negros can be read through four movements: north along the settled coast, west and upward into the volcanic highlands, south through cultivated country, and offshore across the water. The journeys are different because the landscape changes, not because each has been filled with attractions.',
        ],
        title: 'Choosing by direction',
      },
      {
        body: [
          'The northbound road follows the inhabited coastal corridor through Zamboanguita and Dauin before reaching Dumaguete. Sea openings, stores, schools, public markets, dive bases and increasingly busy traffic mark the transition from the area around home to the provincial capital.',
          'Choose it when Dumaguete is the practical destination or Dauin is the centre of the day. Fuel and supplies are widely available compared with the mountain routes, but traffic, pedestrians, tricycles and roadside activity require patience. A coffee or meal stop should support the purpose of the journey rather than turn the coast into a checklist.',
          "Turn around when city traffic, weather or the group's energy makes the return more important than one additional stop.",
        ],
        title: 'Coastal Ride to Dumaguete',
      },
      {
        body: [
          'The Valencia road leaves the coastal plain and begins to climb towards Cuernos de Negros. Air, vegetation, slope and cloud can change within a relatively short distance. The journey shows how water and geothermal heat share the same volcanic highlands.',
          "Choose it when the movement from coast to mountain is enough without committing to Casaroro's full descent. Confirm the exact public stopping place before pulling off the road. Geothermal working areas, pipes and vents are infrastructure, not informal viewpoints.",
          "Carry rain protection even when Joshua's Point is bright, and keep the return flexible if cloud or heavy rain settles over the higher road.",
        ],
        title: 'Valencia Highlands Journey',
      },
      {
        body: [
          'This journey continues through Valencia to Casaroro Falls and, when the day supports it, Pulangbato Falls. Its shape is physical: descent, canyon, waterfall, return climb, a change of atmosphere and the road home.',
          'Casaroro requires the largest reserve of strength and time. Pulangbato should remain optional. Food or coffee fits best after the return climb, when the group knows how much energy and daylight remain. The journey should shorten immediately when highland rain, river condition or trail advice makes the gorge doubtful.',
        ],
        title: 'Waterfall Explorer',
      },
      {
        body: [
          'The southbound road moves through Zamboanguita towards Siaton before turning inland. Settlement and agriculture gradually give way to a narrower mountain approach. Rice, coconut, sugarcane, carabao and roadside communities belong to the journey, although none is a scheduled scene.',
          'Choose it only when there is enough daylight for the lake and the long return. Fill the tank before the inland section, carry food and water rather than depending on lake facilities, and download the route and contact information. The final road, trails and visitor activities require same-day or near-date confirmation after rain.',
          'Lake Balanan remains the destination. Tambobo Bay, Najandig Peak and Twin Lakes are not added until their Edition 1 role is decided by Tobias.',
        ],
        title: 'Southern road to Lake Balanan',
      },
      {
        body: [
          "Each map begins and ends with Joshua's Point at public-safe precision. A route line expresses the relationship among places; it is not evidence that every road is open or suitable. The text sequence beside each map should remain complete when the map cannot be viewed.",
          'Look for the shape of a journey rather than a promised duration. Coastal traffic, a wet mountain road, a market day, road works or an unplanned pause can all change time. Keep enough fuel, daylight and attention for the return.',
        ],
        title: 'Reading the maps',
      },
      {
        body: [
          'Do not ask only how quickly a place can be reached. Ask what the road allows you to notice before you arrive.',
        ],
        title: 'Field note',
        kind: 'field-notes',
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
          'Southern Negros changes with weather, sea, road, operator, season and ordinary local life. This chapter explains what to confirm and where that confirmation should come from. It does not freeze a schedule, price, market, facility or natural condition in time.',
          "For guidance connected directly to a stay, use the personal confirmation supplied by Joshua's Point or contact us through joshuaspoint.com/contact (https://joshuaspoint.com/contact). For boats, protected areas, diving and other operated activities, confirm with the responsible authority or qualified operator.",
          'Safety, access, conservation, closures and material corrections must remain freely available. A dated edition can preserve a way of travelling, but it must not hide information needed for a safe decision.',
        ],
        title: 'Check what can change',
      },
      {
        body: [
          'Coast Around Home — Physical demand: Low, with frequent opportunities to stop; Main exposure: Heat, traffic and short rain; Children and accessibility: Flexible for families; public access and roadside supervision matter; Photography: Working coast and daily life; ask before photographing people; Confirm before leaving: Weather, fuel, daylight and public access.',
          'Dumaguete — Physical demand: Low to moderate walking; Main exposure: Heat, traffic and crowded areas; Children and accessibility: Pavements and crossings vary; choose a compact route; Photography: Waterfront, market and city detail; Confirm before leaving: Flight/ferry, luggage, opening and onward transport.',
          'Dauin Marine Coast — Physical demand: Activity-dependent; Main exposure: Sun, sea and dive conditions; Children and accessibility: Base facilities and provider age rules determine suitability; Photography: Macro underwater work and coast; buoyancy is essential; Confirm before leaving: Operator, certification, site, sanctuary rule and non-diver access.',
          'Waterfall Explorer — Physical demand: High at Casaroro; Main exposure: Stairs, slippery ground, river, rain and return climb; Children and accessibility: Not pushchair accessible; mobility and younger-child suitability require careful judgement; Photography: Gorge, water and low light; protect equipment from spray; Confirm before leaving: Trail, river, weather, guide, opening and bathing status.',
          'Valencia Highlands — Physical demand: Moderate when Casaroro is excluded; Main exposure: Rain, cooler highland air and winding roads; Children and accessibility: Depends on the chosen stop; managed access does not guarantee universal access; Photography: Cloud, forest and volcanic landscape; Confirm before leaving: Road, weather, stopping place and geothermal restrictions.',
          'Lake Balanan — Physical demand: Moderate and variable; Main exposure: Long road, limited facilities, trails and water edges; Children and accessibility: Close supervision required; current access determines suitability; Photography: Lake, forest and agricultural road; Confirm before leaving: Road, entrance, canoe, trail, food, toilet, swimming and daylight.',
          'Apo Island — Physical demand: Moderate, with awkward boat boarding possible; Main exposure: Sun, open-water crossing, wet landing and marine conditions; Children and accessibility: Discuss boat boarding, life jackets, guides and activity suitability in advance; Photography: Reef, island approach and community; wildlife remains unguaranteed; Confirm before leaving: Departure, Coast Guard status, boat, registration, fees, guide, food and return.',
          'The table is a decision aid, not a medical or technical assessment. The least demanding version of a journey can still become unsuitable when weather, access or the group changes.',
        ],
        title: 'Comparing the journeys',
      },
      {
        body: [
          "Official 1991–2020 climate normals for Dumaguete show warm conditions and rainfall in every month. April is relatively drier on average, while rainfall and thunderstorm activity generally increase through parts of the middle and later year. A normal is a thirty-year pattern, not tomorrow's forecast.",
          "The station is near sea level in Dumaguete. Joshua's Point, the Valencia highlands, a shaded gorge and the open water around Apo Island can experience different conditions on the same day. Check a current forecast, then confirm the condition that actually controls the journey: trail and river for Casaroro, road for Lake Balanan, or responsible maritime assessment for Apo Island.",
          'Heat and ultraviolet exposure matter even under cloud. Begin strenuous and open-water days early, carry drinking water and use sun protection that does not create avoidable waste at the coast.',
        ],
        title: 'Weather and seasons',
      },
      {
        body: [
          'Use the guide maps for orientation and confirm current road conditions locally. Allow more time than a route estimate appears to require. Stops, traffic, road works, weather and mixed surfaces can change a journey.',
          'Before a long route, check fuel, tyres, lights, available daylight and the return plan. Keep fuel above the amount needed for the expected route rather than planning around one unverified station. The Lake Balanan journey deserves particular caution because the final mountain road and facilities have varied after heavy weather.',
          'Any driver, vehicle or transfer arrangement should come from the personal confirmation for the stay or another current, responsible provider. A scooter is appropriate only for a licensed, experienced rider using a suitable helmet and a machine checked for brakes, tyres and lights.',
        ],
        title: 'Roads, fuel and transport',
      },
      {
        body: [
          'The official airport name is Dumaguete (Sibulan) Airport. Dumaguete also has an official port passenger terminal. Flight, ferry, terminal, baggage, payment and onward transport details should be confirmed directly with the provider.',
          'Dumaguete is the broadest place to solve practical needs before travelling south. A full-service supermarket, pharmacy, several ATMs and mobile-service outlets can be found together at Robinsons Dumaguete, but tenants and hours must still be checked. The public market offers food and local shopping in a busier setting. Choose according to time, luggage and what is actually needed.',
          'Carry more than one usable payment method and some Philippine pesos in sensible denominations. Never depend on a single ATM shortly before a boat or remote journey. Check mobile data before leaving the city and download the address, maps and contact information needed offline.',
        ],
        title: 'Dumaguete gateways and provisions',
      },
      {
        body: [
          "Historical Joshua's Point and provincial material record Wednesday as Malatapay's main market day. Confirm the current schedule locally before planning a visit around it.",
          "For Apo Island, confirm the departure point, boat provider, passenger limit, registration, protected-area requirements, fees, permitted activities, weather assessment, safety equipment and return process close to the day. Do not copy old fee tables: a published protected-area resolution can explain the legal framework without proving today's charge.",
          'Pack for a wet transfer. Use a dry bag, keep medication and electronics protected, and carry water, cash, sun protection and secure footwear. Avoid a tight flight, ferry or formal commitment after the expected return.',
        ],
        title: 'Malatapay and Apo Island',
      },
      {
        body: [
          "Joshua's Point does not operate dives, and this is not a technical diving guide. Site, depth, current, visibility, entry, equipment, certification, health and emergency decisions belong to a qualified operator working with the guest and current conditions.",
          'When comparing operators, ask about current training affiliation, guide ratios, first aid and oxygen, equipment maintenance, boat safety, environmental practice, photographer support and the plan for a non-diver. A certification logo is useful evidence of a training relationship; it is not a substitute for a conversation about the actual day.',
          'Follow the operator, protected-area and site briefing. Do not touch, move, feed, crowd or stage marine life. Keep fins and equipment away from coral and sediment. Snorkelling suitability also depends on current local guidance.',
        ],
        title: 'Diving and snorkelling',
      },
      {
        body: [
          'Do not assume that a remote visitor site will provide lunch because older material mentions a restaurant. Confirm food when it matters and carry enough water and a simple reserve snack for the group. Dietary needs should be discussed before reaching a place with limited choice.',
          'Connectivity becomes less dependable away from the coastal corridor and on the water. A signal bar is not an emergency plan. Keep essential information offline and tell somebody responsible where a condition-sensitive journey is going.',
          'Named coffee stops, restaurants, markets, fuel stops, pharmacies and other services become guide recommendations only after Tobias approves them and their current operation is checked.',
        ],
        title: 'Food, water and connectivity',
      },
      {
        body: [
          'Carry personal medication and information needed for a known condition. Match the day to health, mobility, swimming ability, certification where relevant, heat, sun, terrain and current conditions.',
          "Dumaguete is the principal medical orientation point for the journeys in this edition. A maintained public emergency-information source must remain outside Premium Guide access. Before a condition-sensitive journey, obtain current official emergency contacts from the responsible authority or operator and keep them available offline. Use the contact supplied in the personal stay confirmation for Joshua's Point.",
          'Accessibility should be described for the actual route, not the destination name. A managed waterfall may still have steps. A lake viewpoint may be accessible while its trail is not. An island may have calm water while the boat landing remains difficult. Ask about the complete chain from vehicle to activity and back.',
        ],
        title: 'Health, accessibility and emergencies',
      },
      {
        body: [
          '• Ask before photographing identifiable people or private work.',
          '• Follow local and protected-area rules.',
          '• Carry out what the place cannot responsibly receive.',
          '• Keep a respectful distance from wildlife.',
          '• Do not block roads, markets, boat landings or fishing activity.',
          '• Change the plan when current conditions ask for it.',
        ],
        title: 'Respectful travel',
      },
      {
        body: [
          "Decide what kind of day the conditions support, confirm the few details that matter and leave room to notice what was not on the list. Then return to Joshua's Point without rushing.",
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
