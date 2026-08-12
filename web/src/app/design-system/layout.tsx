import type {Metadata} from 'next'
import type {ReactNode} from 'react'

import {brandFontVariables} from '@/styles/fonts'

export const metadata: Metadata = {
  robots: {
    follow: false,
    index: false,
  },
}

export default function DesignSystemLayout({children}: {children: ReactNode}) {
  return <div className={brandFontVariables}>{children}</div>
}
