# Joshua's Point — Home Sanity Model Review

**Document type:** Internal CMS architecture review
**Document reviewed:** `homePage` singleton
**Route supported:** `/`
**Phase:** Home refinement Phase 5 — Sanity model review
**Status:** Recommendations awaiting approval; no schema changes made

## Purpose

This review compares the existing `homePage` Sanity schema with the approved Home content
architecture. It follows the same philosophy as `housePage`:

- one singleton with a fixed document ID and explicit named sections;
- no generic page builder;
- shared image, SEO, link, and workflow objects where appropriate;
- public content separated from Studio governance and source verification;
- a typed frontend presentation contract independent from the raw Sanity response;
- published CMS content treated as authoritative only when it can map to a complete page.

This document proposes changes but does not implement schemas, migrations, queries, types, or
frontend code.

---

## 1. Existing `homePage` schema

### Document registration and singleton behavior

The `homePage` document is:

- registered in `schemaTypes/index.ts`;
- placed under **Website → Home** in the custom Studio structure;
- treated as a singleton by the Studio structure;
- initialized with `internalTitle: "Home Page"` and `workflowStatus: "draft"`;
- organized into `content`, `seo`, and `governance` field groups.

The current schema title is **Home Page**, while the Studio navigation title is **Home**.

### Current document fields

| Field              | Type                                 | Required | Current purpose                                     | Review                                    |
| ------------------ | ------------------------------------ | -------- | --------------------------------------------------- | ----------------------------------------- |
| `internalTitle`    | `string` through shared field helper | Yes      | Studio-only working title                           | Keep                                      |
| `hero`             | `homeHero`                           | Yes      | Full-width opening image, words, and optional links | Keep                                      |
| `placeStory`       | `placeStory`                         | Yes      | First editorial story beneath the Hero              | Keep and relabel in Studio as “The Place” |
| `morningNarrative` | `morningNarrative`                   | Yes      | Image-first Morning section                         | Keep                                      |
| `seo`              | shared `seo` object                  | No       | Page-specific search and social metadata            | Keep                                      |
| `workflowStatus`   | shared workflow string               | Yes      | Draft, In Review, or Approved                       | Keep                                      |
| `lastReviewedAt`   | shared datetime                      | No       | Material editorial review date                      | Keep; conditionally require for approval  |

### Current `homeHero` object

| Field           | Type             | Required | Review                                                             |
| --------------- | ---------------- | -------- | ------------------------------------------------------------------ |
| `eyebrow`       | `string`         | Yes      | Keep                                                               |
| `heading`       | `string`         | Yes      | Keep; mapper may expose as presentation `title`                    |
| `introduction`  | `text`           | Yes      | Keep; mapper may expose as presentation `description`              |
| `image`         | `editorialImage` | Yes      | Keep                                                               |
| `primaryLink`   | `link`           | No       | Keep optional; final interaction remains unresolved                |
| `secondaryLink` | `link`           | No       | Keep optional; do not recreate the broken `/the-story` destination |

The Hero already expresses the correct explicit model. It does not need regional fields. The
approved hierarchy keeps Southern Negros out of the opening.

### Current `placeStory` object

| Field     | Type             | Required | Review                              |
| --------- | ---------------- | -------- | ----------------------------------- |
| `eyebrow` | `string`         | Yes      | Keep                                |
| `heading` | `string`         | Yes      | Keep                                |
| `body`    | `text`           | Yes      | Keep                                |
| `image`   | `editorialImage` | Yes      | Keep                                |
| `caption` | `text`           | Yes      | Caption ownership decision required |

The object matches the approved **The Place** role. Its schema type and field name need not change
merely because the public section label is more specific.

### Current `morningNarrative` object

| Field     | Type             | Required | Review                              |
| --------- | ---------------- | -------- | ----------------------------------- |
| `eyebrow` | `string`         | Yes      | Keep                                |
| `heading` | `string`         | Yes      | Keep                                |
| `body`    | `text`           | Yes      | Keep                                |
| `image`   | `editorialImage` | Yes      | Keep                                |
| `caption` | `text`           | No       | Caption ownership decision required |

This object remains aligned with the approved owner source: waking, opening the glass doors,
making coffee, sitting outside, listening to birds, and observing sea and mountain. The schema
should not encode those activities as individual fields; they belong in one constrained editorial
body.

### Reusable objects and helpers already available

#### `editorialImage`

Already supports:

