import type {
  EditorialFigureMedia,
  EditorialPhotoEssayItem,
  EditorialPhotoEssayItems,
} from '@/components/editorial'
import type {HouseMaterialStory} from '@/components/house'
import type {HousePageData} from '@/app/the-house/house-page-data'

import {getEditorialImage} from '../image'
import type {
  SanityHouseDailyRhythmMoment,
  SanityHousePageData,
  SanityHouseStoryImage,
  SanityImage,
} from '../types'

type MediaPresentation = Omit<EditorialFigureMedia, 'image'> & {
  height: number
  width: number
}

type HouseStoryRole = NonNullable<SanityHouseStoryImage['role']>

const indoorOutdoorPresentation: Record<HouseStoryRole, MediaPresentation> = {
  deckShelter: {
    height: 1200,
    ratio: 'landscape',
    sizes: '(min-width: 1024px) 33vw, 100vw',
    tone: 'morning',
    width: 1800,
  },
  poolRelationship: {
    height: 1200,
    ratio: 'landscape',
    sizes: '(min-width: 1024px) 67vw, 100vw',
    tone: 'stone',
    width: 1800,
  },
  threshold: {
    height: 1200,
    ratio: 'landscape',
    sizes: '(min-width: 1024px) 58vw, 100vw',
    tone: 'stone',
    width: 1800,
  },
}

const dailyRhythmPresentation = {
  evening: {
    height: 1200,
    ratio: 'landscape',
    sizes: '(min-width: 1024px) 42vw, 100vw',
    tone: 'morning',
    width: 1800,
  },
  morning: {
    height: 1200,
    ratio: 'landscape',
    sizes: '(min-width: 1024px) 83vw, 100vw',
    tone: 'morning',
    width: 1800,
  },
  rain: {
    height: 1500,
    ratio: 'portrait',
    sizes: '(min-width: 1024px) 42vw, 100vw',
    tone: 'stone',
    width: 1200,
  },
} satisfies Record<'evening' | 'morning' | 'rain', MediaPresentation>

const housePresentationText = {
  dailyRhythms: {
    body: 'Morning can begin with coffee on the deck, birds, and a view toward sea or mountain. Rain brings the sound of water and bamboo moving in the wind. In the evening, warm air moves across the deck while lights appear on distant islands and around the house.',
    eyebrow: 'The house through the day',
    heading: 'Light and weather change the rooms.',
  },
  indoorOutdoorEyebrow: 'Between inside and outside',
  materialsEyebrow: 'Materials and architecture',
  openingEyebrow: 'Opening reflection',
  sharedLivingEyebrow: 'Shared spaces',
  view: {
    body: 'From the house, the view reaches the Bohol Sea, Apo Island, Siquijor Island, and Mount Talinis.',
    eyebrow: 'The view',
    heading: 'The view is always present.',
  },
} as const

function cleanText(value: string | null | undefined) {
  const cleaned = value?.trim()
  return cleaned || undefined
}

function mapMedia(
  image: SanityImage | null | undefined,
  {height, width, ...presentation}: MediaPresentation,
): EditorialFigureMedia | undefined {
  const editorialImage = getEditorialImage(image, {height, width})
  if (!editorialImage) return undefined
  return {...presentation, image: editorialImage}
}

function asPhotoEssayItems(items: EditorialPhotoEssayItem[]): EditorialPhotoEssayItems | undefined {
  if (items.length === 1) return [items[0]]
  if (items.length === 2) return [items[0], items[1]]
  if (items.length >= 3) return [items[0], items[1], items[2]]
  return undefined
}

function isHouseStoryRole(role: SanityHouseStoryImage['role']): role is HouseStoryRole {
  return Boolean(role && role in indoorOutdoorPresentation)
}

function mapIndoorOutdoorItems(images: Array<SanityHouseStoryImage | null> | null | undefined) {
  const items = (images ?? []).flatMap<EditorialPhotoEssayItem>((item) => {
    const role = item?.role
    if (!item || !isHouseStoryRole(role)) return []
    const media = mapMedia(item.image, indoorOutdoorPresentation[role])
    if (!media) return []

    return [
      {
        caption: cleanText(item.image?.caption),
        id: item._key || role,
        media,
      },
    ]
  })

  return asPhotoEssayItems(items)
}

function mapDailyRhythmItem(
  id: 'evening' | 'morning' | 'rain',
  moment: SanityHouseDailyRhythmMoment | null | undefined,
): EditorialPhotoEssayItem | undefined {
  if (!cleanText(moment?.body)) return undefined
  const media = mapMedia(moment?.image, dailyRhythmPresentation[id])
  if (!media) return undefined

  return {
    caption: cleanText(moment?.body),
    id,
    media,
  }
}

