export type DeploymentEnvironment = 'development' | 'production' | 'staging'

export function getDeploymentEnvironment(): DeploymentEnvironment {
  const configured = process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT?.trim().toLowerCase()
  if (configured === 'production' || configured === 'staging') return configured
  return 'development'
}

export function isSearchIndexingAllowed() {
  return (
    getDeploymentEnvironment() === 'production' &&
    process.env.COMING_SOON_MODE?.trim().toLowerCase() !== 'enabled'
  )
}

export function isStagingDeployment() {
  return getDeploymentEnvironment() === 'staging'
}
