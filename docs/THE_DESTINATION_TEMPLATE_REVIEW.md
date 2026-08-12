# Joshua's Point — Destination Template Review

## Status and purpose

This document reviews the unpublished Casaroro Falls Sanity draft as the first destination
migration example and defines the editorial standard for future Joshua's Point destinations.

It does not approve or publish Casaroro Falls. It does not change the frontend, schema, query
layer, or CMS document.

Reference material:

- `drafts.destination-casaroro-falls`, reviewed read-only on 9 August 2026
- [`THE_CASARORO_FALLS_OWNER_SOURCE_RECORD.md`](./THE_CASARORO_FALLS_OWNER_SOURCE_RECORD.md)
- [`THE_CASARORO_FALLS_MIGRATION_PLAN.md`](./THE_CASARORO_FALLS_MIGRATION_PLAN.md)
- [`THE_EXISTING_DESTINATION_CONTENT_INVENTORY.md`](./THE_EXISTING_DESTINATION_CONTENT_INVENTORY.md)
- [`EDITORIAL_CONTENT_SYSTEM.md`](./EDITORIAL_CONTENT_SYSTEM.md)
- current `destination` schema and `/destinations/[slug]` implementation

## Executive assessment

Casaroro Falls establishes a strong migration pattern:

```text
existing Joshua's Point source
→ owner source record
→ observations separated from facts
→ editorial-only, no-index draft
→ factual and photography verification
→ publication review
```

Its draft is editorially useful but intentionally incomplete. It contains a place identity,
owner-derived introduction, experience narrative, Joshua's Point recommendation, selected
observations, and restrained SEO. It omits photography, travel facts, map data, difficulty, fees,
hours, road guidance, and review date because they are not yet verified.

That incompleteness is correct at draft stage. The template must allow editorial work to begin
without rewarding invented facts, while keeping firm publication gates for practical usefulness.

The Casaroro-specific **Descent → Gorge → Return** sequence is a reference for how a real journey
can organize a story. It is not a universal formula or a set of section titles for every future
destination.

---

## Source separation standard

Every destination migration must maintain four distinct source states.

| Source state | What belongs here | Public use |
| --- | --- | --- |
| Owner-approved observation | First-hand memory, reason for recommending, emotional meaning, specific observed detail | May support editorial draft; do not turn into a universal promise |
| Verified fact | Location, route, time, fee, hours, rules, difficulty, access, current condition, rights | May support public practical content when source and review date are recorded |
| Needs verification | Existing website claim or owner recollection involving numbers, access, safety, suitability, or changing conditions | Keep out of public factual fields |
| Not approved | Private information, unsupported marketing, unlicensed media, generic filler, invented scene | Do not migrate |

### Casaroro example

- **Observation:** Tobias remembers the walk, canyon, jungle, waterfall, quiet, return, and his
  own happiness at the end.
- **Editorial direction:** Nature, adventure, discovery, and the journey should lead.
- **Not yet a verified fact:** step count, walking time, slipperiness, fitness requirement,
  difficulty, access, transport, or safety.
- **Not a public promise:** that every guest will be impressed or happy.

The template must never flatten those categories into one body of “destination information.”

---

## Required destination sections

“Required” means required for a launch-ready published destination. During research and drafting,
fields may remain absent rather than receive placeholders or guesses.

## 1. Hero

### Purpose

Identify the place and establish its editorial character immediately. The Hero should tell the
reader where attention belongs, not sell an activity.

### Required content

- Public destination title.
- Stable slug.
- One fundamental destination type.
- Concise editorial excerpt.
- One rights-cleared Hero photograph with responsive crop, meaningful alt text, and required
  credit.

### Casaroro reference

- `title`: Casaroro Falls.
- Editorial direction: “A hidden place to discover.”
- The current excerpt translates that direction into nature, adventure, quiet, and journey.
- Hero photography remains missing, so the draft is not publication-ready.

### Standard rules

- Owner wording may supply the emotional direction without becoming final display copy verbatim.
- Do not add “hidden,” “must-see,” or another promotional phrase unless its meaning has been
  reviewed against access, accuracy, and the editorial voice.
- Do not place distance, time, price, difficulty, or “nearby” claims in the Hero.
- Development photography must be marked internally as development-only, not production approved,
  and replace before launch. Those workflow labels should not become public captions.

