import Link from 'next/link'

import {EditorialMedia, EditorialText, type EditorialImage} from '@/components/editorial'
import {MotionReveal} from '@/components/motion'

type PremiumJourneyCardProps = {
  href: string
  image?: EditorialImage
  imagePosition?: string
  number: string
  route: string
  summary: string
  title: string
}

export function PremiumJourneyCard({
  href,
  image,
  imagePosition,
  number,
  route,
  summary,
  title,
}: PremiumJourneyCardProps) {
  return (
    <MotionReveal as="article" className="group min-w-0">
      <Link
        className="block rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-focus"
        href={href}
      >
        <EditorialMedia
          image={image}
          imageClassName="transition-transform duration-[900ms] ease-[var(--jp-ease-natural)] group-hover:scale-[1.015]"
          objectPosition={imagePosition}
          ratio="landscape"
          sizes="(min-width: 1024px) 42vw, 100vw"
          tone={number === '01' ? 'stone' : 'morning'}
        />
        <div className="border-b border-border py-7 sm:py-9">
          <div className="flex items-baseline justify-between gap-6">
            <p className="font-body text-[0.6875rem] font-semibold tracking-[0.2em] text-ink-subtle uppercase">
              Journey {number}
            </p>
            <span className="font-body text-xs text-ink-subtle">Open journey →</span>
          </div>
          <EditorialText as="h3" className="mt-5" headingSize="small" variant="heading">
            {title}
          </EditorialText>
          <p className="mt-5 max-w-xl font-body text-xs leading-6 tracking-[0.04em] text-ink-subtle uppercase">
            {route}
          </p>
          <EditorialText className="mt-6 max-w-xl" variant="body">
            {summary}
          </EditorialText>
        </div>
      </Link>
    </MotionReveal>
  )
}
