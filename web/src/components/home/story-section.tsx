import type {ImageProps} from 'next/image'
import Image from 'next/image'

type StoryImage = {
  alt: string
  src: ImageProps['src']
}

type StorySectionProps = {
  caption: string
  eyebrow: string
  heading: string
  id?: string
  image?: StoryImage
  paragraph: string
}

export function StorySection({
  caption,
  eyebrow,
  heading,
  id = 'home-story',
  image,
  paragraph,
}: StorySectionProps) {
  const headingId = `${id}-title`

  return (
    <section aria-labelledby={headingId} className="bg-linen text-charcoal" id={id}>
      <div className="mx-auto grid w-full max-w-7xl gap-16 px-6 py-24 sm:px-8 sm:py-28 md:px-10 lg:grid-cols-12 lg:gap-12 lg:py-40 xl:gap-20">
        <div className="max-w-xl lg:col-span-5">
          <p className="font-body text-xs font-semibold tracking-[0.24em] text-charcoal/60 uppercase">
            {eyebrow}
          </p>
          <h2
            className="mt-7 max-w-lg font-display text-[3rem] leading-[0.98] font-medium tracking-[-0.03em] text-charcoal sm:text-[3.75rem] lg:text-[4.5rem]"
            id={headingId}
          >
            {heading}
          </h2>
          <p className="mt-10 max-w-[34rem] font-body text-base leading-8 text-charcoal/75 sm:text-lg sm:leading-9 lg:mt-12">
            {paragraph}
          </p>
        </div>

        <figure className="lg:col-span-7">
          <div className="relative aspect-[3/2] overflow-hidden bg-[radial-gradient(circle_at_78%_24%,rgba(246,242,235,0.72),transparent_34%),linear-gradient(145deg,rgba(183,176,166,0.5)_0%,rgba(106,142,161,0.22)_48%,rgba(64,85,72,0.3)_100%)]">
            {image ? (
              <Image
                alt={image.alt}
                className="object-cover"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                src={image.src}
              />
            ) : null}
          </div>
          <figcaption className="mt-4 max-w-xl font-body text-[0.8125rem] leading-5 text-charcoal/65">
            {caption}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
