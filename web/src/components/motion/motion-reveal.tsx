'use client'

import {useEffect, useRef} from 'react'
import type {ElementType, HTMLAttributes, ReactNode} from 'react'

export type MotionRevealDelay = 'long' | 'medium' | 'none' | 'short'
export type MotionRevealDirection = 'left' | 'none' | 'right' | 'up'

type MotionRevealProps = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
  as?: ElementType
  children: ReactNode
  delay?: MotionRevealDelay
  direction?: MotionRevealDirection
}

const revealCallbacks = new WeakMap<Element, () => void>()
let revealObserver: IntersectionObserver | undefined

function getRevealObserver() {
  if (revealObserver) return revealObserver

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        revealCallbacks.get(entry.target)?.()
        revealCallbacks.delete(entry.target)
        revealObserver?.unobserve(entry.target)
      })
    },
    {rootMargin: '0px 0px -8% 0px', threshold: 0.12},
  )

  return revealObserver
}

export function MotionReveal({
  as: Component = 'div',
  children,
  className = '',
  delay = 'none',
  direction = 'up',
  ...props
}: MotionRevealProps) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const bounds = element.getBoundingClientRect()
    const isInitiallyVisible = bounds.top <= window.innerHeight * 0.88

    if (reducedMotion || isInitiallyVisible) {
      element.dataset.motionState = 'visible'
      return
    }

    element.dataset.motionState = 'pending'
    const observer = getRevealObserver()
    revealCallbacks.set(element, () => {
      element.dataset.motionState = 'visible'
    })
    observer.observe(element)

    return () => {
      revealCallbacks.delete(element)
      observer.unobserve(element)
    }
  }, [])

  return (
    <Component
      className={className}
      data-motion-delay={delay}
      data-motion-direction={direction}
      data-motion-reveal
      data-motion-state="visible"
      ref={elementRef}
      {...props}
    >
      {children}
    </Component>
  )
}