## 2. Introduction

### Purpose

Explain why this place belongs in the Joshua's Point guide and how to begin reading it.

### Required content

- A short owner- or reporter-supported introduction.
- One clear relationship among place, journey, landscape, community, or experience.
- No summary of every practical field.

### Casaroro reference

The draft introduction is based on Tobias's reason for recommending the place: landscape, walk,
adventure, and the waterfall. It correctly treats the journey as part of the destination.

### Standard rules

- Preserve the owner's meaning and specific point of view.
- Do not replace a missing observation with generic regional description.
- Avoid opening with rankings, list language, broad audience labels, or keyword repetition.
- An introduction should remain useful after prices, road conditions, and opening information
  change.

## 3. Experience and story

### Purpose

Help a reader understand what gives the place its character through real scenes and observations.
This is the editorial center of a destination page.

### Required content

- At least one meaningful narrative sequence supported by first-hand or clearly attributed source
  material.
- A concise Joshua's Point reason for making time for the place.
- A small set of truthful “What to Expect” observations when supported.

### Casaroro reference

The draft uses:

1. **The Descent** — attention moves into the landscape.
2. **Through the Gorge** — canyon, nature, discovery, and movement matter before arrival.
3. **The Return** — the climb back completes Tobias's remembered journey.

This works because the sequence comes from the owner's experience. The exact step count and
walking time were excluded because memory is not sufficient verification for those facts.

### Standard rules

- Build the story from the source material available for that particular place.
- Possible structures include arrival → encounter → reflection, coast → water → return, market →
  meal → conversation, or one sustained scene. Do not force Descent → Gorge → Return where it does
  not belong.
- Attribute personal reactions to their source or translate them into an invitation, never a
  guaranteed guest feeling.
- Do not use fictional transitions, invented dialogue, generic sensory detail, or listicle
  framing.
- Keep practical numbers and changing operations out of narrative paragraphs when structured
  fields can hold them.
- The required `whyVisit` field should represent a genuine Joshua's Point recommendation, not a
  slogan or sales call to action.

## 4. Practical information

### Purpose

Reduce uncertainty so a guest can judge and plan a visit responsibly.

### Required content before publication

- Reviewed travel-time estimate from the correct Joshua's Point origin.
- Genuinely suitable transport modes.
- Overall visitor difficulty using the shared controlled vocabulary.
- Qualified best-time guidance.
- Last-reviewed date.

### Optional practical content

- Current fee details.
- Opening or managed-access information.
- Things to bring.
- Concise tips.
- Scooter guidance when a current route review supports it.

### Casaroro reference

All practical fields remain empty. This is correct: the owner remembers steps, a walking time,
slipperiness, and footwear needs, but the project has not verified them as current public facts.

### Standard rules

- Every practical claim needs a suitable source and review date.
- Do not copy distances, times, prices, hours, conditions, safety, or suitability from a legacy
  page without review.
- Do not use placeholders such as “contact us,” “check locally,” or “approximately” to disguise an
  unverified claim.
- If a required practical field is unknown, the document remains a draft.
- Separate travel difficulty, route difficulty, and the physical experience; one vague label must
  not pretend to describe all three.
- Never promise safety, weather, wildlife, water conditions, road access, availability, or a
  visitor outcome.

## 5. Location and map

### Purpose

Provide accurate, accessible orientation independent of a future map provider.

### Required content before publication

- Verified provider-neutral coordinates.
- Human-readable location label.
- Decision on safe public precision.
- `interactiveMapEnabled` decision.

### Optional content

- Verified external directions URL.
- Interactive map enhancement after a provider is configured.

### Casaroro reference

`interactiveMapEnabled` remains false and `mapLocation` is empty. This prevents an unverified point
from appearing merely to complete the page.

### Standard rules

- Coordinates are facts, not editorial estimates.
- Use a safe public meeting or arrival point when exact location could expose private land,
  sensitive ecology, or unsafe access.
- Accessible text orientation must remain available even when a map provider is added.
- Route narratives and map routes belong to route content, not duplicated destination coordinates.

## 6. Photography

### Purpose

Show the actual place, its context, and the nature of the experience without manufacturing scale,
seclusion, drama, or visitor behavior.

