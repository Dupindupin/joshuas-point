import {
  EditorialContainer,
  EditorialGrid,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import type {DestinationDetailData} from '@/sanity/types'

type DestinationTravelInformationProps = {
  highlights?: string[]
  information?: DestinationDetailData['travelInformation']
  lastReviewedAt?: string
  thingsToBring?: string[]
  tips?: string[]
}

const transportLabels: Record<string, string> = {
  boat: 'Boat',
  car: 'Car',
  hiredDriver: 'Hired driver',
  publicTransport: 'Public transport',
  scooter: 'Scooter',
  walking: 'Walking',
}

const difficultyLabels: Record<string, string> = {
  demanding: 'Demanding',
  easy: 'Easy',
  moderate: 'Moderate',
}

function formatFee(
  fee: NonNullable<DestinationDetailData['travelInformation']>['entranceFee'],
) {
  if (fee?.amount === undefined) return fee?.notes?.trim()
  if (!fee.currency) return String(fee.amount)

  try {
    return new Intl.NumberFormat('en-PH', {
      currency: fee.currency,
      maximumFractionDigits: Number.isInteger(fee.amount) ? 0 : 2,
      style: 'currency',
    }).format(fee.amount)
  } catch {
    return `${fee.currency} ${fee.amount}`
  }
}

function formatReviewDate(value: string) {
  const date = new Date(`${value}T00:00:00Z`)
  if (Number.isNaN(date.valueOf())) return value

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(date)
}

function EditorialList({items}: {items: string[]}) {
  return (
    <ul className="mt-7 space-y-4 font-body text-base leading-8 text-linen/75 sm:text-lg sm:leading-9">
      {items.map((item) => (
        <li className="border-t border-linen/20 pt-4" key={item}>
          {item}
        </li>
      ))}
    </ul>
  )
}

export function DestinationTravelInformation({
  highlights = [],
  information,
  lastReviewedAt,
  thingsToBring = [],
  tips = [],
}: DestinationTravelInformationProps) {
  const fee = formatFee(information?.entranceFee)
  const transports = information?.recommendedTransport ?? []
  const hasPrimaryInformation = Boolean(
    information?.travelTimeFromJoshuaPoint?.displayLabel ||
      transports.length > 0 ||
      information?.difficulty ||
      information?.bestTimeToVisit ||
      fee ||
      information?.openingHours?.hours,
  )
  const hasSupportingInformation =
    highlights.length > 0 || thingsToBring.length > 0 || tips.length > 0

  if (!hasPrimaryInformation && !hasSupportingInformation) return null

  return (
    <SectionSpacing aria-labelledby="travel-information-title" className="bg-charcoal text-linen" size="generous">
      <EditorialContainer>
        <EditorialGrid>
          <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
            Travel information
          </EditorialText>
          <div className="lg:col-span-9 lg:col-start-4">
            <EditorialText
              as="h2"
              className="max-w-3xl"
              headingSize="medium"
              id="travel-information-title"
              tone="inverse"
              variant="heading"
            >
              Before setting out.
            </EditorialText>

            {hasPrimaryInformation ? (
              <dl className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-20">
                {information?.travelTimeFromJoshuaPoint?.displayLabel ? (
                  <div className="border-t border-linen/20 pt-5">
                    <dt className="font-body text-xs font-semibold tracking-[0.18em] text-linen/55 uppercase">
                      From Joshua&apos;s Point
                    </dt>
                    <dd className="mt-3 font-body text-base leading-8 text-linen/78">
                      {information.travelTimeFromJoshuaPoint.displayLabel}
                    </dd>
                  </div>
                ) : null}

                {transports.length > 0 ? (
                  <div className="border-t border-linen/20 pt-5">
                    <dt className="font-body text-xs font-semibold tracking-[0.18em] text-linen/55 uppercase">
                      Recommended transport
                    </dt>
                    <dd className="mt-3 font-body text-base leading-8 text-linen/78">
                      {transports.map((transport) => transportLabels[transport] ?? transport).join(', ')}
                    </dd>
                  </div>
                ) : null}

                {information?.difficulty ? (
                  <div className="border-t border-linen/20 pt-5">
                    <dt className="font-body text-xs font-semibold tracking-[0.18em] text-linen/55 uppercase">
                      Visitor difficulty
                    </dt>
                    <dd className="mt-3 font-body text-base leading-8 text-linen/78">
                      {difficultyLabels[information.difficulty] ?? information.difficulty}
                    </dd>
                  </div>
                ) : null}

                {fee ? (
                  <div className="border-t border-linen/20 pt-5">
                    <dt className="font-body text-xs font-semibold tracking-[0.18em] text-linen/55 uppercase">
                      Entrance fee
                    </dt>
                    <dd className="mt-3 font-body text-base leading-8 text-linen/78">
                      {fee}
                      {information?.entranceFee?.amount !== undefined &&
                      information.entranceFee.notes ? (
                        <span className="mt-2 block text-sm leading-7 text-linen/60">
                          {information.entranceFee.notes}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ) : null}

                {information?.openingHours?.hours ? (
                  <div className="border-t border-linen/20 pt-5">
                    <dt className="font-body text-xs font-semibold tracking-[0.18em] text-linen/55 uppercase">
                      Opening hours
                    </dt>
                    <dd className="mt-3 font-body text-base leading-8 text-linen/78">
                      {information.openingHours.hours}
                      {information.openingHours.qualification ? (
                        <span className="mt-2 block text-sm leading-7 text-linen/60">
                          {information.openingHours.qualification}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ) : null}

                {information?.bestTimeToVisit ? (
                  <div className="border-t border-linen/20 pt-5 sm:col-span-2">
                    <dt className="font-body text-xs font-semibold tracking-[0.18em] text-linen/55 uppercase">
                      Best time to visit
                    </dt>
                    <dd className="mt-3 max-w-2xl font-body text-base leading-8 text-linen/78">
                      {information.bestTimeToVisit}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>
        </EditorialGrid>

        {hasSupportingInformation ? (
          <EditorialGrid className="mt-24 lg:mt-32" gap="generous">
            {highlights.length > 0 ? (
              <div className="lg:col-span-4">
                <EditorialText tone="inverse" variant="eyebrow">
                  What to expect
                </EditorialText>
                <EditorialList items={highlights} />
              </div>
            ) : null}
            {thingsToBring.length > 0 ? (
              <div className="lg:col-span-4">
                <EditorialText tone="inverse" variant="eyebrow">
                  Things to bring
                </EditorialText>
                <EditorialList items={thingsToBring} />
              </div>
            ) : null}
            {tips.length > 0 ? (
              <div className="lg:col-span-4">
                <EditorialText tone="inverse" variant="eyebrow">
                  Field notes
                </EditorialText>
                <EditorialList items={tips} />
              </div>
            ) : null}
          </EditorialGrid>
        ) : null}

        {lastReviewedAt ? (
          <EditorialText className="mt-16 text-linen/50" tone="inverse" variant="caption">
            Practical information last reviewed {formatReviewDate(lastReviewedAt)}.
          </EditorialText>
        ) : null}
      </EditorialContainer>
    </SectionSpacing>
  )
}
