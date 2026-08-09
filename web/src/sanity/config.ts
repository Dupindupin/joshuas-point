const configuredProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()
const configuredDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim()

export const sanityConfig = {
  apiVersion: '2026-08-09',
  dataset: configuredDataset || 'production',
  projectId: configuredProjectId || '8m6fb3x7',
} as const
