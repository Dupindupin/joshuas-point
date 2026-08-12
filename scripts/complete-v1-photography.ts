import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-08-11'})

const developmentCredit =
  'Development photography - not production approved - replace before launch'

const existingAssets = {
  casaroroFalls: 'image-acfcca9ab755301ba8e33458832cc7fecc4d8c53-960x1278-jpg',
  dumagueteBellTower: 'image-528fefcdc50e9015d9429981128df47ca4da393e-720x720-jpg',
  houseSuiteWing: 'image-4590b57a9e3155018a4d076bf0fc13e7855c7c6a-1086x724-jpg',
  lakeBalanan: 'image-ae24064ea118566606d0d4a5142d86d584383eb5-960x720-webp',
  najandigPeak: 'image-002907e4827dd253188095d08456193775cb1dc1-1440x786-jpg',
  apoIslandTurtle: 'image-80fd7a3e2328b24b570c4c27ccb071789e5d5df2-1200x800-webp',
} as const

type ImageSource = {
  filename: string
  url: string
}

const migratedSources = {
  gardenSuite: {
    filename: 'development-garden-suite-15.webp',
    url: 'https://joshuaspoint.com/wp-content/uploads/2026/03/15.webp',
  },
  oceanSuite: {
    filename: 'development-ocean-suite-12.webp',
    url: 'https://joshuaspoint.com/wp-content/uploads/2026/03/12.webp',
  },
  zamboanguitaDive: {
    filename: 'development-zamboanguita-ghost.jpg',
    url: 'https://joshuaspoint.com/wp-content/uploads/2026/07/Ghost-684x1024.jpg',
  },
} satisfies Record<string, ImageSource>

function editorialImage(assetId: string, alt: string) {
  return {
    _type: 'image',
    alt,
    asset: {
      _ref: assetId,
      _type: 'reference',
    },
    credit: developmentCredit,
    decorative: false,
  }
}

async function getOrUploadAsset({filename, url}: ImageSource) {
  const existing = await client.fetch<{_id: string} | null>(
    '*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}',
    {filename},
  )
  if (existing?._id) return existing._id

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Unable to download ${url}: ${response.status} ${response.statusText}`)
  }

  const nodeBuffer = (
    globalThis as typeof globalThis & {
      Buffer: {from(input: ArrayBuffer): unknown}
    }
  ).Buffer.from(await response.arrayBuffer())
  const asset = await client.assets.upload('image', nodeBuffer as never, {
    filename,
    source: {
      id: url,
      name: "Existing Joshua's Point website",
      url,
    },
  })

  return asset._id
}

async function main() {
  const [oceanSuiteAsset, gardenSuiteAsset, zamboanguitaDiveAsset] = await Promise.all([
    getOrUploadAsset(migratedSources.oceanSuite),
    getOrUploadAsset(migratedSources.gardenSuite),
    getOrUploadAsset(migratedSources.zamboanguitaDive),
  ])

  const transaction = client.transaction()

  transaction.patch('room-ocean-suite', (patch) =>
    patch.set({
      previewImage: editorialImage(
        oceanSuiteAsset,
        'The Ocean Suite at Joshua’s Point, opening through sliding glass doors toward the covered deck.',
      ),
    }),
  )
  transaction.patch('room-garden-suite', (patch) =>
    patch.set({
      previewImage: editorialImage(
        gardenSuiteAsset,
        'The Garden Suite at Joshua’s Point, with sliding glass doors opening toward the pool side of the house.',
      ),
    }),
  )
  transaction.patch('roomsPage', (patch) =>
    patch.set({
      imageBreak: editorialImage(
        existingAssets.houseSuiteWing,
        'The guest-suite wing and pool at Joshua’s Point, surrounded by trees.',
      ),
    }),
  )

  transaction.patch('destinationsPage', (patch) =>
    patch.set({
      'hero.image': editorialImage(
        existingAssets.najandigPeak,
        'The green ridge trail at Najandig Peak beneath a blue sky in Southern Negros.',
      ),
    }),
  )
  transaction.patch('destination-siaton', (patch) =>
    patch.set({
      heroImage: editorialImage(
        existingAssets.lakeBalanan,
        'People travelling by boat across Lake Balanan, surrounded by the green inland landscape of Siaton.',
      ),
    }),
  )

  transaction.patch('scenicRoutesPage', (patch) =>
    patch.set({
      'hero.image': editorialImage(
        existingAssets.najandigPeak,
        'A green mountain ridge in Southern Negros beneath a blue sky.',
      ),
    }),
  )
  transaction.patch('scenic-route-coastal-ride-to-dumaguete', (patch) =>
    patch.set({
      heroImage: editorialImage(
        existingAssets.dumagueteBellTower,
        'The stone bell tower in Dumaguete, a destination on the coastal ride.',
      ),
    }),
  )
  transaction.patch('scenic-route-southern-explorer', (patch) =>
    patch.set({
      heroImage: editorialImage(
        existingAssets.lakeBalanan,
        'A boat journey on Lake Balanan, one of the places connected by the Southern Explorer route.',
      ),
    }),
  )
  transaction.patch('scenic-route-valencia-highlands-loop', (patch) =>
    patch.set({
      heroImage: editorialImage(
        existingAssets.casaroroFalls,
        'Casaroro Falls in the forested Valencia highlands.',
      ),
    }),
  )
  transaction.patch('scenic-route-waterfall-explorer', (patch) =>
    patch.set({
      heroImage: editorialImage(
        existingAssets.casaroroFalls,
        'A person standing before Casaroro Falls in a deep tropical forest gorge.',
      ),
    }),
  )

  transaction.patch('diveSitesPage', (patch) =>
    patch.set({
      'hero.image': editorialImage(
        existingAssets.apoIslandTurtle,
        'A sea turtle swimming underwater among a school of fish.',
      ),
    }),
  )
  transaction.patch('dive-site-zamboanguita', (patch) =>
    patch.set({
      heroImage: editorialImage(
        zamboanguitaDiveAsset,
        'A slender blue and yellow marine animal against a dark underwater background.',
      ),
    }),
  )

  await transaction.commit()

  console.log(
    JSON.stringify(
      {
        migratedAssets: {
          gardenSuite: gardenSuiteAsset,
          oceanSuite: oceanSuiteAsset,
          zamboanguitaDive: zamboanguitaDiveAsset,
        },
        patchedDocuments: [
          'room-ocean-suite',
          'room-garden-suite',
          'roomsPage',
          'destinationsPage',
          'destination-siaton',
          'scenicRoutesPage',
          'scenic-route-coastal-ride-to-dumaguete',
          'scenic-route-southern-explorer',
          'scenic-route-valencia-highlands-loop',
          'scenic-route-waterfall-explorer',
          'diveSitesPage',
          'dive-site-zamboanguita',
        ],
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error)
  throw error
})
