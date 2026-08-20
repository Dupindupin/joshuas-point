import {
  CmsInformationPage,
  createCmsInformationPageMetadata,
} from '@/components/information/cms-information-page'

const page = {documentId: 'cookiePolicy', noIndex: true, pathname: '/cookies'} as const

export function generateMetadata() {
  return createCmsInformationPageMetadata(page)
}

export default function CookiePolicyPage() {
  return <CmsInformationPage documentId={page.documentId} />
}
