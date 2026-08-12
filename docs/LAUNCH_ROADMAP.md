# Joshua's Point — Launch Roadmap

> **Planning baseline:** This roadmap records the earlier Version 1 scope. The current release gate,
> live inventory, and final launch decisions are maintained in
> [`JOSHUAS_POINT_V1_LAUNCH_CHECKLIST.md`](./JOSHUAS_POINT_V1_LAUNCH_CHECKLIST.md) and
> [`JOSHUAS_POINT_CONTENT_STATUS.md`](./JOSHUAS_POINT_CONTENT_STATUS.md).

## Status and purpose

This document defines the scope, quality gates, and release path for **Joshua's Point Version
1.0**. It is a launch plan, not a promise to ship every idea already described elsewhere in the
repository.

Version 1.0 is ready when the public website feels complete, the published guide content is
trustworthy, and a guest can understand Joshua's Point and Southern Negros without encountering a
broken path, unfinished message, or unverified claim. Quality is the release gate; a date is not.

This roadmap should be read with:

- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`SANITY_CONTENT_MODEL.md`](./SANITY_CONTENT_MODEL.md)
- [`EDITORIAL_CONTENT_SYSTEM.md`](./EDITORIAL_CONTENT_SYSTEM.md)
- [`DESTINATION_SYSTEM.md`](./DESTINATION_SYSTEM.md)
- [`RELATIONSHIP_ENGINE.md`](./RELATIONSHIP_ENGINE.md)
- [`SOUTHERN_NEGROS_GUIDE_PRODUCT.md`](./SOUTHERN_NEGROS_GUIDE_PRODUCT.md)

### Definition of Version 1.0

Version 1.0 is the first public, production-ready expression of three connected ideas:

1. **Joshua's Point as a place to stay.** The house, rooms, atmosphere, and practical route to an
   enquiry are clear.
2. **Joshua's Point as an editorial guide.** A deliberately small collection of original,
   verified Southern Negros content is live.
3. **Joshua's Point as a trusted publisher.** Content has ownership, review dates, sources,
   photography rights, and a sustainable correction workflow.

The website may launch with a small library. It must not launch with a large, thin, or
poorly-verified one.

---

## 1. Launch vision

Version 1.0 should feel like arriving at Joshua's Point and opening the first edition of a
carefully made regional journal. It should be calm enough to browse without pressure, practical
enough to support a real journey, and specific enough to earn trust.

The launch is successful when:

- A prospective guest understands the character of the house before being asked to enquire.
- A reader can discover a small number of Southern Negros places through original, useful
  editorial work.
- Every published practical claim is verified, attributed where necessary, and dated.
- Photography carries the atmosphere without compromising page speed or accessibility.
- The website works well on a modest mobile device and an inconsistent connection.
- Technology, analytics, and commercial paths remain quiet and proportionate.

### Launch principles

- **Complete before broad.** Finish the core journeys before adding more routes or content types.
- **Original before frequent.** Publish first-hand work rather than meeting a content quota.
- **Useful before persuasive.** Help readers make decisions without urgency or inflated claims.
- **Measured before assumed.** Validate accessibility, performance, search visibility, and
  analytics before release.
- **Maintainable before impressive.** Every launch feature needs an owner and a realistic update
  path.

---

## 2. Features included

### Public website

Version 1.0 includes:

- A finished homepage using the approved Header, Hero, editorial sections, and Footer.
- The House page.
- The Rooms collection page with accurate accommodation details and restrained onward links.
- The Experiences page.
- The Destinations index and reusable destination detail template.
- The Dive Sites index and a reusable dive-site detail template.
- A Journal index and reusable article template.
- The Southern Negros Guide introduction at `/guide`.
- A clear Contact or Plan Your Stay page with current contact details and an external booking or
  enquiry path.
- Privacy and Terms pages appropriate to the actual launch behavior.
- A useful not-found page and graceful behavior for missing or unpublished CMS content.
- A functional responsive navigation experience, including the mobile menu.
- The global Footer on all public pages.