### Required content before publication

- One production-approved Hero image.
- Confirmed subject and location.
- Original or sufficient production resolution.
- Photographer or rights-holder record.
- Public credit and credit URL when required.
- Consent for identifiable people.
- Meaningful alt text, or an explicit decorative decision only when appropriate.
- Responsive crop review, including mobile and social contexts.

### Casaroro reference

Zei Steger is reported as the owner of existing Casaroro photographs, but photographer identity,
rights scope, public credit, person consent, and production approval remain unresolved. Therefore,
the Sanity draft correctly contains no image.

### Standard rules

- Public availability is not proof of ownership or reuse permission.
- Page placement is not proof of the place, subject, date, or photographer.
- Development assets may support private visual testing only when their use is authorized.
- Do not duplicate one image to simulate a gallery.
- Captions provide context; they must not introduce unverified facts.
- Photography notes should come from real light, access, etiquette, ecological, or equipment
  considerations—not generic camera advice.

## 7. SEO

### Purpose

Describe the page accurately for search and sharing without allowing keywords to dictate the
story.

### Required content before publication

- Natural page title.
- Page-specific meta description matching the content actually present.
- Indexing decision.
- Social-image decision.
- Canonical or redirect decision when replacing a legacy URL.

### Casaroro reference

The draft includes a conservative title and description based on the owner-supported journey. It
keeps `noIndex: true`, has no social image, and makes no practical promise.

### Standard rules

- Use the public place name naturally; do not create keyword variants as prose.
- Do not promise directions, times, fees, tips, maps, swimming, difficulty, or access unless those
  are present and verified on the page.
- Social text may inherit from search metadata unless a distinct editorial need exists.
- Keep no-index enabled through draft and review.
- Resolve old-site canonical and redirect behavior before launch; do not use both casually.
- Structured data, when added later, must use the same verified facts as the page.

## 8. Workflow

### Purpose

Make source quality, readiness, and review state visible without exposing internal notes publicly.

### Required internal content

- Clear internal title.
- Workflow status.
- Last-reviewed date after factual review.
- Owner source record.
- Claim-verification record.
- Photography rights/consent record.
- Editorial, factual, accessibility, SEO, and publication approval.

### Casaroro reference

The document is `workflowStatus: draft`, remains unpublished as a draft revision, and is no-index.
Its missing required fields are visible blockers rather than concealed assumptions.

### Standard rules

- `draft` means source gathering and structure may be incomplete.
- `inReview` means the intended public content exists and named reviewers are checking it.
- `approved` must not be selected until story, facts, images, accessibility, SEO, privacy, and
  relationships pass review.
- `lastReviewedAt` records a real factual review, not the date an editor opened or migrated a
  document.
- Studio-only evidence, private contacts, consent files, and raw verification notes must not enter
  public projections.
- Publishing is a separate deliberate action. Draft creation never implies permission to publish.

---

## Optional destination sections

Optional sections render only when they add verified editorial value. Empty headings, placeholder
copy, and automatic filler are not acceptable.

## 1. Gallery

Use when two or more distinct, rights-cleared images create an intentional sequence.

Include:

- ordered images with individual alt, credit, and optional caption;
- one accessible gallery label; and
- an optional collective caption when it adds context.

Do not use a gallery as an asset dump or repeat the Hero photograph. Casaroro has no eligible
gallery yet.

## 2. Related experiences

Use when a verified experience offers a meaningful way to understand or spend time around the
destination.

Rules:

- Relationships should be manually curated or transparently derived from existing references.
- Do not infer an activity from a destination type.
- Do not use the relationship to imply booking, operator availability, safety, or inclusion in a
  stay.
- The current destination schema has no registered `relatedExperiences` field. Defer this mapping
  until the Experience CMS exists rather than embedding dead links or prose lists.

## 3. Routes

Use when a field-verified scooter, driving, walking, or boat route connects the place to a larger
journey.

Rules:

- The route owns route-level time, distance, road surface, fuel, stops, weather, and safety
  context.
- The destination may reference the route but must not duplicate changing route facts.
- A legacy route title is a migration source, not proof the route is current.
- Casaroro's Waterfall Explorer relationship remains a candidate until the route is field tested
  and modeled.

