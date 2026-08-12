# Joshua's Point — The House Sanity Model Proposal

**Document type:** Internal technical proposal
**Status:** Proposed; no schema implementation approved
**Public website copy:** No

## Purpose

This proposal maps the approved House editorial structure to one explicit Sanity singleton. It is
designed to preserve the photography-first composition of `/the-house`, remain compatible with the
local `HousePageData` contract, and keep private source material outside public content.

The proposal does not introduce a page builder. Each section has a named, constrained field because
its editorial role and frontend composition are already approved.

## Modelling principles

- Use one `housePage` document with the fixed document ID `housePage` and route `/the-house`.
- Reuse the existing `editorialImage` and `seo` objects and the existing workflow field helpers.
- Store public, approved editorial content only. Interviews, family history, evidence, consent
  records, technical documents, and private memories stay outside the public content document.
- Treat images as editorial assets with alt text, credit, crop, and rights checks—not as a generic
  gallery.
- Keep Morning, Rain, and Evening independently optional. An incomplete moment must disappear
  cleanly rather than receive filler content.
- Allow only verified material entries. Verification evidence does not belong in the public entry.
- Keep layout decisions such as media ratios, column placement, and atmosphere tones in the
  frontend.
- Prepare text fields for future localization by keeping them semantically discrete. Do not add
  localized field wrappers yet.

## Proposed document

### `housePage`

| Property         | Proposal                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------- |
| Sanity type      | `document`                                                                               |
| Document ID      | Fixed as `housePage`                                                                     |
| Studio title     | The House                                                                                |
| Route            | `/the-house`                                                                             |
| Creation         | Open the fixed singleton from the Website desk group; no general “new document” template |
| Duplicate/delete | Restrict through the existing singleton action pattern                                   |
| Preview          | Hero title, workflow status, last-reviewed date, and Hero image                          |
| Frontend         | Queried by fixed ID through one typed query helper                                       |

### Field groups

The future schema should use collapsible groups without changing the content model:

1. **Opening** — Hero and Opening Reflection
2. **House Story** — Shared Heart, View, and Indoor/Outdoor Story
3. **Daily Life** — Daily Rhythms
4. **Materials** — Materials and Architecture
5. **Closing** — Closing Reflection
6. **SEO** — existing `seo` object
7. **Governance** — workflow status and last-reviewed date

## Shared validation and privacy rules

These rules apply in addition to the field-specific rules below.

### Text

- Trim whitespace and reject strings that contain no visible content.
- Do not create arbitrary character limits until approved final copy establishes realistic bounds.
- Use warnings for editorial concision where useful; use errors only for structural requirements.
- Do not place private family stories, the private meaning of the Joshua name, identifiable guest
  stories, access/security details, or unpublished source notes in public text fields.
- Claims involving geography, architecture, materials, dimensions, or systems must be supported by
  the House Verification Record before publication.

### Images

- Reuse `editorialImage`, including hotspot support, meaningful alt text or an explicit decorative
  flag, optional caption, and credit metadata.
- Require an image asset whenever an image field or sequence item exists.
- Informative House photography must not be marked decorative merely to avoid writing alt text.
- Image rights, consent, source originals, and verification evidence remain governed outside the
  public document even when the public credit is stored with the image.
- Do not identify Bohol Sea, Apo Island, Siquijor Island, or Mount Talinis in captions or alt text
  until the landmark has been matched to that specific frame.
- Development photography must not be promoted to final status merely because it is entered in
  Studio.

### Publication governance

- `workflowStatus: approved` means editorial review is complete; publishing remains a separate
  Sanity action.
- When workflow status is Approved, require a last-reviewed date and all required page fields.
- Surface non-blocking warnings for missing Hero credit, missing SEO description, stale review
  dates, and incomplete optional photography.
- View, Morning, and Rain photography are currently missing. Their absence must not be disguised by
  a generic placeholder inside published CMS content.

## Field specification

## 1. Hero

**Field name:** `hero`
**Type:** object
**Required:** Yes

The Hero establishes the relationship between house and landscape. It must remain concise and
photography-first.

