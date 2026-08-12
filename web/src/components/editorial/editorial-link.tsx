import Link from 'next/link'

type EditorialLinkProps = {
  href: string
  label: string
  tone?: 'default' | 'inverse'
}

const toneClasses = {
  default: 'border-ink/35 text-ink hover:border-accent hover:text-accent focus-visible:outline-focus',
  inverse:
    'border-inverse/35 text-inverse hover:border-inverse hover:text-inverse focus-visible:outline-evening-accent',
} as const

export function EditorialLink({href, label, tone = 'default'}: EditorialLinkProps) {
  return (
    <Link
      className={`inline-flex min-h-11 items-center border-b pb-1 font-body text-sm font-semibold transition-colors duration-[var(--jp-motion-duration-hover)] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 ${toneClasses[tone]}`}
      href={href}
    >
      {label}
    </Link>
  )
}
