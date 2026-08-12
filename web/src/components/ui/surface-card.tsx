import type {HTMLAttributes} from 'react'

type SurfaceCardProps = HTMLAttributes<HTMLDivElement>

export function SurfaceCard({className = '', ...props}: SurfaceCardProps) {
  return (
    <div
      className={`rounded-2xl border border-border bg-surface p-7 md:p-9 ${className}`}
      {...props}
    />
  )
}
