# Joshua's Point — The House Redesign Audit

**Document type:** Internal editorial and implementation audit  
**Route reviewed:** `/the-house`  
**Status:** Pre-implementation review  
**Public website copy:** No

## Purpose

This audit compares the current House page with the approved principles in
`JOSHUA_POINT_HOUSE_SOUL.md` and the section requirements in `THE_HOUSE_CONTENT_MAP.md`. It identifies
what can remain, what must change, and what cannot be published until owner source and factual
verification exist.

The page is evaluated against three protected feelings:

- **Homy** — lived in, welcoming, personal without exposing private life.
- **Connected to nature** — architecture and people remain in relationship with weather, light,
  land, sea, and mountains.
- **Peaceful** — quiet confidence, visual space, and no pressure or spectacle.

The audit does not approve the current prose as fact. Existing text is treated as placeholder copy
unless its principle is independently established in the House Soul.

## Scope reviewed

- `docs/JOSHUA_POINT_HOUSE_SOUL.md`
- `docs/THE_HOUSE_CONTENT_MAP.md`
- `web/src/app/the-house/page.tsx`
- Shared editorial components currently imported or suitable for migration

No private origin material is needed for the redesign. The origin of the Joshua's Point name and
private details about the owners remain outside public scope.

---

## 1. Current page strengths

### Editorial restraint

The current page contains no booking prompt, price, testimonial, feature grid, availability module,
or promotional claim. Its short passages and large visual pauses already avoid the behavior of a
property brochure.

**Protected feelings:** Peaceful is strong. Homy is only lightly present because lived experience is
largely absent.

### Clear reading sequence

The page moves through:

1. Hero introduction
2. Narrow editorial introduction
3. Panoramic visual pause
4. Asymmetrical architecture story
5. Material treatment
6. Final reflection

This progression is calm and understandable. It provides a useful foundation for the approved
eight-section redesign without requiring a different page framework.

### Generous whitespace and calm typography

Large vertical intervals, narrow reading widths, Newsreader display typography, and restrained body
copy create an unhurried pace. The page does not crowd the visitor with information.

**Protected feelings:** Peaceful is well supported.

### Photography-first intent

The panoramic and portrait media positions reserve meaningful space for future photography. Images
are not contained in cards and text is not placed over them. The media proportions already support
an architecture-journal direction.

**Protected feelings:** Connected to nature is structurally possible, although no real photography
currently proves it.

### Semantic foundation

The implementation uses a single `<main>`, labelled sections, a logical heading hierarchy,
`<figure>`, and `<figcaption>`. Placeholder media is hidden from assistive technology through the
shared `EditorialMedia` behavior.

### Server-rendered simplicity

The page is a Server Component with no state, interaction, animation, third-party script, or client
dependency. This is the correct technical baseline for the redesign.

---

## 2. Current sections that align with the House Soul

Alignment below refers to purpose and structure, not factual approval of current wording.

| Current section        | Homy              | Connected to nature | Peaceful | Audit conclusion                                                                                                           |
| ---------------------- | ----------------- | ------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| Editorial Hero         | Partial           | Strong in intent    | Strong   | Keep the restrained opening pattern; add photography immediately after it and replace unverified introduction text.        |
| Editorial Introduction | Weak to partial   | Strong in intent    | Strong   | Keep narrow reading width and whitespace; redirect the content toward a real sense of home once owner source exists.       |
| Full-width Photography | Not yet evidenced | Strong              | Strong   | Keep as the principal visual pause. Replace the placeholder and unverified caption with verified photography and context.  |
| Architecture Story     | Partial           | Strong              | Strong   | The threshold-based composition aligns well. Its claims about shade, heat, rooflines, and every room require verification. |
| Materials              | Partial           | Partial             | Strong   | The tactile editorial rhythm is useful, but current material subjects and descriptions are not verified.                   |
| Final Reflection       | Partial           | Strong              | Strong   | Keep the text-only closing form. Rewrite only after a real, public-safe owner observation is approved.                     |

### Structural concepts worth carrying forward

- Text that leaves room for photography.
- A panoramic view section without overlays.
- Asymmetry for architecture and threshold storytelling.
- A dark tonal chapter for tactile or architectural material.
- A concise text-only ending.
- No CTA within the House narrative.

### Missing House Soul dimensions

The current page does not yet give sufficient space to:

- The living room, kitchen, and dining area as the shared heart of the house.
- The feeling of coming home.
- The deck as a lived threshold.
- Open sliding doors in ordinary use.
- The pool's relationship with the deck, house, and view.
- Morning, rain, and evening as distinct lived conditions.
- Friends and family gathering without becoming a party narrative.

