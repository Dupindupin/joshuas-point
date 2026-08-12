export type ContactMethod = {
  description: string
  href?: string
  id: 'email' | 'phone' | 'whatsapp'
  label: string
  value?: string
}

type ContactMethodsProps = {
  methods: readonly ContactMethod[]
}

export function ContactMethods({methods}: ContactMethodsProps) {
  const visibleMethods = methods.filter((method) => method.href && method.value)
  if (visibleMethods.length === 0) return null

  return (
    <address className="not-italic">
      <dl className="border-t border-ink/18">
        {visibleMethods.map((method) => (
          <div
            className="grid gap-6 border-b border-ink/18 py-10 sm:grid-cols-[9rem_1fr] sm:gap-10 lg:grid-cols-[11rem_minmax(12rem,0.8fr)_minmax(18rem,1.2fr)] lg:items-baseline lg:py-12"
            key={method.id}
          >
            <dt className="font-body text-xs font-semibold tracking-[0.2em] text-ink-subtle uppercase">
              {method.label}
            </dt>
            <dd className="font-display text-[2rem] leading-tight font-medium tracking-[-0.025em] text-ink sm:text-[2.5rem]">
              <a
                className="rounded-sm underline decoration-ink/20 underline-offset-8 hover:decoration-ink/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                href={method.href}
              >
                {method.value}
              </a>
            </dd>
            <dd className="max-w-lg font-body text-sm leading-7 text-ink/65 sm:col-start-2 lg:col-start-auto">
              {method.description}
            </dd>
          </div>
        ))}
      </dl>
    </address>
  )
}
