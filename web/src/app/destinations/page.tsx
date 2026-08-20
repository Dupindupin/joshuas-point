import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {FeaturedDestination} from '@/components/destinations/featured-destination'
import {
  EditorialContainer,
  EditorialGrid,
  EditorialLink,
  EditorialMedia,
  EditorialPageHero,
  EditorialPortableText,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {requiresTextLedDestination} from '@/lib/editorial/photography-readiness'
import {getEditorialImage} from '@/sanity/image'
import {getDestinationsPage, getPublishedDestinations} from '@/sanity/queries/destinations'

const fallbackMetadata: Metadata = {
  title: "Destinations | Joshua's Point",
  description: 'A slowly gathered guide to exploring southern Negros from Joshua’s Point.',
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDestinationsPage()

  if (!page) {
    return createPageMetadata({
      description: String(fallbackMetadata.description),
      pathname: '/destinations',
      title: String(fallbackMetadata.title),
    })
  }

  const title = page.seo?.metaTitle || `${page.hero.title} | Joshua's Point`
  const description = page.seo?.metaDescription || page.hero.introduction

  return createPageMetadata({
    description,
    pathname: '/destinations',
    seo: page.seo,
    socialImage: page.hero.image,
    title,
  })
}

export default async function DestinationsPage() {
  const [page, publishedDestinations] = await Promise.all([
    getDestinationsPage(),
    getPublishedDestinations(),
  ])
  if (!page || publishedDestinations.length === 0) notFound()
  const preferredDestinationSlugs = ['casaroro-falls', 'apo-island', 'dumaguete'] as const
  const curatedDestinations = [
    ...page.featuredDestinations,
    ...preferredDestinationSlugs.flatMap((slug) =>
      publishedDestinations.filter((destination) => destination.slug === slug),
    ),
  ]
    .filter(
      (destination, index, destinations) =>
        !requiresTextLedDestination(destination.slug) &&
        destinations.findIndex((item) => item._id === destination._id) === index,
    )
    .flatMap((destination) => {
      const image = getEditorialImage(destination.heroImage, {height: 1000, width: 1500})
      return image ? [{destination, image}] : []
    })
    .slice(0, 3)

  return (
    <>
      <SiteHeader activeHref="/destinations" appearance="solid" />
      <main className="bg-canvas">
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

        {curatedDestinations.length > 0 ? (
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
                {curatedDestinations.map(({destination, image}) => (
                  <SectionSpacing as="div" key={destination._id} size="compact">
                    <FeaturedDestination
                      destination={{
                        href: `/destinations/${encodeURIComponent(destination.slug)}`,
                        id: destination._id,
                        image,
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

        <SectionSpacing aria-labelledby="all-destinations-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                The guide
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-4">
                <EditorialText
                  as="h2"
                  headingSize="medium"
                  id="all-destinations-title"
                  variant="heading"
                >
                  All destinations
                </EditorialText>
                <ul className="mt-12 border-t border-ink/15 sm:mt-16">
                  {publishedDestinations.map((destination) => (
                    <li className="border-b border-ink/15" key={destination._id}>
                      <Link
                        className="group flex min-h-20 items-center justify-between gap-6 rounded-sm py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                        href={`/destinations/${encodeURIComponent(destination.slug)}`}
                      >
                        <span className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                          {destination.title}
                        </span>
                        <span
                          aria-hidden="true"
                          className="font-body text-sm text-ink/50 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-12">
                  <EditorialLink href="/plan-your-stay" label="Plan a stay at Joshua’s Point" />
                </div>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
