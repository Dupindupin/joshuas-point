# Joshua's Point — Content Status

**Inventory date:** 11 August 2026
**Dataset reviewed:** Sanity `production`, published perspective
**Purpose:** Current-state inventory at the Version 1 launch-preparation boundary

## Status language

- **Completed:** Implemented and publicly coherent in the current platform.
- **Needs photography:** A truthful image is absent or a development image still needs production
  approval/replacement.
- **Needs owner input:** Tobias must provide or approve a policy, fact, wording, or launch decision.
- **Needs verification:** A volatile, legal, technical, or deployment fact requires accountable
  review.
- **Future:** Deliberately outside the Version 1 core or safe to improve after launch.

“Completed” does not mean every P0 operational launch gate has passed. Use
[`JOSHUAS_POINT_V1_LAUNCH_CHECKLIST.md`](./JOSHUAS_POINT_V1_LAUNCH_CHECKLIST.md) for release approval.

## Platform summary

| Area | Completed | Needs photography | Needs owner input | Needs verification | Future |
| --- | --- | --- | --- | --- | --- |
| Home | Published CMS data, responsive editorial sequence, theme/motion/SEO integration | All current local assets remain development photography; final hero/social crop required | Approve final image set and align published workflow status | Final captions, credits, alt text, and public copy acceptance | Enrich Southern Negros relationships when useful |
| The House | Complete editorial page, typed CMS mapper/query, static fallback, development image flow | Final Hero, View, Morning, Rain, shared-space/details sequence | Decide whether static Version 1 is acceptable or `housePage` must be published | Final image rights/captions and any remaining material terminology | Make CMS authoritative after approved entry if deferred |
| Rooms | Rooms index and two published room documents: Ocean Suite and Garden Suite; verified capacity/bed/bath descriptions | Both room records and Rooms Page have no CMS preview/hero photography | Approve/assign truthful room images; complete remaining stay-policy facts | Confirm inclusions, use conditions, payment and balance details | Individual room pages remain intentionally deferred |
| Destinations | Index plus 10 published, indexable detail pages; canonical metadata, sitemap, redirects, maps/directions, relationships | Pulangbato Falls, Siaton, and Twin Lakes lack hero images; all galleries empty | Select/approve missing images and future destination priorities | Re-review volatile practical facts on schedule | More destinations and richer galleries/relationships |
| Guide | Public editorial `/guide` landing page integrated with global systems | Optional final editorial sequence | Approve the Version 1 scope and any final owner-led passages | Verify every practical claim introduced later | Premium Explorer, Dive, Scooter, Food, and Photography editions |
| Dive | Index plus 3 published, indexable guides: Apo Island, Dauin, Zamboanguita | Zamboanguita lacks hero image; galleries empty | Approve imagery and future priority areas | Qualified review of depth, current, visibility, entry, season, marine and safety facts before those details are published | More areas, relationships, and verified map coordinates |
| Scenic Routes | Index plus 5 published routes with verified owner-approved route paths and accessible summaries | All route pages and the index lack hero photography | Approve image-free Version 1 or assign truthful route images | Deployment-level map/directions test; volatile stop details as they change | Additional routes, GPX, provider map, collections |
| Plan Your Stay | Public page with confirmed check-in, check-out, two-night minimum, deposit, and cancellation wording | No launch-critical requirement | Maximum guests, children, pets, kitchen/pool/parking/Wi-Fi/power, payments, balance, currency, inclusions/exclusions | Legal/policy review and consistency with actual operations | Booking/payment flow only after separate approval |
| Getting Here | Public editorial route and reusable information pattern | No launch-critical requirement | Verified arrival, flight, ferry, transport, scooter, grocery, and arrival guidance | Time-sensitive transport information before publication | CMS-managed practical guide and provider map when justified |
| FAQ | Accessible one-open-at-a-time disclosure and schema-ready data | None | Final factual answers for stay, arrival, house rules, accessibility, weather, diving, and nearby food | FAQ JSON-LD must continue to match visible answers | Sanity-managed FAQ only when editorial maintenance requires it |
| Contact | Public contact route, accessible form, Server Action, validation, honeypot, size/date limits, email abstraction, success/error states | None | Confirm mailbox monitoring and production sender choice | Resend/DNS/env, E2E delivery, reply-to, junk placement, rate-limit topology | Shared limiter and stronger abuse protection if measured need emerges |
| Privacy / Terms | Public clarity pages, intentionally excluded from search | None | Legal operator details, retention, jurisdiction, final policy acceptance | Legal review against production vendors and actual behavior | Update when commerce, analytics, maps, or storage behavior changes |
| SEO | Central metadata helper, canonicals, dynamic sitemap, robots, redirects, FAQ structured data, noindex rules | No default social image because `siteSettings` is unpublished | Approve default 1200 × 630 social image and canonical production origin | Search Console, production metadata/redirect/robots/sitemap tests | Additional verified structured data and ongoing search reporting |
| Social presence | Instagram and Facebook confirmed; one Site Settings source now feeds Footer, Contact, and Organization `sameAs`; Open Graph/Twitter fallbacks are centralized | Default sharing image, profile image, and cover/header image still require approval | Complete/publish Site Settings; update profile bio/name/website fields | Production account links, card previews, structured data, and accessibility | YouTube, TikTok, and Pinterest only after exact owner confirmation |
| Maps | Shared provider-neutral domain model, destination/dive/route wrappers, accessible fallback, external directions where supplied | Maps do not depend on photography | Decide whether interactive maps are required for V1 | Provider, tokens, privacy, accessibility, cost, route quality; dive coordinates | Enable one provider, GPX/offline features, richer Explorer Map |
| Photography | Sanity image object and shared Next.js utility; role-based local development workflow | Broad replacement/approval work remains across Home, House, Rooms, routes, destinations, dive, social | Select and approve the Version 1 set | Rights, credits, alt, captions, crop, file weight, truthful location | Premium commissioned library and seasonal coverage |
| Navigation | Accessible mobile navigation; scalable editorial desktop mega menu; only public routes exposed | None | Periodically curate featured destination examples | Cross-browser/touch production regression | Add new groups only when routes are publicly ready |
| Theme and motion | Light/Dark/System, first-paint initialization, persistence, semantic tokens, reduced-motion support | Final photos need both-theme review | None | Production cold-cache and assistive-technology test | Refinement only; no new motion system needed |
| Analytics | No private enquiry content is intentionally captured | None | Choose provider, measurement plan, consent posture, and owner | Production event/privacy verification | Mature reporting only after real questions emerge |
| Studio deployment | Schema validates with no errors or warnings; production Studio builds | None | Confirm whether Studio is part of the launch deployment | Configure Sanity `appId` to avoid uncontrolled automatic update-channel behavior | Operational monitoring and update cadence |

