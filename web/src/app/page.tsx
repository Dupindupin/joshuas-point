import {Hero} from '@/components/home/hero'
import {StorySection} from '@/components/home/story-section'
import {SiteHeader} from '@/components/site/site-header'

export default function Home() {
  return (
    <>
      <SiteHeader activeHref="/" />
      <main>
        <Hero
          description="Joshua’s Point follows the ridge above the Bohol Sea—a quiet place for slow mornings, changing weather, and time together."
          eyebrow="Negros Oriental · Philippines"
          primaryAction={{href: '/the-house', label: 'Explore the house'}}
          secondaryAction={{href: '/the-story', label: 'Read our story'}}
          title="A house that opens to the horizon."
        />
        <StorySection
          caption="Morning light across the deck overlooking the sea."
          eyebrow="The place"
          heading="Built to slow the day."
          paragraph="Joshua’s Point was designed around light, changing weather, and the quiet rhythm of the landscape. Every space opens toward the horizon rather than away from it."
        />
      </main>
    </>
  )
}
