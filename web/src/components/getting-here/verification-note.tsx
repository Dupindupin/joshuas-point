import type {ReactNode} from 'react'

type VerificationNoteTone = 'default' | 'inverse'

type VerificationNoteProps = {
  children: ReactNode
  className?: string
  tone?: VerificationNoteTone
}

const toneClasses: Record<VerificationNoteTone, {body: string; border: string; label: string}> = {
  default: {
    body: 'text-ink/68',
    border: 'border-ink/25',
    label: 'text-ink/55',
  },
  inverse: {
    body: 'text-inverse/68',
    border: 'border-inverse/25',
    label: 'text-inverse/50',
  },
}

export function VerificationNote({
  children,
  className = '',
  tone = 'default',
}: VerificationNoteProps) {
  const classes = toneClasses[tone]

  return (
    <aside
      aria-label="Verification required"
      className={`border-l pl-5 sm:pl-6 ${classes.border} ${className}`}
    >
      <p
        className={`font-body text-[0.6875rem] font-semibold tracking-[0.18em] uppercase ${classes.label}`}
      >
        Verification required
      </p>
      <p className={`mt-3 font-body text-sm leading-7 ${classes.body}`}>{children}</p>
    </aside>
  )
}
