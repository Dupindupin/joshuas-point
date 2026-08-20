import type {SanityLink} from '../types'

export type ResolvedSanityLink = {
  href: string
  label: string
  openInNewTab: boolean
}

const publicRoutes = new Set([
  '/',
  '/cancellation-policy',
  '/contact',
  '/destinations',
  '/dive-sites',
  '/explorer',
  '/faq',
  '/getting-here',
  '/guide',
  '/house-guide',
  '/plan-your-stay',
  '/privacy',
  '/rooms',
  '/scenic-routes',
  '/terms',
  '/the-house',
])

export function cleanSanityText(value: string | null | undefined) {
  const cleaned = value?.trim()
  return cleaned || undefined
}

function mapInternalReference(link: SanityLink) {
  const reference = link.reference
  if (!reference?._type) return undefined

  switch (reference._type) {
    case 'homePage':
      return '/'
    case 'housePage':
      return '/the-house'
    case 'roomsPage':
      return '/rooms'
    case 'destinationsPage':
      return '/destinations'
    case 'destination': {
      const slug = cleanSanityText(reference.slug)
      return slug ? `/destinations/${encodeURIComponent(slug)}` : undefined
    }
    case 'diveSitesPage':
      return '/dive-sites'
    case 'diveSite': {
      const slug = cleanSanityText(reference.slug)
      return slug ? `/dive-sites/${encodeURIComponent(slug)}` : undefined
    }
    case 'scenicRoutesPage':
      return '/scenic-routes'
    case 'scenicRoute': {
      const slug = cleanSanityText(reference.slug)
      return slug ? `/scenic-routes/${encodeURIComponent(slug)}` : undefined
    }
    default:
      return undefined
  }
}

export function mapSanityLink(
  link: SanityLink | null | undefined,
  labelOverride?: string | null,
): ResolvedSanityLink | undefined {
  const label = cleanSanityText(labelOverride) ?? cleanSanityText(link?.label)
  if (!label || !link?.kind) return undefined

  let href: string | undefined
  switch (link.kind) {
    case 'email': {
      const email = cleanSanityText(link.email)
      href = email ? `mailto:${email}` : undefined
      break
    }
    case 'external':
      href = cleanSanityText(link.externalUrl)
      break
    case 'internal':
      href = mapInternalReference(link)
      break
    case 'phone': {
      const phone = cleanSanityText(link.phone)
      href = phone ? `tel:${phone}` : undefined
      break
    }
    case 'route': {
      const route = cleanSanityText(link.internalRoute)
      href = route && publicRoutes.has(route) ? route : undefined
      break
    }
  }

  if (!href) return undefined
  return {
    href,
    label,
    openInNewTab: link.kind === 'external' && link.openInNewTab === true,
  }
}
