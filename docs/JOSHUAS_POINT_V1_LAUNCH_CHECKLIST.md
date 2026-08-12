# Joshua's Point — Version 1 Launch Checklist

**Status date:** 11 August 2026
**Purpose:** Final release gate for the first public Joshua's Point Explorer Platform.

Version 1 is feature-complete. This checklist protects the work already built and separates true
launch blockers from improvements that can follow a stable release. A checked item must be verified
in the production environment; a local build is not evidence that production delivery, DNS,
analytics, or search indexing works.

## Release rule

Launch only when every P0 item is complete, an owner has accepted any explicitly documented
exception, and the deployed site has completed a 48-hour stabilization review. P1 and P2 items must
not quietly become launch blockers.

## P0 — Must complete before launch

### Enquiry delivery

- [ ] Confirm `mail@joshuaspoint.com` is monitored and is the public recipient and reply-to address.
- [ ] Add and verify a dedicated transactional sending subdomain in Resend; the current recommended
  value is `updates.joshuaspoint.com`.
- [ ] Add the exact SPF, DKIM, return-path, and any verification records supplied by Resend to DNS.
  Do not guess records or replace the root domain's existing mail records.
- [ ] Review the existing DMARC policy and mailbox reporting before changing it.
- [ ] Create a production Resend API key with sending access restricted to the verified domain.
- [ ] Configure these server-side production variables:
  - `ENQUIRY_EMAIL_PROVIDER=resend`
  - `ENQUIRY_FROM_EMAIL="Joshua's Point <enquiries@updates.joshuaspoint.com>"`, adjusted only if a
    different subdomain is actually verified
  - `ENQUIRY_TO_EMAIL=mail@joshuaspoint.com`
  - `ENQUIRY_REPLY_TO_EMAIL=mail@joshuaspoint.com`
  - `RESEND_API_KEY`
  - `NEXT_PUBLIC_SITE_URL=https://joshuaspoint.com`, or the final canonical production origin
- [ ] Redeploy after adding production secrets; confirm no secret is available to browser code,
  Sanity, source control, or public build output.
- [ ] Complete one controlled end-to-end enquiry test. Confirm exactly one internal notification and
  one guest confirmation arrive with accurate fields.
- [ ] Reply to the guest confirmation and confirm the reply reaches `mail@joshuaspoint.com`.
- [ ] Test a second external mailbox, inbox/junk placement, Resend delivery status, duplicate
  protection, and the public failure state.
- [ ] Confirm the deployment topology. The existing in-memory limiter is acceptable only for one
  long-lived application instance. A serverless or multi-instance deployment requires a shared
  expiring rate-limit store and an explicitly trusted proxy-header strategy before public launch.
- [ ] Assign ownership for inbox monitoring, delivery failures, and provider activity.

See [`ENQUIRY_EMAIL_SYSTEM.md`](./ENQUIRY_EMAIL_SYSTEM.md) for the exact operational sequence.

### Domain, hosting, and deployment

- [ ] Confirm the final production host, project ownership, billing, deploy permissions, and rollback
  owner.
- [ ] Point production DNS only after the target deployment is verified on its temporary domain.
- [ ] Verify apex and `www` behavior, permanent canonical redirect, HTTPS, certificate renewal, and
  no redirect loops.
- [ ] Confirm `NEXT_PUBLIC_SITE_URL` matches the canonical origin used by metadata, sitemap, and
  robots output.
- [ ] Run the complete public-route smoke test against the production deployment on desktop and
  mobile, in Light and Dark modes.
- [ ] Verify the production 404, legacy redirects, cache/revalidation behavior, and a rollback path.
- [ ] Confirm the Sanity production dataset and read configuration are correct for the deployed app.
- [ ] If the production Studio is deployed, configure its Sanity `appId` before release so Studio
  versions are controlled rather than following the automatic latest channel.

### Site Settings, metadata, and social sharing

