# Sanity Studio Editorial Guide

## Purpose

The Joshua's Point Studio should feel like the editorial desk of a considered publication, not a database administration panel. Its structure should reflect how editors think: first about the website, then accommodation, regional stories, journal publishing, and shared media.

This guide defines the intended Studio experience. It does not add document schemas, frontend connections, preview tooling, or publishing automation.

## Structure principles

- Use clear editorial language rather than schema or implementation terminology.
- Keep fixed website pages separate from repeatable stories and records.
- Present only document types that are registered. Future sections should appear naturally as their approved schemas are added.
- Keep the root shallow. An editor should reach any document collection in two selections.
- Use a consistent order so the most frequently managed and foundational content appears first.
- Do not expose embedded objects, such as a gallery inside a room, as if they were standalone documents.

## Editorial desk

The configured structure uses these groups:

### Website

1. Site Settings
2. Home
3. The House
4. Rooms Page
5. Experiences Page
6. Journal Page

These are fixed pages or global configuration documents. Only Site Settings and Home currently have schemas, so only those entries are visible now. The remaining entries will appear when their approved schemas are registered.

### Accommodation

1. Rooms
2. Amenities

Rooms are currently available. Amenities should appear only after the approved amenity document schema exists.

### Travel Guide

1. Destinations
2. Dive Sites
3. Experiences

This is the regional editorial guide. The group should not appear until at least one of its document schemas is registered.

### Journal

1. Articles
2. Categories

Articles lead because they are the editor's primary work. Categories support organization and discovery.

### Media

1. Galleries
2. Videos

The current `gallery` and `video` types are embedded objects. They should remain inside the document that owns their editorial context. A top-level Media group should appear only if standalone gallery or video documents are approved later. Sanity's asset tooling can manage raw files independently; the editorial desk should manage publishable content, not duplicate the asset library.

### Settings

Reserve this group for future operational documents that do not belong to the public editorial hierarchy, such as redirects or integration configuration. Do not duplicate Site Settings here.

### Future

Do not display an empty Future group. New ideas should remain in the content architecture until their purpose, ownership, and schema are approved. Once approved, place them in the editorial group where an editor would expect to find them.

## Document review

| Document type        | Studio title          | Group         | Mode       | Default ordering             | Recommended icon | Editor description                                                                                        |
| -------------------- | --------------------- | ------------- | ---------- | ---------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------- |
| `siteSettings`       | Site Settings         | Website       | Singleton  | Fixed first                  | Cog              | Global identity, SEO defaults, contact details, navigation, footer, and booking links.                    |
| `homePage`           | Home                  | Website       | Singleton  | Fixed second                 | Home             | The ordered editorial content of the homepage.                                                            |
| `housePage`          | The House             | Website       | Singleton  | Fixed third                  | Master detail    | The architectural story, materials, photography, and closing reflection for The House page.               |
| `roomsPage`          | Rooms Page            | Website       | Singleton  | Fixed fourth                 | Documents        | The editorial introduction, room collection, image break, and closing content for the Rooms landing page. |
| `experiencesPage`    | Experiences Page      | Website       | Singleton  | Fixed fifth                  | Earth globe      | The curated landing page that introduces regional experiences.                                            |
| `journalPage`        | Journal Page          | Website       | Singleton  | Fixed sixth                  | Book             | The editorial introduction and article selection for the Journal landing page.                            |
| `room`               | Rooms                 | Accommodation | Repeatable | Title A–Z                    | Bed              | A place to stay, including its story, practical details, gallery, and SEO.                                |
| `amenity`            | Amenities             | Accommodation | Repeatable | Title A–Z                    | Checkmark circle | A reusable, plainly named accommodation amenity.                                                          |
| `destination`        | Destinations          | Travel Guide  | Repeatable | Title A–Z                    | Pin              | An independently useful travel-journal guide to a place in southern Negros.                               |
| `diveSite`           | Dive Sites            | Travel Guide  | Repeatable | Name A–Z                     | Drop             | An editorial and practical guide to a regional dive site.                                                 |
| `experience`         | Experiences           | Travel Guide  | Repeatable | Title A–Z                    | Sparkles         | A slow, place-led experience connected to destinations and stories.                                       |
| `experienceCategory` | Experience Categories | Travel Guide  | Repeatable | Title A–Z                    | Tags             | A restrained taxonomy for grouping experiences.                                                           |
| `journalArticle`     | Articles              | Journal       | Repeatable | Published date, newest first | Document text    | A long-form Joshua's Point journal story.                                                                 |
| `journalCategory`    | Categories            | Journal       | Repeatable | Title A–Z                    | Tag              | A reusable editorial category for journal articles.                                                       |