- Sanity image asset and hotspot;
- alternative text;
- decorative state;
- caption;
- source or photographer credit;
- optional credit URL;
- validation requiring an asset and meaningful alt text unless decorative.

This should remain the only image object used by Home. Do not create a Home-specific image type.

#### `link`

Already supports:

- internal references;
- external HTTPS destinations;
- email;
- phone;
- concise label;
- external new-tab behavior.

Its current internal-reference targets are limited to `homePage` and `room`. It cannot currently
reference `housePage`, `destinationsPage`, `diveSitesPage`, `destination`, or `diveSite`. That is a
shared-link limitation, not a reason to store raw Home URLs in new fields.

#### `seo`

The shared SEO object remains the correct source for Home metadata and social presentation. The
future frontend query should map it into Next.js metadata rather than retaining the current static
root metadata as the only source.

#### Editorial workflow helpers

The shared helpers provide:

- `internalTitle`;
- `workflowStatus`;
- `lastReviewedAt`;
- `seo`.

They should remain shared. Home should add document-level approval checks and a richer preview in
the same style as `housePage`, not duplicate these fields.

### Existing strengths

- Fixed editorial order.
- No `sections[]` builder.
- Short text fields instead of unrestricted Portable Text.
- Image and link abstractions already shared.
- Governance fields separated from visible content.
- Existing field names correspond cleanly to the implemented Hero, Story, and Morning components.

### Existing gaps

- No Shared Life section.
- No Southern Negros section.
- No Closing Reflection.
- All content is grouped under one broad `content` tab instead of section-oriented editorial groups.
- Preview shows only `internalTitle`; it omits Hero media, workflow status, and review date.
- No document-level approval validation.
- No warning for missing Hero credit.
- Shared internal links cannot target the pages Home needs.
- Caption data may be duplicated between `placeStory.caption` or `morningNarrative.caption` and
  `editorialImage.caption`.
- No Home query, response contract, mapper, cache tag, metadata mapping, or stable `HomePageData`
  contract exists in the frontend.

---

## 2. Comparison with the approved Home structure

| Approved editorial role | Existing schema coverage                  | Gap                                                     |
| ----------------------- | ----------------------------------------- | ------------------------------------------------------- |
| Hero                    | Complete through `hero: homeHero`         | Internal-link targets and final interaction decision    |
| The Place               | Complete through `placeStory: placeStory` | Studio label and caption ownership                      |
| Shared Life             | Missing                                   | Add one named `homeSharedLife` object                   |
| Morning Narrative       | Complete through `morningNarrative`       | Caption ownership and final photography verification    |
| Southern Negros         | Missing                                   | Add one named nature-first regional introduction object |
| Closing Reflection      | Missing                                   | Add one minimal named closing object                    |

### Editorial order

The recommended document order is fixed:

```text
hero
→ placeStory
→ sharedLife
→ morningNarrative
→ southernNegrosIntroduction
→ closingReflection
→ seo
→ workflow governance
```

The order preserves the owner-approved hierarchy:

```text
Joshua's Point
→ nature around it
→ people and shared life
→ one Morning rhythm
→ nature-led Southern Negros discovery
→ invitation into the Joshua's Point world
```

Sanity field order should match frontend editorial order so editors do not have to reconstruct the
page mentally.

---

## 3. Field recommendations

## Fields to keep

### Document fields

- `internalTitle`
- `hero`
- `placeStory`
- `morningNarrative`
- `seo`
- `workflowStatus`
- `lastReviewedAt`

### Existing object fields

- All `homeHero` fields.
- `placeStory.eyebrow`
- `placeStory.heading`
- `placeStory.body`
- `placeStory.image`
- `morningNarrative.eyebrow`
- `morningNarrative.heading`
- `morningNarrative.body`
- `morningNarrative.image`

These names are clear, already registered, and map cleanly into presentation data. Renaming stored
fields for stylistic consistency would create migration work without improving editorial clarity.

## Fields and labels to rename

### Recommended editor-facing label changes only

| Current                                | Recommended | Reason                                                               |
| -------------------------------------- | ----------- | -------------------------------------------------------------------- |
| Schema title `Home Page`               | `Home`      | Matches approved Studio navigation language and the House convention |
| `placeStory` field title `Place Story` | `The Place` | Matches the approved public editorial role                           |

These are title changes, not stored field renames, and therefore require no content migration.

### Stored field renames not recommended

