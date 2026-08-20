import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {EditorialAmenityList} from '@/components/amenities'
import {
  EditorialContainer,
  EditorialFigure,
  EditorialGrid,
  EditorialLink,
  EditorialMediaStory,
  EditorialPageHero,
  EditorialPhotoEssay,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {HouseMaterialsList} from '@/components/house'
import {HorizonLine, MotionReveal} from '@/components/motion'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {approvedAmenityKeys, selectApprovedAmenities} from '@/lib/amenities'
import {mapSanityHousePage} from '@/sanity/mappers/house-page'
import {getPublicAmenities} from '@/sanity/queries/amenities'
import {getHousePage} from '@/sanity/queries/house-page'

import {housePageData} from './house-page-data'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHousePage()

  return createPageMetadata({
    description:
      'An editorial introduction to Joshua’s Point through nature, shared spaces, and the changing day.',
    pathname: '/the-house',
    seo: page?.seo,
    socialImage: page?.hero?.image,
    title: "The House | Joshua's Point",
  })
}

export default async function TheHousePage() {
  const [sanityHousePage, publicAmenities] = await Promise.all([
    getHousePage(),
    getPublicAmenities(),
  ])
  const pageData = sanityHousePage ? mapSanityHousePage(sanityHousePage) : housePageData
  if (!pageData) notFound()
  const houseSystems = selectApprovedAmenities(publicAmenities, [
    approvedAmenityKeys.solarBatterySystem,
    approvedAmenityKeys.rainwaterCollection,
  ])
  const {
    dailyRhythms,
    finalReflection,
    hero,
    indoorOutdoor,
    materials,
    openingReflection,
    sharedLiving,
    view,
  } = pageData

  return (
    <>
      <SiteHeader activeHref="/the-house" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow={hero.eyebrow}
          introduction={hero.introduction}
          motion
          size="compact"
          title={hero.title}
        />

        <SectionSpacing as="div" axis="bottom" size="compact">
          <EditorialFigure media={hero.media} />
        </SectionSpacing>

        <SectionSpacing aria-labelledby="house-opening-reflection-title" size="compact">
          <EditorialContainer size="reading">
            <MotionReveal>
              <EditorialText variant="eyebrow">{openingReflection.eyebrow}</EditorialText>
              <EditorialText className="mt-9" id="house-opening-reflection-title" variant="lead">
                {openingReflection.heading}
              </EditorialText>
              <EditorialText className="mt-12 max-w-2xl" variant="body">
                {openingReflection.body}
              </EditorialText>
            </MotionReveal>
            <HorizonLine className="mt-14" />
          </EditorialContainer>
        </SectionSpacing>

        <EditorialMediaStory
          body={
            <>
              <EditorialText variant="body">{sharedLiving.body}</EditorialText>
              <div className="mt-8">
                <EditorialLink href="/rooms" label="See the rooms" />
              </div>
            </>
          }
          className="bg-surface-soft"
          eyebrow={sharedLiving.eyebrow}
          heading={sharedLiving.heading}
          headingId="house-shared-living-title"
          media={sharedLiving.media}
          spacing="compact"
        />

        <section aria-labelledby="house-view-title">
          <EditorialFigure
            caption={view.caption}
            captionAlignment="end"
            captionContainer="wide"
            media={view.media}
          />
          <SectionSpacing as="div" size="compact">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  {view.eyebrow}
                </EditorialText>
                <MotionReveal
                  className="lg:col-span-7 lg:col-start-4"
                  delay="short"
                  direction="right"
                >
                  <EditorialText headingSize="small" id="house-view-title" variant="heading">
                    {view.heading}
                  </EditorialText>
                  <EditorialText className="mt-10 max-w-2xl" variant="body">
                    {view.body}
                  </EditorialText>
                </MotionReveal>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        </section>

        <SectionSpacing
          aria-labelledby="house-indoor-outdoor-title"
          className="bg-surface-soft"
          size="compact"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                {indoorOutdoor.eyebrow}
              </EditorialText>
              <MotionReveal
                className="lg:col-span-8 lg:col-start-3"
                delay="short"
                direction="right"
              >
                <EditorialText
                  className="max-w-4xl"
                  headingSize="medium"
                  id="house-indoor-outdoor-title"
                  variant="heading"
                >
                  {indoorOutdoor.heading}
                </EditorialText>
                <EditorialText className="mt-11 max-w-2xl" variant="body">
                  {indoorOutdoor.body}
                </EditorialText>
              </MotionReveal>
            </EditorialGrid>

            <EditorialPhotoEssay
              className="mt-16 sm:mt-24"
              items={indoorOutdoor.items}
              layout="staggered"
            />
          </EditorialContainer>
        </SectionSpacing>

        {dailyRhythms ? (
          <SectionSpacing
            aria-labelledby="house-daily-rhythms-title"
            className="bg-inverse-surface"
            size="generous"
          >
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
                  {dailyRhythms.eyebrow}
                </EditorialText>
                <MotionReveal
                  className="lg:col-span-8 lg:col-start-3"
                  delay="short"
                  direction="right"
                >
                  <EditorialText
                    className="max-w-4xl"
                    headingSize="medium"
                    id="house-daily-rhythms-title"
                    tone="inverse"
                    variant="heading"
                  >
                    {dailyRhythms.heading}
                  </EditorialText>
                  <EditorialText className="mt-11 max-w-2xl" tone="inverse" variant="body">
                    {dailyRhythms.body}
                  </EditorialText>
                </MotionReveal>
              </EditorialGrid>

              <EditorialPhotoEssay
                className="mt-16 sm:mt-24"
                items={dailyRhythms.items}
                layout="sequence"
              />
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        {houseSystems.length > 0 ? (
          <SectionSpacing aria-labelledby="house-systems-title" size="compact">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  House systems
                </EditorialText>
                <MotionReveal className="lg:col-span-7 lg:col-start-4" delay="short">
                  <EditorialText headingSize="small" id="house-systems-title" variant="heading">
                    How the house works, quietly in the background.
                  </EditorialText>
                  <EditorialAmenityList className="mt-12 max-w-2xl" items={houseSystems} />
                </MotionReveal>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        {materials ? (
          <SectionSpacing aria-labelledby="house-materials-title" size="generous">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  {materials.eyebrow}
                </EditorialText>
                <MotionReveal
                  className="lg:col-span-8 lg:col-start-3"
                  delay="short"
                  direction="right"
                >
                  <EditorialText
                    className="max-w-4xl"
                    headingSize="medium"
                    id="house-materials-title"
                    variant="heading"
                  >
                    {materials.heading}
                  </EditorialText>
                  {materials.body ? (
                    <EditorialText className="mt-11 max-w-2xl" variant="body">
                      {materials.body}
                    </EditorialText>
                  ) : null}
                </MotionReveal>
              </EditorialGrid>

              <HouseMaterialsList
                aria-label="Verified material stories"
                className="mt-16 sm:mt-24 lg:ml-[16.666667%]"
                items={materials.items}
              />
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <SectionSpacing aria-label="Final reflection" className="bg-surface-soft" size="compact">
          <EditorialContainer size="reading">
            <MotionReveal>
              <EditorialText variant="lead">{finalReflection.body}</EditorialText>
            </MotionReveal>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
