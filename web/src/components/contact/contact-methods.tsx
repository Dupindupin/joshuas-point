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
  return (
    <address className="not-italic">
      <dl className="border-t border-charcoal/18">
        {methods.map((method) => (
          <div
            className="grid gap-6 border-b border-charcoal/18 py-10 sm:grid-cols-[9rem_1fr] sm:gap-10 lg:grid-cols-[11rem_minmax(12rem,0.8fr)_minmax(18rem,1.2fr)] lg:items-baseline lg:py-12"
            key={method.id}
          >
            <dt className="font-body text-xs font-semibold tracking-[0.2em] text-charcoal/55 uppercase">
              {method.label}
            </dt>
            <dd className="font-display text-[2rem] leading-tight font-medium tracking-[-0.025em] text-charcoal sm:text-[2.5rem]">
              {method.href && method.value ? (
                <a
                  className="rounded-sm underline decoration-charcoal/20 underline-offset-8 hover:decoration-charcoal/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
                  href={method.href}
                >
                  {method.value}
                </a>
              ) : (
                <span className="text-charcoal/42">Details to be confirmed</span>
              )}
            </dd>
            <dd className="max-w-lg font-body text-sm leading-7 text-charcoal/65 sm:col-start-2 lg:col-start-auto">
              {method.description}
            </dd>
          </div>
        ))}
      </dl>
    </address>
  )
}
