# Joshua's Point — Home Content Map

**Document type:** Internal editorial planning document
**Route supported:** `/`
**Phase:** Home refinement Phase 2 — Content architecture
**Status:** Core structure approved; owner-source integration in progress
**Public website copy:** No

## Purpose

This document defines what the Home page must communicate before copy, photography, Sanity, or
frontend implementation begins. It follows the approved Home audit and the House methodology:
establish the emotional job, approved source, privacy boundary, missing input, photography role,
and future CMS shape for every section before writing public copy.

The Home page should introduce the world of Joshua's Point through three protected feelings:

- **Homy**
- **Connected to nature**
- **Peaceful**

It should feel like an invitation, not a summary of website features or an accommodation sales
page. Nature remains the hero. The house frames the landscape. Southern Negros should appear as a
place to discover slowly rather than a catalogue of attractions.

This map uses only approved project principles, owner-confirmed material already recorded in the
House documentation, and established platform architecture. It does not approve final wording,
images, captions, or factual claims.

---

## Source hierarchy

Home content must be developed in this order:

1. Explicit owner observation approved for public use.
2. Verified factual record with wording limits understood.
3. Approved Joshua's Point editorial principle.
4. Published related content already reviewed through its own workflow.

If none of these supports a sentence, leave it unwritten. Existing placeholder copy is not source
material.

### Primary internal sources

- `JOSHUA_POINT_HOUSE_SOUL.md`
- `THE_HOUSE_VERIFICATION_RECORD.md`
- `THE_HOME_REDESIGN_AUDIT.md`
- `EDITORIAL_CONTENT_SYSTEM.md`
- `SANITY_CONTENT_MODEL.md`
- `DESTINATION_SYSTEM.md`
- `project-rules.md`

### Privacy boundary

The following remain excluded from public Home content:

- The private meaning or origin of the Joshua name.
- Private family history, relationships, rituals, or memories without separate approval.
- Guest stories, identities, or reactions without consent and verification.
- Precise access, security, coordinates, or location information beyond the owner-approved level.
- Private construction, ownership, or operational information.

Warmth must come from public-safe observations of place, shelter, shared space, and daily rhythm—not
from exposing private history.

---

## Recommended narrative sequence

```text
1. Editorial Hero
   Arrival into the place

2. The Place
   Relationship between land, view, and house

3. Shared Life
   The feeling of home and time together

4. A Morning at Joshua's Point
   One observed daily rhythm

5. From Here, Southern Negros
   The house as a quiet starting point for discovery

6. Closing Reflection
   A final moment of stillness before the global footer
```

### Structure status

| Section                     | Status              | Relationship to current Home                                                               |
| --------------------------- | ------------------- | ------------------------------------------------------------------------------------------ |
| Editorial Hero              | Preserve            | Existing `Hero` role and composition                                                       |
| The Place                   | Preserve and refine | Existing `StorySection` role                                                               |
| Shared Life                 | Approved            | New editorial job about public-safe shared moments and connection between people and place |
| A Morning at Joshua's Point | Preserve and refine | Existing `ImageNarrativeSection` role                                                      |
| From Here, Southern Negros  | Approved            | New editorial bridge from Joshua's Point into the surrounding region                       |
| Closing Reflection          | Approved            | Distinct invitation into the Joshua's Point world before the global Footer                 |

The owner-approved hierarchy is Joshua's Point first, nature around it second, and regional
discoveries third. Shared Life, From Here, Southern Negros, and Closing Reflection are approved
editorial sections. Their compositions, photography, Sanity fields, and implementation remain
subject to later phases. The Closing Reflection must invite the reader into the wider Joshua's
Point world and remain distinct from the closing used on The House page.

---

## 1. Editorial Hero

### Emotional purpose

Create the first sense of arrival. The visitor should encounter landscape before explanation and
feel welcomed into a real place without being told what they must feel.

### Core message

Joshua's Point is a home held in relationship with sea, mountain, weather, and changing light.
Photography should establish that relationship; words should remain restrained.

This is an editorial direction, not final copy.

### Approved facts and principles

- Nature is the hero.
- Architecture frames the landscape.
- The protected feelings are Homy, Connected to nature, and Peaceful.
- The Bohol Sea, Apo Island, Siquijor Island, and Mount Talinis are owner-confirmed as visible from
  Joshua's Point.
