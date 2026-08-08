import type {Metadata} from 'next'
import {Geist_Mono} from 'next/font/google'

import {brandFontVariables} from '@/styles/fonts'

import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Joshua's Point | Where Architecture Meets Nature",
  description:
    'A private architectural retreat in Negros Oriental, shaped by mountains, sea, and changing light.',
}

export default function RootLayout({children}: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${brandFontVariables} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-body">{children}</body>
    </html>
  )
}
