import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-11'})

const approvedAreaLocations = [
  {
    _id: 'dive-site-apo-island',
    label: 'Apo Island area',
    latitude: 9.0768235,
    longitude: 123.2688201,
  },
  {
    _id: 'dive-site-dauin',
    label: 'Dauin area',
    latitude: 9.1897165,
    longitude: 123.26577,
  },
  {
    _id: 'dive-site-zamboanguita',
    label: 'Zamboanguita coast',
    latitude: 9.1164644,
    longitude: 123.204344775,
  },
] as const

const officialLocationLabel =
  "Joshua's Point, Calango, Zamboanguita 6218, Negros Oriental, Philippines"

async function main() {
  const existingSiteSettings = await client.fetch<{
    propertyLocation?: Record<string, unknown> | null
  } | null>('*[_type == "siteSettings" && _id == "siteSettings"][0]{propertyLocation}')

  const transaction = client.transaction()

  for (const location of approvedAreaLocations) {
    transaction.patch(location._id, (patch) =>
      patch.set({
        mapLocation: {
          _type: 'mapLocation',
          coordinates: {
            _type: 'geopoint',
            lat: location.latitude,
            lng: location.longitude,
          },
          label: location.label,
        },
      }),
    )
  }

  transaction.patch('siteSettings', (patch) =>
    patch.set({
      propertyLocation: {
        ...(existingSiteSettings?.propertyLocation ?? {}),
        _type: 'mapLocation',
        label: officialLocationLabel,
      },
    }),
  )

  await transaction.commit()
  console.log('Published the approved Explorer area locations and public location label.')
}

main().catch((error) => {
  console.error(error)
  throw error
})