- The deck, view, and infinity pool are owner-confirmed as first-noticed elements on arrival.
- The house is owner-confirmed as connected with the landscape and view.
- The Hero's primary subject and destination is Joshua's Point itself, followed by nature and only
  later by Southern Negros.
- The owner-approved public location is Joshua's Point, Calango, Zamboanguita 6218, Negros
  Oriental, Philippines. A precise public property coordinate remains intentionally withheld until
  separately approved.

Owner confirmation of visible geography does not prove that a landmark appears in a particular
Hero photograph. Asset-specific matching remains required.

### Content boundaries

- Do not use the private origin of the Joshua name.
- Do not make a universal promise about how every guest arrives or feels.
- Do not use “ridge,” “valley,” “uninterrupted,” sunrise direction, or similar claims without
  verification.
- Do not introduce luxury, exclusivity, status, scale, or generic retreat language.
- Do not explain the whole property in the Hero.

### Missing owner information

- The preferred public-safe arrival observation for the Home page.
- The first moment the owner wants the Hero image and words to hold.
- The preferred public location label and acceptable level of geographic precision.
- Whether the primary action should deepen the Joshua's Point story through The House or continue
  into the next Home section without a conventional CTA.
- Whether a second Hero link is genuinely necessary.

### Photography role

**Role:** Home Hero — landscape-led arrival.

Required characteristics:

- Full-width landscape orientation.
- House present within its setting without dominating the frame.
- Honest relationship among land, vegetation, sky, architecture, and view.
- Text-safe negative space and viable desktop, tablet, and mobile crops.
- Natural, representative light and restrained editing.
- No isolated pool-as-amenity composition.
- No exaggerated scale or enhanced geography.

The current House Hero asset may be reviewed later as development photography only. It is not
automatically the correct Home Hero and is not production approved.

### Future Sanity fields

The existing `homePage.hero` object remains suitable:

```text
hero
├── eyebrow
├── heading
├── introduction
├── image — editorialImage
├── primaryLink — optional
└── secondaryLink — optional
```

Editorial requirements:

- Keep the heading concise.
- Keep the introduction to one short paragraph.
- Require the image for publication.
- Use only valid routes or approved external links.
- Do not expose internal verification or private source notes through this object.

### Related principles

- Nature is the hero.
- The house frames the landscape.
- Connected to nature.
- Peaceful.
- Guests should feel welcomed, never sold to.

---

## 2. The Place

### Emotional purpose

Answer the Home page's central question: what makes Joshua's Point different? The answer should
come from one truthful relationship between land, house, weather, and daily life—not from a list of
features.

### Core message

The house belongs to the landscape through view, thresholds, shared spaces, and changing
conditions. Architecture helps people notice nature rather than competing with it.

This remains an approved principle until a specific owner observation and photograph give the
section its final subject.

### Approved facts and principles

- Sea and mountain belong to the identity of Joshua's Point.
- The visible body of water is owner-confirmed as the Bohol Sea.
- Apo Island, Siquijor Island, and Mount Talinis are owner-confirmed as visible.
- Sliding doors are owner-confirmed architectural elements.
- The covered deck creates semi-outdoor living space.
- The pool is connected to the view and landscape.
- The house is understood in connection with the landscape and view.
- Light, weather, air, vegetation, and changing conditions are approved editorial territory.

### Content boundaries

- Do not say “every space” or “every room” opens to the landscape.
- Do not attribute formal design intent unless approved for public use by owner and architect.
- Do not describe the landform as ridge, valley, point, or slope without factual verification.
- Do not use technical claims about ventilation, shade, drainage, thermal behavior, or
  sustainability here without evidence.
- Do not name a visible landmark in a caption or alt text until it is matched to that image.

### Missing owner information

- The one real relationship that should define this section.
- Where that relationship is observed from.
- What the owner notices there in ordinary conditions.
- How the same place changes through weather or time of day.
- Whether the section should focus on view, threshold, shelter, pool relationship, or another
  verified subject.
- The factual context needed for a short image caption.

### Photography role

**Role:** Place/Landscape relationship.

Required characteristics:

- One landscape photograph distinct from the Hero.
- A specific, human-height relationship rather than a second establishing view.
- House and nature legible together through a real threshold, deck edge, shelter, or view.
- Natural use and honest scale.
- Enough contextual detail to support one factual caption if useful.

The existing House View placeholder is not an uninterrupted view photograph and must not be
promoted to a verified Place image merely because it contains distant landscape.

### Future Sanity fields

The existing `homePage.placeStory` object remains suitable:

