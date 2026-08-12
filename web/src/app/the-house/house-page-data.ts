import type {EditorialFigureMedia, EditorialPhotoEssayItems} from '@/components/editorial'
import type {HouseMaterialStory} from '@/components/house'

import {houseDevelopmentPhotography} from './house-development-photography'

type HouseTextSection = {
  body: string
  eyebrow: string
  heading: string
}

type HouseMediaStory = HouseTextSection & {
  caption?: string
  media: EditorialFigureMedia
}

export type HousePageData = {
  dailyRhythms?: HouseTextSection & {
    items: EditorialPhotoEssayItems
  }
  finalReflection: {
    body: string
  }
  hero: {
    eyebrow: string
    introduction: string
    media: EditorialFigureMedia
    title: string
  }
  indoorOutdoor: HouseTextSection & {
    items: EditorialPhotoEssayItems
  }
  materials?: Omit<HouseTextSection, 'body'> & {
    body?: string
    items: readonly HouseMaterialStory[]
  }
  openingReflection: HouseTextSection
  sharedLiving: HouseMediaStory
  view: HouseTextSection & {
    caption?: string
    media: EditorialFigureMedia
  }
}

export const housePageData: HousePageData = {
  hero: {
    eyebrow: 'The House',
    introduction:
      'A home shaped by shared space, changing weather, and a close relationship with the landscape.',
    media: {
      image: houseDevelopmentPhotography.hero,
      preload: true,
      ratio: 'panoramic',
      sizes: '100vw',
      tone: 'morning',
    },
    title: 'The House',
  },
  openingReflection: {
    body: 'The deck, view, and infinity pool are what people notice first. Beyond that first reaction, the house settles into the landscape and the quiet around it.',
    eyebrow: 'Opening reflection',
    heading: 'A place that feels like home.',
  },
  sharedLiving: {
    body: 'The kitchen, dining area, living room, and deck work as one connected space. People naturally gather here to cook, eat, sit, talk, practise yoga, and relax.',
    eyebrow: 'Shared spaces',
    heading: 'The heart of the house is lived together.',
    media: {
      image: houseDevelopmentPhotography.sharedHeart,
      ratio: 'landscape',
      sizes: '(min-width: 1024px) 58vw, 100vw',
      tone: 'stone',
    },
  },
  view: {
    body: 'From the house, the view reaches the Bohol Sea, Apo Island, Siquijor Island, and Mount Talinis.',
    eyebrow: 'The view',
    heading: 'The view is always present.',
    media: {
      image: houseDevelopmentPhotography.view,
      ratio: 'panoramic',
      sizes: '100vw',
      tone: 'morning',
    },
  },
  indoorOutdoor: {
    body: 'The three-meter covered deck creates a semi-outdoor living space beside the connected rooms. Sliding doors, the roof, deck, and pool keep daily life in relationship with the landscape and view.',
    eyebrow: 'Between inside and outside',
    heading: 'The threshold is part of daily life.',
    items: [
      {
        id: 'open-threshold',
        media: {
          image: houseDevelopmentPhotography.openThreshold,
          ratio: 'landscape',
          sizes: '(min-width: 1024px) 58vw, 100vw',
          tone: 'stone',
        },
      },
      {
        id: 'deck-and-shelter',
        media: {
          image: houseDevelopmentPhotography.deckAndRoof,
          ratio: 'landscape',
          sizes: '(min-width: 1024px) 33vw, 100vw',
          tone: 'morning',
        },
      },
      {
        id: 'pool-relationship',
        media: {
          image: houseDevelopmentPhotography.poolRelationship,
          ratio: 'landscape',
          sizes: '(min-width: 1024px) 67vw, 100vw',
          tone: 'stone',
        },
      },
    ],
  },
  dailyRhythms: {
    body: 'Morning can begin with coffee on the deck, birds, and a view toward sea or mountain. Rain brings the sound of water and bamboo moving in the wind. In the evening, warm air moves across the deck while lights appear on distant islands and around the house.',
    eyebrow: 'The house through the day',
    heading: 'Light and weather change the rooms.',
    items: [
      {
        id: 'morning',
        media: {
          image: houseDevelopmentPhotography.morning,
          ratio: 'landscape',
          sizes: '(min-width: 1024px) 83vw, 100vw',
          tone: 'morning',
        },
      },
      {
        id: 'rain',
        media: {
          image: houseDevelopmentPhotography.rain,
          ratio: 'portrait',
          sizes: '(min-width: 1024px) 42vw, 100vw',
          tone: 'stone',
        },
      },
      {
        id: 'evening',
        media: {
          image: houseDevelopmentPhotography.evening,
          ratio: 'landscape',
          sizes: '(min-width: 1024px) 42vw, 100vw',
          tone: 'morning',
        },
      },
    ],
  },
  finalReflection: {
    body: 'The corner of the deck remains a quiet place within the shared life of the house, close to birds in the morning, wind through bamboo, and rain when it comes.',
  },
}
