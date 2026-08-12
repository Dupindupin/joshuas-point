import Link from 'next/link'

import {
  EditorialGrid,
  EditorialMedia,
  EditorialText,
  type EditorialImage,
} from '@/components/editorial'
import {MotionReveal} from '@/components/motion'

export type FeaturedDestinationData = {
  href?: string
  id: string
  image?: EditorialImage
  introduction: string
  title: string
}

type FeaturedDestinationProps = {
  destination: FeaturedDestinationData
}

export function FeaturedDestination({destination}: FeaturedDestinationProps) {
  const headingId = `${destination.id}-title`
  const content = (
    <EditorialGrid gap="generous">
      <EditorialMedia
        className="lg:col-span-8"
        image={destination.image}
        ratio="landscape"
        sizes="(min-width: 1024px) 66vw, 100vw"
        tone="stone"
      />
      <div className="lg:col-span-4 lg:self-end lg:pb-8">
        <EditorialText
          as="h3"
          className={
            destination.href
              ? 'decoration-ink/35 underline-offset-8 group-hover:underline'
              : undefined
          }
          headingSize="small"
          id={headingId}
          variant="heading"
        >
          {destination.title}
        </EditorialText>
        <EditorialText className="mt-7 max-w-md" variant="body">
          {destination.introduction}
        </EditorialText>
      </div>
    </EditorialGrid>
  )

  return (
    <MotionReveal as="article" aria-labelledby={headingId}>
      {destination.href ? (
        <Link
          className="group block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-focus"
          href={destination.href}
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </MotionReveal>
  )
}
