# Joshua's Point — Fast Destinations Audit

## Status and scope

This audit prepares the existing Destination System for a fast content migration. It does not
create destination copy, verify travel facts, select photography, change frontend code, or amend
Sanity schemas.

The audit reviews:

- [`DESTINATION_SYSTEM.md`](./DESTINATION_SYSTEM.md)
- [`SANITY_CONTENT_MODEL.md`](./SANITY_CONTENT_MODEL.md)
- [`EDITORIAL_CONTENT_SYSTEM.md`](./EDITORIAL_CONTENT_SYSTEM.md)
- [`CONTENT_BACKLOG.md`](./CONTENT_BACKLOG.md)
- the current Sanity schemas and Studio structure
- the published-only frontend query and relationship layers
- the `/destinations` and `/destinations/[slug]` implementations
- a read-only Sanity dataset query performed on 9 August 2026

The current repository contains unrelated work in progress. This audit does not evaluate or alter
those changes.

## Executive finding

The Destination foundation is already well beyond a model proposal. It includes:

- a `destinationsPage` singleton;
- an explicit `destination` document;
- shared editorial image, gallery, map, travel, scooter, SEO, and workflow objects;
- a published-only typed query layer;
- an editorial index route and a complete detail route;
- provider-neutral map presentation;
- incoming and outgoing relationship resolution; and
- graceful omission of absent frontend sections.

A new page system or generic page builder is not needed. The fast migration should preserve this
architecture and close a small set of contract gaps before adding content at volume.

The immediate content constraint is not page design. It is verification and photography. The only
published destination document is an incomplete Casaroro Falls seed. The other approved priorities
have no destination documents yet.

---

## 1. Current destination structure

### 1.1 Information architecture

| Route | Current responsibility | Status |
| --- | --- | --- |
| `/destinations` | CMS-controlled editorial entrance with Hero, introduction, editorial copy, and manually ordered featured destinations | Implemented |
| `/destinations/[slug]` | One long-form guide with story, photography, practical information, map, recommendation, and related content | Implemented |

The route hierarchy is correct and should remain stable. A destination has one canonical slug and
one detail page. Types, regions, and collections should not produce duplicate pages.

### 1.2 Current index flow

The published `destinationsPage` maps to:

1. Editorial Hero
2. Optional Hero photography
3. Narrow editorial introduction
4. Introductory Portable Text
5. Manually ordered featured destinations

When no valid singleton is available, the page shows a restrained editorial fallback. When a
singleton exists but has no featured destinations, the featured section disappears.

The current index does not yet provide the complete published-destination index anticipated by the
architecture document. That is acceptable while the library is very small, but it becomes an
internal-linking and discovery gap as soon as a published destination is not featured.

### 1.3 Current detail flow

The destination detail page maps the current document to:

1. Editorial Hero using destination type, title, and excerpt
2. Optional editorial introduction
3. Hero image and optional ordered gallery
4. Main story
5. Travel information, What to Expect, Things to Bring, and Field Notes
6. Provider-neutral map or map placeholder
7. Optional photography notes
8. `whyVisit` as the public **From Joshua's Point** recommendation
9. Related destinations
10. Incoming nearby dive sites
11. Incoming related journal articles

Every major optional frontend section already returns nothing when its usable data is absent. That
behavior supports a staged migration without exposing empty headings or broken placeholders.

### 1.4 Data flow

```text
Published Sanity document
  → centralized GROQ projection
  → normalized TypeScript response
  → Editorial Layout System and destination components
  → relationship query for incoming and outgoing context
```

The Sanity client explicitly uses the `published` perspective. Draft content cannot leak into the
public routes. Queries use one-hour revalidation and content-specific cache tags.

### 1.5 Current published dataset snapshot

The following is a field-presence audit, not an assessment of the accuracy or quality of the copy.

| Document | Published state | Present | Missing or incomplete |
| --- | --- | --- | --- |
| Destinations Page | Published; workflow `approved` | Singleton, editorial content, one featured reference, SEO description | Hero image and last-reviewed date are absent; the latter is optional in the current schema |
| Casaroro Falls | Published; workflow `inReview` | Title, slug, Waterfall type, editorial introduction, three story blocks, `whyVisit`, two highlights, one photography-notes block | Hero image, gallery, travel information, verified map, last-reviewed date, page SEO description, social image, practical lists, and related destinations |
| Lake Balanan | No destination document returned | None in CMS | Complete destination reporting, verification, photography, and entry |
| Danjugan Island | No destination document returned | None in CMS | Complete destination reporting, verification, photography, and entry |