All public navigation links must resolve at launch. A route must not be linked merely because it
is planned.

### Editorial and CMS foundation

- Sanity-managed site settings and supported page content.
- Published Destination and Dive Site collections.
- Journal documents, categories, and article publishing flow needed by the launch library.
- Curated relationships between destinations, dive sites, experiences, and journal articles.
- Editorial images with alt text, captions, credits, and focal treatment where applicable.
- Draft, review, and publish responsibilities documented and followed, even if approval is handled
  operationally rather than through a custom workflow plugin.
- Graceful omission of unknown optional fields; no empty public sections.
- A correction route for factual errors and time-sensitive information.

### Platform quality

- Production deployment on the approved host with separate production configuration.
- Preview deployment for code review.
- Domain, HTTPS, redirects, error monitoring, backups, and recovery ownership.
- Metadata, sitemap, robots directives, canonical URLs, Open Graph images, and appropriate
  structured data.
- Privacy-conscious analytics with a written measurement plan.
- Accessibility and performance audits across every page template.

---

## 3. Features intentionally postponed

The following are outside Version 1.0 unless a genuine launch blocker emerges:

- Interactive Google Maps or Mapbox maps.
- Turn-by-turn navigation, route calculation, or live travel conditions.
- GPX downloads.
- Search, filters, faceted browsing, and destination sorting.
- User accounts, saved places, favorites, or personal itineraries.
- Offline website support or an installable app.
- A complete booking engine, live availability, room pricing, or inventory management.
- Guide pricing, on-site checkout, payment processing, and automated digital delivery.
- Memberships, subscriptions, bundles, and customer account libraries.
- Newsletter signup and marketing automation.
- Reviews, ratings, comments, testimonials, or community submissions.
- AI recommendations, chat, automated travel planning, or generated destination copy.
- Real-time weather, road, ferry, tide, marine, or dive-condition feeds.
- Operator directories, sponsored rankings, or marketplace features.
- Full draft-mode preview and visual editorial approval tooling.
- Localization and translated content.
- Morning/Evening atmosphere switching.
- Nonessential animation and cinematic page transitions.

Postponed does not mean rejected. Each item must earn its place through reader need, editorial
capacity, safety, privacy, performance, and maintenance cost.

---

## 4. Content targets

Content targets are launch gates, not incentives to publish weak work. A piece counts only after it
passes the publishing checklist and quality score in
[`EDITORIAL_CONTENT_SYSTEM.md`](./EDITORIAL_CONTENT_SYSTEM.md).

### Launch library

| Content type | Minimum launch gate | Healthy Version 1.0 target | Notes |
| --- | ---: | ---: | --- |
| Destinations | 6 | 8–10 | Include different journey types and distances; do not cluster every entry around one category. |
| Dive sites | 3 | 4–6 | Every profile requires review by an appropriately qualified local dive professional. |
| Journal articles | 3 | 4–6 | Each article must add original reporting, observation, or regional context; no listicles. |

### Destination mix

The launch collection should contain a balanced sample rather than attempt regional completeness:

- At least one nearby, low-complexity outing.
- At least one longer journey whose road and timing need careful explanation.
- At least one water or forest landscape.
- At least one town, market, food, coffee, craft, or cultural story.
- No sensitive place whose publication would create ecological, cultural, privacy, or access harm.

Casaroro Falls remains the gold-standard template. It should be completed and reviewed before the
remaining destination entries are produced at scale.

### Dive-site standard

- Separate enduring editorial description from variable conditions.
- Verify names, location precision, access, depth, current, seasonality, and safety statements.
- Date marine-life observations and photography notes where relevant.
- State clearly that the guide does not replace operator briefings, current conditions, training,
  or professional judgment.
- Leave uncertain facts unpublished rather than filling them with estimates.

### Journal mix

The first journal edition should demonstrate the range of Joshua's Point without becoming a news
feed. Recommended launch territory:

1. One place-led field story.
2. One architecture, material, or landscape story connected to the house.
3. One regional food, road, marine, or community story based on original reporting.

