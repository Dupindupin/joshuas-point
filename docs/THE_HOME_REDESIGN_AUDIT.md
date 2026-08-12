# Joshua's Point — Home Redesign Audit

**Document type:** Internal editorial and implementation audit
**Route reviewed:** `/`
**Review date:** 2026-08-09
**Status:** Planning only; no frontend or Sanity changes
**Public website copy:** No

## Purpose

This audit evaluates the current Home page before editorial refinement. It compares the implemented
page with the Joshua's Point principles of **Homy**, **Connected to nature**, and **Peaceful**. It
does not approve current placeholder copy or photography for publication.

The review uses the current route and components together with `project-rules.md`,
`JOSHUA_POINT_HOUSE_SOUL.md`, the House verification record, and the approved Sanity content
architecture. Owner-confirmed information remains source material rather than finished Home page
copy. Private family history and the private meaning of the Joshua name remain excluded.

---

## 1. Current structure

### Route composition

The Home page is a Server Component composed directly in `web/src/app/page.tsx`:

1. `SiteHeader`
2. `Hero`
3. `StorySection`
4. `ImageNarrativeSection`
5. `SiteFooter`, supplied globally by the root layout

All page content is currently passed as literal props from the route. The Home page does not use a
typed presentation model, a Sanity query, or a mapper.

### Section and component review

| Sequence | Section           | Current component       | Current editorial role                                                            | Current media state                                        |
| -------- | ----------------- | ----------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| 1        | Header            | `SiteHeader`            | Transparent navigation over the opening image area                                | No Home-specific media                                     |
| 2        | Hero              | `Hero`                  | Full-viewport arrival with location eyebrow, heading, introduction, and two links | Abstract architectural gradient; no photograph supplied    |
| 3        | Place Story       | `StorySection`          | First explanation of the relationship between house and place                     | Quiet landscape placeholder; no photograph supplied        |
| 4        | Morning Narrative | `ImageNarrativeSection` | Image-first pause followed by an asymmetrical editorial text composition          | Full-width atmospheric placeholder; no photograph supplied |
| 5        | Footer            | `SiteFooter`            | Global editorial closing and onward navigation                                    | No image                                                   |

### Content flow

The current narrative moves from:

```text
Arrival statement
→ architectural explanation
→ morning/landscape reflection
→ global footer
```

This is coherent at a high level, but all three sections describe similar territory: horizon,
light, landscape, and slowing down. The page does not yet progress from first impression into a
specific lived experience, a clear sense of home, or Joshua's Point as a starting place for
Southern Negros.

The primary Hero link leads to `/the-house`. The secondary link leads to `/the-story`, but that
route does not exist. Until a real destination and approved story are available, the second link is
an unresolved element rather than useful navigation.

### Visual rhythm

- The Hero fills at least one viewport and holds content low in the frame, creating an unhurried
  arrival.
- The first story changes to a contained 12-column composition with text on the left and landscape
  media on the right.
- The image narrative deliberately avoids repeating that composition: media spans the viewport,
  followed by text below in an asymmetrical grid.
- Vertical spacing is generous throughout. The page has clear pauses rather than stacked content
  blocks.
- Newsreader and Manrope, restrained line lengths, muted colors, and low-contrast captions support
  the approved editorial identity.
- Because every media area is an abstract gradient, the three large visual pauses currently feel
  like designed surfaces rather than encounters with a real place.
- The final narrative ends after another broad landscape statement. The transition into the footer
  is calm but does not yet provide a distinct closing thought.

The rhythm is structurally sound. Its main weakness is not spacing or composition; it is the lack
of differentiated, truthful material within that composition.

---

## 2. Emotional review

### Homy

**Current result: weak.**

The page speaks almost entirely about architecture and landscape. It does not yet show or describe
ordinary shared life, a human-scale detail, a recognizable daily moment, or what makes the house
feel cared for and lived in. The two Hero links also move quickly toward navigation before the page
has established a sense of welcome.

The current structure can support a homy feeling, especially through the Place Story, but that
feeling must come from approved observations rather than a generic promise that time slows down.
Human presence is not required; honest traces of use, warmth, shelter, and shared space may be more
appropriate.

### Connected to nature

**Current result: structurally strong, editorially provisional.**

Nature receives large visual areas, and the copy consistently places landscape ahead of status or
amenities. The Hero, Place Story, and Morning Narrative all point toward light, weather, sea, and
horizon.