Casaroro Falls being technically published does not make it launch-ready. Its workflow state and
missing required factual fields should be treated as a migration warning. Do not fill those fields
from assumptions merely to satisfy validation.

### 1.6 Boundary for Southern Negros dive coverage

The existing architecture distinguishes a geographic destination from an individual dive site:

- A town, island, coast, or other verified place may be a `destination` when the page is about the
  wider place.
- A named dive site belongs in `diveSite` and `/dive-sites/[slug]`.
- A dive site may reference nearby destinations; a destination can surface that relationship as an
  incoming reference.

“Southern Negros dive destinations” therefore requires an editorial scope decision before entry.
Do not create generic destination records that duplicate individual dive-site guides, and do not
name dive sites until a qualified local reviewer confirms them.

---

## 2. Existing destination schema

### 2.1 `destinationsPage` singleton

| Field | Current rule | Assessment |
| --- | --- | --- |
| `internalTitle` | Required, Studio-only | Keep |
| `hero` | Required `pageHero` | Keep; Hero image remains optional inside the object |
| `introduction` | Required text | Keep |
| `featuredDestinations[]` | Required, 1–6 unique references | Keep for launch curation |
| `editorialCopy` | Required Portable Text | Keep |
| `seo` | Optional override object | Keep |
| `workflowStatus` | Required | Keep |
| `lastReviewedAt` | Optional | Keep optional unless the index begins carrying volatile facts |

This is an appropriate explicit singleton. It should not become a page builder.

### 2.2 `destination` document

| Group | Existing fields | Current assessment |
| --- | --- | --- |
| Identity | Internal title, public title, slug, destination type, excerpt, hero image | Correct foundation; region is the notable missing editorial attribute |
| Story | Gallery, editorial introduction, story, why visit, What to Expect, photography notes | Correct explicit story model |
| Travel | Travel information, scooter suitability, optional scooter guide, things to bring, tips | Strong model, but some fields are not projected or rendered yet |
| Location | Map location and interactive-map permission | Correct provider-neutral storage; permission flag is not currently consumed by the frontend |
| Relationships | Related destinations | Correct for current registered types; documented related experiences are absent from the schema |
| SEO | Shared SEO object | Keep |
| Governance | Workflow status and required last-reviewed date | Keep; required review date is appropriate for volatile guidance |

### 2.3 Shared objects already available

- `editorialImage` — asset, hotspot, alt/decorative decision, caption, credit, and credit URL.
- `gallery` — ordered image sequence with an accessible label and optional collective caption.
- `travelInformation` — travel time, transport, difficulty, best time, fee, and opening information.
- `mapLocation` — verified geopoint, accessible label, and optional directions URL.
- `scooterGuide` — road quality, difficulty, parking, fuel, route notes, and route review date.
- `seo` — search and social overrides, canonical URL, and `noIndex`.
- shared workflow fields and non-blocking editorial warnings.

These objects should be reused. No destination-specific duplicate image, SEO, map, or workflow
object is justified.

### 2.4 Schema and implementation gaps

#### Region is editorially required but not structured

The writing standard requires destination type and region, while the document stores only type.
The initial priorities also need useful regional organization. A minimal controlled `region` field
is recommended before multiple destinations are entered. The vocabulary and each assignment must
be owner/editor verified; this audit does not assign regions as facts.

#### Related experiences are documented but not implemented

The approved model and relationship query anticipate `destination.relatedExperiences`, but the
current destination schema contains only `relatedDestinations`. The `experience` document is not
currently registered. Defer this field until the Experience CMS exists rather than creating a dead
reference prematurely.

#### Rich Portable Text is offered but silently narrowed

The shared `portableText` schema permits editorial images, galleries, quotes, and videos. The
destination GROQ projections intentionally retain only `_type == "block"`, and the frontend
renderer defines block and list treatments only. Editors can therefore add rich items that never
reach the public page.

