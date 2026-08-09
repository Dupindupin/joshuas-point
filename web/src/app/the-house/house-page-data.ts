import type {EditorialFigureMedia, EditorialPhotoEssayItems} from '@/components/editorial'
import type {HouseMaterialStory} from '@/components/house'

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
  dailyRhythms: HouseTextSection & {
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
  materials: HouseTextSection & {
    items: readonly HouseMaterialStory[]
    verificationNote: string
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
      'An editorial study of a home understood through its relationship with nature, shared space, and the changing day.',
    media: {
      ratio: 'panoramic',
      sizes: '100vw',
      tone: 'morning',
    },
    title: 'The House',
  },
  openingReflection: {
    body: 'The feeling to protect is simple: homy, connected to nature, and peaceful. The final account of that feeling will be written only from the owner’s lived observations.',
    eyebrow: 'Opening reflection',
    heading: 'A home before a statement.',
  },
  sharedLiving: {
    body: 'The kitchen, dining area, living room, and deck belong to one connected editorial story. Their final description will come from how people genuinely cook, gather, talk, and spend quiet time here.',
    eyebrow: 'Shared spaces',
    heading: 'The heart of the house is lived together.',
    media: {
      ratio: 'landscape',
      sizes: '(min-width: 1024px) 58vw, 100vw',
      tone: 'stone',
    },
  },
  view: {
    body: 'The final caption and geographical description will be added only after the viewpoint and every visible landmark have been verified.',
    eyebrow: 'The view',
    heading: 'Nature holds this page open.',
    media: {
      ratio: 'panoramic',
      sizes: '100vw',
      tone: 'morning',
    },
  },
  indoorOutdoor: {
    body: 'The deck, sliding doors, roof, and pool will be described through observed use and verified architectural relationships—not as a list of amenities.',
    eyebrow: 'Between inside and outside',
    heading: 'The threshold is part of daily life.',
    items: [
      {
        caption: 'Open threshold — photography and owner observation required.',
        id: 'open-threshold',
        media: {
          ratio: 'portrait',
          sizes: '(min-width: 1024px) 58vw, 100vw',
          tone: 'stone',
        },
      },
      {
        caption: 'Deck and shelter — materials and architectural purpose require verification.',
        id: 'deck-and-shelter',
        media: {
          ratio: 'portrait',
          sizes: '(min-width: 1024px) 33vw, 100vw',
          tone: 'morning',
        },
      },
      {
        caption: 'House, deck, pool, and landscape — relationship photography required.',
        id: 'pool-relationship',
        media: {
          ratio: 'landscape',
          sizes: '(min-width: 1024px) 67vw, 100vw',
          tone: 'stone',
        },
      },
    ],
  },
  dailyRhythms: {
    body: 'Morning, rain, and evening are held as three fields for real observation. No routine, weather pattern, or emotional response is assumed here.',
    eyebrow: 'The house through the day',
    heading: 'Light and weather change the rooms.',
    items: [
      {
        caption: 'Morning — owner observation and photography required.',
        captionTone: 'inverse',
        id: 'morning',
        media: {
          ratio: 'landscape',
          sizes: '(min-width: 1024px) 83vw, 100vw',
          tone: 'morning',
        },
      },
      {
        caption: 'Rain — seasonal observation and photography required.',
        captionTone: 'inverse',
        id: 'rain',
        media: {
          ratio: 'portrait',
          sizes: '(min-width: 1024px) 42vw, 100vw',
          tone: 'stone',
        },
      },
      {
        caption: 'Evening — owner observation and photography required.',
        captionTone: 'inverse',
        id: 'evening',
        media: {
          ratio: 'portrait',
          sizes: '(min-width: 1024px) 42vw, 100vw',
          tone: 'morning',
        },
      },
    ],
  },
  materials: {
    body: 'Material stories will appear only when their names, applications, sources, and lived behavior have been confirmed. Light and air remain possible experiential subjects, not assumed construction facts.',
    eyebrow: 'Materials and architecture',
    heading: 'What is present must be named truthfully.',
    items: [
      {
        description: 'Description withheld until the material and its application are verified.',
        id: 'deck-material',
        name: 'Deck material',
        verificationStatus: 'unverified',
      },
      {
        description: 'Description withheld until the material and its application are verified.',
        id: 'principal-interior-material',
        name: 'Principal interior material',
        verificationStatus: 'unverified',
      },
      {
        description: 'Description withheld until its form, material, and purpose are verified.',
        id: 'roof',
        name: 'Roof',
        verificationStatus: 'unverified',
      },
    ],
    verificationNote:
      'No physical material story has yet completed owner and architectural verification.',
  },
  finalReflection: {
    body: 'The closing reflection will be written from one real, public-safe observation of the house over time. Until then, the page ends by leaving room for that memory rather than inventing it.',
  },
}