These are approved additions to the editorial structure, not permission to invent the experiences
that will fill them.

---

## 3. Content that should be removed or rewritten

### Metadata

Current description:

> An architectural home shaped by the ridge, the sea, and the changing light.

**Audit:** “Ridge” and the specific relationship implied by “shaped by” require verification. The
metadata should later be rewritten from approved public content and must not outrun the evidence on
the page.

### Hero introduction

Current introduction:

> A home shaped by the ridge, the sea, and the changing conditions between them.

**Audit:** The principle aligns with the House Soul, but the ridge and design-causation claims are
not verified. Replace after owner and architectural review. Do not retain it merely because it
sounds appropriate.

### Editorial introduction

Current heading:

> Architecture that begins with attention.

**Audit:** This is an editorial proposition rather than a fact, but it remains generic and does not
yet communicate “Homy.” Its future replacement should be grounded in an owner observation.

Current body:

> Joshua’s Point follows the land rather than correcting it. Rooms unfold along the slope, opening
> to weather, shade, and the long horizon of the Bohol Sea.

**Audit:** Remove from the redesign unless every architectural and geographical statement is
verified. “Follows the land rather than correcting it” implies design intent. “Slope,” “shade,” and
“Bohol Sea” are factual claims. The passage currently sounds authoritative without a recorded
source.

### Panoramic caption

Current caption:

> The main living space opens across the ridge toward the morning horizon.

**Audit:** Rewrite only after the photograph, viewpoint, orientation, and visible geography are
known. “Morning horizon” may imply a verified sunrise direction.

### Architecture story

Current image caption:

> Deep shade and open thresholds temper the heat throughout the day.

**Audit:** Remove until measured or architecturally verified. This is an environmental-performance
claim rather than a purely visual observation.

Current heading:

> Drawn from its site.

**Audit:** The principle aligns with the House Soul but implies design process and intent. Retain
only if supported by the owner, architect, or project documentation.

Current body:

> Walls frame rather than contain. Rooflines extend into shade, thresholds remain open, and each
> room keeps a direct relationship with the landscape beyond it.

**Audit:** The first sentence closely reflects an approved philosophy. The remaining statements
make factual claims about rooflines, thresholds, and every room. Rewrite as verified observation or
approved design intent. Avoid universal words such as “each” unless they are literally true.

### Materials

Current subjects and descriptions:

- Timber
- Stone
- Light
- Air

**Audit:** Remove the current descriptions from public use. Timber and stone require material
verification. Light and air may remain experiential subjects, but the project must decide whether
they belong under a section called Materials. Current statements about grain, morning color,
underfoot connection, reflected light, and air moving through open rooms are not sourced owner
observations.

### Final reflection

Current passage:

> The house is most itself when the doors are open, the weather is moving through, and the horizon
> becomes part of the room.

**Audit:** Its direction strongly aligns with the House Soul, but it assumes when doors are open and
how weather moves through the house. Replace with a real, public-safe observation after owner source
gathering. Do not treat poetic plausibility as evidence.

---

## 4. Claims that require verification

| Current or implied claim                                  | Verification needed                                 | Appropriate source                                 |
| --------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------- |
| The house is on or shaped by a ridge                      | Topography and design relationship                  | Owner, site plan, architect                        |
| The house follows the land rather than correcting it      | Original design intent and site work                | Architect, owner, construction records             |
| Rooms unfold along a slope                                | Actual plan and levels                              | Drawings, site observation                         |
| The visible sea is the Bohol Sea                          | Geographic identification                           | Map review plus owner confirmation                 |
| The view faces a morning horizon                          | Orientation and actual sunrise relationship         | Compass/map verification and repeated observation  |
| The main living space opens across the ridge              | Spatial and geographic relationship                 | Site observation, plan, photography                |
| Deep shade tempers heat throughout the day                | Shading behavior and thermal performance            | Architect plus seasonal observation or measurement |
| Open thresholds temper heat                               | Ventilation and thermal behavior                    | Architect plus observation or measurement          |
| Rooflines extend into shade for a particular purpose      | Roof design and intent                              | Architect, drawings                                |
| Thresholds remain open                                    | Real operating behavior under varying conditions    | Owner observation                                  |
| Every room has a direct landscape relationship            | Room-by-room review                                 | Plan and site observation                          |
| Timber is a defining material                             | Species, application, source, and actual prominence | Owner, architect, contractor, supplier records     |
| Stone is used underfoot                                   | Material and exact location                         | Drawings, specification, site observation          |
| Light is filtered and reflected in described ways         | Actual direction, time, and surfaces                | Repeated photographic observation                  |
| Air moves freely through open rooms                       | Ventilation behavior and conditions                 | Owner, architect, seasonal observation             |
| Doors are normally open                                   | Daily operation and weather limitations             | Owner observation                                  |
| The pool visually or functionally connects to the horizon | Actual placement and lived use                      | Site observation, owner, architect                 |

