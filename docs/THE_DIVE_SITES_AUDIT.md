# Joshua's Point — Dive Sites Content Audit

## Status and scope

This audit reviews the dive material already published by Joshua's Point, the current Sanity dive
architecture, and the frontend foundation as of 10 August 2026. It is a source-preservation and
readiness document. It does not approve any technical diving information or create new dive
content.

The audit keeps three subjects distinct:

1. **Destinations** describe an island, municipality, coast, or wider place above and below water.
2. **Dive areas** orient readers to a group of sites, such as Apo Island, Dauin, Zamboanguita, or
   Siaton.
3. **Dive sites** describe one verified, named, mappable underwater site with its own conditions,
   safety review, and editorial account.

An existing Joshua's Point webpage proves that wording and media were used on the owner-controlled
website. It does not prove that a technical claim is current, that an image was made at the page's
named location, or that a species identification is correct.

No frontend file, Sanity schema, or CMS document was changed for this audit.

---

## Executive findings

- Joshua's Point already has substantial **dive-area source material** for Apo Island, Dauin, and
  Zamboanguita. It is useful for topic selection, editorial direction, old-URL preservation, and
  identifying candidate dive-site names.
- No equivalent existing Joshua's Point dive guide was located for Siaton. `Mainit Sanctuary`
  appears only as an explicitly unverified backlog/schema example and must not be treated as an
  approved Siaton dive site.
- The legacy material mixes place orientation, dive-site names, wildlife, conditions, access,
  suitability, fees, and host arrangements. These layers must be separated before migration.
- The Sanity `diveSite` schema is intentionally strict and correctly blocks casual publication of
  incomplete technical records. It requires a verified name, map, entry, level, depth, visibility,
  current, season, safety notes, hero image, workflow status, and review date.
- The CMS currently contains **no `diveSite` or `diveSitesPage` documents**, published or draft.
- The frontend currently has only the `/dive-sites` landing route. There is no
  `/dive-sites/[slug]` page, no complete published-site listing, and no detail-page query.
- No dive photography is stored in `web/public/images`. WordPress assets remain candidates only;
  provenance, capture location, species identification, consent, credit, and rights are open.
- A named qualified local dive professional must review each site's technical fields before any
  site can move beyond draft.

---

## 1. Existing dive content

### Source hierarchy

| Source | What it can establish now | What it cannot establish now |
| --- | --- | --- |
| Current Joshua's Point public pages | Existing editorial themes, old URLs, candidate site names, and media filenames | Current conditions, technical accuracy, image provenance, rights, or publication readiness |
| Existing project inventory | A frozen record of source-page content and identified migration risks | Independent verification of the underlying claims |
| Owner source records | First-hand observations explicitly supplied and approved by Tobias | Specialist dive conditions unless Tobias identifies the scope and basis of that knowledge |
| Qualified dive review | Site identity, coordinates, conditions, entry, level, safety, and appropriately framed observations | Permanent guarantees about natural conditions or wildlife |

No dedicated owner-source record for a dive site currently exists. The public legacy pages are
therefore **owner-controlled source candidates**, not approved first-person dive observations.

### Existing public pages

The following legacy URLs were reachable during this audit:

