import {getCliClient} from 'sanity/cli'

import {ownerDashboardQuery} from '../studio/owner-dashboard/query'
import type {OwnerDashboardData} from '../studio/owner-dashboard/types'

const client = getCliClient({apiVersion: '2026-08-12'}).withConfig({perspective: 'drafts'})

async function run() {
  const data = await client.fetch<OwnerDashboardData>(ownerDashboardQuery)
  console.log(
    JSON.stringify(
      {
        contentDocuments: data.documents.length,
        guideChapters: data.guideChapters.length,
        guideEditionAvailable: Boolean(data.guideEdition),
        guideJourneys: data.guideJourneys.length,
        siteSettingsAvailable: Boolean(data.settings?._id),
      },
      null,
      2,
    ),
  )
}

void run()