| Field          | Type             | Requirement                             | Editorial purpose                                            | Validation                                                                                           | Privacy considerations                                                                                                        |
| -------------- | ---------------- | --------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `eyebrow`      | `string`         | Required                                | Gives the page a small, quiet context label.                 | Trim; reject empty value. Recommend “The House” through initial value, not a locked marketing label. | No private source or family reference.                                                                                        |
| `title`        | `string`         | Required                                | Supplies the primary page heading.                           | Trim; reject empty value; one plain-text line.                                                       | Must not reveal the private meaning of the Joshua name.                                                                       |
| `introduction` | `text`           | Required                                | Introduces the house through landscape, nature, and feeling. | Trim; reject empty value; editorial warning if it expands beyond a short introduction.               | Public-safe observations only; no private origin story or unverifiable guest promise.                                         |
| `image`        | `editorialImage` | Required for an approved/published page | Provides the defining landscape-led photograph.              | Require an asset; inherit shared alt/decorative validation; warn when credit is missing.             | Confirm rights and crop; identify landmarks only after frame-specific verification. Current development assets are not final. |

### Compatibility note

These fields map directly to `HousePageData.hero`. The frontend mapping layer supplies `ratio`,
`sizes`, `tone`, and preload behavior because those are presentation concerns.

## 2. Opening Reflection

**Field name:** `openingReflection`
**Type:** object
**Required:** Yes

| Field     | Type     | Requirement | Editorial purpose                                                            | Validation                                                               | Privacy considerations                                                                       |
| --------- | -------- | ----------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `heading` | `string` | Required    | Moves the reader from looking at a house to considering the feeling of home. | Trim; reject empty value.                                                | Do not use family history as proof of warmth.                                                |
| `body`    | `text`   | Required    | Holds one restrained reflection grounded in approved owner experience.       | Trim; reject empty value; warning when multiple paragraphs are supplied. | Exclude family identities, the name origin, and private memories unless separately approved. |

### Compatibility note

These fields map to `HousePageData.openingReflection.heading` and `.body`. The current
`openingReflection.eyebrow` remains a code-owned presentation label unless the content architecture
is separately amended.

## 3. Shared Heart of the House

**Field name:** `sharedHeart`
**Type:** object
**Required:** Yes

| Field     | Type                      | Requirement         | Editorial purpose                                                       | Validation                                                                                   | Privacy considerations                                                                             |
| --------- | ------------------------- | ------------------- | ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `heading` | `string`                  | Required            | Names the connected living, dining, kitchen, and deck story.            | Trim; reject empty value.                                                                    | Avoid promises about how every guest gathers.                                                      |
| `body`    | `text`                    | Required            | Describes verified everyday use of connected shared spaces.             | Trim; reject empty value; reject unsupported dimensions or performance claims during review. | No identifiable family or guest memories without separate approval.                                |
| `images`  | array of `editorialImage` | Required; 1–2 items | Shows connected rooms and their relationship with the deck and outside. | Minimum 1, maximum 2; require asset and shared image metadata; warn for duplicate assets.    | Confirm consent for people and remove private objects or security-sensitive detail from the frame. |

### Compatibility note

The first image maps to `HousePageData.sharedLiving.media`; its image caption maps to
`.caption`. A second image is supported by the approved content map but will require the frontend
adapter to expose it when the existing composition is ready. The section eyebrow remains
code-owned.

## 4. View

**Field name:** `view`
**Type:** object
**Required:** Structurally required; image required only when the View section is ready to publish

| Field               | Type             | Requirement                                                     | Editorial purpose                                                            | Validation                                                                                                          | Privacy considerations                                                                                                                  |
| ------------------- | ---------------- | --------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `image`             | `editorialImage` | Optional while drafting; required when the section is published | Creates the page's uninterrupted landscape pause.                            | Require asset and shared image metadata when present; publication error if the section is enabled without an image. | Do not expose precise property position or identify a landmark without matching it to the frame. View photography is currently missing. |
| `caption`           | `text`           | Optional                                                        | Adds factual context only when the photograph needs it.                      | Trim; reject empty supplied value; keep concise; never require filler.                                              | Geography must be image-specific and verified. Avoid private associations with the view.                                                |
| `verificationNotes` | `text`           | Optional, Studio-only                                           | Records a concise editorial summary of what has been checked for this image. | Never queried by the frontend; warning if geographic caption exists without a verification summary and review date. | No private memories, coordinates, evidence files, family details, or sensitive access information. Store detailed evidence elsewhere.   |

### Compatibility note

