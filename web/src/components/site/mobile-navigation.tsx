'use client'

import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import type {KeyboardEvent as ReactKeyboardEvent} from 'react'

import type {SocialProfile} from '@/lib/social-profiles'

import {SocialProfileLinks} from './social-profile-links'

export type MobileNavigationAppearance = 'solid' | 'transparent'

export type MobileNavigationItem = {
  href: string
  label: string
}

type MobileNavigationProps = {
  activeHref?: string
  appearance: MobileNavigationAppearance
  items: readonly MobileNavigationItem[]
  socialProfiles: readonly SocialProfile[]
}

const buttonFocusClasses: Record<MobileNavigationAppearance, string> = {
  solid: 'focus-visible:outline-focus',
  transparent: 'focus-visible:outline-inverse',
}

export function MobileNavigation({
  activeHref,
  appearance,
  items,
  socialProfiles,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const menuId = 'mobile-primary-navigation'

  function toggleMenu() {
    setIsOpen((current) => !current)
  }

  function handleButtonKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    toggleMenu()
  }

  useEffect(() => {
    if (!isOpen) return

    firstLinkRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      buttonRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <div className="lg:hidden">
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
        className={`inline-flex size-12 items-center justify-center rounded-full border border-current/35 focus-visible:outline-2 focus-visible:outline-offset-4 ${buttonFocusClasses[appearance]}`}
        onClick={toggleMenu}
        onKeyDown={handleButtonKeyDown}
        ref={buttonRef}
        type="button"
      >
        <span aria-hidden="true" className="flex w-[1.125rem] flex-col gap-[0.3125rem]">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-full bg-current" />
        </span>
      </button>

      <div
        className="jp-mobile-menu absolute inset-x-0 top-full border-t border-border/35 bg-canvas px-6 py-10 text-ink shadow-[0_1.5rem_3rem_rgba(38,40,35,0.08)] sm:px-8 md:px-10"
        data-open={isOpen}
        hidden={!isOpen}
        id={menuId}
      >
        <div className="mx-auto w-full max-w-7xl">
          <nav aria-label="Mobile navigation">
            <ul className="divide-y divide-ink/12 border-y border-ink/12">
              {items.map((item, index) => (
                <li key={item.href}>
                  <Link
                    aria-current={activeHref === item.href ? 'page' : undefined}
                    className="flex min-h-16 items-center rounded-sm font-display text-2xl leading-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-focus aria-[current=page]:font-semibold"
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    ref={index === 0 ? firstLinkRef : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {socialProfiles.length > 0 ? (
            <div className="mt-8 border-t border-ink/12 pt-7">
              <p className="font-body text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-subtle uppercase">
                Follow Joshua&apos;s Point
              </p>
              <SocialProfileLinks
                ariaLabel="Follow Joshua's Point"
                className="mt-4"
                profiles={socialProfiles}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
