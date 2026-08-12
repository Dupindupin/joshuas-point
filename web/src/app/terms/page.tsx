import type {Metadata} from 'next'
import Link from 'next/link'

import {
  EditorialContainer,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {stayPolicy} from '@/lib/stay/policy'

export function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    description: 'The current terms for using the Joshua’s Point website and enquiry service.',
    noIndex: true,
    pathname: '/terms',
    title: "Website Terms | Joshua's Point",
  })
}

const termsSections = [
  {
    id: 'about-this-website',
    heading: 'About this website',
    body: [
      'The website introduces Joshua’s Point and shares guides to Southern Negros. It does not currently provide online booking, checkout, or payment processing.',
      'Time-sensitive regional information should be confirmed for the date of travel. A description is not a guarantee that an outside place, route, operator, or service is available.',
    ],
  },
  {
    id: 'enquiries-are-not-bookings',
    heading: 'Enquiries are not bookings',
    body: [
      'Submitting the Contact form sends a request for a conversation. It does not reserve dates, confirm availability, create a booking, or authorize a payment.',
      'A stay is confirmed only through a separate written process after the applicable dates, occupancy, price, payment schedule, cancellation terms, inclusions, and house expectations have been provided and accepted.',
    ],
  },
  {
    id: 'information-you-provide',
    heading: 'Information you provide',
    body: [
      'Provide information that is accurate enough for Joshua’s Point to understand and answer the enquiry. Do not use the form for unlawful, abusive, automated, or misleading submissions.',
      'Do not send payment-card details or other sensitive records through the message field.',
    ],
  },
  {
    id: 'stay-terms',
    heading: 'Stay terms',
    body: [
      `Check-in: ${stayPolicy.checkIn}. Check-out: ${stayPolicy.checkOut}. Minimum stay: ${stayPolicy.minimumStay}. Deposit: ${stayPolicy.deposit}.`,
      stayPolicy.cancellation,
      'Payment methods, fees, inclusions, and any other booking conditions will be provided in writing before a stay is confirmed.',
    ],
  },
] as const

export default function TermsPage() {
  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Website Terms"
          introduction="The difference between exploring the website, sending an enquiry, and confirming a stay."
          title="Clarity before commitment."
        />

        <SectionSpacing aria-label="Website terms" size="generous">
          <EditorialContainer size="reading">
            <div className="space-y-20 sm:space-y-24">
              {termsSections.map((section) => (
                <section aria-labelledby={`terms-${section.id}`} key={section.id}>
                  <EditorialText
                    as="h2"
                    headingSize="small"
                    id={`terms-${section.id}`}
                    variant="heading"
                  >
                    {section.heading}
                  </EditorialText>
                  <div className="mt-9 space-y-6">
                    {section.body.map((paragraph) => (
                      <EditorialText key={paragraph} variant="body">
                        {paragraph}
                      </EditorialText>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <p className="mt-20 font-body text-sm leading-7 text-ink/65 sm:mt-24">
              For information about how enquiry details are handled, read the{' '}
              <Link
                className="rounded-sm border-b border-ink/35 pb-1 font-semibold text-ink hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                href="/privacy"
              >
                Privacy page
              </Link>
              .
            </p>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