## 4. Local recommendations

Use sparingly for a real, owner- or locally reviewed continuation: a nearby place, food stop,
community context, or way to spend time respectfully.

Rules:

- Name a business or service only after current verification and editorial approval.
- Do not sell placement or create a generic “nearby attractions” list.
- Explain why the relationship matters.
- Keep operational details in the referenced destination or experience where possible.
- Review volatile recommendations frequently.
- Casaroro's current candidates—Valencia, Pulangbato Falls, Twin Lakes, and the Waterfall Explorer
  route—are not yet approved relationships.

## 5. Related destinations and editorial stories

Although not listed as a separate content section in this review request, the current system can
also render related destinations, incoming dive sites, and incoming journal articles.

Use them only when a relationship is meaningful and the referenced document is publication-ready.
Relationship sections must render nothing when empty.

---

## Standard destination document blueprint

```text
Destination

Identity / Hero — required for publication
  internalTitle
  title
  slug
  destinationType
  excerpt
  heroImage

Introduction and story — required for publication
  editorialIntroduction
  story
  whyVisit
  highlights

Photography — Hero required; remainder optional
  heroImage
  gallery?
  photographyNotes?

Practical information — core object required for publication
  travelInformation
    travelTimeFromJoshuaPoint
    recommendedTransport
    difficulty
    bestTimeToVisit
    entranceFee?
    openingHours?
  scooterFriendly
  scooterGuide? — only when supported
  thingsToBring?
  tips?

Location — required for publication
  mapLocation
    coordinates
    label
    directionsUrl?
  interactiveMapEnabled

Relationships — optional
  relatedDestinations?
  relatedExperiences? — deferred until the document type exists
  routes? — deferred until route content is modeled
  incoming dive sites and journal articles — resolved by the relationship engine

SEO — required review; overrides optional where site defaults are sufficient
  metaTitle?
  metaDescription
  socialTitle?
  socialDescription?
  socialImage?
  canonicalUrl?
  noIndex

Workflow — required
  workflowStatus
  lastReviewedAt
  private supporting source, fact, and rights records outside public projections
```

---

## Draft and publication gates

### Editorial draft may begin when

- the destination identity and scope are clear;
- an owner or approved contributor has supplied a reason for inclusion;
- first-hand source material supports at least one meaningful narrative;
- observations and facts are separated; and
- no-index and draft workflow status are set.

### Factual review may begin when

- the claim ledger exists;
- a responsible reviewer is named;
- the visit/access context is current enough to assess; and
- every volatile field has a source or remains explicitly empty.

### Publication requires

- complete required editorial and practical fields;
- verified map location and safe public precision;
- production-approved Hero photography;
- image alt, credit, rights, and consent review;
- factual last-reviewed date;
- final SEO and legacy-URL decision;
- accessibility, privacy, ecological, and community review;
- optional sections either complete or absent; and
- explicit publication approval.

---

## Casaroro lessons for the next migration

### Preserve

- Begin with existing Joshua's Point content rather than blank-page writing.
- Ask Tobias for the real reason the place belongs in the guide.
- Preserve his emotional meaning while distinguishing it from a guest promise.
- Build a story from an actual sequence when one exists.
- Keep unverified facts empty even when the schema ultimately requires them.
- Keep photography out when rights or consent are unresolved.
- Prepare accurate no-index SEO early without promising missing practical guidance.

### Avoid

- Reusing Casaroro's section titles for every destination.
- Treating owner memory as measurement or current operating guidance.
- Padding incomplete practical sections with cautious-sounding guesses.
- Turning `whyVisit` into marketing copy.
- Creating galleries, routes, or relationships merely because the schema can support them.
- Publishing to see how the page looks.

### Apply to Lake Balanan

The next destination should use the same workflow, not the same story:

1. inventory existing Lake Balanan source material;
2. record Tobias's reason for recommending it and any first-hand observations;
3. identify its natural narrative structure;
4. separate every practical claim into a verification ledger;
5. review image provenance and rights;
6. create a no-index editorial draft with unknown fields absent; and
7. verify the complete publication requirements before approval.

No new destination should proceed faster by removing source discipline. It should proceed faster
because this structure makes the required decisions visible from the beginning.