## Published CMS inventory

### Page singletons

| Document | Public state | Workflow state | Photography | Note |
| --- | --- | --- | --- | --- |
| `homePage` | Published and authoritative | Draft | Hero present | Workflow label should match public approval before launch |
| `housePage` | Not published | — | — | `/the-house` uses the approved static development fallback |
| `roomsPage` | Published and authoritative | Draft | No hero | Workflow label and photography need attention |
| `destinationsPage` | Published and authoritative | Approved | No hero | SEO present; index can remain text-led with owner approval |
| `scenicRoutesPage` | Published and authoritative | Approved | No hero | Five published routes shown |
| `diveSitesPage` | Published and authoritative | Approved | No hero | Three published guides shown |
| `siteSettings` | Not published | — | No default social image | P0 global configuration gap |

### Rooms

| Document | Status | Confirmed public facts | Photography |
| --- | --- | --- | --- |
| Ocean Suite | Published; workflow Draft | 2 guests, king bed, private ensuite, Bohol Sea view, pool and sea view | No CMS image assigned |
| Garden Suite | Published; workflow Draft | 2 guests, queen bed, private ensuite, garden-and-pool outlook | No CMS image assigned |

No Ridge, Courtyard, or placeholder room entries remain in the published inventory.

### Destinations

| Destination | Published/indexable | Hero image | Current content status |
| --- | --- | --- | --- |
| Apo Island | Yes | Present | Approved |
| Casaroro Falls | Yes | Present | Approved owner-led migration |
| Dauin | Yes | Present | Approved |
| Dumaguete | Yes | Present | Approved |
| Lake Balanan | Yes | Present | Approved owner-led migration |
| Najandig Peak | Yes | Present | Approved |
| Pulangbato Falls | Yes | Missing | Text-first until truthful image is assigned |
| Siaton | Yes | Missing | Text-first until truthful image is assigned |
| Twin Lakes | Yes | Missing | Text-first until truthful image is assigned |
| Valencia | Yes | Present | Approved |

All currently queried destination galleries are empty. The absence is optional and must not create
empty public sections.

### Scenic Routes

| Route | Published/indexable | Route data | Hero image |
| --- | --- | --- | --- |
| Coastal Ride to Dumaguete | Yes | Present | Missing |
| Southern Explorer | Yes | Present | Missing |
| Twin Lakes Escape | Yes | Present | Missing |
| Valencia Highlands Loop | Yes | Present | Missing |
| Waterfall Explorer | Yes | Present | Missing |

Tobias has confirmed the published routes and route maps as owner-approved. They are not awaiting
field verification merely because they were migrated. Time-sensitive stop or access facts still
require ordinary editorial maintenance.

### Dive guides

| Dive guide | Published/indexable | Hero image | Technical status |
| --- | --- | --- | --- |
| Apo Island | Yes | Present | Editorial introduction published; technical conditions remain bounded |
| Dauin | Yes | Present | Editorial introduction published; technical conditions remain bounded |
| Zamboanguita | Yes | Missing | Editorial introduction published; technical conditions remain bounded |

The unpublished Mainit Sanctuary example remains outside the public platform and should be reviewed
or archived separately.

## Public route status

### Finished and public

- `/`
- `/the-house`
- `/rooms`
- `/destinations` and all published destination slugs
- `/scenic-routes` and all published scenic-route slugs
- `/guide`
- `/dive-sites` and all published dive-site slugs
- `/getting-here`
- `/faq`
- `/plan-your-stay`
- `/contact`
- `/privacy`
- `/terms`

### Internal or intentionally not exposed

- `/design-system` — internal, `noindex`.
- `/typography-lab` — internal, `noindex`.
- `/experiences` — unfinished and intentionally not exposed as a public route.

### Future content areas

- Journal.
- Dedicated food and coffee coverage.
- Individual room pages.
- Premium guide sales/delivery.
- Interactive Explorer Map.
- Search, filters, favorites, collections, offline/printable guide, and GPX downloads.

## Immediate content decisions before launch

1. Approve the launch photography set or explicitly approve truthful image-free presentations where
   a final image is unavailable.
2. Decide whether The House launches from static approved content or a published singleton.
3. Complete the remaining stay, arrival, FAQ, and legal source facts.
4. Publish Site Settings with canonical site data and a default social image.
5. Correct workflow status on publicly approved Home and Rooms documents.
6. Complete production enquiry, analytics, search, DNS, and deployment verification.
