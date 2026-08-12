import type {EditorialImage} from '@/components/editorial'

type HomeDevelopmentPhotographyRole =
  'closingReflection' | 'hero' | 'morning' | 'place' | 'sharedLife'

/**
 * Temporary local photography for visual development of Home.
 *
 * These assets are development photography, not production approved, and must
 * be replaced before launch. Sanity images supersede them whenever a published
 * Home singleton exists.
 */
export const homeDevelopmentPhotography = {
  closingReflection: {
    alt: 'House and pool among trees beneath an evening sky.',
    src: '/images/home/closing-reflection/B20B565B-9359-4FBD-BAA0-9647E963AD2D_1_105_c.jpeg',
  },
  hero: {
    alt: 'Pool beside a covered terrace, with trees and distant landscape beyond.',
    src: '/images/home/hero/4F003BED-1A9C-412A-9137-BEE683305BF5_1_105_c.jpeg',
  },
  morning: {
    alt: 'Room opening toward a covered deck, trees, and distant landscape.',
    src: '/images/home/morning/1BB34E83-3CE5-45A0-B1BD-28FF9CB0E861_1_105_c.jpeg',
  },
  place: {
    alt: 'Living room opening toward a deck, pool, trees, and distant landscape.',
    src: '/images/home/place/EC3207AF-79BF-4DC1-AB4E-1B9E0682848E_1_105_c.jpeg',
  },
  sharedLife: {
    alt: 'Open kitchen, dining table, and living area arranged in one shared room.',
    src: '/images/home/shared-life/AE351CE6-C211-44AA-A596-67573955A50D_1_105_c.jpeg',
  },
} satisfies Record<HomeDevelopmentPhotographyRole, EditorialImage>
