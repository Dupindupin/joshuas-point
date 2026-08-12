import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {FeaturedDestination} from '@/components/destinations/featured-destination'
import {
  EditorialContainer,
  EditorialGrid,
  EditorialMedia,
  EditorialPageHero,
  EditorialPortableText,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {getEditorialImage} from '@/sanity/image'
import {getPublishedScenicRoutes, getScenicRoutesPage} from '@/sanity/queries/scenic-routes'

const fallbackMetadata: Metadata = {
  description: 'An editorial guide to scenic journeys from Joshua’s Point through Southern Negros.',
  title: "Scenic Routes | Joshua's Point",
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getScenicRoutesPage()
  const title = page?.seo?.metaTitle || String(fallbackMetadata.title)
  const description = String(
    page?.seo?.metaDescription || page?.hero.introduction || fallbackMetadata.description,
  )

  return createPageMetadata({
    description,
    pathname: '/scenic-routes',
    seo: page?.seo,
    socialImage: page?.hero.image,
    title,
  })
}

export default async function ScenicRoutesPage() {
  const [page, routes] = await Promise.all([getScenicRoutesPage(), getPublishedScenicRoutes()])
  if (!page || routes.length === 0) notFound()

  return (
    <>
      <SiteHeader activeHref="/scenic-routes" appearance="solid" />
      <main className="bg-canvas">
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

          <SectionSpacing aria-label="Scenic routes editorial introduction" size="generous">
            <EditorialContainer size="reading">
              <EditorialText variant="lead">{page.introduction}</EditorialText>
            </EditorialContainer>
          </SectionSpacing>

          <SectionSpacing aria-label="About the scenic routes guide" size="standard">
            <EditorialContainer size="reading">
              <EditorialPortableText value={page.editorialCopy} />
            </EditorialContainer>
          </SectionSpacing>

          {page.featuredRoutes.length > 0 ? (
            <SectionSpacing aria-labelledby="featured-routes-title" size="generous">
              <EditorialContainer>
                <EditorialText
                  as="h2"
                  headingSize="medium"
                  id="featured-routes-title"
                  variant="heading"
                >
                  Featured routes
                </EditorialText>
                <div className="mt-16 sm:mt-20">
                  {page.featuredRoutes.map((route) => (
                    <SectionSpacing as="div" key={route._id} size="compact">
                      <FeaturedDestination
                        destination={{
                          href: `/scenic-routes/${encodeURIComponent(route.slug)}`,
                          id: route._id,
                          image: getEditorialImage(route.heroImage, {
                            height: 1000,
                            width: 1500,
                          }),
                          introduction: route.editorialIntroduction,
                          title: route.title,
                        }}
                      />
                    </SectionSpacing>
                  ))}
                </div>
              </EditorialContainer>
            </SectionSpacing>
          ) : null}
        </>

        {routes.length > 0 ? (
          <SectionSpacing aria-labelledby="all-routes-title" size="generous">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  Field guide
                </EditorialText>
                <div className="lg:col-span-8 lg:col-start-4">
                  <EditorialText
                    as="h2"
                    headingSize="medium"
                    id="all-routes-title"
                    variant="heading"
                  >
                    All scenic routes
                  </EditorialText>
                  <ul className="mt-12 border-t border-ink/15 sm:mt-16">
                    {routes.map((route) => (
                      <li className="border-b border-ink/15" key={route._id}>
                        <Link
                          className="flex min-h-20 items-center justify-between gap-6 rounded-sm py-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                          href={`/scenic-routes/${encodeURIComponent(route.slug)}`}
                        >
                          <span className="font-display text-2xl leading-tight text-ink sm:text-3xl">
                            {route.title}
                          </span>
                          <span aria-hidden="true" className="font-body text-sm text-ink/50">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}
      </main>
    </>
  )
}
