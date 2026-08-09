import {
  EditorialContainer,
  EditorialGrid,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import type {DestinationDetailData} from '@/sanity/types'

type DestinationMapPlaceholderProps = {
  location?: DestinationDetailData['mapLocation']
}

function formatCoordinate(value: number, positive: string, negative: string) {
  return `${Math.abs(value).toFixed(5)}° ${value >= 0 ? positive : negative}`
}

export function DestinationMapPlaceholder({location}: DestinationMapPlaceholderProps) {
  if (!location?.label && !location?.coordinates) return null

  const coordinates = location.coordinates
    ? `${formatCoordinate(location.coordinates.lat, 'N', 'S')} · ${formatCoordinate(location.coordinates.lng, 'E', 'W')}`
    : undefined

  return (
    <SectionSpacing aria-labelledby="destination-map-title" size="generous">
      <EditorialContainer>
        <EditorialGrid gap="generous">
          <div className="lg:col-span-4 lg:self-end lg:pb-8">
            <EditorialText variant="eyebrow">Map</EditorialText>
            <EditorialText
              as="h2"
              className="mt-7"
              headingSize="small"
              id="destination-map-title"
              variant="heading"
            >
              A point in the landscape.
            </EditorialText>
            {location.label ? (
              <EditorialText className="mt-8 max-w-sm" variant="body">
                {location.label}
              </EditorialText>
            ) : null}
            {coordinates ? (
              <EditorialText className="mt-4 font-mono text-[0.75rem] tracking-[0.08em]" variant="caption">
                {coordinates}
              </EditorialText>
            ) : null}
            {location.directionsUrl ? (
              <a
                className="mt-8 inline-flex rounded-sm font-body text-xs font-semibold tracking-[0.04em] text-charcoal underline decoration-charcoal/30 underline-offset-8 hover:decoration-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
                href={location.directionsUrl}
              >
                Open directions
              </a>
            ) : null}
          </div>

          <div
            aria-label={`Map reserved for ${location.label ?? 'this destination'}`}
            className="relative min-h-[28rem] overflow-hidden bg-charcoal lg:col-span-8 lg:min-h-[42rem]"
            role="img"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_44%,rgba(183,176,166,0.24),transparent_2px),radial-gradient(circle_at_62%_44%,transparent_0,transparent_21%,rgba(183,176,166,0.13)_21.2%,transparent_21.6%,transparent_34%,rgba(183,176,166,0.1)_34.2%,transparent_34.6%),linear-gradient(128deg,transparent_0%,transparent_46%,rgba(246,242,235,0.08)_46.2%,transparent_46.5%,transparent_100%)]" />
            <div className="absolute top-1/2 left-[62%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-linen/80">
              <span className="absolute top-1/2 left-1/2 h-px w-12 -translate-x-1/2 -translate-y-1/2 bg-linen/35" />
              <span className="absolute top-1/2 left-1/2 h-12 w-px -translate-x-1/2 -translate-y-1/2 bg-linen/35" />
            </div>
            <p className="absolute right-6 bottom-6 left-6 font-body text-[0.6875rem] font-semibold tracking-[0.2em] text-linen/45 uppercase sm:right-8 sm:bottom-8 sm:left-8">
              Interactive map reserved for a future provider
            </p>
          </div>
        </EditorialGrid>
      </EditorialContainer>
    </SectionSpacing>
  )
}
