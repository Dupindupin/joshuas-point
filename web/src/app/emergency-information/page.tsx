import {
  CmsInformationPage,
  createCmsInformationPageMetadata,
} from '@/components/information/cms-information-page'

const page = {
  documentId: 'emergencyInformation',
  noIndex: true,
  pathname: '/emergency-information',
} as const

export function generateMetadata() {
  return createCmsInformationPageMetadata(page)
}

export default function EmergencyInformationPage() {
  return <CmsInformationPage documentId={page.documentId} />
}