However, no real landscape is visible. Several statements are also broader than the approved
evidence, including claims about every space, uninterrupted views, and the house following a ridge.
Connection to nature should be established through verified viewpoints, actual weather, real
morning conditions, and selected photography—not repeated abstract language.

### Peaceful

**Current result: visually strong, experientially thin.**

The generous whitespace, limited section count, calm typography, and absence of promotional modules
make the page feel quiet. There are no counters, feature grids, testimonials, booking widgets, or
animations competing for attention.

The writing is less convincing because it tells the reader that the place is quiet or slow without
yet giving enough observed evidence. Owner-confirmed sounds—birds, wind, bamboo, and rain—and the
quiet corner of the deck offer stronger future source material when used carefully and without
promising silence.

### Overall emotional assessment

The Home page is currently **Peaceful first**, **Connected to nature in intention**, and only
minimally **Homy**. The refinement should preserve its silence while introducing a small number of
precise, owner-approved observations. More copy is not the objective; more truth is.

---

## 3. Strengths to preserve

### Editorial restraint

- Only three principal Home sections are present.
- The page avoids commercial accommodation patterns.
- There are no prices, availability panels, testimonials, statistics, awards, or feature grids.
- The morning narrative allows photography to dominate before asking the visitor to read.

### Distinct section compositions

- The Hero, two-column Place Story, and full-width image narrative each have a different rhythm.
- The page does not repeat cards or balanced marketing blocks.
- The image narrative provides an effective large-scale pause after the more contained story.

### Typography and atmosphere

- Newsreader carries headings while Manrope supports body and interface text.
- Text measures are restrained and readable.
- The warm linen, charcoal, forest, and evening tones align with the established Design System.
- The transparent Header sits naturally over the Hero without requiring a separate navigation band.

### Technical foundations

- Components are typed and reusable.
- All three Home sections are Server Components.
- Media APIs already support `next/image`, meaningful alternative text, responsive `sizes`, and
  full-bleed presentation.
- Semantic sections, heading relationships, figures, and captions are already present.
- The existing `homePage` Sanity singleton mirrors the current three-section sequence rather than
  introducing a generic page builder.

These strengths allow the next phase to focus on source material and photography rather than a
wholesale visual redesign.

---

## 4. Problems

### Generic or unsupported copy

| Current wording or idea                                                | Audit finding                                                                                             | Required response                                              |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| The house “follows the ridge”                                          | The ridge or landform description is unverified in the House verification record.                         | Verify from site records or remove.                            |
| “A house that opens to the horizon”                                    | Calm and directionally appropriate, but still a broad architectural statement.                            | Test against the real openings and selected Hero image.        |
| “Built to slow the day”                                                | Reads as a designed hospitality promise without a specific owner observation.                             | Replace only after identifying a truthful lived moment.        |
| “Designed around light, changing weather…”                             | May imply formal design intent not yet approved by the architect.                                         | Attribute and verify, or describe observed conditions instead. |
| “Every space opens toward the horizon”                                 | Universal architectural claim; current records explicitly warn against “every room” statements.           | Remove unless a room-by-room review verifies it.               |
| “Large openings, warm timber…”                                         | Combines a visual generalization with material terminology that needs application-level verification.     | Use only verified elements visible in the selected image.      |
| “Uninterrupted views”                                                  | Not verified across the house or in a selected Home image.                                                | Reserve for an asset-specific verified view, if accurate.      |
| “The first light reaches the deck before the rest of the valley wakes” | Capture time, sunrise relationship, and “valley” landform are unverified.                                 | Remove; commission and verify a real morning observation.      |
| “Negros Oriental · Philippines”                                        | Plausible location context, but public location precision should follow the owner-approved privacy level. | Confirm the preferred public location label.                   |

### Weak or overlapping sections

- Place Story and Morning Narrative currently repeat the same ideas—light, openings, landscape,
  and slow time—without advancing the story.
- The Place Story does not yet answer what makes Joshua's Point different through a real detail.
- The Morning Narrative is named for a particular time of day but has neither a verified morning
  photograph nor an approved Home-specific morning account.
- The Home page does not yet decide whether its final job is to introduce the house only or also to
  establish Joshua's Point as the editorial gateway to Southern Negros.
