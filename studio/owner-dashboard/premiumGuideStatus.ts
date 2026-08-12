import type {DashboardStatus, OwnerDashboardData} from './types'

export type PremiumGuideProductionStatus = {
  chapters: {complete: number; total: number}
  commerce: string
  epub: string
  manuscript: string
  mountainLakeRoute: string
  overallStatus: DashboardStatus
  pdf: string
  photography: string
  source: 'File-backed Edition 1 production' | 'Sanity-backed production'
  staticOfflineMaps: string
  title: string
  journeys: {complete: number; total: number}
  webEdition: string
}

const fileBackedEditionOne: PremiumGuideProductionStatus = {
  chapters: {complete: 9, total: 9},
  commerce: 'Not configured',
  epub: 'Generated',
  manuscript: 'Complete',
  mountainLakeRoute: 'Blocked pending owner confirmation',
  overallStatus: 'needsAttention',
  pdf: 'Generated',
  photography: 'Needs attention',
  source: 'File-backed Edition 1 production',
  staticOfflineMaps: 'Needs attention',
  title: 'Premium Guide — Edition 1',
  journeys: {complete: 5, total: 5},
  webEdition: 'Available locally',
}

export function resolvePremiumGuideStatus(data: OwnerDashboardData): PremiumGuideProductionStatus {
  if (!data.guideEdition) return fileBackedEditionOne

  const chapterCount = data.guideChapters.length
  const journeyCount = data.guideJourneys.length

  return {
    chapters: {complete: chapterCount, total: chapterCount},
    commerce: 'Not configured',
    epub: data.guideEdition.epubReady ? 'Generated' : 'Needs attention',
    manuscript: data.guideEdition.status === 'published' ? 'Complete' : 'Needs attention',
    mountainLakeRoute: 'Check the Edition record',
    overallStatus:
      data.guideEdition.status === 'published' &&
      data.guideEdition.pdfReady &&
      data.guideEdition.epubReady &&
      data.guideEdition.photographyComplete
        ? 'complete'
        : 'needsAttention',
    pdf: data.guideEdition.pdfReady ? 'Generated' : 'Needs attention',
    photography: data.guideEdition.photographyComplete ? 'Complete' : 'Needs attention',
    source: 'Sanity-backed production',
    staticOfflineMaps: 'Check the Edition record',
    title: data.guideEdition.title || 'Premium Guide — Edition 1',
    journeys: {complete: journeyCount, total: journeyCount},
    webEdition: 'Available',
  }
}
