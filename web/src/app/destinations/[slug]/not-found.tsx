import Link from 'next/link'

import {EditorialContainer, EditorialPageHero, EditorialText, SectionSpacing} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'

export default function DestinationNotFound() {
  return (
    <>
      <SiteHeader activeHref="/destinations" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Destination"
          introduction="This field note may still be in review, or the address may have changed."
          title="Place not found"
        />
        <SectionSpacing aria-label="Return to destinations" size="standard">
          <EditorialContainer size="reading">
            <EditorialText variant="body">
              Return to the destination guide to continue exploring the places that are currently
              published.
            </EditorialText>
            <Link
              className="mt-8 inline-flex rounded-sm font-body text-xs font-semibold tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              href="/destinations"
            >
              View destinations
            </Link>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
