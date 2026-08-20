import {
  CmsInformationPage,
  createCmsInformationPageMetadata,
} from '@/components/information/cms-information-page'

const page = {
  documentId: 'guestInformation',
  noIndex: true,
  pathname: '/guest-information',
} as const

export function generateMetadata() {
  return createCmsInformationPageMetadata(page)
}

export default function GuestInformationPage() {
  return <CmsInformationPage documentId={page.documentId} />
}
