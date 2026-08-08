import type {Metadata} from 'next'

import {EditorialMedia} from '@/components/editorial/editorial-media'
import {EditorialPageHero} from '@/components/editorial/editorial-page-hero'
import {SiteHeader} from '@/components/site/site-header'

export const metadata: Metadata = {
  title: "The House | Joshua's Point",
  description: 'An architectural home shaped by the ridge, the sea, and the changing light.',
}

const materials = [
  {
    description: 'Warm grain softens the geometry and holds the color of the morning.',
    name: 'Timber',
    position: 'md:ml-0',
  },
  {
    description: 'A quiet weight underfoot, connecting each room back to the ridge.',
    name: 'Stone',
    position: 'md:ml-[18%]',
  },
  {
    description: 'Filtered, reflected, and allowed to change the character of the rooms.',
    name: 'Light',
    position: 'md:ml-[7%]',
  },
  {
    description: 'Moving freely through open rooms, carrying weather into everyday life.',
    name: 'Air',
    position: 'md:ml-[28%]',
  },
] as const

export default function TheHousePage() {
  return (
    <>
      <SiteHeader activeHref="/the-house" appearance="solid" />
      <main className="bg-linen">
        <EditorialPageHero
          eyebrow="Architecture"
          introduction="A home shaped by the ridge, the sea, and the changing conditions between them."
          title="The House"
        />

        <section
          aria-labelledby="house-introduction-title"
          className="px-6 pt-24 pb-28 sm:px-8 sm:pt-32 sm:pb-36 md:px-10 lg:pt-40 lg:pb-52"
        >
          <div className="mx-auto max-w-2xl">
            <h2
              className="font-display text-[2.75rem] leading-[1.05] font-medium tracking-[-0.025em] text-charcoal sm:text-[3.5rem]"
              id="house-introduction-title"
            >
              Architecture that begins with attention.
            </h2>
            <p className="mt-10 max-w-xl font-body text-base leading-8 text-charcoal/75 sm:text-lg sm:leading-9 lg:mt-12">
              Joshua’s Point follows the land rather than correcting it. Rooms unfold along the
              slope, opening to weather, shade, and the long horizon of the Bohol Sea.
            </p>
          </div>
        </section>

        <section aria-label="The house and its setting" className="pb-32 sm:pb-40 lg:pb-52">
          <figure>
            <EditorialMedia ratio="panoramic" sizes="100vw" />
            <div className="mx-auto grid w-full max-w-7xl px-6 sm:px-8 md:px-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20">
              <figcaption className="mt-4 max-w-sm font-body text-[0.8125rem] leading-6 text-charcoal/65 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
                The main living space opens across the ridge toward the morning horizon.
              </figcaption>
            </div>
          </figure>
        </section>

        <section
          aria-labelledby="architecture-story-title"
          className="px-6 py-28 sm:px-8 sm:py-36 md:px-10 lg:py-52"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20">
            <figure className="lg:col-span-7 lg:row-span-2">
              <EditorialMedia ratio="portrait" sizes="(min-width: 1024px) 58vw, 100vw" tone="stone" />
              <figcaption className="mt-4 max-w-sm font-body text-[0.8125rem] leading-6 text-charcoal/65">
                Deep shade and open thresholds temper the heat throughout the day.
              </figcaption>
            </figure>

            <div className="max-w-xl lg:col-span-4 lg:col-start-9 lg:pt-28">
              <p className="font-body text-xs font-semibold tracking-[0.26em] text-charcoal/60 uppercase">
                The architecture
              </p>
              <h2
                className="mt-7 font-display text-[3rem] leading-[0.98] font-medium tracking-[-0.03em] text-charcoal sm:text-[4rem]"
                id="architecture-story-title"
              >
                Drawn from its site.
              </h2>
              <p className="mt-10 font-body text-base leading-8 text-charcoal/75 sm:text-lg sm:leading-9 lg:mt-12">
                Walls frame rather than contain. Rooflines extend into shade, thresholds remain
                open, and each room keeps a direct relationship with the landscape beyond it.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="materials-title"
          className="bg-charcoal px-6 py-32 text-linen sm:px-8 sm:py-40 md:px-10 lg:py-52"
        >
          <div className="mx-auto w-full max-w-5xl">
            <p className="font-body text-xs font-semibold tracking-[0.26em] text-linen/60 uppercase">
              Materials
            </p>
            <h2
              className="mt-7 max-w-3xl font-display text-[3rem] leading-[0.98] font-medium tracking-[-0.03em] sm:text-[4.5rem]"
              id="materials-title"
            >
              Four elements, held in balance.
            </h2>

            <dl className="mt-24 space-y-20 sm:mt-32 sm:space-y-24">
              {materials.map((material) => (
                <div className={`max-w-2xl ${material.position}`} key={material.name}>
                  <dt className="font-display text-[3.25rem] leading-none font-medium tracking-[-0.025em] sm:text-[4rem]">
                    {material.name}
                  </dt>
                  <dd className="mt-5 max-w-md font-body text-sm leading-7 text-linen/70 sm:text-base sm:leading-8">
                    {material.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-label="Final reflection" className="px-6 py-36 sm:px-8 sm:py-44 md:px-10 lg:py-60">
          <p className="mx-auto max-w-3xl font-display text-[2.25rem] leading-[1.16] font-medium tracking-[-0.02em] text-charcoal sm:text-[3rem]">
            The house is most itself when the doors are open, the weather is moving through, and
            the horizon becomes part of the room.
          </p>
        </section>
      </main>
    </>
  )
}
