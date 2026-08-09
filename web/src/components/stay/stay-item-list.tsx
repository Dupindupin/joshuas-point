export type StayItem = {
  description?: string
  title: string
}

type StayItemListProps = {
  items: readonly StayItem[]
}

export function StayItemList({items}: StayItemListProps) {
  return (
    <ul className="border-t border-charcoal/20">
      {items.map((item) => (
        <li className="border-b border-charcoal/20 py-7 sm:py-8" key={item.title}>
          <p className="font-display text-2xl leading-tight font-medium tracking-[-0.02em] text-charcoal">
            {item.title}
          </p>
          {item.description ? (
            <p className="mt-3 max-w-xl font-body text-sm leading-7 text-charcoal/65">
              {item.description}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  )
}
