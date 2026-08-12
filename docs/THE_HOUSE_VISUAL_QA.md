# Joshua's Point — The House Visual QA

**Document type:** Internal visual quality review
**Route reviewed:** `/the-house`
**Photography stage:** Temporary development assets
**Status:** Component- and asset-level QA complete; live viewport confirmation still required
**Public website copy:** No

## Purpose

This document reviews the House page after development photography was added. It evaluates the
current composition against the protected Joshua's Point feelings:

- **Homy**
- **Connected to nature**
- **Peaceful**

It does not approve the photographs as production assets, verify their factual context, or assess
the provisional copy as finished writing.

## QA basis and limits

The review includes:

- Visual inspection of all ten unique development photographs at their available resolution.
- The final `/the-house` Server Component tree.
- Image roles, ratios, crop behavior, `sizes`, and preload settings.
- Desktop, tablet, and mobile grid and spacing rules.
- The production build output confirming that `/the-house` renders statically.
- The approved House Soul, Content Map, first review, photography brief, and selection board.

A live browser capture was unavailable in this review environment. Desktop, tablet, and mobile
findings are therefore based on the exact responsive implementation and inspected source images,
not pixel-level screenshots. Crop position, fold position, final perceived scale, and real-device
color must be confirmed in a later viewport pass. Findings that depend on that pass are labelled
**Confirm live**.

---

## Executive assessment

The page is materially stronger with photography. It now demonstrates interior warmth and the
movement between sheltered rooms and outside space instead of only describing those intentions.
The strongest sequence is Shared Heart into Indoor/Outdoor. That part of the page begins to feel
specific to Joshua's Point.

The page is not yet visually complete. Its central nature-led pause, **The View**, is still a large
placeholder. **Morning** and **Rain** are also placeholders, leaving the dark Daily Rhythms chapter
visually unresolved. The current Hero is useful development photography but remains pool-led rather
than a definitive house-within-landscape opening.

| Protected feeling   | Current assessment                                | Reason                                                                                                                                                                          |
| ------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homy                | Improved; still partial                           | Shared Heart and warm interior thresholds provide real domestic scale. Owner-sourced moments and optional human presence remain absent.                                         |
| Connected to nature | Strongest in Indoor/Outdoor; incomplete overall   | The open-threshold and deck images demonstrate real relationships, but the missing View and Rain photographs leave the central promise unproven.                                |
| Peaceful            | Structurally strong; rhythm currently interrupted | Typography, whitespace, and lack of interaction remain calm. Large placeholders, repeated pool imagery, and very long vertical intervals can feel unfinished rather than quiet. |

---

## 1. Desktop composition

### What works

- The Hero image has enough scale to establish photography as a primary part of the page.
- Shared Heart uses the asymmetric editorial composition well: the broad interior image and narrow
  text column have distinct visual weight.
- The Indoor/Outdoor essay benefits from its staggered twelve-column layout. The open living-room
  threshold leads, the covered deck becomes a smaller secondary observation, and the pool image
  closes the sequence at a wider scale.
- The shift into charcoal for Daily Rhythms creates a clear chapter change.
- Text widths remain controlled even when the media fields are large.
- The closing reflection retains a quiet, narrow measure before the footer.

### Risks

- The Hero uses a reduced `1086 × 724` derivative in a full-width field with a desktop minimum
  height of `48rem`. The image will be enlarged beyond its native dimensions on common desktop
  displays. Softness, compression, and sharpening artifacts are likely. **Confirm live.**
- The Hero composition is led by pool, terrace, and bright daytime color. It communicates the
  setting better than the other current exterior frames, but it can still read as property
  photography rather than a quiet arrival within the land.
- The bottom spacing after the Hero image and the top spacing before Opening Reflection combine into
  an exceptionally large interval at the desktop breakpoint. The two sections may stop reading as
  one opening composition. **Confirm live.**
