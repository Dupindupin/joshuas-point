import type {SeoData, SanityContactDetails, SanitySiteSettingsData} from '../types'
import {cleanSanityText, mapSanityLink, type ResolvedSanityLink} from './link'

export type SiteContactDetails = {
  address?: {
    country?: string
    locality?: string
    postalCode?: string
    region?: string
  }
  email?: string
  inquiryNote?: string
  mapUrl?: string
  phone?: string
  phoneHref?: string
  whatsappUrl?: string
}

export type SiteNavigationGroup = {
  links: ResolvedSanityLink[]
  title: string
}

export type SiteSettingsData = Omit<
  SanitySiteSettingsData,
  'bookingLinks' | 'contactDetails' | 'footer' | 'primaryNavigation'
> & {
  bookingLinks?: {
    disclosure?: string
    enabled: boolean
    inquiry?: ResolvedSanityLink
    primary?: ResolvedSanityLink
  }
  contactDetails?: SiteContactDetails
  defaultSeo?: SeoData | null
  footer?: {
    contactDetailsOverride?: SiteContactDetails
    copyrightText?: string
    introduction?: string
    legalLinks: ResolvedSanityLink[]
    navigationGroups: SiteNavigationGroup[]
  }
  primaryNavigation: ResolvedSanityLink[]
}

function mapContactDetails(
  details: SanityContactDetails | null | undefined,
): SiteContactDetails | undefined {
  if (!details) return undefined

  const address = details.address
    ? {
        country: cleanSanityText(details.address.country),
        locality: cleanSanityText(details.address.locality),
        postalCode: cleanSanityText(details.address.postalCode),
        region: cleanSanityText(details.address.region),
      }
    : undefined
  const mapped = {
    address,
    email: cleanSanityText(details.email),
    inquiryNote: cleanSanityText(details.inquiryNote),
    mapUrl: cleanSanityText(details.mapUrl),
    phone: cleanSanityText(details.phone),
    phoneHref: cleanSanityText(details.phoneHref),
    whatsappUrl: cleanSanityText(details.whatsappUrl),
  }

  return Object.values(mapped).some(Boolean) ? mapped : undefined
}

export function mapSanitySiteSettings(
  settings: SanitySiteSettingsData | null,
): SiteSettingsData | null {
  if (!settings?._id) return null

  const primaryNavigation = (settings.primaryNavigation ?? []).flatMap((item) => {
    const link = mapSanityLink(item?.link, item?.label)
    return link ? [link] : []
  })
  const navigationGroups = (settings.footer?.navigationGroups ?? []).flatMap((group) => {
    const title = cleanSanityText(group?.title)
    if (!title) return []
    const links = (group?.items ?? []).flatMap((item) => {
      const link = mapSanityLink(item?.link, item?.label)
      return link ? [link] : []
    })
    return links.length > 0 ? [{links, title}] : []
  })
  const legalLinks = (settings.footer?.legalLinks ?? []).flatMap((item) => {
    const link = mapSanityLink(item?.link, item?.label)
    return link ? [link] : []
  })
  const primaryBookingLink = mapSanityLink(settings.bookingLinks?.primary)
  const inquiryLink = mapSanityLink(settings.bookingLinks?.inquiry)

  return {
    ...settings,
    bookingLinks: settings.bookingLinks
      ? {
          disclosure: cleanSanityText(settings.bookingLinks.disclosure),
          enabled: settings.bookingLinks.enabled === true && Boolean(primaryBookingLink),
          inquiry: inquiryLink,
          primary: primaryBookingLink,
        }
      : undefined,
    contactDetails: mapContactDetails(settings.contactDetails),
    footer: settings.footer
      ? {
          contactDetailsOverride: mapContactDetails(settings.footer.contactDetailsOverride),
          copyrightText: cleanSanityText(settings.footer.copyrightText),
          introduction: cleanSanityText(settings.footer.introduction),
          legalLinks,
          navigationGroups,
        }
      : undefined,
    primaryNavigation,
  }
}
