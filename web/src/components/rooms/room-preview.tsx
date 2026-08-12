import {EditorialAmenityList, type EditorialAmenityIcon} from '@/components/amenities'
import {
  EditorialGrid,
  EditorialMedia,
  EditorialText,
  type EditorialImage,
  type EditorialMediaTone,
} from '@/components/editorial'
import {MotionReveal} from '@/components/motion'

export type RoomPreviewData = {
  description: string
  facts: readonly {
    icon?: EditorialAmenityIcon
    label: string
    value: string
  }[]
  id: string
  image?: EditorialImage
  name: string
  tone?: EditorialMediaTone
}

type RoomPreviewProps = {
  layout?: 'image-left' | 'image-right'
  room: RoomPreviewData
}

const mediaClasses: Record<NonNullable<RoomPreviewProps['layout']>, string> = {
  'image-left': 'lg:col-span-7 lg:row-start-1',
  'image-right': 'lg:col-span-7 lg:col-start-6 lg:row-start-1',
}

const contentClasses: Record<NonNullable<RoomPreviewProps['layout']>, string> = {
  'image-left': 'lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:self-end lg:pb-8',
  'image-right': 'lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:self-center',
}

export function RoomPreview({layout = 'image-left', room}: RoomPreviewProps) {
  const headingId = `${room.id}-title`

  return (
    <article aria-labelledby={headingId}>
      <EditorialGrid gap="generous">
        <MotionReveal className={mediaClasses[layout]}>
          <EditorialMedia
            image={room.image}
            ratio="landscape"
            sizes="(min-width: 1024px) 58vw, 100vw"
            tone={room.tone}
          />
        </MotionReveal>

        <MotionReveal
          className={contentClasses[layout]}
          delay="short"
          direction={layout === 'image-left' ? 'left' : 'right'}
        >
          <EditorialText as="h3" headingSize="small" id={headingId} variant="heading">
            {room.name}
          </EditorialText>
          <EditorialText className="mt-7 max-w-md" variant="body">
            {room.description}
          </EditorialText>

          <EditorialAmenityList
            className="mt-9"
            items={room.facts.map(({icon, label, value}) => ({
              description: value,
              icon,
              title: label,
            }))}
          />
        </MotionReveal>
      </EditorialGrid>
    </article>
  )
}
