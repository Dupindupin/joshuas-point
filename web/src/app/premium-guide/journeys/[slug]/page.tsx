import {notFound, redirect} from 'next/navigation'

import {premiumGuideJourneySlugs} from '@/lib/premium-guide/edition-one'

type PremiumJourneyPageProps = {params: Promise<{slug: string}>}

const chapterByJourney: Record<(typeof premiumGuideJourneySlugs)[number], string> = {
  'apo-island-explorer': 'apo-island',
  'coast-around-home': 'zamboanguita-and-the-coast',
  'dauin-marine-coast': 'dauin-and-the-marine-coast',
  'mountain-lake-explorer': 'siaton-lake-forest-and-coast',
  'waterfall-explorer': 'valencia-and-the-highlands',
}

export const dynamicParams = false

export function generateStaticParams() {
  return premiumGuideJourneySlugs.map((slug) => ({slug}))
}

export default async function PremiumJourneyPage({params}: PremiumJourneyPageProps) {
  const {slug} = await params
  if (!(slug in chapterByJourney)) notFound()

  redirect(`/premium-guide/chapters/${chapterByJourney[slug as keyof typeof chapterByJourney]}`)
}
