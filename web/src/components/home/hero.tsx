import type {ImageProps} from 'next/image'
import Image from 'next/image'

import {ActionLink} from '@/components/ui/action-link'

type HeroAction = {
  href: string
  label: string
}

type HeroImage = {
  alt: string
  src: ImageProps['src']
}

type HeroProps = {
  description: string
  eyebrow: string
  image?: HeroImage
  primaryAction: HeroAction
  secondaryAction: HeroAction
  title: string
}

function HeroMedia({image}: {image?: HeroImage}) {
  if (image) {
    return (
      <Image alt={image.alt} className="object-cover" fill preload sizes="100vw" src={image.src} />
    )
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_76%_30%,rgba(106,142,161,0.22),transparent_36%),linear-gradient(142deg,var(--jp-color-forest)_0%,var(--jp-color-charcoal)_56%,var(--jp-color-evening)_100%)]"
    >
      <div className="absolute top-[18%] -right-[6%] h-[58%] w-[62%] bg-[linear-gradient(132deg,rgba(246,242,235,0.035),rgba(246,242,235,0.008))] [clip-path:polygon(22%_0,100%_0,82%_100%,0_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_top,rgba(18,18,18,0.24),transparent)]" />
    </div>
  )
}

export function Hero({
  description,
  eyebrow,
  image,
  primaryAction,
  secondaryAction,
  title,
}: HeroProps) {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-evening text-linen"
    >
      <HeroMedia image={image} />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,18,18,0.76)_0%,rgba(18,18,18,0.5)_48%,rgba(18,18,18,0.16)_78%,rgba(18,18,18,0.28)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(18,18,18,0.58),transparent)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-end px-6 pt-32 pb-24 sm:px-8 md:px-10 md:pt-40 md:pb-28 lg:pb-32">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold tracking-[0.24em] text-linen/80 uppercase">
            {eyebrow}
          </p>
          <h1
            className="mt-7 max-w-4xl font-display text-[3.375rem] leading-[0.9] font-medium tracking-[-0.035em] text-linen sm:text-[4rem] md:text-[5.25rem] lg:text-[7rem]"
            id="home-hero-title"
          >
            {title}
          </h1>
          <p className="mt-8 max-w-xl font-body text-base leading-8 text-linen/85 md:mt-10 md:text-lg">
            {description}
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <ActionLink href={primaryAction.href}>{primaryAction.label}</ActionLink>
            <ActionLink href={secondaryAction.href} variant="secondary">
              {secondaryAction.label}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  )
}
