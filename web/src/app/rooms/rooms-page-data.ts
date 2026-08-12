import type {EditorialImage} from '@/components/editorial'
import type {RoomPreviewData} from '@/components/rooms/room-preview'

type RoomsTextSection = {
  body: string
  heading: string
}

export type RoomsPageData = {
  closingReflection?: {
    body: string
  }
  collectionIntroduction: {
    eyebrow: string
    heading: string
  }
  comfortPhilosophy?: RoomsTextSection & {
    eyebrow: string
  }
  editorialIntroduction?: RoomsTextSection
  hero: {
    eyebrow: string
    introduction: string
    title: string
  }
  imageBreak?: {
    caption?: string
    image: EditorialImage
  }
  rooms: readonly RoomPreviewData[]
}

/**
 * Verified static fallback used only when no published Rooms Page singleton exists.
 * Room photography remains unassigned until the suite shown in each image is confirmed.
 */
export const roomsPageData: RoomsPageData = {
  collectionIntroduction: {
    eyebrow: 'The suites',
    heading: 'Ocean Suite and Garden Suite.',
  },
  hero: {
    eyebrow: 'Accommodation',
    introduction: 'Joshua’s Point has two guest suites.',
    title: 'Rooms',
  },
  rooms: [
    {
      description: 'A king bed, a private ensuite for two, and views toward the Bohol Sea.',
      facts: [
        {icon: 'guests', label: 'Capacity', value: '2 guests'},
        {icon: 'bed', label: 'Bed', value: '1 King size bed'},
        {icon: 'bathroom', label: 'Bathroom', value: 'Private ensuite'},
        {icon: 'outlook', label: 'Outlook', value: 'Bohol Sea and pool'},
      ],
      id: 'ocean-suite',
      name: 'Ocean Suite',
      tone: 'morning',
    },
    {
      description: 'A Queen bed, a private ensuite, and a calm garden-and-pool outlook.',
      facts: [
        {icon: 'guests', label: 'Capacity', value: '2 guests'},
        {icon: 'bed', label: 'Bed', value: '1 Queen bed'},
        {icon: 'bathroom', label: 'Bathroom', value: 'Private ensuite'},
        {icon: 'outlook', label: 'Outlook', value: 'Garden and pool'},
      ],
      id: 'garden-suite',
      name: 'Garden Suite',
      tone: 'stone',
    },
  ],
}
