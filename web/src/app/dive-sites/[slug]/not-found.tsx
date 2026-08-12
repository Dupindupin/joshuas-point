import Link from 'next/link'

import {EditorialContainer, EditorialText, SectionSpacing} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'

export default function DiveSiteNotFound() {
  return (
    <>
      <SiteHeader activeHref="/dive-sites" appearance="solid" />
      <main className="bg-canvas pt-24">
        <SectionSpacing size="immersive">
          <EditorialContainer size="reading">
            <EditorialText variant="eyebrow">Dive Guide</EditorialText>
            <EditorialText as="h1" className="mt-8" headingSize="medium" variant="heading">
              This field note is not available.
            </EditorialText>
            <Link
              className="mt-12 inline-flex rounded-sm font-body text-sm text-accent underline decoration-forest/35 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
              href="/dive-sites"
            >
              Return to the Dive Guide
            </Link>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
