import {createHash} from 'node:crypto'
import {readFile} from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import {fileURLToPath} from 'node:url'

import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-08-12'
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const applyChanges = process.argv.includes('--apply')
const supportedArguments = new Set(['--apply'])
const unknownArguments = process.argv
  .slice(2)
  .filter((argument) => argument.startsWith('--') && !supportedArguments.has(argument))

if (unknownArguments.length > 0) {
  throw new Error(
    `Unknown argument${unknownArguments.length > 1 ? 's' : ''}: ${unknownArguments.join(', ')}`,
  )
}

function requiredEnvironmentVariable(name) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function log(message = '') {
  process.stdout.write(`${message}\n`)
}

function key(value) {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, '-')
    .replaceAll(/(^-|-$)/g, '')
}

function routeLink(label, route) {
  return {
    _type: 'navigationItem',
    _key: key(`${label}-${route}`),
    label,
    link: {
      _type: 'link',
      kind: 'route',
      label,
      internalRoute: route,
    },
  }
}

const brandAssets = [
  {field: 'primaryLogo', filename: 'logo-horizontal.png'},
  {field: 'compactLogo', filename: 'logo-mark.png'},
  {field: 'squareProfileImage', filename: 'social-profile.png'},
  {field: 'faviconImage', filename: 'favicon-32.png'},
  {field: 'appIconImage', filename: 'app-icon.png'},
]

const houseAssets = {
  deckShelter: {
    alt: 'Covered deck beside a glazed room, with seating and dense trees along the edge.',
    filename:
      'web/public/images/house/indoor-outdoor/1FDE1119-111D-417D-93A8-60CE26137A23_1_105_c.jpeg',
  },
  evening: {
    alt: 'Lit bedroom and covered deck beside a pool reflecting trees and an evening sky.',
    filename:
      'web/public/images/house/daily-rhythm/evening/B20B565B-9359-4FBD-BAA0-9647E963AD2D_1_105_c.jpeg',
  },
  hero: {
    alt: 'Pool beside a roofed terrace, surrounded by trees and vegetation beneath a blue sky.',
    filename: 'web/public/images/house/hero/4F003BED-1A9C-412A-9137-BEE683305BF5_1_105_c.jpeg',
  },
  morning: {
    alt: 'Covered deck with seating beside two bedrooms and sliding glass doors.',
    filename:
      'web/public/images/house/daily-rhythm/morning/D2C7104D-837A-4FD1-8866-3B129B51EADB_1_105_c.jpeg',
  },
  poolRelationship: {
    alt: 'Pool between decks and rooms, with outdoor seating in the foreground.',
    filename:
      'web/public/images/house/indoor-outdoor/5D6C1A69-C229-4E90-AB87-0D6BC31B18EF_1_105_c.jpeg',
  },
  rain: {
    alt: 'Covered timber deck and pool at night beneath a roof with open sides.',
    filename:
      'web/public/images/house/daily-rhythm/rain/C563E734-F8F4-4F04-BD10-E649613674E4_4_5005_c.jpeg',
  },
  sharedHeart: {
    alt: 'Open kitchen, dining table, and living area arranged in one shared room.',
    filename:
      'web/public/images/house/shared-heart/AE351CE6-C211-44AA-A596-67573955A50D_1_105_c.jpeg',
  },
  threshold: {
    alt: 'Living room opening onto a deck with a pool and trees beyond.',
    filename:
      'web/public/images/house/indoor-outdoor/EC3207AF-79BF-4DC1-AB4E-1B9E0682848E_1_105_c.jpeg',
  },
  view: {
    alt: 'Bedroom opening to a covered deck with trees and distant landscape beyond.',
    filename: 'web/public/images/house/view/1BB34E83-3CE5-45A0-B1BD-28FF9CB0E861_1_105_c.jpeg',
  },
}

const developmentCredit =
  'Development photography — not production approved — replace before launch'

function imageValue(assetId, {alt, development = false} = {}) {
  return {
    _type: 'editorialImage',
    alt,
    asset: {_type: 'reference', _ref: assetId},
    decorative: !alt,
    ...(development ? {credit: developmentCredit} : {}),
  }
}