- The transition to the footer lacks a distinct final observation, although adding a new section is
  not automatically necessary; the existing final narrative may be able to carry that responsibility.

### Missing storytelling

- No owner voice or public-safe memory is present.
- Arrival is asserted visually but not grounded in the real approach or first moment.
- The relationship between shared life and landscape is absent.
- Weather appears as a concept rather than an observed condition.
- Southern Negros appears only through a broad location label; the wider place, communities, and
  independent exploration are not yet part of the Home narrative.
- The page does not yet connect the emotional arrival to the established House, Destination, Dive,
  Experiences, or Guide systems.

### Unnecessary or unresolved elements

- The `/the-story` Hero link is broken because no corresponding route exists.
- Two Hero actions may be more than the opening needs unless each leads to a real, approved next
  step.
- Captions currently describe photographs that do not exist on the page. They should not render as
  factual context until an actual asset is selected and verified.
- Repeating broad claims about quiet, light, and landscape adds volume without adding meaning.

### Metadata concern

The global metadata describes Joshua's Point as a “private architectural retreat.” This may not
match the approved editorial language, and “retreat” risks generic hospitality positioning. Home
metadata should be included in the editorial review and later mapped from the singleton SEO fields.

---

## 5. Photography review

### Current Home photography

No real photograph is currently connected to the Home page.

| Home role         | Current presentation                      | Status                                |
| ----------------- | ----------------------------------------- | ------------------------------------- |
| Hero              | Dark architectural gradient with overlays | Photography missing                   |
| Place Story       | Light landscape-toned gradient            | Photography missing                   |
| Morning Narrative | Full-width atmospheric gradient           | Dedicated morning photography missing |

The repository contains House development photography, but those assets are assigned to the House
workflow, are not production approved, and are not currently mapped to the Home page. Reusing one
for temporary Home visual testing would require a separate role decision and must not turn it into
approved Home photography.

### Required Home image roles

#### 1. Home Hero

- A wide, landscape-led arrival image in which the house participates without dominating.
- Sufficient calm negative space for accessible text on desktop and mobile crops.
- A verified ordinary view of the land–house relationship.
- Natural light and restrained editing.
- A composition that does not rely on exaggerated scale, enhanced skies, or an isolated pool view.

#### 2. Place Story

- One landscape image showing a specific relationship that makes Joshua's Point distinct.
- Prefer a human-height view of house, deck, threshold, shared space, or landscape in real use.
- The image should contribute a different observation from the Hero.
- Human presence is optional and requires explicit consent; evidence of lived use may be sufficient.

#### 3. Morning Narrative

- One genuinely recorded morning photograph made at Joshua's Point.
- Capture time, viewpoint, light direction, visible geography, and weather recorded for editorial
  verification.
- Enough visual depth to sustain the current full-width scale.
- The image should not be a generic bright exterior relabelled as morning.

### Photography still missing

- Production-resolution Home Hero.
- Production-resolution Place Story image.
- Dedicated, verified Morning image.
- Distinct mobile-safe crops or approved hotspots for all three roles.
- Asset-specific alternative text and captions.
- Photographer/source credit, rights confirmation, edit history, and launch approval.
- Viewpoint and landmark matching wherever Bohol Sea, Apo Island, Siquijor Island, or Mount Talinis
  may be named.

### Photography principles for selection

- Nature remains the subject; architecture frames it.
- The three images must not repeat the same pool-and-horizon composition.
- Sequence should move from arrival, to a closer lived relationship, to a sustained atmospheric
  pause.
- Development images must remain labelled as temporary and replaceable.
- Do not write captions before the selected photographs exist and their visible facts are verified.

---

## 6. Content requirements

### Approved source already available

The existing House records provide useful Home source material, subject to final editorial and
asset-specific verification:

- The protected feelings are Homy, Connected to nature, and Peaceful.
- Nature is the hero and architecture frames the landscape.
- The Bohol Sea, Apo Island, Siquijor Island, and Mount Talinis are owner-confirmed as visible.
- The deck, view, and infinity pool are owner-confirmed as first-noticed elements on arrival.
- The covered deck supports dining, sitting, yoga, and different activities.
- Morning is associated with mountain or sea views, birds, and connection to nature.
- Evening is experienced across the deck, dining table, pool, and living room.
- Wind, bamboo when windy, and rain during rainfall are confirmed natural sounds.
- A corner of the deck is identified as a quiet place without guaranteeing silence.

