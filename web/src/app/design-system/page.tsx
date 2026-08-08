import type {Metadata} from 'next'

import {ColorSwatch} from '@/components/design-system/color-swatch'
import {DesignSystemSection} from '@/components/design-system/design-system-section'
import {Button} from '@/components/ui/button'
import {SurfaceCard} from '@/components/ui/surface-card'
import {brandBodyFontName, brandDisplayFontName} from '@/styles/fonts'

export const metadata: Metadata = {
  title: "Design System | Joshua's Point",
  description: "Internal design reference for Joshua's Point.",
  robots: {
    follow: false,
    index: false,
  },
}

const sections = [
  ['typography', 'Typography'],
  ['colors', 'Color palette'],
  ['spacing', 'Spacing'],
  ['buttons', 'Buttons'],
  ['cards', 'Cards'],
  ['morning', 'Morning'],
  ['evening', 'Evening'],
  ['motion', 'Motion'],
] as const

const spacingTokens = [
  {
    label: 'Small',
    token: '--jp-space-xs',
    value: '8px',
    width: 'w-[var(--jp-space-xs)]',
  },
  {
    label: 'Base',
    token: '--jp-space-sm',
    value: '16px',
    width: 'w-[var(--jp-space-sm)]',
  },
  {
    label: 'Medium',
    token: '--jp-space-md',
    value: '24px',
    width: 'w-[var(--jp-space-md)]',
  },
  {
    label: 'Large',
    token: '--jp-space-lg',
    value: '48px',
    width: 'w-[var(--jp-space-lg)]',
  },
  {
    label: 'Section',
    token: '--jp-space-xl',
    value: '96px',
    width: 'w-[var(--jp-space-xl)]',
  },
  {
    label: 'Chapter',
    token: '--jp-space-2xl',
    value: '160px',
    width: 'w-[var(--jp-space-2xl)]',
  },
] as const

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-atmosphere-canvas font-body text-atmosphere-text">
      <header className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-bold tracking-[0.18em] text-atmosphere-text uppercase">
              Joshua&apos;s Point
            </p>
            <p className="rounded-full border border-atmosphere-border px-3 py-1.5 text-[0.625rem] font-medium tracking-[0.1em] text-atmosphere-subtle uppercase">
              Internal reference · v1.0
            </p>
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:items-end">
            <div>
              <p className="mb-6 text-sm text-atmosphere-subtle">Living design reference</p>
              <h1 className="max-w-4xl font-display text-6xl leading-[0.9] font-medium tracking-[-0.035em] text-atmosphere-text sm:text-7xl md:text-8xl">
                Quiet by design.
              </h1>
            </div>
            <p className="max-w-lg text-base leading-8 text-atmosphere-muted md:text-lg">
              The shared visual language for an experience where architecture frames nature,
              photography leads, and every interface detail creates room to breathe.
            </p>
          </div>
        </div>
      </header>

      <nav
        aria-label="Design system sections"
        className="sticky top-0 z-20 border-y border-atmosphere-border bg-atmosphere-canvas px-6 md:px-10"
      >
        <ul className="mx-auto flex max-w-7xl gap-7 overflow-x-auto py-3 text-sm lg:grid lg:grid-cols-8 lg:gap-6">
          {sections.map(([href, label], index) => (
            <li className="shrink-0" key={href}>
              <a
                className="group inline-flex min-h-10 items-center gap-2 text-atmosphere-muted underline-offset-4 hover:text-atmosphere-text hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-atmosphere-brand"
                href={`#${href}`}
              >
                <span aria-hidden="true" className="text-xs text-atmosphere-brand">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <DesignSystemSection
          description="Display type carries the atmosphere. Body type stays warm, legible, and almost invisible. Two families only."
          id="typography"
          index="01 / Foundations"
          title="Typography"
        >
          <div className="space-y-8">
            <SurfaceCard>
              <p className="text-xs font-semibold tracking-[0.18em] text-atmosphere-subtle uppercase">
                Display · {brandDisplayFontName}
              </p>
              <p className="mt-8 max-w-3xl font-display text-5xl leading-[0.98] tracking-[-0.025em] md:text-7xl">
                Morning begins quietly.
              </p>
              <p className="mt-8 max-w-xl font-display text-3xl leading-tight md:text-4xl">
                A place where architecture meets nature.
              </p>
            </SurfaceCard>

            <SurfaceCard>
              <p className="text-xs font-semibold tracking-[0.18em] text-atmosphere-subtle uppercase">
                Body · {brandBodyFontName}
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <p className="max-w-[68ch] text-lg leading-8">
                  Open the doors and let the morning in. The house follows the land, making room for
                  sea air, changing light, and long conversations around the table.
                </p>
                <div className="space-y-4 text-sm leading-6 text-atmosphere-muted">
                  <p className="font-semibold text-atmosphere-text">Interface and details</p>
                  <p>Readable at every size. Generous line height. Short, honest sentences.</p>
                  <p className="text-xs tracking-[0.16em] uppercase">Small label · 12 / 16</p>
                </div>
              </div>
            </SurfaceCard>
          </div>
        </DesignSystemSection>

        <DesignSystemSection
          description="Colors are drawn from linen, timber, stone, forest, ocean, and evening light. Nature should always remain more colorful than the interface."
          id="colors"
          index="02 / Foundations"
          title="Color palette"
        >
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ColorSwatch
              className="bg-linen"
              hex="#F6F2EB"
              name="Warm Linen"
              usage="Primary canvas and reading surfaces."
            />
            <ColorSwatch
              className="bg-charcoal"
              hex="#242424"
              name="Deep Charcoal"
              usage="Primary text and architectural contrast."
            />
            <ColorSwatch
              className="bg-timber"
              hex="#A56F3A"
              name="Warm Timber"
              usage="Brand accent; never normal-size text on Linen."
            />
            <ColorSwatch
              className="bg-stone"
              hex="#B7B0A6"
              name="Stone"
              usage="Supporting borders, dividers, and surfaces."
            />
            <ColorSwatch
              className="bg-forest"
              hex="#405548"
              name="Forest"
              usage="Accessible natural accent used sparingly."
            />
            <ColorSwatch
              className="bg-ocean"
              hex="#6A8EA1"
              name="Ocean"
              usage="Atmospheric accent; not normal-size text on Linen."
            />
          </ul>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-atmosphere-muted">
            Accessibility note: Warm Timber, Ocean, and Stone do not meet AA contrast for
            normal-size text on Warm Linen. Their use is limited to accents and non-text detail.
          </p>
        </DesignSystemSection>

        <DesignSystemSection
          description="Space is part of the architecture. The scale supports small interface details through generous chapter transitions."
          id="spacing"
          index="03 / Foundations"
          title="Spacing"
        >
          <div className="overflow-hidden rounded-2xl border border-atmosphere-border bg-atmosphere-surface-soft">
            <dl className="divide-y divide-atmosphere-border">
              {spacingTokens.map(({label, token, value, width}) => (
                <div
                  className="grid items-center gap-4 p-5 sm:grid-cols-[7rem_8rem_1fr]"
                  key={token}
                >
                  <dt className="font-semibold">{label}</dt>
                  <dd className="font-mono text-xs text-atmosphere-subtle">{value}</dd>
                  <dd className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`h-3 rounded-full bg-atmosphere-brand ${width}`}
                    />
                    <code className="hidden text-xs text-atmosphere-subtle md:inline">{token}</code>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </DesignSystemSection>

        <DesignSystemSection
          description="Actions are calm, direct, and comfortably sized. Hierarchy comes from contrast and restraint rather than urgency."
          id="buttons"
          index="04 / Components"
          title="Buttons"
        >
          <SurfaceCard>
            <div className="flex flex-wrap items-center gap-4">
              <Button>Plan your stay</Button>
              <Button variant="secondary">Explore the house</Button>
              <Button variant="quiet">Read the story</Button>
              <Button disabled>Unavailable</Button>
            </div>
            <p className="mt-9 max-w-2xl text-sm leading-7 text-atmosphere-muted">
              The primary action uses Deep Charcoal for accessible contrast, with Warm Timber
              reserved for the focus treatment. Every button has a minimum 48px target height.
            </p>
          </SurfaceCard>
        </DesignSystemSection>

        <DesignSystemSection
          description="Cards hold stories, not decoration. They use quiet borders, generous padding, and a clear content hierarchy."
          id="cards"
          index="05 / Components"
          title="Cards"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <SurfaceCard className="flex min-h-80 flex-col justify-between">
              <p className="text-xs font-semibold tracking-[0.16em] text-atmosphere-accent uppercase">
                The house
              </p>
              <div>
                <h3 className="font-display text-4xl leading-tight">Made for the landscape.</h3>
                <p className="mt-5 max-w-md text-base leading-8 text-atmosphere-muted">
                  Long roof lines, warm timber, and open rooms frame the sea and mountains beyond.
                </p>
              </div>
            </SurfaceCard>

            <article className="group overflow-hidden rounded-2xl bg-charcoal text-linen">
              <div
                aria-hidden="true"
                className="h-48 bg-[linear-gradient(135deg,var(--jp-color-forest),var(--jp-color-ocean))] opacity-80"
              />
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.16em] text-evening-accent uppercase">
                  Nearby
                </p>
                <h3 className="mt-4 font-display text-3xl">A slower way to discover.</h3>
                <p className="mt-3 text-sm leading-6 text-linen/75">
                  An image-led editorial card with one clear story and no visual noise.
                </p>
              </div>
            </article>
          </div>
        </DesignSystemSection>

        <DesignSystemSection
          description="Morning feels open, hopeful, and naturally warm—like the first coffee on the deck before the day begins."
          id="morning"
          index="06 / Atmosphere"
          title="Morning"
        >
          <article className="overflow-hidden rounded-3xl border border-stone/60 bg-linen">
            <div className="grid min-h-[30rem] lg:grid-cols-2">
              <div className="flex flex-col justify-between p-8 md:p-12">
                <p className="text-xs font-semibold tracking-[0.18em] text-forest uppercase">
                  Morning atmosphere
                </p>
                <div>
                  <h3 className="max-w-lg font-display text-5xl leading-none md:text-6xl">
                    The day arrives gently.
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-7 text-charcoal/70">
                    Warm linen, quiet shadows, and enough space for the landscape to remain the
                    loudest thing in the room.
                  </p>
                </div>
              </div>
              <div aria-hidden="true" className="relative min-h-72 overflow-hidden bg-ocean/30">
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-forest/80 [clip-path:polygon(0_62%,28%_24%,52%_48%,75%_12%,100%_38%,100%_100%,0_100%)]" />
                <div className="absolute top-12 right-12 size-24 rounded-full bg-[#ead6ad] blur-sm" />
              </div>
            </div>
          </article>
        </DesignSystemSection>

        <DesignSystemSection
          description="Evening is intimate and reflective. It uses warm darkness, soft copper, and an even quieter visual rhythm."
          id="evening"
          index="07 / Atmosphere"
          title="Evening"
        >
          <article className="overflow-hidden rounded-3xl bg-evening text-evening-text">
            <div className="grid min-h-[30rem] lg:grid-cols-2">
              <div
                aria-hidden="true"
                className="relative min-h-72 overflow-hidden bg-evening-surface"
              >
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-ocean/30 [clip-path:polygon(0_48%,25%_28%,48%_62%,72%_34%,100%_52%,100%_100%,0_100%)]" />
                <div className="absolute top-16 left-16 size-3 rounded-full bg-evening-accent shadow-[0_0_32px_12px_rgba(200,154,100,0.35)]" />
              </div>
              <div className="flex flex-col justify-between p-8 md:p-12">
                <p className="text-xs font-semibold tracking-[0.18em] text-evening-accent uppercase">
                  Evening atmosphere
                </p>
                <div>
                  <h3 className="max-w-lg font-display text-5xl leading-none md:text-6xl">
                    Stay a little longer.
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-7 text-evening-text/70">
                    Deep charcoal, warm ivory, and soft copper recall dinner on the deck and
                    reflections moving across the pool.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </DesignSystemSection>

        <DesignSystemSection
          description="Motion will support the story through restrained fades and short travel. This reference intentionally remains static until motion patterns are approved."
          id="motion"
          index="08 / Motion"
          title="Motion preview"
        >
          <div className="rounded-2xl border border-dashed border-atmosphere-border bg-atmosphere-surface-soft p-8 md:p-12">
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <span aria-hidden="true" className="mb-8 block h-px w-24 bg-atmosphere-brand" />
              <p className="font-display text-4xl">Reserved for motion studies.</p>
              <p className="mt-5 max-w-lg text-sm leading-7 text-atmosphere-muted">
                Future previews will document fade, short slide, scene transition, easing, duration,
                and reduced-motion behavior.
              </p>
              <span className="mt-9 rounded-full border border-atmosphere-border px-4 py-2 text-xs font-semibold tracking-[0.14em] text-atmosphere-subtle uppercase">
                Placeholder only
              </span>
            </div>
          </div>
        </DesignSystemSection>
      </div>

      <footer className="border-t border-atmosphere-border px-6 py-14 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 text-sm text-atmosphere-subtle">
          <p>Internal developer reference. Not part of the public website.</p>
          <p>Joshua&apos;s Point Design System · Living document</p>
        </div>
      </footer>
    </main>
  )
}
