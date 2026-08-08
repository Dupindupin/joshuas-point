import {Hero} from '@/components/home/hero'

export default function Home() {
  return (
    <main>
      <Hero
        description="Joshua’s Point follows the ridge above the Bohol Sea—a quiet place for slow mornings, changing weather, and time together."
        eyebrow="Negros Oriental · Philippines"
        primaryAction={{href: '/the-house', label: 'Explore the house'}}
        secondaryAction={{href: '/the-story', label: 'Read our story'}}
        title="A house that opens to the horizon."
      />
    </main>
  )
}