- [ ] Create and publish the `siteSettings` singleton. No published instance exists in the current
  production dataset.
- [ ] Complete the canonical site URL, site title, default SEO description, contact details,
  navigation/footer governance, and approved booking/enquiry links in Site Settings.
- [ ] Select, upload, crop, credit, and approve a 1200 × 630 default social image. Several index and
  text-led routes currently have no Open Graph image because Site Settings has no default.
- [ ] Smoke-test title, description, canonical, robots, Open Graph, and Twitter metadata on every
  public route after Site Settings is published.
- [ ] Add only the confirmed Instagram and Facebook profiles to Site Settings. Confirm the Footer,
  Contact page, and Organization `sameAs` expose the same two URLs and no empty profiles.
- [ ] Update Instagram's public website field from `/coming-soon` to the canonical homepage and
  replace the current “dream vacation” bio with owner-approved Joshua's Point wording.
- [ ] Align official profile display names and approve one square profile identity asset plus any
  platform cover/header photography.
- [ ] Decide whether Home launches with up to three selected Instagram moments or the profile-link
  fallback. Any selected item must use its approved original Sanity image and exact post URL.
- [ ] Verify social links, accessible labels, new-tab behavior, focus states, and production social
  card previews using [`JOSHUAS_POINT_SOCIAL_PRESENCE_GUIDE.md`](./JOSHUAS_POINT_SOCIAL_PRESENCE_GUIDE.md).
- [ ] Verify that Home, Rooms, and their published room records have an editorial workflow state that
  matches their public status; they are published but currently carry `workflowStatus: draft`.

### Photography launch gate

- [ ] Approve or replace every development image that appears publicly. Development labels in the
  repository mean **not production approved** and **replace before launch** unless Tobias explicitly
  grants Version 1 approval.
- [ ] Approve a final Home hero/social crop and the Home editorial sequence.
- [ ] Approve the House hero and core sequence, including View, Morning, and Rain. The current House
  presentation is a static development fallback because no published `housePage` singleton exists.
- [ ] Add truthful preview photography for Ocean Suite and Garden Suite, or explicitly approve an
  image-free Version 1 Rooms presentation. Both published room records currently have no images.
- [ ] Resolve missing destination hero photography for Pulangbato Falls, Siaton, and Twin Lakes, or
  explicitly approve their honest text-first presentation.
- [ ] Resolve missing dive photography for Zamboanguita, or approve its image-free presentation.
- [ ] Make an explicit Version 1 decision for the five scenic routes, all of which currently lack
  hero photography. Missing photography must never be filled by a misleading place image.
- [ ] Confirm alt text, captions, credits, crop/hotspot, and rights for every launch image.
- [ ] Verify that no development image is represented as another location, weather condition, room,
  route, or activity.

### Content and owner decisions

- [ ] Complete or explicitly defer the remaining stay facts: maximum-guest policy, children, pets,
  kitchen and pool use, parking, Wi-Fi, power system guidance, accepted payment methods, balance due,
  currency, and inclusions/exclusions.
- [ ] Complete the verified Getting Here guidance for Dumaguete, Bacolod, flights, ferries, local
  transport, scooter rental, grocery stops, and arrival arrangements—or omit unsupported details.
- [ ] Review all FAQ answers that depend on the missing stay and arrival facts.
- [ ] Decide whether the House must be CMS-authoritative at launch. If yes, complete and publish the
  `housePage` singleton; if no, formally approve the current static presentation for Version 1.
- [ ] Conduct a final public copy review for privacy boundaries, factual accuracy, captions, contact
  details, and absence of internal workflow language.

### Legal and privacy

- [ ] Confirm the legal operator identity and contact details used by Privacy and Terms.
- [ ] Confirm enquiry-email and mailbox retention behavior and make the Privacy page match it.
- [ ] Confirm governing jurisdiction and any accommodation-specific terms that actually apply.
- [ ] Obtain an owner-approved legal review of Privacy, Terms, deposit, and cancellation wording.
- [ ] Verify that analytics, hosting, Sanity, Resend, and any map provider named at launch are covered
  accurately by the privacy notice.
