import type {Metadata} from 'next'

import {isSearchIndexingAllowed} from '@/lib/deployment'
import {getCanonicalUrl} from '@/lib/site-url'
import {getEditorialImage} from '@/sanity/image'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'
import type {SanityImage, SeoData} from '@/sanity/types'

type PageMetadataOptions = {
  description: string
  noIndex?: boolean
  pathname: string
  seo?: SeoData | null
  socialImage?: SanityImage | null
  title: string
  type?: 'article' | 'website'
}

export async function createPageMetadata({
  description: fallbackDescription,
  noIndex = false,
  pathname,
  seo,
  socialImage: fallbackSocialImage,
  title: fallbackTitle,
  type = 'website',
}: PageMetadataOptions): Promise<Metadata> {
  const siteSettings = await getSiteSeoSettings()
  const title = seo?.metaTitle?.trim() || fallbackTitle
  const description = seo?.metaDescription?.trim() || fallbackDescription
  const indexingAllowed = isSearchIndexingAllowed()
  const canonical = indexingAllowed
    ? seo?.canonicalUrl?.trim() || getCanonicalUrl(pathname, siteSettings?.siteUrl)
    : getCanonicalUrl(pathname)
  const socialImage = getEditorialImage(
    seo?.socialImage ?? fallbackSocialImage ?? siteSettings?.defaultSocialImage,
    {height: 630, width: 1200},
  )
  const shouldNoIndex = !indexingAllowed || noIndex || Boolean(seo?.noIndex)
  const socialTitle = seo?.socialTitle?.trim() || title
  const socialDescription = seo?.socialDescription?.trim() || description
  const images = socialImage
    ? [{alt: socialImage.alt, height: 630, url: String(socialImage.src), width: 1200}]
    : undefined

  return {
    alternates: {canonical},
    description,
    openGraph: {
      description: socialDescription,
      images,
      siteName: "Joshua's Point",
      title: socialTitle,
      type,
      url: canonical,
    },
    robots: shouldNoIndex
      ? {
          follow: false,
          index: false,
          googleBot: {
            follow: false,
            index: false,
            noarchive: true,
            noimageindex: true,
            nosnippet: true,
          },
          nocache: true,
        }
      : {follow: true, index: true},
    title,
    twitter: {
      card: images ? 'summary_large_image' : 'summary',
      description: socialDescription,
      images: images?.map((image) => image.url),
      title: socialTitle,
    },
  }
}
