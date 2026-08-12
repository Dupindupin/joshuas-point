import type {Metadata} from 'next'
import Link from 'next/link'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {EditorialShare} from '@/components/share'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {getPublishedDestinations} from '@/sanity/queries/destinations'
import {getPublishedDiveSites} from '@/sanity/queries/dive-sites'
import {getPublishedScenicRoutes} from '@/sanity/queries/scenic-routes'
import type {PublishedDestination} from '@/sanity/types'

type Collection = {
  description: string
  id: string
  title: string
  types: readonly string[]
}

const collections: readonly Collection[] = [
  {
    description:
      'Places where water, forest and the effort of reaching them shape the whole experience.',
    id: 'waterfalls',
    title: 'Waterfalls',
    types: ['waterfall'],
  },
  {
    description:
      'Still water, rainforest and mountain outlooks on the quieter roads away from the coast.',
    id: 'mountains-and-lakes',
    title: 'Mountains & Lakes',
    types: ['lake', 'nature', 'viewpoint'],
  },
  {
    description:
      'Coastal and highland towns understood through coffee, markets, streets and everyday life.',
    id: 'cities-and-culture',
    title: 'Cities & Culture',
    types: ['coffee', 'culture', 'restaurant', 'town'],
  },
  {
    description: 'Island and shoreline places where the journey follows the Bohol Sea.',
    id: 'sea-and-islands',
    title: 'Sea & Islands',
    types: ['beach', 'island'],
  },
] as const

export function generateMetadata(): Promise<Metadata> {
  const title = `Southern Negros Explorer | Joshua's Point`
  const description =
    'Places and scenic journeys we recommend from Joshua’s Point, gathered into a guide for exploring Southern Negros slowly.'

  return createPageMetadata({
    description,
    pathname: '/guide',
    title,
  })
}