- Do not rename `hero.heading` to `title`; map it to `HomePageData.hero.title`.
- Do not rename `hero.introduction` to `description`; map it to presentation data.
- Do not rename `placeStory` to `thePlace`; use the Studio title to express the editorial label.
- Do not rename `morningNarrative`; it already carries the correct meaning.

Avoiding unnecessary stored-field renames keeps existing documents compatible and the change
reviewable.

## Fields to add

### `sharedLife: homeSharedLife`

**Document status:** Required for the approved Home structure.

Recommended object:

```text
homeSharedLife
├── eyebrow — string, required
├── heading — string, required
├── body — text, required
└── image — editorialImage, required
```

Editorial purpose:

- cooking;
- dining;
- conversation;
- people being together;
- connection between people and place.

Do not add activity arrays, people records, room lists, testimonials, or private source fields. One
short body should carry the approved public-safe account.

Caption recommendation depends on the shared caption decision below. If captions live inside
`editorialImage`, do not add another field here.

### `southernNegrosIntroduction: homeSouthernNegrosIntroduction`

**Document status:** Required editorial section; media should remain optional until a truthful
regional image exists.

Recommended first-release object:

```text
homeSouthernNegrosIntroduction
├── eyebrow — string, required
├── heading — string, required
├── body — text, required
├── image — editorialImage, optional
└── primaryLink — link, optional
```

Editorial purpose:

- lead with nature;
- open gradually toward islands, diving, waterfalls, mountains, and wider regional discoveries;
- invite onward reading without becoming a tourism catalogue.

The image should be optional because no truthful repository asset currently exists. An empty image
must produce an intentional text-led section, not a static image fallback masquerading as regional
photography.

#### References recommendation

Do not add separate `featuredDestinations`, `featuredDiveSites`, and `featuredExperiences` arrays in
the first schema change. The visual composition for those relationships is not approved, and the
Experience document type is not registered in the current schema index. Begin with one editorial
introduction and one optional link to the appropriate index or Guide route.

If a later approved composition needs curated references, add them explicitly with small limits and
render empty relationship groups as nothing.

### `closingReflection: homeClosingReflection`

**Document status:** Required for the approved Home structure.

Recommended object:

```text
homeClosingReflection
├── body — text, required
└── image — editorialImage, optional
```

Editorial purpose:

- provide a distinct invitation into the Joshua's Point world;
- differ from The House closing;
- end without a booking CTA or new factual claim.

The image remains optional because the final composition may need whitespace rather than another
photograph. The selected Evening image can support development review without forcing permanent
media into the model.

Do not reuse `houseClosingReflection` even though both currently need a `body`. Its title,
description, editorial purpose, and future evolution belong to The House. A small Home-specific
object preserves explicit intent without introducing a generic page-builder primitive.

## Fields to remove or consolidate

### Caption duplication

The current `placeStory.caption` and `morningNarrative.caption` exist beside
`editorialImage.caption`. Two caption locations can disagree and complicate queries, entry guidance,
and mapping.

Recommended long-term source of truth:

```text
section.image.caption
```

This matches the shared image philosophy and keeps accessibility, rights, visual asset, and caption
context together.

However, do not remove existing caption fields until current `homePage` documents are inspected and
any entered values are migrated. The implementation phase should choose one of two safe approaches:

1. **Preferred:** migrate top-level captions into `image.caption`, update queries, then remove the
   duplicate fields.
2. **Compatibility-first:** keep the fields temporarily, query `coalesce(caption, image.caption)`,
   hide or deprecate one entry point, and remove it in a later migration.

No other current field should be removed.

### Fields explicitly not recommended

- Generic `sections[]`.
- Unrestricted page-builder blocks.
- Separate fields for coffee, cooking, birds, islands, diving, waterfalls, or mountains.
- Raw internal URL strings.
- Private owner notes inside public section objects.
- Studio-only verification notes in the public query.
- Duplicate Home-specific SEO, image, or workflow object types.
- Booking, pricing, availability, or promotional feature fields.

---

## 4. Recommended document organization

Follow the section-oriented House Studio experience rather than retaining one large Content group.

Recommended groups:

| Group name   | Studio title    | Fields                                              |
| ------------ | --------------- | --------------------------------------------------- |
| `opening`    | Opening         | `hero`                                              |
| `place`      | The Place       | `placeStory`                                        |
| `sharedLife` | Shared Life     | `sharedLife`                                        |
| `morning`    | Morning         | `morningNarrative`                                  |
| `region`     | Southern Negros | `southernNegrosIntroduction`                        |
| `closing`    | Closing         | `closingReflection`                                 |
| `seo`        | SEO             | `seo`                                               |
| `governance` | Governance      | `internalTitle`, `workflowStatus`, `lastReviewedAt` |

