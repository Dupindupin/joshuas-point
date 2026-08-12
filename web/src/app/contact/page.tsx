import type {Metadata} from 'next'

import {ContactMethods, EnquiryForm, type ContactMethod} from '@/components/contact'
import {
  EditorialContainer,
  EditorialGrid,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {SocialProfileLinks} from '@/components/site/social-profile-links'
import {createPageMetadata} from '@/lib/seo/metadata'
import {normalizeSocialProfiles} from '@/lib/social-profiles'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'

import {submitEnquiry} from './actions'

export function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    description:
      'Begin a conversation with Joshua’s Point about a stay, arrival planning, diving, and exploring Southern Negros.',
    pathname: '/contact',
    title: "Contact | Joshua's Point",
  })
}

const enquiryReasons = [
  'Stay enquiries',
  'Availability questions',
  'Arrival planning',
  'Diving and local exploration questions',
  'Special requests',
] as const

const contactMethods = [
  {
    description: 'Write to us about a stay, arrival planning, or exploring Southern Negros.',
    href: 'mailto:mail@joshuaspoint.com',
    id: 'email',
    label: 'Email',
    value: 'mail@joshuaspoint.com',
  },
] satisfies readonly ContactMethod[]

export default async function ContactPage() {
  const settings = await getSiteSeoSettings()
  const socialProfiles = normalizeSocialProfiles(settings?.socialProfiles)

  return (
    <>
      <SiteHeader activeHref="/contact" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Contact"
          introduction="Ask about a stay, your arrival, or the places you hope to explore from Joshua’s Point."
          title="Let’s talk about your stay."
        />

        <SectionSpacing aria-labelledby="contact-introduction-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Begin here
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-3">
                <EditorialText
                  as="h2"
                  className="max-w-3xl"
                  headingSize="small"
                  id="contact-introduction-title"
                  variant="heading"
                >
                  A conversation before the journey.
                </EditorialText>
                <EditorialText className="mt-10 max-w-2xl" variant="body">
                  Write with as much or as little detail as you have. A date and a simple question
                  are enough to begin. You can also ask about practical arrangements such as
                  transfers, scooters, parking, or laundry.
                </EditorialText>
              </div>
            </EditorialGrid>

            <ol className="mt-20 border-t border-ink/18 sm:mt-28 lg:ml-[25%]">
              {enquiryReasons.map((reason, index) => (
                <li
                  className="grid grid-cols-[3rem_1fr] items-baseline gap-5 border-b border-ink/18 py-7 sm:gap-8 sm:py-9"
                  key={reason}
                >
                  <span
                    aria-hidden="true"
                    className="font-body text-xs font-semibold tracking-[0.16em] text-ink-subtle"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <EditorialText as="span" headingSize="small" variant="heading">
                    {reason}
                  </EditorialText>
                </li>
              ))}
            </ol>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="contact-methods-title"
          className="bg-surface-soft"
          size="generous"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Contact
              </EditorialText>
              <EditorialText
                className="max-w-3xl lg:col-span-8 lg:col-start-3"
                headingSize="medium"
                id="contact-methods-title"
                variant="heading"
              >
                Begin in writing.
              </EditorialText>
            </EditorialGrid>
            <div className="mt-20 sm:mt-28 lg:ml-[16.666667%]">
              <ContactMethods methods={contactMethods} />
              {socialProfiles.length > 0 ? (
                <div className="mt-12">
                  <EditorialText variant="eyebrow">Follow Joshua&apos;s Point</EditorialText>
                  <SocialProfileLinks className="mt-5" profiles={socialProfiles} />
                </div>
              ) : null}
            </div>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-labelledby="enquiry-form-title" size="immersive">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <div className="lg:col-span-4">
                <EditorialText variant="eyebrow">Your enquiry</EditorialText>
                <EditorialText
                  className="mt-7 max-w-md"
                  headingSize="small"
                  id="enquiry-form-title"
                  variant="heading"
                >
                  Tell us what you would like to know.
                </EditorialText>
                <EditorialText className="mt-9 max-w-md" variant="body">
                  Dates and guest numbers are a useful beginning. Use the message for anything else
                  you would like to ask about the house, the journey, or your time in Southern
                  Negros.
                </EditorialText>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <EnquiryForm action={submitEnquiry} />
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="Closing reflection" size="immersive">
          <EditorialContainer size="reading">
            <EditorialText variant="lead">
              A stay can begin quietly—with a date, a question, and a little room for the rest to
              take shape.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
