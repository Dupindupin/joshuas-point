import type {
  ListItemBuilder,
  StructureBuilder,
  StructureResolver,
  StructureResolverContext,
} from 'sanity/structure'

type Ordering = {
  field: string
  direction: 'asc' | 'desc'
}

type StudioDocument = {
  type: string
  title: string
  singleton?: boolean
  ordering?: Ordering[]
}

type StudioSection = {
  id: string
  title: string
  documents: StudioDocument[]
}

type EditorialDocument = {
  heroImagePath: string
  type: string
}

type DashboardView = {
  filter: string
  id: string
  title: string
}

const studioApiVersion = '2026-08-09'

const editorialDocuments: EditorialDocument[] = [
  {type: 'room', heroImagePath: 'previewImage'},
  {type: 'destination', heroImagePath: 'heroImage'},
  {type: 'diveSite', heroImagePath: 'heroImage'},
  {type: 'scenicRoute', heroImagePath: 'heroImage'},
  {type: 'experience', heroImagePath: 'heroImage'},
  {type: 'journalArticle', heroImagePath: 'heroImage'},
]

const dashboardViews: DashboardView[] = [
  {
    id: 'needs-review',
    title: 'Needs Review',
    filter: '_type in $types && workflowStatus == "inReview"',
  },
  {
    id: 'ready-to-publish',
    title: 'Ready to Publish',
    filter: '_type in $types && workflowStatus == "approved" && _id in path("drafts.**")',
  },
  {
    id: 'recently-updated',
    title: 'Recently Updated',
    filter: '_type in $types && dateTime(_updatedAt) > dateTime(now()) - 60 * 60 * 24 * 30',
  },
  {
    id: 'missing-seo',
    title: 'Missing SEO',
    filter: '_type in $types && (!defined(seo.metaDescription) || seo.metaDescription == "")',
  },
  {
    id: 'missing-review-date',
    title: 'Missing Review Date',
    filter: '_type in $types && !defined(lastReviewedAt)',
  },
]

const studioSections: StudioSection[] = [
  {
    id: 'website',
    title: 'Website',
    documents: [
      {type: 'siteSettings', title: 'Site Settings', singleton: true},
      {type: 'homePage', title: 'Home', singleton: true},
      {type: 'housePage', title: 'The House', singleton: true},
      {type: 'roomsPage', title: 'Rooms Page', singleton: true},
      {type: 'experiencesPage', title: 'Experiences Page', singleton: true},
      {type: 'journalPage', title: 'Journal Page', singleton: true},
    ],
  },
  {
    id: 'accommodation',
    title: 'Accommodation',
    documents: [
      {type: 'room', title: 'Rooms', ordering: [{field: 'title', direction: 'asc'}]},
      {type: 'amenity', title: 'Amenities', ordering: [{field: 'title', direction: 'asc'}]},
    ],
  },
  {
    id: 'travel-guide',
    title: 'Travel Guide',
    documents: [
      {type: 'destinationsPage', title: 'Destinations Page', singleton: true},
      {type: 'destination', title: 'Destinations', ordering: [{field: 'title', direction: 'asc'}]},
      {type: 'diveSitesPage', title: 'Dive Sites Page', singleton: true},
      {type: 'diveSite', title: 'Dive Sites', ordering: [{field: 'name', direction: 'asc'}]},
      {type: 'scenicRoutesPage', title: 'Scenic Routes Page', singleton: true},
      {type: 'scenicRoute', title: 'Scenic Routes', ordering: [{field: 'title', direction: 'asc'}]},
      {type: 'experience', title: 'Experiences', ordering: [{field: 'title', direction: 'asc'}]},
      {
        type: 'experienceCategory',
        title: 'Experience Categories',
        ordering: [{field: 'title', direction: 'asc'}],
      },
    ],
  },
  {
    id: 'journal',
    title: 'Journal',
    documents: [
      {
        type: 'journalArticle',
        title: 'Articles',
        ordering: [{field: 'publishedAt', direction: 'desc'}],
      },
      {
        type: 'journalCategory',
        title: 'Categories',
        ordering: [{field: 'title', direction: 'asc'}],
      },
    ],
  },
  {
    id: 'media',
    title: 'Media',
    documents: [
      {
        type: 'galleryDocument',
        title: 'Galleries',
        ordering: [{field: 'title', direction: 'asc'}],
      },
      {
        type: 'videoDocument',
        title: 'Videos',
        ordering: [{field: 'title', direction: 'asc'}],
      },
    ],
  },
]

export const singletonTypes = new Set(
  studioSections.flatMap(({documents}) =>
    documents.filter(({singleton}) => singleton).map(({type}) => type),
  ),
)

function isRegisteredDocument(context: StructureResolverContext, type: string) {
  return context.schema.has(type)
}

function createDocumentItem(
  structureBuilder: StructureBuilder,
  document: StudioDocument,
): ListItemBuilder {
  if (document.singleton) {
    return structureBuilder
      .listItem()
      .id(document.type)
      .title(document.title)
      .child(
        structureBuilder
          .document()
          .schemaType(document.type)
          .documentId(document.type)
          .title(document.title),
      )
  }

  const documentList = structureBuilder.documentTypeList(document.type).title(document.title)

  if (document.ordering) {
    documentList.defaultOrdering(document.ordering)
  }

  return structureBuilder.listItem().id(document.type).title(document.title).child(documentList)
}

function createEditorialDesk(
  structureBuilder: StructureBuilder,
  context: StructureResolverContext,
) {
  const registeredDocuments = editorialDocuments.filter(({type}) =>
    isRegisteredDocument(context, type),
  )
  if (registeredDocuments.length === 0) return null

  const types = registeredDocuments.map(({type}) => type)
  const missingPhotographyFilter = registeredDocuments
    .map(({heroImagePath, type}) => `(_type == "${type}" && !defined(${heroImagePath}.asset))`)
    .join(' || ')

  const views: DashboardView[] = [
    dashboardViews[0],
    dashboardViews[1],
    dashboardViews[2],
    {
      id: 'missing-photography',
      title: 'Missing Photography',
      filter: `_type in $types && (${missingPhotographyFilter})`,
    },
    dashboardViews[3],
    dashboardViews[4],
  ]

  return structureBuilder
    .listItem()
    .id('editorial-desk')
    .title('Editorial Desk')
    .child(
      structureBuilder
        .list()
        .id('editorial-desk-views')
        .title('Editorial Desk')
        .items(
          views.map((view) =>
            structureBuilder
              .listItem()
              .id(view.id)
              .title(view.title)
              .child(
                structureBuilder
                  .documentList()
                  .id(`${view.id}-documents`)
                  .title(view.title)
                  .apiVersion(studioApiVersion)
                  .filter(view.filter)
                  .params({types})
                  .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
              ),
          ),
        ),
    )
}

export const structure: StructureResolver = (structureBuilder, context) => {
  const sections = studioSections
    .map((section) => ({
      ...section,
      documents: section.documents.filter(({type}) => isRegisteredDocument(context, type)),
    }))
    .filter(({documents}) => documents.length > 0)
  const editorialDesk = createEditorialDesk(structureBuilder, context)

  return structureBuilder
    .list()
    .title("Joshua's Point")
    .items([
      ...(editorialDesk ? [editorialDesk] : []),
      ...sections.map((section) =>
        structureBuilder
          .listItem()
          .id(section.id)
          .title(section.title)
          .child(
            structureBuilder
              .list()
              .id(`${section.id}-content`)
              .title(section.title)
              .items(
                section.documents.map((document) => createDocumentItem(structureBuilder, document)),
              ),
          ),
      ),
    ])
}
