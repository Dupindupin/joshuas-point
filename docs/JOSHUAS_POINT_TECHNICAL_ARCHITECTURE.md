# Joshua's Point — Technical Architecture

**Status:** Version 1 legacy reference
**Audience:** Future developers and future Tobias

## Purpose

This document explains the architecture that exists at the Version 1 launch-preparation boundary,
why it exists, and which rules preserve it. It is descriptive, not a proposal for another rebuild.

Joshua's Point is one repository containing two independently installed applications:

- A Sanity Studio at the repository root.
- A Next.js website in `web/`.

The separate package manifests and lockfiles are intentional. The website uses Next.js 16, React
19, TypeScript, Tailwind CSS 4, and the App Router. Sanity Studio uses explicit document and object
schemas registered under `schemaTypes/`.

## Repository map

```text
joshuas-point/
├── docs/                         # Product, editorial, operational, and architecture records
├── schemaTypes/
│   ├── documents/                # Explicit singleton and repeatable document schemas
│   ├── objects/                  # Shared structured field objects
│   ├── editorial/                # Studio previews, badges, and warnings
│   ├── fields/                   # Shared editorial workflow fields
│   ├── index.ts                  # Schema registry
│   └── structure.ts              # Editorial Studio information architecture
├── sanity.config.ts              # Studio, structure, singleton actions, badges
├── sanity.cli.ts                 # Project and dataset CLI configuration
└── web/
    ├── public/                   # Replaceable local development assets
    ├── src/app/                  # App Router layouts, metadata, routes, sitemap, robots
    ├── src/components/           # Editorial, site, map, relationship, motion, theme, UI
    ├── src/lib/                  # Email, enquiry, SEO, site URL, policy, theme
    ├── src/sanity/               # Client, queries, mappers, relationships, image utility, types
    └── src/styles/               # Central font configuration
```

## Runtime and rendering model

- React Server Components are the default for pages, data loading, editorial sections, metadata,
  and the footer.
- Client Components are limited to genuine browser behavior: mega/mobile navigation, theme
  preference, FAQ disclosure, enquiry state, map provider host, and viewport-triggered motion.
- Sanity reads use the published perspective and Next cache/revalidation options.
- Routes map CMS data into stable presentation contracts before rendering visual components.
- Missing optional content returns `null` or disappears; it does not create empty public sections.

This boundary keeps editorial presentation testable and prevents Sanity document shape from leaking
through every component.

## CMS architecture

### Explicit documents

The schema uses named documents rather than a generic page builder:

- Singletons: `siteSettings`, `homePage`, `housePage`, `roomsPage`, `destinationsPage`,
  `scenicRoutesPage`, and `diveSitesPage`.
- Repeatable content: `room`, `destination`, `scenicRoute`, and `diveSite`.

Shared objects include editorial images, SEO, links, galleries, map locations, routes/stops, travel
information, capacity/beds, contact details, navigation, footer, and page-specific structured
sections.

Why: editors see the language and sequence of Joshua's Point, validation can reflect real editorial
rules, and the frontend is not forced to interpret arbitrary layout blocks.

### Studio organization

`schemaTypes/structure.ts` organizes content by editorial purpose, surfaces review queues, and
treats singletons as fixed destinations. Singleton creation templates are removed and their actions
are restricted to publish, discard changes, and restore. Workflow and review-date badges provide
context without turning the Studio into a database dashboard.

Why: the Studio should feel like an editorial publication with clear ownership, not a flat list of
records.

### Workflow fields and warnings

Supported documents share workflow status and last-reviewed fields. Non-blocking warnings identify
missing photography, SEO, gallery/credits, and stale review information where the content model
supports those checks.

Why: editorial completeness and factual freshness are visible without making every optional public
field required.

## Sanity authority rules

1. The frontend queries the **published** perspective; drafts never appear accidentally.
2. A published singleton is authoritative for its page.
3. Static development fallback is used only when no published singleton exists.
4. Once a published singleton exists, missing optional CMS sections disappear. Static sections do
   not leak back in to complete an incomplete document.
5. Studio-only notes, verification records, warnings, and workflow fields are excluded from public
   projections unless the frontend has a legitimate public use.
6. Local fallback images may preserve layout during development, but remain explicitly replaceable.
7. Frontend queries live in `web/src/sanity/queries/`; GROQ is not scattered through components.
8. Mappers in `web/src/sanity/mappers/` translate nullable CMS responses into stable page data.