Before real entry, choose one truthful contract:

1. constrain destination story fields to block-only editorial text because photography already has
   an explicit gallery; or
2. project and render every supported Portable Text type.

For a fast migration, option 1 is simpler and preserves the current explicit photography rhythm.

#### Stored scooter and map permissions are not fully consumed

The detail query does not project `scooterFriendly`, `scooterGuide`, or `interactiveMapEnabled`.
The page therefore cannot render the structured scooter guidance, and the map-provider permission
cannot govern future enhancement. Keep the fields, but align the query and presentation before the
first destination that needs them.

#### Source evidence has no Studio-only home

`lastReviewedAt` records when a review occurred, not what source supported a volatile fact. A
minimal Studio-only verification note or source record is recommended for coordinates, access,
fees, opening patterns, transport, and scooter guidance. It must be excluded from public GROQ
projections. Do not create a large research database for the first release.

---

## 3. Existing frontend components

| Component or layer | Responsibility | Preserve | Gap to address later |
| --- | --- | --- | --- |
| `EditorialPageHero` | Index and detail introductions | Yes | None for migration |
| `FeaturedDestination` | Editorial index preview | Yes | It receives no slug and renders no link, so featured entries do not currently open their detail page |
| `DestinationPhotography` | Panoramic Hero plus alternating editorial gallery | Yes | Requires real alt text, rights, captions, and crop review |
| `DestinationTravelInformation` | Practical facts and reviewed date | Yes | Review-date formatter expects a date-like value while the schema stores a datetime; normalize this contract |
| `DestinationMap` | Accessible provider-neutral map surface | Yes | `interactiveMapEnabled` is not passed; provider remains intentionally unconfigured |
| `EditorialPortableText` | Story and photography-note text | Yes for blocks | Does not render the non-block types allowed by the schema |
| Relationship components | Related places, dive sites, and journal stories | Yes | Destination page does not currently show Related Experiences; no registered Experience CMS exists |
| Central destination queries | Published-only fetching, normalization, caching | Yes | Add missing projected fields only when their components are ready |

### Index discovery gap

The current featured preview is visually complete but not navigational. Neither the featured query
nor its view model includes the destination slug. Before more destinations are published, the
preview needs an intentional text link or article link, and the index needs a path to every
published entry that is not featured.

### Resilience strengths

- Missing images use the shared editorial placeholder instead of breaking layout.
- Empty optional detail sections do not render.
- Query failures return safe fallbacks or `notFound()` behavior.
- Relationship sections render nothing when empty.
- Sanity images use the shared image utility and responsive Next.js handling.
- The detail route is server-rendered and statically generated from published slugs.

---

## 4. SEO opportunities

### What already works

- Every destination has a stable `/destinations/[slug]` route.
- Detail metadata uses SEO overrides, then excerpt or introduction as fallback.
- Social metadata falls back to the destination Hero image.
- Detail pages respect canonical URL and `noIndex`.
- Open Graph identifies destination guides as editorial articles.
- The visible last-reviewed date supports trust when populated.

### Priority improvements

1. **Make destination previews link to their canonical pages.** This is the most immediate internal
   discovery and crawlability gap.
2. **Add a complete published-destination index** once entries exist beyond the featured set.
3. **Map the index canonical URL.** The singleton SEO object contains it, but `/destinations`
   currently does not return `alternates.canonical`.
4. **Use shared Site Settings SEO defaults.** Current route fallbacks are hardcoded rather than
   demonstrably inherited from the CMS Site Settings model.
5. **Create a sitemap before launch.** No App Router sitemap implementation is present.
6. **Add restrained structured data only after facts are verified.** Suitable future shapes are
   `BreadcrumbList` plus an editorial `Article` and, where accurate, a `Place`. Do not emit ratings,
   opening hours, prices, coordinates, or attraction claims from incomplete fields.
7. **Add visible breadcrumbs only if they improve orientation.** Do not create region archives
   solely for keywords.
8. **Review social crops separately.** A strong editorial Hero crop does not automatically work at
   1200 × 630.

### Editorial SEO standard

Each destination needs a unique, natural title and description grounded in verified reporting.
Search language should follow the public place name and useful geographic context. Do not add
keyword lists, “best” claims, rankings, or unsupported regional superlatives.

