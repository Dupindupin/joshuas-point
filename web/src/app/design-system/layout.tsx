import type {ReactNode} from 'react'

import {brandFontVariables} from '@/styles/fonts'

export default function DesignSystemLayout({children}: {children: ReactNode}) {
  return (
    <div className={brandFontVariables} data-atmosphere="morning">
      {children}
    </div>
  )
}