The image and caption map to `HousePageData.view.media` and `.caption`. The current view eyebrow,
heading, and body remain code-owned presentation and fallback text. `verificationNotes` is excluded
from the public query and frontend type.

## 5. Indoor Outdoor Story

**Field name:** `indoorOutdoorStory`
**Type:** object
**Required:** Yes

| Field     | Type                       | Requirement         | Editorial purpose                                                                                            | Validation                                                                                 | Privacy considerations                                                     |
| --------- | -------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `heading` | `string`                   | Required            | Frames the lived threshold between house and landscape.                                                      | Trim; reject empty value.                                                                  | Avoid access or security detail.                                           |
| `body`    | `text`                     | Required            | Describes verified use of deck, sliding doors, roof, and pool relationship without becoming an amenity list. | Trim; reject empty value; editorial review for performance, dimension, and weather claims. | Keep private routines and family context out of the public narrative.      |
| `images`  | array of `houseStoryImage` | Required; 1–3 items | Creates a controlled sequence for threshold, deck/shelter, and pool relationship.                            | Minimum 1, maximum 3; unique `role`; require image asset; preserve order.                  | Confirm rights, people consent, and absence of security-sensitive details. |

### `houseStoryImage`

This is a House-specific object, not a generic gallery item.

| Field   | Type             | Requirement | Editorial purpose                                       | Validation                                                                                  | Privacy considerations                                           |
| ------- | ---------------- | ----------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `role`  | `string`         | Required    | Connects the image to an approved editorial position.   | Restricted list: `threshold`, `deckShelter`, `poolRelationship`; unique within the section. | The role must not encode private activity or access information. |
| `image` | `editorialImage` | Required    | Holds the photograph and shared accessibility metadata. | Require asset; inherit shared image validation.                                             | Apply rights, consent, privacy, and precise-caption checks.      |

### Compatibility note

The ordered image records map to `HousePageData.indoorOutdoor.items`. Stable array `_key` values
map to frontend item IDs; `role` controls the intended composition. Captions remain owned by the
embedded `editorialImage`. The section eyebrow remains code-owned.

## 6. Daily Rhythms

**Field name:** `dailyRhythms`
**Type:** object
**Required:** Optional as a whole until at least one moment is editorially complete

| Field     | Type                | Requirement | Editorial purpose                                                                     | Validation                                                                     | Privacy considerations                                                                                   |
| --------- | ------------------- | ----------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `morning` | `dailyRhythmMoment` | Optional    | Records an observed morning relationship with mountain or sea view and nature.        | If present, require `body` and `image`; warn if capture context is unverified. | Do not turn a personal routine into a universal guest promise. Morning photography is currently missing. |
| `rain`    | `dailyRhythmMoment` | Optional    | Represents the house honestly during rainfall.                                        | If present, require `body` and `image`; factual weather claims need review.    | Exclude unsafe behavior and avoid implying guaranteed weather. Rain photography is currently missing.    |
| `evening` | `dailyRhythmMoment` | Optional    | Describes the connected evening atmosphere across deck, table, pool, and living room. | If present, require `body` and `image`.                                        | Do not publish identifiable gatherings or private routines without approval and consent.                 |

### `dailyRhythmMoment`

| Field   | Type             | Requirement                     | Editorial purpose                                    | Validation                                               | Privacy considerations                                                       |
| ------- | ---------------- | ------------------------------- | ---------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `body`  | `text`           | Required when the moment exists | Holds one real, public-safe observation.             | Trim; reject empty value; recommend one short paragraph. | No invented memory, fixed itinerary, family identity, or promise of silence. |
| `image` | `editorialImage` | Required when the moment exists | Gives each rhythm its own observed visual condition. | Require asset; inherit shared image validation.          | Verify time/weather context, rights, people consent, and captions.           |

### Compatibility note

The adapter converts present fields into the ordered `HousePageData.dailyRhythms.items` sequence:
Morning, Rain, Evening. Missing fields are omitted. The existing section eyebrow, heading, and body
remain code-owned until the approved model explicitly makes them editable. Embedded image captions
map through the shared image type.

## 7. Materials and Architecture

**Field name:** `materialsAndArchitecture`
**Type:** object
**Required:** Optional; render only when at least one entry is confirmed and approved