This material must not simply be copied from the House page. Home needs a shorter and broader role,
with each observation used once where it contributes most.

### Owner memories needed

- A public-safe first-arrival observation suitable for the Home opening.
- What “Homy” means in one visible or sensory everyday detail.
- One ordinary shared moment that can be described without exposing family or guests.
- A real morning observation specific enough to support the Morning Narrative.
- A short closing observation that can lead naturally into the wider Joshua's Point world.
- Clear boundaries around memories that must remain private.

### Facts requiring confirmation

- Preferred public location label and acceptable geographic precision.
- Whether “ridge,” “valley,” “horizon,” or similar landform language is factually accurate.
- Which rooms or openings genuinely support any architectural statement used on Home.
- Preferred public architectural attribution if design intent appears.
- Asset-specific visible landmarks, camera positions, light, weather, and time of day.
- Final terminology for any material named in public copy.
- Rights, credits, consent, and privacy status for every selected photograph.

### Experiences to document

- What arrival actually feels like from approach to first threshold.
- Where people naturally pause after arriving.
- How the shared rooms and deck are used without turning one private routine into a guest promise.
- How morning, wind, rain, and evening alter the atmosphere.
- How staying at the house connects naturally to slower exploration of Southern Negros.

### Geography to verify for Home use

- Which of the confirmed sea, island, and mountain names are useful in the short Home narrative.
- Which landmarks are genuinely visible in each selected image.
- Whether directions or bearings add value or should remain internal verification data.
- Whether any image metadata or wording reveals more precise location information than approved.

### Activities requiring owner source

- Activities that genuinely occur at the house and are appropriate for the Home page.
- Whether swimming, yoga, cooking, shared meals, coffee on the deck, reading, or quiet time are
  representative rather than occasional or private.
- Which regional activities belong on Home and which should remain within Experiences,
  Destinations, Dive Sites, or the Guide.
- Any access, season, skill, safety, or operator facts needed before an activity is mentioned.

### Editorial decisions needed

- Define the single job of the Home page: introduce the house, introduce Joshua's Point as a base
  for Southern Negros, or establish a carefully ordered relationship between both.
- Decide whether the existing three-section structure can carry that job. Do not add sections merely
  to list platform features.
- Decide the one useful destination for each Hero link; remove any link without a real route or
  editorial purpose.
- Assign every approved fact or memory to one page so Home does not duplicate The House.

---

## 7. Sanity readiness

### Singleton recommendation

Home should use a singleton, and the repository already defines the appropriate `homePage`
singleton with fixed ID `homePage` and route `/`.

The current schema contains:

- `hero`
- `placeStory`
- `morningNarrative`
- `seo`
- `workflowStatus`
- `lastReviewedAt`

This matches the implemented three-section sequence and should remain the starting point. A second
singleton or generic `sections[]` page builder is not recommended.

### Current readiness strengths

- Each section has a named editorial purpose.
- Images use the shared `editorialImage` object.
- Hero links use the shared link model.
- SEO and workflow fields already exist.
- The fixed sequence prevents accidental conversion into a promotional page builder.

### Current readiness gaps

- The frontend has no Home query, TypeScript response contract, mapper, or CMS-aware data-loading
  boundary.
- Route content is embedded directly in JSX rather than held in a stable `HomePageData`
  presentation contract.
- Root metadata is static and not mapped from `homePage.seo`.
- The current schema requires all three sections and their images. This is appropriate for
  publication, but draft content should not be published until all required photography and text
  are complete.
- Home preview and governance should eventually follow the established editorial workflow patterns,
  including useful status, review date, and photography visibility.
- No Home-specific asset-selection, verification, or content-entry guide exists yet.

### Recommended fields

The existing named fields are sufficient for the current approved layout:

```text
homePage
├── hero
│   ├── eyebrow
│   ├── heading
│   ├── introduction
│   ├── image
│   ├── primaryLink — optional
│   └── secondaryLink — optional
├── placeStory
│   ├── eyebrow
│   ├── heading
│   ├── body
│   ├── image
│   └── caption
├── morningNarrative
│   ├── eyebrow
│   ├── heading
│   ├── body
│   ├── image
│   └── caption — optional
├── seo
├── workflowStatus
└── lastReviewedAt
```

