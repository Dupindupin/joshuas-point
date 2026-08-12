import type {Metadata} from 'next'

import {TypographySpecimen} from '@/components/typography-lab/typography-specimen'
import {brandBodyFontName, brandDisplayFontName} from '@/styles/fonts'

export const metadata: Metadata = {
  title: "Typography Lab | Joshua's Point",
  description: "Internal display-type comparison for Joshua's Point.",
  robots: {
    follow: false,
    index: false,
  },
}

const specimens = [
  {
    character:
      'The approved Joshua’s Point display voice. Quiet, humane, and highly readable, with the familiar authority of a well-made book and a natural ease in longer stories.',
    displayFontClass: 'font-display',
    id: 'newsreader',
    name: 'Newsreader',
  },
  {
    character:
      'Poised and literary, with crisp contrast and an understated elegance. Its open forms feel editorial without becoming formal.',
    displayFontClass: 'font-[family-name:var(--font-lab-instrument-serif)]',
    id: 'instrument-serif',
    name: 'Instrument Serif',
  },
  {
    character:
      'Warm, expressive, and organic. Its distinctive shapes introduce more personality and playfulness while retaining a crafted editorial quality.',
    displayFontClass: 'font-[family-name:var(--font-lab-fraunces)]',
    id: 'fraunces',
    name: 'Fraunces',
  },
  {
    character:
      'Airy, graceful, and classical. Its fine details create a refined atmosphere, though its delicacy can feel more formal at smaller display sizes.',
    displayFontClass: 'font-[family-name:var(--font-lab-cormorant-garamond)]',
    id: 'cormorant-garamond',
    name: 'Cormorant Garamond',
  },
] as const

export default function TypographyLabPage() {
  return (
    <main className="min-h-screen bg-canvas font-body text-ink">
      <header className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-bold tracking-[0.18em] text-ink uppercase">
              Joshua&apos;s Point
            </p>
            <p className="text-[0.625rem] font-medium tracking-[0.12em] text-ink/45 uppercase">
              Internal typography lab
            </p>
          </div>

          <div className="mt-20 grid gap-10 border-t border-border/70 pt-10 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                Approved pairing
              </p>
              <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight font-medium tracking-[-0.025em] md:text-5xl">
                {brandDisplayFontName}, paired with {brandBodyFontName}.
              </h1>
            </div>
            <div>
              <aside
                aria-label="Official brand typography"
                className="border-l border-timber py-1 pl-6"
              >
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                  <span aria-hidden="true">✓</span>
                  Official Brand Typography
                </p>
                <dl className="mt-6 grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-3">
                  <dt className="text-sm text-ink/55">Display</dt>
                  <dd className="font-display text-2xl leading-none">{brandDisplayFontName}</dd>
                  <dt className="text-sm text-ink/55">Body</dt>
                  <dd className="text-base font-semibold">{brandBodyFontName}</dd>
                </dl>
              </aside>
              <p className="mt-7 text-sm leading-7 text-ink/65">
                Earlier candidates remain below as a visual record. Every specimen keeps identical
                copy, sizing, spacing, and color.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {specimens.map((specimen, index) => (
          <TypographySpecimen
            {...specimen}
            index={String(index + 1).padStart(2, '0')}
            key={specimen.id}
          />
        ))}
      </div>

      <footer className="border-t border-border/70 px-6 py-14 md:px-10">
        <div className="mx-auto max-w-7xl text-sm text-ink/50">
          Approved pairing · {brandDisplayFontName} / {brandBodyFontName}
        </div>
      </footer>
    </main>
  )
}
