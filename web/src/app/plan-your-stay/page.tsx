import type {Metadata} from 'next'
import Link from 'next/link'

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
import {createPageMetadata} from '@/lib/seo/metadata'
import {stayPolicy} from '@/lib/stay/policy'
import {getPublicAmenities} from '@/sanity/queries/amenities'
import {getPublicHouseAvailability} from '@/sanity/queries/house-availability'
import {getInformationPage} from '@/sanity/queries/information-pages'

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
  {label: 'Check-in', value: stayPolicy.checkIn},
  {label: 'Check-out', value: stayPolicy.checkOut},
  {label: 'Minimum stay', value: stayPolicy.minimumStay},
] satisfies readonly StayInformationItem[]

const paymentDetails = [
  {label: 'Deposit', value: stayPolicy.deposit},
] satisfies readonly StayInformationItem[]

const quietLinkClasses =
  'inline-flex border-b border-ink/35 pb-1 font-body text-sm font-semibold text-ink hover:border-accent hover:text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus'

export default async function PlanYourStayPage() {
  const [cmsPage, publicAmenities, houseAvailability] = await Promise.all([
    getInformationPage('planningYourStay'),
    getPublicAmenities(),
    getPublicHouseAvailability(),
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

  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow={hasApprovedCmsContent ? cmsPage!.eyebrow || 'Plan Your Stay' : 'Plan Your Stay'}
          introduction={
            hasApprovedCmsContent
              ? cmsPage!.introduction
              : 'The practical details to know before deciding whether Joshua’s Point feels right for your stay.'
          }
          title={hasApprovedCmsContent ? cmsPage!.title : 'Planning your stay.'}
        />

        {hasApprovedCmsContent ? (
          <SectionSpacing aria-label={cmsPage!.title} size="generous">
            <EditorialContainer size="reading">
              <EditorialPortableText value={cmsPage!.body} />
            </EditorialContainer>
          </SectionSpacing>
        ) : (
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
                    Know the important details before you decide.
                  </EditorialText>
                  <EditorialText className="mt-11 max-w-2xl" variant="body">
                    Before a stay is confirmed, we want you to understand the house, its setting,
                    and the terms that apply to your dates.
                  </EditorialText>
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        )}

        {houseAvailability ? (
          <SectionSpacing id="availability" size="generous">
            <EditorialContainer>
              <HouseAvailabilityCalendar availability={houseAvailability} />
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        {!hasApprovedCmsContent ? (
          <>
            <SectionSpacing
              aria-labelledby="stay-details-title"
              className="bg-surface-soft"
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

            {practicalAmenities.length > 0 ? (
              <SectionSpacing aria-labelledby="stay-amenities-title" size="generous">
                <EditorialContainer>
                  <EditorialGrid gap="generous">
                    <EditorialText className="lg:col-span-2" variant="eyebrow">
                      At the house
                    </EditorialText>
                    <div className="lg:col-span-7 lg:col-start-4">
                      <EditorialText
                        headingSize="small"
                        id="stay-amenities-title"
                        variant="heading"
                      >
                        A few practical details about the house.
                      </EditorialText>
                      <EditorialAmenityList className="mt-12" items={practicalAmenities} />
                    </div>
                  </EditorialGrid>
                </EditorialContainer>
              </SectionSpacing>
            ) : null}

            <SectionSpacing
              aria-labelledby="payments-title"
              className="bg-inverse-surface"
              size="immersive"
            >
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
                      Payment details, stated clearly.
                    </EditorialText>
                    <EditorialText className="mt-11 max-w-2xl" tone="inverse" variant="body">
                      This page does not collect or process payment.
                    </EditorialText>
                  </div>
                </EditorialGrid>
                <div className="mt-20 bg-canvas px-6 py-4 sm:mt-28 sm:px-10 lg:ml-[16.666667%] lg:px-14">
                  <StayInformationList items={paymentDetails} />
                </div>
              </EditorialContainer>
            </SectionSpacing>

            <SectionSpacing aria-labelledby="cancellation-title" size="generous">
              <EditorialContainer size="reading">
                <EditorialText variant="eyebrow">Cancellation</EditorialText>
                <EditorialText className="mt-9" id="cancellation-title" variant="lead">
                  Please read the cancellation terms before dates are held.
                </EditorialText>
                <EditorialText className="mt-12 max-w-2xl" variant="body">
                  Your personal written confirmation will set out the terms for your stay. Please
                  read the{' '}
                  <Link className={quietLinkClasses} href="/cancellation-policy">
                    Cancellation &amp; Rebooking Policy
                  </Link>
                  .
                </EditorialText>
              </EditorialContainer>
            </SectionSpacing>

            <SectionSpacing aria-labelledby="house-expectations-title" size="generous">
              <EditorialContainer>
                <EditorialGrid gap="generous">
                  <EditorialText className="lg:col-span-2" variant="eyebrow">
                    House expectations
                  </EditorialText>
                  <div className="lg:col-span-7 lg:col-start-4">
                    <EditorialText
                      headingSize="small"
                      id="house-expectations-title"
                      variant="heading"
                    >
                      Please care for the house and its surroundings.
                    </EditorialText>
                    <EditorialText className="mt-11" variant="body">
                      We ask everyone to treat the house, its shared spaces, the surrounding nature,
                      and nearby neighbours with care.
                    </EditorialText>
                  </div>
                </EditorialGrid>
              </EditorialContainer>
            </SectionSpacing>
          </>
        ) : null}

        <SectionSpacing
          aria-labelledby="journey-and-questions-title"
          className="bg-inverse-surface"
          size="generous"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <div className="lg:col-span-6 lg:col-start-4">
                <EditorialText tone="inverse" variant="eyebrow">
                  Questions
                </EditorialText>
                <EditorialText
                  as="h2"
                  className="mt-8"
                  headingSize="small"
                  id="journey-and-questions-title"
                  tone="inverse"
                  variant="heading"
                >
                  Ask what matters before deciding.
                </EditorialText>
                <div className="mt-9 flex flex-wrap gap-x-8 gap-y-5">
                  <Link
                    className={`${quietLinkClasses} border-inverse/35 text-inverse hover:border-inverse hover:text-inverse focus-visible:outline-evening-accent`}
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
