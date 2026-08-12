import type {ImageProps} from 'next/image'
import Image from 'next/image'

import {MotionReveal} from '@/components/motion'

type NarrativeImage = {
  alt: string
  blurDataURL?: string
  src: ImageProps['src']
}

type ImageNarrativeSectionProps = {
  caption?: string
  eyebrow: string
  heading: string
  id?: string
  image?: NarrativeImage
  paragraph: string
}

export function ImageNarrativeSection({
  caption,
  eyebrow,
  heading,
  id = 'home-image-narrative',
  image,
  paragraph,
}: ImageNarrativeSectionProps) {
  const headingId = `${id}-title`

  return (
    <section
      aria-labelledby={headingId}
      className="bg-canvas pt-24 pb-32 text-ink sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48"
      id={id}
    >
      <MotionReveal as="figure">
        <div className="relative aspect-[16/10] min-h-[26rem] w-full overflow-hidden bg-[radial-gradient(circle_at_72%_18%,rgba(246,242,235,0.82),transparent_30%),linear-gradient(148deg,rgba(106,142,161,0.58)_0%,rgba(183,176,166,0.72)_48%,rgba(64,85,72,0.78)_100%)] sm:min-h-[36rem] lg:min-h-[52rem]">
          {image ? (
            <Image
              alt={image.alt}
              blurDataURL={image.blurDataURL}
              className="object-cover"
              fill
              placeholder={image.blurDataURL ? 'blur' : 'empty'}
              sizes="100vw"
              src={image.src}
            />
          ) : null}
        </div>

        {caption ? (
          <div className="mx-auto grid w-full max-w-7xl px-6 sm:px-8 md:px-10 lg:grid-cols-12 lg:gap-12 xl:gap-20">
            <figcaption className="mt-4 max-w-sm font-body text-[0.8125rem] leading-6 text-ink/65 lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              {caption}
            </figcaption>
          </div>
        ) : null}
      </MotionReveal>

      <div className="mx-auto grid w-full max-w-7xl pt-24 px-6 sm:px-8 sm:pt-28 md:px-10 lg:grid-cols-12 lg:gap-x-12 lg:pt-36 xl:gap-x-20">
        <MotionReveal className="lg:col-span-2">
          <p className="font-body text-xs font-semibold tracking-[0.26em] text-ink/60 uppercase">
            {eyebrow}
          </p>
        </MotionReveal>
        <MotionReveal
          className="mt-7 max-w-4xl lg:col-span-8 lg:col-start-3 lg:mt-0"
          delay="short"
          direction="right"
        >
          <h2
            className="font-display text-[3rem] leading-[0.98] font-medium tracking-[-0.03em] text-ink sm:text-[4rem] lg:text-[5rem]"
            id={headingId}
          >
            {heading}
          </h2>
        </MotionReveal>
        <MotionReveal
          className="mt-10 max-w-xl lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:mt-16"
          delay="medium"
        >
          <p className="font-body text-base leading-8 text-ink/75 sm:text-lg sm:leading-9">
            {paragraph}
          </p>
        </MotionReveal>
      </div>
    </section>
  )
}