Why: publication is a clear editorial decision, incomplete content fails quietly, and visual code
does not become coupled to Studio internals.

## Editorial Layout System

Shared primitives live under `web/src/components/editorial/`:

- `EditorialContainer` owns maximum width and responsive gutters.
- `EditorialGrid` provides a 12-column desktop system and responsive collapse.
- `EditorialText` owns approved eyebrow, heading, lead, body, caption, and quote treatments.
- `EditorialMedia`, `EditorialFigure`, `EditorialMediaStory`, and `EditorialPhotoEssay` express
  landscape, portrait, panoramic, captioned, asymmetric, and sequenced image roles.
- `EditorialPageHero` provides a restrained page opening.
- `SectionSpacing` centralizes editorial vertical rhythm.
- `EditorialDivider`, `EditorialLink`, and Portable Text rendering complete the long-form system.

Why: public pages share proportions, typography, accessibility, and pacing without repeating the
same composition. Primitives control rules; pages control editorial sequence.

## Relationship Engine

Relationship queries live in `web/src/sanity/relationships/`; presentation lives in
`web/src/components/relationships/`.

- Outgoing references are manually curated and retain editor order.
- Incoming references are discovered with GROQ `references()` and do not write reciprocal data.
- Duplicates are removed with outgoing references taking precedence.
- Only published targets are returned.
- `RelatedContentSection` is the visual primitive; semantic wrappers filter places, dive sites,
  articles, experiences, or stay context.
- Empty result sets render nothing.

Why: recommendations remain editorial and maintainable without duplicated references, algorithms,
tracking, or AI-generated relevance.

## Theme system

Semantic CSS tokens live in `web/src/app/globals.css`. Components consume roles such as canvas,
surface, ink, muted ink, border, accent, focus, inverse, footer, map, and warning.

- Light mode uses warm linen, sand/stone, charcoal, forest, timber, and restrained ocean.
- Dark mode uses warm charcoal and muted forest/ocean surfaces with warm off-white text and timber
  warmth. It is not an inverted palette.
- A small inline initialization script in the root layout resolves saved Light/Dark/System preference
  before the page paints.
- `ThemeControl` provides an accessible manual choice and persists it in local storage.
- System preference remains the default and updates the resolved theme.
- Photographs are not globally tinted or darkened.
- Theme transitions are short and disabled with reduced-motion preference.

Why: the atmosphere can change without page-specific dark-mode hacks, hydration mismatch, or a
flash of the wrong theme.

## Motion system

Motion values are centralized as CSS duration, distance, stagger, and easing tokens. The system
uses:

- Immediate content on the server.
- Small hero/media settle treatments.
- `MotionReveal` with one shared `IntersectionObserver` for below-the-fold editorial content.
- Restrained hover and navigation transitions.
- Complete `prefers-reduced-motion` overrides.

Why: motion supports reading rhythm and orientation while preserving content access, performance,
and the quiet character of Joshua's Point.

## Navigation and mega menu

`SiteHeader` is a Server Component that fetches a curated destination sample. It passes plain data
to a client interaction boundary.

- Desktop uses an editorial mega menu with Stay, Explore, and About groupings.
- Destinations remains the hub; the menu includes a prominent “View all destinations” path and at
  most three featured examples.
- Featured destination references from the destinations singleton lead; newest published entries
  provide a bounded fallback.
- Hover, click, touch, focus, Enter/Space, horizontal arrow navigation, Arrow Down, outside click,
  and Escape are supported. The menu is never hover-only.
- Mobile retains a separate accessible disclosure/drawer pattern and points to the destination hub
  rather than listing an expanding content library.
- Only public routes are exposed.

Why: navigation scales without becoming a sitemap, while keyboard, pointer, and touch users share
the same information architecture.

## SEO architecture

- `createPageMetadata()` centralizes titles, descriptions, canonical URLs, robots directives,
  Open Graph, Twitter cards, and social-image fallback.
- Page SEO may override fallback metadata; Site Settings may provide site URL and default social
  image.
- Dynamic detail pages keep place names natural and use their CMS SEO data.
- `sitemap.ts` combines a fixed allowlist of public routes with published, indexable destinations,
  scenic routes, and dive sites.
