type EditorialPageHeroProps = {
  eyebrow: string
  introduction?: string
  title: string
}

export function EditorialPageHero({eyebrow, introduction, title}: EditorialPageHeroProps) {
  return (
    <header className="bg-linen px-6 pt-48 pb-24 text-charcoal sm:px-8 sm:pt-52 sm:pb-32 md:px-10 lg:pt-60 lg:pb-36">
      <div className="mx-auto grid w-full max-w-7xl lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20">
        <p className="font-body text-xs font-semibold tracking-[0.26em] text-charcoal/60 uppercase lg:col-span-2">
          {eyebrow}
        </p>
        <h1 className="mt-8 font-display text-[4.25rem] leading-[0.84] font-medium tracking-[-0.045em] sm:text-[5.5rem] lg:col-span-10 lg:col-start-3 lg:mt-0 lg:text-[7.75rem] xl:text-[9rem]">
          {title}
        </h1>
        {introduction ? (
          <p className="mt-14 max-w-lg font-body text-base leading-8 text-charcoal/72 sm:text-lg sm:leading-9 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:mt-20">
            {introduction}
          </p>
        ) : null}
      </div>
    </header>
  )
}
