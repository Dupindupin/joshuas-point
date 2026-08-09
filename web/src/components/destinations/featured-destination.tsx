import {
  EditorialGrid,
  EditorialMedia,
  EditorialText,
  type EditorialImage,
} from '@/components/editorial'

export type FeaturedDestinationData = {
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

  return (
    <article aria-labelledby={headingId}>
      <EditorialGrid gap="generous">
        <EditorialMedia
          className="lg:col-span-8"
          image={destination.image}
          ratio="landscape"
          sizes="(min-width: 1024px) 66vw, 100vw"
          tone="stone"
        />
        <div className="lg:col-span-4 lg:self-end lg:pb-8">
          <EditorialText as="h3" headingSize="small" id={headingId} variant="heading">
            {destination.title}
          </EditorialText>
          <EditorialText className="mt-7 max-w-md" variant="body">
            {destination.introduction}
          </EditorialText>
        </div>
      </EditorialGrid>
    </article>
  )
}