```text
placeStory
├── eyebrow
├── heading
├── body
├── image — editorialImage
└── caption
```

The current required caption should contain only asset-specific verified context. If the selected
image needs no explanation, schema optionality may be reviewed in Phase 5 rather than filling the
field with atmospheric language.

### Related principles

- Nature is the hero.
- Architecture frames the landscape.
- Indoor and outdoor living.
- Connected to nature.
- Write from real experiences only.

---

## 3. Shared Life

### Emotional purpose

Introduce the feeling of home. After landscape and architecture establish the place, this section
should show that Joshua's Point is lived in, shared, and cared for without exposing private family
stories or manufacturing hospitality scenes.

### Core message

The kitchen, dining area, living room, and covered deck support time together while leaving room
for quieter individual activity. The value is in how the spaces are used, not their scale or status.

### Approved facts and principles

- The owner's foundation word is “Homy.”
- Joshua's Point should feel like a home shared with care, not a display object.
- The kitchen, dining area, living room, and deck belong to a connected shared rhythm.
- Shared Life is approved to focus on cooking, dining, conversation, and people being together.
- The covered deck supports dining, sitting, yoga, and different activities.
- Evening is experienced across the deck, dining table, pool, and living room.
- Joshua's Point is not a party place.
- Shared life should be represented through ordinary, recognizable moments rather than staged
  sociability.

### Content boundaries

- Do not identify family members, guests, relationships, conversations, celebrations, or routines.
- Do not present one private gathering as a typical stay.
- Do not invent cooking, meals, dialogue, or social behavior.
- Do not claim acoustic separation or privacy performance.
- Do not use people in photography without explicit consent and privacy review.
- Do not turn this section into a room or amenities list.

### Missing owner information

- One public-safe observation of where people naturally gather.
- What “Homy” means through a visible or sensory detail.
- How shared time moves between kitchen, dining, living room, and deck.
- Which ordinary activity can be described without revealing a private memory.
- One public-safe example that makes cooking, dining, conversation, or being together specific
  without exposing a private memory.

### Photography role

**Role:** House relationship / shared life.

Required characteristics:

- One photograph showing connected shared spaces at human scale.
- Prefer real traces of use over staged decoration.
- A readable relationship with deck or outside where possible.
- Warmth created through real light, material, shelter, or use—not artificial lifestyle staging.
- Human presence optional and consent-dependent.

The current Shared Heart House development image is the closest existing candidate for visual
testing. It remains development photography, is not production approved, and must be replaced or
separately approved before launch.

### Future Sanity fields

This section is not present in the current `homePage` schema. If approved as a distinct Home role,
use one named object rather than a generic section:

```text
sharedLife
├── eyebrow
├── heading
├── body
├── image — editorialImage
└── caption — optional
```

Do not add the object in Phase 2. First approve the section's editorial purpose and confirm that it
does not duplicate The House page.

### Related principles

- Homy.
- Shared moments.
- Connected living spaces.
- Indoor and outdoor living.
- Not a party place.
- Protect private family stories.

---

## 4. A Morning at Joshua's Point

### Emotional purpose

Let the visitor pause inside one real daily rhythm. This is not a schedule or promise; it is a
carefully observed moment that makes the wider principles tangible.

### Core message

Morning can be experienced through mountain or sea view, birds, quiet, and connection to nature.
The final section should remain specific to an approved owner observation and selected photograph.

### Approved facts and principles

- Morning may begin with a mountain or sea view and connection to nature.
- Birds are heard in the morning.
- The owner-approved Morning sequence is waking, opening the glass doors, making coffee, sitting
  outside, listening to birds, and observing sea and mountain.
- The deck supports sitting and other ordinary activities.
- The Home page should leave visitors calmer than before.
- Morning is one of the two established Joshua's Point atmospheres.

The existing Home sentence about first light reaching the deck before a valley wakes is not
approved source material.

### Content boundaries

- Do not guarantee sunrise, visibility, birds, silence, weather, or a fixed routine.
- Do not call an image morning unless its capture context supports that description.
- Do not add breakfast, another person's actions, or an emotional response beyond the approved
  sequence.
- Do not identify mountains, sea, or islands in the image without asset-specific verification.
- Do not repeat the Hero or Place Story with another broad landscape description.

### Missing owner information

- The real viewpoint and approximate capture conditions.
- Whether the approved sequence is representative and how closely final wording should follow it.
- Whether sea and mountain are observed together from the intended position or are alternative
  directions from the deck.

