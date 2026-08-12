import Link from 'next/link'

import {
  EditorialContainer,
  EditorialPageHero,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'

export default function ScenicRouteNotFound() {
  return (
    <>
      <SiteHeader activeHref="/scenic-routes" appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow="Scenic Routes"
          introduction="This route is unavailable or has not been published."
          title="Route not found"
        />
        <SectionSpacing aria-label="Return to scenic routes" size="standard">
          <EditorialContainer size="reading">
            <EditorialText variant="body">
              <Link
                className="rounded-sm underline decoration-ink/30 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                href="/scenic-routes"
              >
                View scenic routes
              </Link>
            </EditorialText>
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
