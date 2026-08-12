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
  EditorialPhotoStories,
  EditorialPortableText,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {DestinationMap} from '@/components/maps'
import {
  NearbyDiveSites,
  RelatedJournalArticles,
  RelatedPlaces,
  RelatedScenicRoutes,
} from '@/components/relationships'
import {EditorialShare} from '@/components/share'
import {SiteHeader} from '@/components/site/site-header'
import {EditorialInstagramSection} from '@/components/social'
import {createPageMetadata} from '@/lib/seo/metadata'
import {normalizeSocialProfiles} from '@/lib/social-profiles'
import {getEditorialImage} from '@/sanity/image'
import {mapEditorialPhotoStories} from '@/sanity/photography'
import {mapInstagramPosts} from '@/sanity/mappers/instagram-posts'
import {getDestinationBySlug, getDestinationSlugs} from '@/sanity/queries/destinations'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'
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
    creditUrl: image?.creditUrl ?? undefined,
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

  const title = destination.seo?.metaTitle || `${destination.title} | Joshua's Point`
  const description =
    destination.seo?.metaDescription ||
    destination.excerpt ||
    destination.editorialIntroduction ||
    destination.title

  return createPageMetadata({
    description,
    pathname: `/destinations/${encodeURIComponent(destination.slug)}`,
    seo: destination.seo,
    socialImage: destination.heroImage,
    title,
    type: 'article',
  })
}

export default async function DestinationPage({params}: DestinationPageProps) {
  const {slug} = await params
  const [destination, siteSettings] = await Promise.all([
    getDestinationBySlug(slug),
    getSiteSeoSettings(),
  ])

  if (!destination) notFound()

  const relationships = await getDestinationRelationships(destination._id)
  const heroPhotograph = getDestinationPhotograph(destination.heroImage, 'hero', {
    height: 1440,
    width: 2560,
  })
  const photoStories = mapEditorialPhotoStories(destination.editorialPhotography)
  const galleryPhotographs = (photoStories.length > 0 ? [] : (destination.gallery?.images ?? []))
    .map((image, index) =>
      getDestinationPhotograph(image, `gallery-${index}`, {
        height: 1400,
        width: 1800,
      }),
    )
    .filter((image): image is DestinationPhotograph => Boolean(image))
  const instagramProfile = normalizeSocialProfiles(siteSettings?.socialProfiles).find(
    (profile) => profile.platform === 'instagram',
  )
  const instagramPosts = mapInstagramPosts(destination.instagramHighlights)
  const eyebrow = destination.destinationType
    ? (destinationTypeLabels[destination.destinationType] ?? destination.destinationType)
    : 'Destination'

  return (
    <>
      <SiteHeader activeHref="/destinations" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow={eyebrow}
          introduction={destination.excerpt}
          title={destination.title}
        />

        {destination.editorialIntroduction ? (
          <SectionSpacing aria-labelledby="destination-introduction-title" size="generous">
            <EditorialContainer size="reading">
              <h2 className="sr-only" id="destination-introduction-title">
                Introduction
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
                    A closer look.
                  </EditorialText>
                  <EditorialPortableText value={destination.story} />
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <EditorialPhotoStories stories={photoStories} />

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
            className="bg-surface-soft"
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

        {instagramProfile && instagramPosts.length > 0 ? (
          <EditorialInstagramSection
            heading={`From ${destination.title}`}
            introduction="Selected photographs connected to this place."
            posts={instagramPosts}
            profile={instagramProfile}
          />
        ) : null}

        <EditorialShare
          pathname={`/destinations/${encodeURIComponent(destination.slug)}`}
          title={destination.title}
        />

        <RelatedPlaces items={relationships.all} limit={3} />
        <NearbyDiveSites items={relationships.all} limit={3} />
        <RelatedScenicRoutes items={relationships.all} limit={3} />
        <RelatedJournalArticles items={relationships.all} limit={3} />
      </main>
    </>
  )
}
