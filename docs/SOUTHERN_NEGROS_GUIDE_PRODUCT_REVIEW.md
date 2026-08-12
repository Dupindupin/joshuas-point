# Joshua's Point — Southern Negros Guide Product Review

## Status and scope

This document reviews the existing [Ultimate Negros Travel Guide](https://guide.joshuaspoint.com/)
as a migration source and recommends a future product direction for Joshua's Point. It does not
migrate content, change the frontend, modify Sanity, select a payment provider, or approve any
existing claim for republication.

The public guide was reviewed on **11 August 2026**. The local Joshua's Point architecture and the
approved `SOUTHERN_NEGROS_GUIDE_PRODUCT.md` were reviewed alongside it.

## Executive recommendation

Choose **Option D: free discovery integrated into Joshua's Point plus a premium guide**.

The public Joshua's Point platform should remain the canonical, current source for destinations,
scenic routes, dive guides, maps, and essential practical guidance. A paid Southern Negros Guide
should turn that knowledge into a coherent, portable publication with deeper curation, offline
use, thoughtful journey planning, and edition-based maintenance.

Do not maintain two competing editorial databases. The existing guide website should be treated as
a valuable migration source and, if needed, a temporary commercial surface—not as a second
long-term content authority.

The product distinction should be simple:

- **Free:** discover a place, understand why Tobias recommends it, and access essential current
  guidance.
- **Premium:** carry a carefully edited journey through the region, use it offline, and benefit from
  deeper synthesis, sequencing, maps, and maintained editions.

---

## 1. Existing guide content

### 1.1 Public structure found

The existing guide currently exposes these principal public areas:

| Area | Current role | Migration value |
| --- | --- | --- |
| [Guide home](https://guide.joshuaspoint.com/) | Product introduction and launch-list page | Product positioning, audience language, free/premium promise |
| [Destinations](https://guide.joshuaspoint.com/destinations/) | Searchable and filtered place/service directory | Large source inventory, taxonomy candidates, practical entries |
| [Explore Map](https://guide.joshuaspoint.com/explore-map/) | MapLibre-based regional discovery interface | Coordinates, categories, regional relationships, map copy |
| [Guide overview](https://guide.joshuaspoint.com/ultimate-negros-travel-guide/) | Public product overview | Planned coverage, formats, region framing, launch proposition |
| [Digital edition](https://guide.joshuaspoint.com/product/ultimate-negros-travel-guide-digital/) | Pre-launch product listing | Delivery assumptions, price candidate, format and access expectations |
| Destination detail pages | Long-form editorial and practical guides | Narratives, planning structures, relationships, source facts |
| Support and policy pages | Commercial support layer | Candidate operational requirements; requires later legal and support review |

The destination archive currently contains **105 entries across nine index pages**. This number
must not be interpreted as 105 editorial destinations: the archive combines natural places,
towns, transport gateways, restaurants, accommodation, dive businesses, shops, health services,
fuel, ATMs, laundry, and other practical records.

### 1.2 Existing regional organization

The public guide frames three broad journeys:

- **Negros Oriental:** reefs, waterfalls, island days, towns, services, and eastern gateways.
- **Negros Occidental:** western coasts, conservation, Bacolod, Sipalay, and Cauayan-area travel.
- **Siquijor extension:** island journeys, swimming places, food, transport, and practical services.

The destination index also organizes material through:

- Province and municipality.
- Place or service type.
- Guest relevance such as families, divers, couples, and adventure.
- Practical categories including food, hotels, dive centers, shops, transport, and scooter rental.

This taxonomy is useful evidence of how travelers look for information. It should be simplified
before migration rather than copied exactly.

### 1.3 Destination and article inventory

The strongest editorial destination material includes, among others:

- Apo Island.
- Casaroro Falls.
- Lake Balanan.
- Danjugan Island.
- Balinsasayao Twin Lakes Natural Park.
- Mount Talinis.
- Dauin Marine Sanctuaries.
- Tambobo Bay.
- Campomanes Bay.
- Mabinay Caves and Mabinay Spring.
- Manjuyod White Sandbar and Bais Dolphin Watching.
- Pulangbato Falls and Baslay Hot Spring.
- Sagay Marine Reserve and Suyac Island Mangrove Eco-Park.
- Cambugahay Falls, Cantabon Cave, Paliton Beach, Salagdoong Beach, and other Siquijor places.
- Sipalay-area beaches, viewpoints, marine places, and local orientation.

Regional orientation entries include Bacolod City, Dumaguete City, Dauin, Siaton, Sipalay,
Valencia, and Siquijor Island.

The current site does not expose a separate journal archive. Its destination detail pages function
as the principal long-form articles. A complete, approved book chapter table of contents is also
not publicly visible; the product pages describe planned coverage rather than finished chapters.

### 1.4 Scenic routes and journey material

No dedicated scenic-route archive was identified in the existing guide's public navigation.
Route value currently appears in three forms:

1. Arrival comparisons through Dumaguete and Bacolod.
2. Access narratives within destination pages.
3. Planned itineraries, route diagrams, and map packs described by the digital product.

This material is worth preserving, but it should migrate into the existing Joshua's Point
`scenicRoute` documents and route relationships—not into duplicated prose inside a premium guide.
The current platform's owner-approved scenic routes remain the canonical route system.

### 1.5 Practical information found

The guide contains a substantial practical layer:

- Airports, ports, boat gateways, and onward transport.
- Suggested visit duration and time-of-day guidance.
- Budget framing and reminders to confirm changing charges.
- Access, registration, parking, and local confirmation guidance.
- Packing lists, responsible-travel notes, and things to avoid.
- Markets, ATMs, mobile data, fuel, health services, shops, and laundry.
- Scooter and transport providers.
- Restaurants, cafés, accommodation, dive operators, and other local businesses.
- Nearby-place groupings by municipality and purpose.

The detailed Apo Island page demonstrates the current editorial pattern particularly clearly:
orientation, journey planning, conservation context, experience narrative, practical preparation,
gateway comparison, map link, responsible behavior, nearby services, and a premium-guide bridge.

This is valuable source material, but much of it is time-sensitive. Business availability, fees,
access arrangements, operating details, transport, and service information require provenance,
review dates, and a defined maintenance owner before migration.

### 1.6 Map content

The existing Explorer uses MapLibre and presents:

- Search.
- Region and type filters.
- Mappable destination records.
- Direct links from markers to full guides.
- An offline-map premium proposition.

The new Joshua's Point platform already has a provider-neutral map architecture, Explorer data,
relationships, and MapLibre direction. The migration value is therefore the **content and verified
location data**, not the old map implementation.

### 1.7 Product proposition already present

The existing product pages describe:

- A one-time digital purchase.
- Planned PDF and EPUB formats.
- Offline reading.
- Airport routes, boat connections, destinations, food, diving, and practical planning.
- Ready-made itineraries and QR-linked live updates.
- Account-based access as a current assumption.
- A planned price of **₱1,190**, explicitly presented as pre-launch.

These are useful product hypotheses, not final commitments. Price, file formats, account need,
update entitlement, delivery method, and checkout should remain owner decisions until the finished
files and support workflow exist.

### 1.8 Unique owner knowledge worth protecting

The most distinctive value is not the size of the directory. It is the locally grounded way the
material connects a day:

- Choosing a gateway based on the whole journey rather than a single attraction.
- Understanding the pleasure and practical shape of the road itself.
- Connecting a destination with nearby food, supplies, transport, and places worth pausing.
- Knowing when a slower visit or overnight stay changes the experience.
- Preparing for inconsistent signal and changing local conditions.
- Treating conservation, local guidance, and respectful access as part of the journey.
- Distinguishing what Tobias personally recommends from what is merely available nearby.

During migration, every passage should retain its source and confidence level. The existing guide
is the primary migration source, but directory copy and externally researched facts must not be
mislabelled as Tobias's first-hand observation.

### 1.9 Content worth preserving first

Prioritize:

1. Tobias's first-hand destination and route observations.
2. Complete destination narratives already connected to the new platform.
3. Gateway and journey-planning explanations that reduce uncertainty.
4. Responsible-travel, conservation, and preparation guidance.
5. Verified coordinates and meaningful place relationships.
6. Regional orientation and the three-region framing where it fits the approved product scope.
7. High-value practical records guests genuinely need in the field.

Defer or reconsider:

- Broad hotel and resort listings unrelated to Joshua's Point guests.
- Directory entries whose main value is a phone number, opening time, or commercial claim.
- Duplicate records that serve several categories but contain no distinct editorial value.
- Generic destination introductions that do not carry owner observation or practical usefulness.
- Any premium promise that depends on unfinished files, untested delivery, or undefined updates.

---

## 2. Product direction

### Option A — Free guide integrated into Joshua's Point

**Strengths**

- One public brand, CMS, search authority, map, and relationship graph.
- Builds trust before a stay and supports guests during it.
- Keeps important access and responsible-travel information public.
- Avoids duplicated maintenance.

**Limitations**

- Does not directly fund deeper research, editing, photography, and offline publishing.
- A website alone is less useful with weak signal or while moving through the region.
- A large directory could overwhelm Joshua's Point's quiet editorial identity.

### Option B — Premium downloadable guide/PDF

**Strengths**

- Clear value through curation, portability, offline use, map layouts, and edition design.
- Can fund verification, photography, editing, and maintenance.
- Works as both a field companion and a lasting editorial object.

**Limitations**

- A static file ages quickly without a correction and update model.
- Essential discovery and safety information cannot ethically sit only behind payment.
- A PDF assembled from duplicated copy would create two sources of truth.

### Option C — Separate guide platform connected to Joshua's Point

**Strengths**

- Can support a distinct audience, commerce, accounts, and a larger geographic scope.
- Keeps a commercial product surface away from the accommodation experience.

**Limitations**

- Creates two brands, two navigation models, two SEO footprints, and potentially two CMS sources.
- Increases editorial, technical, analytics, privacy, and support work.
- Weakens the sense that the guide comes from Tobias and Joshua's Point.

### Option D — Free discovery plus premium guide

**Strengths**

- Preserves public trust while creating a product worth buying.
- Uses one canonical content graph and turns it into several outputs.
- Makes the premium value depth, sequence, portability, and maintenance—not withheld facts.
- Matches the existing Joshua's Point architecture and approved product philosophy.

**Recommendation**

Adopt **Option D** with the following operating model:

- Joshua's Point owns the canonical public editorial platform and Sanity content.
- The Southern Negros Guide is a named Joshua's Point publication, not an unrelated travel brand.
- The premium edition is generated from canonical content plus deliberate premium-only chapters,
  route synthesis, offline maps, and edition-specific editorial material.
- The existing guide subdomain is retained only during migration or where a future commerce/delivery
  boundary genuinely requires it.
- Public and premium content link to one another without duplicated factual fields.

---

## 3. Relationship with Joshua's Point

### Joshua's Point

Joshua's Point is:

- The accommodation and emotional center.
- The place from which Tobias shares personal recommendations.
- The public discovery platform for destinations, routes, dive areas, and the Explorer Map.
- The current source for essential planning, access context, and responsible travel guidance.

Its public journey remains:

> Stay at Joshua's Point → understand the house and landscape → discover nearby places → plan a
> considered day.

### Southern Negros Guide

The Southern Negros Guide is:

- The deeper planning companion.
- A coherent route through material that is distributed across public pages.
- A portable and offline resource.
- A maintained publication with a visible edition and review date.
- A place for longer context, day shapes, comparative planning, original maps, and print-quality
  photography.

Its product journey is:

> Discover freely → trust Tobias's perspective → choose deeper guidance → carry it into the region.

### Boundary between them

| Public Joshua's Point | Premium Southern Negros Guide |
| --- | --- |
| Canonical current place facts | Edition snapshot with publication date |
| Complete meaningful introduction | Deeper synthesis across places and journeys |
| Essential access and responsible-travel guidance | Offline preparation and structured field use |
| Public Explorer and accessible location lists | Designed offline maps and cross-referenced route spreads |
| Individual destination, route, and dive pages | Curated chapters, day shapes, and regional sequences |
| Corrections and material safety updates | Stated update entitlement and edition changelog |

The paid guide must never be required to learn about a closure, material access change,
conservation rule, or safety-related correction.

---

## 4. Future structure

### 4.1 Sanity content model

Reuse existing named document types as the canonical sources:

- `destination`
- `scenicRoute`
- `diveSite`
- Existing editorial image, SEO, map-location, workflow, and relationship objects

Add future guide-specific types only when product implementation begins:

#### `guideLandingPage` singleton

Controls the public guide introduction, free/premium explanation, sample content, product links,
FAQ references, and SEO. It should not contain copied destination or route facts.

#### `guideEdition` document

One record per sellable edition, with product name, edition number, publication date, last reviewed
date, status, cover, formats, file references, update entitlement, support URL, and commerce product
identifier. Price and tax behavior should remain owned by the future commerce layer where possible.

#### `guideChapter` document

An explicitly structured chapter with title, introduction, editorial body, ordered references to
canonical destinations/routes/dive sites, edition relationships, photography, and review status.
This is not a generic page builder.

#### `guideJourney` document

A curated day shape or multi-place sequence: purpose, intended pace, ordered canonical references,
preparation, limitations, map overview, and review date. It must not duplicate each referenced
place's practical facts.

#### `localService` document, only if approved

Use for genuinely useful, time-sensitive records such as gateways, transport, fuel, health,
markets, or supplies. Do not force these entries into `destination`. Every record needs an owner,
last-reviewed date, locality, status, and clear removal policy.

Restaurants, accommodation, dive businesses, and commercial services should not migrate until
Tobias approves the directory boundary and ongoing maintenance commitment.

### 4.2 Website placement

Recommended public routes:

- `/guide` — the free Southern Negros discovery and product introduction.
- Existing `/destinations`, `/scenic-routes`, `/dive-sites`, and `/explorer` — canonical discovery.
- A future `/guide/edition/[slug]` or equivalent — product detail and sample, only when commerce is
  approved.
- Secure downloads should use provider-controlled, expiring delivery URLs rather than files in the
  public web directory.

Do not duplicate public destination articles under a second `/guide/...` content tree.

### 4.3 Maps and relationships

- Reuse verified `mapLocation` values and `routePath` geometry.
- Reuse the Explorer Map and provider-neutral MapLibre architecture.
- Let `guideChapter` and `guideJourney` reference canonical documents through the Relationship
  Engine.
- Generate print/offline map layouts from the same verified location data, with attribution and an
  edition date.
- Keep textual location and route sequences available without interactive maps.
- Never expose private Joshua's Point coordinates or technical dive-site coordinates that are not
  approved for publication.

### 4.4 PDF/book structure

The existing public site does not expose a finished table of contents. A recommended first-edition
structure is:

1. **From Joshua's Point** — perspective, scope, how to use the guide.
2. **Understanding Southern Negros** — geography, gateways, pace, seasons, and limitations.
3. **Journeys from the house** — curated day shapes and scenic routes.
4. **Water, forest, and highlands** — selected destinations, not an exhaustive directory.
5. **Sea and islands** — coastal and island journeys.
6. **Diving context** — editorial regional orientation with qualified technical review boundaries.
7. **Food, coffee, and useful pauses** — approved local recommendations with dated details.
8. **Practical field notes** — transport, money, signal, supplies, responsible travel, and
   verification reminders.
9. **Maps and indexes** — overview maps, cross-references, source notes, and correction URL.

This is a product recommendation, not migrated content or an approved final table of contents.

### 4.5 Purchase and download approach

Keep the future commerce layer provider-neutral until the owner approves a provider. The minimum
launch flow should support:

1. Product page with an exact edition, file formats, update entitlement, and support policy.
2. Tax-aware checkout with international payment support.
3. Transactional receipt and secure, expiring download access.
4. Download limits that are humane and clearly explained.
5. Versioned files with checksum, publication date, and correction URL.
6. A tested resend/recovery flow for legitimate buyers.
7. Marketing consent separate from purchase and product-critical messages.

An account should not be required unless it materially improves updates or access. The existing
guide assumes a `My Account` area; Tobias should decide whether its support and privacy cost is
justified compared with receipt-based delivery.

---

## 5. Content migration rules

### Preserve

- Tobias's personal observations, recommendations, route logic, and calm enthusiasm.
- Existing useful structure when it helps a traveler understand a journey.
- Verified practical information with source and review date.
- Existing owner photography and approved location data.
- Responsible-travel and conservation context.
- Useful relationships between places, gateways, services, routes, and dive areas.

### Improve carefully

- Grammar, clarity, rhythm, headings, and repetition.
- Distinction between observation, factual guidance, and changing operational information.
- Scannability in the field without turning the writing into generic listicles.
- Source attribution, last-reviewed dates, and editor ownership.
- Internal links to canonical Joshua's Point pages.

### Do not

- Rewrite authentic passages merely to make them different.
- Replace Tobias's voice with generic travel marketing.
- Copy the same factual field into destination, chapter, PDF, and product records.
- Treat every commercial listing as an editorial recommendation.
- Import stale fees, opening details, transport claims, or availability without review.
- Promise conditions, sightings, journey times, access, safety, or product updates.
- Put essential safety or closure information behind payment.

### Migration authority rule

For each source item, record:

- Legacy URL and legacy identifier.
- Intended canonical Sanity type and document.
- Source classification: owner observation, verified fact, researched context, or time-sensitive
  operational detail.
- Last reviewed date and reviewer.
- Photography source and approved use.
- Whether the content is public, premium, shared, deferred, or rejected.

Sanity becomes authoritative only after the migrated document is reviewed and published. Until
then, the existing guide remains a source—not a live dependency of the new frontend.

---

## 6. Recommended migration phases

### Phase 1 — Preserve and classify

- Export the existing guide's content, taxonomies, media references, redirects, and IDs.
- Freeze a dated source archive before editorial changes.
- Classify all 105 entries as editorial place, regional orientation, practical service, commercial
  listing, duplicate, or reject/defer.
- Identify passages attributable to Tobias and separate them from researched copy.

### Phase 2 — Establish the canonical boundary

- Match existing natural places to current `destination` documents.
- Match route material to `scenicRoute`.
- Match dive material to `diveSite`, keeping technical facts behind qualified review.
- Decide whether `localService` is warranted before importing directory records.
- Create redirect mapping from legacy guide URLs to canonical public pages.

### Phase 3 — Migrate the highest-value public content

- Begin with destination and route material already represented in the new platform.
- Preserve strong passages and improve only where necessary.
- Migrate verified coordinates, photography, relationships, and practical guidance.
- Publish through the existing workflow and review-date rules.

### Phase 4 — Design the premium edition

- Approve the product scope and first-edition table of contents.
- Create guide-specific documents only after the public canonical content is stable.
- Commission or select print-quality photography and offline map layouts.
- Produce a representative sample chapter before building checkout.

### Phase 5 — Build and test the product artifact

- Generate accessible PDF and, if approved, EPUB outputs.
- Test links, bookmarks, reading order, image descriptions, mobile readability, print behavior, file
  size, and offline use.
- Add edition metadata, corrections URL, attribution, and licensing.

### Phase 6 — Commerce and launch

- Approve price, provider, tax handling, refund policy, update entitlement, and support workflow.
- Attach final files and run real purchase, receipt, download, resend, and refund tests.
- Only then open checkout and migrate or redirect the legacy product pages.

---

## 7. Owner decisions needed

### Product identity and scope

1. Is the first product the **Southern Negros Guide** centered on Joshua's Point, or the broader
   **Ultimate Negros Travel Guide** covering Negros Oriental, Negros Occidental, and Siquijor?
2. Should Siquijor and northern/western Negros be part of edition one, later extensions, or separate
   products?
3. Should the existing guide name remain visible during migration, or should all future publishing
   use the Joshua's Point Southern Negros identity?

### Free and premium boundary

4. Which deeper material creates paid value: curated journeys, itineraries, offline maps, print
   photography, practical planning tools, or all of these?
5. Which full sample chapter should remain free?
6. Are Joshua's Point guests entitled to the guide, a discount, or the same public offer as every
   other reader?

### Directory boundary

7. Should the product maintain restaurants, hotels, dive operators, transport providers, shops,
   ATMs, health services, and other commercial records?
8. Which of those are Tobias's recommendations, and which are merely useful listings?
9. Who will own the recurring review and removal process for time-sensitive records?

### Edition and commerce

10. Is **₱1,190** still a live price candidate or only legacy pre-launch copy?
11. Are both PDF and EPUB required for edition one?
12. What update period is included with a purchase?
13. Is account access necessary, or is secure receipt-based delivery preferred?
14. Should the guide subdomain remain as a commercial/download portal or ultimately redirect into
    the main Joshua's Point platform?

### Editorial ownership

15. Which existing passages are explicitly Tobias's first-hand knowledge?
16. Who performs fact review, dive technical review, copy editing, and final publication approval?
17. How should contributors, local sources, and photographers be credited in the digital edition?

---

## Final product position

The Southern Negros Guide should not become a larger destination database with a price attached.
Its value is the thoughtful connection between places: how to begin from Joshua's Point, how a road
and day unfold, what deserves time, what must be confirmed, and how to move through the region with
care.

The strongest model is one canonical Joshua's Point knowledge system with two expressions:

- A generous public discovery platform.
- A deeper, portable, maintained publication.

That keeps the guide recognizable as Tobias quietly sharing a region he knows and loves—even when
the reader has never stayed at Joshua's Point.
