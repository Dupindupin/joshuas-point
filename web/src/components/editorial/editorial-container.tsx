import type {HTMLAttributes} from 'react'

export type EditorialContainerSize = 'reading' | 'standard' | 'wide'

type EditorialContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: EditorialContainerSize
}

const sizeClasses: Record<EditorialContainerSize, string> = {
  reading: 'max-w-3xl',
  standard: 'max-w-5xl',
  wide: 'max-w-7xl',
}

export function EditorialContainer({
  children,
  className = '',
  size = 'wide',
  ...props
}: EditorialContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 md:px-10 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
