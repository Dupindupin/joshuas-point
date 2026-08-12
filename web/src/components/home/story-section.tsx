import type {ImageProps} from 'next/image'
import Image from 'next/image'

import {EditorialLink} from '@/components/editorial'
import {HorizonLine, MotionReveal} from '@/components/motion'

type StoryImage = {
  alt: string
  blurDataURL?: string
  src: ImageProps['src']
}

type StorySectionProps = {
  caption?: string
  eyebrow: string
  heading: string
  id?: string
  image?: StoryImage
  link?: {
    href: string
    label: string
  }
  paragraph: string
  showHorizon?: boolean
}

export function StorySection({
  caption,
  eyebrow,
  heading,
  id = 'home-story',
  image,
  link,
  paragraph,
  showHorizon = false,
}: StorySectionProps) {
  const headingId = `${id}-title`

  return (
    <section aria-labelledby={headingId} className="bg-canvas text-ink" id={id}>
      <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-24 sm:px-8 sm:py-28 md:px-10 lg:grid-cols-12 lg:gap-12 lg:py-40 xl:gap-20">
        <div className="max-w-xl lg:col-span-5">
          <MotionReveal>
            <p className="font-body text-xs font-semibold tracking-[0.24em] text-ink/60 uppercase">
              {eyebrow}
            </p>
          </MotionReveal>
          <MotionReveal delay="short" direction="right">
            <h2
              className="mt-7 max-w-lg font-display text-[3rem] leading-[0.98] font-medium tracking-[-0.03em] text-ink sm:text-[3.75rem] lg:text-[4.5rem]"
              id={headingId}
            >
              {heading}
            </h2>
          </MotionReveal>
          <MotionReveal delay="medium">
            <p className="mt-10 max-w-[34rem] font-body text-base leading-8 text-ink/75 sm:text-lg sm:leading-9 lg:mt-12">
              {paragraph}
            </p>
            {link ? (
              <div className="mt-8">
                <EditorialLink href={link.href} label={link.label} />
              </div>
            ) : null}
          </MotionReveal>
          {showHorizon ? <HorizonLine className="mt-12" /> : null}
        </div>

        <MotionReveal as="figure" className="lg:col-span-7" delay="short">
          <div className="relative aspect-[3/2] overflow-hidden bg-[radial-gradient(circle_at_78%_24%,rgba(246,242,235,0.72),transparent_34%),linear-gradient(145deg,rgba(183,176,166,0.5)_0%,rgba(106,142,161,0.22)_48%,rgba(64,85,72,0.3)_100%)]">
            {image ? (
              <Image
                alt={image.alt}
                blurDataURL={image.blurDataURL}
                className="object-cover"
                fill
                placeholder={image.blurDataURL ? 'blur' : 'empty'}
                sizes="(min-width: 1024px) 58vw, 100vw"
                src={image.src}
              />
            ) : null}
          </div>
          {caption ? (
            <figcaption className="mt-4 max-w-xl font-body text-[0.8125rem] leading-5 text-ink/65">
              {caption}
            </figcaption>
          ) : null}
        </MotionReveal>
      </div>
    </section>
  )
}