Do not add more section fields until the Home content job and owner source demonstrate a real need.
If the wider Southern Negros platform must appear on Home, first approve its exact editorial role
and composition, then extend the singleton with a named object rather than a generic block.

### Migration approach

1. Keep the current components visually unchanged during content preparation.
2. Define a local typed `HomePageData` presentation contract matching the current component APIs.
3. Create one centralized GROQ query and explicit Sanity response types.
4. Map Sanity fields into `HomePageData`; exclude Studio-only workflow or verification data from
   public presentation.
5. Keep a static development fallback only when no published `homePage` exists. Once a published
   document exists, treat CMS content as authoritative and omit optional content rather than mixing
   it with static copy.
6. Map approved SEO fields into route metadata without changing the visual sections.
7. Populate and review the singleton as a draft, including image rights and factual checks.
8. Publish only when the mapper can produce a complete page and all required links resolve.
9. Use a Home-specific cache tag and publication-driven revalidation strategy consistent with the
   existing Sanity integration.

---

## 8. Recommended implementation phases

### Phase 1 — Editorial source and boundaries

- Confirm the Home page's single editorial job.
- Gather the missing owner observations listed in this audit.
- Separate Home material from House material to avoid duplication.
- Record private boundaries before drafting.
- Verify or remove the current ridge, valley, universal-opening, uninterrupted-view, and first-light
  claims.

**Outcome:** an approved Home content map containing facts and source notes, not final copy.

### Phase 2 — Photography brief and selection

- Create a Home-specific photography brief for Hero, Place Story, and Morning Narrative.
- Audit existing photography only as development candidates.
- Commission or select the three distinct roles.
- Record rights, credits, consent, capture context, landmarks, crops, and alt-text considerations.
- Keep placeholders clearly separated from launch-approved assets.

**Outcome:** a working selection board and explicit missing-image list.

### Phase 3 — Editorial drafting

- Draft each section from approved owner source only.
- Keep the Hero concise and let photography lead.
- Give Place Story one specific answer to what makes Joshua's Point different.
- Give Morning Narrative one verified moment rather than a generalized mood.
- Resolve or remove the secondary Hero link.
- Review metadata alongside visible copy.

**Outcome:** owner-reviewed draft content ready for structured entry.

### Phase 4 — Sanity content readiness

- Review the existing singleton against the approved content map.
- Change the schema only if a named, approved editorial need cannot be represented.
- Prepare a Home content-entry guide and publication checklist.
- Populate `drafts.homePage` with approved copy and temporary development photography where
  explicitly authorized.
- Keep `workflowStatus` aligned with the editorial review stage.

**Outcome:** a complete, unpublished Home singleton that passes schema validation.

### Phase 5 — Frontend integration

- Introduce the stable `HomePageData` contract.
- Add the typed query and mapper without scattering GROQ.
- Connect the route while preserving the current visual composition.
- Handle missing unpublished data safely and keep published CMS content authoritative.
- Add CMS-driven metadata and cache tagging.

**Outcome:** the current Home design rendered from Sanity without layout redesign.

### Phase 6 — Visual and editorial refinement

- Review desktop, tablet, and mobile crops with real photography.
- Check text contrast against each Hero crop.
- Evaluate image repetition, section silence, caption quietness, and footer transition.
- Confirm the page feels Homy, Connected to nature, and Peaceful without adding more modules.
- Validate all links, alt text, captions, focus states, performance, and responsive behavior.

**Outcome:** an owner-approved Home page ready for publication review.

### Phase 7 — Publication gate

- Confirm all public facts, owner approvals, image rights, credits, privacy decisions, and SEO.
- Confirm no private origin story or family information is present.
- Confirm every required Sanity field maps successfully.
- Run TypeScript, ESLint, production build, schema validation, and visual QA.
- Publish only after the fallback-to-CMS transition cannot break `/`.

**Outcome:** a controlled Home migration with a clear replacement plan for any development asset.

---

## Audit conclusion

The Home page does not need a visual reinvention. Its full-viewport arrival, restrained section
count, generous spacing, and image-first compositions already support Joshua's Point. What it lacks
is the same editorial discipline now established for The House: approved owner source, distinct
photographic roles, verified claims, and a controlled CMS migration.

The next step should be editorial source gathering and a Home photography brief—not frontend
implementation. The aim is to make the existing structure feel less like an architectural
hospitality template and more like a truthful introduction to one particular home and landscape.