### Photography role

**Role:** Morning narrative.

Required characteristics:

- A real morning photograph with recorded date, time, weather, and viewpoint.
- Full-width landscape composition capable of sustaining the existing image-first scale.
- Distinct subject and pacing from Hero and Place Story.
- Mobile-safe composition and approved hotspot.
- Natural light without recreated weather or misleading enhancement.

The current Morning House image may fill this role for development review only. It does not verify
capture time, is not production approved, and must be replaced before launch unless it later
completes the full approval workflow.

### Future Sanity fields

The existing `homePage.morningNarrative` object remains suitable:

```text
morningNarrative
├── eyebrow
├── heading
├── body
├── image — editorialImage
└── caption — optional
```

The body and image should be treated as one approval unit. If the photograph is temporary, its
metadata and credit must state that clearly.

### Related principles

- Morning atmosphere.
- Connected to nature.
- Peaceful.
- Photography tells the story.
- Never invent memories.

---

## 5. From Here, Southern Negros

### Emotional purpose

Open the Home page outward. Joshua's Point should feel like a quiet starting point for discovering
Southern Negros slowly and independently, not a property isolated from its region.

### Core message

The wider Joshua's Point platform helps people understand destinations, dive sites, roads,
communities, food, weather, and practical travel through trusted editorial guidance. The Home page
should invite exploration without becoming an activity catalogue.

### Approved facts and principles

- Joshua's Point aims to become a trusted guide to Southern Negros.
- The editorial mission is to help people travel slowly, responsibly, and confidently.
- Destination, Dive Site, Experiences, Journal, and Guide systems already exist in the platform
  architecture.
- Destination content should help people discover places slowly rather than consume attractions.
- Nature, communities, and local knowledge should be treated with care.
- The owner-approved regional progression is Nature, then islands, diving, waterfalls, mountains,
  and broader regional discoveries.

These are approved platform principles. They do not establish factual travel claims about any
specific destination or activity.

### Content boundaries

- Do not list unverified destinations, travel times, routes, fees, conditions, operators, or
  activities.
- Do not create a feature grid or catalogue.
- Do not describe a place as nearby without verified travel context.
- Do not duplicate destination or dive-site facts on Home.
- Do not promise that Joshua's Point is the ideal base for every trip.
- Do not imply partnerships, access, transportation, or guided services that are not confirmed.

### Missing owner information

- Why regional discovery belongs in the Home page's first narrative.
- The owner's public-safe connection to exploring Southern Negros.
- Which published nature-led content is sufficiently verified to introduce first.
- Whether the final onward path should lead to Destinations or the broader Guide after the
  nature-led introduction.

### Photography role

**Role:** Surroundings / Southern Negros introduction.

Required characteristics:

- One real Joshua's Point or Southern Negros photograph with verified location and rights.
- A sense of place rather than a recognizable attraction used as promotion.
- Visually distinct from the house, pool, and deck sequence.
- No invented location, borrowed stock image, or unidentified scenic view.
- If no suitable existing photograph is available, keep the role marked missing.

The current repository House photography does not provide verified regional or experience coverage
for this role. No development candidate is assigned in Phase 2.

### Future Sanity fields

This section is not present in the current `homePage` schema. If approved, use a named editorial
object and references to existing content rather than duplicated facts:

```text
southernNegrosIntroduction
├── eyebrow
├── heading
├── body
├── image — editorialImage
├── caption — optional
├── featuredDestinations[] — optional references
├── featuredExperiences[] — optional references
├── featuredDiveSites[] — optional references
└── primaryLink — optional
```

Reference limits and presentation must be designed before schema work. Empty relationship groups
should render nothing. The section must not become a card grid merely because references exist.

### Related principles

- Discover places slowly.
- Write for people first.
- Practical usefulness without brochure language.
- Natural internal linking.
- Joshua's Point as a guide to Southern Negros.

---

## 6. Closing Reflection

### Emotional purpose

Leave one quiet thought before the global footer. The ending should return to home, nature, shared
time, or the changing day without introducing urgency.

### Core message

Joshua's Point holds space for being together, being quiet, and staying connected to the landscape.
Final wording must come from approved source and should not ask for a booking.

### Approved facts and principles

- Joshua's Point is a home shared with care.
- The protected feelings are Homy, Connected to nature, and Peaceful.
- The deck and connected shared spaces support time together and quieter activity.
- Morning, rain, wind, bamboo, birds, and evening are approved observed territory with wording
  limits.