### Verification standard

- Memory may support a clearly framed personal observation.
- Geography, materials, authorship, dimensions, building systems, and environmental performance
  require factual confirmation.
- Design intent should be attributed to the architect or supported by contemporaneous documentation.
- Seasonal behavior should not be generalized from one photograph or one day.
- Unknown claims should be omitted rather than softened into ambiguity.

---

## 5. Existing components worth keeping

### `TheHousePage` as a Server Component

Keep the page server-rendered. No approved redesign requirement needs client state or interaction.

### `SiteHeader`

Keep the current solid header integration and active `/the-house` state. Navigation behavior is
outside this redesign.

### Global `SiteFooter`

Keep the footer inherited from the root layout. No House-specific footer is needed.

### `EditorialPageHero`

Keep the restrained type hierarchy and editorial opening behavior. Pair it immediately with a
large photograph rather than replacing it solely to create a conventional image-overlay hero.

### `EditorialMedia`

Keep as the image foundation. It already supports:

- `next/image`
- Landscape, panoramic, and portrait ratios
- Responsive `sizes`
- Image preloading
- Blur placeholders
- Object positioning
- Accessible decorative placeholders

### Semantic figure and caption pattern

Keep `<figure>` and `<figcaption>`, but move their repeated implementation into a shared component.

### Metadata export

Keep the page-level metadata pattern. Replace its values only after approved public content exists.

### Editorial visual choices

Keep:

- Newsreader and Manrope.
- Linen and charcoal atmospheres.
- Large vertical intervals.
- Narrow reading measures.
- Photography without card treatment or overlays.
- A text-only closing reflection.

---

## 6. Components that should be replaced

### Hand-coded container and spacing markup

The current page manually repeats responsive padding, maximum widths, and twelve-column layouts.
Replace these implementations with:

- `EditorialContainer`
- `EditorialGrid`
- `SectionSpacing`
- `EditorialText`

This is a structural migration, not a visual redesign of the shared system.

### Repeated figure markup

Replace the local `EditorialMedia` plus caption wrappers with a proposed shared `EditorialFigure`.
It should own semantic figure structure, media behavior, optional caption, caption alignment, sizes,
and preload settings.

### Current architecture-story composition

Replace the page-specific grid with a reusable `EditorialMediaStory` supporting controlled image
placement, text width, caption, and asymmetry. The current visual idea is worth keeping; its markup
should not remain unique to this page.

### Current materials block

Replace the inline `materials` array and bespoke `<dl>` mapping with a typed `HouseMaterialsList`.
The component should render only confirmed entries and remain specific to House content unless
another page proves that the pattern is shared.

### Missing photography sequences

Introduce a constrained `EditorialPhotoEssay` for the approved two- or three-image compositions.
Use it within House-specific `IndoorOutdoorSection` and `DailyRhythmSection` Server Components.
Avoid a generic gallery or page-builder API.

### Hardcoded page content

Move section data out of repeated JSX into one typed House page data structure. This creates a clear
future mapping to Sanity without connecting the CMS during the redesign.

---

## 7. Photography gaps

The current page contains no actual photography. Both `EditorialMedia` instances render atmospheric
placeholders. The redesign therefore cannot yet prove its central editorial claim that nature is
the hero.

### Required image set

| Image                      | Editorial role                                                        | Preferred format            | Source status                 |
| -------------------------- | --------------------------------------------------------------------- | --------------------------- | ----------------------------- |
| House within the landscape | Opening relationship between land and house                           | Panoramic or wide landscape | Missing                       |
| Connected living spaces    | Living, kitchen, dining, deck, and outside in one honest relationship | Landscape                   | Missing                       |
| The view                   | Uninterrupted visual pause from a real house viewpoint                | Panoramic                   | Missing                       |
| Open threshold             | Sliding doors and movement between inside and outside                 | Portrait                    | Missing                       |
| Deck or roof edge          | Shelter, material, weather, and threshold detail                      | Portrait or detail          | Missing                       |
| House–deck–pool–landscape  | Pool as part of the wider composition                                 | Landscape                   | Missing                       |
| Morning                    | Real morning light or routine                                         | Landscape or portrait       | Missing                       |
| Rain                       | House experienced during rain                                         | Landscape                   | Missing                       |
| Evening                    | Interior and exterior relationship after daylight                     | Landscape                   | Missing                       |
| Verified material details  | Touch, weathering, joinery, light, and air                            | Detail series               | Pending material verification |

