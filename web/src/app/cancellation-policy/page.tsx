import {
  CmsInformationPage,
  createCmsInformationPageMetadata,
} from '@/components/information/cms-information-page'

const page = {
  documentId: 'cancellationAndRebookingPolicy',
  noIndex: true,
  pathname: '/cancellation-policy',
} as const

export function generateMetadata() {
  return createCmsInformationPageMetadata(page)
}

export default function CancellationPolicyPage() {
  return <CmsInformationPage documentId={page.documentId} />
}
