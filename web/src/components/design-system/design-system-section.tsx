import type {ReactNode} from 'react'

type DesignSystemSectionProps = {
  children: ReactNode
  description: string
  id: string
  index: string
  title: string
}

export function DesignSystemSection({
  children,
  description,
  id,
  index,
  title,
}: DesignSystemSectionProps) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 border-t border-atmosphere-border py-20 md:py-32"
      id={id}
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-20">
        <header>
          <p className="mb-5 font-body text-xs font-semibold tracking-[0.18em] text-atmosphere-accent uppercase">
            {index}
          </p>
          <h2
            className="font-display text-4xl leading-none tracking-[-0.02em] text-atmosphere-text md:text-5xl"
            id={`${id}-title`}
          >
            {title}
          </h2>
          <p className="mt-6 max-w-sm font-body text-base leading-8 text-atmosphere-muted">
            {description}
          </p>
        </header>

        <div>{children}</div>
      </div>
    </section>
  )
}
