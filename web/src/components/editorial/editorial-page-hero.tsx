type EditorialPageHeroProps = {
  eyebrow: string
  introduction?: string
  motion?: boolean
  title: string
}

export function EditorialPageHero({
  eyebrow,
  introduction,
  motion = false,
  title,
}: EditorialPageHeroProps) {
  return (
    <header className="bg-canvas px-6 pt-48 pb-24 text-ink sm:px-8 sm:pt-52 sm:pb-32 md:px-10 lg:pt-60 lg:pb-36">
      <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20">
        <p
          className={`${motion ? 'jp-hero-enter' : ''} font-body text-xs font-semibold tracking-[0.26em] text-ink-subtle uppercase lg:col-span-2`}
          data-motion-delay={motion ? 'short' : undefined}
        >
          {eyebrow}
        </p>
        <h1
          className={`${motion ? 'jp-hero-enter' : ''} mt-8 min-w-0 max-w-full text-balance font-display text-[clamp(3rem,15vw,4.25rem)] leading-[0.84] font-medium tracking-[-0.045em] sm:text-[5.5rem] lg:col-span-10 lg:col-start-3 lg:mt-0 lg:text-[7.75rem] xl:text-[9rem]`}
          data-motion-delay={motion ? 'medium' : undefined}
        >
          {title}
        </h1>
        {introduction ? (
          <p
            className={`${motion ? 'jp-hero-enter' : ''} mt-14 max-w-lg text-pretty font-body text-base leading-8 text-ink-muted sm:text-lg sm:leading-9 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:mt-20`}
            data-motion-delay={motion ? 'long' : undefined}
          >
            {introduction}
          </p>
        ) : null}
      </div>
    </header>
  )
}
