import {EditorialContainer, EditorialText} from '@/components/editorial'
import {HorizonLine} from '@/components/motion'

type PremiumChapterDividerProps = {
  introduction: string
  number: string
  title: string
}

export function PremiumChapterDivider({introduction, number, title}: PremiumChapterDividerProps) {
  return (
    <header className="bg-inverse-surface pt-[4.5rem] text-inverse">
      <EditorialContainer className="flex min-h-[min(76svh,52rem)] flex-col justify-end py-20 sm:py-28 lg:py-32">
        <div className="max-w-5xl">
          <EditorialText className="text-inverse/60" tone="inverse" variant="eyebrow">
            Chapter {number} · Southern Negros Explorer
          </EditorialText>
          <HorizonLine tone="inverse" />
          <h1 className="mt-10 max-w-[12ch] text-balance font-display text-[clamp(3.25rem,9vw,7.25rem)] leading-[0.9] tracking-[-0.04em]">
            {title}
          </h1>
          <EditorialText className="mt-10 max-w-2xl text-inverse/76" tone="inverse" variant="lead">
            {introduction}
          </EditorialText>
        </div>
      </EditorialContainer>
    </header>
  )
}
