import {isStagingDeployment} from './deployment'

const defaultSiteUrl = 'https://joshuaspoint.com'
const stagingSiteUrl = 'https://preview.joshuaspoint.com'

export function getSiteUrl(configuredUrl?: string | null) {
  // A deployment-specific origin must override the production value stored in Sanity.
  // This prevents preview builds from emitting canonicals for the existing WordPress site.
  const deploymentUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const candidate =
    deploymentUrl || (isStagingDeployment() ? stagingSiteUrl : configuredUrl?.trim())

  if (!candidate) return new URL(defaultSiteUrl)

  try {
    const url = new URL(candidate)
    url.pathname = '/'
    url.search = ''
    url.hash = ''
    return url
  } catch {
    return new URL(defaultSiteUrl)
  }
}

export function getCanonicalUrl(pathname: string, configuredUrl?: string | null) {
  return new URL(pathname, getSiteUrl(configuredUrl)).toString()
}
