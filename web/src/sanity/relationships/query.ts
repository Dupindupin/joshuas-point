import {cache} from 'react'

import {getEditorialImage} from '../image'
import {sanityClient} from '../client'
import type {SanityImage} from '../types'
import {
  emptyRelationshipSet,
  type RelatedContentItem,
  type RelatedContentType,
  type RelationshipSet,
  type RelationshipSourceType,
} from './types'

const relationshipImageProjection = /* groq */ `{
  alt,
  asset,
  crop,
  decorative,
  hotspot,
  "lqip": asset->metadata.lqip
}`

const relationshipItemProjection = /* groq */ `{
  _id,
  _type,
  "title": select(
    _type == "diveSite" => name,
    _type == "housePage" => coalesce(hero.title, internalTitle),
    coalesce(title, internalTitle)
  ),
  "excerpt": select(
    defined(excerpt) => excerpt,
    _type == "room" => description,
    _type == "housePage" => hero.introduction,
    ""
  ),
  "href": select(
    _type == "destination" => "/destinations/" + slug.current,
    _type == "diveSite" => "/dive-sites/" + slug.current,
    _type == "experience" => "/experiences/" + slug.current,
    _type == "journalArticle" => "/journal/" + slug.current,
    _type == "room" => "/rooms/" + slug.current,
    _type == "housePage" => "/the-house"
  ),
  "image": select(
    _type == "destination" => heroImage ${relationshipImageProjection},
    _type == "diveSite" => heroImage ${relationshipImageProjection},
    _type == "experience" => coalesce(previewImage, heroImage) ${relationshipImageProjection},
    _type == "journalArticle" => heroImage ${relationshipImageProjection},
    _type == "room" => coalesce(previewImage, hero.image) ${relationshipImageProjection},
    _type == "housePage" => hero.image ${relationshipImageProjection}
  )
}`

const relationshipsQuery = /* groq */ `
  *[_id == $documentId && _type == $documentType][0] {
    "outgoing": select(
      _type == "destination" => [
        ...coalesce(relatedDestinations, [])[]-> ${relationshipItemProjection},
        ...coalesce(relatedExperiences, [])[]-> ${relationshipItemProjection}
      ],
      _type == "diveSite" => [
        ...coalesce(relatedDiveSites, [])[]-> ${relationshipItemProjection},
        ...coalesce(nearbyDestinations, [])[]-> ${relationshipItemProjection}
      ],
      _type == "experience" => [
        ...coalesce(relatedDestinations, [])[]-> ${relationshipItemProjection},
        ...coalesce(relatedDiveSites, [])[]-> ${relationshipItemProjection},
        ...coalesce(relatedExperiences, [])[]-> ${relationshipItemProjection}
      ],
      _type == "journalArticle" => [
        ...coalesce(relatedDestinations, [])[]-> ${relationshipItemProjection},
        ...coalesce(relatedDiveSites, [])[]-> ${relationshipItemProjection},
        ...coalesce(relatedExperiences, [])[]-> ${relationshipItemProjection},
        ...coalesce(relatedRooms, [])[]-> ${relationshipItemProjection},
        ...coalesce(relatedArticles, [])[]-> ${relationshipItemProjection},
        select(defined(relatedHouse) => relatedHouse-> ${relationshipItemProjection})
      ],
      []
    ),
    "incoming": *[
      _id != $documentId &&
      _type in ["destination", "diveSite", "experience", "journalArticle", "room", "housePage"] &&
      references($documentId)
    ] | order(_updatedAt desc) ${relationshipItemProjection}
  }
`

type RawRelationshipItem = {
  _id?: string
  _type?: RelatedContentType
  excerpt?: string
  href?: string
  image?: SanityImage
  title?: string
}

type RawRelationshipResult = {
  incoming?: Array<RawRelationshipItem | null>
  outgoing?: Array<RawRelationshipItem | null>
}

function normalizeItem(item: RawRelationshipItem | null): RelatedContentItem | null {
  if (!item?._id || !item._type || !item.href || !item.title) return null

  return {
    excerpt: item.excerpt?.trim() || undefined,
    href: item.href,
    id: item._id,
    image: getEditorialImage(item.image, {height: 800, width: 1200}),
    title: item.title,
    type: item._type,
  }
}

function uniqueItems(items: RelatedContentItem[]) {
  const seen = new Set<string>()
  return items.filter(({id}) => {
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })
}

const getRelationshipsCached = cache(
  async (documentId: string, documentType: RelationshipSourceType): Promise<RelationshipSet> => {
    try {
      const result = await sanityClient.fetch<RawRelationshipResult | null>(
        relationshipsQuery,
        {documentId, documentType},
        {
          next: {
            revalidate: 3600,
            tags: [`sanity:relationships:${documentId}`],
          },
        },
      )

      if (!result) return emptyRelationshipSet()

      const outgoing = uniqueItems(
        (result.outgoing ?? [])
          .map(normalizeItem)
          .filter((item): item is RelatedContentItem => Boolean(item)),
      )
      const outgoingIds = new Set(outgoing.map(({id}) => id))
      const incoming = uniqueItems(
        (result.incoming ?? [])
          .map(normalizeItem)
          .filter((item): item is RelatedContentItem => Boolean(item))
          .filter(({id}) => !outgoingIds.has(id)),
      )

      return {
        all: [...outgoing, ...incoming],
        incoming,
        outgoing,
      }
    } catch (error) {
      console.error(`Unable to load relationships for ${documentType} “${documentId}”.`, error)
      return emptyRelationshipSet()
    }
  },
)

export function getRelationships(
  documentId: string,
  documentType: RelationshipSourceType,
): Promise<RelationshipSet> {
  return getRelationshipsCached(documentId, documentType)
}

export function getDestinationRelationships(documentId: string) {
  return getRelationships(documentId, 'destination')
}

export function getDiveSiteRelationships(documentId: string) {
  return getRelationships(documentId, 'diveSite')
}

export function getExperienceRelationships(documentId: string) {
  return getRelationships(documentId, 'experience')
}

export function getJournalArticleRelationships(documentId: string) {
  return getRelationships(documentId, 'journalArticle')
}

export function getRoomRelationships(documentId: string) {
  return getRelationships(documentId, 'room')
}