- The View placeholder occupies a full-width panoramic field with a `48rem` minimum height. Because
  it follows a real Shared Heart photograph, the placeholder becomes more conspicuous than it was
  on the all-placeholder page.
- Three warm, high-detail Indoor/Outdoor photographs appear in one chapter. The stagger prevents a
  grid feeling, but timber-toned surfaces, deck lines, seating, and pool references recur quickly.
- Daily Rhythms begins with a very large placeholder, then a portrait placeholder, and only then an
  Evening photograph. The chapter's strongest image arrives last and at the smallest desktop span.
- Materials uses immersive vertical spacing despite rendering no confirmed material list or
  material photograph. It will feel visually under-resolved after the image-heavy chapters above.

### Desktop decision

The asymmetric architecture is sound. Desktop readiness is blocked primarily by image completion
and source resolution, not by the grid system. The first live QA should focus on the Hero crop and
sharpness, the Hero-to-Opening distance, the View placeholder height, and the perceived weight of
the two photo essays.

---

## 2. Tablet composition

Tablet behavior is defined by the single-column layout below the `lg` breakpoint, with shared
gutters increasing from `2rem` to `2.5rem` and section spacing using the `sm` values.

### What works

- Content becomes linear and easy to follow without introducing a separate tablet composition.
- Shared Heart keeps the photograph before its text, preserving the photography-first hierarchy.
- Full-width Hero and View media remain distinct from contained editorial sections.
- The three Indoor/Outdoor images retain their full landscape proportions rather than being forced
  into narrow portrait crops.
- Heading sizes remain restrained relative to desktop.

### Risks

- Desktop asymmetry disappears before `1024px`. Shared Heart and both essays become long vertical
  sequences, placing more responsibility on image variety and spacing.
- The Indoor/Outdoor essay contains three consecutive landscape images at nearly the same apparent
  width. Their different desktop positions no longer help distinguish them.
- The Daily Rhythms section also becomes a linear sequence: landscape placeholder, tall portrait
  placeholder, then landscape Evening photograph. This is likely the weakest tablet passage.
- The `sm` immersive spacing applies `10rem` above and below major sections. Combined with the
  `8rem` gap before each photo essay, the page may feel exceptionally long even before final copy or
  captions are added.
- The current Hero source has limited resolution for a wide tablet display, especially on a
  high-density screen.

### Tablet decision

The layout should remain legible and stable, but its rhythm is not yet proven. **Confirm live** at a
tablet portrait width just below `1024px` and at landscape width just above it; the sudden change
from one column to twelve columns is the most important breakpoint transition on the page.

---

## 3. Mobile composition

### What works

- The reading order remains logical and semantic.
- Six-column-equivalent mobile gutters are consistent across text sections.
- Body and heading measures remain readable.
- Landscape development photographs avoid the severe portrait crops that the earlier placeholder
  configuration would have imposed.
- No overlays, interactions, animations, or competing calls to action obscure the images.

### Risks

- The panoramic Hero field has a mobile minimum height of `24rem`. On a narrow phone this is much
  taller than a natural `16:9` frame, so `object-cover` will crop the left and right sides of the
  `3:2` source. The current Hero depends on architecture at the left and landscape toward the right;
  a centered crop may weaken the intended relationship. **Confirm live at 320px and 390px widths.**
- No mobile focal position has been recorded for the Hero or other development images.
- The first visual chapter is long: large Hero typography, full-width tall media, generous bottom
  spacing, then another generously padded Opening Reflection.
- Indoor/Outdoor becomes three same-width landscape images separated only by the shared grid gap.
  Without captions, the distinct editorial jobs may not be self-evident on a small screen.
- Daily Rhythms adds one landscape placeholder, one portrait placeholder with a `32rem` minimum
  height, and one landscape image. The absent Rain photograph creates the single longest visibly
  unfinished moment.
- Because the Morning image has been reassigned to Hero, the mobile reader encounters two empty
  fields before reaching the Evening photograph.
- Materials creates a large text-and-whitespace chapter with no confirmed list after an already
  long image sequence.
