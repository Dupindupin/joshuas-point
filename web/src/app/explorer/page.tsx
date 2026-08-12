import type {Metadata} from 'next'
import Link from 'next/link'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {ExplorerMapExperience} from '@/components/explorer/explorer-map-experience'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {getExplorerItems} from '@/sanity/queries/explorer'

export function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    description:
      'A visual guide connecting Joshua’s Point with destinations, scenic routes and dive guides across Southern Negros.',
    pathname: '/explorer',
    title: "Explorer Map | Joshua's Point",
  })
}

export default async function ExplorerPage() {
  const items = await getExplorerItems()

  return (
    <>
      <SiteHeader activeHref="/explorer" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Southern Negros"
          introduction="A visual companion to the places, roads and waters in the Joshua’s Point guide. Begin with what interests you, then follow the full story."
          title="The Explorer."
        />

        <SectionSpacing aria-labelledby="explorer-introduction-title" size="standard">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                From here
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-4">
                <EditorialText
                  as="h2"
                  headingSize="medium"
                  id="explorer-introduction-title"
                  variant="heading"
                >
                  One place can lead naturally to another.
                </EditorialText>
                <EditorialText className="mt-8 max-w-2xl" variant="body">
                  The map brings together the parts of Southern Negros we have already written
                  about. It is a way to understand their relationship, not a list to complete.
                </EditorialText>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        {items.length > 0 ? (
          <SectionSpacing aria-label="Joshua’s Point Explorer map and guide" size="generous">
            <EditorialContainer>
              <ExplorerMapExperience items={items} />
            </EditorialContainer>
          </SectionSpacing>
        ) : (
          <SectionSpacing aria-labelledby="explorer-unavailable-title" size="generous">
            <EditorialContainer size="reading">
              <EditorialText
                as="h2"
                headingSize="small"
                id="explorer-unavailable-title"
                variant="heading"
              >
                The guide remains available without the map.
              </EditorialText>
              <EditorialText className="mt-7" variant="body">
                Browse the{' '}
                <Link
                  className="rounded-sm underline decoration-ink/35 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                  href="/guide"
                >
                  Southern Negros guide
                </Link>{' '}
                while the Explorer data is unavailable.
              </EditorialText>
            </EditorialContainer>
          </SectionSpacing>
        )}

        <SectionSpacing aria-labelledby="explorer-guide-title" size="generous">
          <EditorialContainer>
            <EditorialGrid>
              <div className="lg:col-span-8 lg:col-start-3">
                <EditorialText
                  as="h2"
                  headingSize="small"
                  id="explorer-guide-title"
                  variant="heading"
                >
                  Continue with the stories behind the map.
                </EditorialText>
                <EditorialText className="mt-7 max-w-2xl" variant="body">
                  The{' '}
                  <Link
                    className="rounded-sm underline decoration-ink/35 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                    href="/guide"
                  >
                    Southern Negros Explorer guide
                  </Link>{' '}
                  gathers the places and journeys into a slower editorial view of the region.
                </EditorialText>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
