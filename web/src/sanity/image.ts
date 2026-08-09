import {createImageUrlBuilder} from '@sanity/image-url'

import type {EditorialImage} from '@/components/editorial'

import {sanityConfig} from './config'
import type {SanityImage} from './types'

const imageBuilder = createImageUrlBuilder(sanityConfig)

type EditorialImageOptions = {
  height: number
  width: number
}

export function getEditorialImage(
  image: SanityImage | null | undefined,
  {height, width}: EditorialImageOptions,
): EditorialImage | undefined {
  if (!image?.asset?._ref) return undefined

  const alt = image.decorative ? '' : image.alt?.trim()
  if (alt === undefined) return undefined

  return {
    alt,
    blurDataURL: image.lqip,
    src: imageBuilder.image(image).width(width).height(height).fit('crop').auto('format').url(),
  }
}
