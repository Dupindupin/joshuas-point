import {isSearchIndexingAllowed} from '@/lib/deployment'
import {normalizeSocialProfiles} from '@/lib/social-profiles'
import {getBrandImageSource} from '@/sanity/image'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'

export async function SiteIdentityStructuredData() {
  if (!isSearchIndexingAllowed()) return null

  const settings = await getSiteSeoSettings()
  const name = settings?.siteTitle?.trim()
  const url = settings?.siteUrl?.trim()

  if (!name || !url) return null

  const sameAs = normalizeSocialProfiles(settings?.socialProfiles).map((profile) => profile.href)
  const compactLogo = getBrandImageSource(settings?.compactLogo, 1024)
  const profileImage = getBrandImageSource(settings?.squareProfileImage, 1000)
  const origin = url.replace(/\/$/, '')
  const logoUrl = compactLogo ?? `${origin}/brand/app-icon.png`
  const identityImageUrl = profileImage ?? `${origin}/brand/social-profile.png`
  const structuredData = {
    '@context': 'https://schema.org',
    '@id': `${url.replace(/\/$/, '')}/#organization`,
    '@type': 'Organization',
    image: identityImageUrl,
    logo: {
      '@type': 'ImageObject',
      height: 1024,
      url: logoUrl,
      width: 1024,
    },
    name,
    ...(sameAs.length > 0 ? {sameAs} : {}),
    url,
  }

  return (
    <script
      dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData).replace(/</g, '\\u003c')}}
      type="application/ld+json"
    />
  )
}
