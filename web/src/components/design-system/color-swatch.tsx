type ColorSwatchProps = {
  className: string
  hex: string
  name: string
  usage: string
}

export function ColorSwatch({className, hex, name, usage}: ColorSwatchProps) {
  return (
    <li className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div aria-hidden="true" className={`h-32 ${className}`} />
      <div className="p-5 font-body">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-semibold text-ink">{name}</h3>
          <code className="text-xs tracking-[0.08em] text-ink-subtle uppercase">{hex}</code>
        </div>
        <p className="mt-2 text-sm leading-6 text-ink-muted">{usage}</p>
      </div>
    </li>
  )
}