- The complete route is likely to feel substantially longer on mobile than its text volume would
  suggest.

### Mobile decision

Mobile is the highest-risk presentation. The component structure is responsive, but the emotional
experience cannot be approved until the Hero crop, placeholder heights, three-image Indoor/Outdoor
sequence, Daily Rhythms length, and Materials spacing are inspected on real narrow viewports.

---

## 4. Image rhythm

Current rendered sequence:

1. Hero — real pool, terrace, vegetation, and landscape image.
2. Shared Heart — real kitchen, dining, and living image.
3. The View — panoramic placeholder.
4. Open threshold — real living-room-to-deck image.
5. Deck and roof — real covered deck image.
6. Pool relationship — real house, deck, and pool image.
7. Morning — landscape placeholder.
8. Rain — portrait placeholder.
9. Evening — real pool, room, deck, and evening image.

### Strong rhythm

- Hero to Shared Heart moves from outside context to domestic interior.
- Shared Heart to Open threshold moves from shared room to its relationship with the outside.
- The Indoor/Outdoor images progress from interior threshold to shelter to wider exterior
  relationship.
- Evening introduces a needed cooler, darker atmosphere after several bright and timber-toned
  images.

### Weak rhythm

- Real photography and placeholders alternate in a way that reveals the development state rather
  than creating an editorial sequence.
- The missing View interrupts the most important transition from domestic interior back to nature.
- Pool water appears in the Hero, Indoor/Outdoor closing image, and Evening image. This repetition
  risks making the page feel accommodation-led rather than landscape-led.
- Warm timber-toned planes, linear screens, deck boards, and seating recur across Shared Heart and
  all three Indoor/Outdoor images.
- Morning and Rain contribute only shape and gradient, not observation. The Evening image must carry
  the entire Daily Rhythms chapter alone.
- The development photographs share a bright, polished property-photography treatment. The page
  gains specificity but still needs quieter, more observational imagery to reach the intended
  architecture-journal character.

### Image-rhythm decision

The current sequence is useful for development but should not be frozen. The next image review must
happen as one continuous page sequence, not as independent strongest-image choices. A photograph
should be removed when it repeats water, deck, timber, or viewpoint without adding a new lived
relationship.

---

## 5. Section spacing and transitions

### Strong transitions

- Linen Hero to full-width photography creates a clear opening statement.
- Stone Shared Heart adds warmth without introducing a card surface.
- The charcoal Daily Rhythms chapter creates the strongest tonal pause on the page.
- Stone Closing Reflection provides a gentle return from the darker chapter and Materials section.

### Spacing concerns

- **Hero → Opening Reflection:** likely too distant because generous bottom space follows the Hero
  photograph and generous block spacing begins the reflection. This is the first spacing issue to
  confirm live.
- **Shared Heart → The View:** structurally strong, but the large View placeholder currently turns a
  pause into an interruption.
- **Indoor/Outdoor essay:** the introductory text receives substantial separation before three more
  large photographs. It may feel appropriately editorial on desktop but extended on tablet and
  mobile.
- **Indoor/Outdoor → Daily Rhythms:** both are immersive, media-heavy chapters. The color boundary is
  strong, but the overall sequence offers little true silence between six reserved image roles.
- **Daily Rhythms → Materials:** the shift from dark atmosphere to procedural verification content
  is abrupt. Materials has extensive space but little visual or factual content.
- **Materials → Closing:** both sections are text-led and spacious. Until Materials has content, the
  final portion may feel like two endings.

### Sections needing more silence

- **The View:** once real photography exists, this should provide the page's clearest visual silence.
  The photograph, rather than production-status language or additional imagery, should carry the
  interval.
- **Between Inside and Outside:** consider whether all three images remain necessary after the View
  is added. Removing a repetitive pool or deck image may create more useful silence than increasing
  spacing.
- **Daily Rhythms:** each retained moment needs room to register. Two complete moments may feel more
  peaceful than three roles maintained for symmetry.
