import type {Metadata} from 'next'
import Link from 'next/link'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {
  StayInformationList,
  StayItemList,
  type StayInformationItem,
  type StayItem,
} from '@/components/stay'

export const metadata: Metadata = {
  title: "Plan Your Stay | Joshua's Point",
  description:
    'A calm guide to the practical details, shared expectations, and questions that shape a stay at Joshua’s Point.',
}

const stayDetails = [
  {
    label: 'Check-in',
    description: 'The confirmed arrival window and handover process will be stated here.',
  },
  {
    label: 'Check-out',
    description: 'The confirmed departure time and departure process will be stated here.',
  },
  {
    label: 'Minimum stay',
    description: 'Any minimum length and seasonal variation require an owner decision.',
  },
  {
    label: 'Maximum guests',
    description: 'Final occupancy must reflect the approved sleeping arrangements and house use.',
  },
  {
    label: 'Children',
    description: 'Suitability, supervision, and any age-related guidance require owner review.',
  },
  {
    label: 'Pets',
    description: 'The pet policy and any conditions or exceptions have not yet been established.',
  },
  {
    label: 'Kitchen use',
    description:
      'Guest access, equipment, provisions, and practical limits will be documented here.',
  },
  {
    label: 'Pool use',
    description:
      'Access, supervision, safety guidance, and operating considerations require confirmation.',
  },
  {
    label: 'Parking',
    description:
      'Capacity, vehicle suitability, access, and any arrival guidance must be verified on site.',
  },
  {
    label: 'Wi-Fi',
    description:
      'Connection type, measured performance, coverage, and realistic reliability require testing.',
  },
  {
    label: 'Power / solar system',
    description:
      'Capacity, guest guidance, backup arrangements, and limitations will be owner-reviewed.',
  },
] satisfies readonly StayInformationItem[]

const paymentDetails = [
  {
    label: 'Payment methods',
    description:
      'Accepted methods will be listed only after the payment process is formally chosen.',
  },
  {
    label: 'Deposit',
    description: 'The amount or percentage, due date, and conditions remain to be established.',
  },
  {
    label: 'Balance due',
    description: 'The final payment schedule and confirmation process require owner approval.',
  },
  {
    label: 'Currency',
    description:
      'The booking currency and treatment of conversion or transaction fees must be confirmed.',
  },
  {
    label: 'Online payment',
    value: 'Planned for a future phase',
    description: 'No payment gateway or online checkout is connected to this page.',
  },
] satisfies readonly StayInformationItem[]

const includedItems = [
  {
    title: 'House provisions',
    description:
      'The exact arrival provisions, pantry basics, and household supplies require confirmation.',
  },
  {
    title: 'Linen and housekeeping',
    description:
      'Included linen, towels, cleaning, and change frequency require an approved service plan.',
  },
  {
    title: 'Property amenities',
    description:
      'Only amenities available for every applicable stay will be listed in the final version.',
  },
] satisfies readonly StayItem[]

const excludedItems = [
  {
    title: 'Transport and transfers',
    description: 'Whether any arrival or local transport is included has not yet been decided.',
  },
  {
    title: 'Food and outside services',
    description:
      'Meals, shopping, delivery, and outside services require clear individual confirmation.',
  },
  {
    title: 'Activities and diving',
    description:
      'No experience, operator service, equipment, or dive arrangement is implied by a stay.',
  },
] satisfies readonly StayItem[]

const quietLinkClasses =
  'inline-flex border-b border-charcoal/35 pb-1 font-body text-sm font-semibold text-charcoal hover:border-forest hover:text-forest focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest'

