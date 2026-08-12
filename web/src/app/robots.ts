import type {MetadataRoute} from 'next'

import {isSearchIndexingAllowed} from '@/lib/deployment'
import {getSiteUrl} from '@/lib/site-url'

export default function robots(): MetadataRoute.Robots {
  if (!isSearchIndexingAllowed()) {
    return {
      rules: {
        disallow: '/',
        userAgent: '*',
      },
    }
  }

  const siteUrl = getSiteUrl()

  return {
    rules: {
      allow: '/',
      userAgent: '*',
    },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  }
}
