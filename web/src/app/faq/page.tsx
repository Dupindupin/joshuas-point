import type {Metadata} from 'next'

import {
  EditorialContainer,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {FaqAccordion, type FaqItem} from '@/components/faq'
import {SiteHeader} from '@/components/site/site-header'

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Joshua's Point",
  description:
    'A considered introduction to staying at Joshua’s Point, with practical details clearly identified where confirmation is still required.',
}

const faqItems = [
  {
    id: 'best-suited-for',
    question: 'Who is Joshua’s Point best suited for?',
    answer:
      'The final answer will describe the pace, setting, degree of independence, and character of a stay so guests can decide thoughtfully whether Joshua’s Point feels right for them.',
  },
  {
    id: 'children-and-families',
    question: 'Are children and families welcome?',
    answer:
      'Family suitability, age considerations, supervision needs, and any parts of the house or landscape requiring particular care must be confirmed before this guidance is published.',
  },
  {
    id: 'number-of-guests',
    question: 'How many guests can stay?',
    answer:
      'The confirmed maximum occupancy and how it applies to adults, children, and different stay arrangements will be added after the accommodation details are finalized.',
  },
  {
    id: 'bedrooms-and-sleeping',
    question: 'What are the bedrooms and sleeping arrangements?',
    answer:
      'A clear room-by-room account of bedrooms, bed sizes, shared spaces, privacy, and any flexible sleeping arrangements will be added once every detail has been verified.',
  },
  {
    id: 'kitchen-and-cooking',
    question: 'Can guests cook at the house?',
    answer:
      'The final guidance will explain kitchen access, available equipment, pantry basics, cooking expectations, and any practical limitations without overstating what is provided.',
  },
  {
    id: 'wifi-and-mobile-signal',
    question: 'What are Wi-Fi and mobile signal like?',
    answer:
      'Current connection type, measured performance, coverage within the property, mobile-network reliability, and realistic suitability for remote work require on-site testing and regular review.',
  },
  {
    id: 'power-system',
    question: 'How does the power and solar or battery system work?',
    answer:
      'The operating system, available capacity, guest considerations, backup arrangements, and response to extended poor weather or outages must be documented by the property team before publication.',
  },
  {
    id: 'pool',
    question: 'Is there a pool?',
    answer:
      'The pool’s availability, dimensions, depth, access, supervision expectations, maintenance schedule, and any safety guidance remain to be confirmed.',
  },
  {
    id: 'scooter-use',
    question: 'Is a scooter suitable during a stay?',
    answer:
      'Guidance will consider rider experience, licensing, insurance, weather, road conditions, luggage, parking, fuel, and the particular journeys a guest hopes to make. It will not assume a scooter suits everyone.',
  },
  {
    id: 'getting-around',
    question: 'How do guests get around?',
    answer:
      'Verified options for independent travel, hired transport, transfers, and local services will be explained here once availability, arrangements, and limitations are confirmed.',
  },
  {
    id: 'diving',
    question: 'Can Joshua’s Point help with diving?',
    answer:
      'The eventual answer will distinguish local orientation from professional dive services and will name operators or arrangements only after direct verification. Safety-critical advice will remain with qualified providers.',
  },
  {
    id: 'food-and-groceries',
    question: 'Where can guests find food and groceries nearby?',
    answer:
      'Restaurants, markets, shops, delivery possibilities, payment methods, opening patterns, and useful provisions will be included only after local review and will carry a clear review date.',
  },
  {
    id: 'check-in-and-check-out',
    question: 'How do check-in and check-out work?',
    answer:
      'Confirmed times, arrival coordination, key or host handover, identification requirements, luggage arrangements, and departure procedure will be added when the hosting workflow is complete.',
  },
  {
    id: 'payments-and-deposits',
    question: 'How are payments and deposits handled?',
    answer:
      'Accepted methods, currency, payment schedule, deposit terms, security arrangements, receipts, and any transaction costs require formal confirmation before they can be stated here.',
  },
  {
    id: 'cancellation',
    question: 'What is the cancellation policy?',
    answer:
      'The final policy will set out cancellation windows, refunds, date changes, no-shows, exceptional circumstances, and the terms accepted at enquiry or booking. No terms are implied by this placeholder.',
  },
  {
    id: 'house-rules',
    question: 'What house rules should guests know?',
    answer:
      'A concise set of rules will explain the shared responsibilities that protect the house, landscape, neighbours, and quality of the stay. Each rule remains subject to host review.',
  },
  {
    id: 'pets',
    question: 'Are pets permitted?',
    answer:
      'The property’s pet policy, any advance approval, animal or wildlife considerations, cleaning expectations, and exceptions must be decided before an answer is published.',
  },
  {
    id: 'accessibility',
    question: 'How accessible is Joshua’s Point?',
    answer:
      'A responsible answer requires a measured access review covering arrival, paths, gradients, steps, doorways, bathrooms, bedrooms, surfaces, lighting, and assistance. Guests will be invited to discuss individual needs directly.',
  },
  {
    id: 'longer-stays',
    question: 'Are longer stays possible?',
    answer:
      'Availability, minimum or maximum length, housekeeping, linen, provisions, connectivity, payment, and the practical rhythm of an extended stay will be described after the operating policy is confirmed.',
  },
  {
    id: 'weather-and-rainy-season',
    question: 'What should guests know about the weather and rainy season?',
    answer:
      'Seasonal guidance will be based on local observation and dependable sources, while making clear that weather varies. Rainfall, heat, road access, sea conditions, packing, and flexible planning all require careful review.',
  },
] satisfies readonly FaqItem[]

export default function FaqPage() {
  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-linen">
        <EditorialPageHero
          eyebrow="Frequently Asked Questions"
          introduction="A considered guide to the practical details of staying at Joshua’s Point—written to make room for clarity before the journey begins."
          title="Before you arrive."
        />

        <SectionSpacing aria-labelledby="faq-introduction-title" size="generous">
          <EditorialContainer size="reading">
            <EditorialText variant="eyebrow">A useful beginning</EditorialText>
            <EditorialText className="mt-9" id="faq-introduction-title" variant="lead">
              The small questions often shape the whole stay.
            </EditorialText>
            <EditorialText className="mt-12 max-w-2xl" variant="body">
              This page will gather the details guests most often need before deciding, packing, and
              setting out. During production, unverified answers remain openly marked rather than
              being filled with assumptions.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-label="Frequently asked questions"
          className="bg-stone/20"
          size="immersive"
        >
          <EditorialContainer>
            <FaqAccordion items={faqItems} />
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="Closing reflection" size="immersive">
          <EditorialContainer size="reading">
            <EditorialText variant="lead">
              If a detail matters to the shape of your stay, it is worth asking before the road
              begins.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