export default function PlanYourStayPage() {
  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-linen">
        <EditorialPageHero
          eyebrow="Plan Your Stay"
          introduction="A quiet place to understand the practical details before deciding whether the house and the journey feel right for you."
          title="A stay, considered slowly."
        />

        <SectionSpacing aria-labelledby="before-booking-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Before you book
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-3">
                <EditorialText
                  className="max-w-3xl"
                  headingSize="small"
                  id="before-booking-title"
                  variant="heading"
                >
                  Clarity is part of a generous welcome.
                </EditorialText>
                <EditorialText className="mt-11 max-w-2xl" variant="body">
                  Before a stay is confirmed, guests should understand the house, its setting, the
                  practical rhythm of living there, and the terms that shape the reservation. This
                  production page identifies each decision still awaiting owner confirmation rather
                  than filling the gaps with assumptions.
                </EditorialText>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="stay-details-title"
          className="bg-stone/20"
          size="immersive"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Stay details
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="medium"
                id="stay-details-title"
                variant="heading"
              >
                The useful details, gathered in one place.
              </EditorialText>
            </EditorialGrid>
            <div className="mt-20 sm:mt-28 lg:ml-[16.666667%]">
              <StayInformationList items={stayDetails} />
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="payments-title" className="bg-charcoal" size="immersive">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
                Payments
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-3">
                <EditorialText
                  className="max-w-3xl"
                  headingSize="medium"
                  id="payments-title"
                  tone="inverse"
                  variant="heading"
                >
                  Simple terms, stated before commitment.
                </EditorialText>
                <EditorialText className="mt-11 max-w-2xl" tone="inverse" variant="body">
                  Payment instructions will appear only after the accepted methods, schedule,
                  currency, responsibilities, and record-keeping process have been approved. This
                  page does not collect or process payment.
                </EditorialText>
              </div>
            </EditorialGrid>
            <div className="mt-20 bg-linen px-6 py-4 sm:mt-28 sm:px-10 lg:ml-[16.666667%] lg:px-14">
              <StayInformationList items={paymentDetails} />
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="cancellation-title" size="generous">
          <EditorialContainer size="reading">
            <EditorialText variant="eyebrow">Cancellation</EditorialText>
            <EditorialText className="mt-9" id="cancellation-title" variant="lead">
              Terms should be understood before dates are held.
            </EditorialText>
            <EditorialText className="mt-12 max-w-2xl" variant="body">
              The cancellation, date-change, refund, no-show, and exceptional-circumstance policy
              has not yet been approved. The final wording should be reviewed as one complete policy
              and presented before a guest confirms a stay. No terms are implied by this
              placeholder.
            </EditorialText>
            <p className="mt-8 font-body text-xs font-semibold tracking-[0.16em] text-timber uppercase">
              Policy awaiting owner confirmation
            </p>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="inclusions-title" className="bg-stone/20" size="immersive">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                The shape of a stay
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="medium"
                id="inclusions-title"
                variant="heading"
              >
                What is part of the stay—and what remains separate.
              </EditorialText>
            </EditorialGrid>

            <div className="mt-20 grid gap-20 sm:mt-28 lg:ml-[16.666667%] lg:grid-cols-2 lg:gap-16 xl:gap-24">
              <section aria-labelledby="included-title">
                <EditorialText as="h3" id="included-title" variant="eyebrow">
                  What is included
                </EditorialText>
                <div className="mt-8">
                  <StayItemList items={includedItems} />
                </div>
              </section>
              <section aria-labelledby="not-included-title">
                <EditorialText as="h3" id="not-included-title" variant="eyebrow">
                  What is not included
                </EditorialText>
                <div className="mt-8">
                  <StayItemList items={excludedItems} />
                </div>
              </section>
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="house-expectations-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                House expectations
              </EditorialText>
              <div className="lg:col-span-7 lg:col-start-4">
                <EditorialText headingSize="small" id="house-expectations-title" variant="heading">
                  Care for the place that holds the stay.
                </EditorialText>
                <EditorialText className="mt-11" variant="body">
                  Joshua’s Point asks for a thoughtful relationship with the house, its shared
                  spaces, the surrounding nature, and nearby neighbours. The final house guidance
                  will be concise, practical, and confirmed before publication; it should protect
                  the place without making hospitality feel procedural.
                </EditorialText>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="journey-and-questions-title"
          className="bg-charcoal"
          size="generous"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <div className="lg:col-span-5 lg:col-start-2">
                <EditorialText tone="inverse" variant="eyebrow">
                  Arrival &amp; transport
                </EditorialText>
                <EditorialText
                  as="h2"
                  className="mt-8"
                  headingSize="small"
                  id="journey-and-questions-title"
                  tone="inverse"
                  variant="heading"
                >
                  Let the journey form part of the plan.
                </EditorialText>
                <EditorialText className="mt-9" tone="inverse" variant="body">
                  Begin with the different approaches to Southern Negros, then confirm the changing
                  details close to travel.
                </EditorialText>
                <Link
                  className={`${quietLinkClasses} mt-8 border-linen/35 text-linen hover:border-linen hover:text-linen focus-visible:outline-evening-accent`}
                  href="/getting-here"
                >
                  Read Getting Here
                </Link>
              </div>

              <div className="lg:col-span-4 lg:col-start-8">
                <EditorialText tone="inverse" variant="eyebrow">
                  Questions
                </EditorialText>
                <EditorialText
                  as="h2"
                  className="mt-8"
                  headingSize="small"
                  tone="inverse"
                  variant="heading"
                >
                  Ask what matters before deciding.
                </EditorialText>
                <div className="mt-9 flex flex-wrap gap-x-8 gap-y-5">
                  <Link
                    className={`${quietLinkClasses} border-linen/35 text-linen hover:border-linen hover:text-linen focus-visible:outline-evening-accent`}
                    href="/faq"
                  >
                    Read the FAQ
                  </Link>
                  <Link
                    className={`${quietLinkClasses} border-linen/35 text-linen hover:border-linen hover:text-linen focus-visible:outline-evening-accent`}
                    href="/contact"
                  >
                    Start a conversation
                  </Link>
                </div>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="Closing reflection" size="immersive">
          <EditorialContainer size="reading">
            <EditorialText variant="lead">
              A well-planned stay leaves more room for the light, the weather, and the days as they
              unfold.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