- [ ] Confirm there is no newsletter subscription, booking engine, payment processing, or guest data
  storage beyond the behavior described publicly.

### Search, analytics, robots, and sitemap

- [ ] Choose and configure privacy-proportionate production analytics; define the small set of events
  needed for Version 1 and update privacy/consent behavior accordingly.
- [ ] Verify analytics with an owner test and confirm private enquiry content is never captured.
- [ ] Verify the domain in Google Search Console and submit the production sitemap.
- [ ] Inspect the deployed `/robots.txt` and `/sitemap.xml` using the canonical production origin.
- [ ] Confirm sitemap inclusion for all published, indexable destinations, scenic routes, and dive
  guides; confirm drafts, `seo.noIndex` documents, internal tools, Privacy, Terms, and unfinished
  routes are excluded as intended.
- [ ] Run a search-engine URL inspection for Home and one page of every public template.
- [ ] Confirm legacy redirects return permanent redirects without chains.

### Final quality gate

- [ ] Run TypeScript, ESLint, production Next.js build, Sanity schema validation, and
  `git diff --check` from the intended release revision.
- [ ] Run keyboard-only navigation through the header, mega menu, mobile menu, theme control, FAQ,
  form, all primary links, and footer.
- [ ] Verify visible focus, reduced-motion behavior, zoom/reflow, landmark and heading structure, form
  errors/status announcements, and image alternative text.
- [ ] Test current Chrome, Safari, Firefox, iOS Safari, and Android Chrome at representative widths.
- [ ] Confirm no horizontal overflow or broken images on every public template.
- [ ] Record a production Core Web Vitals/Lighthouse baseline on representative mobile and desktop
  pages; address any launch-critical regression.
- [ ] Verify Light, Dark, and System first paint, persistence, photographs, maps, overlays, forms,
  footer, and navigation.
- [ ] Complete a final owner acceptance pass as a first-time guest: discover the place, understand the
  rooms, explore a destination and route, read stay information, and send an enquiry.

## P1 — Soon after launch

- Replace any development photography temporarily approved for Version 1 with the final editorial
  set, without changing frontend architecture.
- Complete destination galleries and strengthen the visual pacing of image-light published pages.
- Add final Room photography and useful, truthful room previews.
- Populate and publish `housePage` if the static Version 1 presentation was intentionally retained.
- Complete qualified technical review for dive level, depth, visibility, current, entry, season, and
  safety fields before publishing those facts.
- Improve the Southern Negros Guide with additional owner-led context and relationships.
- Add further owner-approved destinations and scenic routes through the existing migration workflow.
- Enrich manual outgoing relationships and review incoming relationship relevance.
- Resolve the unpublished Mainit Sanctuary draft's missing review date or archive it if it is no
  longer planned.
- Add publication webhooks and targeted revalidation if editorial update speed requires them.
- Add YouTube, TikTok, or Pinterest only if Tobias confirms the exact official profile URL and the
  channel has a clear editorial owner.
- Add a shared production rate-limit store if traffic or deployment topology makes the in-memory
  limiter insufficient.
- Establish recurring accessibility, broken-link, metadata, performance, email-delivery, and stale
  content checks.
- Build a commissioned premium photography library covering landscape, house, rooms, routes, dive,
  weather, and real human moments.

## P2 — Future roadmap

- Enable the provider-neutral Joshua's Point Explorer Map after provider, cost, privacy,
  accessibility, and Southern Negros route-quality evaluation.