- **Closing Reflection:** its present text-only composition already provides appropriate silence;
  protect it from added photography or promotional content.

Silence should come from fewer complete ideas, not simply larger padding values.

---

## 6. Emotional flow

## Homy

### What supports it

- Shared Heart is the strongest improvement. Kitchen, table, seating, lighting, and connected room
  use make the house feel inhabitable.
- The open-threshold and covered-deck photographs show places where time can be spent rather than
  isolated architectural features.
- Evening brings interior warmth into relation with the outside.

### What weakens it

- The Hero, pool relationship, and Evening photographs all contain pool-led visual language that
  can lean toward a conventional accommodation presentation.
- No owner-sourced lived detail or approved human moment appears visually.
- The Shared Heart table setting may feel staged; ordinary-use status still needs owner
  confirmation.
- Materials and Closing remain visibly provisional rather than emotionally resolved.

### Assessment

Homy is now visible in the middle of the page but not yet sustained from arrival to closing.

## Connected to nature

### What supports it

- The Hero includes substantial vegetation and open sky.
- The open-threshold image is the clearest proof of interior life opening toward deck, pool, trees,
  and distance.
- The covered deck image shows shelter immediately beside dense vegetation.
- Evening keeps trees and sky present alongside the lit room.

### What weakens it

- The defining View photograph is absent.
- The Hero shows only part of the house and remains visually centered on pool and terrace.
- No rain image demonstrates the house under changing weather.
- No distinct verified Morning image remains after its current candidate was assigned to Hero.
- The current sequence shows nature most often through a pool-and-deck foreground rather than
  through land, weather, sea, mountains, or uninterrupted distance.

### Assessment

Connected to nature is persuasive at the threshold scale but incomplete at the landscape and
weather scales.

## Peaceful

### What supports it

- Calm typography, narrow reading widths, large fields, and restrained surfaces remain intact.
- Images have no overlays, captions, controls, galleries, animation, or CTA pressure.
- The page maintains a slow, linear reading order.
- The dark Evening image gives the visual sequence a natural point of rest.

### What weakens it

- Excessive space can read as disconnection rather than calm, particularly around the opening and
  Materials.
- Large placeholders make the visitor conscious of unfinished production.
- Repeated pool, deck, seating, and warm timber imagery creates visual insistence.
- On mobile, page length may exhaust attention before the final reflection.
- Bright, polished development imagery has more property-listing energy than the quieter final
  editorial direction requires.

### Assessment

Peaceful remains the strongest structural feeling, but true quiet will depend on reducing repetition
and replacing placeholders with distinct observed conditions.

---

## 7. Section-by-section QA

| Section                    | Current strength                                                                    | Current weakness                                                                            | Visual status                                                   |
| -------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Hero                       | Introduces real landscape, vegetation, water, and architecture at meaningful scale. | Pool-led, partial house context, reduced source resolution, and risky centered mobile crop. | Development-ready; definitive Hero still missing.               |
| Opening Reflection         | Narrow measure and whitespace create intimacy.                                      | Likely too far from the Hero image; still relies entirely on provisional text.              | Structure strong; live spacing check required.                  |
| Shared Heart               | Strongest expression of homy; kitchen, dining, and living read together.            | Outside connection is weak and table setting may be staged.                                 | Strong candidate; verification and source original required.    |
| The View                   | Full-width architecture reserves a strong visual pause.                             | No photograph; largest interruption in the page's emotional logic.                          | Blocked by missing photography.                                 |
| Between Inside and Outside | Strongest overall visual chapter; real threshold, shelter, and pool relationships.  | Three similar warm architectural images may repeat deck, timber, seating, and water.        | Strong development sequence; final image-count review required. |
| House Through the Day      | Charcoal surface and Evening image create atmosphere.                               | Morning and Rain are empty; Evening carries the chapter alone.                              | Weakest completed chapter; blocked by photography.              |
| Materials and Architecture | Honest restraint avoids false material claims.                                      | No material story or image renders; immersive space feels procedural and incomplete.        | Blocked by verification; photography candidate also unresolved. |
| Closing Reflection         | Quiet text-only ending and stone transition support peacefulness.                   | Emotional closure still depends on provisional process text rather than approved source.    | Visual form strong; editorial source pending.                   |

