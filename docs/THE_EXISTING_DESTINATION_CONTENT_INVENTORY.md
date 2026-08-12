# Joshua's Point — Existing Destination Content Inventory

## Status and scope

This document inventories destination, travel, route, and dive content already published on
[`joshuaspoint.com`](https://joshuaspoint.com/) and compares it with the current Joshua's Point
project. It is a preservation and migration record, not new destination copy and not evidence that
every published claim remains current.

The public site was reviewed on 9 August 2026. The inventory records faithful summaries rather
than reproducing complete pages. Public URLs remain the source of record until approved material
is migrated into Sanity.

No frontend code, Sanity schema, or CMS document was changed for this inventory.

## Source-status convention

Publication on the current Joshua's Point website establishes that material is an **existing
owner-controlled source**. It does not, by itself, prove that a fact has been recently verified or
approved for the new guide.

| Status | Meaning | Migration action |
| --- | --- | --- |
| Source candidate | Useful existing description, structure, or observation | Preserve, edit lightly, and seek owner/editor approval |
| Verify before migration | Volatile, safety-sensitive, specialist, geographic, commercial, or access-related claim | Confirm with a current primary or qualified local source and record the review date |
| Retire or rewrite | Superlative, guarantee, generic tourism language, or unsupported promotional claim | Do not copy into the new CMS |
| Exclude | Placeholder, mismatched image, duplicated material, or content outside the destination model | Do not migrate |

No item below is marked final or production-approved.

---

## Phase 1 — Content extraction

### 1. Regional and directory pages

#### Negros Oriental — Nature, Diving & Adventure Paradise

- **Current URL:** [joshuaspoint.com/negros-oriental](https://joshuaspoint.com/negros-oriental/)
- **Current role:** Regional landing page positioning Joshua's Point as a base for southern Negros.
- **Existing text:** Introduces the province through diving, waterfalls, mountains, coast, local
  culture, and access through Dumaguete. It highlights Apo Island, Dauin, Casaroro Falls, and
  Pulangbato Falls and includes broad seasonal and arrival guidance.
- **Images available:** Casaroro waterfall, Apo/turtle and macro-diving images, Dumaguete bell
  tower, Najandig Peak, and several Joshua's Point house images. Image credit and usage rights are
  not recorded in the visible page content.
- **Factual claims:** Airport transfer time; Zamboanguita geography; dive seasons and visibility;
  marine species and biodiversity counts; protected status; waterfall access; transport
  arrangements; climate seasons.
- **Future Sanity destination entry:** **No.** Preserve as source material for the
  `destinationsPage` introduction, regional guide copy, and possibly a future journal/region page.
  Individual places belong in separate `destination` or `diveSite` documents.

#### Explore All Destinations

- **Current URL:** [joshuaspoint.com/explore-all-destinations](https://joshuaspoint.com/explore-all-destinations/)
- **Current role:** Directory and taxonomy page.
- **Existing text:** Organizes the guide into Cities & Culture, Marine Adventures, Waterfalls, and
  Mountains & Lakes. It also proposes one-, two-, and three-day combinations and connects visitors
  to scenic routes.
- **Images available:** Reuses the small public-site pool of Casaroro, Najandig, Dumaguete, and
  marine photographs; several placements do not match the linked place.
- **Factual claims:** Suggested itinerary feasibility, journey order, travel time, transport
  availability, and which places combine comfortably in one day.
- **Future Sanity destination entry:** **No.** Map to the `destinationsPage` singleton plus curated
  destination categories/collections. Preserve the information architecture; verify every
  itinerary before reuse.

#### Cities & Culture

- **Current URL:** [joshuaspoint.com/cities-and-culture](https://joshuaspoint.com/cities-and-culture/)
- **Current role:** Collection page for Dumaguete, Valencia, and Siaton.
- **Existing text:** Contrasts a university/coastal city, a cooler highland town, and a practical
  southern gateway. Includes suggested combinations and transport guidance.
- **Images available:** Dumaguete bell tower plus reused Najandig and Casaroro images. The latter
  are not suitable evidence for Valencia or Siaton.
- **Factual claims:** Town character, market/café availability, route combinations, access, and
  transport arrangements.
- **Future Sanity destination entry:** **No.** Candidate destination category or manually curated
  collection referring to the three individual place documents.

#### Marine Adventures

- **Current URL:** [joshuaspoint.com/marine-adventures](https://joshuaspoint.com/marine-adventures/)
- **Current role:** Collection page for Apo Island, Dauin, and Zamboanguita marine experiences.
- **Existing text:** Introduces reef, muck-diving, snorkeling, marine life, operators, equipment,
  and the different character of the three areas.
- **Images available:** Turtle, frogfish, nudibranch, octopus, pipefish, clownfish, and an Apo
  Island aerial. Some images recur across several areas, so their capture location cannot be
  inferred from placement alone.
- **Factual claims:** Protected status and dates; reef health; wildlife frequency; species;
  suitability by experience level; equipment/operator availability; freediving and seasonal
  dolphin activity.
- **Future Sanity destination entry:** **No.** Use as a category/collection and editorial doorway.
  Place-level material maps to destinations; named sites, conditions, depths, and specialist
  guidance map to `diveSite`; bookable or hosted activities belong to future `experience`
  documents.

#### Waterfalls

- **Current URL:** [joshuaspoint.com/waterfalls](https://joshuaspoint.com/waterfalls/)
- **Current role:** Collection comparing Casaroro Falls and Pulangbato Falls.
- **Existing text:** Preserves a useful editorial contrast: a steep forest gorge versus a more
  accessible red-rock and warm-water setting. Includes a proposed combined day.
- **Images available:** `373a964d4685b5dbba7b174278e22488.webp`,
  `dcbde73c52c288299bc0ca99326b44ed-768x1024.webp`, and
  `Pulangbato-Falls-Bar.webp`. The first two waterfall locations require confirmation; the last
  shows an entrance structure rather than the falls.
- **Factual claims:** Terrain, step count, swimming, mineral water, hot springs, access, combined
  itinerary, and transport.
- **Future Sanity destination entry:** **No.** Candidate waterfall category/collection pointing to
  Casaroro and Pulangbato destination documents.

#### Mountains & Lakes

- **Current URL:** [joshuaspoint.com/mountains-and-lakes](https://joshuaspoint.com/mountains-and-lakes/)
- **Current role:** Collection for Twin Lakes, Lake Balanan, and Najandig Peak.
- **Existing text:** Contrasts rainforest lakes, a quieter southern lake, and an elevated coastal
  viewpoint; also proposes day combinations.
- **Images available:** Najandig Peak is identifiable. Other placements reuse Casaroro and
  Dumaguete images and should not migrate as lake photography.
- **Factual claims:** Protected/volcanic-lake status, trails, boating, birdlife, routes, access,
  relative visitor levels, and itinerary feasibility.
- **Future Sanity destination entry:** **No.** Candidate category/collection pointing to the three
  place documents.

#### Scenic Routes

- **Current URL:** [joshuaspoint.com/scenic-routes](https://joshuaspoint.com/scenic-routes/)
- **Current role:** Route directory for independent road exploration.
- **Existing text:** Introduces Coastal Ride to Dumaguete, Valencia Highlands Loop, Waterfall
  Explorer, Twin Lakes Escape, and Southern Explorer. Includes scooter suitability, road character,
  fuel, weather, mobile signal, and safety guidance.
- **Images available:** Mostly repeated Najandig, Casaroro, and Dumaguete photographs. They do not
  document each route.
- **Factual claims:** Scooter availability and policy, route distances, travel times, road quality,
  seasonal conditions, traffic, fuel, mobile signal, safety, and private-driver arrangements.
- **Future Sanity destination entry:** **No.** Preserve for future scooter-route content. Routes
  should reference destinations and experiences rather than become destination documents.

### 2. Individual destination pages

#### Casaroro Falls

- **Current URL/location:** [joshuaspoint.com/casaroro-falls](https://joshuaspoint.com/casaroro-falls/);
  the page places it in the Valencia highlands.
- **Existing text:** Describes the descent by a long staircase into a forested gorge, cooler air,
  birds and rushing water, the waterfall arrival, and the climb out. Practical guidance covers
  footwear, water, slippery conditions, swimming, photography light, mobility, and children.
- **Images available:**
  `539588359_1206921484786755_8903495630037873207_n-769x1024.jpg` (person before a tall
  waterfall; alt identifies Casaroro). The page also includes a generic placeholder and unrelated
  related-content images; exclude those.
- **Factual claims:** Nearly 30-metre height; distance and drive time from Joshua's Point; several
  hundred steps; walk length; swimming; seasonal flow; accessibility; family suitability; route
  and transport availability.
- **Future Sanity destination entry:** **Yes — existing seed.** Reconcile this source with the
  current `destination-casaroro-falls` document. Retain the arrival/terrain structure, but do not
  copy distances, times, dimensions, access, or safety advice until verified.

#### Lake Balanan

- **Current URL/location:** [joshuaspoint.com/lake-balanan-siaton](https://joshuaspoint.com/lake-balanan-siaton/);
  the page places it inland from Siaton.
- **Existing text:** Describes morning stillness, forested hills, water, a bamboo raft, small
  waterfalls, forest paths, and picnic areas. It proposes boating, kayaking, swimming, and an
  independent day from Joshua's Point.
- **Images available:** `468101457_..._n.webp` (people in a boat), `468188172_..._n.webp` (person
  beside a jungle pool), `467749205_..._n.webp` (floating nipa structure on a lake), and
  `373a964d4685b5dbba7b174278e22488.webp` (waterfall). Exact locations, photographers, and rights
  require confirmation.
- **Factual claims:** Distance and 45–55 minute travel time; route; bamboo raft, boating, kayaking,
  swimming, parking, trails, waterfalls, family suitability, and dry-season timing.
- **Future Sanity destination entry:** **Yes — priority.** Use the existing visual and narrative
  themes as source candidates; leave practical fields empty until field verification.

#### Apo Island

- **Current URL/location:** [joshuaspoint.com/apo-island](https://joshuaspoint.com/apo-island/);
  island reached from the southern Negros coast.
- **Existing text:** Introduces the marine sanctuary, reef, turtles, snorkeling/diving,
  conservation, village life, seagrass, coral gardens, boat arrival, and respectful visitation.
- **Images available:** `WPO3061-1024x683.webp` (turtle),
  `ezgif-4438f7fd055bd9-1024x576.webp` (Apo Island aerial on the Marine Adventures page), plus
  related macro photographs whose location is not established.
- **Factual claims:** Malatapay departure point; road and boat duration; sanctuary/user fees;
  conservation history; turtle frequency; coral condition; weather/seasonality; landing method;
  operators, guides, and equipment.
- **Future Sanity destination entry:** **Yes.** Keep the island/community/conservation destination
  story separate from individual Apo Island `diveSite` records.

#### Dauin

- **Current URL/location:** [joshuaspoint.com/dauin-negros-oriental](https://joshuaspoint.com/dauin-negros-oriental/);
  coastal municipality north of Joshua's Point.
- **Existing text:** Covers black-sand coast, marine sanctuaries, dive culture, macro marine life,
  local shore atmosphere, restaurants, and its relationship to Apo Island.
- **Images available:** `Warty-Frogfish-Antennarius-maculatus02-1024x683.webp` and
  `Sacoglossa-Costasiella-kuroshimae-1024x683.webp`; other related items include the Apo turtle.
  Species ID, dive location, photographer, and rights require verification.
- **Factual claims:** Distance and 20–25 minute travel time; sanctuary status; dive quality;
  species; restaurants and parking; snorkeling; operator access; year-round diving and visibility.
- **Future Sanity destination entry:** **Yes.** The town/coast guide belongs in `destination`;
  Masaplod, El Dorado, San Miguel, and other named sites belong in `diveSite` if approved.

#### Valencia

- **Current URL/location:** [joshuaspoint.com/valencia-negros-oriental](https://joshuaspoint.com/valencia-negros-oriental/);
  foothills/highlands above the coast.
- **Existing text:** Describes cooler highland air, farmland and forest, a town market, cafés, and
  Valencia as a doorway to Casaroro, Pulangbato, and Twin Lakes.
- **Images available:** No dedicated Valencia image was identified. Current placements use
  Casaroro, Dumaguete, and an underwater clownfish image; the latter two are mismatched.
- **Factual claims:** Relationship to Mount Talinis; distance and 35–45 minute travel time; paved
  and steep roads; weather; fuel/parking; market and café availability; route connections.
- **Future Sanity destination entry:** **Yes, lower priority.** Dedicated photography and local
  reporting are prerequisites.

#### Pulangbato Falls

- **Current URL/location:** [joshuaspoint.com/pulangbato-falls](https://joshuaspoint.com/pulangbato-falls/);
  Valencia highlands.
- **Existing text:** Contrasts red-orange rock, pools, warm mineral water, and shorter access with
  the more strenuous Casaroro visit. Mentions nearby food stalls and changing areas.
- **Images available:** No confirmed main waterfall photograph on the individual page. The
  Waterfalls collection includes `Pulangbato-Falls-Bar.webp`, which documents an entrance feature,
  not the waterfall.
- **Factual claims:** Name/etymology; geology/mineral colour; hot springs and water temperature;
  distance/time; swimming; entry, parking, stalls, changing facilities, accessibility, and family
  suitability.
- **Future Sanity destination entry:** **Yes.** Do not populate travel or geological fields until
  verified; obtain dedicated photography.

#### Twin Lakes

- **Current URL/location:** [joshuaspoint.com/twin-lakes-negros-oriental](https://joshuaspoint.com/twin-lakes-negros-oriental/);
  Balinsasayao and Danao highlands.
- **Existing text:** Describes forest, mist, lake viewpoints, trails, birdlife, boats/kayaks, and a
  cooler mountain day away from the coast.
- **Images available:** No confirmed Twin Lakes photograph was identified. Existing placements
  reuse Najandig, Casaroro, and Dumaguete images.
- **Factual claims:** Official name and protected status; volcanic origin; distance and 75–85
  minute journey; route via Valencia; park fees/hours; trail condition; boating/kayaking; parking;
  accessibility; seasonality and family suitability.
- **Future Sanity destination entry:** **Yes.** Preserve the quiet forest/lake editorial direction;
  require primary-source park and access verification plus dedicated photography.

#### Najandig Peak

- **Current URL/location:** [joshuaspoint.com/najandig-peak](https://joshuaspoint.com/najandig-peak/);
  page positions it inland/south near Lake Balanan and Siaton.
- **Existing text:** Describes a green ridge, elevated coastal and mountain views, sunrise/sunset,
  a short approach, and limited facilities.
- **Images available:**
  `499367693_122213200064120364_6903412973555069464_n-1024x559.jpg` (green ridge trail; alt
  identifies Najandig Peak). A generic WordPress placeholder is also present and must be excluded.
- **Factual claims:** Location/name; distance and 30–40 minute travel time; road condition; walk
  length and difficulty; access permission; sunrise/sunset suitability; season; facilities;
  family suitability. The page contains inconsistent difficulty language and must not be migrated
  verbatim.
- **Future Sanity destination entry:** **Yes.** Verify that the place is publicly accessible and
  that the proposed route does not cross private land.

#### Siaton

- **Current URL/location:** [joshuaspoint.com/siaton](https://joshuaspoint.com/siaton/); town south
  of Joshua's Point.
- **Existing text:** Presents a working market/fishing town and practical gateway to Lake Balanan
  and Najandig rather than a conventional attraction.
- **Images available:** No dedicated Siaton image was identified. Current placements reuse
  Najandig, Casaroro, and Dumaguete.
- **Factual claims:** Distance and 25–35 minute travel time; port/market character; food, fuel,
  supplies, parking, route turn-off, and transport availability.
- **Future Sanity destination entry:** **Possible.** Retain only if local reporting can produce a
  respectful town guide with useful reasons to stop; otherwise reference Siaton within Lake
  Balanan and route content.

#### Dumaguete

- **Current URL/location:** [joshuaspoint.com/dumaguete](https://joshuaspoint.com/dumaguete/);
  provincial city north of Joshua's Point.
- **Existing text:** Covers Rizal Boulevard, cafés, Silliman University, markets, heritage, eating,
  walking, and suggested morning/late-afternoon visits.
- **Images available:** `24251887_1792559951049159_765625734_n.jpg` (historic stone bell tower;
  location and rights still require confirmation). Marine and waterfall images appear only as
  related-content assets and must not map to Dumaguete.
- **Factual claims:** Distance and 40–50 minute travel time; walkability; safety; affordability;
  opening/access to named institutions; restaurant recommendations; transfer availability.
- **Future Sanity destination entry:** **Yes.** Verify named businesses and practical details close
  to publication; retire broad safety and affordability guarantees.

### 3. Dedicated dive-area pages

The current site treats these as area guides containing several named dive sites. The new model
must not collapse an entire area and each underwater site into one ambiguous document.

#### Apo Island Diving & Snorkelling

- **Current URL/location:** [joshuaspoint.com/apo-island-diving](https://joshuaspoint.com/apo-island-diving/);
  Apo Island.
- **Existing text:** Explains why people dive/snorkel the island, marine life, first-dive and turtle
  experiences, accommodation-base choices, and practical planning. Named sites include Rock Point
  East/West, Mamsa Point, the Sanctuary/Turtle Area, Chapel, Cogon, and Coconut Point.
- **Images available:** Turtle (`WPO3061`), Wunderpus octopus, Cyerce sea slug, pipefish, clownfish,
  and the Apo aerial. Several macro subjects may have been photographed elsewhere; placements do
  not establish dive-site provenance.
- **Factual claims:** 8 km to Malatapay; 15–20 minute drive and 20–30 minute crossing; guide fee and
  cash-only economy; March–May calm season; certification/experience suitability; current and
  site difficulty; turtle and shark frequency; coral health; arrangements by the host.
- **Future Sanity destination entry:** Apo Island remains a `destination`. Each approved named
  underwater location becomes a `diveSite`; general diving orientation can become an editorial
  dive-area page or collection. Nothing should be split until a qualified local dive reviewer
  confirms site names, conditions, and access.

#### Dauin Diving

- **Current URL/location:** [joshuaspoint.com/dauin-diving](https://joshuaspoint.com/dauin-diving/);
  Dauin coast.
- **Existing text:** Introduces muck diving, black volcanic sand, macro subjects, snorkeling, night
  diving, base choices, and combining Dauin with Apo Island. Named sites include Masaplod Marine
  Sanctuary, El Dorado, San Miguel/Tyre Reef, Dauin House Reef, and Secret Corner.
- **Images available:** Costasiella sea slug, pipefish, thorny seahorse, and clownfish. Credits,
  capture sites, dates, species IDs, and rights require confirmation.
- **Factual claims:** 17 km and 20–25 minute journey; calm/minimal-current conditions; certification
  level; sanctuary user/camera fees; November–May conditions; marine species; night-dive
  behaviour; operator trips and host coordination.
- **Future Sanity destination entry:** Dauin remains a `destination`; verified named underwater
  sites become `diveSite` documents. Practical operator and fee information needs frequent review.

#### Zamboanguita Diving

- **Current URL/location:** [joshuaspoint.com/zamboanguita-diving](https://joshuaspoint.com/zamboanguita-diving/);
  Zamboanguita coast.
- **Existing text:** Positions the nearby coast as a mix of reef and muck diving, snorkeling, and a
  departure area for Apo Island. Named sites include Malatapay, Lutoban Reef, Thalatta, and
  Zamboanguita house reefs.
- **Images available:** Ghost pipefish image (`Ghost-684x1024.jpg`), Wunderpus octopus, pipefish,
  Cyerce sea slug, warty frogfish, Xenia swimming crab, and clownfish. Exact locations and rights
  remain unverified.
- **Factual claims:** 8 km and 15–20 minute journey; relative current/calmness; beginner
  suitability; local reserve fees; November–May conditions; marine species; named-site access;
  comparison with Dauin/Apo; host arrangements.
- **Future Sanity destination entry:** A Zamboanguita coastal guide may be a `destination`; verified
  named underwater sites become `diveSite` documents. “Closest,” “calmest,” and experience-level
  claims require qualified review.

### 4. Scenic route pages

These are valuable route source documents, not destination pages.

#### Coastal Ride to Dumaguete

- **Current URL:** [joshuaspoint.com/coastal-ride-to-dumaguete](https://joshuaspoint.com/coastal-ride-to-dumaguete/)
- **Existing text:** A coast-road sequence through Dauin to Dumaguete with fuel, coffee, food,
  viewpoints, route stops, a sample day, and safety notes.
- **Images available:** Najandig, Casaroro, and Dumaguete bell tower. Only the Dumaguete image is
  plausibly relevant; dedicated road/coast photography is missing.
- **Factual claims:** 32 km one way; approximately 40 minutes; flat/well-paved road; traffic level;
  fuel and food availability; sea/Cebu views; quiet coves; scooter suitability; Apo boat departure;
  private transport.
- **Future Sanity destination entry:** **No.** Future scooter-route document referencing Dauin and
  Dumaguete destinations and relevant experiences.

#### Valencia Highlands Loop

- **Current URL:** [joshuaspoint.com/valencia-highlands-loop](https://joshuaspoint.com/valencia-highlands-loop/)
- **Existing text:** A climb from the coast through farmland/forest to Valencia, with coffee,
  produce, viewpoints, fuel, descent cautions, and extensions to two waterfalls.
- **Images available:** Reused Najandig, Casaroro, and Dumaguete assets; no complete route essay.
- **Factual claims:** 31 km and roughly 39 minutes; surface, curves, temperature, dampness, fuel,
  cafés/market, viewpoints, scooter suitability, rain safety, and waterfall proximity.
- **Future Sanity destination entry:** **No.** Future scooter route related to Valencia, Casaroro,
  and Pulangbato.

#### Waterfall Explorer

- **Current URL:** [joshuaspoint.com/waterfall-explorer](https://joshuaspoint.com/waterfall-explorer/)
- **Existing text:** Combines Casaroro and Pulangbato through Valencia, contrasting a steep gorge
  walk with red-rock pools/warm water. Includes proposed times, stops, food, footwear, and rain
  cautions.
- **Images available:** Reused Najandig, Casaroro, and Dumaguete assets; only Casaroro directly
  supports the route.
- **Factual claims:** 1 hour 20 minutes to the highlands; paved trailhead roads; step count; warm
  natural pools; food/fuel; route sequence; heavy-rain risk; guide/driver arrangements.
- **Future Sanity destination entry:** **No.** Future scooter/driver route related to Casaroro,
  Pulangbato, and Valencia.

#### Twin Lakes Escape

- **Current URL:** [joshuaspoint.com/twin-lakes-escape](https://joshuaspoint.com/twin-lakes-escape/)
- **Existing text:** A longer rainforest/highland journey to Lakes Balinsasayao and Danao,
  including fuel, food, viewpoints, trails, kayaking, weather, switchbacks, and a sample day.
- **Images available:** Reused Najandig, Casaroro, and Dumaguete photographs; Twin Lakes route and
  lake photography is missing.
- **Factual claims:** 61 km and 1 hour 20 minutes; paved road, steep switchbacks, ranger facilities,
  food/coffee, trails/kayaks, temperature, mist, after-dark safety, scooter suitability, and
  transport.
- **Future Sanity destination entry:** **No.** Future route related to Twin Lakes and Valencia.

#### Southern Explorer

- **Current URL:** [joshuaspoint.com/southern-explorer](https://joshuaspoint.com/southern-explorer/)
- **Existing text:** A full-day route south through Siaton to Lake Balanan and Najandig Peak, with
  fuel/food stops, coastal and inland road contrast, a sample schedule, and dry-weather cautions.
- **Images available:** Najandig plus unrelated Casaroro and Dumaguete assets. Dedicated road,
  Siaton, and Lake Balanan route photography is incomplete.
- **Factual claims:** 30 km to Siaton; 1.5–2 hours each way for the wider route; road surfacing and
  ground-clearance needs; fuel, market, food, viewpoints, visitor levels, dry-weather suitability,
  scooter experience, and driver availability.
- **Future Sanity destination entry:** **No.** Future route related to Siaton, Lake Balanan, and
  Najandig Peak.

### 5. Legacy activity content

#### Activities (legacy/search-indexed content)

- **Current URL:** [joshuaspoint.com/activities](https://joshuaspoint.com/activities/) currently
  resolves into the newer guide experience, while search indexes still expose an older page.
- **Existing text:** Lists Apo/Dauin diving, dolphin/whale watching, Manjuyod Sandbar, waterfalls,
  hiking, Twin Lakes, Dumaguete, and broad reasons to visit Negros Oriental.
- **Images available:** Search-indexed output does not preserve useful attribution or reliable
  place-to-image mapping.
- **Factual claims:** Wildlife sightings, “best” dive locations, Mount Kanlaon access, sandbar
  comparisons, reef conditions, and activity availability.
- **Future Sanity destination entry:** **No.** Use only as a completeness check. Its generic list
  structure and promotional copy should not be migrated.

### 6. Priority-content coverage

| Approved migration priority | Existing public source | Current coverage |
| --- | --- | --- |
| Casaroro Falls | Individual page, Waterfalls collection, Waterfall Explorer, Valencia pages | Strong source volume; facts and photography rights still need verification |
| Lake Balanan | Individual page, Mountains & Lakes, Southern Explorer, Siaton | Strong narrative seed and image candidates; practical facts unverified |
| Danjugan Island | No public Joshua's Point page located in the page index or site search | Missing; do not create from zero during this migration |
| Southern Negros dive destinations | Marine Adventures, Negros Oriental, Apo Island/Dauin/Zamboanguita dive guides | Extensive source material; requires qualified dive review and correct split between destination and dive-site records |

---

## Public image register

This register records discoverable WordPress assets, not approved reusable photography. Before any
download or Sanity upload, confirm the original file, photographer, usage rights, location, date,
species/subject, alt text, and intended crop.

| Asset | Appears to show | Candidate role | Status |
| --- | --- | --- | --- |
| `539588359_..._n.jpg` | Person before Casaroro Falls | Casaroro Hero/story | Candidate; verify rights, location, consent |
| `499367693_..._n.jpg` | Green ridge identified as Najandig Peak | Najandig Hero/story | Candidate; verify rights and access/location |
| `24251887_..._n.jpg` | Historic stone bell tower | Dumaguete story | Candidate; verify exact landmark and rights |
| `467749205_..._n.webp` | Lake with floating nipa structure | Lake Balanan | Candidate; verify exact location and rights |
| `468101457_..._n.webp` | People travelling by boat | Lake Balanan | Needs verification; location, consent, rights |
| `468188172_..._n.webp` | Person near a jungle pool | Lake Balanan gallery | Needs verification; exact location, consent, rights |
| `373a964d...webp` | Person at a waterfall | Lake/waterfall content | Needs verification; waterfall unidentified |
| `dcbde73c...webp` | Waterfall/cave scene | Waterfalls collection | Needs verification; waterfall unidentified |
| `Pulangbato-Falls-Bar.webp` | Entrance/bar structure | Pulangbato practical context | Candidate only; not a Hero image |
| `ezgif-4438...webp` | Apo Island aerial and reef | Apo Island Hero/story | Candidate; verify drone rights and flight compliance |
| `WPO3061...webp` | Turtle with reef fish | Apo Island/marine editorial | Candidate; verify capture location and rights |
| `Sacoglossa-Costasiella...webp` | Costasiella sea slug | Dauin dive content | Candidate; verify site, species, rights |
| `Warty-Frogfish...webp` | Warty frogfish | Dauin/Zamboanguita dive content | Needs verification; page placement is not provenance |
| `Thorny-Seahorse...webp` | Thorny seahorse | Dauin dive content | Candidate; verify site, species, rights |
| `Ghost-684x1024.jpg` | Underwater macro subject | Zamboanguita dive content | Needs verification; missing descriptive alt |
| Wunderpus, Cyerce, pipefish, crab, clownfish assets | Underwater macro subjects | Dive galleries | Needs verification; multiple pages reuse them |
| WordPress `placeholder-image` assets | Generic placeholder | None | Exclude from migration |

The repository's `web/public/images` tree currently contains House and Home development
photography only. No destination photographs are stored locally. Public-site images should not be
copied into the repository or uploaded to Sanity until their provenance and rights are confirmed.

---

## Phase 2 — Content cleanup

### Approved/usable migration material

“Usable” below means structurally valuable source material, not automatically production-approved
copy.

1. **Existing place list and URL history**
   - Preserve canonical names and old URLs for redirects and migration tracking.
   - Prioritize Casaroro Falls and Lake Balanan.
   - Preserve Apo Island, Dauin, Valencia, Pulangbato Falls, Twin Lakes, Najandig Peak,
     Dumaguete, and potentially Siaton as later source records.
2. **Editorial contrasts already present**
   - Casaroro's forest descent versus Pulangbato's different access and landscape.
   - Coast versus highland; island reef versus Dauin macro diving; still lake versus ridge.
   - These are useful story structures once their underlying facts are confirmed.
3. **Journey-oriented practical structure**
   - Arrival experience, route, terrain, what to bring, photography notes, nearby places, and
     suggested pace already align with the approved editorial standard.
4. **Existing collection taxonomy**
   - Cities & Culture, Marine Adventures, Waterfalls, and Mountains & Lakes provide a useful
     starting vocabulary. Their names and membership still require editorial approval.
5. **Named relationship graph**
   - The public pages already link places into meaningful continuations. Preserve those proposed
     relationships for review instead of recreating them later.
6. **Public-site image candidates**
   - Preserve URLs and filenames as a rights-review queue. Do not treat publication as proof of
     production rights or accurate location metadata.

### Needs verification before CMS migration

| Claim class | Examples found | Required verification |
| --- | --- | --- |
| Coordinates and geography | Location, route, orientation, island/peak identity | Field GPS plus map cross-check; record reviewer/date |
| Distance and time | Every kilometre and journey estimate | Re-drive/route from the correct Joshua's Point starting point; record date and conditions |
| Roads and scooter suitability | Surface, grade, traffic, ground clearance, beginner suitability | Current field ride by a competent local reviewer; weather caveat; owner policy |
| Prices and fees | Sanctuary, camera, guide, park, boat, entrance fees | Current official/operator source close to publication; display reviewed date |
| Opening and availability | Park access, boats, kayaks, guides, food, fuel, parking | Direct confirmation with responsible local source |
| Seasons and conditions | Rain, visibility, currents, waterfall flow, sea crossing | Qualified local/official source; avoid guarantees |
| Diving | Site names, depths, currents, entry, levels, marine life, reef condition | Qualified local dive professional; separate general observation from site condition |
| Wildlife | Turtles, sharks, dolphins, named macro species | Species/image verification and non-guaranteed language |
| Safety/accessibility | Children, beginners, swimming, road/trail safety, wheelchair access | Current on-site assessment; state limitations precisely |
| Host services | Transport, drivers, guides, equipment, boats, guest scooters | Current Joshua's Point operating policy and supplier availability |
| Businesses and institutions | Cafés, restaurants, markets, stations, Silliman access | Verify name, location, hours, and suitability near publication |
| Photography | Subject, place, person consent, drone compliance, credit, rights | Original-file and rights audit before import |

### Claims to retire or rewrite

Do not migrate language built around:

- “world-class,” “best,” “most spectacular,” “must-visit,” or “bucket-list”;
- “hidden gem,” “untouched,” “pristine,” “paradise,” or “without crowds”;
- “perfect” for a person, family, diver, photographer, or itinerary;
- guaranteed turtles, sharks, visibility, calm seas, safety, affordability, or quiet;
- unsupported comparative claims such as “closest,” “calmest,” “easiest,” or “least visited”;
- generic promises that a trip will be unforgettable, extraordinary, or authentic;
- claims that transport, guides, scooters, boats, or equipment can always be arranged;
- unattributed biodiversity counts or superlative rankings.

These can be replaced later with first-hand observation, precise verified context, and clear limits.

### Content to exclude

- Generic WordPress placeholder images.
- Related-card images that do not depict the page's destination.
- Duplicate paragraphs and repeated FAQ answers.
- Exact sample-day schedules until route timing is field tested.
- Stale fee figures presented without a reviewed date.
- Dive-site content duplicated inside a geographic destination record.
- Search-indexed legacy copy that conflicts with the current two-suite property and editorial tone.

---

## Phase 3 — Destination architecture recommendation

### 1. Destination documents

Create or reconcile one `destination` document per public place only after its source packet is
assembled.

| Destination | Recommended action | Source packet |
| --- | --- | --- |
| Casaroro Falls | Reconcile existing Sanity seed first | Individual page + Waterfalls + Waterfall Explorer + verified field record |
| Lake Balanan | Create second complete destination | Individual page + Mountains & Lakes + Southern Explorer + verified field record |
| Apo Island | Create after source split | Destination page + Marine Adventures; keep named dive sites separate |
| Dauin | Create after source split | Destination page + city/coast material; keep named dive sites separate |
| Pulangbato Falls | Create when photography and facts are verified | Individual page + Waterfalls + Waterfall Explorer |
| Twin Lakes | Create when park/access sources and images exist | Individual page + Mountains & Lakes + Twin Lakes Escape |
| Najandig Peak | Create only after access is confirmed | Individual page + Mountains & Lakes + Southern Explorer |
| Dumaguete | Create as a selective city guide | Individual page + Cities & Culture + Coastal Ride |
| Valencia | Create after local reporting and photography | Individual page + Cities & Culture + route pages |
| Siaton | Editorial decision after reporting | Individual page + Cities & Culture + Southern Explorer |
| Danjugan Island | Do not create in this migration pass | No existing Joshua's Point source located |

Use the existing explicit destination fields: identity, editorial introduction, story, why visit,
gallery, practical information, scooter guidance where truly supported, map location, photography
notes, tips, things to bring, related destinations, SEO, workflow status, and last-reviewed date.
Do not introduce a generic page builder.

### 2. Destination categories and collections

The current site has useful editorial collections, but the new CMS does not need taxonomy
documents merely to reproduce old URLs.

Recommended first release:

- Preserve **Waterfalls** and **Mountains & Lakes** as curated destination collections.
- Review whether **Cities & Culture** is the right enduring public label.
- Treat **Marine Adventures** as a cross-system collection linking destinations, dive sites, and
  future experiences rather than a simple destination type.
- Keep the controlled `destinationType` field for the fundamental place type.
- Add a category document only if editors need an indexed landing page with its own introduction,
  SEO, ordering, and imagery. Until then, a curated collection on the destinations singleton is
  simpler and more intentional.

No category schema change is recommended until the first two destination documents reveal an
actual editorial need.

### 3. Practical travel information

Map existing material into the current shared objects rather than prose duplication:

| Existing material | CMS destination field/object | Rule |
| --- | --- | --- |
| Journey duration | `travelInformation.travelTime` | Verify from Joshua's Point; include reviewed date |
| Transport option | `travelInformation.recommendedTransport` | Describe options, not guaranteed service |
| Terrain/effort | `travelInformation.difficulty` and `highlights` | Separate route difficulty from activity/trail difficulty |
| Season/light | `travelInformation.bestTimeToVisit` and `photographyNotes` | Avoid weather or wildlife guarantees |
| Fees/hours | `travelInformation.entranceFee` / `openingHours` | Use current source and review cadence |
| Coordinates/directions | `mapLocation` | Field-verify; retain accessible text fallback |
| Road/parking/fuel | `scooterGuide` | Populate only after a current route ride |
| Equipment/personal preparation | `thingsToBring` | Specific, necessary, non-promotional |
| Local context and caution | `tips` | Concise and date-aware where volatile |

Routes should own route-level road, fuel, and timing information. Destination pages should not
duplicate an entire scooter route.

### 4. Related experiences and dive content

- Keep manually curated `relatedDestinations` as the first relationship layer.
- Do not add `relatedExperiences` until the Experience CMS document exists.
- When it exists, relate a place to meaningful activities without turning the place page into an
  activity catalogue.
- Use incoming references from `diveSite` to surface nearby diving on destination pages.
- Keep named dive-site conditions, depths, currents, entry methods, marine-life observations,
  photography guidance, and safety notes in `diveSite`.
- Use collection pages to explain the relationship among Apo Island, Dauin, and Zamboanguita; do
  not duplicate that comparison across every document.

### 5. Migration packet per destination

Before creating or updating a CMS record, assemble:

1. Old URL and all source-page links.
2. Preserved source text with promotional phrases marked for retirement.
3. Claim ledger with source, status, reviewer, and review date.
4. Image contact sheet with filename, subject, location, author, consent, rights, and crop notes.
5. Proposed destination type and collection memberships.
6. Proposed related destinations, dive sites, routes, and future experiences.
7. Redirect plan from every old canonical URL.
8. Draft-only Sanity entry; editorial and factual review before publication.

### 6. Fast migration order

1. **Freeze the source inventory.** Keep this document and preserve old URLs before the public
   site's structure changes.
2. **Reconcile Casaroro Falls.** Compare its existing Sanity seed field by field with the source
   packet; do not overwrite newer approved content.
3. **Verify Casaroro facts and image rights.** It is already published but not launch-ready.
4. **Create Lake Balanan as the second template.** Its current site material is sufficient for a
   draft once practical facts and images are verified.
5. **Split marine source material.** Decide destination, dive-area, and named dive-site boundaries
   with a qualified local reviewer before entering Apo, Dauin, or Zamboanguita content.
6. **Migrate remaining places in evidence order.** Photography and verified access determine the
   sequence, not old-site prominence.
7. **Create route content later.** Preserve the five route pages now; model them only after field
   rides confirm roads, timings, safety, and operating policy.
8. **Defer Danjugan Island.** Begin original reporting only after the existing-content migration is
   complete and the owner approves a new-content phase.

---

## Immediate decisions before content entry

1. Confirm whether the four current collection labels should remain public.
2. Confirm whether Siaton warrants a standalone editorial page or is context for southern routes.
3. Name the qualified dive reviewer for Apo Island, Dauin, and Zamboanguita.
4. Identify the owner/photographer and rights status of the public WordPress image library.
5. Decide who will field-check Casaroro Falls and Lake Balanan and record coordinates, access,
   travel time, fees, and current conditions.
6. Confirm whether old route pages remain public during migration and which URLs require redirects.

Until those decisions are made, the safest next action is a Casaroro source-to-Sanity comparison
and verification checklist—not new destination writing.
