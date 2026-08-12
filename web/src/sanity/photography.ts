import type {EditorialPhotoStoryData, EditorialPhotoStoryPhase} from '@/components/editorial'

import {getEditorialImage} from './image'
import type {SanityEditorialPhotography, SanityImage} from './types'

function mapImages(
  images: Array<SanityImage | null> | null | undefined,
  phase: EditorialPhotoStoryPhase,
  idPrefix: string,
) {
  return (images ?? []).flatMap((source, index) => {
    if (!source?.asset?._ref) return []
    const image = getEditorialImage(source, {height: 1600, width: 2400})
    if (!image) return []

    return [
      {
        caption: source.caption?.trim() || undefined,
        credit: source.credit?.trim() || undefined,
        creditUrl: source.creditUrl?.trim() || undefined,
        id: `${idPrefix}-${index}`,
        image,
        phase,
      },
    ]
  })
}

export function mapEditorialPhotoStories(
  photography?: SanityEditorialPhotography | null,
): EditorialPhotoStoryData[] {
  return (photography?.stories ?? []).flatMap((story, storyIndex) => {
    if (!story?.title?.trim() || !story.accessibleLabel?.trim()) return []

    const heroFrames = story.heroImage?.asset?._ref
      ? mapImages([story.heroImage], 'opening', `${storyIndex}-hero`)
      : []
    const frames = [
      ...heroFrames,
      ...mapImages(story.openingImages, 'opening', `${storyIndex}-opening`),
      ...mapImages(story.journeyImages, 'journey', `${storyIndex}-journey`),
      ...mapImages(story.detailImages, 'detail', `${storyIndex}-detail`),
      ...mapImages(story.closingImages, 'closing', `${storyIndex}-closing`),
    ]

    // A single photograph is not an editorial sequence. Incomplete stories stay in Studio.
    if (frames.length < 2) return []

    return [
      {
        accessibleLabel: story.accessibleLabel,
        frames,
        id: story._key || `photo-story-${storyIndex}`,
        introduction: story.introduction?.trim() || undefined,
        title: story.title,
      },
    ]
  })
}
