import Link from 'next/link'

import {EditorialContainer, EditorialText} from '@/components/editorial'
import {HorizonLine} from '@/components/motion'

type PremiumChapterDividerProps = {
  introduction: string
  number: string
  title: string
}

export function PremiumChapterDivider({
  introduction,
  number,
  title,
}: PremiumChapterDividerProps) {
  return (
    <header className="bg-inverse-surface text-inverse">
      <EditorialContainer className="flex min-h-[72svh] flex-col justify-between py-32 sm:py-40">
        <div className="flex items-center justify-between gap-6">
          <EditorialText className="text-inverse/60" tone="inverse" variant="eyebrow">
            Chapter {number}
          </EditorialText>
          <Link
            className="rounded-sm font-body text-xs tracking-[0.08em] text-inverse/65 uppercase underline decoration-inverse/25 underline-offset-4 hover:text-inverse focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
            href="/premium-guide"
          >
            Edition 01 contents
          </Link>
        </div>
        <div className="max-w-5xl">
          <HorizonLine tone="inverse" />
          <h1 className="mt-10 text-balance font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] tracking-[-0.04em]">
            {title}
          </h1>
          <EditorialText className="mt-10 max-w-2xl text-inverse/72" tone="inverse" variant="lead">
            {introduction}
          </EditorialText>
        </div>
      </EditorialContainer>
    </header>
  )
}