### Photography risks

- A façade-only hero would make the house, rather than nature, the subject.
- Aerial images used for spectacle would work against Homy and Peaceful.
- Wide-angle distortion would make the page about size.
- Empty, immaculate interiors could make the house feel uninhabited.
- Staged groups could make shared life feel commercial or party-oriented.
- Perfect-weather-only coverage would erase rainy days and ordinary conditions.
- Reusing one strong image in several sections would weaken the editorial rhythm.
- Unverified captions could turn photography into a source of factual error.

### Capture requirements

- Record date, time, weather, viewpoint, visible landmarks, and photographer credit.
- Capture responsive compositions or safe focal positions.
- Obtain consent and publication scope for every identifiable person.
- Produce accurate alt text from the final selected crop.
- Use natural color and restrained editing.
- Photograph real use only when it can be documented without exposing private life.

---

## 8. Recommended migration plan

### Phase 1 — Protect the source boundary

1. Treat the current prose as provisional.
2. Keep private origin and family material outside the public data structure.
3. Create a claim ledger from the verification table above.
4. Confirm which owner observations may become public source.

**Exit condition:** Every retained factual statement has a named verification path.

### Phase 2 — Gather owner source

Work through the eight sections in `THE_HOUSE_CONTENT_MAP.md`. For each owner response:

1. Preserve the original wording.
2. Extract facts and emotional details.
3. Mark verification needs.
4. Confirm privacy boundaries.
5. Approve whether the material is internal-only or eligible for public editing.

**Exit condition:** Each text-bearing section has enough real source to brief a writer without
inventing transitions or atmosphere.

### Phase 3 — Prepare photography

1. Create a shot list from the approved source material.
2. Verify geography, spatial relationships, and material names before captioning.
3. Capture the house in morning, rain, evening, and ordinary shared use.
4. Review privacy, consent, cropping, alt text, and caption facts.

**Exit condition:** The minimum photography set supports the full page without repeating images or
using stock.

### Phase 4 — Build shared editorial components

In a focused frontend milestone:

1. Add `EditorialFigure`.
2. Add `EditorialMediaStory`.
3. Add a constrained `EditorialPhotoEssay`.
4. Add `HouseMaterialsList` and the two House-specific section components.
5. Verify that every component remains server-rendered.

**Exit condition:** Components work with typed placeholder data and introduce no new dependency or
unnecessary client JavaScript.

### Phase 5 — Recompose `/the-house`

1. Replace manual layout markup with the Editorial Layout System.
2. Implement the approved eight-section order.
3. Use clearly identified visual placeholders where photography is still missing.
4. Omit unsupported captions and claims rather than publishing provisional text as fact.
5. Preserve the global Header and Footer.

**Exit condition:** The redesigned structure is responsive, accessible, and visually reviewable
without being mistaken for final editorial content.

### Phase 6 — Editorial writing and approval

1. Draft only from approved owner source and verified facts.
2. Review every section against Homy, Connected to nature, and Peaceful.
3. Remove language that sounds generic, architectural for its own sake, or sales-led.
4. Run owner, privacy, factual, accessibility, and caption review.

**Exit condition:** The owner approves the complete page as truthful and public-safe.

### Phase 7 — Sanity mapping

After the static editorial experience is approved:

1. Extend `housePage` with explicit named fields from the Content Map.
2. Reuse `editorialImage`, SEO, and workflow objects.
3. Avoid a generic `sections[]` page builder.
4. Add centralized typed GROQ and graceful omission of incomplete sections.
5. Migrate only approved public content into the CMS.

**Exit condition:** Sanity controls the approved page without storing private editorial source or
changing its visual composition.

---

## Audit conclusion

The current House page is visually restrained, semantically sound, and technically simple. Its
largest weakness is not layout quality but evidentiary depth: it describes a plausible architecture
story without recorded owner source, verified facts, or real photography.

The redesign should preserve the quiet framework while replacing assertion with observation. Homy
must come from lived details, Connected to nature must be proven by real relationships and images,
and Peaceful must remain present in the spacing, typography, pacing, and absence of sales pressure.

Frontend implementation can begin only as a clearly provisional structural composition. Final
public writing should wait until owner source gathering and verification are complete.
