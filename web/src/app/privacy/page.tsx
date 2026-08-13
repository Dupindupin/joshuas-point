import type {Metadata} from 'next'

import {
  EditorialContainer,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'

export function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    description: 'How Joshua’s Point handles information submitted through the enquiry form.',
    noIndex: true,
    pathname: '/privacy',
    title: "Privacy | Joshua's Point",
  })
}

const privacySections = [
  {
    id: 'information-you-send',
    heading: 'Information you choose to send',
    body: [
      'The enquiry form asks for your name, email address, an optional phone or WhatsApp number, proposed arrival and departure dates, the number of guests, and your message.',
      'Do not include passport details, payment-card information, medical records, or other sensitive information in the message field.',
    ],
  },
  {
    id: 'how-information-is-used',
    heading: 'How the information is used',
    body: [
      'Enquiry information is used only to receive, understand, and respond to your message about Joshua’s Point. Submitting an enquiry does not add you to a newsletter or other marketing list.',
      'Enquiry details are sent by email so we can reply. They are not stored in Sanity or added to a guest database.',
    ],
  },
  {
    id: 'delivery-and-providers',
    heading: 'Delivery and service providers',
    body: [
      'The website host, transactional email provider, and receiving mailboxes process the information needed to deliver and answer the enquiry. Their systems may process technical request and delivery information under their own security and retention practices.',
      'Enquiry correspondence remains in the email systems used to receive and answer it.',
    ],
  },
  {
    id: 'email-updates',
    heading: 'Optional email updates',
    body: [
      'If you ask to receive Joshua’s Point updates, we send a confirmation link before adding your address to the mailing list. The email address is held by our email provider rather than in Sanity, and it is used only for the updates you confirmed.',
      'Future update emails will include a way to unsubscribe. Leaving the list does not affect an enquiry or any conversation about a stay.',
    ],
  },
  {
    id: 'abuse-protection',
    heading: 'Abuse protection',
    body: [
      'The form uses automated-submission checks and request limits to reduce spam and duplicate messages. It does not keep raw IP addresses in its enquiry rate limiter or include your message in delivery-error logs.',
    ],
  },
  {
    id: 'privacy-questions',
    heading: 'Questions about your information',
    body: [
      'For questions about information sent through the enquiry form, email mail@joshuaspoint.com.',
    ],
  },
] as const

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Privacy"
          introduction="A plain account of how information sent through the enquiry form is used."
          title="Your enquiry remains a conversation."
        />

        <SectionSpacing aria-label="Privacy information" size="generous">
          <EditorialContainer size="reading">
            <div className="space-y-20 sm:space-y-24">
              {privacySections.map((section) => (
                <section aria-labelledby={`privacy-${section.id}`} key={section.id}>
                  <EditorialText
                    as="h2"
                    headingSize="small"
                    id={`privacy-${section.id}`}
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
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
