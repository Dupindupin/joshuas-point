import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {
  DestinationPhotography,
  type DestinationPhotograph,
} from '@/components/destinations/destination-photography'
import {DestinationTravelInformation} from '@/components/destinations/destination-travel-information'
import {
  EditorialContainer,
  EditorialGrid,
  EditorialPageHero,
  EditorialPortableText,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {DestinationMap} from '@/components/maps'
import {NearbyDiveSites, RelatedJournalArticles, RelatedPlaces} from '@/components/relationships'
import {SiteHeader} from '@/components/site/site-header'
import {getEditorialImage} from '@/sanity/image'
import {getDestinationBySlug, getDestinationSlugs} from '@/sanity/queries/destinations'
import {getDestinationRelationships} from '@/sanity/relationships'
import type {SanityImage} from '@/sanity/types'

type DestinationPageProps = {
  params: Promise<{slug: string}>
}

const destinationTypeLabels: Record<string, string> = {
  beach: 'Beach',
  coffee: 'Coffee',
  culture: 'Culture',
  island: 'Island',
  lake: 'Lake',
  nature: 'Nature',
  restaurant: 'Restaurant',
  town: 'Town',
  viewpoint: 'Viewpoint',
  waterfall: 'Waterfall',
}

function getDestinationPhotograph(
  image: SanityImage | undefined,
  id: string,
  dimensions: {height: number; width: number},
): DestinationPhotograph | undefined {
  const editorialImage = getEditorialImage(image, dimensions)
  if (!editorialImage) return undefined

  return {
    caption: image?.caption?.trim() || undefined,
    credit: image?.credit?.trim() || undefined,
    creditUrl: image?.creditUrl,
    id,
    image: editorialImage,
  }
}

export async function generateStaticParams() {
  const slugs = await getDestinationSlugs()
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: DestinationPageProps): Promise<Metadata> {
  const {slug} = await params
  const destination = await getDestinationBySlug(slug)

  if (!destination) {
    return {
      title: "Destination not found | Joshua's Point",
      robots: {follow: false, index: false},
    }
  }

  const socialImage = getEditorialImage(destination.seo?.socialImage ?? destination.heroImage, {
    height: 630,
    width: 1200,
  })
  const title = destination.seo?.metaTitle || `${destination.title} | Joshua's Point`
  const description =
    destination.seo?.metaDescription || destination.excerpt || destination.editorialIntroduction

  return {
    alternates: destination.seo?.canonicalUrl
      ? {canonical: destination.seo.canonicalUrl}
      : undefined,
    description,
    openGraph: {
      description: destination.seo?.socialDescription || description,
      images: socialImage ? [{alt: socialImage.alt, url: String(socialImage.src)}] : undefined,
      title: destination.seo?.socialTitle || title,
      type: 'article',
    },
    robots: destination.seo?.noIndex ? {follow: false, index: false} : undefined,
    title,
  }
}

export default async function DestinationPage({params}: DestinationPageProps) {
  const {slug} = await params
  const destination = await getDestinationBySlug(slug)

  if (!destination) notFound()

  const relationships = await getDestinationRelationships(destination._id)
  const heroPhotograph = getDestinationPhotograph(destination.heroImage, 'hero', {
    height: 1440,
    width: 2560,
  })
  const galleryPhotographs = (destination.gallery?.images ?? [])
    .map((image, index) =>
      getDestinationPhotograph(image, `gallery-${index}`, {
        height: 1400,
        width: 1800,
      }),
    )
    .filter((image): image is DestinationPhotograph => Boolean(image))
  const eyebrow = destination.destinationType
    ? (destinationTypeLabels[destination.destinationType] ?? destination.destinationType)
    : 'Destination'

  return (
    <>
      <SiteHeader activeHref="/destinations" appearance="solid" />
      <main className="bg-linen">
        <EditorialPageHero
          eyebrow={eyebrow}
          introduction={destination.excerpt}
          title={destination.title}
        />

        {destination.editorialIntroduction ? (
          <SectionSpacing aria-labelledby="destination-introduction-title" size="generous">
            <EditorialContainer size="reading">
              <h2 className="sr-only" id="destination-introduction-title">
                Editorial introduction
              </h2>
              <EditorialText variant="lead">{destination.editorialIntroduction}</EditorialText>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <DestinationPhotography
          galleryCaption={destination.gallery?.caption}
          galleryLabel={destination.gallery?.accessibleLabel}
          hero={heroPhotograph}
          images={galleryPhotographs}
        />

        {destination.story.length > 0 ? (
          <SectionSpacing aria-labelledby="destination-story-title" size="generous">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  The story
                </EditorialText>
                <div className="lg:col-span-7 lg:col-start-4">
                  <EditorialText
                    as="h2"
                    className="mb-12 sm:mb-16"
                    headingSize="medium"
                    id="destination-story-title"
                    variant="heading"
                  >
                    The journey, held in the landscape.
                  </EditorialText>
                  <EditorialPortableText value={destination.story} />
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <DestinationTravelInformation
          highlights={destination.highlights}
          information={destination.travelInformation}
          lastReviewedAt={destination.lastReviewedAt}
          thingsToBring={destination.thingsToBring}
          tips={destination.tips}
        />

        <DestinationMap
          coordinates={
            destination.mapLocation?.coordinates
              ? {
                  latitude: destination.mapLocation.coordinates.lat,
                  longitude: destination.mapLocation.coordinates.lng,
                }
              : undefined
          }
          destinationTitle={destination.title}
          directionsUrl={destination.mapLocation?.directionsUrl}
          locationLabel={destination.mapLocation?.label}
        />

        {destination.photographyNotes.length > 0 ? (
          <SectionSpacing aria-labelledby="photography-notes-title" size="generous">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  Photography notes
                </EditorialText>
                <div className="lg:col-span-6 lg:col-start-5">
                  <EditorialText
                    as="h2"
                    className="mb-12"
                    headingSize="small"
                    id="photography-notes-title"
                    variant="heading"
                  >
                    Looking with care.
                  </EditorialText>
                  <EditorialPortableText value={destination.photographyNotes} />
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        {destination.whyVisit ? (
          <SectionSpacing
            aria-labelledby="joshua-point-recommendation-title"
            className="bg-stone/25"
            size="generous"
          >
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  From Joshua&apos;s Point
                </EditorialText>
                <div className="lg:col-span-8 lg:col-start-4">
                  <EditorialText
                    as="h2"
                    className="max-w-3xl"
                    headingSize="medium"
                    id="joshua-point-recommendation-title"
                    variant="heading"
                  >
                    Why we make time for this place.
                  </EditorialText>
                  <EditorialText className="mt-10 max-w-2xl sm:mt-12" variant="body">
                    {destination.whyVisit}
                  </EditorialText>
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <RelatedPlaces items={relationships.all} limit={3} />
        <NearbyDiveSites items={relationships.all} limit={3} />
        <RelatedJournalArticles items={relationships.all} limit={3} />
      </main>
    </>
  )
}
