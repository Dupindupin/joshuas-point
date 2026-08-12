import type {HomeEditorialLink, HomePageData} from '@/app/home-page-data'
import type {EditorialImage} from '@/components/editorial'

import {getEditorialImage} from '../image'
import type {SanityHomePageData, SanityImage, SanityLink} from '../types'

type SanityHomeImageSection = {
  body?: string | null
  eyebrow?: string | null
  heading?: string | null
  image?: SanityImage | null
}

function cleanText(value: string | null | undefined) {
  const cleaned = value?.trim()
  return cleaned || undefined
}

function mapImage(
  image: SanityImage | null | undefined,
  dimensions: {height: number; width: number},
): EditorialImage | undefined {
  return getEditorialImage(image, dimensions)
}

function mapImageSection(
  section: SanityHomeImageSection | null | undefined,
  dimensions: {height: number; width: number},
) {
  const eyebrow = cleanText(section?.eyebrow)
  const heading = cleanText(section?.heading)
  const paragraph = cleanText(section?.body)
  const image = mapImage(section?.image, dimensions)

  if (!eyebrow || !heading || !paragraph || !image) return undefined

  return {
    caption: cleanText(section?.image?.caption),
    eyebrow,
    heading,
    image,
    paragraph,
  }
}

function mapInternalReference(link: SanityLink) {
  const reference = link.reference
  if (!reference?._type) return undefined

  switch (reference._type) {
    case 'homePage':
      return '/'
    case 'housePage':
      return '/the-house'
    case 'destinationsPage':
      return '/destinations'
    case 'destination': {
      const slug = cleanText(reference.slug)
      return slug ? `/destinations/${encodeURIComponent(slug)}` : undefined
    }
    case 'diveSitesPage':
      return '/dive-sites'
    case 'scenicRoutesPage':
      return '/scenic-routes'
    case 'scenicRoute': {
      const slug = cleanText(reference.slug)
      return slug ? `/scenic-routes/${encodeURIComponent(slug)}` : undefined
    }
    default:
      return undefined
  }
}

function mapLink(link: SanityLink | null | undefined): HomeEditorialLink | undefined {
  const label = cleanText(link?.label)
  if (!label || !link?.kind) return undefined

  let href: string | undefined
  switch (link.kind) {
    case 'email': {
      const email = cleanText(link.email)
      href = email ? `mailto:${email}` : undefined
      break
    }
    case 'external':
      href = cleanText(link.externalUrl)
      break
    case 'internal':
      href = mapInternalReference(link)
      break
    case 'phone': {
      const phone = cleanText(link.phone)
      href = phone ? `tel:${phone}` : undefined
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

/** Maps published Home content into a stable, component-facing presentation contract. */
export function mapSanityHomePage(page: SanityHomePageData): HomePageData | null {
  const heroEyebrow = cleanText(page.hero?.eyebrow)
  const heroDescription = cleanText(page.hero?.introduction)
  const heroTitle = cleanText(page.hero?.heading)
  const heroImage = mapImage(page.hero?.image, {height: 1350, width: 2400})

  if (!heroEyebrow || !heroDescription || !heroTitle || !heroImage) return null

  const southernEyebrow = cleanText(page.southernNegrosIntroduction?.eyebrow)
  const southernHeading = cleanText(page.southernNegrosIntroduction?.heading)
  const southernParagraph = cleanText(page.southernNegrosIntroduction?.body)
  const closingBody = cleanText(page.closingReflection?.body)

  return {
    closingReflection: closingBody
      ? {
          body: closingBody,
          caption: cleanText(page.closingReflection?.image?.caption),
          image: mapImage(page.closingReflection?.image, {height: 1350, width: 2400}),
        }
      : undefined,
    hero: {
      description: heroDescription,
      eyebrow: heroEyebrow,
      image: heroImage,
      title: heroTitle,
    },
    morningNarrative: mapImageSection(page.morningNarrative, {height: 1350, width: 2400}),
    placeStory: mapImageSection(page.placeStory, {height: 1200, width: 1800}),
    sharedLife: mapImageSection(page.sharedLife, {height: 1200, width: 1800}),
    southernNegros:
      southernEyebrow && southernHeading && southernParagraph
        ? {
            caption: cleanText(page.southernNegrosIntroduction?.image?.caption),
            eyebrow: southernEyebrow,
            heading: southernHeading,
            image: mapImage(page.southernNegrosIntroduction?.image, {
              height: 1200,
              width: 1800,
            }),
            link: mapLink(page.southernNegrosIntroduction?.primaryLink),
            paragraph: southernParagraph,
          }
        : undefined,
  }
}
