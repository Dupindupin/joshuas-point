import {getDeploymentEnvironment} from '@/lib/deployment'

export type PlausibleConfiguration = {
  domain: string
  scriptSource: string
}

function enabled(value: string | undefined) {
  return value?.trim().toLowerCase() === 'true'
}

function validDomain(value: string | undefined) {
  const domain = value?.trim()
  if (!domain || !/^[a-z0-9.-]+$/i.test(domain)) return null
  return domain
}

function validScriptSource(value: string | undefined) {
  const source = value?.trim()
  if (!source) return null

  try {
    const url = new URL(source)
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

export function getPlausibleConfiguration(): PlausibleConfiguration | null {
  if (
    getDeploymentEnvironment() !== 'production' ||
    !enabled(process.env.NEXT_PUBLIC_ANALYTICS_ENABLED)
  ) {
    return null
  }

  const domain = validDomain(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
  const scriptSource = validScriptSource(process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_SRC)

  return domain && scriptSource ? {domain, scriptSource} : null
}
