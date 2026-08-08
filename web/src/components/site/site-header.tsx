import Link from 'next/link'

type HeaderAppearance = 'transparent' | 'solid'

type NavigationItem = {
  href: string
  label: string
}

type SiteHeaderProps = {
  activeHref?: string
  appearance?: HeaderAppearance
}

const primaryNavigation: readonly NavigationItem[] = [
  {href: '/', label: 'Home'},
  {href: '/the-house', label: 'The House'},
  {href: '/experiences', label: 'Experiences'},
  {href: '/journal', label: 'Journal'},
  {href: '/contact', label: 'Contact'},
]

const appearanceClasses: Record<HeaderAppearance, string> = {
  transparent: 'border-transparent bg-transparent text-linen',
  solid: 'border-stone/35 bg-linen text-charcoal',
}

const bookStayClasses: Record<HeaderAppearance, string> = {
  transparent: 'border-linen/55 text-linen hover:border-linen hover:bg-linen hover:text-charcoal',
  solid: 'border-charcoal/35 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-linen',
}

const focusClasses: Record<HeaderAppearance, string> = {
  transparent: 'focus-visible:outline-linen',
  solid: 'focus-visible:outline-forest',
}

export function SiteWordmark({appearance}: {appearance: HeaderAppearance}) {
  return (
    <Link
      aria-label="Joshua’s Point home"
      className={`shrink-0 font-display text-[1.35rem] leading-none font-semibold tracking-[-0.025em] sm:text-[1.6rem] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 ${focusClasses[appearance]}`}
      href="/"
    >
      Joshua’s Point
    </Link>
  )
}

function PrimaryNavigation({
  activeHref,
  appearance,
}: {
  activeHref?: string
  appearance: HeaderAppearance
}) {
  return (
    <nav aria-label="Primary navigation" className="hidden lg:block">
      <ul className="flex items-center gap-8 xl:gap-10">
        {primaryNavigation.map((item) => (
          <li key={item.href}>
            <Link
              aria-current={activeHref === item.href ? 'page' : undefined}
              className={`rounded-sm font-body text-[0.8125rem] leading-6 font-medium tracking-[0.025em] opacity-80 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 aria-[current=page]:opacity-100 ${focusClasses[appearance]}`}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function MobileMenuButton({appearance}: {appearance: HeaderAppearance}) {
  return (
    <button
      aria-expanded="false"
      aria-label="Open main menu"
      className={`inline-flex size-12 items-center justify-center rounded-full border border-current/35 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-4 ${focusClasses[appearance]}`}
      type="button"
    >
      <span aria-hidden="true" className="flex w-[1.125rem] flex-col gap-[0.3125rem]">
        <span className="h-px w-full bg-current" />
        <span className="h-px w-full bg-current" />
      </span>
    </button>
  )
}

export function SiteHeader({activeHref, appearance = 'transparent'}: SiteHeaderProps) {
  return (
    <header
      className={`absolute inset-x-0 top-0 z-20 border-b ${appearanceClasses[appearance]}`}
      data-appearance={appearance}
    >
      <div className="mx-auto flex h-24 w-full max-w-7xl items-center justify-between gap-6 px-6 sm:px-8 md:px-10">
        <SiteWordmark appearance={appearance} />

        <PrimaryNavigation activeHref={activeHref} appearance={appearance} />

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            className={`inline-flex min-h-11 items-center justify-center rounded-full border px-3 py-2.5 font-body text-[0.6875rem] font-semibold tracking-[0.04em] sm:px-5 sm:text-xs focus-visible:outline-2 focus-visible:outline-offset-4 ${bookStayClasses[appearance]} ${focusClasses[appearance]}`}
            href="/contact"
          >
            Book Stay
          </Link>
          <MobileMenuButton appearance={appearance} />
        </div>
      </div>
    </header>
  )
}
