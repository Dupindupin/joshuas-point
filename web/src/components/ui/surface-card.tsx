import type {HTMLAttributes} from 'react'

type SurfaceCardProps = HTMLAttributes<HTMLDivElement>

export function SurfaceCard({className = '', ...props}: SurfaceCardProps) {
  return (
    <div
      className={`rounded-2xl border border-atmosphere-border bg-atmosphere-surface p-7 md:p-9 ${className}`}
      {...props}
    />
  )
}