- The website should leave visitors calmer than before.
- A distinct Closing Reflection is owner-approved as an invitation into the Joshua's Point world.

### Content boundaries

- No booking call to action.
- No promise about transformation, memory, belonging, or how every guest will feel.
- No private family memory or origin story.
- No summary of features or routes.
- No new factual claim introduced at the end of the page.

### Missing owner information

- One public-safe closing observation appropriate for Home rather than The House.
- The one public-safe observation that can join home, nature, and regional discovery without
  repeating The House closing.

### Photography role

No photograph is required. Whitespace and the global Footer may provide enough closure. If a future
image is proposed, it needs a distinct editorial purpose rather than functioning as decoration.

### Future Sanity fields

The approved distinct section should remain minimal:

```text
closingReflection
└── body
```

Do not add a link or button by default. This field is not present in the current Home singleton and
should be considered as a named field during Phase 5.

### Related principles

- Homy.
- Connected to nature.
- Peaceful.
- Simplicity is strength.
- Guests should feel welcomed, never sold to.

---

## Cross-page content ownership

Home must introduce, not duplicate. Use the following ownership boundaries:

| Subject                    | Home role                             | Authoritative deeper page                                |
| -------------------------- | ------------------------------------- | -------------------------------------------------------- |
| Emotional arrival          | One concise introduction              | The House may hold the longer home-and-landscape story   |
| Architecture               | One verified relationship             | `/the-house`                                             |
| Rooms and capacity         | Natural onward link only              | `/rooms` and `/plan-your-stay`                           |
| Regional discovery         | One editorial opening                 | `/destinations`, `/experiences`, `/dive-sites`, `/guide` |
| Travel logistics           | Do not summarize unless necessary     | `/getting-here`                                          |
| Policies and booking facts | Do not place in narrative sections    | `/plan-your-stay`, `/faq`, `/contact`                    |
| Owner memories             | Only explicitly public-safe fragments | Internal source documents until approved                 |

This separation keeps the Home page calm and prevents it from becoming a compressed sitemap.

---

## Content readiness matrix

| Section            | Emotional purpose ready | Approved source available             | Owner input still required | Photography status                        | Existing Sanity field |
| ------------------ | ----------------------- | ------------------------------------- | -------------------------- | ----------------------------------------- | --------------------- |
| Editorial Hero     | Yes                     | Owner direction + partial facts       | Yes                        | Development candidate only                | Yes                   |
| The Place          | Yes                     | Partial                               | Yes                        | Missing final role; no approved candidate | Yes                   |
| Shared Life        | Yes                     | Owner direction + partial facts       | Yes                        | Development candidate only                | No                    |
| Morning Narrative  | Yes                     | Owner observation + partial facts     | Yes                        | Development placeholder only              | Yes                   |
| Southern Negros    | Yes                     | Owner direction + platform principles | Yes                        | Missing                                   | No                    |
| Closing Reflection | Yes                     | Owner direction + principles          | Yes                        | Not required                              | No                    |

No section is ready for final public copy. The owner has approved Home as an invitation into both
Joshua's Point and its surrounding Southern Negros world, with Joshua's Point remaining the
emotional center. Shared Life and Southern Negros are therefore part of the approved content
architecture. Closing Reflection is also approved as a distinct invitation into the wider
Joshua's Point world.

---

## Proposed Home presentation contract

This is a planning shape only. Do not implement it before structure approval.

```text
HomePageData
├── hero
├── placeStory
├── sharedLife
├── morningNarrative
├── southernNegrosIntroduction
└── closingReflection
```

Presentation types should remain independent from Sanity response types. A future mapper should
exclude workflow fields, private source notes, and Studio-only verification content.

---

## Decisions carried into later phases

1. **Hero interaction — Phase 6:** Decide whether the Joshua's Point-first Hero needs one action leading to
   The House, an in-page continuation, or no visible action. `/the-story` cannot remain because the
   route does not exist.
2. **Development photography roles — Phase 4:** Select the closest existing House photographs for Home Hero,
   The Place, Shared Life, and Morning visual testing. The owner has approved development use in
   principle; role selection still requires a recorded Phase 4 decision.
3. **Regional development photography — Phase 4:** Confirm whether any existing Joshua's Point photograph can
   truthfully represent surroundings. If none can, keep the Southern Negros image role missing.

These items do not prevent Phase 4 from starting. They must be resolved within their assigned phase
before CMS publication or frontend completion.
