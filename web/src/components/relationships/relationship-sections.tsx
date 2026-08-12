import type {RelatedContentItem, RelatedContentType} from '@/sanity/relationships'

import {RelatedContentSection} from './related-content-section'

type RelationshipSectionProps = {
  items: RelatedContentItem[]
  limit?: number
}

function selectType(items: RelatedContentItem[], type: RelatedContentType) {
  return items.filter((item) => item.type === type)
}

export function RelatedPlaces({items, limit}: RelationshipSectionProps) {
  return (
    <RelatedContentSection
      eyebrow="Related places"
      items={selectType(items, 'destination')}
      limit={limit}
      sectionId="related-places"
      title="Continue through the landscape."
    />
  )
}

export function NearbyDiveSites({items, limit}: RelationshipSectionProps) {
  return (
    <RelatedContentSection
      eyebrow="Nearby dive sites"
      items={selectType(items, 'diveSite')}
      limit={limit}
      sectionId="nearby-dive-sites"
      title="Further underwater field notes."
    />
  )
}

export function RelatedJournalArticles({items, limit}: RelationshipSectionProps) {
  return (
    <RelatedContentSection
      eyebrow="From the journal"
      items={selectType(items, 'journalArticle')}
      limit={limit}
      sectionId="related-journal-articles"
      title="Stories that hold more context."
    />
  )
}

export function RelatedExperiences({items, limit}: RelationshipSectionProps) {
  return (
    <RelatedContentSection
      eyebrow="Related experiences"
      items={selectType(items, 'experience')}
      limit={limit}
      sectionId="related-experiences"
      title="Other ways to know this place."
    />
  )
}

export function StayNearby({items, limit}: RelationshipSectionProps) {
  return (
    <RelatedContentSection
      eyebrow="Stay nearby"
      items={selectType(items, 'room')}
      limit={limit}
      sectionId="stay-nearby"
      title="Return to the quiet of the house."
    />
  )
}

export function RelatedScenicRoutes({items, limit}: RelationshipSectionProps) {
  return (
    <RelatedContentSection
      eyebrow="Scenic routes"
      items={selectType(items, 'scenicRoute')}
      limit={limit}
      sectionId="related-scenic-routes"
      title="Follow the road into the landscape."
    />
  )
}
