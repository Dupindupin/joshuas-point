type TypographySpecimenProps = {
  character: string
  displayFontClass: string
  id: string
  index: string
  name: string
}

export function TypographySpecimen({
  character,
  displayFontClass,
  id,
  index,
  name,
}: TypographySpecimenProps) {
  return (
    <section aria-labelledby={`${id}-title`} className="border-t border-border/70 py-24 md:py-32">
      <header className="flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-base font-semibold tracking-[-0.01em] text-ink" id={`${id}-title`}>
          {name}
        </h2>
        <p className="text-xs tracking-[0.16em] text-ink/50 uppercase">Specimen {index}</p>
      </header>

      <div className="mt-16">
        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
          Negros Oriental · Philippines
        </p>

        <h3
          className={`mt-8 max-w-5xl text-6xl leading-[0.9] font-normal tracking-[-0.035em] text-ink sm:text-7xl md:text-8xl ${displayFontClass}`}
        >
          Where the mountains meet the sea.
        </h3>

        <p className="mt-10 max-w-2xl text-lg leading-8 text-ink/70">
          Joshua&apos;s Point is a quiet house shaped by the landscape—a place for slow mornings,
          changing light, and time together above the Bohol Sea.
        </p>

        <div className="mt-24 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h4
              className={`max-w-xl text-4xl leading-[1.02] font-normal tracking-[-0.025em] text-ink md:text-5xl ${displayFontClass}`}
            >
              A place shaped by light.
            </h4>
          </div>
          <p className="max-w-[65ch] text-base leading-8 text-ink/70">
            The house follows the ridge rather than competing with it. Timber, concrete, and open
            rooms frame the forest, mountains, and sea, allowing each hour to bring a different
            atmosphere indoors.
          </p>
        </div>

        <blockquote className="mt-24 max-w-4xl border-l border-timber pl-8 md:pl-12">
          <p
            className={`text-3xl leading-[1.15] font-normal tracking-[-0.015em] text-ink md:text-4xl ${displayFontClass}`}
          >
            “The house does not ask for attention. It simply makes room for everything around it.”
          </p>
        </blockquote>

        <p className="mt-16 text-sm leading-6 text-ink/55">
          Early light across the deck, looking toward the Bohol Sea.
        </p>
      </div>

      <aside aria-label={`${name} character note`} className="mt-20 border-t border-border/70 pt-8">
        <p className="max-w-3xl text-sm leading-7 text-ink/65">
          <span className="font-semibold text-ink">Character:</span> {character}
        </p>
      </aside>
    </section>
  )
}
