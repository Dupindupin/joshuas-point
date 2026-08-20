import type {Metadata} from 'next'

import {ContactMethods, EnquiryForm, type ContactMethod} from '@/components/contact'
import {HouseAvailabilitySummary} from '@/components/availability'
import {
  EditorialContainer,
  EditorialGrid,
  EditorialLink,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {SocialProfileLinks} from '@/components/site/social-profile-links'
import {getSafeStaySelection} from '@/lib/availability/selection'
import {createPageMetadata} from '@/lib/seo/metadata'
import {normalizeSocialProfiles} from '@/lib/social-profiles'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'
import {getPublicHouseAvailability} from '@/sanity/queries/house-availability'

import {submitEnquiry} from './actions'

export function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    description:
      'Begin a conversation with Joshua’s Point about a stay, arrival planning, diving, and exploring Southern Negros.',
    pathname: '/contact',
    title: "Contact | Joshua's Point",
  })
}

type ContactPageProps = {
  searchParams: Promise<{arrival?: string | string[]; departure?: string | string[]}>
}

function firstSearchValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value
}

export default async function ContactPage({searchParams}: ContactPageProps) {
  const [settings, houseAvailability, requestedDates] = await Promise.all([
    getSiteSeoSettings(),
    getPublicHouseAvailability(),
    searchParams,
  ])
  const initialStay = getSafeStaySelection(
    houseAvailability,
    firstSearchValue(requestedDates.arrival),
    firstSearchValue(requestedDates.departure),
  )
  const socialProfiles = normalizeSocialProfiles(settings?.socialProfiles)
  const publicContact = settings?.contactDetails
  const email = publicContact?.email ?? 'mail@joshuaspoint.com'
  const contactMethods: ContactMethod[] = [
    {
      description: 'Write to us about a stay, arrival planning, or exploring Southern Negros.',
      href: `mailto:${email}`,
      id: 'email',
      label: 'Email',
      value: email,
    },
    ...(publicContact?.phone && publicContact.phoneHref
      ? [
          {
            description: 'Call when speaking directly is the clearest way to begin.',
            href: publicContact.phoneHref,
            id: 'phone' as const,
            label: 'Phone',
            value: publicContact.phone,
          },
        ]
      : []),
    ...(publicContact?.whatsappUrl
      ? [
          {
            description: 'Send a written message through the approved WhatsApp contact.',
            href: publicContact.whatsappUrl,
            id: 'whatsapp' as const,
            label: 'WhatsApp',
            value: 'Message Joshua’s Point',
          },
        ]
      : []),
  ]
  const secondaryContactMethods = contactMethods.filter((method) => method.id !== 'email')

  return (
    <>
      <SiteHeader activeHref="/contact" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Contact"
          introduction="Ask about a stay, your arrival, or the places you hope to explore from Joshua’s Point."
          size="compact"
          title="Let’s talk about your stay."
        />

        <SectionSpacing aria-labelledby="enquiry-form-title" size="standard">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <div className="lg:col-span-4">
                <EditorialText variant="eyebrow">Stay enquiry</EditorialText>
                <EditorialText
                  className="mt-7 max-w-md"
                  headingSize="small"
                  id="enquiry-form-title"
                  variant="heading"
                >
                  Enquire about a stay with dates.
                </EditorialText>
                <EditorialText className="mt-9 max-w-md" variant="body">
                  Use this form when you have possible arrival and departure dates. We will review
                  your dates and message personally before any stay is confirmed.
                </EditorialText>
                <EditorialText className="mt-6 max-w-md" variant="body">
                  For a general question without dates, email us directly:
                </EditorialText>
                <div className="mt-8">
                  <EditorialLink href={`mailto:${email}`} label={email} />
                </div>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                {houseAvailability ? (
                  <HouseAvailabilitySummary availability={houseAvailability} />
                ) : null}
                <EnquiryForm
                  action={submitEnquiry}
                  availability={houseAvailability}
                  initialArrivalDate={initialStay.arrivalDate}
                  initialDepartureDate={initialStay.departureDate}
                />
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        {secondaryContactMethods.length > 0 || socialProfiles.length > 0 ? (
          <SectionSpacing
            aria-labelledby="contact-methods-title"
            className="bg-surface-soft"
            size="compact"
          >
            <EditorialContainer>
              <EditorialGrid gap="generous">
                <EditorialText className="lg:col-span-2" variant="eyebrow">
                  Stay in touch
                </EditorialText>
                <div className="lg:col-span-7 lg:col-start-4">
                  <EditorialText headingSize="small" id="contact-methods-title" variant="heading">
                    Other ways to begin.
                  </EditorialText>
                  {secondaryContactMethods.length > 0 ? (
                    <div className="mt-10">
                      <ContactMethods methods={secondaryContactMethods} />
                    </div>
                  ) : null}
                  {socialProfiles.length > 0 ? (
                    <div className="mt-10">
                      <EditorialText variant="eyebrow">Follow Joshua&apos;s Point</EditorialText>
                      <SocialProfileLinks className="mt-5" profiles={socialProfiles} />
                    </div>
                  ) : null}
                </div>
              </EditorialGrid>
            </EditorialContainer>
          </SectionSpacing>
        ) : null}

        <SectionSpacing aria-label="Closing reflection" size="generous">
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
