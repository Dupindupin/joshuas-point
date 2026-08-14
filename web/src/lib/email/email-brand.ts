import {normalizeSocialProfiles} from '@/lib/social-profiles'
import {getSiteUrl} from '@/lib/site-url'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'

import {defaultEmailBrand} from './email-shell'
import type {EmailBrand} from './types'

export async function getEmailBrand(): Promise<EmailBrand> {
  const settings = await getSiteSeoSettings()
  const siteUrl = getSiteUrl(settings?.siteUrl).toString().replace(/\/$/, '')
  const address = settings?.contactDetails?.address
  const location = [address?.locality, address?.region, address?.postalCode, address?.country]
    .filter(Boolean)
    .join(', ')

  return {
    contactEmail: settings?.contactDetails?.email ?? defaultEmailBrand.contactEmail,
    location: location || settings?.propertyLocation?.label?.trim() || defaultEmailBrand.location,
    // Keep email rendering on a stable PNG instead of negotiated image formats.
    logoUrl: new URL('/brand/logo-light.png', siteUrl).toString(),
    siteName: settings?.siteTitle?.trim() || defaultEmailBrand.siteName,
    siteUrl,
    socialLinks: normalizeSocialProfiles(settings?.socialProfiles).map(({label, href}) => ({
      label,
      url: href,
    })),
  }
}
