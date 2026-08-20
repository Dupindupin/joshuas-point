import type {MasonryGalleryData, MasonryGalleryImage} from '@/components/editorial'
import {getPublicEditorialCopy, isInternalEditorialCopy} from '@/lib/editorial/public-copy'

import {getEditorialImage} from './image'
import type {SanityGallery} from './types'

export function mapSanityGallery(
  gallery: SanityGallery | null | undefined,
): MasonryGalleryData | null {
  if (!gallery) return null

  const accessibleLabel = gallery.accessibleLabel?.trim()
  if (!accessibleLabel) return null

  const images = (gallery.images ?? [])
    .map((source, index): MasonryGalleryImage | null => {
      if (!source?.asset?._ref) return null
      if (isInternalEditorialCopy(source.credit)) return null

      const orientation =
        typeof source.dimensions?.aspectRatio === 'number' && source.dimensions.aspectRatio < 0.9
          ? 'portrait'
          : 'landscape'
      const image = getEditorialImage(
        source,
        orientation === 'portrait' ? {height: 2000, width: 1600} : {height: 1500, width: 2250},
      )
      if (!image) return null

      return {
        caption: getPublicEditorialCopy(source.caption),
        credit: getPublicEditorialCopy(source.credit),
        creditUrl: source.creditUrl?.trim() || undefined,
        id: `${source.asset._ref}-${index}`,
        image,
        orientation,
      }
    })
    .filter((item): item is MasonryGalleryImage => Boolean(item))

  if (images.length < 2) return null

  return {
    accessibleLabel,
    caption: gallery.caption?.trim() || undefined,
    images,
  }
}
