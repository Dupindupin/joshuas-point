import type {Metadata} from 'next'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialMedia,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {VerificationNote} from '@/components/getting-here/verification-note'
import {SiteHeader} from '@/components/site/site-header'

export const metadata: Metadata = {
  title: "Getting Here | Joshua's Point",
  description:
    'A calm orientation for reaching Joshua’s Point by air, sea, road, and local transport.',
}

const arrivalApproaches = [
  {
    description:
      'This chapter will describe the confirmed handoff from an airport or ferry arrival, the journey south, appropriate ground transport, and the final approach to Joshua’s Point.',
    eyebrow: 'Arriving via Dumaguete',
    title: 'From the eastern coast.',
    verification:
      'Confirm current arrival points, operating services, transfer options, road route, meeting procedure, and travel-time range before publication.',
  },
  {
    description:
      'This chapter will explain the longer overland arrival as one continuous journey, including the suitable route, sensible pauses, and how the final handoff should be arranged.',
    eyebrow: 'Arriving via Bacolod',
    title: 'A journey across the island.',
    verification:
      'Confirm the current cross-island route, road conditions, transport options, stopping guidance, meeting procedure, and travel-time range before publication.',
  },
] as const

const connections = [
  {
    description:
      'Flight guidance will compare only routes that are operating and useful to a Joshua’s Point arrival. It will keep airline, schedule, luggage, and onward-transfer details separate from the enduring story of the journey.',
    title: 'Flights',
    verification:
      'Verify operating airports, routes, carriers, schedules, baggage conditions, and the ground-transport handoff close to publication and again before travel.',
  },
  {
    description:
      'Ferry guidance will treat the sea crossing and the journey onward as one chain, with enough context to understand the arrival port without presenting a connection as guaranteed.',
    title: 'Ferries',
    verification:
      'Verify ports, operators, schedules, check-in requirements, vehicle rules, disruption guidance, and onward transport before naming any service.',
  },
] as const

const roadApproaches = [
  {
    description:
      'The published route will identify the verified road south, the final turn sequence, suitable landmarks, and the point at which guests should contact the host if orientation becomes uncertain.',
    number: '01',
    title: 'Driving from Dumaguete',
    verification:
      'Turn-by-turn directions, landmarks, road conditions, fuel guidance, and final property access remain withheld until a complete route check is recorded.',
  },
  {
    description:
      'The published route will describe the cross-island drive as a changing landscape, while keeping navigation concise, current, and easy to save offline.',
    number: '02',
    title: 'Driving from Bacolod',
    verification:
      'Route choice, road conditions, safe stopping points, fuel guidance, daylight recommendation, and final property access require field verification.',
  },
] as const

const localGuidance = [
  {
    description:
      'A scooter can change the pace of a stay, but it should never be presented as the default arrival choice. Guidance must begin with rider experience, licence, insurance, luggage, weather, road conditions, and a careful vehicle check.',
    position: 'lg:col-span-7 lg:col-start-2',
    title: 'Scooter rental guidance',
    verification:
      'Verify reputable rental process, documentation, insurance limitations, equipment, collection and return arrangements, current road suitability, and emergency contacts. Do not publish a provider recommendation without direct review.',
  },
  {
    description:
      'Local transport guidance should make the last part of the journey easier to understand without implying that a vehicle, driver, or public service is always available.',
    position: 'lg:col-span-6 lg:col-start-6',
    title: 'Local transport',
    verification:
      'Confirm which transfer, hired-vehicle, taxi, or public-transport options are genuinely available, how they are arranged, payment expectations, luggage suitability, and the correct meeting point.',
  },
  {
    description:
      'A thoughtful provisions stop can make arrival feel unhurried. Suggestions should favor a practical place on the verified route rather than turn this page into a directory.',
    position: 'lg:col-span-7 lg:col-start-3',
    title: 'Grocery stops',
    verification:
      'Name a stop only after confirming its location, opening pattern, parking, payment options, useful provisions, route impact, and last-reviewed date.',
  },
] as const

const arrivalRecommendations = [
  {
    description:
      'Coordinate the air or sea arrival and the final ground journey as one plan before committing to an inflexible connection.',
    title: 'Plan the full arrival.',
  },
  {
    description:
      'Keep the confirmed address, contact details, meeting instructions, and essential travel documents available without relying on a mobile signal.',
    title: 'Carry the final details offline.',
  },
  {
    description:
      'Schedules, weather, road conditions, and crossings can change. Protect the arrival from unnecessary pressure by leaving space between its parts.',
    title: 'Leave room for change.',
  },
  {
    description:
      'If an arrival changes, contact the host through the confirmed channel before beginning the final leg of the journey.',
    title: 'Share changes early.',
  },
] as const

