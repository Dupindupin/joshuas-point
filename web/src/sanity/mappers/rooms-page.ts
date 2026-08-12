import type {RoomsPageData} from '@/app/rooms/rooms-page-data'
import {approvedAmenityKeys, selectApprovedAmenities} from '@/lib/amenities'
import type {RoomPreviewData} from '@/components/rooms/room-preview'

import {getEditorialImage} from '../image'
import type {SanityBedConfiguration, SanityRoomPreview, SanityRoomsPageData} from '../types'

const bathroomLabels = {
  privateEnsuite: 'Private ensuite',
} as const

const bedLabels = {
  bunk: 'Bunk bed',
  double: 'Double bed',
  king: 'King size bed',
  queen: 'Queen bed',
  single: 'Single bed',
  sofaBed: 'Sofa bed',
} as const

const outlookLabels = {
  boholSea: 'Bohol Sea',
  garden: 'Garden',
  pool: 'Pool',
} as const

function cleanText(value: string | null | undefined) {
  const cleaned = value?.trim()
  return cleaned || undefined
}

function formatBed(bed: SanityBedConfiguration) {
  if (!bed.type || !bed.quantity || bed.quantity < 1) return undefined
  const label = bedLabels[bed.type]
  return `${bed.quantity} ${label}${bed.quantity === 1 ? '' : 's'}`
}

function mapRoom(room: SanityRoomPreview | null): RoomPreviewData | undefined {
  if (!room?._id) return undefined
  const name = cleanText(room.title)
  const description = cleanText(room.excerpt)
  const maxGuests = room.capacity?.maxGuests
  const beds = (room.beds ?? []).flatMap((bed) => {
    if (!bed) return []
    const label = formatBed(bed)
    return label ? [label] : []
  })

  if (!name || !description || !maxGuests || maxGuests < 1 || beds.length === 0) return undefined

  const capacity =
    cleanText(room.capacity?.displayLabel) ?? `${maxGuests} guest${maxGuests === 1 ? '' : 's'}`
  const bathroom = room.bathroom ? bathroomLabels[room.bathroom] : undefined
  const outlooks = (room.outlooks ?? []).flatMap((outlook) =>
    outlook && outlook in outlookLabels ? [outlookLabels[outlook]] : [],
  )
  const additionalAmenities = selectApprovedAmenities(
    (room.amenities ?? []).flatMap((item) =>
      item?.amenity && item.amenity.active ? [item.amenity] : [],
    ),
    Object.values(approvedAmenityKeys),
  ).map((amenity) => ({
    icon: amenity.icon,
    label: amenity.title,
    value: amenity.description,
  }))
  const facts = [
    {icon: 'guests' as const, label: 'Capacity', value: capacity},
    {icon: 'bed' as const, label: 'Bed', value: beds.join(', ')},
    ...(bathroom ? [{icon: 'bathroom' as const, label: 'Bathroom', value: bathroom}] : []),
    ...(outlooks.length
      ? [{icon: 'outlook' as const, label: 'Outlook', value: outlooks.join(' and ')}]
      : []),
    ...additionalAmenities,
  ]

  return {
    description,
    facts,
    id: room._id,
    image: getEditorialImage(room.previewImage, {height: 1200, width: 1800}),
    name,
    tone: 'morning',
  }
}

function mapTextSection(
  section:
    | {
        body?: string | null
        heading?: string | null
      }
    | null
    | undefined,
) {
  const body = cleanText(section?.body)
  const heading = cleanText(section?.heading)
  return body && heading ? {body, heading} : undefined
}

/** Maps published Rooms content into the stable component-facing presentation contract. */
export function mapSanityRoomsPage(page: SanityRoomsPageData): RoomsPageData | null {
  const heroEyebrow = cleanText(page.hero?.eyebrow)
  const heroIntroduction = cleanText(page.hero?.introduction)
  const heroTitle = cleanText(page.hero?.title)
  const collectionEyebrow = cleanText(page.collectionIntroduction?.eyebrow)
  const collectionHeading = cleanText(page.collectionIntroduction?.heading)
  const rooms = (page.featuredRooms ?? [])
    .map(mapRoom)
    .filter((room): room is RoomPreviewData => Boolean(room))

  if (
    !heroEyebrow ||
    !heroIntroduction ||
    !heroTitle ||
    !collectionEyebrow ||
    !collectionHeading ||
    rooms.length === 0
  ) {
    return null
  }

  const comfort = mapTextSection(page.comfortPhilosophy)
  const comfortEyebrow = cleanText(page.comfortPhilosophy?.eyebrow)
  const closingBody = cleanText(page.closingReflection?.body)
  const image = getEditorialImage(page.imageBreak, {height: 1350, width: 2400})

  return {
    closingReflection: closingBody ? {body: closingBody} : undefined,
    collectionIntroduction: {
      eyebrow: collectionEyebrow,
      heading: collectionHeading,
    },
    comfortPhilosophy:
      comfort && comfortEyebrow ? {...comfort, eyebrow: comfortEyebrow} : undefined,
    editorialIntroduction: mapTextSection(page.editorialIntroduction),
    hero: {
      eyebrow: heroEyebrow,
      introduction: heroIntroduction,
      title: heroTitle,
    },
    imageBreak: image
      ? {
          caption: cleanText(page.imageBreak?.caption),
          image,
        }
      : undefined,
    rooms,
  }
}
