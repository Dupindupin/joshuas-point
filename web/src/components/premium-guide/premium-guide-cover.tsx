import Image from 'next/image'

import {EditorialContainer, EditorialText} from '@/components/editorial'
import {HorizonLine} from '@/components/motion'
import {BrandLogo} from '@/components/site/brand-logo'

type PremiumGuideCoverProps = {
  author: string
  edition: string
  introduction: string
  title: string
}

export function PremiumGuideCover({author, edition, introduction, title}: PremiumGuideCoverProps) {
  return (
    <header className="relative isolate flex min-h-[min(94svh,64rem)] items-end overflow-hidden bg-inverse-surface text-inverse">
      <Image
        alt="The landscape and sea seen from Joshua’s Point."
        className="object-cover object-center"
        fill
        priority
        sizes="100vw"
        src="/images/home/hero/4F003BED-1A9C-412A-9137-BEE683305BF5_1_105_c.jpeg"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,27,24,0.08)_0%,rgba(20,27,24,0.22)_38%,rgba(20,27,24,0.88)_100%)]"
      />

      <EditorialContainer className="relative z-10 flex min-h-[min(94svh,64rem)] flex-col justify-between py-8 sm:py-10 lg:py-12">
        <div className="flex items-center justify-between gap-8">
          <BrandLogo className="h-auto w-44 sm:w-52" priority tone="inverse" />
          <p className="text-right font-body text-[0.625rem] font-semibold tracking-[0.2em] text-inverse/70 uppercase">
            {edition}
          </p>
        </div>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-x-12 xl:gap-x-20">
          <div className="lg:col-span-8">
            <p className="font-body text-[0.6875rem] font-semibold tracking-[0.22em] text-inverse/72 uppercase">
              Southern Negros Explorer
            </p>
            <h1 className="mt-6 max-w-5xl text-balance font-display text-[clamp(3.35rem,10vw,8rem)] leading-[0.87] font-medium tracking-[-0.04em]">
              {title}
            </h1>
          </div>

          <div className="max-w-md lg:col-span-4 lg:pb-2">
            <HorizonLine tone="inverse" />
            <EditorialText className="mt-7 text-inverse/78" tone="inverse" variant="body">
              {introduction}
            </EditorialText>
            <p className="mt-9 font-body text-[0.6875rem] font-semibold tracking-[0.2em] text-inverse/70 uppercase">
              By {author}
            </p>
          </div>
        </div>
      </EditorialContainer>
    </header>
  )
}
