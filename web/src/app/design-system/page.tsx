import type {Metadata} from 'next'

import {ColorSwatch} from '@/components/design-system/color-swatch'
import {DesignSystemSection} from '@/components/design-system/design-system-section'
import {Button} from '@/components/ui/button'
import {SurfaceCard} from '@/components/ui/surface-card'
import {ThemeControl} from '@/components/theme/theme-control'
import {HorizonLine, MotionReveal} from '@/components/motion'
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
  ['theme', 'Theme'],
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
    <main className="min-h-screen bg-canvas font-body text-ink">
      <header className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-bold tracking-[0.18em] text-ink uppercase">
              Joshua&apos;s Point
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <ThemeControl />
              <p className="rounded-full border border-border px-3 py-1.5 text-[0.625rem] font-medium tracking-[0.1em] text-ink-subtle uppercase">
                Internal reference · v2.0
              </p>
            </div>
          </div>

          <div className="mt-20 grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:items-end">
            <div>
              <p className="mb-6 text-sm text-ink-subtle">Living design reference</p>
              <h1 className="max-w-4xl font-display text-6xl leading-[0.9] font-medium tracking-[-0.035em] text-ink sm:text-7xl md:text-8xl">
                Quiet by design.
              </h1>
            </div>
            <p className="max-w-lg text-base leading-8 text-ink-muted md:text-lg">
              The shared visual language for an experience where architecture frames nature,
              photography leads, and every interface detail creates room to breathe.
            </p>
          </div>
        </div>
      </header>

      <nav
        aria-label="Design system sections"
        className="sticky top-0 z-20 border-y border-border bg-canvas px-6 md:px-10"
      >
        <ul className="mx-auto flex max-w-7xl gap-7 overflow-x-auto py-3 text-sm lg:grid lg:grid-cols-9 lg:gap-6">
          {sections.map(([href, label], index) => (
            <li className="shrink-0" key={href}>
              <a
                className="group inline-flex min-h-10 items-center gap-2 text-ink-muted underline-offset-4 hover:text-ink hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                href={`#${href}`}
              >
                <span aria-hidden="true" className="text-xs text-accent">
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
              <p className="text-xs font-semibold tracking-[0.18em] text-ink-subtle uppercase">
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
              <p className="text-xs font-semibold tracking-[0.18em] text-ink-subtle uppercase">
                Body · {brandBodyFontName}
              </p>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <p className="max-w-[68ch] text-lg leading-8">
                  Open the doors and let the morning in. The house follows the land, making room for
                  sea air, changing light, and long conversations around the table.
                </p>
                <div className="space-y-4 text-sm leading-6 text-ink-muted">
                  <p className="font-semibold text-ink">Interface and details</p>
                  <p>Readable at every size. Generous line height. Short, honest sentences.</p>
                  <p className="text-xs tracking-[0.16em] uppercase">Small label · 12 / 16</p>
                </div>
              </div>
            </SurfaceCard>
          </div>
        </DesignSystemSection>

        <DesignSystemSection
          description="Colors are drawn from linen, warm sand, stone, forest, deep ocean, and charcoal. Nature should always remain more colorful than the interface."
          id="colors"
          index="02 / Foundations"
          title="Color palette"
        >
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ColorSwatch
              className="bg-[var(--jp-color-linen)]"
              hex="#F3EDE6"
              name="Linen"
              usage="Primary canvas and reading surfaces."
            />
            <ColorSwatch
              className="bg-[var(--jp-color-charcoal)]"
              hex="#282828"
              name="Charcoal"
              usage="Primary text and architectural contrast."
            />
            <ColorSwatch
              className="bg-timber"
              hex="#C8A26A"
              name="Warm Sand"
              usage="Brand accent; never normal-size text on Linen."
            />
            <ColorSwatch
              className="bg-stone"
              hex="#B7B0A6"
              name="Stone"
              usage="Supporting borders, dividers, and surfaces."
            />
            <ColorSwatch
              className="bg-[var(--jp-color-forest)]"
              hex="#496B5B"
              name="Forest"
              usage="Accessible natural accent used sparingly."
            />
            <ColorSwatch
              className="bg-ocean"
              hex="#1F3D3A"
              name="Deep Ocean"
              usage="Architectural contrast and primary action colour."
            />
          </ul>
          <p className="mt-7 max-w-3xl text-sm leading-7 text-ink-muted">
            Accessibility note: Warm Sand and Stone are reserved for accents and non-text detail.
            Deep Ocean and Forest support accessible text and action contrast on Linen.
          </p>
          <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Canvas', '--jp-color-canvas', 'Warm linen / warm charcoal'],
              ['Ink', '--jp-color-ink', 'Deep charcoal / warm ivory'],
              ['Muted ink', '--jp-color-ink-muted', 'Theme-aware reading tone'],
              ['Accent', '--jp-color-accent', 'Forest / warm timber'],
            ].map(([role, token, value]) => (
              <div key={token}>
                <dt className="text-xs font-semibold tracking-[0.16em] text-ink-subtle uppercase">
                  {role}
                </dt>
                <dd className="mt-2 text-sm text-ink">{value}</dd>
                <dd className="mt-1 font-mono text-[0.6875rem] text-ink-subtle">{token}</dd>
              </div>
            ))}
          </dl>
        </DesignSystemSection>

        <DesignSystemSection
          description="System follows the visitor's device. A deliberate Light or Dark choice persists without changing the editorial hierarchy or the photography."
          id="theme"
          index="03 / Foundations"
          title="Theme"
        >
          <div className="space-y-8">
            <div>
              <ThemeControl />
              <p className="mt-4 max-w-2xl text-sm leading-7 text-ink-muted">
                The control is keyboard accessible and communicates its selected state through
                native radio semantics as well as contrast. Use Tab, then the arrow keys, to move
                between choices.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {(['light', 'dark'] as const).map((theme) => (
                <article
                  className="rounded-2xl border border-border bg-canvas p-7 text-ink md:p-9"
                  data-theme={theme}
                  key={theme}
                >
                  <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                    {theme} palette
                  </p>
                  <h3 className="mt-12 font-display text-4xl leading-none tracking-[-0.025em]">
                    Quiet, not neutral.
                  </h3>
                  <p className="mt-5 max-w-md text-sm leading-7 text-ink-muted">
                    Canvas, surface, ink, border, and accent roles change together. Photography
                    remains untouched.
                  </p>
                  <div className="mt-10 grid grid-cols-3 gap-3" aria-label={`${theme} surfaces`}>
                    <div className="h-16 rounded-lg border border-border bg-surface" />
                    <div className="h-16 rounded-lg border border-border bg-surface-soft" />
                    <div className="h-16 rounded-lg bg-surface-deep" />
                  </div>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </DesignSystemSection>

        <DesignSystemSection
          description="Space is part of the architecture. The scale supports small interface details through generous chapter transitions."
          id="spacing"
          index="04 / Foundations"
          title="Spacing"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-surface-soft">
            <dl className="divide-y divide-border">
              {spacingTokens.map(({label, token, value, width}) => (
                <div
                  className="grid items-center gap-4 p-5 sm:grid-cols-[7rem_8rem_1fr]"
                  key={token}
                >
                  <dt className="font-semibold">{label}</dt>
                  <dd className="font-mono text-xs text-ink-subtle">{value}</dd>
                  <dd className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={`h-3 rounded-full bg-accent ${width}`}
                    />
                    <code className="hidden text-xs text-ink-subtle md:inline">{token}</code>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </DesignSystemSection>

        <DesignSystemSection
          description="Actions are calm, direct, and comfortably sized. Hierarchy comes from contrast and restraint rather than urgency."
          id="buttons"
          index="05 / Components"
          title="Buttons"
        >
          <SurfaceCard>
            <div className="flex flex-wrap items-center gap-4">
              <Button>Plan your stay</Button>
              <Button variant="secondary">Explore the house</Button>
              <Button variant="quiet">Read the story</Button>
              <Button disabled>Unavailable</Button>
            </div>
            <p className="mt-9 max-w-2xl text-sm leading-7 text-ink-muted">
              The primary action uses semantic Ink for accessible contrast, while Focus adapts
              from forest to warm gold. Every button has a minimum 48px target height.
            </p>
          </SurfaceCard>
        </DesignSystemSection>

        <DesignSystemSection
          description="Cards hold stories, not decoration. They use quiet borders, generous padding, and a clear content hierarchy."
          id="cards"
          index="06 / Components"
          title="Cards"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <SurfaceCard className="flex min-h-80 flex-col justify-between">
              <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
                The house
              </p>
              <div>
                <h3 className="font-display text-4xl leading-tight">Made for the landscape.</h3>
                <p className="mt-5 max-w-md text-base leading-8 text-ink-muted">
                  Long roof lines, warm timber, and open rooms frame the sea and mountains beyond.
                </p>
              </div>
            </SurfaceCard>

            <article className="group overflow-hidden rounded-2xl bg-inverse-surface text-inverse">
              <div
                aria-hidden="true"
                className="h-48 bg-[linear-gradient(135deg,var(--jp-color-forest),var(--jp-color-ocean))] opacity-80"
              />
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.16em] text-evening-accent uppercase">
                  Nearby
                </p>
                <h3 className="mt-4 font-display text-3xl">A slower way to discover.</h3>
                <p className="mt-3 text-sm leading-6 text-inverse/75">
                  An image-led editorial card with one clear story and no visual noise.
                </p>
              </div>
            </article>
          </div>
        </DesignSystemSection>

        <DesignSystemSection
          description="Morning feels open, hopeful, and naturally warm—like the first coffee on the deck before the day begins."
          id="morning"
          index="07 / Atmosphere"
          title="Morning"
        >
          <article
            className="overflow-hidden rounded-3xl border border-border/60 bg-canvas text-ink"
            data-theme="light"
          >
            <div className="grid min-h-[30rem] lg:grid-cols-2">
              <div className="flex flex-col justify-between p-8 md:p-12">
                <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                  Morning atmosphere
                </p>
                <div>
                  <h3 className="max-w-lg font-display text-5xl leading-none md:text-6xl">
                    The day arrives gently.
                  </h3>
                  <p className="mt-6 max-w-md text-base leading-7 text-ink/70">
                    Warm linen, quiet shadows, and enough space for the landscape to remain the
                    loudest thing in the room.
                  </p>
                </div>
              </div>
              <div aria-hidden="true" className="relative min-h-72 overflow-hidden bg-ocean/30">
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-accent/80 [clip-path:polygon(0_62%,28%_24%,52%_48%,75%_12%,100%_38%,100%_100%,0_100%)]" />
                <div className="absolute top-12 right-12 size-24 rounded-full bg-[#ead6ad] blur-sm" />
              </div>
            </div>
          </article>
        </DesignSystemSection>

        <DesignSystemSection
          description="Evening is intimate and reflective. It uses warm darkness, soft copper, and an even quieter visual rhythm."
          id="evening"
          index="08 / Atmosphere"
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
          description="Motion supports the story through a gentle fade, less than one rem of travel, deliberate pacing, and complete reduced-motion parity."
          id="motion"
          index="09 / Motion"
          title="Motion"
        >
          <div className="space-y-8">
            <MotionReveal className="rounded-2xl border border-border bg-surface p-8 md:p-12">
              <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                Once-only editorial reveal
              </p>
              <p className="mt-10 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">
                A small movement, then stillness.
              </p>
              <p className="mt-6 max-w-xl text-sm leading-7 text-ink-muted">
                Content remains complete without motion. Focus, reading order, layout, and image
                availability never wait for an animation.
              </p>
              <HorizonLine className="mt-12" />
            </MotionReveal>

            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                ['Interface', '180–240ms', 'Hover, focus, navigation'],
                ['Editorial reveal', '760–960ms', 'Text, figures, previews'],
                ['Hero entrance', '1100ms', 'Home and House only'],
              ].map(([name, timing, use]) => (
                <div className="rounded-xl border border-border bg-surface-soft p-5" key={name}>
                  <dt className="font-semibold text-ink">{name}</dt>
                  <dd className="mt-2 font-mono text-xs text-accent">{timing}</dd>
                  <dd className="mt-3 text-sm leading-6 text-ink-muted">{use}</dd>
                </div>
              ))}
            </dl>
          </div>
        </DesignSystemSection>
      </div>

      <footer className="border-t border-border px-6 py-14 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 text-sm text-ink-subtle">
          <p>Internal developer reference. Not part of the public website.</p>
          <p>Joshua&apos;s Point Design System · Living document</p>
        </div>
      </footer>
    </main>
  )
}
