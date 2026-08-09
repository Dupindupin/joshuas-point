import type {Metadata} from 'next'

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
import {getEditorialImage} from '@/sanity/image'
import {getDiveSitesPage} from '@/sanity/queries/dive-sites'

const fallbackMetadata: Metadata = {
  title: "Dive Sites | Joshua's Point",
  description: 'A carefully reviewed editorial field guide to diving in Southern Negros.',
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getDiveSitesPage()
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

function DiveSitesPlaceholder() {
  return (
    <>
      <EditorialPageHero
        eyebrow="Dive Guide"
        introduction="A carefully reviewed field guide to the underwater landscapes of Southern Negros."
        title="Dive Sites"
      />
      <SectionSpacing aria-label="Dive guide introduction" size="generous">
        <EditorialContainer size="reading">
          <EditorialText variant="lead">
            The first underwater field notes are being prepared.
          </EditorialText>
          <EditorialText className="mt-10 max-w-xl" variant="body">
            Each site will appear only after its story, conditions, location, and safety guidance
            have been reviewed with qualified local knowledge.
          </EditorialText>
        </EditorialContainer>
      </SectionSpacing>
    </>
  )
}

export default async function DiveSitesPage() {
  const page = await getDiveSitesPage()

  return (
    <>
      <SiteHeader activeHref="/dive-sites" appearance="solid" />
      <main className="bg-linen">
        {!page ? (
          <DiveSitesPlaceholder />
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
                            id: diveSite._id,
                            image: getEditorialImage(diveSite.heroImage, {
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
        )}
      </main>
    </>
  )
}