| Field       | Type                          | Requirement                  | Editorial purpose                                                                     | Validation                                                                                    | Privacy considerations                                                              |
| ----------- | ----------------------------- | ---------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `heading`   | `string`                      | Required when section exists | Introduces a tactile, truthful account of material and design.                        | Trim; reject empty value.                                                                     | Do not use architectural status or private construction history as promotion.       |
| `body`      | `text`                        | Optional                     | Gives brief context for how verified materials relate to use, weather, and landscape. | Trim supplied text; factual claims require verification.                                      | Exclude financial details, disputes, private decisions, and unapproved attribution. |
| `materials` | array of `houseMaterialEntry` | Required when section exists | Presents only verified material stories.                                              | Minimum 1, recommended maximum 6; unique normalized names; no unverified placeholder entries. | Public description must omit private procurement and construction details.          |

### `houseMaterialEntry`

| Field         | Type             | Requirement | Editorial purpose                                                                      | Validation                                                                                                                | Privacy considerations                                                                  |
| ------------- | ---------------- | ----------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `name`        | `string`         | Required    | Uses the verified public material or architectural-element name.                       | Trim; reject empty value; unique within the array. “Stone detail on cement” is prohibited until terminology is confirmed. | Credit names only with approved spelling, role, and permission.                         |
| `description` | `text`           | Required    | Explains the verified application or lived role without becoming a specification list. | Trim; reject empty value; require editorial confirmation before entry creation.                                           | No supplier, cost, dispute, or private construction history unless separately approved. |
| `image`       | `editorialImage` | Optional    | Supports a verified material story with a truthful detail photograph.                  | Inherit shared image validation; warn if caption names an unverified material.                                            | Confirm rights and remove sensitive construction or access detail.                      |

The proposed public entry intentionally has no `verificationStatus` field. Only confirmed entries
may enter this array. Evidence and terminology review remain in the internal verification workflow.
Wood, concrete, stone-coated metal roof sheets, and sliding doors are owner-confirmed source facts,
but their precise applications and publication wording still require review. “Stone detail on
cement” remains excluded until its terminology is verified.

### Compatibility note

Entries map to `HousePageData.materials.items` and receive `verificationStatus: 'confirmed'` in the
adapter. The current `materials.verificationNote` is development-only and must not come from public
CMS data. The section eyebrow remains code-owned.

## 8. Closing Reflection

**Field name:** `closingReflection`
**Type:** object
**Required:** Yes

| Field  | Type   | Requirement | Editorial purpose                                                                     | Validation                                                                  | Privacy considerations                                                              |
| ------ | ------ | ----------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `body` | `text` | Required    | Ends with one quiet, real observation and returns attention to nature and daily life. | Trim; reject empty value; warning when more than one paragraph is supplied. | No private family memory, name-origin detail, invented sentiment, or guest promise. |

This maps directly to `HousePageData.finalReflection.body`.

## 9. SEO

**Field name:** `seo`
**Type:** existing `seo` object
**Required:** Optional structurally; page-specific description expected before approval

| Concern                     | Editorial purpose                                                                                               | Validation                                                                                                                                       | Privacy considerations                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Search and social overrides | Provides a natural page title, description, and optional sharing image while retaining Site Settings fallbacks. | Reuse existing limits and URL validation; warn when an Approved document lacks a meta description; social image inherits `editorialImage` rules. | Do not expose private history, sensitive location detail, unverifiable claims, or unapproved photography. |

Do not create House-specific SEO fields or duplicate the social image model.

## 10. Workflow status

**Field name:** `workflowStatus`
**Type:** `string`
**Required:** Yes

| Allowed value | Purpose                                                                      |
| ------------- | ---------------------------------------------------------------------------- |
| `draft`       | Content or photography is incomplete.                                        |
| `inReview`    | Public wording, facts, privacy, rights, and presentation are being reviewed. |
| `approved`    | Editorial review is complete; this does not publish the document.            |

Reuse the existing workflow field helper and initial value `draft`. Do not add a House-only status.
An Approved state should trigger document-level validation for the required sections, Hero image,
SEO description, material-entry eligibility, and last-reviewed date.

Workflow status must never imply that private source notes, image rights, or technical evidence are
safe to publish. Those checks remain explicit editorial responsibilities.

## 11. Last reviewed date

**Field name:** `lastReviewedAt`
**Type:** `datetime`
**Required:** Optional in Draft and In Review; required when Approved

