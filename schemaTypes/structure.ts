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
      {type: 'diveSite', title: 'Dive Sites', ordering: [{field: 'name', direction: 'asc'}]},
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

export const structure: StructureResolver = (structureBuilder, context) => {
  const sections = studioSections
    .map((section) => ({
      ...section,
      documents: section.documents.filter(({type}) => isRegisteredDocument(context, type)),
    }))
    .filter(({documents}) => documents.length > 0)

  return structureBuilder
    .list()
    .title("Joshua's Point")
    .items(
      sections.map((section) =>
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
    )
}
