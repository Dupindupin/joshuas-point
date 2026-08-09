import type {EditorialImage} from '@/components/editorial'

export type RelatedContentType =
  'destination' | 'diveSite' | 'experience' | 'housePage' | 'journalArticle' | 'room'

export type RelatedContentItem = {
  excerpt?: string
  href: string
  id: string
  image?: EditorialImage
  title: string
  type: RelatedContentType
}

export type RelationshipSet = {
  all: RelatedContentItem[]
  incoming: RelatedContentItem[]
  outgoing: RelatedContentItem[]
}

export type RelationshipSourceType = RelatedContentType

export const emptyRelationshipSet = (): RelationshipSet => ({
  all: [],
  incoming: [],
  outgoing: [],
})
