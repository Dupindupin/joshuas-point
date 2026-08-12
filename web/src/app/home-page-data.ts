import type {EditorialImage} from '@/components/editorial'

import {homeDevelopmentPhotography} from './home-development-photography'

export type HomeEditorialLink = {
  href: string
  label: string
  openInNewTab?: boolean
}

type HomeTextSection = {
  eyebrow: string
  heading: string
  paragraph: string
}

type HomeImageSection = HomeTextSection & {
  caption?: string
  image: EditorialImage
}

export type HomePageData = {
  closingReflection?: {
    body: string
    caption?: string
    image?: EditorialImage
  }
  hero: {
    description: string
    eyebrow: string
    image: EditorialImage
    title: string
  }
  morningNarrative?: HomeImageSection
  placeStory?: HomeImageSection
  sharedLife?: HomeImageSection
  southernNegros?: HomeTextSection & {
    caption?: string
    image?: EditorialImage
    link?: HomeEditorialLink
  }
}

/**
 * Legacy static fallback used only when no published Home singleton exists.
 * The photography is temporary development material and must be replaced
 * before launch.
 */
export const homePageData: HomePageData = {
  hero: {
    description:
      'Joshua’s Point follows the ridge above the Bohol Sea—a quiet place for slow mornings, changing weather, and time together.',
    eyebrow: 'Negros Oriental · Philippines',
    image: homeDevelopmentPhotography.hero,
    title: 'A house that opens to the horizon.',
  },
  morningNarrative: {
    caption: 'The first light reaches the deck before the rest of the valley wakes.',
    eyebrow: 'Morning',
    heading: 'Where the landscape enters the house.',
    image: homeDevelopmentPhotography.morning,
    paragraph:
      'Large openings, warm timber, changing light, and uninterrupted views allow the surrounding landscape to become part of everyday life.',
  },
  placeStory: {
    caption: 'Morning light across the deck overlooking the sea.',
    eyebrow: 'The place',
    heading: 'Built to slow the day.',
    image: homeDevelopmentPhotography.place,
    paragraph:
      'Joshua’s Point was designed around light, changing weather, and the quiet rhythm of the landscape. Every space opens toward the horizon rather than away from it.',
  },
}
