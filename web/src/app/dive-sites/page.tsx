import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {FeaturedDiveSite} from '@/components/dive-sites/featured-dive-site'
import {
  EditorialContainer,
  EditorialMedia,
  EditorialPageHero,
  EditorialPortableText,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {getEditorialImage} from '@/sanity/image'
import {getDiveSitesPage} from '@/sanity/queries/dive-sites'

const fallbackMetadata: Metadata = {
  title: "Dive Sites | Joshua's Point",
  description: 'A carefully reviewed editorial field guide to diving in Southern Negros.',
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDiveSitesPage()
  if (!page) return fallbackMetadata

  const title = page.seo?.metaTitle || `${page.hero.title} | Joshua's Point`
  const description = page.seo?.metaDescription || page.hero.introduction

  return createPageMetadata({
    description,
    pathname: '/dive-sites',
    seo: page.seo,
    socialImage: page.hero.image,
    title,
  })
}

export default async function DiveSitesPage() {
  const page = await getDiveSitesPage()
  if (!page || page.featuredDiveSites.length === 0) notFound()

  return (
    <>
      <SiteHeader activeHref="/dive-sites" appearance="solid" />
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

          <SectionSpacing aria-label="Dive guide introduction" size="generous">
            <EditorialContainer size="reading">
              <EditorialText variant="lead">{page.introduction}</EditorialText>
            </EditorialContainer>
          </SectionSpacing>

          <SectionSpacing aria-label="About the dive guide" size="standard">
            <EditorialContainer size="reading">
              <EditorialPortableText value={page.editorialCopy} />
            </EditorialContainer>
          </SectionSpacing>

          {page.featuredDiveSites.length > 0 ? (
            <SectionSpacing aria-labelledby="featured-dive-sites-title" size="generous">
              <EditorialContainer>
                <EditorialText
                  as="h2"
                  headingSize="medium"
                  id="featured-dive-sites-title"
                  variant="heading"
                >
                  Featured dive sites
                </EditorialText>
                <div className="mt-16 sm:mt-20">
                  {page.featuredDiveSites.map((diveSite) => (
                    <SectionSpacing as="div" key={diveSite._id} size="compact">
                      <FeaturedDiveSite
                        diveSite={{
                          href: `/dive-sites/${encodeURIComponent(diveSite.slug)}`,
                          id: diveSite._id,
                          image:
                            diveSite.heroImage?.asset?._ref === page.hero.image?.asset?._ref
                              ? undefined
                              : getEditorialImage(diveSite.heroImage, {
                                  height: 1000,
                                  width: 1500,
                                }),
                          introduction: diveSite.excerpt,
                          title: diveSite.name,
                        }}
                      />
                    </SectionSpacing>
                  ))}
                </div>
              </EditorialContainer>
            </SectionSpacing>
          ) : null}
        </>
      </main>
    </>
  )
}
