import {
  CmsInformationPage,
  createCmsInformationPageMetadata,
} from '@/components/information/cms-information-page'

const page = {documentId: 'privacyPolicy', noIndex: true, pathname: '/privacy'} as const

export function generateMetadata() {
  return createCmsInformationPageMetadata(page)
}

export default function PrivacyPage() {
  return <CmsInformationPage documentId={page.documentId} />
}
