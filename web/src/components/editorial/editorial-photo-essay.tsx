import type {ReactNode} from 'react'

import {
  EditorialFigure,
  type EditorialFigureCaptionAlignment,
  type EditorialFigureMedia,
} from '@/components/editorial/editorial-figure'
import {EditorialGrid} from '@/components/editorial/editorial-grid'
import type {EditorialTextTone} from '@/components/editorial/editorial-text'

export type EditorialPhotoEssayItem = {
  caption?: ReactNode
  captionAlignment?: EditorialFigureCaptionAlignment
  captionTone?: EditorialTextTone
  id: string
  media: EditorialFigureMedia
}

export type EditorialPhotoEssayItems =
  | readonly [EditorialPhotoEssayItem]
  | readonly [EditorialPhotoEssayItem, EditorialPhotoEssayItem]
  | readonly [EditorialPhotoEssayItem, EditorialPhotoEssayItem, EditorialPhotoEssayItem]

export type EditorialPhotoEssayLayout = 'sequence' | 'staggered'

type EditorialPhotoEssayProps = {
  className?: string
  items: EditorialPhotoEssayItems
  layout?: EditorialPhotoEssayLayout
}

const layoutClasses: Record<
  EditorialPhotoEssayLayout,
  Record<
    1 | 2 | 3,
    readonly [string] | readonly [string, string] | readonly [string, string, string]
  >
> = {
  staggered: {
    1: ['lg:col-span-8 lg:col-start-3'],
    2: ['lg:col-span-7', 'lg:col-span-4 lg:col-start-9 lg:mt-36'],
    3: [
      'lg:col-span-7',
      'lg:col-span-4 lg:col-start-9 lg:mt-36',
      'lg:col-span-8 lg:col-start-3 lg:mt-20',
    ],
  },
  sequence: {
    1: ['lg:col-span-10 lg:col-start-2'],
    2: ['lg:col-span-10', 'lg:col-span-7 lg:col-start-5 lg:mt-20'],
    3: [
      'lg:col-span-10',
      'lg:col-span-5 lg:col-start-2 lg:mt-20',
      'lg:col-span-5 lg:col-start-8 lg:mt-40',
    ],
  },
}

export function EditorialPhotoEssay({
  className = '',
  items,
  layout = 'staggered',
}: EditorialPhotoEssayProps) {
  const count = items.length as 1 | 2 | 3
  const itemClasses = layoutClasses[layout][count]

  return (
    <EditorialGrid className={className} gap="generous">
      {items.map((item, index) => (
        <EditorialFigure
          caption={item.caption}
          captionAlignment={item.captionAlignment}
          captionTone={item.captionTone}
          className={itemClasses[index]}
          key={item.id}
          media={item.media}
          motionDelay={index === 0 ? 'none' : index === 1 ? 'short' : 'medium'}
        />
      ))}
    </EditorialGrid>
  )
}