---

## 5. Missing content

### 5.1 Shared requirements for every destination

Before a destination can move to final review, collect:

- verified public name, spelling, type, and region;
- stable slug;
- first-hand editorial introduction and story;
- a public-safe reason for making time for the place;
- observed arrival experience and what to expect;
- verified travel origin, time, transport, access difficulty, and route context;
- coordinates at the appropriate public precision and a readable location label;
- current fee and opening information when applicable, or an explicit decision to omit them;
- context-specific best-time guidance only when supported;
- scooter suitability and route details only after a field ride and review;
- destination-specific things to bring and tips only when useful;
- photography notes based on real conditions and respectful practice;
- meaningful relationships, if any;
- page-specific SEO description and social-image decision;
- factual sources, responsible reviewer, and last-reviewed date; and
- completed privacy, ecological sensitivity, access, and community-impact review.

Unknown data should stay empty in drafts. It must never be inferred from another travel website or
added simply to satisfy a required field.

### 5.2 Priority-by-priority status

#### Casaroro Falls — P0 template completion

Keep the existing document and finish it rather than creating a replacement. Required work:

- verify every existing story and recommendation statement;
- verify destination region, coordinates, public location precision, access, travel time,
  transport, difficulty, fee, opening pattern, and best-time guidance;
- assign a factual last-reviewed date only after that review;
- commission and rights-clear the required photography;
- write a natural SEO description after the final story is approved;
- decide whether practical lists and related places add real value; and
- move workflow status to `approved` only after content, photography, accessibility, and facts pass
  review.

The current published `inReview` seed should not be treated as the launch template until these
gates pass.

#### Lake Balanan — P1 new destination

No CMS document exists. Begin with a verification record and a field visit, then create the
destination only after the public name, scope, type, region, access, map treatment, and available
photography are confirmed. This audit makes no claim about its conditions or visitor experience.

#### Danjugan Island — P1 new destination

No CMS document exists. Confirm the intended page scope before entry: the island as a destination,
the journey, access arrangements, ecological sensitivity, permissions, public map precision, and
the distinction between general island coverage and any separate dive-site guides. No operator,
schedule, fee, or access claim is approved yet.

#### Southern Negros dive destinations — scope before documents

Do not create a collective destination merely to hold individual dive-site facts. First produce an
approved subject list with a qualified local dive reviewer. For each subject, decide whether it is:

- a wider geographic destination suitable for `destination`;
- an individual dive site suitable for `diveSite`; or
- editorial context better handled by a future journal or guide page.

Technical dive facts, safety guidance, marine-life observations, and exact coordinates remain in
the Dive Site workflow and require specialist verification.

### 5.3 Index content gaps

- Decide whether the existing Destinations Page introduction remains approved after the first
  three real guides are complete.
- Curate featured order only after each referenced destination is launch-ready.
- Add a complete index when the published library grows beyond the manually featured set.
- Do not create regional collection copy until enough verified content supports it.

---

## 6. Photography requirements

### 6.1 Required editorial roles per destination

| Role | Purpose | Working requirement |
| --- | --- | --- |
| Hero | Establish the actual place and emotional character | One strong landscape image with room for responsive cropping |
| Geographic context | Show the destination within its wider setting | Landscape orientation; identifiable and truthful context |
| Arrival or access | Help the reader understand the approach | Only when safe and useful; must not imply unverified public access |
| Main experience | Show what spending time there actually involves | Observed, unforced, and free of staged tourism language |
| Detail | Add texture, ecology, material, weather, or scale | Must contribute information rather than decorate |
| Practical orientation | Clarify terrain, entry, trail, landing, parking, or facilities | Include only when verified and privacy-safe |
| Social crop | Represent the guide when shared | Review independently at approximately 1.91:1 |

The Hero is required by the current destination schema. A gallery is optional, but if used the
shared gallery object requires at least two images in a deliberate sequence.

### 6.2 Asset requirements

Every selected image needs:

- original-resolution file;
- confirmed photographer or source;
- documented rights and permitted website/social use;
- meaningful alt text, or an explicit decorative decision;
- optional caption that adds context rather than restating alt text;
- credit and credit URL where required;
- hotspot review for desktop, tablet, and narrow mobile crops;
- confirmation that people have appropriate consent;
- review for sensitive locations, private access, wildlife, and community privacy; and
- an explicit development/final status.

