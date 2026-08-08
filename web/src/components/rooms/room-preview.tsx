import Link from 'next/link'

import {
  EditorialGrid,
  EditorialMedia,
  EditorialText,
  type EditorialImage,
  type EditorialMediaTone,
} from '@/components/editorial'

export type RoomPreviewData = {
  capacity: string
  description: string
  href: string
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
        <EditorialMedia
          className={mediaClasses[layout]}
          image={room.image}
          ratio="landscape"
          sizes="(min-width: 1024px) 58vw, 100vw"
          tone={room.tone}
        />

        <div className={contentClasses[layout]}>
          <EditorialText as="h3" headingSize="small" id={headingId} variant="heading">
            {room.name}
          </EditorialText>
          <EditorialText className="mt-7 max-w-md" variant="body">
            {room.description}
          </EditorialText>

          <div className="mt-9 flex flex-wrap items-baseline justify-between gap-6">
            <dl>
              <dt className="sr-only">Capacity</dt>
              <dd>
                <EditorialText as="span" variant="caption">
                  {room.capacity}
                </EditorialText>
              </dd>
            </dl>
            <Link
              className="rounded-sm font-body text-xs font-semibold tracking-[0.04em] text-charcoal underline decoration-charcoal/30 underline-offset-8 hover:decoration-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
              href={room.href}
            >
              View Room
            </Link>
          </div>
        </div>
      </EditorialGrid>
    </article>
  )
}