Recommended icons are semantic directions, not a requirement to add a dependency now. If icons are implemented, add `@sanity/icons` as a direct dependency and use one consistent, quiet outline set. Avoid emoji and decorative icon variation.

## Singleton handling

The following documents should always use stable document IDs and a direct editor pane:

- `siteSettings`
- `homePage`
- `housePage`
- `roomsPage`
- `experiencesPage`
- `journalPage`

For singletons:

- Remove them from global creation menus.
- Allow Publish, Discard changes, and Restore.
- Remove Delete, Duplicate, and Unpublish so navigation can never point at a missing canonical document.
- Open the canonical document directly instead of showing a one-item list.

The Studio configuration already applies these restrictions to registered singleton types. The future page types are included in the singleton registry, so the same safeguards will apply when their schemas are added.

Repeatable editorial documents should retain the normal Create, Duplicate, Delete, Publish, and Unpublish actions. Archival may be preferable to deletion later, but it should not be introduced until an explicit archival field and policy are approved.

## Ordering

Collections should open in a predictable order:

- Rooms, amenities, destinations, dive sites, experiences, and categories: alphabetical.
- Journal articles: published date descending.
- Fixed website pages: curated order, not alphabetical.
- Related-content arrays inside documents: manually ordered by editors because sequence carries editorial meaning.

When future schemas introduce fields such as status or a featured flag, use saved views or custom panes instead of changing the default collection order unpredictably.

## Titles and descriptions

Document titles should be short nouns that match the website language. Avoid technical suffixes such as “Document,” “Schema,” or “Singleton” in editor-facing labels. Use “Home,” not “Home Page Document”; keep “Rooms Page” only where it prevents confusion with the Rooms collection.

Every document schema should include a concise description that answers one question: “What does changing this affect?” Field descriptions should explain editorial intent or operational consequences, not repeat the field label.

Preview subtitles should help editors distinguish similar entries. Recommended future subtitles include:

- Room: capacity and publication state.
- Destination: travel time and destination category.
- Dive Site: region and dive level.
- Experience: category and publication state.
- Journal Article: publication date and category.

## Default document templates

Singletons should not have creation templates because their canonical documents already exist at stable IDs.

Repeatable templates should set only safe workflow defaults:

- Room, destination, dive site, experience, and article: workflow status starts as Draft.
- Journal Article: leave publication date empty until editorial review is complete.
- Map-enabled documents: do not invent coordinates or enable map display without verified location data.
- SEO fields: inherit site defaults through frontend logic; do not copy global values into every new document.
- References and related-content fields: begin empty so relationships remain intentional.

Avoid templates filled with sample prose. Placeholder copy is easy to publish accidentally and weakens the editorial voice.

## Editorial workflow

### 1. Draft

The author develops the story, verifies practical details, adds rights-cleared media, and completes required accessibility text.

### 2. Review

An editor checks voice, factual accuracy, titles, captions, relationships, map data, and SEO. Destination and dive-site details should be verified against a current source before publication.

### 3. Approved

The content is complete and ready to publish. Structural changes should be resolved before this state so final review remains focused.

### 4. Published

The document is live. Later factual corrections can be made through a new draft while the published version remains available.

Sanity's native drafts and published documents remain the source of truth. The existing workflow-status field communicates editorial progress; it should not attempt to replace Sanity's publication state.

## Editorial responsibilities

- Authors own prose, captions, credits, and relationship suggestions.
- Editors own voice, structure, factual review, taxonomy, and publishing decisions.
- A designated site owner controls Site Settings and canonical page documents.
- Location-sensitive content requires periodic verification, especially travel time, entrance fees, opening hours, access conditions, and dive safety information.

## Future improvements

Implement these only when the related content types and team workflow justify them:

1. Add Studio icons from a direct `@sanity/icons` dependency.
2. Add document badges for Draft, In review, Approved, and stale practical information.
3. Add filtered panes for items awaiting review, recently published stories, and content needing re-verification.
4. Add role-based permissions so only designated editors can publish canonical pages or change Site Settings.
5. Add presentation previews after frontend queries and routes are connected.
6. Add scheduled publishing for journal and seasonal content.
7. Add custom validation for reciprocal relationships and map coordinates once those schemas exist.
8. Consider standalone Gallery and Video documents only when media needs independent ownership, reuse, metadata, or publication lifecycle.
9. Add desk-level search guidance and saved filters when the content library is large enough to need them.
10. Establish a recurring accuracy review for destination, transport, opening-hour, fee, and dive-safety information.

## Implementation boundary

This Studio design intentionally does not create future schemas, add frontend queries, introduce previews, or install new packages. The structure is registry-driven: approved document types appear in the correct editorial section as soon as their schemas are registered.