function DestinationCollection({
  collection,
  destinations,
}: {
  collection: Collection
  destinations: PublishedDestination[]
}) {
  const items = destinations.filter((destination) =>
    destination.destinationType ? collection.types.includes(destination.destinationType) : false,
  )
  if (items.length === 0) return null

  return (
    <section aria-labelledby={`${collection.id}-title`} id={collection.id}>
      <EditorialGrid gap="generous">
        <EditorialText className="lg:col-span-2" variant="eyebrow">
          Collection
        </EditorialText>
        <div className="lg:col-span-8 lg:col-start-4">
          <EditorialText
            as="h2"
            headingSize="medium"
            id={`${collection.id}-title`}
            variant="heading"
          >
            {collection.title}
          </EditorialText>
          <EditorialText className="mt-8 max-w-2xl" variant="body">
            {collection.description}
          </EditorialText>
          <ul className="mt-12 border-t border-ink/15 sm:mt-16">
            {items.map((destination) => (
              <li className="border-b border-ink/15" key={destination._id}>
                <Link
                  className="group grid min-h-24 gap-3 rounded-sm py-6 sm:grid-cols-[minmax(12rem,0.75fr)_minmax(18rem,1.25fr)] sm:items-baseline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                  href={`/destinations/${encodeURIComponent(destination.slug)}`}
                >
                  <span className="font-display text-2xl leading-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                    {destination.title}
                  </span>
                  <span className="max-w-xl font-body text-sm leading-7 text-ink/68">
                    {destination.editorialIntroduction}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </EditorialGrid>
    </section>
  )
}

export default async function GuidePage() {
  const [destinations, diveSites, routes] = await Promise.all([
    getPublishedDestinations(),
    getPublishedDiveSites(),
    getPublishedScenicRoutes(),
  ])

  return (
    <>
      <SiteHeader activeHref="/guide" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Southern Negros Explorer"
          introduction="Places and journeys we return to, beginning at Joshua’s Point and moving slowly through the coast and highlands."
          title="A guide for going slowly."
        />

        <SectionSpacing aria-labelledby="guide-purpose-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                The region
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="small"
                id="guide-purpose-title"
                variant="heading"
              >
                Mountains fall toward the Bohol Sea.
              </EditorialText>
              <div className="space-y-7 lg:col-span-5 lg:col-start-7 lg:row-start-2 lg:mt-14">
                <EditorialText variant="body">
                  From Joshua’s Point, one road follows the coast while others turn toward forest,
                  waterfalls, lakes and cooler mountain air. Dumaguete lies to the north; Siaton and
                  the quieter southern hills lie in the other direction.
                </EditorialText>
                <EditorialText variant="body">
                  This guide brings together the places we recommend and the roads we use to reach
                  them. It is not a list to complete. Choose what fits the day and leave time for
                  the journey itself.
                </EditorialText>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="Destination collections" size="generous">
          <EditorialContainer className="space-y-32 sm:space-y-40 lg:space-y-52">
            {collections.map((collection) => (
              <DestinationCollection
                collection={collection}
                destinations={destinations}
                key={collection.id}
              />
            ))}
          </EditorialContainer>
        </SectionSpacing>

        {routes.length > 0 ? (
          <SectionSpacing
            aria-labelledby="guide-routes-title"
            className="bg-inverse-surface"
            id="scenic-routes"
            size="generous"
          >
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
                  Scenic routes
                </EditorialText>
                <div className="lg:col-span-8 lg:col-start-4">
                  <EditorialText
                    as="h2"
                    headingSize="medium"
                    id="guide-routes-title"
                    tone="inverse"
                    variant="heading"
                  >
                    Let the road shape the day.
                  </EditorialText>
                  <EditorialText
                    className="mt-8 max-w-2xl text-inverse/70"
                    tone="inverse"
                    variant="body"
                  >
                    These five journeys begin at Joshua’s Point and follow the coast and highlands
                    along roads we know and return to.
                  </EditorialText>
                  <ul className="mt-12 border-t border-inverse/18 sm:mt-16">
                    {routes.map((route) => (
                      <li className="border-b border-inverse/18" key={route._id}>
                        <Link
                          className="group grid min-h-24 gap-3 rounded-sm py-6 sm:grid-cols-[minmax(12rem,0.75fr)_minmax(18rem,1.25fr)] sm:items-baseline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
                          href={`/scenic-routes/${encodeURIComponent(route.slug)}`}
                        >
                          <span className="font-display text-2xl leading-tight text-inverse transition-colors group-hover:text-evening-accent sm:text-3xl">
                            {route.title}
                          </span>
                          <span className="max-w-xl font-body text-sm leading-7 text-inverse/68">
                            {route.editorialIntroduction}
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

        {diveSites.length > 0 ? (
          <SectionSpacing aria-labelledby="guide-diving-title" id="diving" size="generous">
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  Dive Guide
                </EditorialText>
                <div className="lg:col-span-8 lg:col-start-4">
                  <EditorialText
                    as="h2"
                    headingSize="medium"
                    id="guide-diving-title"
                    variant="heading"
                  >
                    Three ways below the surface.
                  </EditorialText>
                  <EditorialText className="mt-8 max-w-2xl" variant="body">
                    Apo Island, Dauin and Zamboanguita sit close to one another, but each asks for a
                    different kind of attention in the water.
                  </EditorialText>
                  <ul className="mt-12 border-t border-ink/15 sm:mt-16">
                    {diveSites.map((diveSite) => (
                      <li className="border-b border-ink/15" key={diveSite._id}>
                        <Link
                          className="group grid min-h-24 gap-3 rounded-sm py-6 sm:grid-cols-[minmax(12rem,0.75fr)_minmax(18rem,1.25fr)] sm:items-baseline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                          href={`/dive-sites/${encodeURIComponent(diveSite.slug)}`}
                        >
                          <span className="font-display text-2xl leading-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                            {diveSite.name}
                          </span>
                          <span className="max-w-xl font-body text-sm leading-7 text-ink/68">
                            {diveSite.excerpt}
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

        <EditorialShare pathname="/guide" title="Southern Negros Explorer" />

        <SectionSpacing aria-label="Closing reflection" size="immersive">
          <EditorialContainer>
            <EditorialGrid>
              <EditorialText className="max-w-4xl lg:col-span-9 lg:col-start-3" variant="lead">
                The best day is not always the one that covers the most ground. Sometimes it is one
                road, one place and enough time to notice what changes along the way.
              </EditorialText>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
