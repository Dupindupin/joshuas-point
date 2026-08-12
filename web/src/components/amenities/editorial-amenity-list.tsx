export type EditorialAmenityIcon =
  | 'bathroom'
  | 'bed'
  | 'climate'
  | 'connectivity'
  | 'cooking'
  | 'deck'
  | 'energy'
  | 'exclusiveUse'
  | 'guests'
  | 'outlook'
  | 'parking'
  | 'pool'
  | 'rainwater'
  | 'service'
  | 'sharedSpaces'
  | 'television'
  | 'transport'
  | 'water'

export type EditorialAmenityItem = {
  description: string
  icon?: EditorialAmenityIcon
  title: string
}

type EditorialAmenityListProps = {
  className?: string
  items: readonly EditorialAmenityItem[]
}

function AmenityIcon({name}: {name: EditorialAmenityIcon}) {
  const commonProps = {
    'aria-hidden': true,
    className: 'size-[1.125rem]',
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.45,
    viewBox: '0 0 24 24',
  }

  if (name === 'bed') {
    return (
      <svg {...commonProps}>
        <path d="M4 18v-8m16 8v-6.5A2.5 2.5 0 0 0 17.5 9H9v6h11M4 15h16M7 9h2v6H4v-3a3 3 0 0 1 3-3Z" />
      </svg>
    )
  }

  if (name === 'bathroom') {
    return (
      <svg {...commonProps}>
        <path d="M4 13h16v2a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-2Zm2 0V7.5A2.5 2.5 0 0 1 8.5 5 2.5 2.5 0 0 1 11 7.5M7 19l-1 2m11-2 1 2" />
      </svg>
    )
  }

  if (name === 'guests') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="8" r="3" />
        <path d="M6.5 20a5.5 5.5 0 0 1 11 0" />
      </svg>
    )
  }

  if (name === 'deck') {
    return (
      <svg {...commonProps}>
        <path d="M4 7h16M6 7v10m12-10v10M3 17h18M8 11h8" />
      </svg>
    )
  }

  if (name === 'climate') {
    return (
      <svg {...commonProps}>
        <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M9 4.7 12 7l3-2.3M4.8 10.5 8.3 10l.5-3.5M4.8 15.5 8.3 16l.5 3.5M9 19.3l3-2.3 3 2.3M19.2 15.5l-3.5.5-.5 3.5M19.2 10.5l-3.5-.5-.5-3.5" />
      </svg>
    )
  }

  if (name === 'connectivity') {
    return (
      <svg {...commonProps}>
        <path d="M4.5 9.5a11.5 11.5 0 0 1 15 0M7.5 13a7 7 0 0 1 9 0M10.5 16.5a2.5 2.5 0 0 1 3 0" />
        <circle cx="12" cy="19" fill="currentColor" r=".8" stroke="none" />
      </svg>
    )
  }

  if (name === 'cooking') {
    return (
      <svg {...commonProps}>
        <path d="M5 10h14v3a7 7 0 0 1-14 0v-3Zm-2 0h18M8 6c0-1 1-1.5 1-3m4 3c0-1 1-1.5 1-3" />
      </svg>
    )
  }

  if (name === 'energy') {
    return (
      <svg {...commonProps}>
        <path d="m13.5 2-7 11h5L10.5 22l7-12h-5l1-8Z" />
      </svg>
    )
  }

  if (name === 'exclusiveUse') {
    return (
      <svg {...commonProps}>
        <path d="M4 20V9l8-5 8 5v11M8 20v-6h8v6M3 20h18" />
        <path d="m15.5 9.5 1.5 1.5 3-3" />
      </svg>
    )
  }

  if (name === 'parking') {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 17V7h3a3 3 0 0 1 0 6h-3" />
      </svg>
    )
  }

  if (name === 'pool') {
    return (
      <svg {...commonProps}>
        <path d="M3 15c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1M3 19c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1M7 11V6.5A2.5 2.5 0 0 1 9.5 4M7 8h6" />
      </svg>
    )
  }

  if (name === 'rainwater') {
    return (
      <svg {...commonProps}>
        <path d="M12 3s5 5.5 5 10a5 5 0 0 1-10 0c0-4.5 5-10 5-10Z" />
        <path d="M9.5 14.5a3 3 0 0 0 2.5 1.25" />
      </svg>
    )
  }

  if (name === 'sharedSpaces') {
    return (
      <svg {...commonProps}>
        <path d="M4 20V9l8-5 8 5v11M8 20v-6h8v6M3 20h18" />
      </svg>
    )
  }

  if (name === 'service') {
    return (
      <svg {...commonProps}>
        <path d="M4 7h16l-1 12H5L4 7Zm2-3h12M8 11c1 1 2 1.5 4 1.5s3-.5 4-1.5" />
      </svg>
    )
  }

  if (name === 'television') {
    return (
      <svg {...commonProps}>
        <rect height="12" rx="1.5" width="18" x="3" y="6" />
        <path d="m9 3 3 3 3-3M9 21h6" />
      </svg>
    )
  }

  if (name === 'transport') {
    return (
      <svg {...commonProps}>
        <circle cx="7" cy="17" r="2.5" />
        <circle cx="17" cy="17" r="2.5" />
        <path d="M9.5 17h5l-2.5-5H8.5L7 9h3m2 3 3-3h3" />
      </svg>
    )
  }

  if (name === 'water') {
    return (
      <svg {...commonProps}>
        <path d="M12 3s5 5.5 5 10a5 5 0 0 1-10 0c0-4.5 5-10 5-10Z" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M3.5 12s3.2-5 8.5-5 8.5 5 8.5 5-3.2 5-8.5 5-8.5-5-8.5-5Z" />
      <circle cx="12" cy="12" r="2.25" />
    </svg>
  )
}

/**
 * A quiet definition list for verified accommodation details.
 * Icons are optional presentation cues; the text remains the accessible source of meaning.
 */
export function EditorialAmenityList({className = '', items}: EditorialAmenityListProps) {
  if (items.length === 0) return null

  return (
    <dl className={`grid gap-x-7 gap-y-5 sm:grid-cols-2 ${className}`}>
      {items.map((item) => (
        <div className={item.icon ? 'grid grid-cols-[1.25rem_1fr] gap-x-3' : ''} key={item.title}>
          {item.icon ? (
            <span className="mt-0.5 text-accent">
              <AmenityIcon name={item.icon} />
            </span>
          ) : null}
          <div>
            <dt className="font-body text-[0.6875rem] font-semibold tracking-[0.14em] text-ink-subtle uppercase">
              {item.title}
            </dt>
            <dd className="mt-1 font-body text-sm leading-6 text-ink/78">{item.description}</dd>
          </div>
        </div>
      ))}
    </dl>
  )
}
