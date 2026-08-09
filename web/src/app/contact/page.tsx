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

export const metadata: Metadata = {
  title: "Contact | Joshua's Point",
  description:
    'Begin a conversation with Joshua’s Point about a stay, arrival planning, diving, and exploring Southern Negros.',
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
    description:
      'The primary address for considered stay enquiries and questions that benefit from a written reply.',
    id: 'email',
    label: 'Email',
  },
  {
    description:
      'For concise arrival coordination and time-sensitive messages once a stay is being planned.',
    id: 'whatsapp',
    label: 'WhatsApp',
  },
  {
    description:
      'For conversations that are easier to settle by voice after a suitable time has been agreed.',
    id: 'phone',
    label: 'Phone',
  },
] satisfies readonly ContactMethod[]

export default function ContactPage() {
  return (
    <>
      <SiteHeader activeHref="/contact" appearance="solid" />
      <main className="bg-linen">
        <EditorialPageHero
          eyebrow="Contact"
          introduction="A quiet place to begin planning, ask what matters, and understand whether Joshua’s Point is right for your journey."
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
                  Write with as much or as little detail as you have. A stay often begins with a
                  simple question, and there is time to shape the practical details together.
                </EditorialText>
              </div>
            </EditorialGrid>

            <ol className="mt-20 border-t border-charcoal/18 sm:mt-28 lg:ml-[25%]">
              {enquiryReasons.map((reason, index) => (
                <li
                  className="grid grid-cols-[3rem_1fr] items-baseline gap-5 border-b border-charcoal/18 py-7 sm:gap-8 sm:py-9"
                  key={reason}
                >
                  <span
                    aria-hidden="true"
                    className="font-body text-xs font-semibold tracking-[0.16em] text-charcoal/38"
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
          className="bg-stone/20"
          size="generous"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Contact methods
              </EditorialText>
              <EditorialText
                className="max-w-3xl lg:col-span-8 lg:col-start-3"
                headingSize="medium"
                id="contact-methods-title"
                variant="heading"
              >
                Choose the form that feels natural.
              </EditorialText>
            </EditorialGrid>

            <div className="mt-20 sm:mt-28 lg:ml-[16.666667%]">
              <ContactMethods methods={contactMethods} />
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
                  Tell us what you are considering.
                </EditorialText>
                <EditorialText className="mt-9 max-w-md" variant="body">
                  Dates and guest numbers are a useful beginning. The message can hold everything
                  else: the questions, the shape of the stay, or the part of the journey that still
                  feels uncertain.
                </EditorialText>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <EnquiryForm />
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-labelledby="response-expectations-title"
          className="bg-charcoal"
          size="generous"
        >
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" tone="inverse" variant="eyebrow">
                Response expectations
              </EditorialText>
              <div className="lg:col-span-8 lg:col-start-3">
                <EditorialText
                  as="h2"
                  className="max-w-3xl"
                  headingSize="small"
                  id="response-expectations-title"
                  tone="inverse"
                  variant="heading"
                >
                  A thoughtful reply, in a human rhythm.
                </EditorialText>
                <EditorialText className="mt-10 max-w-2xl" tone="inverse" variant="body">
                  Response-time guidance will be added after the real hosting workflow and contact
                  coverage are confirmed. Until then, this page makes no promise it cannot keep.
                </EditorialText>
                <aside
                  aria-label="Response time pending verification"
                  className="mt-10 max-w-2xl border-l border-linen/25 pl-5 sm:pl-6"
                >
                  <p className="font-body text-[0.6875rem] font-semibold tracking-[0.18em] text-linen/50 uppercase">
                    To be confirmed
                  </p>
                  <p className="mt-3 font-body text-sm leading-7 text-linen/68">
                    Publish a response expectation only after the responsible host, operating hours,
                    time zone, holidays, and fallback contact process are established.
                  </p>
                </aside>
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
