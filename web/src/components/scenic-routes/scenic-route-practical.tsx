import {
  EditorialContainer,
  EditorialGrid,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import type {ScenicRouteDetailData} from '@/sanity/queries/scenic-routes'

type ScenicRoutePracticalProps = Pick<
  ScenicRouteDetailData,
  'safetyNotes' | 'scooterGuide' | 'travelTime'
>

const difficultyLabels = {
  demanding: 'Demanding',
  easy: 'Easy',
  moderate: 'Moderate',
} as const

const roadQualityLabels = {
  mixed: 'Mixed surface',
  paved: 'Paved',
  rough: 'Rough sections',
  variable: 'Condition variable',
} as const

export function ScenicRoutePractical({
  safetyNotes,
  scooterGuide,
  travelTime,
}: ScenicRoutePracticalProps) {
  const details = [
    travelTime?.displayLabel
      ? {label: 'Travel time', value: travelTime.displayLabel}
      : undefined,
    scooterGuide?.roadQuality
      ? {label: 'Road quality', value: roadQualityLabels[scooterGuide.roadQuality]}
      : undefined,
    scooterGuide?.difficulty
      ? {label: 'Scooter difficulty', value: difficultyLabels[scooterGuide.difficulty]}
      : undefined,
    scooterGuide?.parking ? {label: 'Parking', value: scooterGuide.parking} : undefined,
    scooterGuide?.fuel ? {label: 'Fuel', value: scooterGuide.fuel} : undefined,
    scooterGuide?.routeNotes ? {label: 'Route notes', value: scooterGuide.routeNotes} : undefined,
    scooterGuide?.lastReviewedAt
      ? {
          label: 'Route reviewed',
          value: new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(new Date(`${scooterGuide.lastReviewedAt}T00:00:00`)),
        }
      : undefined,
  ].filter((detail): detail is {label: string; value: string} => Boolean(detail?.value.trim()))

  if (details.length === 0 && !safetyNotes?.trim()) return null

  return (
    <SectionSpacing aria-labelledby="route-practical-title" size="generous">
      <EditorialContainer>
        <EditorialGrid gap="generous">
          <EditorialText className="lg:col-span-2" variant="eyebrow">
            Practical guidance
          </EditorialText>
          <div className="lg:col-span-8 lg:col-start-4">
            <EditorialText
              as="h2"
              headingSize="medium"
              id="route-practical-title"
              variant="heading"
            >
              What to know before the ride.
            </EditorialText>

            {details.length > 0 ? (
              <dl className="mt-12 border-t border-ink/15 sm:mt-16">
                {details.map((detail) => (
                  <div
                    className="grid gap-3 border-b border-ink/15 py-6 sm:grid-cols-3 sm:gap-8"
                    key={detail.label}
                  >
                    <dt className="font-body text-xs font-semibold tracking-[0.12em] text-ink-subtle uppercase">
                      {detail.label}
                    </dt>
                    <dd className="font-body text-sm leading-7 text-ink/75 sm:col-span-2">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {safetyNotes?.trim() ? (
              <div className="mt-12 max-w-2xl sm:mt-16">
                <EditorialText variant="eyebrow">Safety and alternatives</EditorialText>
                <EditorialText className="mt-6" variant="body">
                  {safetyNotes}
                </EditorialText>
              </div>
            ) : null}
          </div>
        </EditorialGrid>
      </EditorialContainer>
    </SectionSpacing>
  )
}
