import type {EditorialAmenityIcon, EditorialAmenityItem} from '@/components/amenities'
import type {SanityAmenity} from '@/sanity/types'

export const approvedAmenityKeys = {
  airConditioning: 'air-conditioning',
  connectedSharedSpaces: 'connected-shared-spaces',
  coveredDeck: 'covered-deck',
  exclusiveUse: 'exclusive-use',
  filteredWater: 'filtered-water',
  fullyEquippedKitchen: 'fully-equipped-kitchen',
  infinityPool: 'infinity-pool',
  laundry: 'laundry',
  outdoorBarbecue: 'outdoor-barbecue',
  outsideShower: 'outside-shower',
  parking: 'parking',
  rainwaterCollection: 'rainwater-collection',
  solarBatterySystem: 'solar-battery-system',
  television: 'television',
  transfers: 'transfers',
  twoScooters: 'two-scooters',
  wifi: 'wifi',
} as const

export type ApprovedAmenityKey = (typeof approvedAmenityKeys)[keyof typeof approvedAmenityKeys]

const amenityIcons: Record<ApprovedAmenityKey, EditorialAmenityIcon> = {
  'air-conditioning': 'climate',
  'connected-shared-spaces': 'sharedSpaces',
  'covered-deck': 'deck',
  'exclusive-use': 'exclusiveUse',
  'filtered-water': 'water',
  'fully-equipped-kitchen': 'cooking',
  'infinity-pool': 'pool',
  laundry: 'service',
  'outdoor-barbecue': 'cooking',
  'outside-shower': 'bathroom',
  parking: 'parking',
  'rainwater-collection': 'rainwater',
  'solar-battery-system': 'energy',
  television: 'television',
  transfers: 'transport',
  'two-scooters': 'transport',
  wifi: 'connectivity',
}

function cleanText(value: string | null | undefined) {
  const cleaned = value?.trim()
  return cleaned || undefined
}

export function selectApprovedAmenities(
  amenities: readonly SanityAmenity[],
  keys: readonly ApprovedAmenityKey[],
): EditorialAmenityItem[] {
  const amenitiesByKey = new Map(
    amenities.flatMap((amenity) => {
      const key = cleanText(amenity.internalKey)
      return amenity.active && key ? [[key, amenity] as const] : []
    }),
  )

  return keys.flatMap((key) => {
    const amenity = amenitiesByKey.get(key)
    const title = cleanText(amenity?.name)
    const description = cleanText(amenity?.shortDescription)
    if (!title || !description) return []

    return [{description, icon: amenityIcons[key], title}]
  })
}