const arrivalQuestions = [
  {
    answer:
      'There is no universal answer. The useful route depends on the guest’s point of origin, operating connections, ground journey, luggage, and preferred pace. A comparison will be published only after both arrival paths are verified.',
    question: 'Should I arrive via Dumaguete or Bacolod?',
  },
  {
    answer:
      'Transfer availability, booking procedure, notice period, vehicle type, capacity, and payment have not yet been verified for publication. Confirm directly with Joshua’s Point before relying on a transfer.',
    question: 'Can Joshua’s Point arrange a transfer?',
  },
  {
    answer:
      'Do not assume that separate services form a protected connection. Current arrival, check-in, disruption, and ground-transport details must be checked for the specific travel date.',
    question: 'Can a ferry and onward journey be booked as one connection?',
  },
  {
    answer:
      'Do not assume a scooter is suitable for the arrival journey. Rider experience, documentation, insurance, luggage, weather, road conditions, and collection arrangements all need individual consideration.',
    question: 'Is arriving by scooter recommended?',
  },
  {
    answer:
      'Named grocery suggestions remain under review. The final guide will include only stops whose route, hours, parking, payment options, and practical usefulness have been verified.',
    question: 'Where should we stop for groceries?',
  },
  {
    answer:
      'Late-arrival procedure, road guidance, host availability, and any daylight recommendation require confirmation. Do not plan a late final approach without agreeing it directly with Joshua’s Point.',
    question: 'Is a late arrival possible?',
  },
] as const