---

## 8. Required issue lists

## Sections that feel too weak

1. **The View** — no image for the page's central nature-led pause.
2. **House Through the Day** — two placeholders and one photograph cannot establish a real daily
   rhythm.
3. **Materials and Architecture** — no confirmed list or image; spacing exceeds current content.
4. **Hero** — useful but not definitive; it does not fully establish house within land.
5. **Closing Reflection** — visually calm but not yet supported by approved lived content.

## Sections that feel repetitive

1. **Hero and Pool relationship** — both are bright pool-and-house compositions.
2. **Pool relationship and Evening** — pool, deck, loungers, and rooms recur, with time of day as the
   principal difference.
3. **Shared Heart and Open threshold** — both emphasize warm interior planes and seating; their
   editorial jobs are different, but sequence placement needs live confirmation.
4. **Indoor/Outdoor as a whole** — three images repeat deck lines, timber-toned surfaces, seating,
   and openings.
5. **Materials and Closing** — currently two long text-led closing movements without intervening
   verified content.

## Sections needing more silence

1. **The View** — needs a real image capable of carrying the section with minimal explanation.
2. **Between Inside and Outside** — may benefit from one fewer image rather than additional spacing.
3. **House Through the Day** — should render only complete moments and let each stand independently.
4. **Closing Reflection** — already has the right visual silence and should remain text-only.

## Sections waiting for missing photography

| Section                         | Missing need                                                                                               | Priority    |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------- |
| Hero                            | Definitive wider house-within-landscape photograph or explicit approval of the current narrower candidate. | High        |
| The View                        | Uninterrupted panoramic outward view from a verified house position.                                       | Essential   |
| House Through the Day — Morning | Distinct verified morning image if the current file remains Hero.                                          | High        |
| House Through the Day — Rain    | Truthful rainy-day image from a representative sheltered position.                                         | Essential   |
| Materials and Architecture      | Verified material detail only after a real material story is confirmed.                                    | Conditional |
| Shared Heart                    | Optional daytime replacement or complement that includes the outside relationship.                         | Desirable   |
| Optional Human Moment           | Genuine, consented, privacy-safe image only if needed.                                                     | Optional    |

---

## 9. Recommended QA order before Sanity

This is a review sequence, not an implementation request.

1. Recover production-resolution originals for every retained development candidate.
2. Add the missing View and Rain photographs before making final spacing decisions.
3. Decide whether the current Hero is sufficient or remains only a temporary stand-in.
4. Resolve whether Morning receives a distinct image or is intentionally omitted.
5. Review the full image sequence for repeated pool, deck, seating, and timber-toned compositions.
6. Confirm whether Indoor/Outdoor needs two or three images.
7. Keep Materials absent from final public rendering until one verified story is ready.
8. Conduct live visual QA at narrow mobile, large mobile, tablet portrait, tablet landscape, desktop,
   and wide desktop widths.
9. Review real-device sharpness and color before approving any development derivative.
10. Freeze image roles and responsive crops only after the page communicates Homy, Connected to
    nature, and Peaceful as one continuous experience.

## Visual QA conclusion

Development photography has moved the House page from an abstract editorial plan toward a specific
place. Shared Heart and Between Inside and Outside now carry genuine visual weight. They are the
current foundation of the page's Homy and Connected to nature feelings.

The visual narrative still breaks at The View and Daily Rhythms. Peaceful spacing is present, but
some intervals risk feeling vacant because they surround placeholders or incomplete content. The
next meaningful improvement is not more layout work: it is a distinct View, an honest Rain image,
production-resolution originals, and a full-page responsive review with those assets in place.
