import {createElement} from 'react'
import type {HTMLAttributes, ReactNode} from 'react'

export type SectionSpacingSize = 'compact' | 'generous' | 'immersive' | 'standard'
export type SectionSpacingAxis = 'block' | 'bottom' | 'top'

type SectionSpacingElement = 'div' | 'footer' | 'header' | 'section'

type SectionSpacingProps = HTMLAttributes<HTMLElement> & {
  as?: SectionSpacingElement
  axis?: SectionSpacingAxis
  children: ReactNode
  size?: SectionSpacingSize
}

const spacingClasses: Record<SectionSpacingAxis, Record<SectionSpacingSize, string>> = {
  block: {
    compact: 'py-16 sm:py-20 lg:py-24',
    standard: 'py-24 sm:py-32 lg:py-40',
    generous: 'py-28 sm:py-36 lg:py-52',
    immersive: 'py-32 sm:py-40 lg:py-60',
  },
  top: {
    compact: 'pt-16 sm:pt-20 lg:pt-24',
    standard: 'pt-24 sm:pt-32 lg:pt-40',
    generous: 'pt-28 sm:pt-36 lg:pt-52',
    immersive: 'pt-32 sm:pt-40 lg:pt-60',
  },
  bottom: {
    compact: 'pb-16 sm:pb-20 lg:pb-24',
    standard: 'pb-24 sm:pb-32 lg:pb-40',
    generous: 'pb-28 sm:pb-36 lg:pb-52',
    immersive: 'pb-32 sm:pb-40 lg:pb-60',
  },
}

export function SectionSpacing({
  as = 'section',
  axis = 'block',
  children,
  className = '',
  size = 'standard',
  ...props
}: SectionSpacingProps) {
  return createElement(
    as,
    {
      className: `${spacingClasses[axis][size]} ${className}`,
      ...props,
    },
    children,
  )
}
