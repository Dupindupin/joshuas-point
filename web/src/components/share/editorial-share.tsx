import {EditorialContainer, EditorialText, SectionSpacing} from '@/components/editorial'
import {getCanonicalUrl} from '@/lib/site-url'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'

import {ShareControls} from './share-controls'

type EditorialShareProps = {
  pathname: string
  title: string
}

export async function EditorialShare({pathname, title}: EditorialShareProps) {
  const siteSettings = await getSiteSeoSettings()
  const url = getCanonicalUrl(pathname, siteSettings?.siteUrl)

  return (
    <SectionSpacing aria-label={`Share ${title}`} size="compact">
      <EditorialContainer>
        <div className="grid gap-6 border-t border-ink/15 pt-8 sm:grid-cols-[minmax(9rem,0.35fr)_minmax(0,1fr)] sm:items-start sm:gap-10 sm:pt-10">
          <EditorialText variant="eyebrow">Share this page</EditorialText>
          <ShareControls title={title} url={url} />
        </div>
      </EditorialContainer>
    </SectionSpacing>
  )
}
