import type {Metadata} from 'next'

import {
  EditorialContainer,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {FaqAccordion, type FaqItem} from '@/components/faq'
import {SiteHeader} from '@/components/site/site-header'
import {approvedAmenityKeys, selectApprovedAmenities} from '@/lib/amenities'
import {createPageMetadata} from '@/lib/seo/metadata'
import {stayPolicy} from '@/lib/stay/policy'
import {getPublicAmenities} from '@/sanity/queries/amenities'

export function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    description: 'Confirmed practical details for planning a stay at Joshua’s Point.',
    pathname: '/faq',
    title: "Frequently Asked Questions | Joshua's Point",
  })
}

const coreFaqItems = [
  {
    id: 'check-in-and-check-out',
    question: 'How do check-in and check-out work?',
    answer: `Check-in: ${stayPolicy.checkIn}. Check-out: ${stayPolicy.checkOut}.`,
  },
  {
    id: 'payments-and-deposits',
    question: 'How are payments and deposits handled?',
    answer: stayPolicy.deposit,
  },
  {
    id: 'cancellation',
    question: 'What is the cancellation policy?',
    answer:
      'Please read the Cancellation & Rebooking Policy. Your personal written confirmation will set out the terms that apply to your stay.',
  },
] satisfies readonly FaqItem[]

export default async function FaqPage() {
  const publicAmenities = await getPublicAmenities()
  const descriptionFor = (key: (typeof approvedAmenityKeys)[keyof typeof approvedAmenityKeys]) =>
    selectApprovedAmenities(publicAmenities, [key])[0]?.description
  const amenityFaqCandidates = [
    {
      answers: [descriptionFor(approvedAmenityKeys.infinityPool)],
      id: 'pool',
      question: "Does Joshua's Point have a pool?",
    },
    {
      answers: [descriptionFor(approvedAmenityKeys.solarBatterySystem)],
      id: 'power-system',
      question: 'How is the house powered?',
    },
    {
      answers: [
        descriptionFor(approvedAmenityKeys.airConditioning),
        descriptionFor(approvedAmenityKeys.wifi),
        descriptionFor(approvedAmenityKeys.television),
      ],
      id: 'comfort-and-connectivity',
      question: 'Are air conditioning, Wi-Fi, and a television available?',
    },
    {
      answers: [
        descriptionFor(approvedAmenityKeys.fullyEquippedKitchen),
        descriptionFor(approvedAmenityKeys.outdoorBarbecue),
        descriptionFor(approvedAmenityKeys.filteredWater),
      ],
      id: 'cooking-and-water',
      question: 'What is available for cooking and drinking water?',
    },
    {
      answers: [
        descriptionFor(approvedAmenityKeys.parking),
        descriptionFor(approvedAmenityKeys.laundry),
      ],
      id: 'parking-and-laundry',
      question: 'Are parking and laundry available?',
    },
    {
      answers: [
        descriptionFor(approvedAmenityKeys.twoScooters),
        descriptionFor(approvedAmenityKeys.transfers),
      ],
      id: 'scooters-and-transfers',
      question: 'Are scooters and transfers available?',
    },
    {
      answers: [descriptionFor(approvedAmenityKeys.outsideShower)],
      id: 'outside-shower',
      question: 'Is there an outside shower?',
    },
    {
      answers: [descriptionFor(approvedAmenityKeys.exclusiveUse)],
      id: 'exclusive-use',
      question: 'Is the house for our exclusive use?',
    },
  ]
  const amenityFaqItems = amenityFaqCandidates.flatMap<FaqItem>((item) => {
    const answers = item.answers.filter((answer): answer is string => Boolean(answer))
    if (answers.length !== item.answers.length) return []
    return [{answer: answers.join(' '), id: item.id, question: item.question}]
  })
  const faqItems = [...coreFaqItems, ...amenityFaqItems]
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
      name: item.question,
    })),
  }

  return (
    <>
      <SiteHeader appearance="solid" activeHref="/faq" />
      <main className="bg-canvas">
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData).replace(/</g, '\\u003c'),
          }}
          type="application/ld+json"
        />
        <EditorialPageHero
          eyebrow="Frequently Asked Questions"
          introduction="The confirmed details we can share now about staying at Joshua’s Point. If something important is not answered here, please ask."
          title="Before your stay."
        />

        <SectionSpacing aria-labelledby="faq-introduction-title" size="generous">
          <EditorialContainer size="reading">
            <EditorialText variant="eyebrow">Good to know</EditorialText>
            <EditorialText className="mt-9" id="faq-introduction-title" variant="lead">
              Clear answers make planning easier.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing
          aria-label="Frequently asked questions"
          className="bg-surface-soft"
          size="immersive"
        >
          <EditorialContainer>
            <FaqAccordion items={faqItems} />
          </EditorialContainer>
        </SectionSpacing>

        <SectionSpacing aria-label="Closing reflection" size="immersive">
          <EditorialContainer size="reading">
            <EditorialText variant="lead">
              If a detail matters to your stay, ask us before you travel.
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
