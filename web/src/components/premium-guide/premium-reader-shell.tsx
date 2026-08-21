'use client'

import Link from 'next/link'
import {useCallback, useEffect, useState, type ReactNode} from 'react'

import {BrandLogo} from '@/components/site/brand-logo'

type PremiumReaderShellProps = {
  children: ReactNode
  chapterNumber: string
  chapterTitle: string
}

export function PremiumReaderShell({
  children,
  chapterNumber,
  chapterTitle,
}: PremiumReaderShellProps) {
  const [progress, setProgress] = useState(0)
  const [readingMode, setReadingMode] = useState(false)

  const updateProgress = useCallback(() => {
    const available = document.documentElement.scrollHeight - window.innerHeight
    const nextProgress = available > 0 ? (window.scrollY / available) * 100 : 100
    setProgress(Math.min(100, Math.max(0, nextProgress)))
  }, [])

  useEffect(() => {
    const initialFrame = window.requestAnimationFrame(updateProgress)
    window.addEventListener('scroll', updateProgress, {passive: true})
    window.addEventListener('resize', updateProgress)

    return () => {
      window.cancelAnimationFrame(initialFrame)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress])

  function toggleReadingMode() {
    setReadingMode((current) => !current)
  }

  return (
    <div className="jp-reader" data-reading-mode={readingMode ? 'on' : 'off'}>
      <div
        aria-label={`Reading progress: ${Math.round(progress)}%`}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(progress)}
        className="fixed inset-x-0 top-0 z-[70] h-0.5 bg-border/45"
        role="progressbar"
      >
        <span
          className="block h-full origin-left bg-evening-accent transition-[width] duration-150 ease-out"
          style={{width: `${progress}%`}}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-[60] border-b border-border/70 bg-canvas/92 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-[92rem] items-center gap-4 px-4 sm:px-7 lg:px-10">
          <Link
            aria-label="Southern Negros Explorer contents"
            className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
            href="/premium-guide"
          >
            <BrandLogo className="h-9 w-9" variant="mark" />
          </Link>

          <div className="min-w-0 flex-1 border-l border-border pl-4 sm:flex sm:items-baseline sm:gap-4">
            <p className="font-body text-[0.625rem] font-semibold tracking-[0.18em] text-ink-subtle uppercase">
              Chapter {chapterNumber}
            </p>
            <p className="hidden truncate font-display text-lg text-ink sm:block">{chapterTitle}</p>
          </div>

          <nav aria-label="Reading controls" className="flex items-center gap-1 sm:gap-2">
            <Link
              className="rounded-full px-3 py-2 font-body text-[0.6875rem] font-semibold tracking-[0.08em] text-ink-muted uppercase hover:bg-surface-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:px-4"
              href="/premium-guide#contents"
            >
              Contents
            </Link>
            <button
              aria-pressed={readingMode}
              className="rounded-full border border-border px-3 py-2 font-body text-[0.6875rem] font-semibold tracking-[0.08em] text-ink-muted uppercase hover:border-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus sm:px-4"
              onClick={toggleReadingMode}
              type="button"
            >
              {readingMode ? 'Standard' : 'Reading mode'}
            </button>
          </nav>
        </div>
      </header>

      {children}
    </div>
  )
}