### Core page content

Before launch, the Home, House, Rooms, Experiences, Guide, Contact, Privacy, and Terms pages must
contain final copy. Placeholder language may remain in development only when visibly labelled and
excluded from production publishing.

Every public content item needs:

- A named editorial owner.
- A factual source record where applicable.
- A last-reviewed date for volatile information.
- Final title, introduction, body, metadata, and social description.
- An accessibility and link review.
- A defined re-review date.

---

## 5. Photography targets

Photography is part of the editorial record, not decoration. Version 1.0 should use original
Joshua's Point photography or properly commissioned/licensed regional work. Stock imagery and
generic destination substitutions are not launch-ready.

### Coverage targets

| Area | Minimum coverage |
| --- | --- |
| Homepage | 3–5 defining images covering arrival, architecture, and landscape |
| The House | 8–12 images covering exterior, interior, materials, light, and relationship to place |
| Rooms | Hero plus at least 4 useful images for each published room |
| Experiences | One representative hero image for each published preview |
| Destinations | Hero plus at least 3 story-specific images for each launch destination |
| Dive sites | Hero plus at least 2 accurately identified and contextually relevant images per site |
| Journal | A story-specific set sufficient to establish place without repeating unrelated library images |
| Guide landing page | A coherent preview set drawn from verified guide reporting |

These are minimums, not gallery quotas. A shorter, coherent edit is preferable to repeated or weak
images.

### Required photographic treatment

- Capture landscape, portrait, and panoramic frames needed by the Editorial Media system.
- Preserve natural light, material color, weather, and scale; avoid heavy presets and artificial
  staging.
- Record photographer, date, location, consent, licensing scope, and usage restrictions.
- Confirm names and context for people, species, sites, food, and cultural material shown.
- Write descriptive alt text for informative images and quiet captions that add context.
- Use empty alternative text only when an image is genuinely decorative.
- Do not publish precise visual location clues for sensitive or restricted places.
- Keep archival master files outside the delivery pipeline; generate web derivatives from them.
- Deliver responsive sizes through the shared image system and avoid shipping original-resolution
  files to browsers.

### Photography launch gate

Before release, review every image at mobile and desktop widths for crop, focal point, caption,
credit, alternative text, compression, color consistency, and licensing. No image may launch with
an ambiguous usage right.

---

## 6. SEO targets

SEO supports discovery of useful editorial work. It must never reshape the voice into generic
travel copy.

### Technical targets

- Every indexable page has a unique title, description, canonical URL, and representative social
  image.
- Production robots rules allow intended public pages and exclude internal Design System,
  Typography Lab, preview, and administrative routes.
