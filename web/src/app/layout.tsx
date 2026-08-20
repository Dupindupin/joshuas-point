import type {Metadata} from 'next'
import {Geist_Mono} from 'next/font/google'

import {PlausibleAnalytics} from '@/components/analytics'
import {SiteFooter} from '@/components/site/site-footer'
import {SiteIdentityStructuredData} from '@/components/site/site-identity-structured-data'
import {createPageMetadata} from '@/lib/seo/metadata'
import {getSiteUrl} from '@/lib/site-url'
import {themeInitializationScript} from '@/lib/theme'
import {getBrandImageSource} from '@/sanity/image'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'
import {brandFontVariables} from '@/styles/fonts'

import 'maplibre-gl/dist/maplibre-gl.css'
import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const [metadata, settings] = await Promise.all([
    createPageMetadata({pathname: '/'}),
    getSiteSeoSettings(),
  ])
  const favicon = getBrandImageSource(settings?.faviconImage, 64)
  const appIcon = getBrandImageSource(settings?.appIconImage, 180)

  return {
    ...metadata,
    icons: {
      apple: [
        appIcon
          ? {sizes: '180x180', url: appIcon}
          : {sizes: '180x180', type: 'image/png', url: '/brand/apple-touch-icon.png'},
      ],
      icon: [
        favicon ? {url: favicon} : {type: 'image/svg+xml', url: '/brand/favicon.svg'},
        {sizes: '32x32', type: 'image/png', url: '/brand/favicon-32.png'},
      ],
    },
    metadataBase: getSiteUrl(),
  }
}

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${brandFontVariables} ${geistMono.variable} h-full antialiased`}
      data-theme="light"
      data-theme-preference="system"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{__html: themeInitializationScript}} />
      </head>
      <body className="flex min-h-full flex-col font-body">
        <SiteIdentityStructuredData />
        {children}
        <SiteFooter />
        <PlausibleAnalytics />
      </body>
    </html>
  )
}