Each section object should be collapsible. Hero and The Place may open by default; later sections
may begin collapsed to keep the editor calm and focused.

### Preview recommendation

Use the established editorial preview helper rather than title-only preview:

- title from `hero.heading` with fallback to `internalTitle`;
- subtitle `Home`;
- media from `hero.image`;
- workflow badge from `workflowStatus`;
- last-reviewed context from `lastReviewedAt`.

### Approval validation recommendation

As with `housePage`, document-level validation should become stricter only when
`workflowStatus == "approved"`.

Before Approved:

- Hero image and public text present.
- The Place text and image present.
- Shared Life text and image present.
- Morning text and image present.
- Southern Negros text present; image optional.
- Closing body present; image optional.
- SEO description present.
- `lastReviewedAt` present and not in the future.

Warnings:

- Hero image credit missing.
- Any non-decorative image credit missing.
- Development photography credit still contains “not production approved” or “replace before
  launch” when workflow is moved to Approved.
- Southern Negros has neither an image nor an approved editorial reason for remaining text-only.

Draft and In Review documents may remain incomplete. Publishing and workflow approval remain
separate actions, but editorial guidance should make the distinction clear.

---

## 5. Shared link limitation

The Home Hero and Southern Negros section need internal editorial destinations, but `link.reference`
currently permits only `homePage` and `room`.

### Recommended shared change during implementation

Expand internal link targets only to registered document types with working route resolution that
Home genuinely needs, initially:

- `housePage`
- `destinationsPage`
- `diveSitesPage`
- `destination`
- `diveSite`
- existing `room`

Do not reference schema types that are only listed in Studio structure but not registered, such as
future Experiences or Journal documents. Do not add raw path fields as a shortcut.

The frontend should resolve references through one typed route resolver. External links remain
available through the existing URL field.

### Hero interaction decision

The owner has approved Joshua's Point itself as the Hero's editorial destination, not a regional
tourism link. Before content entry, choose whether this means:

- one link to `/the-house`;
- an in-page continuation to The Place;
- or no visible Hero action.

The schema can safely keep both link fields optional while the presentation decision is made.

---

## 6. Future `HomePageData` presentation contract

The frontend should not consume `SanityHomePageData` directly. Introduce a stable presentation
contract that describes what components need.

### Proposed presentation types

```text
HomePageData
├── hero
│   ├── eyebrow
│   ├── title
│   ├── description
│   ├── image
│   ├── primaryAction — optional
│   └── secondaryAction — optional
├── placeStory
│   ├── eyebrow
│   ├── heading
│   ├── paragraph
│   ├── image
│   └── caption — optional
├── sharedLife
│   ├── eyebrow
│   ├── heading
│   ├── paragraph
│   ├── image
│   └── caption — optional
├── morningNarrative
│   ├── eyebrow
│   ├── heading
│   ├── paragraph
│   ├── image
│   └── caption — optional
├── southernNegros
│   ├── eyebrow
│   ├── heading
│   ├── paragraph
│   ├── image — optional
│   ├── caption — optional
│   └── primaryAction — optional
└── closingReflection
    ├── body
    └── image — optional
```

Exact component props may reuse the existing `Hero`, `StorySection`, and
`ImageNarrativeSection` contracts where they remain visually appropriate. The presentation model
should not expose Sanity reference objects, asset documents, workflow fields, or Studio notes.

### Sanity-to-presentation mapping