function getContentType(filename) {
  if (filename.endsWith('.png')) return 'image/png'
  if (filename.endsWith('.jpeg') || filename.endsWith('.jpg')) return 'image/jpeg'
  throw new Error(`Unsupported image format: ${filename}`)
}

async function sourceAsset(filename) {
  const absolutePath = path.join(projectRoot, filename)
  const buffer = await readFile(absolutePath)
  if (buffer.length === 0) throw new Error(`Source asset is empty: ${filename}`)
  return {
    buffer,
    contentType: getContentType(filename),
    filename,
    originalFilename: path.basename(filename),
    sha1hash: createHash('sha1').update(buffer).digest('hex'),
  }
}

async function ensureAsset(client, definition) {
  const source = await sourceAsset(definition.filename)
  const existing = await client.fetch(
    '*[_type == "sanity.imageAsset" && sha1hash == $sha1hash][0]{_id}',
    {sha1hash: source.sha1hash},
  )

  if (existing?._id) return {...definition, assetId: existing._id, status: 'reused'}
  if (!applyChanges) return {...definition, assetId: undefined, status: 'upload required'}

  const uploaded = await client.assets.upload('image', source.buffer, {
    contentType: source.contentType,
    filename: source.originalFilename,
    source: {
      id: source.filename,
      name: definition.development
        ? "Joshua's Point development photography"
        : "Joshua's Point approved brand package",
    },
  })
  return {...definition, assetId: uploaded._id, status: 'uploaded'}
}

function buildSiteSettings(current, brandImageValues) {
  const socialLinks = [
    {
      _key: 'facebook',
      _type: 'socialLink',
      platform: 'facebook',
      url: 'https://www.facebook.com/joshuaspoint/',
    },
    {
      _key: 'instagram',
      _type: 'socialLink',
      platform: 'instagram',
      url: 'https://www.instagram.com/joshuaspoint/',
    },
  ]
  const primaryNavigation = [
    routeLink('Home', '/'),
    routeLink('The House', '/the-house'),
    routeLink('Rooms', '/rooms'),
    routeLink('Plan Your Stay', '/plan-your-stay'),
    routeLink('Destinations', '/destinations'),
    routeLink('Explorer Map', '/explorer'),
    routeLink('Scenic Routes', '/scenic-routes'),
    routeLink('Southern Negros Explorer', '/guide'),
    routeLink('Dive Guide', '/dive-sites'),
    routeLink('Getting Here', '/getting-here'),
    routeLink('FAQ', '/faq'),
    routeLink('Contact', '/contact'),
  ]

  return {
    siteTitle: "Joshua's Point",
    siteUrl: 'https://joshuaspoint.com',
    siteDescription:
      'A home connected to nature, and a quiet place from which to discover Southern Negros.',
    defaultLocale: 'en',
    defaultSeo: {
      _type: 'seo',
      metaTitle: "Joshua's Point | A Home Connected to Nature",
      metaDescription:
        'Joshua’s Point is a home connected to nature in Southern Negros, shaped by shared spaces, sea, mountain, and the changing day.',
      noIndex: false,
    },
    contactDetails: {
      _type: 'contactDetails',
      email: 'mail@joshuaspoint.com',
      address: {
        _type: 'postalAddress',
        locality: 'Calango, Zamboanguita',
        region: 'Negros Oriental',
        postalCode: '6218',
        country: 'Philippines',
      },
    },
    propertyLocation: {
      ...(current?.propertyLocation ?? {}),
      _type: 'mapLocation',
      label: "Joshua's Point, Calango, Zamboanguita 6218, Negros Oriental, Philippines",
    },
    primaryNavigation,
    footer: {
      _type: 'footer',
      introduction: 'A quiet place from which to discover Southern Negros.',
      navigationGroups: [
        {
          _key: 'stay',
          _type: 'navigationGroup',
          title: 'Stay',
          items: [
            routeLink('The House', '/the-house'),
            routeLink('Rooms', '/rooms'),
            routeLink('Plan Your Stay', '/plan-your-stay'),
          ],
        },
        {
          _key: 'explore',
          _type: 'navigationGroup',
          title: 'Explore',
          items: [
            routeLink('Explorer Map', '/explorer'),
            routeLink('Destinations', '/destinations'),
            routeLink('Scenic Routes', '/scenic-routes'),
            routeLink('Dive Guide', '/dive-sites'),
          ],
        },
        {
          _key: 'guides',
          _type: 'navigationGroup',
          title: 'Guides',
          items: [
            routeLink('Southern Negros Explorer', '/guide'),
            routeLink('Dive Guide', '/dive-sites'),
          ],
        },
      ],
      socialLinks,
      legalLinks: [routeLink('Privacy', '/privacy'), routeLink('Terms', '/terms')],
      copyrightText: "Joshua's Point",
    },
    bookingLinks: {
      _type: 'bookingLinks',
      enabled: false,
      inquiry: {
        _type: 'link',
        kind: 'route',
        label: 'Contact',
        internalRoute: '/contact',
      },
    },
    ...brandImageValues,
  }
}

