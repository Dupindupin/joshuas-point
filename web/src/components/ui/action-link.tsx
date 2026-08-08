import type {ComponentProps} from 'react'
import Link from 'next/link'

type ActionLinkVariant = 'primary' | 'secondary'

type ActionLinkProps = ComponentProps<typeof Link> & {
  variant?: ActionLinkVariant
}

const variantClasses: Record<ActionLinkVariant, string> = {
  primary: 'border-linen bg-linen text-charcoal hover:border-evening-text hover:bg-evening-text',
  secondary: 'border-linen/55 bg-transparent text-linen hover:border-linen hover:bg-linen/10',
}

export function ActionLink({className = '', variant = 'primary', ...props}: ActionLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center rounded-full border px-6 py-3 font-body text-sm font-semibold tracking-[0.01em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
