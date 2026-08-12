import type {HTMLAttributes} from 'react'

import {EditorialContainer} from '@/components/editorial/editorial-container'

type EditorialDividerProps = HTMLAttributes<HTMLDivElement> & {
  width?: 'reading' | 'wide'
}

export function EditorialDivider({
  className = '',
  width = 'wide',
  ...props
}: EditorialDividerProps) {
  return (
    <EditorialContainer className={className} size={width} {...props}>
      <hr className="border-0 border-t border-border/35" />
    </EditorialContainer>
  )
}
