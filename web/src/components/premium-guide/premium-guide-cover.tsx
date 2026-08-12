import Image from 'next/image'

import {EditorialContainer, EditorialText} from '@/components/editorial'
import {HorizonLine} from '@/components/motion'

type PremiumGuideCoverProps = {
  edition: string
  introduction: string
  statusLabel?: string
  title: string
}

export function PremiumGuideCover({
  edition,
  introduction,
  statusLabel,
  title,
}: PremiumGuideCoverProps) {
  return (
    <header className="relative isolate flex min-h-[min(94svh,64rem)] items-end overflow-hidden bg-inverse-surface text-inverse">
      <Image
        alt="Concept landscape combining a stream, rice fields, mountains, sea and distant islands."
        className="object-cover object-center"
        fill
        priority
        sizes="100vw"
        src="/images/premium-guide/cover/southern-negros-cover-concept-v1.png"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,27,24,0.08)_0%,rgba(20,27,24,0.22)_38%,rgba(20,27,24,0.88)_100%)]"
      />

      <EditorialContainer className="relative z-10 pb-16 sm:pb-20 lg:pb-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-x-12 xl:gap-x-20">
          <div className="lg:col-span-8">
            <p className="font-body text-[0.6875rem] font-semibold tracking-[0.28em] text-inverse/72 uppercase">
              {edition}
            </p>
            <h1 className="mt-7 max-w-5xl text-balance font-display text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.84] font-medium tracking-[-0.045em]">
              {title}
            </h1>
          </div>

          <div className="max-w-md lg:col-span-4 lg:pb-2">
            <HorizonLine tone="inverse" />
            <EditorialText className="mt-7 text-inverse/78" tone="inverse" variant="body">
              {introduction}
            </EditorialText>
            {statusLabel ? (
              <p className="mt-9 font-body text-[0.6875rem] font-semibold tracking-[0.2em] text-inverse/58 uppercase">
                {statusLabel}
              </p>
            ) : null}
          </div>
        </div>
      </EditorialContainer>
    </header>
  )
}