function buildHouseDraft(images) {
  return {
    _id: 'drafts.housePage',
    _type: 'housePage',
    internalTitle: 'The House',
    workflowStatus: 'draft',
    hero: {
      _type: 'houseHero',
      eyebrow: 'The House',
      title: 'The House',
      introduction:
        'A home shaped by shared space, changing weather, and a close relationship with the landscape.',
      image: images.hero,
    },
    openingReflection: {
      _type: 'houseOpeningReflection',
      heading: 'A place that feels like home.',
      body: 'The deck, view, and infinity pool are what people notice first. Beyond that first reaction, the house settles into the landscape and the quiet around it.',
    },
    sharedHeart: {
      _type: 'houseSharedHeart',
      heading: 'The heart of the house is lived together.',
      body: 'The kitchen, dining area, living room, and deck work as one connected space. People naturally gather here to cook, eat, sit, talk, practise yoga, and relax.',
      images: [{...images.sharedHeart, _key: 'shared-heart'}],
    },
    view: {
      _type: 'houseView',
      image: images.view,
      verificationNotes:
        'Temporary development placeholder for layout review. This is not the required uninterrupted View photograph and must not receive a factual landmark caption.',
    },
    indoorOutdoorStory: {
      _type: 'houseIndoorOutdoorStory',
      heading: 'The threshold is part of daily life.',
      body: 'The three-meter covered deck creates a semi-outdoor living space beside the connected rooms. Sliding doors, the roof, deck, and pool keep daily life in relationship with the landscape and view.',
      images: [
        {
          _key: 'open-threshold',
          _type: 'houseStoryImage',
          role: 'threshold',
          image: images.threshold,
        },
        {
          _key: 'deck-and-shelter',
          _type: 'houseStoryImage',
          role: 'deckShelter',
          image: images.deckShelter,
        },
        {
          _key: 'pool-relationship',
          _type: 'houseStoryImage',
          role: 'poolRelationship',
          image: images.poolRelationship,
        },
      ],
    },
    dailyRhythms: {
      _type: 'houseDailyRhythms',
      morning: {
        _type: 'houseDailyRhythmMoment',
        body: 'Morning can begin with coffee on the deck, birds, and a view toward sea or mountain.',
        image: images.morning,
      },
      rain: {
        _type: 'houseDailyRhythmMoment',
        body: 'Rain brings the sound of water and bamboo moving in the wind.',
        image: images.rain,
      },
      evening: {
        _type: 'houseDailyRhythmMoment',
        body: 'In the evening, warm air moves across the deck while lights appear on distant islands and around the house.',
        image: images.evening,
      },
    },
    closingReflection: {
      _type: 'houseClosingReflection',
      body: 'The corner of the deck remains a quiet place within the shared life of the house, close to birds in the morning, wind through bamboo, and rain when it comes.',
    },
    seo: {
      _type: 'seo',
      metaTitle: "The House | Joshua's Point",
      metaDescription:
        'An editorial introduction to Joshua’s Point through nature, shared spaces, and the changing day.',
      noIndex: false,
    },
  }
}