- `robots.ts` points crawlers to the canonical sitemap.
- Internal tools and deliberate non-public routes are `noindex`; unfinished routes are not exposed.
- Legacy redirects live in `web/next.config.ts` and use permanent redirects.
- FAQ structured data is rendered only from the same visible FAQ data.
- Official social-profile URLs live only in `siteSettings.footer.socialLinks`. A shared normalizer
  removes empty, malformed, non-HTTPS, duplicate, or unsupported entries before they reach the
  Footer, Contact page, or Organization `sameAs`.
- The root Organization structured data renders only when published Site Settings supplies a site
  title and canonical URL. It makes no lodging, rating, price, or availability claims.

Why: public search behavior follows publication state and one canonical origin, without inventing
ratings, prices, reviews, availability, or business claims.

## Map architecture

Map page code consumes one normalized domain interface:

- Coordinates.
- Markers.
- Labels.
- Routes.
- Viewport.

`EditorialMap`, `DestinationMap`, `DiveSiteMap`, and `ScooterRouteMap` use the same interface.
`MapProviderHost` dynamically selects Google Maps, Mapbox, or Leaflet adapters through centralized
configuration. The current adapters intentionally remain provider placeholders.

When no provider is configured, the frontend renders a calm map surface plus accessible text
summaries, coordinates/markers where available, route information, and external directions where
the content supplies them. Photographs never substitute for a map.

Why: verified geographic content is independent of vendor SDKs, provider choice does not change page
code, and textual orientation remains available without JavaScript or a working map service.

## Photography workflow

### Production photography

Sanity's `editorialImage` is the durable model for asset, alt text, caption, credit, credit URL,
crop, hotspot, and decorative intent. Image URLs are built through one shared utility and rendered
through responsive Next.js image handling.

### Development photography

Local working images live under role-based folders in `web/public/images/`. Records must identify
them as:

- Development photography.
- Not production approved.
- Replace before launch.

Local files are never evidence that a photo is final, correctly captioned, or suitable for another
place. They exist to review composition and flow. The presentation contracts accept Sanity images
so replacement does not require a layout change.

Why: page development continues without stock imagery or invented representation, while launch
approval remains explicit.

## Content migration workflow

The permanent migration method is:

1. Use the current Joshua's Point website and approved owner records as the source.
2. Preserve Tobias's meaning, voice, images, route knowledge, and useful structure.
3. Improve grammar, clarity, pacing, and factual separation without generic rewriting.
4. Map the material into the existing explicit Sanity schema.
5. Leave unsupported practical facts empty.
6. Attach truthful development photography when useful; do not block structure for an ideal image.
7. Review privacy, facts, SEO, accessibility, relationships, and public presentation.
8. Publish deliberately; the published CMS document becomes authoritative.

Why: Joshua's Point becomes clearer and more maintainable without losing the source that makes it
specific.

## Enquiry system

The Contact form uses a Server Action as its trust boundary. It normalizes and validates all values,
checks date ranges and size limits, applies a honeypot and lightweight limiter, creates plain-text
internal and guest messages, and sends through an `EmailService` interface. The first provider
adapter calls Resend's HTTPS batch endpoint with an idempotency key.

No enquiry is stored in Sanity or subscribed to marketing. Missing provider configuration fails
safely. Production secrets remain server-only environment variables.

Why: the form can become operational without becoming a booking engine, database, newsletter, or
provider-locked UI.

## Safe extension rules

- Reuse an existing primitive, query, object, relationship, or provider boundary before adding one.
- Keep Server Components as the default.
- Do not introduce a generic page builder.
- Do not query Sanity from visual components.
- Do not duplicate SEO, image, map, theme, motion, email, or relationship logic.
- Do not expose a route before its public page and content are ready.
- Do not let a missing optional field produce public process language or an empty section.
- Treat a new dependency, provider, schema type, or client boundary as an architectural decision.
- Preserve semantic HTML, keyboard access, visible focus, reduced motion, natural photographs, and
  truthful omissions.

## Validation and operations

Website changes should run from `web/`:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Studio/schema changes should run from the repository root:

```bash
npx tsc --noEmit
npx sanity schema validate
npm run build
```

Every release should also run `git diff --check`, production route/metadata/sitemap smoke tests,
desktop/mobile keyboard review, Light/Dark/System review, and an enquiry test when delivery
configuration changes.

The repository and this document explain the architecture. Production DNS, secrets, monitoring,
analytics, mailbox behavior, and deployment settings must also have named owners outside source
control.
