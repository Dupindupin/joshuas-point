import {createElement} from 'react'
import type {HTMLAttributes, ReactNode} from 'react'

export type EditorialTextVariant = 'body' | 'caption' | 'eyebrow' | 'heading' | 'lead' | 'quote'
export type EditorialHeadingSize = 'display' | 'large' | 'medium' | 'small'
export type EditorialTextTone = 'default' | 'inverse'

type EditorialTextElement = 'blockquote' | 'figcaption' | 'h1' | 'h2' | 'h3' | 'p' | 'span'

type EditorialTextProps = HTMLAttributes<HTMLElement> & {
  as?: EditorialTextElement
  children: ReactNode
  cite?: string
  headingSize?: EditorialHeadingSize
  tone?: EditorialTextTone
  variant: EditorialTextVariant
}

const defaultElements: Record<EditorialTextVariant, EditorialTextElement> = {
  body: 'p',
  caption: 'p',
  eyebrow: 'p',
  heading: 'h2',
  lead: 'p',
  quote: 'blockquote',
}

const variantClasses: Record<EditorialTextVariant, string> = {
  body: 'font-body text-base leading-8 sm:text-lg sm:leading-9',
  caption: 'font-body text-[0.8125rem] leading-6',
  eyebrow: 'font-body text-xs font-semibold tracking-[0.26em] uppercase',
  heading: 'text-balance font-display leading-[0.98] font-medium tracking-[-0.03em]',
  lead:
    'text-pretty font-display text-[2.25rem] leading-[1.12] font-medium tracking-[-0.025em] sm:text-[3rem]',
  quote:
    'text-pretty font-display text-[2.5rem] leading-[1.12] font-medium tracking-[-0.025em] sm:text-[3.5rem]',
}

const headingSizeClasses: Record<EditorialHeadingSize, string> = {
  small: 'text-[2.25rem] sm:text-[3rem]',
  medium: 'text-[3rem] sm:text-[4rem]',
  large: 'text-[4rem] sm:text-[5.5rem]',
  display: 'text-[4.25rem] sm:text-[5.5rem] lg:text-[7.75rem] xl:text-[9rem]',
}

const toneClasses: Record<EditorialTextTone, Record<EditorialTextVariant, string>> = {
  default: {
    body: 'text-ink-muted',
    caption: 'text-ink-subtle',
    eyebrow: 'text-ink-subtle',
    heading: 'text-ink',
    lead: 'text-ink',
    quote: 'text-ink/90',
  },
  inverse: {
    body: 'text-inverse/75',
    caption: 'text-inverse/65',
    eyebrow: 'text-inverse/60',
    heading: 'text-inverse',
    lead: 'text-inverse',
    quote: 'text-inverse/90',
  },
}

export function EditorialText({
  as,
  children,
  className = '',
  headingSize = 'medium',
  tone = 'default',
  variant,
  ...props
}: EditorialTextProps) {
  const element = as ?? defaultElements[variant]
  const sizeClass = variant === 'heading' ? headingSizeClasses[headingSize] : ''

  return createElement(
    element,
    {
      className: `${variantClasses[variant]} ${sizeClass} ${toneClasses[tone][variant]} ${className}`,
      ...props,
    },
    children,
  )
}