- Extend verified maps with carefully reviewed dive coordinates and route handoffs.
- Produce the premium Southern Negros Explorer Guide.
- Produce the Explorer, Dive, Scooter, Food, and Photography downloadable editions.
- Create an editorial book/PDF workflow with versioning, accessible output, delivery, and updates.
- Publish seasonal guides based on real reporting and repeatable review capacity.
- Launch the Journal only when a sustainable original-story pipeline exists.
- Add collections, favorites, offline/printable guidance, and GPX downloads only when they solve a
  proven guest need.
- Consider paid membership only after the guide has enduring value, update capacity, and a clear
  non-extractive promise.
- Add localization only with human editorial ownership and local review.

## Final platform review — issues only

### Desktop

- The content library is visually uneven: Rooms, all scenic routes, three destinations, and one dive
  guide currently lack representative photography.
- Routes and several index pages depend on the global metadata fallback but no default social image
  is configured.
- Interactive map adapters remain placeholders; the honest text and directions fallback is usable,
  but the visual map promise is not complete.

### Mobile

- Production-device testing on iOS Safari and Android Chrome is still required; local responsive
  review is not a substitute for hardware/browser coverage.
- Route pages containing long mapped paths need production-device performance observation even
  though their current textual fallback renders correctly.

### Light and Dark

- Semantic-token contrast is strong in the reviewed interface, but final photography crops and any
  future provider map UI still require review in both themes.
- A production first-paint test is still required under a cold cache and slow connection to confirm
  the initialization script prevents a wrong-theme flash in the deployed environment.

### Navigation

- The mega menu is intentionally curated and scalable, but the featured-destination selection needs
  periodic editorial review as the collection grows.
- Site Settings does not yet provide a published global navigation/footer source, so the production
  governance path remains incomplete even though current routes are correct.

### Writing

- Getting Here, FAQ, and Plan Your Stay cannot be fully final until the remaining owner policies and
  travel facts are confirmed.
- Published Home and Rooms content has a public/draft workflow mismatch in Studio.

### Photography

- Development photography is still present and not production-approved by its own records.
- Room, scenic-route, destination, and dive coverage gaps prevent a fully resolved editorial image
  rhythm.
- No approved default social image exists.

### Motion

- Reduced-motion behavior is implemented, but browser and assistive-technology regression testing
  is not yet recorded for the production build.

### Maps

- Google Maps, Mapbox, and Leaflet adapters do not yet render a configured interactive provider.
- Dive guides do not yet have verified mappable coordinates.
- The accessible fallback prevents a broken journey, but provider selection and live map QA remain
  future work unless interactive maps are declared a Version 1 requirement.

### SEO

- Search Console ownership and sitemap submission are not configured in repository-visible state.
- Global social sharing is incomplete without `siteSettings.defaultSocialImage`.
- Production-origin canonical, robots, sitemap, and redirect behavior still need deployment-level
  verification.

### Accessibility

- Automated and local interaction checks are positive, but a manual assistive-technology pass and
  representative real-device test remain outstanding.
- Final photography needs a complete alt-text/caption/credit review after replacements are selected.

### Performance

- No production Core Web Vitals or analytics baseline exists yet.
- Final image weight and crop behavior cannot be assessed until launch photography is selected.
- Interactive map performance is unknown because providers are intentionally not enabled.

### Consistency and operations

- `siteSettings` and `housePage` are not published in the current dataset.
- Published Home, Rooms Page, Ocean Suite, and Garden Suite still carry a draft workflow label.
- Production email, analytics, DNS, legal, monitoring, and rollback ownership are not yet proven.
- The Studio production build succeeds, but Sanity reports that no `appId` is configured and the
  deployed Studio would therefore follow the automatic latest update channel.

## Launch decision record

| Gate | Owner | Evidence | Date completed |
| --- | --- | --- | --- |
| Content and photography accepted | Tobias |  |  |
| Email delivery proven |  |  |  |
| Legal/privacy accepted |  |  |  |
| Production deployment verified |  |  |  |
| Accessibility/performance accepted |  |  |  |
| Search/analytics verified |  |  |  |
| Final go/no-go | Tobias |  |  |
