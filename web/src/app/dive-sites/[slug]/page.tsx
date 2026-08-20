import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {
  EditorialContainer,
  EditorialGrid,
  MasonryGallery,
  EditorialMedia,
  EditorialPageHero,
  EditorialPhotoStories,
  EditorialPortableText,
  EditorialText,
  type EditorialPhotoStoryData,
  type MasonryGalleryData,
  SectionSpacing,
} from '@/components/editorial'
import {DiveSiteMap} from '@/components/maps'
import {NearbyDiveSites, RelatedPlaces} from '@/components/relationships'
import {EditorialShare} from '@/components/share'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {getEditorialImage} from '@/sanity/image'
import {mapSanityGallery} from '@/sanity/gallery'
import {mapEditorialPhotoStories} from '@/sanity/photography'
import {
  getDiveSiteBySlug,
  getDiveSiteSlugs,
  type DiveSiteDetailData,
} from '@/sanity/queries/dive-sites'
import {getDiveSiteRelationships} from '@/sanity/relationships'

type DiveSitePageProps = {params: Promise<{slug: string}>}

const levelLabels = {advanced: 'Advanced', beginner: 'Beginner', intermediate: 'Intermediate'}
const currentLabels = {calm: 'Calm', moderate: 'Moderate', strong: 'Strong', variable: 'Variable'}
const entryLabels = {boat: 'Boat', mixed: 'Shore and boat', shore: 'Shore'}

function getPracticalItems(diveSite: DiveSiteDetailData) {
  const visibility = diveSite.visibility
  const visibilityLabel =
    typeof visibility?.minimumMeters === 'number' && typeof visibility.maximumMeters === 'number'
      ? `${visibility.minimumMeters}–${visibility.maximumMeters} metres`
      : undefined

  return [
    diveSite.diveLevel
      ? {
          description: 'Follow the current assessment of a qualified local operator.',
          label: 'Dive level',
          value: levelLabels[diveSite.diveLevel],
        }
      : undefined,
    typeof diveSite.maximumDepthMeters === 'number'
      ? {label: 'Maximum depth', value: `${diveSite.maximumDepthMeters} metres`}
      : undefined,
    visibilityLabel
      ? {
          description: visibility?.notes ?? undefined,
          label: 'Observed visibility',
          value: visibilityLabel,
        }
      : undefined,
    diveSite.current
      ? {
          description: 'Natural conditions vary and require a current briefing.',
          label: 'Current',
          value: currentLabels[diveSite.current],
        }
      : undefined,
    diveSite.entryType ? {label: 'Entry', value: entryLabels[diveSite.entryType]} : undefined,
    diveSite.bestSeason ? {label: 'Season', value: diveSite.bestSeason} : undefined,
  ].filter((item): item is {description?: string; label: string; value: string} => Boolean(item))
}

function imageIdentity(src: EditorialPhotoStoryData['frames'][number]['image']['src']) {
  const value = typeof src === 'string' ? src : 'src' in src ? src.src : ''
  return value.split('?')[0]
}

function refineDauinPhotography(
  stories: EditorialPhotoStoryData[],
  gallery: MasonryGalleryData | null,
) {
  const refinedStories = stories.map((story) => {
    if (story.frames.length <= 10) return story

    const closingFrame = story.frames.findLast((frame) => frame.phase === 'closing')
    const firstFrames = story.frames.filter((frame) => frame !== closingFrame).slice(0, 9)
    return {
      ...story,
      frames: closingFrame ? [...firstFrames, closingFrame] : firstFrames.slice(0, 10),
    }
  })
  const storyImages = new Set(
    refinedStories.flatMap((story) => story.frames.map((frame) => imageIdentity(frame.image.src))),
  )
  const galleryImages = gallery?.images
    .filter((item) => !storyImages.has(imageIdentity(item.image.src)))
    .slice(0, 8)

  return {
    gallery:
      gallery && galleryImages && galleryImages.length >= 2
        ? {...gallery, images: galleryImages}
        : null,
    stories: refinedStories,
  }
}

export async function generateStaticParams() {
  const slugs = await getDiveSiteSlugs()
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: DiveSitePageProps): Promise<Metadata> {
  const {slug} = await params
  const diveSite = await getDiveSiteBySlug(slug)
  if (!diveSite) return {robots: {follow: false, index: false}, title: 'Dive guide not found'}

  const title = diveSite.seo?.metaTitle || `${diveSite.name} Diving | Joshua's Point`
  const description = diveSite.seo?.metaDescription || diveSite.excerpt

  return createPageMetadata({
    description,
    pathname: `/dive-sites/${encodeURIComponent(diveSite.slug)}`,
    seo: diveSite.seo,
    socialImage: diveSite.heroImage,
    title,
    type: 'article',
  })
}

