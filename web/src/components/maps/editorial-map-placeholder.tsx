import type {MapProviderName, NormalizedEditorialMapData} from './types'

type EditorialMapPlaceholderProps = {
  ariaLabel: string
  data: NormalizedEditorialMapData
  provider?: MapProviderName
}

export function EditorialMapPlaceholder({ariaLabel, data, provider}: EditorialMapPlaceholderProps) {
  const pointCount = data.markers.length || (data.coordinates ? 1 : 0)
  const routeCount = data.routes.length
  const status = provider ? 'Map view is temporarily unavailable' : 'Map view is unavailable'

  return (
    <div
      aria-label={`${ariaLabel}. ${status}.`}
      className="relative h-full min-h-[28rem] overflow-hidden bg-map-surface lg:min-h-[42rem]"
      data-motion-surface="map"
      role="img"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_31%,rgba(246,242,235,0.045)_31.2%,transparent_31.5%,transparent_66%,rgba(246,242,235,0.035)_66.2%,transparent_66.5%),radial-gradient(circle_at_67%_38%,rgba(183,176,166,0.16),transparent_1.5px)] bg-[size:auto,34px_34px]" />

      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full text-inverse"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 800 620"
      >
        <path
          d="M-60 502C89 432 118 518 258 431C373 359 453 390 560 304C653 230 734 262 866 152"
          opacity="0.16"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M-34 548C108 475 158 570 294 475C394 405 480 425 586 346C684 273 752 292 846 228"
          opacity="0.08"
          stroke="currentColor"
          strokeWidth="1"
        />
        <path
          d="M-96 449C39 385 102 466 224 380C345 295 427 345 528 254C622 170 719 210 892 92"
          opacity="0.08"
          stroke="currentColor"
          strokeWidth="1"
        />
        {routeCount > 0 ? (
          <path
            data-map-motion="route"
            d="M106 486C198 423 259 447 337 369C410 296 487 344 562 260C611 206 656 185 712 144"
            opacity="0.52"
            stroke="currentColor"
            strokeDasharray="3 8"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        ) : null}
      </svg>

      {pointCount > 0 ? (
        <div
          aria-hidden="true"
          className="absolute top-[42%] left-[63%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-inverse/80"
          data-map-motion="marker"
        >
          <span className="absolute top-1/2 left-1/2 h-px w-12 -translate-x-1/2 -translate-y-1/2 bg-canvas/30" />
          <span className="absolute top-1/2 left-1/2 h-12 w-px -translate-x-1/2 -translate-y-1/2 bg-canvas/30" />
        </div>
      ) : null}

      <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-8 sm:right-8 sm:bottom-8 sm:left-8">
        <p className="max-w-sm font-body text-[0.6875rem] font-semibold tracking-[0.2em] text-inverse/65 uppercase">
          {status}
        </p>
        <p
          aria-hidden="true"
          className="hidden font-body text-[0.625rem] tracking-[0.12em] text-inverse/30 uppercase sm:block"
        >
          {pointCount} {pointCount === 1 ? 'point' : 'points'} · {routeCount}{' '}
          {routeCount === 1 ? 'route' : 'routes'}
        </p>
      </div>
    </div>
  )
}
