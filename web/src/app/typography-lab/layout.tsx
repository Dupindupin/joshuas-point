import type {ReactNode} from 'react'

import {typographyLabFontVariables} from './font-config'

export default function TypographyLabLayout({children}: {children: ReactNode}) {
  return <div className={typographyLabFontVariables}>{children}</div>
}
