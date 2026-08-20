type EditorialPageHeroProps = {
  eyebrow: string
  introduction?: string
  motion?: boolean
  size?: 'compact' | 'focused' | 'standard'
  title: string
}

export function EditorialPageHero({
  eyebrow,
  introduction,
  motion = false,
  size = 'standard',
  title,
}: EditorialPageHeroProps) {
  const headerClasses =
    size === 'focused'
      ? 'px-6 pt-32 pb-10 sm:px-8 sm:pt-36 sm:pb-12 md:px-10 lg:pt-32 lg:pb-10'
      : size === 'compact'
        ? 'px-6 pt-40 pb-16 sm:px-8 sm:pt-44 sm:pb-20 md:px-10 lg:pt-48 lg:pb-24'
        : 'px-6 pt-48 pb-24 sm:px-8 sm:pt-52 sm:pb-32 md:px-10 lg:pt-60 lg:pb-36'
  const titleClasses =
    size === 'compact' || size === 'focused'
      ? 'text-[clamp(3rem,14vw,4.25rem)] sm:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem]'
      : 'text-[clamp(3rem,15vw,4.25rem)] sm:text-[5.5rem] lg:text-[7.75rem] xl:text-[9rem]'
  const introductionClasses =
    size === 'focused' ? 'mt-8 lg:mt-10' : size === 'compact' ? 'mt-10 lg:mt-14' : 'mt-14 lg:mt-20'

  return (
    <header className={`bg-canvas text-ink ${headerClasses}`}>
      <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20">
        <p
          className={`${motion ? 'jp-hero-enter' : ''} font-body text-xs font-semibold tracking-[0.26em] text-ink-subtle uppercase lg:col-span-2`}
          data-motion-delay={motion ? 'short' : undefined}
        >
          {eyebrow}
        </p>
        <h1
          className={`${motion ? 'jp-hero-enter' : ''} mt-8 min-w-0 max-w-full text-balance font-display leading-[0.84] font-medium tracking-[-0.045em] lg:col-span-10 lg:col-start-3 lg:mt-0 ${titleClasses}`}
          data-motion-delay={motion ? 'medium' : undefined}
        >
          {title}
        </h1>
        {introduction ? (
          <p
            className={`${motion ? 'jp-hero-enter' : ''} max-w-lg text-pretty font-body text-base leading-8 text-ink-muted sm:text-lg sm:leading-9 lg:col-span-5 lg:col-start-8 lg:row-start-2 ${introductionClasses}`}
            data-motion-delay={motion ? 'long' : undefined}
          >
            {introduction}
          </p>
        ) : null}
      </div>
    </header>
  )
}
