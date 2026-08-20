import Link from 'next/link'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'

const linkClasses =
  'inline-flex min-h-12 items-center justify-center rounded-full border border-ink px-7 py-3 font-body text-sm font-semibold text-ink hover:border-accent hover:bg-accent hover:text-inverse focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus'

export default function NotFound() {
  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Page not found"
          introduction="The page you followed is not here, but Joshua’s Point is still close by."
          size="compact"
          title="A quiet turn in the road."
        />

        <SectionSpacing aria-labelledby="missing-page-title" size="generous">
          <EditorialContainer>
            <EditorialGrid gap="generous">
              <EditorialText className="lg:col-span-2" variant="eyebrow">
                Continue
              </EditorialText>
              <div className="lg:col-span-7 lg:col-start-4">
                <EditorialText
                  as="h2"
                  headingSize="small"
                  id="missing-page-title"
                  variant="heading"
                >
                  Return to the house, or begin planning a private whole-house stay.
                </EditorialText>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Link className={linkClasses} href="/">
                    Return home
                  </Link>
                  <Link className={linkClasses} href="/plan-your-stay">
                    Plan your stay
                  </Link>
                </div>
              </div>
            </EditorialGrid>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
