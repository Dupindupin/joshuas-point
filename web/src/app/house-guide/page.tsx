import {
  CmsInformationPage,
  createCmsInformationPageMetadata,
} from '@/components/information/cms-information-page'

const page = {documentId: 'houseGuide', noIndex: true, pathname: '/house-guide'} as const

export function generateMetadata() {
  return createCmsInformationPageMetadata(page)
}

export default function HouseGuidePage() {
  return <CmsInformationPage documentId={page.documentId} />
}
