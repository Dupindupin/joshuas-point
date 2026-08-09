import type {Metadata} from 'next'

import {FeaturedDestination} from '@/components/destinations/featured-destination'
import {
  EditorialContainer,
  EditorialMedia,
  EditorialPageHero,
  EditorialPortableText,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {getEditorialImage} from '@/sanity/image'
import {getDestinationsPage} from '@/sanity/queries/destinations'

const fallbackMetadata: Metadata = {
  title: "Destinations | Joshua's Point",
  description: 'A slowly gathered guide to exploring southern Negros from Joshua’s Point.',
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDestinationsPage()
  if (!page) return fallbackMetadata

  const socialImage = getEditorialImage(page.seo?.socialImage, {height: 630, width: 1200})
  const title = page.seo?.metaTitle || `${page.hero.title} | Joshua's Point`
  const description = page.seo?.metaDescription || page.hero.introduction

  return {
    title,
    description,
    openGraph: {
      title: page.seo?.socialTitle || title,
      description: page.seo?.socialDescription || description,
      images: socialImage ? [{alt: socialImage.alt, url: String(socialImage.src)}] : undefined,
    },
    robots: page.seo?.noIndex ? {follow: false, index: false} : undefined,
  }
}

function DestinationsPlaceholder() {
  return (
    <>
      <EditorialPageHero
        eyebrow="Travel Guide"
        introduction="A slowly gathered guide to the roads, water, forests, and communities of southern Negros."
        title="Destinations"
      />
      <SectionSpacing aria-label="Destination guide introduction" size="generous">
        <EditorialContainer size="reading">
          <EditorialText variant="lead">
            The first field notes are still being prepared.
          </EditorialText>
          <EditorialText className="mt-10 max-w-xl" variant="body">
            Each place will be added only when its story and practical guidance have been carefully
            observed and reviewed.
          </EditorialText>
        </EditorialContainer>
      </SectionSpacing>
    </>
  )
}

export default async function DestinationsPage() {
  const page = await getDestinationsPage()

  return (
    <>
      <SiteHeader activeHref="/destinations" appearance="solid" />
      <main className="bg-linen">
        {!page ? (
          <DestinationsPlaceholder />
        ) : (
          <>
            <EditorialPageHero
              eyebrow={page.hero.eyebrow}
              introduction={page.hero.introduction}
              title={page.hero.title}
            />

            {page.hero.image ? (
              <figure>
                <EditorialMedia
                  image={getEditorialImage(page.hero.image, {height: 1080, width: 1920})}
                  preload
                  ratio="panoramic"
                  sizes="100vw"
                />
              </figure>
            ) : null}

            <SectionSpacing aria-label="Destination guide introduction" size="generous">
              <EditorialContainer size="reading">
                <EditorialText variant="lead">{page.introduction}</EditorialText>
              </EditorialContainer>
            </SectionSpacing>

            <SectionSpacing aria-label="About the destination guide" size="standard">
              <EditorialContainer size="reading">
                <EditorialPortableText value={page.editorialCopy} />
              </EditorialContainer>
            </SectionSpacing>

            {page.featuredDestinations.length > 0 ? (
              <SectionSpacing aria-labelledby="featured-destinations-title" size="generous">
                <EditorialContainer>
                  <EditorialText
                    as="h2"
                    headingSize="medium"
                    id="featured-destinations-title"
                    variant="heading"
                  >
                    Featured destinations
                  </EditorialText>
                  <div className="mt-16 sm:mt-20">
                    {page.featuredDestinations.map((destination) => (
                      <SectionSpacing as="div" key={destination._id} size="compact">
                        <FeaturedDestination
                          destination={{
                            id: destination._id,
                            image: getEditorialImage(destination.heroImage, {
                              height: 1000,
                              width: 1500,
                            }),
                            introduction: destination.editorialIntroduction,
                            title: destination.title,
                          }}
                        />
                      </SectionSpacing>
                    ))}
                  </div>
                </EditorialContainer>
              </SectionSpacing>
            ) : null}
          </>
        )}
      </main>
    </>
  )
}
