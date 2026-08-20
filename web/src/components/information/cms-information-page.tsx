import type {Metadata} from 'next'
import {notFound} from 'next/navigation'

import {
  EditorialContainer,
  EditorialPageHero,
  EditorialPortableText,
  SectionSpacing,
} from '@/components/editorial'
import {SiteHeader} from '@/components/site/site-header'
import {createPageMetadata} from '@/lib/seo/metadata'
import {getInformationPage} from '@/sanity/queries/information-pages'

type CmsInformationPageOptions = {
  documentId: string
  noIndex?: boolean
  pathname: string
}

export async function createCmsInformationPageMetadata({
  documentId,
  noIndex = false,
  pathname,
}: CmsInformationPageOptions): Promise<Metadata> {
  const page = await getInformationPage(documentId)

  return createPageMetadata({
    description: page?.introduction,
    noIndex,
    pathname,
    seo: page?.seo,
    title: page?.title,
  })
}

export async function CmsInformationPage({
  documentId,
}: Pick<CmsInformationPageOptions, 'documentId'>) {
  const page = await getInformationPage(documentId)
  if (!page?.title?.trim() || !page.introduction?.trim() || !page.body?.length) notFound()

  return (
    <>
      <SiteHeader appearance="solid" />
      <main className="bg-canvas">
        <EditorialPageHero
          eyebrow={page.eyebrow?.trim() || page.title}
          introduction={page.introduction}
          scale="utility"
          title={page.title}
        />

        <SectionSpacing aria-label={page.title} size="generous">
          <EditorialContainer size="reading">
            <EditorialPortableText value={page.body} />
          </EditorialContainer>
        </SectionSpacing>
      </main>
    </>
  )
}