function mapDailyRhythmItems(page: SanityHousePageData) {
  const items = (
    [
      mapDailyRhythmItem('morning', page.dailyRhythms?.morning),
      mapDailyRhythmItem('rain', page.dailyRhythms?.rain),
      mapDailyRhythmItem('evening', page.dailyRhythms?.evening),
    ] satisfies Array<EditorialPhotoEssayItem | undefined>
  ).filter((item): item is EditorialPhotoEssayItem => Boolean(item))

  return asPhotoEssayItems(items)
}

function mapMaterialItems(page: SanityHousePageData): HouseMaterialStory[] | undefined {
  const materials = (page.materialsAndArchitecture?.materials ?? []).flatMap<HouseMaterialStory>(
    (material) => {
      if (!material) return []
      const name = cleanText(material.name)
      const description = cleanText(material.description)
      if (!name || !description) return []

      return [
        {
          description,
          id: material._key || name.toLocaleLowerCase().replaceAll(/[^a-z0-9]+/g, '-'),
          name,
          verificationStatus: 'confirmed',
        },
      ]
    },
  )

  return materials?.length ? materials : undefined
}

/** Maps published public House content into the existing presentation contract. */
export function mapSanityHousePage(page: SanityHousePageData): HousePageData | null {
  const heroEyebrow = cleanText(page.hero?.eyebrow)
  const heroIntroduction = cleanText(page.hero?.introduction)
  const heroTitle = cleanText(page.hero?.title)
  const heroMedia = mapMedia(page.hero?.image, {
    height: 1350,
    preload: true,
    ratio: 'panoramic',
    sizes: '100vw',
    tone: 'morning',
    width: 2400,
  })
  const openingHeading = cleanText(page.openingReflection?.heading)
  const openingBody = cleanText(page.openingReflection?.body)
  const sharedHeading = cleanText(page.sharedHeart?.heading)
  const sharedBody = cleanText(page.sharedHeart?.body)
  const sharedImage = page.sharedHeart?.images?.find((image) => image?.asset?._ref) ?? undefined
  const sharedMedia = mapMedia(sharedImage, {
    height: 1200,
    ratio: 'landscape',
    sizes: '(min-width: 1024px) 58vw, 100vw',
    tone: 'stone',
    width: 1800,
  })
  const indoorHeading = cleanText(page.indoorOutdoorStory?.heading)
  const indoorBody = cleanText(page.indoorOutdoorStory?.body)
  const closingBody = cleanText(page.closingReflection?.body)
  const viewMedia = mapMedia(page.view?.image, {
    height: 1350,
    ratio: 'panoramic',
    sizes: '100vw',
    tone: 'morning',
    width: 2400,
  })
  const indoorOutdoorItems = mapIndoorOutdoorItems(page.indoorOutdoorStory?.images)

  if (
    !heroEyebrow ||
    !heroIntroduction ||
    !heroTitle ||
    !heroMedia ||
    !openingHeading ||
    !openingBody ||
    !sharedHeading ||
    !sharedBody ||
    !sharedMedia ||
    !indoorHeading ||
    !indoorBody ||
    !indoorOutdoorItems ||
    !viewMedia ||
    !closingBody
  ) {
    return null
  }

  const dailyRhythmItems = mapDailyRhythmItems(page)
  const materialItems = mapMaterialItems(page)
  const materialsHeading = cleanText(page.materialsAndArchitecture?.heading)

  return {
    dailyRhythms: dailyRhythmItems
      ? {...housePresentationText.dailyRhythms, items: dailyRhythmItems}
      : undefined,
    finalReflection: {
      body: closingBody,
    },
    hero: {
      eyebrow: heroEyebrow,
      introduction: heroIntroduction,
      media: heroMedia,
      title: heroTitle,
    },
    indoorOutdoor: {
      body: indoorBody,
      eyebrow: housePresentationText.indoorOutdoorEyebrow,
      heading: indoorHeading,
      items: indoorOutdoorItems,
    },
    materials:
      materialItems && materialsHeading
        ? {
            body: cleanText(page.materialsAndArchitecture?.body),
            eyebrow: housePresentationText.materialsEyebrow,
            heading: materialsHeading,
            items: materialItems,
          }
        : undefined,
    openingReflection: {
      body: openingBody,
      eyebrow: housePresentationText.openingEyebrow,
      heading: openingHeading,
    },
    sharedLiving: {
      body: sharedBody,
      caption: cleanText(sharedImage?.caption),
      eyebrow: housePresentationText.sharedLivingEyebrow,
      heading: sharedHeading,
      media: sharedMedia,
    },
    view: {
      ...housePresentationText.view,
      caption: cleanText(page.view?.caption) ?? cleanText(page.view?.image?.caption),
      media: viewMedia,
    },
  }
}
