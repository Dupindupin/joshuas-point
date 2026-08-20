import {
  CmsInformationPage,
  createCmsInformationPageMetadata,
} from '@/components/information/cms-information-page'

const page = {
  documentId: 'accessibilityStatement',
  noIndex: true,
  pathname: '/accessibility',
} as const

export function generateMetadata() {
  return createCmsInformationPageMetadata(page)
}

export default function AccessibilityPage() {
  return <CmsInformationPage documentId={page.documentId} />
}