export default async function DiveSitePage({params}: DiveSitePageProps) {
  const {slug} = await params
  const diveSite = await getDiveSiteBySlug(slug)
  if (!diveSite) notFound()

  const relationships = await getDiveSiteRelationships(diveSite._id)
  const isDauin = diveSite.slug === 'dauin'
  const mappedPhotoStories = mapEditorialPhotoStories(diveSite.editorialPhotography)
  const mappedGallery = mapSanityGallery(diveSite.gallery)
  const {gallery, stories: photoStories} = isDauin
    ? refineDauinPhotography(mappedPhotoStories, mappedGallery)
    : {gallery: mappedGallery, stories: mappedPhotoStories}
  const practicalItems = getPracticalItems(diveSite)
  const mapCoordinates = diveSite.mapLocation?.coordinates
    ? {
        latitude: diveSite.mapLocation.coordinates.lat,
        longitude: diveSite.mapLocation.coordinates.lng,
      }
    : undefined

  return (
    <>
      <SiteHeader activeHref="/dive-sites" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Dive Guide"
          introduction={diveSite.excerpt}
          title={diveSite.name}
        />

        {diveSite.heroImage ? (
          <figure>
            <EditorialMedia
              image={getEditorialImage(diveSite.heroImage, {height: 1440, width: 2560})}
              preload
              ratio="panoramic"
              sizes="100vw"
            />
          </figure>
        ) : null}

        {diveSite.description.length > 0 ? (
          <SectionSpacing aria-labelledby="dive-story-title" size="generous">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  Below the surface
                </EditorialText>
                <div className="lg:col-span-7 lg:col-start-4">
                  <EditorialText
                    as="h2"
                    className="mb-12 sm:mb-16"
                    headingSize="medium"
                    id="dive-story-title"
                    variant="heading"
                  >
                    A different way to look closely.
                  </EditorialText>
                  <EditorialPortableText value={diveSite.description} />
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        {diveSite.marineLife.length > 0 ? (
          <SectionSpacing aria-labelledby="marine-life-title" size="standard">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  Marine observations
                </EditorialText>
                <div className="lg:col-span-7 lg:col-start-4">
                  <EditorialText
                    as="h2"
                    headingSize="small"
                    id="marine-life-title"
                    variant="heading"
                  >
                    What has been seen here.
                  </EditorialText>
                  <p className="mt-7 max-w-2xl font-body text-sm leading-7 text-ink/58">
                    Wildlife is never guaranteed. These are observations, not a promised checklist.
                  </p>
                  <ul className="mt-10 border-t border-ink/15">
                    {diveSite.marineLife.map((item) => (
                      <li
                        className="border-b border-ink/15 py-5 font-body text-base leading-7 text-ink/76"
                        key={item}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <EditorialPhotoStories pace={isDauin ? 'compact' : 'standard'} stories={photoStories} />

        {gallery ? (
          <MasonryGallery
            {...gallery}
            heading="More from the underwater world"
            pace={isDauin ? 'compact' : 'standard'}
          />
        ) : null}

        {practicalItems.length > 0 || diveSite.safetyNotes ? (
          <SectionSpacing aria-labelledby="dive-practical-title" size="generous">
            <EditorialContainer>
              <EditorialText
                as="h2"
                headingSize="medium"
                id="dive-practical-title"
                variant="heading"
              >
                Before entering the water.
              </EditorialText>
              {practicalItems.length > 0 ? (
                <dl className="mt-12 border-t border-ink/15 sm:mt-16">
                  {practicalItems.map((item) => (
                    <div
                      className="grid gap-4 border-b border-ink/15 py-7 sm:grid-cols-12"
                      key={item.label}
                    >
                      <dt className="font-display text-2xl text-ink sm:col-span-4">{item.label}</dt>
                      <dd className="sm:col-span-7 sm:col-start-6">
                        <p className="font-body text-sm leading-7 text-ink/78">{item.value}</p>
                        {item.description ? (
                          <p className="mt-3 font-body text-sm leading-7 text-ink/58">
                            {item.description}
                          </p>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              {diveSite.safetyNotes ? (
                <EditorialText className="mt-10 max-w-2xl" variant="body">
                  {diveSite.safetyNotes}
                </EditorialText>
              ) : null}
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <DiveSiteMap
          coordinates={mapCoordinates}
          directionsUrl={diveSite.mapLocation?.directionsUrl ?? undefined}
          diveSiteName={diveSite.name}
          locationLabel={diveSite.mapLocation?.label ?? undefined}
        />

        <EditorialShare
          pathname={`/dive-sites/${encodeURIComponent(diveSite.slug)}`}
          title={diveSite.name}
        />

        <NearbyDiveSites items={relationships.all} limit={3} />
        {!isDauin ? <RelatedPlaces items={relationships.all} limit={3} /> : null}
      </main>
    </>
  )
}