export default function GettingHerePage() {
  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-linen">
        <EditorialPageHero
          eyebrow="Getting Here"
          introduction="A calm orientation for the journey to Joshua’s Point, with every changing detail checked close to travel."
          title="The journey here."
        />

        <SectionSpacing aria-labelledby="arrival-orientation-title" size="generous">
          <EditorialContainer size="reading">
            <EditorialText variant="eyebrow">Before setting out</EditorialText>
            <EditorialText className="mt-9" id="arrival-orientation-title" variant="lead">
              A good arrival leaves room for the road.
            </EditorialText>
            <EditorialText className="mt-12 max-w-2xl" variant="body">
              This guide is designed to bring air, sea, road, and the final handoff into one clear
              sequence. Transport schedules, operators, road conditions, and transfer arrangements
              can change, so the page separates enduring orientation from facts that require a
              current local check.
            </EditorialText>
            <VerificationNote className="mt-12 max-w-2xl">
              This production draft intentionally contains no travel times, operators, schedules,
              turn-by-turn directions, or named service recommendations. Each will be added only
              after verification and dated review.
            </VerificationNote>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="arrival-approaches-title"
          className="bg-charcoal"
          size="immersive"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
                Two approaches
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="medium"
                id="arrival-approaches-title"
                tone="inverse"
                variant="heading"
              >
                Choose the journey as carefully as the destination.
              </EditorialText>
            </EditorialGrid>

            <div className="mt-24 border-t border-linen/18 sm:mt-32 lg:ml-[16.666667%]">
              {arrivalApproaches.map((approach) => (
                <article
                  className="grid gap-10 border-b border-linen/18 py-14 lg:grid-cols-10 lg:gap-x-16 lg:py-20"
                  key={approach.eyebrow}
                >
                  <div className="lg:col-span-5">
                    <EditorialText tone="inverse" variant="eyebrow">
                      {approach.eyebrow}
                    </EditorialText>
                    <EditorialText
                      as="h3"
                      className="mt-7"
                      headingSize="small"
                      tone="inverse"
                      variant="heading"
                    >
                      {approach.title}
                    </EditorialText>
                  </div>
                  <div className="lg:col-span-5 lg:pt-9">
                    <EditorialText tone="inverse" variant="body">
                      {approach.description}
                    </EditorialText>
                    <VerificationNote className="mt-9" tone="inverse">
                      {approach.verification}
                    </VerificationNote>
                  </div>
                </article>
              ))}
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="connections-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <div className="lg:col-span-4">
                <EditorialText variant="eyebrow">Air and sea</EditorialText>
                <EditorialText
                  className="mt-7 max-w-md"
                  headingSize="small"
                  id="connections-title"
                  variant="heading"
                >
                  The first part of the journey.
                </EditorialText>
              </div>

              <div className="border-t border-charcoal/18 lg:col-span-7 lg:col-start-6">
                {connections.map((connection) => (
                  <article
                    className="border-b border-charcoal/18 py-12 sm:py-14"
                    key={connection.title}
                  >
                    <EditorialText as="h3" headingSize="small" variant="heading">
                      {connection.title}
                    </EditorialText>
                    <EditorialText className="mt-8 max-w-2xl" variant="body">
                      {connection.description}
                    </EditorialText>
                    <VerificationNote className="mt-9 max-w-2xl">
                      {connection.verification}
                    </VerificationNote>
                  </article>
                ))}
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="The road toward Joshua’s Point" size="standard">
          <figure>
            <EditorialMedia ratio="panoramic" sizes="100vw" tone="stone" />
            <EditorialContainer>
              <EditorialText as="figcaption" className="mt-4 max-w-lg" variant="caption">
                Photography placeholder: the final road journey will be documented only after the
                verified route is established.
              </EditorialText>
            </EditorialContainer>
          </figure>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="driving-directions-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Driving directions
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="medium"
                id="driving-directions-title"
                variant="heading"
              >
                Directions that remain useful when the signal does not.
              </EditorialText>
            </EditorialGrid>

            <ol className="mt-20 space-y-20 sm:mt-28 sm:space-y-28">
              {roadApproaches.map((approach, index) => (
                <li key={approach.title}>
                  <EditorialGrid gap="generous">
                    <p
                      aria-hidden="true"
                      className={`font-display text-[4rem] leading-none text-charcoal/16 sm:text-[5rem] ${
                        index % 2 === 0
                          ? 'lg:col-span-2 lg:col-start-2'
                          : 'lg:col-span-2 lg:col-start-3'
                      }`}
                    >
                      {approach.number}
                    </p>
                    <article
                      className={
                        index % 2 === 0
                          ? 'lg:col-span-7 lg:col-start-4'
                          : 'lg:col-span-7 lg:col-start-5'
                      }
                    >
                      <EditorialText as="h3" headingSize="small" variant="heading">
                        {approach.title}
                      </EditorialText>
                      <EditorialText className="mt-9 max-w-2xl" variant="body">
                        {approach.description}
                      </EditorialText>
                      <VerificationNote className="mt-10 max-w-2xl">
                        {approach.verification}
                      </VerificationNote>
                    </article>
                  </EditorialGrid>
                </li>
              ))}
            </ol>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="local-guidance-title"
          className="bg-stone/20"
          size="immersive"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                The final leg
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="medium"
                id="local-guidance-title"
                variant="heading"
              >
                Movement, provisions, and arriving prepared.
              </EditorialText>
            </EditorialGrid>

            <div className="mt-24 grid grid-cols-1 gap-y-24 sm:mt-32 sm:gap-y-32 lg:grid-cols-12">
              {localGuidance.map((guidance) => (
                <article className={guidance.position} key={guidance.title}>
                  <EditorialText as="h3" headingSize="small" variant="heading">
                    {guidance.title}
                  </EditorialText>
                  <EditorialText className="mt-9 max-w-2xl" variant="body">
                    {guidance.description}
                  </EditorialText>
                  <VerificationNote className="mt-10 max-w-2xl">
                    {guidance.verification}
                  </VerificationNote>
                </article>
              ))}
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="arrival-recommendations-title"
          className="bg-charcoal"
          size="generous"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
                Arrival recommendations
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="medium"
                id="arrival-recommendations-title"
                tone="inverse"
                variant="heading"
              >
                Make space for the journey to change.
              </EditorialText>
            </EditorialGrid>

            <ol className="mt-20 border-t border-linen/18 sm:mt-28 lg:ml-[25%]">
              {arrivalRecommendations.map((recommendation, index) => (
                <li
                  className="grid gap-5 border-b border-linen/18 py-10 sm:grid-cols-[3rem_1fr] sm:gap-8 lg:grid-cols-[3rem_minmax(14rem,0.8fr)_minmax(18rem,1.2fr)] lg:items-baseline lg:py-12"
                  key={recommendation.title}
                >
                  <span
                    aria-hidden="true"
                    className="font-body text-xs font-semibold tracking-[0.18em] text-linen/38"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <EditorialText as="h3" headingSize="small" tone="inverse" variant="heading">
                    {recommendation.title}
                  </EditorialText>
                  <EditorialText
                    className="max-w-xl sm:col-start-2 lg:col-start-auto"
                    tone="inverse"
                    variant="body"
                  >
                    {recommendation.description}
                  </EditorialText>
                </li>
              ))}
            </ol>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="arrival-questions-title" size="immersive">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Arrival questions
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="medium"
                id="arrival-questions-title"
                variant="heading"
              >
                What to settle before departure.
              </EditorialText>
            </EditorialGrid>

            <dl className="mt-20 border-t border-charcoal/18 sm:mt-28 lg:ml-[25%]">
              {arrivalQuestions.map((item) => (
                <div
                  className="grid gap-7 border-b border-charcoal/18 py-10 lg:grid-cols-10 lg:gap-x-12 lg:py-14"
                  key={item.question}
                >
                  <dt className="lg:col-span-4">
                    <EditorialText as="span" headingSize="small" variant="heading">
                      {item.question}
                    </EditorialText>
                  </dt>
                  <dd className="lg:col-span-5 lg:col-start-6 lg:pt-2">
                    <EditorialText variant="body">{item.answer}</EditorialText>
                  </dd>
                </div>
              ))}
            </dl>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
