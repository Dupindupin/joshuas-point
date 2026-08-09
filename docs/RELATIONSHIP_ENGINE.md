# Joshua's Point — Relationship Engine

## Purpose

The Relationship Engine turns existing editorial references into quiet, contextual paths through
Joshua's Point. It supports recommendations between destinations, dive sites, experiences, journal
articles, rooms, and The House without becoming a search system, ranking algorithm, or automated
content feed.

The engine is read-only. It does not create reciprocal references, modify documents, infer taste,
or generate recommendations with AI.

## Principles

1. **Editors establish meaning.** A reference exists because an editor believes the connection is
   useful to a reader.
2. **One document owns each decision.** A relationship is not copied into the referenced document.
3. **Outgoing relationships lead.** Manually ordered references on the current document retain
   their editorial order.
4. **Incoming relationships add context.** The frontend may discover published documents that
   reference the current document without writing a reciprocal field.
5. **Silence is valid.** When nothing useful is related, no section is rendered.
6. **Publication state matters.** Draft or missing targets never appear on the public website.
7. **Small selections are stronger.** Related sections default to four entries and remain
   intentionally limited.

## Existing relationship ownership

| Source          | Outgoing references                                                           | Editorial purpose                                                            |
| --------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Destination     | Related destinations; related experiences when the Experience schema exists   | Continue through a place or into a meaningful way of experiencing it.        |
| Dive Site       | Related dive sites; nearby destinations                                       | Connect underwater field notes and relevant on-land context.                 |
| Experience      | Related destinations, dive sites, and experiences                             | Identify the places and related narratives on which an experience depends.   |
| Journal Article | Related destinations, dive sites, experiences, rooms, articles, and The House | Connect long-form stories to their subjects and wider context.               |
| Room            | No generic recommendation array                                               | Remain an accommodation document; related journal articles can point inward. |
| The House       | No generic recommendation array                                               | Remain the place of origin; journal and guide content can point inward.      |

Landing-page curation such as `featuredDestinations` or `featuredDiveSites` is not treated as a
contextual relationship. Landing pages own navigation and presentation order, not related-content
recommendations.

## Manual and automatic behavior

### Manual relationships

Outgoing arrays are curated in Sanity. Editors choose a small set, order it deliberately, and
review the referenced entries before publishing. The Relationship Engine preserves this order.

Manual does not mean duplicated. If Dive Site A references Destination B, editors do not add Dive
Site A to Destination B merely to make the relationship reciprocal.

### Automatic discovery

Incoming discovery uses Sanity's `references()` function to find published documents that already
point to the current document. This is automatic presentation of a manual editorial decision—not
an algorithmic recommendation.

Incoming results are ordered by most recently updated because their source arrays do not define an
order relative to one another. If an item appears in both directions, the outgoing occurrence wins
and preserves its manual position.

### Explicitly excluded behavior

The engine does not use:

- Search relevance.
- Geographic proximity.
- Page-view popularity.
- User tracking or personalization.
- AI similarity or generated tags.
- Ratings, rankings, or sponsored placement.

## Query architecture

Relationship queries live in `web/src/sanity/relationships/`.

- `query.ts` owns the GROQ projection, incoming/outgoing resolution, normalization, deduplication,
  cache behavior, and source-specific helpers.
- `types.ts` defines the stable frontend relationship model.
- `index.ts` is the public module boundary.

The generic helper is:

```ts
getRelationships(documentId, documentType)
```

Source-specific helpers make page code clearer:

```ts
getDestinationRelationships(documentId)
getDiveSiteRelationships(documentId)
getExperienceRelationships(documentId)
getJournalArticleRelationships(documentId)
getRoomRelationships(documentId)
```

Each result contains:

- `outgoing` — manually ordered references owned by the source document.
- `incoming` — contextual references discovered from other published documents, excluding items
  already present in outgoing results.
- `all` — outgoing followed by deduplicated incoming results.

The query returns a narrow view model: ID, content type, title, excerpt, route, and editorial image.
It does not return maps, full bodies, conditions, room details, or other page-specific data.

Queries use the shared published-only Sanity client, one-hour revalidation, and a document-specific
cache tag. A future publication webhook should revalidate both the changed document and documents
that reference it.

## Frontend components

`RelatedContentSection` is the single visual primitive. It accepts a heading, eyebrow, stable
section ID, item list, and optional limit. It uses the approved Editorial Layout System and renders
article-like previews rather than cards.

It returns `null` before rendering any section markup when its list is empty. This guarantees that
pages never show empty headings, blank whitespace bands, or placeholder recommendations.

The semantic wrappers are:

- `RelatedPlaces`
- `NearbyDiveSites`
- `RelatedJournalArticles`
- `RelatedExperiences`
- `StayNearby`

Each wrapper filters the shared relationship result by content type and supplies calm editorial
language. The wrappers contain no query logic and can receive `relationships.all`,
`relationships.outgoing`, or `relationships.incoming` depending on page intent.

## Editor workflow

1. Finish the related document and confirm it is published or scheduled appropriately.
2. Add only references that deepen the current page.
3. Order outgoing references as a short editorial sequence.
4. Avoid reciprocal editing unless both directions genuinely communicate different editorial
   intentions.
5. Review the public page to ensure incoming context remains relevant.
6. Before unpublishing, inspect incoming references and remove or replace important paths.

References should not be used to compensate for weak navigation or incomplete copy. A page should
remain coherent when every related section is absent.

## Adopting the engine on a page

A future detail page should fetch its main document and relationships in parallel at the route data
boundary. It then passes a selected array into one or more semantic wrappers.

```tsx
const [destination, relationships] = await Promise.all([
  getDestination(slug),
  getDestinationRelationships(documentId),
])

return <RelatedExperiences items={relationships.all} />
```

The example is illustrative. Route-specific queries and detail pages remain separate milestones.
No current page is changed merely because the engine exists.

## Accessibility and resilience

- Sections have a labelled heading relationship.
- Each item is a semantic article with a unique heading.
- Links include the related title in their accessible label.
- Images retain Sanity alternative text and approved placeholder behavior.
- Content type is expressed in text, never by color or imagery alone.
- Missing images, excerpts, queries, or relationship results degrade without an empty section.
- Query failures return an empty relationship set rather than crashing the page.

## Future expansion

When an approved document type gains relationships:

1. Add its existing reference fields to the outgoing query branch.
2. Add its public route, title, excerpt, and image mapping to the shared projection.
3. Add its type to the stable relationship union.
4. Add a semantic wrapper only when multiple pages need distinct editorial language.
5. Document which document owns the relationship.
6. Add the appropriate revalidation dependencies when webhooks are introduced.

Possible future consumers include destination detail pages, dive-site guides, experience pages,
journal stories, room stories, seasonal collections, and a guest guide. No additional schema field
should be added until an existing reference cannot express a real editorial need.

## Boundaries

This foundation does not implement search, geographic nearby calculations, maps, AI
recommendations, analytics-driven ranking, personalization, or new content types. It introduces no
changes to existing page designs or schema contracts.
