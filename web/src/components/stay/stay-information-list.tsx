export type StayInformationItem = {
  description?: string
  label: string
  value?: string
}

type StayInformationListProps = {
  items: readonly StayInformationItem[]
}

export function StayInformationList({items}: StayInformationListProps) {
  const visibleItems = items.filter((item) => item.value?.trim())
  if (visibleItems.length === 0) return null

  return (
    <dl className="border-t border-ink/20">
      {visibleItems.map((item) => (
        <div
          className="grid gap-5 border-b border-ink/20 py-8 sm:grid-cols-12 sm:gap-x-10 sm:py-10"
          key={item.label}
        >
          <dt className="font-display text-[1.75rem] leading-[1.12] font-medium tracking-[-0.025em] text-ink sm:col-span-4 sm:text-[2rem]">
            {item.label}
          </dt>
          <dd className="sm:col-span-7 sm:col-start-6">
            <p className="font-body text-xs font-semibold tracking-[0.14em] text-accent uppercase">
              {item.value}
            </p>
            {item.description ? (
              <p className="mt-4 max-w-2xl font-body text-base leading-8 text-ink/70">
                {item.description}
              </p>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  )
}