| Sanity field                             | `HomePageData` field           | Mapping note                                                          |
| ---------------------------------------- | ------------------------------ | --------------------------------------------------------------------- |
| `hero.eyebrow`                           | `hero.eyebrow`                 | Trim; required                                                        |
| `hero.heading`                           | `hero.title`                   | Deliberate naming translation                                         |
| `hero.introduction`                      | `hero.description`             | Deliberate naming translation                                         |
| `hero.image`                             | `hero.image`                   | Use shared Sanity image utility with Hero dimensions and preload      |
| `hero.primaryLink`                       | `hero.primaryAction`           | Resolve internal reference or external URL through typed link mapper  |
| `hero.secondaryLink`                     | `hero.secondaryAction`         | Omit when incomplete                                                  |
| `placeStory.body`                        | `placeStory.paragraph`         | Trim; required                                                        |
| `placeStory.image`                       | `placeStory.image`             | Map through shared image utility                                      |
| Place caption source                     | `placeStory.caption`           | Use the approved single caption source                                |
| `sharedLife.body`                        | `sharedLife.paragraph`         | Trim; required                                                        |
| `sharedLife.image`                       | `sharedLife.image`             | Map through shared image utility                                      |
| `morningNarrative.body`                  | `morningNarrative.paragraph`   | Preserve one constrained observation                                  |
| `morningNarrative.image`                 | `morningNarrative.image`       | Map through shared image utility                                      |
| Morning caption source                   | `morningNarrative.caption`     | Use the approved single caption source                                |
| `southernNegrosIntroduction.body`        | `southernNegros.paragraph`     | Required text; no catalogue arrays in first version                   |
| `southernNegrosIntroduction.image`       | `southernNegros.image`         | Optional; never replace with static House photography when CMS exists |
| `southernNegrosIntroduction.primaryLink` | `southernNegros.primaryAction` | Resolve only when complete                                            |
| `closingReflection.body`                 | `closingReflection.body`       | Required and distinct from The House copy                             |
| `closingReflection.image`                | `closingReflection.image`      | Optional                                                              |

### Response type strategy

Create a separate nullable `SanityHomePageData` contract matching GROQ behavior:

- nested objects may be `null`;
- optional images and links may be `null`;
- arrays, if added later, may contain nullable entries;
- workflow fields may be queried for governance but must not flow into components;
- Studio-only verification fields must be excluded from the public projection.

Keep `HomePageData` clean and non-null for required presentation fields. Optional sections or media
should be represented only where the approved layout supports their absence.

### Mapper behavior

The future mapper should:

1. clean and trim strings;
2. map Sanity images through the existing shared utility;
3. resolve links through one typed route resolver;
4. translate Sanity field names into stable component language;
5. omit incomplete optional links and images;
6. allow Southern Negros to be intentionally text-led when its image is missing;
7. allow Closing Reflection to be text-only;
8. return `null` when required published content cannot produce a functional Home page;
9. never expose workflow, source, private, or Studio-only notes.

### Data-loading behavior

Follow the corrected House authority rule:

- If no published `homePage` exists, use the complete static development fallback.
- If a published `homePage` exists, use CMS content only.
- Do not fill missing CMS sections with static sections.
- Validate the draft and mapper before first publication so CMS authority cannot break `/`.
- Query through one centralized helper using the published perspective, Server Components, cache
  tags, and controlled revalidation.

---

## 7. Keep, rename, add, remove summary

### Keep

- Singleton `homePage`.
- Explicit fixed sequence.
- `hero`, `placeStory`, and `morningNarrative`.
- Shared `editorialImage`, `link`, `seo`, and workflow fields.
- Short text rather than unrestricted Portable Text.
- Optional Hero links.

### Rename

- Editor-facing document title: **Home Page** → **Home**.
- Editor-facing field title: **Place Story** → **The Place**.
- No stored field names in the first implementation.

### Add

- `sharedLife: homeSharedLife`.
- `southernNegrosIntroduction: homeSouthernNegrosIntroduction`.
- `closingReflection: homeClosingReflection`.
- Section-oriented field groups.
- House-style editorial preview.
- Conditional approval validation and development-image warnings.
- Required internal destinations in the shared link object.

### Remove or consolidate

- Consolidate top-level section captions with `editorialImage.caption` after inspecting existing
  content and choosing a safe migration approach.
- Remove no other current field.
- Never add a generic page builder.

---

## 8. Required decisions before schema implementation

1. **Caption source:** Should `editorialImage.caption` become the single source immediately, or
   should compatibility coalescing be used for one migration phase?
2. **Southern Negros media:** Approve the regional image as optional until truthful photography is
   available.
3. **Southern Negros relationships:** Approve deferring featured reference arrays until an actual
   editorial composition is designed.
4. **Closing media:** Approve `closingReflection.image` as optional rather than required.
5. **Hero interaction:** Choose `/the-house`, in-page continuation, or no visible action. This does
   not block the schema because links remain optional, but it blocks final content entry.
6. **Shared links:** Approve expanding the reusable internal-link targets to registered pages needed
   by Home.
7. **Development-image gate:** Approve a warning that prevents Home from reaching workflow
   `approved` while image credits still identify development photography.

Once these decisions are resolved, implementation should remain small: add three named objects,
refine the singleton organization and validation, update the shared link targets deliberately, and
prepare the typed query/mapping layer without connecting the Home route yet.
