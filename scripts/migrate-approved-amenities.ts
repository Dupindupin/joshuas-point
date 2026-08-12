import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-11'})

type ApprovedAmenity = {
  _id: string
  category: string
  internalKey: string
  name: string
  shortDescription: string
}

const approvedAmenities: ApprovedAmenity[] = [
  {
    _id: 'amenity-connected-shared-spaces',
    category: 'sharedLiving',
    internalKey: 'connected-shared-spaces',
    name: 'Connected shared spaces',
    shortDescription:
      'The kitchen, dining area, living room, and deck work as connected shared spaces.',
  },
  {
    _id: 'amenity-covered-deck',
    category: 'outdoorLiving',
    internalKey: 'covered-deck',
    name: 'Covered deck',
    shortDescription: 'A covered deck provides space for sitting, dining, yoga, and relaxing.',
  },
  {
    _id: 'amenity-infinity-pool',
    category: 'outdoorLiving',
    internalKey: 'infinity-pool',
    name: 'Infinity pool',
    shortDescription: 'The infinity pool is connected to the view and surrounding landscape.',
  },
  {
    _id: 'amenity-solar-battery-system',
    category: 'energy',
    internalKey: 'solar-battery-system',
    name: 'Solar and battery system',
    shortDescription: 'The house has solar panels, battery storage, and grid backup.',
  },
  {
    _id: 'amenity-rainwater-collection',
    category: 'water',
    internalKey: 'rainwater-collection',
    name: 'Rainwater collection',
    shortDescription: 'Collected rainwater is used for watering plants.',
  },
  {
    _id: 'amenity-air-conditioning',
    category: 'climate',
    internalKey: 'air-conditioning',
    name: 'Air conditioning',
    shortDescription: 'Air conditioning is available.',
  },
  {
    _id: 'amenity-wifi',
    category: 'connectivity',
    internalKey: 'wifi',
    name: 'Wi-Fi',
    shortDescription: 'Wi-Fi is available.',
  },
  {
    _id: 'amenity-parking',
    category: 'parking',
    internalKey: 'parking',
    name: 'Parking',
    shortDescription: 'Parking is available.',
  },
  {
    _id: 'amenity-filtered-water',
    category: 'water',
    internalKey: 'filtered-water',
    name: 'Filtered water',
    shortDescription: 'Filtered water is available.',
  },
  {
    _id: 'amenity-fully-equipped-kitchen',
    category: 'cooking',
    internalKey: 'fully-equipped-kitchen',
    name: 'Fully equipped kitchen',
    shortDescription: 'A fully equipped kitchen is available.',
  },
  {
    _id: 'amenity-outdoor-barbecue',
    category: 'cooking',
    internalKey: 'outdoor-barbecue',
    name: 'Outdoor barbecue',
    shortDescription: 'An outdoor barbecue is available.',
  },
  {
    _id: 'amenity-outside-shower',
    category: 'bathing',
    internalKey: 'outside-shower',
    name: 'Outside shower',
    shortDescription: 'An outside shower is available.',
  },
  {
    _id: 'amenity-laundry',
    category: 'service',
    internalKey: 'laundry',
    name: 'Laundry',
    shortDescription: 'Laundry is available.',
  },
  {
    _id: 'amenity-two-scooters',
    category: 'transport',
    internalKey: 'two-scooters',
    name: 'Two scooters',
    shortDescription: 'Two scooters are available.',
  },
  {
    _id: 'amenity-transfers',
    category: 'transport',
    internalKey: 'transfers',
    name: 'Transfers',
    shortDescription: 'Transfers are available.',
  },
  {
    _id: 'amenity-television',
    category: 'entertainment',
    internalKey: 'television',
    name: 'Television',
    shortDescription: 'A television is available.',
  },
  {
    _id: 'amenity-exclusive-use',
    category: 'stayArrangement',
    internalKey: 'exclusive-use',
    name: 'Exclusive use',
    shortDescription: 'Stays include exclusive use of the whole house.',
  },
]

async function main() {
  const obsoleteIds = [
    'amenity.connected-shared-spaces',
    'amenity.covered-deck',
    'amenity.infinity-pool',
    'amenity.rainwater-collection',
    'amenity.solar-battery-system',
  ]

  for (const amenity of approvedAmenities) {
    await client.createOrReplace({
      ...amenity,
      _type: 'amenity',
      active: true,
    })
  }
  await client.delete({query: '*[_id in $ids]', params: {ids: obsoleteIds}})
  console.log(`Published ${approvedAmenities.length} approved amenity documents.`)
}

main().catch((error) => {
  console.error(error)
  throw error
})
