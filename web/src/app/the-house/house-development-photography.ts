import type {EditorialImage} from '@/components/editorial'

type HouseDevelopmentPhotographyRole =
  | 'deckAndRoof'
  | 'evening'
  | 'hero'
  | 'morning'
  | 'openThreshold'
  | 'poolRelationship'
  | 'rain'
  | 'sharedHeart'
  | 'view'

/**
 * Temporary local photography for visual development of the House page.
 *
 * These assets are development photography, not final, and must be replaced
 * before production. Keeping the image records separate from the presentation
 * data makes that replacement possible without changing section components.
 */
export const houseDevelopmentPhotography = {
  deckAndRoof: {
    alt: 'Covered deck beside a glazed room, with seating and dense trees along the edge.',
    src: '/images/house/indoor-outdoor/1FDE1119-111D-417D-93A8-60CE26137A23_1_105_c.jpeg',
  },
  evening: {
    alt: 'Lit bedroom and covered deck beside a pool reflecting trees and an evening sky.',
    src: '/images/house/daily-rhythm/evening/B20B565B-9359-4FBD-BAA0-9647E963AD2D_1_105_c.jpeg',
  },
  hero: {
    alt: 'Pool beside a roofed terrace, surrounded by trees and vegetation beneath a blue sky.',
    src: '/images/house/hero/4F003BED-1A9C-412A-9137-BEE683305BF5_1_105_c.jpeg',
  },
  morning: {
    alt: 'Covered deck with seating beside two bedrooms and sliding glass doors.',
    src: '/images/house/daily-rhythm/morning/D2C7104D-837A-4FD1-8866-3B129B51EADB_1_105_c.jpeg',
  },
  openThreshold: {
    alt: 'Living room opening onto a deck with a pool and trees beyond.',
    src: '/images/house/indoor-outdoor/EC3207AF-79BF-4DC1-AB4E-1B9E0682848E_1_105_c.jpeg',
  },
  poolRelationship: {
    alt: 'Pool between decks and rooms, with outdoor seating in the foreground.',
    src: '/images/house/indoor-outdoor/5D6C1A69-C229-4E90-AB87-0D6BC31B18EF_1_105_c.jpeg',
  },
  rain: {
    alt: 'Covered timber deck and pool at night beneath a roof with open sides.',
    src: '/images/house/daily-rhythm/rain/C563E734-F8F4-4F04-BD10-E649613674E4_4_5005_c.jpeg',
  },
  sharedHeart: {
    alt: 'Open kitchen, dining table, and living area arranged in one shared room.',
    src: '/images/house/shared-heart/AE351CE6-C211-44AA-A596-67573955A50D_1_105_c.jpeg',
  },
  view: {
    alt: 'Bedroom opening to a covered deck with trees and distant landscape beyond.',
    src: '/images/house/view/1BB34E83-3CE5-45A0-B1BD-28FF9CB0E861_1_105_c.jpeg',
  },
} satisfies Record<HouseDevelopmentPhotographyRole, EditorialImage>