Development photography must be labeled **development photography**, **not production approved**,
and **replace before launch** until rights and editorial selection are complete.

### 6.3 Priority gaps

| Priority | Current photography status | Minimum next step |
| --- | --- | --- |
| Casaroro Falls | No Hero, gallery, or social image attached in the published document | Complete a place-specific shoot/selection covering Hero, context, experience, access where appropriate, and details |
| Lake Balanan | No CMS document or photography record | Inventory only verified existing photography; otherwise commission after field scope is approved |
| Danjugan Island | No CMS document or photography record | Confirm rights, ecological sensitivity, access permissions, and intended island-versus-dive coverage before selection |
| Southern Negros dive coverage | No approved named production list in the backlog | Assign a qualified dive reviewer and source rights-cleared underwater and surface-context photography per approved subject |

Do not reuse a photograph from another place merely to complete a layout.

---

## 7. Recommended CMS model

### 7.1 Keep the explicit two-document system

Retain:

```text
destinationsPage singleton
  hero
  introduction
  editorialCopy
  featuredDestinations
  seo
  workflowStatus
  lastReviewedAt

destination document
  identity
  editorial story
  photography
  travel information
  scooter guidance
  map location
  curated relationships
  seo
  workflow and review date
```

Do not introduce slices, layout selectors, arbitrary section ordering, or a generic page builder.
The frontend should continue to own composition and omission behavior.

### 7.2 Minimal recommended amendments before bulk entry

1. Add a controlled `region` identity field after the vocabulary is approved.
2. Add one Studio-only verification/source note mechanism excluded from public queries.
3. Resolve the Portable Text mismatch so editors cannot enter blocks the frontend discards.
4. Preserve `relatedDestinations`; defer `relatedExperiences` until Experience schemas exist.
5. Project and render scooter data only when a verified destination needs it.
6. Project `interactiveMapEnabled` before any interactive provider is configured.
7. Normalize `lastReviewedAt` consistently as a Sanity datetime through query, TypeScript, and
   display formatting.

These are contract refinements, not a redesign of the content model.

### 7.3 Publication rules

The CMS should continue allowing incomplete drafts, but a destination must not be approved or
published for launch without:

- verified identity and scope;
- approved story and recommendation;
- required Hero photography, alt text, rights, and credit decision;
- verified travel and map fields;
- approved scooter assessment, even when the answer is false;
- page-specific SEO description;
- last-reviewed date tied to a real factual review; and
- no unresolved error-level validation.

Non-blocking warnings for gallery, credits, SEO, missing photography, and stale review dates remain
useful. Workflow status and Sanity publication state must continue to mean different things.

### 7.4 Fast migration sequence

1. **Contract pass** — approve region vocabulary, verification-note approach, and Portable Text
   behavior.
2. **Casaroro verification** — complete factual source record, field review, photography, and SEO;
   remove the public seed or keep it `noIndex` if it should not remain public during work.
3. **Template review** — verify desktop/mobile reading flow, metadata, map fallback, image crops,
   relationships, and review-date display with one complete document.
4. **Lake Balanan entry** — create only after reporting and photography inputs exist.
5. **Danjugan Island entry** — create only after scope, access, sensitivity, rights, and relationship
   boundaries are approved.
6. **Dive scope decision** — send named dive sites through the separate specialist Dive Site
   workflow; add only true geographic destinations to this migration.
7. **Index completion** — link featured previews, expose every published guide, curate order, and
   review index SEO.
8. **Launch QA** — validate facts, photography, accessibility, structured data, internal links,
   sitemap coverage, performance, and publication state.

### 7.5 Decisions required before implementation

- Approved region vocabulary and whether one destination may have only one primary region.
- Whether destination story fields should be text-only or support embedded rich media.
- Where source and verification notes should live in Studio.
- Whether the incomplete published Casaroro seed should remain public during migration.
- The owner-approved fieldwork and photography status for each priority.
- The qualified reviewer and subject boundary for Southern Negros dive coverage.

No further destination schema or frontend work should begin until these narrow decisions are made.
