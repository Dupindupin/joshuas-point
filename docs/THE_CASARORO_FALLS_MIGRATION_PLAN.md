# Joshua's Point — Casaroro Falls Content Migration Plan

## Status and purpose

This is the first destination-specific migration plan in the fast Destinations workflow. It
converts the existing Joshua's Point Casaroro Falls source material into the explicit `destination`
CMS contract without writing the destination from zero.

This document does not publish, edit, or create a Sanity document. It does not approve facts,
photography, or final copy.

Sources reviewed on 9 August 2026:

- [Current Joshua's Point Casaroro Falls page](https://joshuaspoint.com/casaroro-falls/)
- [`THE_EXISTING_DESTINATION_CONTENT_INVENTORY.md`](./THE_EXISTING_DESTINATION_CONTENT_INVENTORY.md)
- [`THE_DESTINATIONS_AUDIT.md`](./THE_DESTINATIONS_AUDIT.md)
- [`EDITORIAL_CONTENT_SYSTEM.md`](./EDITORIAL_CONTENT_SYSTEM.md)
- current `destination` schema and shared objects
- current published Sanity document `destination-casaroro-falls`, read-only
- [Negros Oriental Provincial Government destination listing](https://www.negor.gov.ph/tourist-destination/)

The provincial source supports the basic identification of Casaroro Falls as a waterfall in
Valencia, Negros Oriental, in a forested setting. It is not current enough to support access,
facilities, conditions, fees, or safety guidance.

## Migration principle

The source page contains two different kinds of material:

1. a useful editorial sequence about the approach, waterfall, and return; and
2. practical claims that must be checked again before publication.

The first can be preserved as draft source material. The second must remain empty in the new CMS
until field verification is complete. A required schema field is not permission to invent a
value.

---

## 1. Current CMS baseline

The current Sanity record already exists at `destination-casaroro-falls`. It is published, but it
is intentionally incomplete and has `workflowStatus: inReview` and `seo.noIndex: true`.

| Current field | Current state | Migration action |
| --- | --- | --- |
| `internalTitle` | “Casaroro Falls — Editorial Review Required” | Keep until migration review is complete |
| `title` | Casaroro Falls | Keep |
| `slug.current` | `casaroro-falls` | Keep; preserve URL history |
| `destinationType` | `waterfall` | Keep |
| `excerpt` | Editorial placeholder | Replace in draft with source-derived, reviewed summary |
| `heroImage` | Empty | Leave empty until rights and identity are verified |
| `gallery` | Empty | Keep empty until at least two distinct rights-cleared images exist |
| `editorialIntroduction` | Editorial placeholder | Replace in draft from the existing approach narrative |
| `story` | Three placeholder blocks | Replace in draft using the existing three-part story structure |
| `whyVisit` | Editorial placeholder | Owner/editor decision required before replacement |
| `highlights` | Two workflow placeholders | Replace only with verified observations or remove in draft |
| `photographyNotes` | Placeholder | Leave empty until light, access, and respectful camera use are observed |
| `travelInformation` | Empty | Keep empty until every required practical field is verified |
| `scooterFriendly` | Empty | Keep empty until a current route review and owner policy decision |
| `scooterGuide` | Empty | Keep empty |
| `thingsToBring` | Empty | Keep empty until terrain and conditions are verified |
| `tips` | Empty | Keep empty until local review |
| `mapLocation` | Empty | Keep empty until coordinates and public precision are verified |
| `interactiveMapEnabled` | `false` | Keep false |
| `relatedDestinations` | Empty | Curate only after related documents exist and are approved |
| `seo` | `noIndex: true` only | Keep no-index throughout draft review; prepare metadata below |
| `lastReviewedAt` | Empty | Set only after a documented factual review, never to the migration date |

The migrated material should be applied to a draft derived from this existing document. Do not
create a second Casaroro Falls document.

---

## 2. Existing useful content

### Content structure worth preserving

The WordPress page already provides a coherent narrative sequence:

1. **The approach and descent** — the change from everyday surroundings into trees, a valley,
   birds, and increasingly audible water.
2. **The waterfall in the gorge** — the reveal of a narrow waterfall within rock and vegetation.
3. **The return** — the upward journey through the same landscape.

This sequence matches the Joshua's Point editorial standard of orientation, change in landscape,
arrival, defining detail, and reflection. It should become the three-block `story`, subject to
first-hand confirmation.

### Source material by CMS role

| CMS role | Existing source material | Proposed treatment |
| --- | --- | --- |
| Excerpt | Forested mountain setting, descent, waterfall, gorge | Condense without “hidden,” superlatives, difficulty, distance, or promise |
| Editorial introduction | Reaching the falls is part of the experience; forest approach changes the pace | Preserve the idea; remove “adventure,” “untouched,” and generic audience labels |
| Story 1 | Long staircase, trees, birds, and water becoming more present | Preserve as source-derived draft; verify by field observation |
| Story 2 | Waterfall revealed within a rocky gorge and vegetation | Preserve; remove unverified height and “rare place” language |
| Story 3 | Return/climb through the forest | Preserve the return as part of the sequence; remove challenge/reward marketing |
| Why visit | Relationship among approach, forest, gorge, and waterfall | Owner/editor must approve a concise public reason; do not use “most spectacular” |
| What to expect | Forest approach, stairs/path, rock and water | Do not populate until current terrain and access are reviewed |
| Nearby context | Valencia, Pulangbato Falls, Twin Lakes, Waterfall Explorer | Preserve as relationship candidates, not automatically approved links |
| Photography notes | Morning light and gorge shadow | Treat as an unverified source claim; confirm on location before entry |

### Source-derived working direction

The following is a migration scaffold, not final copy:

- **Excerpt direction:** Identify Casaroro Falls as a waterfall in the forested landscape of
  Valencia and introduce the approach as part of the story.
- **Introduction direction:** Establish the transition from the highlands into the forest without
  claiming seclusion, spectacle, difficulty, or a specific duration.
- **Story direction:** Keep the existing Descent → Gorge → Return order and remove every number,
  superlative, visitor promise, and unverified practical instruction.
- **Closing/recommendation direction:** Explain why Joshua's Point considers the place meaningful
  only after the owner confirms the recommendation from personal or locally reviewed experience.

This preserves the existing page's strongest editorial idea without pretending that its practical
information has been verified.

---

## 3. Content requiring verification

### Verification ledger

| Existing claim | Destination field affected | Required verification | Status |
| --- | --- | --- | --- |
| Casaroro Falls is in Valencia, Negros Oriental | Identity, SEO, location label | Owner/editor confirmation plus current local or official source | Basic identity supported; owner review pending |
| Forested setting and rocky gorge | Excerpt, introduction, story, alt text | Recent first-hand observation and image review | Source candidate |
| Long staircase and short natural path | Highlights, difficulty, tips | On-site route review; note current closures or alterations | Unverified |
| Several hundred steps | Story, difficulty | Count or current responsible local source | Unverified; do not use |
| Waterfall is nearly 30 metres | Story, SEO | Authoritative geographic source | Unverified; do not use |
| Birds and audible water during the descent | Story | First-hand owner/editor observation | Unverified observation |
| Cooler mountain climate/fresh air | Story, best time | Recent observation or suitable weather source | Unverified; avoid broad climate claim |
| Distance from Joshua's Point | Travel information | Route from the exact property origin, recorded on review date | Unverified; leave empty |
| Travel time from Joshua's Point | Travel information | Field journey under documented ordinary conditions | Unverified; leave empty |
| Vehicle/transport suitability | Recommended transport | Current route and access review; owner operating policy | Unverified; leave empty |
| Visitor difficulty | Travel information | Current on-site assessment using the CMS scale | Unverified; leave empty |
| Road and trail condition | Scooter guide, highlights, tips | Current field review, including weather sensitivity | Unverified; leave empty |
| Swimming is possible | Tips, safety context | Current site rules and local authority/operator confirmation | Unverified; remove for now |
| Dry season or morning is “best” | Best time, photography notes | Local seasonal review and first-hand light study | Unverified; leave empty |
| Slippery conditions after rain | Highlights, tips, safety | Current field observation/local management guidance | Plausible but unverified; do not publish |
| Wheelchair and child suitability | Difficulty, accessibility copy | Current accessibility assessment; avoid universal judgments | Unverified; do not publish |
| Entrance fee | Fee information | Current responsible site source; amount, currency, scope, review date | Missing |
| Opening/access hours | Opening information | Current responsible site source and weather/closure qualifications | Missing |
| Exact coordinates | Map location | Field GPS and public-safety precision decision | Missing |
| Transport can be arranged | Tips/contact relationship | Current Joshua's Point service policy and supplier availability | Unverified; omit |
| Valencia/Pulangbato/Twin Lakes combine in one day | Relationships/routes | Field-tested itinerary and editorial purpose | Unverified |

### Minimum field review

The first field review must capture:

- date, reviewer, weather, and recent rainfall context;
- exact public arrival point and whether access is managed;
- safe public coordinates and human-readable location label;
- actual journey duration from Joshua's Point without presenting it as a guarantee;
- transport options actually suitable on the review date;
- current trail/stair sequence and observable condition;
- overall visitor difficulty using the schema's Easy/Moderate/Demanding vocabulary;
- current fee and opening/access pattern, or a documented decision to omit both;
- facilities, parking, guides, swimming rules, closures, and local restrictions;
- suitable light and respectful photography practice;
- whether any ecological or community sensitivity should limit details; and
- source name/contact for every volatile operational fact.

---

## 4. Claims to remove or soften

### Remove

The migrated draft should not carry forward:

- “hidden deep” or “untouched” framing;
- “one of Negros Oriental's most spectacular”;
- “unforgettable adventure”;
- “rare place” or equivalent exceptionalism;
- “every memorable destination asks a little in return”;
- “worth it,” “rewarding,” or “sense of accomplishment” as promised reactions;
- generic “nature lovers,” “adventure seekers,” or fitness assumptions;
- guarantees that visitors can swim, complete the walk comfortably, or arrange transport;
- distance, travel time, height, step count, season, and difficulty before verification; and
- recommendations based on crowds, quiet, safety, or accessibility without current evidence.

### Preserve but qualify after verification

- The approach is part of the experience.
- Trees, rock, moving water, and the gorge define the sequence.
- The waterfall is encountered after a descent and followed by a return.
- Weather and rainfall may change the visit.
- Footwear, water, and timing may be useful practical guidance.
- Valencia and Pulangbato may provide meaningful nearby context.

These should be written as precise observations, not promises or universal conclusions.

---

## 5. Photography plan and gaps

### Existing candidate

The WordPress page repeatedly uses:

`539588359_1206921484786755_8903495630037873207_n.jpg`

The visible version is portrait-oriented and shows a person standing with arms raised before a
tall waterfall. The old alt text identifies the place as Casaroro Falls.

Before migration, confirm:

- this is Casaroro Falls;
- the original full-resolution file is available;
- the photographer and public credit requirement;
- Joshua's Point has production website and social-sharing rights;
- the identifiable person has approved this use;
- the image is current enough to represent the site; and
- a meaningful, non-promotional alt description based on the actual image.

Until those checks pass, do not upload or attach it to Sanity.

### Missing editorial roles

| Required role | Current status | Requirement |
| --- | --- | --- |
| Landscape Hero | Missing | Wide image showing the waterfall and setting with responsive crop space |
| Geographic context | Missing | Forest/highland context that truthfully locates the experience |
| Approach | Missing | Stairs/path only if current, safe, and useful to show |
| Gorge and waterfall | Portrait candidate only | Unobstructed view showing scale without exaggerated staging |
| Detail | Missing | Water, rock, vegetation, or weather detail that adds information |
| Practical terrain | Missing | Current access surface or stairs for orientation, not alarm |
| Social image | Missing | Rights-cleared crop around 1.91:1; may derive from the final Hero |

The gallery must remain absent until at least two distinct, rights-cleared images with alt text and
credit information are available. Do not duplicate the single WordPress photograph merely to
satisfy the gallery minimum.

---

## 6. SEO migration

### Existing WordPress metadata

- **Title:** `Casaroro Falls Guide | Joshua's Point, Negros Oriental`
- **Description:** Promises directions, hiking tips, best-time guidance, and day-trip planning.
- **Canonical:** `https://joshuaspoint.com/casaroro-falls/`
- **Open Graph image:** the portrait waterfall photograph.

### Assessment

The existing title preserves useful search intent and place specificity. The description currently
promises practical information that is not verified in the new CMS. The canonical URL points to
the old site and requires a deployment/redirect decision. The Open Graph image requires the same
rights and crop review as the page photography.

### Prepared SEO structure

| SEO field | Draft preparation | Publication gate |
| --- | --- | --- |
| `metaTitle` | Candidate: `Casaroro Falls Guide | Joshua's Point` | Confirm title strategy and length |
| `metaDescription` | Draft only after verified practical scope is known | Must describe only content actually present; max 160 characters |
| `socialTitle` | Usually inherit `metaTitle` | Add only if a different sharing title is justified |
| `socialDescription` | Optional | No promotional claims or unverified logistics |
| `socialImage` | Empty | Rights-cleared wide crop with alt and credit |
| `canonicalUrl` | Empty during migration | Set only if old and new pages intentionally coexist; otherwise use redirects |
| `noIndex` | Keep `true` | Change only after editorial, factual, image, accessibility, and SEO approval |

SEO terms should emerge naturally from the approved page: Casaroro Falls, Valencia, Negros
Oriental, forest approach, and practical visit guidance. Do not add repeated keyword variants or
promise a hike, swim, route, fee, or opening pattern that the page cannot support.

---

## 7. Prepared destination document structure

This is the field-level structure for the existing document's next draft. “Source-derived” means
the material comes from the current Joshua's Point page but still requires editorial approval.

```text
destination-casaroro-falls

Identity
  internalTitle: Casaroro Falls — Migration Review
  title: Casaroro Falls
  slug: casaroro-falls
  destinationType: waterfall
  excerpt: SOURCE-DERIVED DRAFT — forested Valencia setting + approach + waterfall
  heroImage: EMPTY — rights-cleared landscape Hero required

Editorial Story
  gallery: EMPTY — do not create until 2+ distinct approved images exist
  editorialIntroduction:
    SOURCE-DERIVED DRAFT — the approach is part of the place
  story:
    1. Descent — trees, changing sound, approach
    2. Gorge — waterfall, rock, vegetation; no height or superlative
    3. Return — the landscape on the way back; no difficulty promise
  whyVisit: OWNER DECISION REQUIRED
  highlights: EMPTY UNTIL FIELD REVIEW
  photographyNotes: EMPTY UNTIL LIGHT/ACCESS REVIEW

Travel Information
  travelInformation: EMPTY UNTIL COMPLETE VERIFICATION
    travelTimeFromJoshuaPoint: EMPTY
    recommendedTransport: EMPTY
    difficulty: EMPTY
    bestTimeToVisit: EMPTY
    entranceFee: EMPTY
    openingHours: EMPTY
  scooterFriendly: EMPTY UNTIL ROUTE REVIEW
  scooterGuide: EMPTY
  thingsToBring: EMPTY UNTIL FIELD REVIEW
  tips: EMPTY UNTIL FIELD REVIEW

Map and Location
  mapLocation: EMPTY UNTIL GPS/PUBLIC-PRECISION REVIEW
  interactiveMapEnabled: false

Related Content
  relatedDestinations: REVIEW CANDIDATES ONLY
    - Valencia
    - Pulangbato Falls
    - Twin Lakes
  future route relationship: Waterfall Explorer

SEO
  metaTitle: CANDIDATE PREPARED
  metaDescription: EMPTY UNTIL FINAL SCOPE
  socialTitle: EMPTY / INHERIT
  socialDescription: EMPTY / INHERIT
  socialImage: EMPTY
  canonicalUrl: EMPTY PENDING REDIRECT DECISION
  noIndex: true

Governance
  workflowStatus: inReview
  lastReviewedAt: EMPTY UNTIL FACTUAL REVIEW
```

### Optional-section behavior

- `gallery`, photography notes, things to bring, tips, fees, hours, scooter guidance, and related
  destinations remain absent when not supported.
- The frontend already hides missing optional sections.
- Required objects such as travel information and map location should be completed as one verified
  group before approval, not filled with editorial placeholders.
- Studio-only source and verification records must never enter public story fields or GROQ output.

---

## 8. Required owner decisions

### Editorial decisions

1. Is the current WordPress narrative based on the owner's or an approved contributor's first-hand
   visit, and may its Descent → Gorge → Return structure be retained?
2. Which public-safe reason best explains why Joshua's Point recommends Casaroro Falls?
3. Should the guide mention birds, the sound of water, the gorge, and the climb before those
   observations are reconfirmed on a new field visit?
4. Should Valencia, Pulangbato Falls, and Twin Lakes be curated as related places, and in what
   order once their documents exist?

### Operational decisions

5. Who is responsible for the field review and the factual approval date?
6. What level of map precision is appropriate for the public destination page?
7. Should scooter guidance be evaluated, or should the first version recommend no scooter option
   until the broader route system is verified?
8. Does Joshua's Point currently help arrange transport, and should that service be mentioned at
   all in evergreen destination content?

### Photography decisions

9. Who photographed the current waterfall image, who is pictured, and what rights/consent exist?
10. May that portrait image be retained as a gallery candidate, or should all photography wait for
    a dedicated Casaroro shoot?

### Publication decisions

11. Should the existing published, no-index `inReview` seed remain accessible while the draft is
    prepared, or should it be unpublished through a separately approved CMS action?
12. When the new route launches, should the old WordPress URL redirect directly to
    `/destinations/casaroro-falls`, or coexist temporarily with an explicit canonical strategy?

---

## 9. Review and migration sequence

1. Owner answers the editorial, operational, photography, and publication questions above.
2. Assign a field reviewer and prepare a compact fact/photography checklist.
3. Conduct the field review without editing the story to fit expectations.
4. Confirm image provenance and select the Hero before uploading anything.
5. Apply the source-derived narrative to `drafts.destination-casaroro-falls`.
6. Populate practical fields only from the completed verification record.
7. Add page-specific SEO based on the actual approved scope.
8. Review accessibility, image alt text, privacy, ecological sensitivity, and relationships.
9. Confirm the mapper and frontend omit every absent optional field cleanly.
10. Publish only after workflow status, review date, practical information, map, Hero, and SEO pass
    their approval gates.

After this Casaroro workflow is reviewed and approved, repeat the same source inventory → claim
ledger → field structure → draft → verification sequence for Lake Balanan.
