export type SanityRevalidationPayload = {
  _id?: unknown
  _type?: unknown
  slug?: unknown
}

function asNonEmptyString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function publishedDocumentId(value: unknown) {
  return asNonEmptyString(value)?.replace(/^drafts\./, '')
}

export function getSanityRevalidationTags(payload: SanityRevalidationPayload) {
  const documentType = asNonEmptyString(payload._type)
  const documentId = publishedDocumentId(payload._id)
  const slug = asNonEmptyString(payload.slug)
  const tags = new Set<string>()

  if (documentId) tags.add(`sanity:relationships:${documentId}`)

  switch (documentType) {
    case 'siteSettings':
      tags.add('sanity:site-settings')
      tags.add('sanity:explorer')
      break
    case 'homePage':
      tags.add('sanity:home-page')
      break
    case 'housePage':
      tags.add('sanity:house-page')
      break
    case 'roomsPage':
    case 'room':
      tags.add('sanity:rooms-page')
      break
    case 'amenity':
      tags.add('sanity:amenities')
      tags.add('sanity:rooms-page')
      break
    case 'destinationsPage':
      tags.add('sanity:destinations-page')
      break
    case 'destination':
      tags.add('sanity:destinations-page')
      tags.add('sanity:destinations')
      tags.add('sanity:destination-slugs')
      tags.add('sanity:explorer')
      if (slug) tags.add(`sanity:destination:${slug}`)
      break
    case 'diveSitesPage':
      tags.add('sanity:dive-sites-page')
      break
    case 'diveSite':
      tags.add('sanity:dive-sites-page')
      tags.add('sanity:dive-sites')
      tags.add('sanity:dive-site-slugs')
      tags.add('sanity:explorer')
      if (slug) tags.add(`sanity:dive-site:${slug}`)
      break
    case 'scenicRoutesPage':
      tags.add('sanity:scenic-routes-page')
      break
    case 'scenicRoute':
      tags.add('sanity:scenic-routes-page')
      tags.add('sanity:scenic-routes')
      tags.add('sanity:scenic-route-slugs')
      tags.add('sanity:explorer')
      if (slug) tags.add(`sanity:scenic-route:${slug}`)
      break
  }

  return [...tags]
}
