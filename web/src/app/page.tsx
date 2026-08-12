import type {Metadata} from 'next'
import Link from 'next/link'
import {notFound} from 'next/navigation'

import {
  EditorialContainer,
  EditorialFigure,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {Hero} from '@/components/home/hero'
import {ImageNarrativeSection} from '@/components/home/image-narrative-section'
import {StorySection} from '@/components/home/story-section'
import {MotionReveal} from '@/components/motion'
import {SiteHeader} from '@/components/site/site-header'
import {EditorialInstagramSection} from '@/components/social'
import {createPageMetadata} from '@/lib/seo/metadata'
import {normalizeSocialProfiles} from '@/lib/social-profiles'
import {mapInstagramPosts} from '@/sanity/mappers/instagram-posts'
import {mapSanityHomePage} from '@/sanity/mappers/home-page'
import {getHomePage} from '@/sanity/queries/home-page'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'

import type {HomePageData} from './home-page-data'
import {homePageData} from './home-page-data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()

  return createPageMetadata({
    description:
      'Joshua’s Point is a home connected to nature in Southern Negros, shaped by shared spaces, sea, mountain, and the changing day.',
    pathname: '/',
    seo: page?.seo,
    socialImage: page?.hero?.image,
    title: "Joshua's Point | A Home Connected to Nature",
  })
}

function SouthernNegrosSection({section}: {section: NonNullable<HomePageData['southernNegros']>}) {
  const text = (
    <>
      <EditorialText variant="eyebrow">{section.eyebrow}</EditorialText>
      <EditorialText
        className="mt-7"
        headingSize="medium"
        id="home-southern-negros-title"
        variant="heading"
      >
        {section.heading}
      </EditorialText>
      <EditorialText className="mt-10 max-w-xl" variant="body">
        {section.paragraph}
      </EditorialText>
      {section.link ? (
        <Link
          className="mt-9 inline-flex min-h-11 items-center border-b border-ink/35 font-body text-sm font-semibold text-ink transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          href={section.link.href}
          rel={section.link.openInNewTab ? 'noreferrer' : undefined}
          target={section.link.openInNewTab ? '_blank' : undefined}
        >
          {section.link.label}
        </Link>
      ) : null}
    </>
  )

  return (
    <SectionSpacing
      aria-labelledby="home-southern-negros-title"
      className="bg-surface-soft"
      size="immersive"
    >
      {section.image ? (
        <>
          <EditorialFigure
            caption={section.caption}
            captionAlignment="end"
            captionContainer="wide"
            media={{
              image: section.image,
              ratio: 'panoramic',
              sizes: '100vw',
              tone: 'morning',
            }}
          />
          <MotionReveal>
            <EditorialContainer className="mt-24 sm:mt-32" size="reading">
              {text}
            </EditorialContainer>
          </MotionReveal>
        </>
      ) : (
        <MotionReveal>
          <EditorialContainer size="reading">{text}</EditorialContainer>
        </MotionReveal>
      )}
    </SectionSpacing>
  )
}

function ClosingReflection({section}: {section: NonNullable<HomePageData['closingReflection']>}) {
  return (
    <section aria-label="Closing reflection" className="bg-canvas">
      {section.image ? (
        <EditorialFigure
          caption={section.caption}
          captionAlignment="end"
          captionContainer="wide"
          media={{
            image: section.image,
            ratio: 'panoramic',
            sizes: '100vw',
            tone: 'stone',
          }}
        />
      ) : null}
      <SectionSpacing as="div" size="immersive">
        <MotionReveal>
          <EditorialContainer size="reading">
            <EditorialText variant="lead">{section.body}</EditorialText>
          </EditorialContainer>
        </MotionReveal>
      </SectionSpacing>
    </section>
  )
}

export default async function Home() {
  const [sanityHomePage, siteSettings] = await Promise.all([
    getHomePage(),
    getSiteSeoSettings(),
  ])
  const pageData = sanityHomePage ? mapSanityHomePage(sanityHomePage) : homePageData
  if (!pageData) notFound()
  const instagramProfile = normalizeSocialProfiles(siteSettings?.socialProfiles).find(
    (profile) => profile.platform === 'instagram',
  )
  const instagramPosts = mapInstagramPosts(siteSettings?.instagramHighlights)

  const {closingReflection, hero, morningNarrative, placeStory, sharedLife, southernNegros} =
    pageData

  return (
    <>
      <SiteHeader activeHref="/" />
      <main>
        <Hero
          description={hero.description}
          eyebrow={hero.eyebrow}
          image={hero.image}
          title={hero.title}
        />
        {placeStory ? (
          <StorySection
            caption={placeStory.caption}
            eyebrow={placeStory.eyebrow}
            heading={placeStory.heading}
            image={placeStory.image}
            link={{href: '/the-house', label: 'Read about the house'}}
            paragraph={placeStory.paragraph}
            showHorizon
          />
        ) : null}
        {sharedLife ? (
          <StorySection
            caption={sharedLife.caption}
            eyebrow={sharedLife.eyebrow}
            heading={sharedLife.heading}
            id="home-shared-life"
            image={sharedLife.image}
            paragraph={sharedLife.paragraph}
          />
        ) : null}
        {morningNarrative ? (
          <ImageNarrativeSection
            caption={morningNarrative.caption}
            eyebrow={morningNarrative.eyebrow}
            heading={morningNarrative.heading}
            image={morningNarrative.image}
            paragraph={morningNarrative.paragraph}
          />
        ) : null}
        {southernNegros ? <SouthernNegrosSection section={southernNegros} /> : null}
        {instagramProfile ? (
          <EditorialInstagramSection posts={instagramPosts} profile={instagramProfile} />
        ) : null}
        {closingReflection ? <ClosingReflection section={closingReflection} /> : null}
      </main>
    </>
  )
}