The date records the latest material factual and privacy review—not a copy edit or document-open
event. Validation should reject a future date and require a value when `workflowStatus` is
`approved`. The Studio should warn when the date becomes stale according to the existing editorial
warning policy.

This date is governance metadata. It need not appear publicly unless a future approved page design
calls for it.

## Proposed structural outline

```text
housePage (singleton document)
├── hero
│   ├── eyebrow
│   ├── title
│   ├── introduction
│   └── image — editorialImage
├── openingReflection
│   ├── heading
│   └── body
├── sharedHeart
│   ├── heading
│   ├── body
│   └── images[] — editorialImage (1–2)
├── view
│   ├── image — editorialImage
│   ├── caption
│   └── verificationNotes — Studio-only, excluded from frontend query
├── indoorOutdoorStory
│   ├── heading
│   ├── body
│   └── images[] — houseStoryImage (1–3)
├── dailyRhythms
│   ├── morning — optional dailyRhythmMoment
│   ├── rain — optional dailyRhythmMoment
│   └── evening — optional dailyRhythmMoment
├── materialsAndArchitecture — optional
│   ├── heading
│   ├── body
│   └── materials[] — houseMaterialEntry (confirmed only)
├── closingReflection
│   └── body
├── seo — existing seo object
├── workflowStatus — existing workflow convention
└── lastReviewedAt — existing review-date convention
```

## `HousePageData` compatibility strategy

Sanity content should be mapped into the existing local frontend type through one typed query and
one adapter. The query must not be spread across components.

| Existing frontend shape | Proposed CMS source        | Mapping behavior                                                                                                                                  |
| ----------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hero`                  | `hero`                     | Direct text mapping; convert shared image to frontend media and add code-owned presentation props.                                                |
| `openingReflection`     | `openingReflection`        | Map heading/body; retain code-owned eyebrow.                                                                                                      |
| `sharedLiving`          | `sharedHeart`              | Map text and first image; retain code-owned eyebrow and media layout. Support the second image when the approved frontend composition accepts it. |
| `view`                  | `view`                     | Map image/caption; retain code-owned eyebrow, heading, and fallback body. Never map verification notes.                                           |
| `indoorOutdoor`         | `indoorOutdoorStory`       | Convert ordered role-based images to photo-essay items; retain code-owned eyebrow and ratios.                                                     |
| `dailyRhythms`          | `dailyRhythms`             | Convert present Morning/Rain/Evening fields to an ordered item array and omit absent moments.                                                     |
| `materials`             | `materialsAndArchitecture` | Map only confirmed entries and set the frontend guard to confirmed; do not expose internal verification notes.                                    |
| `finalReflection`       | `closingReflection`        | Map body directly.                                                                                                                                |

The adapter should return `null` for a section that cannot be rendered safely. The page can then
omit optional sections without empty headings, broken media, or development placeholders.

## Privacy boundary

The `housePage` document is not a source archive. The following must remain outside it:

- the private meaning or origin of the Joshua name;
- private family relationships, histories, memories, and identifying context;
- unapproved guest stories or identifiable photographs;
- interview transcripts and raw owner notes;
- precise coordinates, access routines, security details, or operational vulnerabilities;
- contracts, plans, invoices, technical certificates, consent forms, and image-rights evidence;
- disputed or unverified architectural and material terminology.

Public architect collaboration may be described only as a shared vision between owner and
architect. Preferred credits for VBO Architects + Engineers, Mary Neil E. Velasco Bocalid, and
Tobias Steger require final spelling, role, placement, and publication approval before public use.

## Decisions to confirm before schema implementation

1. Confirm whether the View section should be publishable only after its currently missing image is
   approved, or temporarily omitted from the page.
2. Confirm whether the optional second Shared Heart image will be supported in the first CMS-backed
   frontend adapter.
3. Confirm that section eyebrows not listed in this model remain code-owned.
4. Confirm whether Daily Rhythm moments need an editor-facing caption override beyond the caption
   already carried by `editorialImage`.
5. Confirm who can declare a material entry verified and therefore eligible for the public array.
6. Confirm the storage location and access policy for evidence, rights records, and private source
   notes kept outside `housePage`.
7. Confirm the preferred public credit and roles for the architecture collaboration before those
   names enter website content.

No schema, query, frontend component, or content migration should be created until these decisions
and this proposal are approved.
