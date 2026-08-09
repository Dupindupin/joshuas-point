import type {Metadata} from 'next'

import {
  EditorialContainer,
  EditorialFigure,
  EditorialGrid,
  EditorialMediaStory,
  EditorialPageHero,
  EditorialPhotoEssay,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {HouseMaterialsList} from '@/components/house'
import {SiteHeader} from '@/components/site/site-header'

import {housePageData} from './house-page-data'

export const metadata: Metadata = {
  title: "The House | Joshua's Point",
  description:
    'An editorial introduction to Joshua’s Point through nature, shared spaces, and the changing day.',
}

export default function TheHousePage() {
  const {
    dailyRhythms,
    finalReflection,
    hero,
    indoorOutdoor,
    materials,
    openingReflection,
    sharedLiving,
    view,
  } = housePageData

  return (
    <>
      <SiteHeader activeHref="/the-house" appearance="solid" />
      <main className="bg-linen">
        <EditorialPageHero
          eyebrow={hero.eyebrow}
          introduction={hero.introduction}
          title={hero.title}
        />

        <SectionSpacing as="div" axis="bottom" size="generous">
          <EditorialFigure media={hero.media} />
        </SectionSpacing>

        <SectionSpacing aria-labelledby="house-opening-reflection-title" size="generous">
          <EditorialContainer size="reading">
            <EditorialText variant="eyebrow">{openingReflection.eyebrow}</EditorialText>
            <EditorialText className="mt-9" id="house-opening-reflection-title" variant="lead">
              {openingReflection.heading}
            </EditorialText>
            <EditorialText className="mt-12 max-w-2xl" variant="body">
              {openingReflection.body}
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>

        <EditorialMediaStory
          body={<EditorialText variant="body">{sharedLiving.body}</EditorialText>}
          className="bg-stone/20"
          eyebrow={sharedLiving.eyebrow}
          heading={sharedLiving.heading}
          headingId="house-shared-living-title"
          media={sharedLiving.media}
          spacing="immersive"
        />

        <section aria-labelledby="house-view-title">
          <EditorialFigure
            caption={view.caption}
            captionAlignment="end"
            captionContainer="wide"
            media={view.media}
          />
          <SectionSpacing as="div" size="generous">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  {view.eyebrow}
                </EditorialText>
                <div className="lg:col-span-7 lg:col-start-4">
                  <EditorialText headingSize="small" id="house-view-title" variant="heading">
                    {view.heading}
                  </EditorialText>
                  <EditorialText className="mt-10 max-w-2xl" variant="body">
                    {view.body}
                  </EditorialText>
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        </section>

        <SectionSpacing
          aria-labelledby="house-indoor-outdoor-title"
          className="bg-stone/20"
          size="immersive"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                {indoorOutdoor.eyebrow}
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-3">
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
              </div>
            </EditorialGrid>

            <EditorialPhotoEssay
              className="mt-24 sm:mt-32"
              items={indoorOutdoor.items}
              layout="staggered"
            />
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="house-daily-rhythms-title"
          className="bg-charcoal"
          size="immersive"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
                {dailyRhythms.eyebrow}
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-3">
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
              </div>
            </EditorialGrid>

            <EditorialPhotoEssay
              className="mt-24 sm:mt-32"
              items={dailyRhythms.items}
              layout="sequence"
            />
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="house-materials-title" size="immersive">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                {materials.eyebrow}
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-3">
                <EditorialText
                  className="max-w-4xl"
                  headingSize="medium"
                  id="house-materials-title"
                  variant="heading"
                >
                  {materials.heading}
                </EditorialText>
                <EditorialText className="mt-11 max-w-2xl" variant="body">
                  {materials.body}
                </EditorialText>
                <aside
                  aria-label="Material verification status"
                  className="mt-10 max-w-2xl border-l border-charcoal/25 pl-5 sm:pl-6"
                >
                  <p className="font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-timber uppercase">
                    Verification pending
                  </p>
                  <p className="mt-3 font-body text-sm leading-7 text-charcoal/65">
                    {materials.verificationNote}
                  </p>
                </aside>
              </div>
            </EditorialGrid>

            <HouseMaterialsList
              aria-label="Verified material stories"
              className="mt-24 sm:mt-32 lg:ml-[16.666667%]"
              items={materials.items}
            />
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="Final reflection" className="bg-stone/20" size="immersive">
          <EditorialContainer size="reading">
            <EditorialText variant="lead">{finalReflection.body}</EditorialText>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
