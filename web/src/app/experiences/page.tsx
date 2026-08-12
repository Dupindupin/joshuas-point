import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialMedia,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {
  ExperiencePreview,
  type ExperiencePreviewData,
} from '@/components/experiences/experience-preview'
import {SiteHeader} from '@/components/site/site-header'

export const metadata: Metadata = {
  title: "Experiences | Joshua's Point",
  description: 'Journeys through the sea, mountains, islands, forests, and communities nearby.',
}

const experiences = [
  {
    description:
      'A low island across the water, approached slowly as the color and depth of the sea begin to change.',
    href: '/experiences/danjugan-island',
    id: 'danjugan-island',
    name: 'Danjugan Island',
    tone: 'morning',
  },
  {
    description:
      'Below the surface, light moves across coral, sand, and open water in a landscape with its own quiet pace.',
    href: '/experiences/coral-reef',
    id: 'coral-reef',
    name: 'Coral Reef',
    tone: 'stone',
  },
  {
    description:
      'Roads rise away from the coast through cultivated land, forest edges, and changing mountain weather.',
    href: '/experiences/mountain-roads',
    id: 'mountain-roads',
    name: 'Mountain Roads',
    tone: 'stone',
  },
  {
    description:
      'Before plans begin, there is coffee, moving air, and the first light reaching the rooms from the sea.',
    href: '/experiences/quiet-mornings',
    id: 'quiet-mornings',
    name: 'Quiet Mornings',
    tone: 'morning',
  },
] satisfies readonly ExperiencePreviewData[]

export default function ExperiencesPage() {
  notFound()

  return (
    <>
      <SiteHeader activeHref="/experiences" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Experiences"
          introduction="Journeys shaped by water, weather, distance, and the people who know this landscape well."
          title="A wider landscape"
        />

        <SectionSpacing aria-labelledby="why-this-place-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Why this place
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="small"
                id="why-this-place-title"
                variant="heading"
              >
                A place to begin from.
              </EditorialText>
              <EditorialText
                className="max-w-xl lg:col-span-5 lg:col-start-7 lg:row-start-2 lg:mt-12"
                variant="body"
              >
                Joshua’s Point is a starting point for discovering sea, mountains, islands, forests,
                and local communities. The experience of this landscape lives in the movement
                between them, and in the quiet intervals along the way.
              </EditorialText>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="featured-experiences-title" size="generous">
          <EditorialContainer>
            <EditorialGrid>
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Field notes
              </EditorialText>
              <EditorialText
                className="max-w-3xl lg:col-span-8 lg:col-start-3"
                headingSize="medium"
                id="featured-experiences-title"
                variant="heading"
              >
                Four ways of seeing the landscape.
              </EditorialText>
            </EditorialGrid>

            <div className="mt-16 sm:mt-20">
              {experiences.map((experience, index) => (
                <SectionSpacing as="div" key={experience.id} size="standard">
                  <ExperiencePreview
                    experience={experience}
                    layout={index % 2 === 0 ? 'wide-left' : 'portrait-right'}
                  />
                </SectionSpacing>
              ))}
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="The coast beyond Joshua’s Point" size="standard">
          <figure>
            <EditorialMedia ratio="panoramic" sizes="100vw" />
            <EditorialContainer>
              <EditorialText as="figcaption" className="mt-4 max-w-sm lg:ml-auto" variant="caption">
                The coast continues beyond the ridge in long changes of light and weather.
              </EditorialText>
            </EditorialContainer>
          </figure>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="slow-travel-title"
          className="bg-inverse-surface"
          size="immersive"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
                Slow travel
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="medium"
                id="slow-travel-title"
                tone="inverse"
                variant="heading"
              >
                Leave room for the unplanned.
              </EditorialText>
              <EditorialText
                className="max-w-xl lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:mt-14"
                tone="inverse"
                variant="body"
              >
                Moving slowly allows a place to become more than a list of attractions. It means
                staying long enough to notice a changing tide, follow a road without urgency, and
                understand a landscape through the lives unfolding within it.
              </EditorialText>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="Closing reflection" size="immersive">
          <EditorialContainer>
            <EditorialGrid>
              <EditorialText className="max-w-3xl lg:col-span-8 lg:col-start-3" variant="lead">
                The days remembered most clearly are often the ones that were given enough time.
              </EditorialText>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
