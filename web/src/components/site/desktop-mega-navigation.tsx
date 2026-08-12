'use client'

import Link from 'next/link'
import {useEffect, useRef, useState} from 'react'
import type {
  FocusEvent as ReactFocusEvent,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from 'react'

export type DesktopMegaNavigationAppearance = 'solid' | 'transparent'

export type DesktopMegaNavigationGroup = {
  featuredLabel?: string
  id: string
  links: readonly {
    href: string
    label: string
    openInNewTab?: boolean
  }[]
  overviewLink?: {
    href: string
    label: string
    openInNewTab?: boolean
  }
  title: string
}

type DesktopMegaNavigationProps = {
  activeHref?: string
  appearance: DesktopMegaNavigationAppearance
  groups: readonly DesktopMegaNavigationGroup[]
  onOpenChange?: (isOpen: boolean) => void
}

type OpenSource = 'click' | 'focus' | 'hover' | 'keyboard'

const focusClasses: Record<DesktopMegaNavigationAppearance, string> = {
  solid: 'focus-visible:outline-focus',
  transparent: 'focus-visible:outline-inverse',
}

const OPEN_DELAY_MS = 70
const CLOSE_DELAY_MS = 180

export function DesktopMegaNavigation({
  activeHref,
  appearance,
  groups,
  onOpenChange,
}: DesktopMegaNavigationProps) {
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
  const [focusRequest, setFocusRequest] = useState(0)
  const rootRef = useRef<HTMLElement>(null)
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)
  const openSourceRef = useRef<OpenSource | null>(null)
  const focusPanelOnOpenRef = useRef(false)
  const pointerFocusRef = useRef(false)
  const suppressFocusOpenRef = useRef(false)
  const suppressNativeClickRef = useRef(false)
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const menuId = 'desktop-mega-menu'
  const activeGroup = groups.find((group) => group.id === activeGroupId)

  function clearTimer(timerRef: typeof openTimerRef) {
    if (!timerRef.current) return
    clearTimeout(timerRef.current)
    timerRef.current = null
  }

  function clearPendingTransitions() {
    clearTimer(openTimerRef)
    clearTimer(closeTimerRef)
  }

  function openGroup(
    groupId: string,
    trigger: HTMLButtonElement,
    source: OpenSource,
    focusFirstLink = false,
  ) {
    clearPendingTransitions()
    lastTriggerRef.current = trigger
    openSourceRef.current = source
    focusPanelOnOpenRef.current = focusFirstLink
    setActiveGroupId(groupId)
    if (focusFirstLink) setFocusRequest((current) => current + 1)
  }

  function closeMenu(restoreFocus = false) {
    clearPendingTransitions()
    setActiveGroupId(null)
    openSourceRef.current = null
    focusPanelOnOpenRef.current = false
    if (restoreFocus) {
      suppressFocusOpenRef.current = true
      lastTriggerRef.current?.focus()
      queueMicrotask(() => {
        suppressFocusOpenRef.current = false
      })
    }
  }

  function scheduleHoverOpen(groupId: string, trigger: HTMLButtonElement) {
    clearPendingTransitions()

    if (activeGroupId) {
      openGroup(groupId, trigger, 'hover')
      return
    }

    openTimerRef.current = setTimeout(() => {
      openGroup(groupId, trigger, 'hover')
    }, OPEN_DELAY_MS)
  }

  function scheduleHoverClose() {
    clearTimer(openTimerRef)
    if (openSourceRef.current !== 'hover') return

    closeTimerRef.current = setTimeout(() => {
      closeMenu()
    }, CLOSE_DELAY_MS)
  }

  function handleTriggerClick(groupId: string, trigger: HTMLButtonElement) {
    pointerFocusRef.current = false

    if (activeGroupId === groupId && openSourceRef.current === 'click') {
      closeMenu()
      return
    }

    openGroup(groupId, trigger, 'click')
  }

  function handleTriggerFocus(groupId: string, trigger: HTMLButtonElement) {
    if (suppressFocusOpenRef.current) {
      suppressFocusOpenRef.current = false
      return
    }
    if (pointerFocusRef.current) return
    openGroup(groupId, trigger, 'focus')
  }

  function handleTriggerPointerEnter(event: ReactPointerEvent<HTMLButtonElement>, groupId: string) {
    if (event.pointerType !== 'mouse') return
    scheduleHoverOpen(groupId, event.currentTarget)
  }

  function handleTriggerKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    groupId: string,
    index: number,
  ) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      suppressNativeClickRef.current = true
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      openGroup(groupId, event.currentTarget, 'keyboard', true)
      return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      const direction = event.key === 'ArrowRight' ? 1 : -1
      const nextIndex = (index + direction + groups.length) % groups.length
      triggerRefs.current[nextIndex]?.focus()
      return
    }

    if (event.key === 'Escape' && activeGroupId) {
      event.preventDefault()
      closeMenu(true)
    }
  }

  function handleTriggerKeyUp(event: ReactKeyboardEvent<HTMLButtonElement>, groupId: string) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()

    if (activeGroupId === groupId && openSourceRef.current === 'keyboard') {
      closeMenu(true)
    } else {
      openGroup(groupId, event.currentTarget, 'keyboard')
    }

    setTimeout(() => {
      suppressNativeClickRef.current = false
    }, 0)
  }

  function handleBlur(event: ReactFocusEvent<HTMLElement>) {
    const nextTarget = event.relatedTarget
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return
    if (openSourceRef.current === 'hover' && rootRef.current?.matches(':hover')) return
    closeMenu()
  }

  useEffect(() => {
    onOpenChange?.(Boolean(activeGroupId))
  }, [activeGroupId, onOpenChange])

  useEffect(() => {
    if (!activeGroupId || !focusPanelOnOpenRef.current) return
    firstLinkRef.current?.focus()
    focusPanelOnOpenRef.current = false
  }, [activeGroupId, focusRequest])

  useEffect(() => {
    function closeFromDocument(restoreFocus = false) {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      openTimerRef.current = null
      closeTimerRef.current = null
      setActiveGroupId(null)
      openSourceRef.current = null
      focusPanelOnOpenRef.current = false
      if (restoreFocus) {
        suppressFocusOpenRef.current = true
        lastTriggerRef.current?.focus()
        queueMicrotask(() => {
          suppressFocusOpenRef.current = false
        })
      }
    }

    function handleDocumentKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape' || !activeGroupId) return
      event.preventDefault()
      closeFromDocument(true)
    }

    function handleDocumentPointerDown(event: PointerEvent) {
      const target = event.target
      if (target instanceof Node && rootRef.current?.contains(target)) return
      closeFromDocument()
    }

    document.addEventListener('keydown', handleDocumentKeyDown)
    document.addEventListener('pointerdown', handleDocumentPointerDown)
    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown)
      document.removeEventListener('pointerdown', handleDocumentPointerDown)
    }
  }, [activeGroupId])

  useEffect(
    () => () => {
      if (openTimerRef.current) clearTimeout(openTimerRef.current)
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
      onOpenChange?.(false)
    },
    [onOpenChange],
  )

  const activeTriggerId = activeGroupId ? `mega-menu-${activeGroupId}-trigger` : undefined

  return (
    <nav
      aria-label="Primary navigation"
      className="hidden lg:block"
      onBlur={handleBlur}
      onPointerEnter={() => clearTimer(closeTimerRef)}
      onPointerLeave={scheduleHoverClose}
      ref={rootRef}
    >
      <ul className="flex items-center gap-7 xl:gap-9">
        {groups.map((group, index) => {
          const isExpanded = activeGroupId === group.id
          const isCurrentGroup =
            group.links.some((link) => link.href === activeHref) ||
            Boolean(
              group.overviewLink &&
              (group.overviewLink.href === activeHref ||
                activeHref?.startsWith(`${group.overviewLink.href}/`)),
            )

          return (
            <li key={group.id}>
              <button
                aria-controls={menuId}
                aria-expanded={isExpanded}
                className={`relative rounded-sm py-2 font-body text-[0.6875rem] leading-6 font-medium tracking-[0.14em] uppercase opacity-72 transition-opacity duration-[var(--jp-motion-duration-hover)] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-[var(--jp-motion-duration-hover)] hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 data-[current=true]:opacity-100 data-[expanded=true]:opacity-100 data-[expanded=true]:after:scale-x-100 ${focusClasses[appearance]}`}
                data-current={isCurrentGroup}
                data-expanded={isExpanded}
                id={`mega-menu-${group.id}-trigger`}
                onClick={(event) => {
                  if (suppressNativeClickRef.current) {
                    suppressNativeClickRef.current = false
                    return
                  }
                  if (event.detail === 0) {
                    if (activeGroupId === group.id && openSourceRef.current === 'keyboard') {
                      closeMenu(true)
                    } else {
                      openGroup(group.id, event.currentTarget, 'keyboard')
                    }
                    return
                  }
                  handleTriggerClick(group.id, event.currentTarget)
                }}
                onFocus={(event) => handleTriggerFocus(group.id, event.currentTarget)}
                onKeyDown={(event) => handleTriggerKeyDown(event, group.id, index)}
                onKeyUp={(event) => handleTriggerKeyUp(event, group.id)}
                onPointerDown={() => {
                  pointerFocusRef.current = true
                }}
                onPointerEnter={(event) => handleTriggerPointerEnter(event, group.id)}
                ref={(element) => {
                  triggerRefs.current[index] = element
                }}
                type="button"
              >
                {group.title}
              </button>
            </li>
          )
        })}
      </ul>

      <div
        aria-hidden={!activeGroup}
        aria-labelledby={activeTriggerId}
        className={`absolute inset-x-0 top-full border-t border-ink/10 bg-canvas/98 text-ink shadow-[0_1.25rem_3rem_rgba(38,40,35,0.07)] transition-[opacity,transform,visibility] duration-[var(--jp-motion-duration-ui)] ease-[var(--jp-motion-ease-soft)] ${
          activeGroup
            ? 'visible translate-y-0 opacity-100'
            : 'invisible pointer-events-none -translate-y-1 opacity-0'
        }`}
        id={menuId}
      >
        {activeGroup ? (
          <div className="mx-auto grid w-full max-w-7xl grid-cols-12 gap-x-12 px-10 py-11 xl:gap-x-16 xl:py-13">
            {activeGroup.overviewLink ? (
              <div className="col-span-3">
                <p className="pt-2 font-body text-[0.625rem] font-semibold tracking-[0.2em] text-ink-subtle uppercase">
                  {activeGroup.title}
                </p>
                <Link
                  aria-current={activeHref === activeGroup.overviewLink.href ? 'page' : undefined}
                  className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-sm font-display text-[1.9rem] leading-[1.05] tracking-[-0.03em] text-ink transition-colors duration-[var(--jp-motion-duration-hover)] hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                  href={activeGroup.overviewLink.href}
                  onClick={() => closeMenu()}
                  ref={firstLinkRef}
                  rel={activeGroup.overviewLink.openInNewTab ? 'noopener noreferrer' : undefined}
                  target={activeGroup.overviewLink.openInNewTab ? '_blank' : undefined}
                >
                  {activeGroup.overviewLink.label}
                  <span aria-hidden="true" className="font-body text-base">
                    →
                  </span>
                </Link>
              </div>
            ) : (
              <p className="col-span-2 pt-2 font-body text-[0.625rem] font-semibold tracking-[0.2em] text-ink-subtle uppercase">
                {activeGroup.title}
              </p>
            )}

            {activeGroup.links.length > 0 ? (
              <div
                className={
                  activeGroup.overviewLink ? 'col-span-8 col-start-5' : 'col-span-9 col-start-4'
                }
              >
                {activeGroup.featuredLabel ? (
                  <p className="mb-5 font-body text-[0.625rem] font-semibold tracking-[0.18em] text-ink-subtle uppercase">
                    {activeGroup.featuredLabel}
                  </p>
                ) : null}
                <ul className="grid grid-cols-3 gap-x-10 xl:gap-x-14">
                  {activeGroup.links.map((link, index) => (
                    <li className="border-t border-ink/15 pt-5" key={link.href}>
                      <Link
                        aria-current={activeHref === link.href ? 'page' : undefined}
                        className="group inline-flex min-h-12 rounded-sm font-display text-[1.75rem] leading-[1.05] tracking-[-0.025em] text-ink/78 transition-colors duration-[var(--jp-motion-duration-hover)] hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus aria-[current=page]:font-semibold aria-[current=page]:text-ink"
                        href={link.href}
                        onClick={() => closeMenu()}
                        ref={!activeGroup.overviewLink && index === 0 ? firstLinkRef : undefined}
                        rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                        target={link.openInNewTab ? '_blank' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </nav>
  )
}
