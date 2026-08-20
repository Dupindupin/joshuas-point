import type {PortableTextBlock} from '@portabletext/react'
import type {Metadata} from 'next'
import Link from 'next/link'

import {AnalyticsPageEvent} from '@/components/analytics'
import {EditorialAmenityList} from '@/components/amenities'
import {HouseAvailabilityCalendar} from '@/components/availability'
import {
  EditorialContainer,
  EditorialGrid,
  EditorialPageHero,
  EditorialPortableText,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {StayInformationList, type StayInformationItem} from '@/components/stay'
import {approvedAmenityKeys, selectApprovedAmenities} from '@/lib/amenities'
import {analyticsEvents} from '@/lib/analytics/event-names'
import {createPageMetadata} from '@/lib/seo/metadata'
import {stayPolicy} from '@/lib/stay/policy'
import {interpretGuestWeather} from '@/lib/owner-dashboard/weather-data'
import {getPublicAmenities} from '@/sanity/queries/amenities'
import {getPublicHouseAvailability} from '@/sanity/queries/house-availability'
import {getInformationPage} from '@/sanity/queries/information-pages'
import {getGuestWeather} from '@/sanity/queries/weather'

export async function generateMetadata(): Promise<Metadata> {
  const cmsPage = await getInformationPage('planningYourStay')
  return createPageMetadata({
    description:
      cmsPage?.introduction ||
      'Practical details, shared expectations, and useful information for planning a stay at Joshua’s Point.',
    pathname: '/plan-your-stay',
    seo: cmsPage?.seo,
    title: cmsPage?.title || "Plan Your Stay | Joshua's Point",
  })
}

const stayDetails = [
  {label: 'Stay', value: 'One private whole-house stay'},
  {label: 'Maximum occupancy', value: `${stayPolicy.maximumGuests} guests`},
  {label: 'Check-in', value: stayPolicy.checkIn},
  {label: 'Check-out', value: stayPolicy.checkOut},
  {label: 'Minimum stay', value: stayPolicy.minimumStay},
] satisfies readonly StayInformationItem[]

const paymentDetails = [
  {label: 'Deposit', value: stayPolicy.deposit},
] satisfies readonly StayInformationItem[]

const quietLinkClasses =
  'inline-flex border-b border-ink/35 pb-1 font-body text-sm font-semibold text-ink hover:border-accent hover:text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus'

type CmsSection = {
  blocks: PortableTextBlock[]
  heading: string
}

function blockText(block: PortableTextBlock) {
  return block.children
    .map((child) => ('text' in child && typeof child.text === 'string' ? child.text : ''))
    .join('')
    .trim()
}

function groupCmsSections(body: PortableTextBlock[]) {
  const sections: CmsSection[] = []

  for (const block of body) {
    const isHeading = block.style === 'h2' || block.style === 'h3'
    if (isHeading) {
      sections.push({blocks: [block], heading: blockText(block)})
    } else if (sections.length > 0) {
      sections.at(-1)!.blocks.push(block)
    }
  }

  return new Map(sections.map((section) => [section.heading.toLowerCase(), section.blocks]))
}

function selectCmsSections(
  sections: Map<string, PortableTextBlock[]>,
  headings: readonly string[],
) {
  return headings.flatMap((heading) => sections.get(heading.toLowerCase()) ?? [])
}

const nextStepSections = ['Welcome', 'Reservation confirmation', 'Before you arrive', 'Contact']
const essentialStaySections = ['Whole-house rental', 'Check-in']
const paymentSections = ['Changes']
const houseInformationSections = [
  'Identification',
  'Visitors',
  'Quiet enjoyment',
  'Smoking',
  'Children',
  'Swimming Pool',
  'Kitchen',
  'Caring for the house',
  'Safety',
  'CCTV',
]
const environmentalSections = ['Environmental commitment']

const enquirySteps = [
  {
    description: 'Choose possible arrival and departure dates from the current calendar.',
    title: 'Check availability',
  },
  {
    description:
      'Send a stay enquiry with your dates, group details, and anything you would like to ask.',
    title: 'Send an enquiry',
  },
  {
    description:
      'We reply personally to confirm availability, pricing, payment arrangements, and the details of your stay.',
    title: 'Agree the details',
  },
  {
    description: 'Your dates are reserved once you receive your personal confirmation in writing.',
    title: 'Receive confirmation',
  },
] as const

export default async function PlanYourStayPage() {
  const [cmsPage, publicAmenities, houseAvailability, guestWeather] = await Promise.all([
    getInformationPage('planningYourStay'),
    getPublicAmenities(),
    getPublicHouseAvailability(),
    getGuestWeather(),
  ])
  const hasApprovedCmsContent = Boolean(
    cmsPage?.title?.trim() && cmsPage.introduction?.trim() && cmsPage.body?.length,
  )
  const practicalAmenities = selectApprovedAmenities(publicAmenities, [
    approvedAmenityKeys.exclusiveUse,
    approvedAmenityKeys.airConditioning,
    approvedAmenityKeys.wifi,
    approvedAmenityKeys.fullyEquippedKitchen,
    approvedAmenityKeys.filteredWater,
    approvedAmenityKeys.parking,
    approvedAmenityKeys.infinityPool,
    approvedAmenityKeys.twoScooters,
    approvedAmenityKeys.transfers,
  ])
  const cmsSections = groupCmsSections(cmsPage?.body ?? [])
  const nextStepContent = selectCmsSections(cmsSections, nextStepSections)
  const essentialStayContent = selectCmsSections(cmsSections, essentialStaySections)
  const paymentContent = selectCmsSections(cmsSections, paymentSections)
  const houseInformationContent = selectCmsSections(cmsSections, houseInformationSections)
  const environmentalContent = selectCmsSections(cmsSections, environmentalSections)
  const environmentalBody = environmentalContent.slice(1)

  return (
    <>
      <AnalyticsPageEvent event={analyticsEvents.planYourStayViewed} />
      <SiteHeader appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow={hasApprovedCmsContent ? cmsPage!.eyebrow || 'Plan Your Stay' : 'Plan Your Stay'}
          introduction={
            hasApprovedCmsContent
              ? cmsPage!.introduction
              : 'The practical details to know before deciding whether Joshua’s Point feels right for your stay.'
          }
          scale="utility"
          size="focused"
          title={hasApprovedCmsContent ? cmsPage!.title : 'Planning your stay.'}
        />

        {houseAvailability ? (
          <SectionSpacing axis="bottom" id="availability" size="compact">
            <EditorialContainer>
              <HouseAvailabilityCalendar availability={houseAvailability} />
              {guestWeather ? (
                <aside
                  aria-labelledby="guest-weather-title"
                  className="mt-10 border-y border-ink/15 py-7 sm:mt-12 sm:py-8"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-4">
                      <p className="font-body text-xs font-semibold tracking-[0.2em] text-ink-subtle uppercase">
                        Today at Joshua&apos;s Point
                      </p>
                      <h2
                        className="mt-3 max-w-md font-display text-2xl leading-tight font-medium tracking-[-0.02em] text-ink sm:text-3xl"
                        id="guest-weather-title"
                      >
                        {interpretGuestWeather(guestWeather)}
                      </h2>
                    </div>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:col-span-7 lg:col-start-6">
                      {[
                        ['Current conditions', guestWeather.condition],
                        ['Temperature', `${guestWeather.temperatureCelsius} °C`],
                        ['Rain probability', `${guestWeather.rainProbabilityPercent}%`],
                        ['Wind', `${guestWeather.windKilometresPerHour} km/h`],
                      ].map(([label, value]) => (
                        <div className="border-t border-ink/15 pt-4" key={label}>
                          <dt className="font-body text-xs leading-5 text-ink-subtle">{label}</dt>
                          <dd className="mt-2 font-body text-sm font-semibold text-ink sm:text-base">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <p className="font-body text-xs leading-5 text-ink-subtle lg:col-span-7 lg:col-start-6">
                      Weather data by{' '}
                      <a
                        className="border-b border-ink/30 hover:border-ink focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                        href="https://open-meteo.com/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        Open-Meteo
                      </a>
                      , refreshed every 15 minutes.
                    </p>
                  </div>
                </aside>
              ) : null}
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <SectionSpacing
          aria-labelledby="what-happens-next-title"
          className="bg-inverse-surface"
          size="standard"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
                What happens next
              </EditorialText>
              <div className="lg:col-span-9 lg:col-start-3">
                <EditorialText
                  headingSize="small"
                  id="what-happens-next-title"
                  tone="inverse"
                  variant="heading"
                >
                  From possible dates to a personal confirmation.
                </EditorialText>
                <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
                  {enquirySteps.map((step, index) => (
                    <li className="border-t border-inverse/25 pt-6" key={step.title}>
                      <p className="font-body text-xs font-semibold tracking-[0.14em] text-evening-accent uppercase">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-4 font-display text-2xl text-inverse">{step.title}</h3>
                      <p className="mt-4 max-w-md font-body text-base leading-8 text-inverse/75">
                        {step.description}
                      </p>
                    </li>
                  ))}
                </ol>
                <div className="mt-12 flex flex-wrap gap-x-8 gap-y-5">
                  <Link
                    className={`${quietLinkClasses} border-inverse/35 text-inverse hover:border-inverse hover:text-inverse focus-visible:outline-evening-accent`}
                    href="/contact"
                  >
                    Start a conversation
                  </Link>
                </div>
              </div>
            </EditorialGrid>
            {nextStepContent.length > 0 ? (
              <div className="mt-20 bg-canvas px-6 py-4 text-ink sm:mt-24 sm:px-10 lg:ml-[16.666667%] lg:px-14 lg:py-8">
                <EditorialPortableText value={nextStepContent} />
              </div>
            ) : null}
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="essential-stay-facts-title"
          className="bg-surface-soft"
          size="standard"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Essential stay facts
              </EditorialText>
              <EditorialText
                className="max-w-4xl lg:col-span-9 lg:col-start-3"
                headingSize="medium"
                id="essential-stay-facts-title"
                variant="heading"
              >
                The useful details, gathered in one place.
              </EditorialText>
            </EditorialGrid>
            <div className="mt-16 sm:mt-20 lg:ml-[16.666667%]">
              <StayInformationList items={stayDetails} />
            </div>
            {essentialStayContent.length > 0 ? (
              <div className="mt-16 lg:ml-[16.666667%] lg:max-w-3xl">
                <EditorialPortableText value={essentialStayContent} />
              </div>
            ) : null}
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="payments-title" size="standard">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Payment &amp; cancellation
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-3">
                <EditorialText headingSize="small" id="payments-title" variant="heading">
                  Clear terms before dates are held.
                </EditorialText>
                <EditorialText className="mt-9 max-w-2xl" variant="body">
                  This page does not collect or process payment. Your personal written confirmation
                  will set out the terms for your stay.
                </EditorialText>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
                  <Link className={quietLinkClasses} href="/cancellation-policy">
                    Cancellation &amp; Rebooking Policy
                  </Link>
                  <Link className={quietLinkClasses} href="/terms">
                    Terms &amp; Conditions
                  </Link>
                </div>
              </div>
            </EditorialGrid>
            <div className="mt-16 lg:ml-[16.666667%]">
              <StayInformationList items={paymentDetails} />
            </div>
            {paymentContent.length > 0 ? (
              <div className="mt-14 lg:ml-[16.666667%] lg:max-w-3xl">
                <EditorialPortableText value={paymentContent} />
              </div>
            ) : null}
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="house-information-title"
          className="bg-surface-soft"
          size="standard"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                House information
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-3">
                <EditorialText headingSize="small" id="house-information-title" variant="heading">
                  Practical guidance for enjoying the house with care.
                </EditorialText>
                {practicalAmenities.length > 0 ? (
                  <EditorialAmenityList className="mt-12" items={practicalAmenities} />
                ) : null}
              </div>
            </EditorialGrid>
            {houseInformationContent.length > 0 ? (
              <div className="mt-16 lg:ml-[16.666667%] lg:max-w-3xl">
                <EditorialPortableText value={houseInformationContent} />
              </div>
            ) : (
              <EditorialText className="mt-12 max-w-2xl lg:ml-[16.666667%]" variant="body">
                We ask everyone to treat the house, its shared spaces, the surrounding nature, and
                nearby neighbours with care.
              </EditorialText>
            )}
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="environmental-commitment-title" size="standard">
          <EditorialContainer size="reading">
            <EditorialText variant="eyebrow">Care for the setting</EditorialText>
            <EditorialText
              className="mt-9"
              headingSize="small"
              id="environmental-commitment-title"
              variant="heading"
            >
              Environmental commitment
            </EditorialText>
            {environmentalBody.length > 0 ? (
              <div className="mt-8">
                <EditorialPortableText value={environmentalBody} />
              </div>
            ) : (
              <EditorialText className="mt-8" variant="body">
                Please use water and electricity thoughtfully and take care of the landscape around
                the house.
              </EditorialText>
            )}
            <EditorialText className="mt-14" variant="lead">
              A well-planned stay leaves more room for the light, the weather, and the days as they
              unfold.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
