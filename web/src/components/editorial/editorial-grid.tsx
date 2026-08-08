import type {HTMLAttributes} from 'react'

export type EditorialGridGap = 'compact' | 'generous' | 'standard'

type EditorialGridProps = HTMLAttributes<HTMLDivElement> & {
  gap?: EditorialGridGap
}

const gapClasses: Record<EditorialGridGap, string> = {
  compact: 'gap-y-8 lg:gap-x-8',
  standard: 'gap-y-12 lg:gap-x-12 xl:gap-x-20',
  generous: 'gap-y-16 lg:gap-x-16 xl:gap-x-24',
}

export function EditorialGrid({
  children,
  className = '',
  gap = 'standard',
  ...props
}: EditorialGridProps) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 ${gapClasses[gap]} ${className}`} {...props}>
      {children}
    </div>
  )
}