async function main() {
  const projectId = requiredEnvironmentVariable('SANITY_PROJECT_ID')
  const dataset = requiredEnvironmentVariable('SANITY_DATASET')
  const token = process.env.SANITY_TOKEN?.trim()
  const client = getCliClient({
    apiVersion,
    dataset,
    perspective: 'raw',
    projectId,
    useCdn: false,
    ...(token ? {token} : {}),
  })

  const settingsDocuments = await client.fetch(
    '*[_id in ["siteSettings", "drafts.siteSettings"] && _type == "siteSettings"]{_id, propertyLocation}',
  )
  const currentSettings = settingsDocuments.find(({_id}) => _id === 'siteSettings')
  const currentSettingsDraft = settingsDocuments.find(({_id}) => _id === 'drafts.siteSettings')
  if (!currentSettings?._id) {
    throw new Error('Published siteSettings must exist before this controlled migration runs.')
  }

  const brandPlans = await Promise.all(
    brandAssets.map((definition) =>
      ensureAsset(client, {
        development: false,
        filename: `web/public/brand/${definition.filename}`,
        field: definition.field,
      }),
    ),
  )
  const housePlans = await Promise.all(
    Object.entries(houseAssets).map(([role, definition]) =>
      ensureAsset(client, {development: true, role, ...definition}),
    ),
  )

  log(`Sanity target: ${projectId}/${dataset}`)
  log(`Mode: ${applyChanges ? 'APPLY' : 'DRY RUN'}`)
  log('Site Settings brand assets:')
  brandPlans.forEach((plan) =>
    log(`- ${plan.field}: ${path.basename(plan.filename)} — ${plan.status}`),
  )
  log('House development photography:')
  housePlans.forEach((plan) =>
    log(`- ${plan.role}: ${path.basename(plan.filename)} — ${plan.status}`),
  )

  if (!applyChanges) {
    log('\nDry run complete. No assets or documents were changed.')
    return
  }

  const brandImageValues = Object.fromEntries(
    brandPlans.map((plan) => [plan.field, imageValue(plan.assetId)]),
  )
  const houseImageValues = Object.fromEntries(
    housePlans.map((plan) => [
      plan.role,
      imageValue(plan.assetId, {alt: plan.alt, development: true}),
    ]),
  )
  const settingsPatch = buildSiteSettings(currentSettings, brandImageValues)
  const settingsDraftPatch = currentSettingsDraft
    ? buildSiteSettings(currentSettingsDraft, brandImageValues)
    : undefined
  const houseDraft = buildHouseDraft(houseImageValues)

  const transaction = client
    .transaction()
    .patch('siteSettings', (patch) => patch.set(settingsPatch))
  if (settingsDraftPatch) {
    transaction.patch('drafts.siteSettings', (patch) => patch.set(settingsDraftPatch))
  }
  await transaction.createOrReplace(houseDraft).commit()

  const verification = await client.fetch(
    '{"settings": *[_id == "siteSettings"][0]{_id,siteTitle,siteUrl,siteDescription,contactDetails,propertyLocation,primaryNavigation,footer,bookingLinks,defaultSeo,primaryLogo,compactLogo,squareProfileImage,faviconImage,appIconImage}, "settingsDraft": *[_id == "drafts.siteSettings"][0]{_id,siteTitle,primaryNavigation,defaultSeo,primaryLogo,compactLogo,squareProfileImage,faviconImage,appIconImage}, "houseDraft": *[_id == "drafts.housePage"][0]{_id,_type,workflowStatus,hero,openingReflection,sharedHeart,view,indoorOutdoorStory,dailyRhythms,materialsAndArchitecture,closingReflection,seo}, "publishedHouse": *[_id == "housePage"][0]{_id}}',
  )

  if (!verification.settings?._id) throw new Error('Site Settings verification failed.')
  if (currentSettingsDraft && verification.settingsDraft?.primaryNavigation?.length !== 12) {
    throw new Error('Existing Site Settings draft verification failed.')
  }
  if (verification.houseDraft?.workflowStatus !== 'draft') {
    throw new Error('House draft verification failed or workflow status changed.')
  }
  if (verification.publishedHouse?._id) {
    throw new Error(
      'Safety check failed: a published housePage exists after a draft-only migration.',
    )
  }
  if (verification.houseDraft.materialsAndArchitecture) {
    throw new Error('Safety check failed: unapproved Materials content entered the House draft.')
  }

  log('\nMigration complete and verified.')
  log('- Site Settings updated with approved fields and brand assets.')
  log('- drafts.housePage created with workflowStatus=draft.')
  log('- housePage remains unpublished.')
  log('- Materials remains absent.')
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
  process.exitCode = 1
})