| Existing page | Current editorial role | Material worth preserving | Material that must not migrate without verification |
| --- | --- | --- | --- |
| [Marine Adventures](https://joshuaspoint.com/marine-adventures/) | Regional collection introducing Apo Island, Dauin, and Zamboanguita | The three-area distinction and the idea that reef, macro, island, and coastal experiences have different characters | Rankings, superlatives, wildlife expectations, suitability, conditions, and availability |
| [Apo Island Diving & Snorkelling](https://joshuaspoint.com/apo-island-diving/) | Dive-area guide containing several named Apo Island sites | Island-level orientation; candidate site names; reef-versus-current editorial contrast; existing URL equity | Crossing details, fees, seasons, certification guidance, currents, site difficulty, wildlife frequency, reef condition, and host arrangements |
| [Dauin Diving](https://joshuaspoint.com/dauin-diving/) | Dive-area guide for the Dauin coast | Black-sand/macro editorial direction; candidate named sites; photography interest; relationship to Apo Island | Distance/time, current, level, fees, seasons, species placement, night-dive behaviour, operator trips, and host coordination |
| [Zamboanguita Diving](https://joshuaspoint.com/zamboanguita-diving/) | Dive-area guide for the Zamboanguita coast | Reef-and-macro editorial direction; candidate named sites; coastal relationship to Joshua's Point | Proximity comparisons, calmness, suitability, fees, conditions, species placement, access, and host arrangements |
| [Negros Oriental](https://joshuaspoint.com/negros-oriental/) | Broad regional overview | Evidence that diving is part of the wider Joshua's Point editorial world | Biodiversity counts, wildlife frequency, visibility, experience-level suitability, seasons, and ranking language |

The legacy metadata contains useful search subjects—Apo Island diving, Dauin muck diving and macro
photography, and Zamboanguita diving—but also contains claims such as easy access, short proximity,
quiet reefs, suitability, wildlife, and conditions. Preserve the subjects; re-verify or retire the
claims.

### Area and candidate-site inventory

These names are recorded because they appear in existing Joshua's Point material. They are not yet
approved CMS identities.

#### Apo Island

Existing area material names:

- Rock Point East / West
- Mamsa Point
- Sanctuary / Turtle Area
- Chapel
- Cogon
- Coconut Point

Before any document is created, a qualified reviewer must confirm the current public name, whether
East and West are separate records, suitable location precision, entry practice, and whether each
subject is appropriate for a public guide. Apo Island itself remains a `destination`; it must not
be represented as one catch-all `diveSite`.

#### Dauin

Existing area material names:

- Masaplod Marine Sanctuary
- El Dorado
- San Miguel / Tyre Reef
- Dauin House Reef
- Secret Corner

The slash and “house reef” naming require particular care: the audit cannot determine whether these
are current public names, aliases, operator-specific labels, or distinct sites. Dauin remains a
destination or dive-area subject; each confirmed underwater location becomes its own `diveSite`.

#### Zamboanguita

Existing area material names:

- Malatapay
- Lutoban Reef
- Thalatta
- Zamboanguita house reefs

The source does not establish whether all names describe discrete public dive sites, broader
coastal zones, departure context, or operator-associated sites. Do not create records until the
identity and access treatment are confirmed.

#### Siaton

No dedicated Joshua's Point Siaton dive-area page or approved named-site source was identified.
`Mainit Sanctuary` exists only in the internal backlog as a schema example whose area and facts
remain unverified. It is not an approved title, location, or publication candidate.

Siaton content must begin with owner input and qualified local dive review. It cannot use the fast
legacy-migration path available to Apo Island, Dauin, and Zamboanguita.

---

## 2. Current Dive Site CMS architecture

### Existing document types

#### `diveSite`

The repeatable document models one individual dive site and currently contains:

- identity: internal title, public name, slug, excerpt, hero image;
- editorial content: gallery, description, marine life, photography notes, safety notes;
- conditions: dive level, maximum and average depth, visibility, current, entry type, best season;
- location: shared `mapLocation` and an interactive-map flag;
- relationships: related dive sites and nearby destinations;
- governance: shared SEO, workflow status, and last-reviewed date.

This is the correct boundary for the project. It prevents an area such as Dauin from becoming one
technically ambiguous record.

### Existing validation strengths

- Public name, slug, excerpt, hero image, editorial description, and safety notes are required.
- Dive level, maximum depth, visibility, current, entry type, best season, and map location are
  required.
- Average depth cannot exceed maximum depth.
- Related dive sites are unique, limited, and cannot reference the same document.
- Hero-image, credit, SEO, gallery, review-date, and stale-content warnings support editorial QA.
- The Studio preview exposes workflow status and review date.

These requirements should not be weakened merely to publish early. Unknown technical fields should
keep a record in draft.

### `diveSitesPage` singleton

The singleton provides the `/dive-sites` hero, introduction, featured dive sites, editorial copy,
SEO, workflow status, and review date. Its explicit model matches the wider editorial architecture
and should remain separate from individual dive-site documents.

### Current CMS state

A read-only Sanity query returned no `diveSite` or `diveSitesPage` documents. There is therefore no
current draft to promote, no featured collection to review, and no published dive-site content.

### Architecture questions before content entry

These are narrow content-governance questions, not a recommendation for a page builder:

1. **Technical review record:** `lastReviewedAt` records when, but not who reviewed conditions,
   their role/qualification, or the scope of review. Decide whether this belongs in a shared
   Studio-only verification object before the first real draft.
2. **Marine observations:** `marineLife[]` currently stores strings. It cannot associate an
   observation with a site, date, source, identification confidence, or photography asset. Decide
   whether simple strings are sufficient for Version 1 or whether a structured, reusable
   observation object is necessary.
3. **Area organization:** The four priority areas need a deliberate collection mechanism. Avoid
   turning an area into a fake dive site. An explicit controlled area field or curated landing-page
   grouping may be needed after the first site boundaries are verified.
4. **Fees and access:** The current model deliberately has no fee or operator schedule fields.
   Decide whether volatile site access belongs in the dive-site record, a separately reviewed
   practical object, or area-level editorial guidance. Do not add it casually.
5. **Reviewer expiry:** The general stale threshold is 90 days. Confirm whether conditions, fees,
   access, and safety need different review intervals.

---

## 3. Existing frontend routes and components

### Ready foundation

- `/dive-sites` exists as a Server Component and renders the `diveSitesPage` singleton or a
  graceful editorial fallback.
- The landing page uses the Editorial Layout System and shared image utility.
- `FeaturedDiveSite` reuses the editorial featured-content composition.
- `DiveSiteMap` already adapts the shared provider-neutral map interface and returns a quiet
  placeholder when no provider is configured.
- The Relationship Engine already knows the future `/dive-sites/[slug]` URL shape and can resolve
  related dive sites and nearby destinations.
- The footer links to `/dive-sites` as “Dive Guide.”

### Missing frontend foundation

- No `/dive-sites/[slug]` route exists.
- No typed detail query or detail presentation model exists.
- The landing query projects only manually featured records; it does not provide a complete list.
- Featured records currently have no projected slug and therefore no working detail link.
- The query does not explicitly filter featured references by `seo.noIndex`.
- The dynamic sitemap includes `/dive-sites` but has no source for future published dive-site URLs.
- Dive-site canonical metadata, redirects, default Open Graph fallback, structured data, and
  detail-page not-found handling are not implemented.

These are appropriate future engineering tasks. They should follow—not precede—the first verified
content packet and approved detail-page contract.

---

## 4. SEO opportunities and migration risks

### Search subjects worth preserving

The existing site establishes useful, natural search subjects:

- Apo Island diving and snorkeling;
- named Apo Island dive sites, once verified;
- Dauin diving, muck diving, black-sand habitat, and underwater photography;
- named Dauin sites, once verified;
- Zamboanguita diving and named coastal sites, once verified;
- Southern Negros and Negros Oriental dive-guide orientation.

These subjects are not permission to repeat superlatives, promise wildlife, or publish fixed
conditions.

### Avoiding search overlap

Each search intent needs one canonical owner:

| Search intent | Canonical content type |
| --- | --- |
| Visiting Apo Island as a place | `destination` |
| Understanding diving around Apo Island | Dive-area landing/collection treatment |
| Diving Coconut Point or another confirmed site | Individual `diveSite` |
| Visiting Dauin or Zamboanguita above water | `destination` |
| Comparing several regional dive areas | `/dive-sites` editorial index |

Do not reproduce the same regional introduction, wildlife list, or practical guidance across every
site. Internal links should explain the relationship rather than duplicate content.

### Legacy URL migration

The following existing URLs have accumulated search and navigation value:

- `/marine-adventures/`
- `/apo-island-diving/`
- `/dauin-diving/`
- `/zamboanguita-diving/`

Do not redirect an area guide to one arbitrary individual dive site. Preserve these URLs until an
equivalent area-level destination exists, then create one-hop permanent redirects. Record the
mapping before replacing the legacy website.

### Metadata requirements

- Use the verified site name plus area naturally in the title.
- Keep descriptions observational and avoid guarantees about visibility, wildlife, currents,
  access, quiet, or suitability.
- Use one canonical URL per verified individual site.
- Keep incomplete drafts and technically unreviewed content out of the sitemap and marked
  `noIndex` if any preview deployment exposes them.
- Use an approved site-specific social image or the approved global fallback. Do not use an area
  photograph as proof of an individual site.
- Future detail pages should support `Article` and breadcrumb structured data only after the
  content and canonical hierarchy are final. Do not imply a booking product or operator listing.

---

## 5. Photography availability

### Current repository

There is no dive photography in `web/public/images`. The repository contains only House and Home
development photography. No existing WordPress dive asset should be copied into the repository or
uploaded to Sanity until provenance and rights are confirmed.

### Existing WordPress candidates

| Asset or group | Current source association | Possible future role | Required verification |
| --- | --- | --- | --- |
| `ezgif-4438...webp` | Apo Island aerial/reef placement | Dive-area or Apo destination context | Original file, photographer, exact subject/location, rights, drone compliance, date |
| `WPO3061...webp` | Turtle with reef fish on Apo material | Marine editorial candidate | Exact capture site/date, species ID, photographer, rights; do not promise sightings |
| `Sacoglossa-Costasiella...webp` | Dauin material | Macro editorial candidate | Exact site/date, accepted species identification, photographer, rights |
| `Thorny-Seahorse...webp` | Dauin material | Macro editorial candidate | Exact site/date, species identification, photographer, rights |
| `Warty-Frogfish...webp` | Dauin and Zamboanguita placements | Unassigned macro candidate | Placement is not provenance; verify site, date, species, photographer, rights |
| `Ghost-684x1024.jpg` | Zamboanguita material | Macro editorial candidate | Subject identification, site/date, descriptive alt text, photographer, rights |
| Wunderpus, Cyerce, pipefish, crab, and clownfish images | Reused across area pages | Unassigned gallery candidates | Original filenames, exact sites/dates, species identification, photographer, rights |

### Minimum photography packet per site

Before a `diveSite` can be approved, gather:

1. One site-specific hero image with verified location, date, photographer, rights, caption, and
   alt text.
2. Optional gallery images that add distinct habitat, topography, entry, or photographic context.
3. A subject record for every named marine organism shown.
4. Honest color treatment that does not manufacture visibility or habitat condition.
5. Consent for identifiable people and confirmation that publication does not reveal sensitive
   habitat or vulnerable-species locations.

Area photography may orient the reader, but it cannot silently stand in for a specific site.

---

## 6. Verification requirements

### Owner knowledge and observations

Create a source record for each area or first site before drafting. Record:

- whether Tobias has personally dived the site;
- when and how often;
- what sequence, habitat, light, movement, or atmosphere he remembers;
- which observations are safe and appropriate to publish;
- whether any account came from a guide, operator, guest, or photographer rather than Tobias;
- any commercial relationship or host arrangement that requires disclosure.

Owner experience can shape the editorial story. It cannot replace qualified review of technical
conditions and safety.

### Location and identity

For every candidate site, verify:

- current public name and aliases;
- area and municipality;
- whether the subject is one site, several variants, or an operator-specific label;
- coordinates and acceptable public precision;
- entry/meeting-point treatment and whether exact coordinates are sensitive;
- relationship to nearby destinations and other dive sites.

### Marine information

Verify habitat and marine-life wording independently. Separate:

- broad area character from one site's actual habitat;
- dated first-hand observations from expected or possible sightings;
- a photograph's species and capture site from where it was reused on the legacy site;
- common names from scientific identification;
- repeated observations from one exceptional sighting.

Do not publish biodiversity counts or claims about coral condition without a suitable current
source and review date.

### Species information

Each named species needs:

- reliable identification;
- observation or capture location;
- observation or capture date when material;
- observer or photographer;
- non-guaranteed language;
- protection of sensitive-location information.

The legacy site placement alone satisfies none of these requirements.

### Conditions and safety

A named qualified local dive professional must review:

- maximum and typical/average depth;
- visibility range and its context;
- current classification and variability;
- entry type;
- minimum appropriate dive level;
- seasonal guidance;
- safety notes and reasons a dive may be changed or cancelled;
- whether any public directions could encourage inappropriate unguided access.

Record the reviewer's name, role or qualification, review scope, and date internally. Conditions
must remain observations, never guarantees, and the guide must not replace an operator briefing or
assessment.

### Fees, schedules, operators, and access

Verify close to publication:

- sanctuary, conservation, camera, guide, boat, or local fees;
- who sets and collects each fee;
- whether cash or another payment constraint is current;
- access permissions and operator/guide requirements;
- departure points, schedules, and weather dependence;
- equipment and transport availability;
- any Joshua's Point coordination or referral practice.

Do not store a price or schedule merely because it appears on the legacy site. Record the source
and review date, and omit volatile information if the maintenance owner is unclear.

---

## 7. Priority-area readiness

| Area | Existing Joshua's Point source depth | Named-site readiness | Photography readiness | Main blocker | Recommended next action |
| --- | --- | --- | --- | --- | --- |
| Apo Island | Strong area guide plus regional/collection material | Candidate names only | Several area and marine candidates; provenance open | Qualified confirmation of site boundaries, conditions, access, and image capture sites | Create an Apo dive-area source packet and select one site only after specialist review |
| Dauin | Strong area guide and macro editorial direction | Candidate names only | Several macro candidates; provenance open | Site aliases/boundaries, conditions, fees, species placement, and rights | Review the named-site list with a Dauin professional; choose one evidence-rich site |
| Zamboanguita | Strong area guide and close relationship to Joshua's Point | Candidate names only | Several macro candidates; provenance open | Meaning of named sites/house reefs, access, comparisons, conditions, and rights | Confirm site identities and select one independently verifiable site |
| Siaton | No dedicated existing dive source located | None approved | None identified | No owner source, qualified site list, or photography | Begin with owner interview and specialist scoping; do not create a draft yet |

Priority should follow evidence, not the number of claims on the old site. The first production
candidate should be the site with the clearest identity, qualified reviewer, current field notes,
and rights-cleared photography.

---

## 8. Recommended fast migration sequence

1. **Name the qualified reviewer.** Confirm their area knowledge, role, and willingness to review
   identity, location, conditions, marine wording, and safety.
2. **Freeze the legacy source packet.** Preserve the four dive URLs, source text, metadata, and
   original media references before any redirects or site replacement.
3. **Resolve the area/site boundary.** Review the candidate names for Apo Island, Dauin, and
   Zamboanguita; remove aliases, area labels, operator-specific names, and ambiguous house reefs.
4. **Choose one first site.** Select by evidence completeness rather than prominence.
5. **Create an owner source record.** Capture Tobias's actual experience and public-safe
   observations without technical extrapolation.
6. **Create a technical verification record.** Record reviewer, coordinates, depths, visibility
   context, current, entry, level, season, safety, access, and review date.
7. **Audit photography.** Match original files to site, date, subject, photographer, consent,
   credit, and rights.
8. **Resolve the narrow model questions.** Decide technical-review storage, area organization, and
   whether marine observations need structured provenance before schema work.
9. **Create one unpublished draft.** Populate only approved owner observations and independently
   reviewed facts. Keep unknown required fields empty and the document unpublished.
10. **Design the detail route after the content packet is real.** Reuse the Editorial Layout,
    shared map, relationships, canonical/OG pattern, and published/indexable query conventions.
11. **Map legacy URLs only when equivalent pages exist.** Do not redirect an area guide to an
    unrelated single site.
12. **Repeat for the next area.** Begin Siaton only after original owner and specialist source work.

---

## 9. Decisions required before the first draft

1. Who is the named qualified dive reviewer for Apo Island, Dauin, and Zamboanguita?
2. Which candidate site has Tobias personally dived and can support the first owner source record?
3. Which original underwater files are available, and who owns each one?
4. Should Version 1 organize sites by a controlled area field, curated singleton groups, or a
   later collection model?
5. Does the project need Studio-only technical reviewer details before content entry?
6. Are marine-life strings sufficient for Version 1, or must observations carry site, date,
   source, and identification status?
7. Who owns the ongoing review of fees, access, and operator-dependent information?
8. Should `Mainit Sanctuary` remain a private placeholder, be renamed after verification, or be
   removed from the active backlog?

Until these decisions are answered, the correct next milestone is a qualified area-and-site
boundary review—not a Sanity draft or frontend page.
