import type {ReactNode} from 'react'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'

import type {MapCoordinates} from './types'

type EditorialMapSectionProps = {
  children?: ReactNode
  coordinates?: MapCoordinates
  directionsUrl?: string
  eyebrow: string
  explorerHref?: string
  heading: string
  locationLabel?: string
  titleId: string
}

function formatCoordinate(value: number, positive: string, negative: string) {
  return `${Math.abs(value).toFixed(5)}° ${value >= 0 ? positive : negative}`
}

export function EditorialMapSection({
  children,
  coordinates,
  directionsUrl,
  eyebrow,
  explorerHref,
  heading,
  locationLabel,
  titleId,
}: EditorialMapSectionProps) {
  const formattedCoordinates = coordinates
    ? `${formatCoordinate(coordinates.latitude, 'N', 'S')} · ${formatCoordinate(coordinates.longitude, 'E', 'W')}`
    : undefined

  return (
    <SectionSpacing aria-labelledby={titleId} size="generous">
      <EditorialContainer>
        <EditorialGrid gap="generous">
          <div
            className={
              children
                ? 'lg:col-span-4 lg:self-end lg:pb-8'
                : 'max-w-2xl lg:col-span-7 lg:col-start-3'
            }
          >
            <EditorialText variant="eyebrow">{eyebrow}</EditorialText>
            <EditorialText
              as="h2"
              className="mt-7"
              headingSize="small"
              id={titleId}
              variant="heading"
            >
              {heading}
            </EditorialText>
            {locationLabel ? (
              <EditorialText className="mt-8 max-w-sm" variant="body">
                {locationLabel}
              </EditorialText>
            ) : null}
            {formattedCoordinates ? (
              <EditorialText
                className="mt-4 font-mono text-[0.75rem] tracking-[0.08em]"
                variant="caption"
              >
                {formattedCoordinates}
              </EditorialText>
            ) : null}
            {directionsUrl || explorerHref ? (
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
                {directionsUrl ? (
                  <a
                    className="inline-flex rounded-sm font-body text-xs font-semibold tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                    href={directionsUrl}
                  >
                    Open directions
                  </a>
                ) : null}
                {explorerHref ? (
                  <a
                    className="inline-flex rounded-sm font-body text-xs font-semibold tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                    href={explorerHref}
                  >
                    Open the Explorer
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          {children ? <div className="min-w-0 lg:col-span-8">{children}</div> : null}
        </EditorialGrid>
      </EditorialContainer>
    </SectionSpacing>
  )
}