- Generate an XML sitemap from published canonical content and exclude drafts, fallbacks, and
  non-indexable internal pages. Google describes sitemaps as a way to communicate important URLs
  and their relationships; they improve discovery but do not guarantee indexing. See
  [Google's sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview).
- Submit and verify the production property in Google Search Console after the canonical domain is
  live.
- Use permanent redirects for replaced launch URLs and eliminate redirect chains.
- Ship no broken internal links, orphaned launch articles, duplicate canonical pages, or accidental
  `noindex` directives.
- Validate social previews and structured data against the rendered production page.

### Structured data

Use JSON-LD only where the page content and a supported vocabulary genuinely match. Likely launch
uses include organization or accommodation identity, breadcrumb context, and journal articles.
Destination and dive-site markup should not be forced into an inaccurate type.

Google recommends JSON-LD when the site setup supports it because it is generally easier to
maintain at scale; eligibility still depends on compliant, visible page content. See
[Google's structured-data introduction](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

### Editorial targets

- Answer real planning questions naturally within the relevant story and practical sections.
- Use one stable, human-readable slug per document.
- Provide meaningful internal links through the Relationship Engine, not keyword-rich boilerplate.
- Give images useful filenames, dimensions, captions, and alternative text.
- Preserve evergreen URLs while updating volatile facts and review dates.
- Avoid programmatic thin pages, copied descriptions, location keyword variants, and claims written
  for ranking rather than truth.

### Measurement

At launch, record a baseline rather than promise rankings:

- Indexed versus submitted public URLs.
- Crawl and structured-data errors.
- Search impressions and clicks by page family.
- Branded versus non-branded discovery.
- Organic landing pages leading to meaningful reading or a stay enquiry.

Review technical issues weekly during the first month and editorial discovery monthly. Search
traffic never overrides accuracy, privacy, ecological care, or the project's voice.

---

## 7. Commerce targets

Version 1.0 is not an ecommerce launch.

### Stay enquiries

- Provide one clear, current path from “Book Stay” or “Plan Your Stay” to the approved external
  booking or enquiry destination.
- Manage the destination URL through Site Settings rather than duplicating it across components.
- Do not display live rates, availability, inventory, or urgency language unless a future booking
  integration can guarantee accuracy and accessibility.
- Verify the complete handoff on mobile and desktop, including what happens if the external service
  is unavailable.

### Southern Negros Guide

- Version 1.0 launches the editorial introduction and representative preview only.
- Do not publish pricing, checkout, payment buttons, or purchase promises until the Explorer Guide
  is complete, licensed, accessible, tested offline, and supported by an update and refund process.
- Use the evaluation criteria in
  [`SOUTHERN_NEGROS_GUIDE_PRODUCT.md`](./SOUTHERN_NEGROS_GUIDE_PRODUCT.md) before selecting a payment
  and delivery provider.
- A commerce decision requires confirmed Philippine seller eligibility, international payment
  coverage, tax responsibilities, fees, settlement, accessible checkout, PDF delivery, refunds,
  customer support, and data-processing terms.

### Commerce success for Version 1.0

Success means a guest can make a stay enquiry without friction and a guide reader can understand
the future publication without being sold an unfinished product. Revenue is not a Version 1.0
website launch gate.

---

## 8. Analytics

Analytics should answer a small number of product and editorial questions without turning the site
into a surveillance system.

### Questions to answer

- Which page families help readers continue into meaningful related content?
- Which destination and dive-site stories are being read, and where do readers leave?
- Do visitors reach the Contact or external booking path after understanding the place?
- Does the Guide introduction create sustained interest in the publication?
- Which device and connection conditions reveal performance or usability problems?

### Version 1.0 measurement plan

Measure:

- Page views and landing pages.
- Engaged reading using restrained, documented signals rather than noisy scroll events.
- Outbound booking or enquiry link activation.
- Navigation from editorial pages into genuinely related content.
- Guide page visits and return visits, without inventing a purchase funnel.
- Web performance field data where the selected platform supports it.
- Not-found pages and application errors without collecting form content or sensitive URL data.

### Privacy and governance

- Select the least invasive tool that answers the approved questions.
- Document every event name, purpose, data field, owner, and retention period before launch.
- Do not collect precise location, typed form content, full IP addresses where avoidable, or
  unnecessary user-level identifiers.
- Do not add advertising pixels, cross-site tracking, fingerprinting, or session replay in Version
  1.0.
- Respect consent requirements and Do Not Track or Global Privacy Control where the chosen policy
  and tool support them.
- Keep analytics and marketing consent separate from essential site operation.
- Verify that Privacy copy describes the production configuration, not an aspirational one.
- Limit access, define retention, and review the measurement plan quarterly.

### Initial reporting cadence

- **First 72 hours:** errors, broken paths, traffic anomalies, and consent behavior.
- **First month:** weekly performance, acquisition, content, and enquiry-path review.
- **After stabilization:** one calm monthly editorial and platform review.

Avoid daily optimization and vanity dashboards. Small launch samples should not drive premature
design or editorial changes.

---

## 9. Performance goals

The primary performance gate is real user experience on mobile, not a single laboratory score.

### Core Web Vitals

At the 75th percentile of page visits, target the current “good” thresholds across mobile and
desktop:

- **Largest Contentful Paint (LCP):** 2.5 seconds or less.
- **Interaction to Next Paint (INP):** 200 milliseconds or less.
- **Cumulative Layout Shift (CLS):** 0.1 or less.

These thresholds and percentile method follow the current
[Core Web Vitals guidance](https://web.dev/articles/defining-core-web-vitals-thresholds). Field data
may take time to accumulate after launch, so pre-launch lab tests are a gate and post-launch field
data is the continuing measure.

### Launch performance requirements

- Achieve a Lighthouse Performance score of at least 90 on representative mobile runs for Home,
  House, Rooms, Destinations, a destination detail page, Dive Sites, a journal article, Guide, and
  Contact. Investigate variance rather than treating one run as proof.
- Render editorial pages primarily as Server Components and ship no client JavaScript without a
  defined interaction need.
- Establish the compressed JavaScript and CSS baseline for every launch template; block any
  unexplained regression greater than 10 percent before release.
- Use `next/image` or the shared image pipeline for correctly sized responsive images.
- Reserve image dimensions and font space to prevent layout shift.
- Preload only the actual above-the-fold priority image and approved brand fonts.
- Keep Newsreader and Manrope centralized, subsetted, and self-hosted through the existing font
  configuration.
- Avoid third-party scripts unless their launch value, privacy cost, and performance budget are
  approved.
- Test on a mid-range mobile viewport with network and CPU throttling, not only a fast desktop.
- Confirm graceful content rendering if an image or Sanity response is unavailable.

### Operational monitoring

- Track Core Web Vitals by page family after sufficient field data exists.
- Record image payload, JavaScript, CSS, and third-party request changes in release review.
- Treat a failing Core Web Vital, a severe mobile regression, or unstable layout as a launch
  blocker unless explicitly accepted with an owner and resolution date.

---

## 10. Accessibility goals

Version 1.0 targets **WCAG 2.2 Level AA** across the public website. W3C recommends using the latest
WCAG 2 version, and WCAG 2.2 is the current stable Recommendation described in the
[W3C WCAG overview](https://www.w3.org/WAI/standards-guidelines/wcag/).

### Required outcomes

- Every page has a unique title, one meaningful primary heading, logical heading order, and clear
  landmarks.
- All navigation and actions work by keyboard alone with visible, unobscured focus.
- The mobile navigation correctly exposes name, role, state, focus order, focus return, and Escape
  behavior.
- Text, controls, focus indicators, and meaningful visual information meet applicable contrast
  requirements in every approved atmosphere.
- Links are understandable from their text and surrounding context; repeated “Read more” links
  have accessible names that identify their destination.
- Informative images have useful alternative text; decorative placeholders are hidden from
  assistive technology.
- Captions, credits, maps, and future media do not carry essential information only visually.
- Touch targets meet WCAG 2.2 minimum sizing and spacing requirements.
- Pages remain readable at 200 percent zoom and usable under text-spacing overrides and narrow
  reflow conditions.
- Motion is absent or respects reduced-motion preferences when introduced later.
- Forms use persistent labels, clear instructions, useful error messages, programmatic error
  associations, and an accessible success state.
- Language, unusual local terms, abbreviations, and safety qualifications are understandable.
- Dynamic content and CMS fallbacks do not create empty headings or confusing landmarks.

### Test method

Automated tests are necessary but not sufficient. Before launch:

1. Run automated checks on every public template and resolve all serious violations.
2. Complete keyboard-only review at mobile and desktop widths.
3. Test representative pages with VoiceOver and at least one additional browser/screen-reader
   combination when available.
4. Review zoom, reflow, high contrast, reduced motion, form errors, and touch targets manually.
5. Audit every launch image's alternative text and every link's accessible name.
6. Record known limitations with an owner and remediation date; unresolved Level A or AA blockers
   prevent launch.

An accessibility statement and a clear way to report a barrier should be available at launch.

---

## 11. Launch checklist

The release owner should copy this checklist into the launch issue and assign every item. A checked
box requires evidence, not confidence.

### Scope and content

- [ ] Version 1.0 route inventory is final and approved.
- [ ] Every public navigation and footer link resolves correctly.
- [ ] Home, House, Rooms, Experiences, Guide, Contact, Privacy, and Terms contain final copy.
- [ ] Destination, Dive Site, and Journal minimum launch targets are met.
- [ ] Every published item passed factual, editorial, accessibility, SEO, and originality review.
- [ ] Volatile facts show a review date and have a named re-review owner.
- [ ] Placeholder copy, unverified claims, test documents, and unused seed content are excluded from
      production.
- [ ] Relationship sections contain intentional recommendations and disappear cleanly when empty.
- [ ] Contact details, address treatment, social links, and booking destination are verified.

### Photography and rights

- [ ] Every public image has a confirmed owner, licence, allowed use, and credit requirement.
- [ ] People, private property, cultural material, and sensitive locations have appropriate consent
      and treatment.
- [ ] Crops and focal points are reviewed on small mobile, tablet, laptop, and wide screens.
- [ ] Informative alt text and useful captions are complete.
- [ ] Responsive derivatives are generated and oversized originals are not publicly served.
- [ ] No stock substitute or misleading destination image remains.

### CMS and editorial operations

- [ ] Production dataset and environment variables are confirmed.
- [ ] Singleton documents exist once and are protected from accidental duplication or deletion.
- [ ] Required documents are published; drafts do not leak into production queries.
- [ ] Editor titles, descriptions, validation, ordering, and Studio structure are reviewed.
- [ ] At least two editors can complete draft, review, correction, and publish workflows.
- [ ] Dataset backup/export and restore procedure has been rehearsed.
- [ ] Content correction contact and escalation path are documented.

### Engineering and deployment

- [ ] Lint, TypeScript, tests, and production builds pass for the website and Studio.
- [ ] Server Components, cache behavior, image URLs, and Sanity failure fallbacks are verified.
- [ ] Production, preview, and local environment values are separated and documented.
- [ ] Canonical domain, DNS, HTTPS, and `www`/non-`www` redirect policy are correct.
- [ ] Custom 404 and application error behavior are tested.
- [ ] Error monitoring is configured without capturing sensitive content.
- [ ] Rollback procedure and release owner are documented and rehearsed.
- [ ] No secrets, source maps with sensitive data, local files, or development routes are exposed.

### SEO

- [ ] Unique metadata, canonical URL, and social image exist for every indexable page.
- [ ] Sitemap contains only canonical published URLs.
- [ ] Robots directives exclude internal, preview, and administrative routes.
- [ ] Structured data matches visible content and passes validation.
- [ ] Internal links contain no broken, redirected, or orphaned launch paths.
- [ ] Search Console property is verified and the sitemap is submitted.
- [ ] Production pages are checked for accidental `noindex` after deployment.

### Performance

- [ ] Core Web Vitals lab proxies and Lighthouse targets pass on representative templates.
- [ ] JavaScript, CSS, image, font, and third-party request baselines are recorded.
- [ ] Above-the-fold images are prioritized intentionally; below-the-fold media is deferred.
- [ ] Pages are tested with mobile CPU and network throttling.
- [ ] No layout shifts appear during font, image, or CMS content loading.
- [ ] Analytics and monitoring scripts remain within the approved performance budget.

### Accessibility

- [ ] Automated accessibility scans contain no serious unresolved violations.
- [ ] Keyboard navigation and focus behavior pass on every template.
- [ ] Mobile menu, forms, links, and external handoffs pass manual review.
- [ ] Screen-reader review is complete on representative content journeys.
- [ ] Contrast, zoom, reflow, text spacing, touch target, and reduced-motion checks pass.
- [ ] Accessibility statement and reporting contact are published.

### Privacy, analytics, and legal

- [ ] Analytics events match the approved measurement plan exactly.
- [ ] Consent behavior is legally reviewed for the actual tools and visitor regions in scope.
- [ ] Privacy and Terms pages describe the production system accurately.
- [ ] Data retention, deletion, access, and ownership are documented.
- [ ] No advertising, fingerprinting, session replay, or unapproved tracking is present.
- [ ] External booking and social services are disclosed where required.

### Final release

- [ ] A content freeze window and final editorial owner are agreed.
- [ ] Cross-browser and real-device smoke tests pass.
- [ ] Production smoke test covers every primary navigation path and one CMS detail page per type.
- [ ] Monitoring, correction, enquiry, and incident owners are available for launch week.
- [ ] Known non-blocking issues are documented with priority, owner, and target release.
- [ ] Final go/no-go review is approved by product, editorial, design, and engineering owners.

---

## 12. Version 1.1 ideas

Version 1.1 should respond to observed launch needs and editorial capacity. Likely candidates are:

- Expand the launch collection with a small second editorial edition.
- Add more complete relationship curation and transparent automatic fallbacks.
- Introduce static or lightweight map context after provider, privacy, accessibility, and cost
  review.
- Add destination or dive-site detail refinements based on real reading behavior.
- Implement draft-mode preview and a stronger editorial review view.
- Improve content review reminders and visible “last verified” treatment.
- Publish the first accessible Explorer Guide sample or complete edition.
- Select a commerce and delivery provider only if the guide, support workflow, tax position, and
  legal terms are ready.
- Add a restrained guide-interest mechanism only with a clear purpose and consent model.
- Expand structured data where a supported type accurately matches published content.
- Introduce a small number of purposeful motion details after reduced-motion and performance review.
- Strengthen automated regression coverage for accessibility, links, metadata, and CMS queries.

Version 1.1 is not an excuse to absorb unfinished Version 1.0 requirements. Launch defects and
missing accessibility, verification, legal, or trust work are corrections, not enhancements.

---

## 13. Version 2.0 ideas

Version 2.0 may turn the editorial foundation into a more portable guide platform, provided reader
need and operational capacity justify it.

Potential directions include:

- Interactive regional maps with accessible non-map alternatives.
- Carefully versioned route layers and GPX downloads with a safety and correction model.
- Offline reading, downloadable collections, or an installable guide experience.
- Paid Explorer, Dive, Scooter, and Food editions with accessible checkout and delivery.
- Customer access to purchased editions and clearly defined updates.
- Saved places and personal collections without public popularity rankings.
- A guest guide connecting a stay with house information and regional reading.
- Thoughtful localization after editorial ownership and translation review are established.
- Seasonal collections, recipes, travel tips, and commissioned contributor stories.
- A Morning and Evening atmosphere system if it improves reading rather than adding novelty.
- Membership only if recurring editorial value, support, licensing, privacy, and cancellation can
  be sustained without urgency mechanics.

Version 2.0 should not become a marketplace, social network, real-time safety service, or automated
content farm. The governing question remains simple: **does this help someone understand and move
through Southern Negros with greater care?**

---

## Recommended release sequence

1. **Close the public journey.** Complete missing routes, mobile navigation, contact path, legal
   pages, and error states.
2. **Finish one gold-standard content path.** Complete Casaroro Falls from research through
   publication, photography, relationships, metadata, and review.
3. **Complete the reusable templates.** Finalize dive-site and journal detail journeys before
   producing the wider library.
4. **Produce the launch edition.** Research, photograph, verify, edit, and publish only enough
   pieces to meet the quality-gated minimums.
5. **Harden the platform.** Complete performance, accessibility, privacy, SEO, analytics, CMS,
   backup, security, and rollback work.
6. **Run a private release.** Ask a small group of guests, local reviewers, and specialist readers
   to complete real journeys and report confusion or factual gaps.
7. **Correct and freeze.** Resolve blockers, complete final fact checks, and hold a short content
   freeze.
8. **Launch quietly.** Monitor errors and corrections closely without introducing simultaneous
   commerce or campaign complexity.
9. **Review after 30 days.** Compare evidence with the goals in this roadmap before selecting
   Version 1.1 work.
