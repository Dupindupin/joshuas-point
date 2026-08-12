import type {HTMLAttributes} from 'react'

import type {EditorialTextTone} from '@/components/editorial/editorial-text'

export type HouseMaterialStory = {
  description: string
  id: string
  name: string
  verificationStatus: 'confirmed' | 'unverified'
}

type HouseMaterialsListProps = HTMLAttributes<HTMLDListElement> & {
  items: readonly HouseMaterialStory[]
  tone?: EditorialTextTone
}

const positionClasses = ['md:ml-0', 'md:ml-[18%]', 'md:ml-[7%]', 'md:ml-[28%]'] as const

const toneClasses: Record<EditorialTextTone, {description: string; name: string}> = {
  default: {
    description: 'text-ink/70',
    name: 'text-ink',
  },
  inverse: {
    description: 'text-inverse/70',
    name: 'text-inverse',
  },
}

export function HouseMaterialsList({
  className = '',
  items,
  tone = 'default',
  ...props
}: HouseMaterialsListProps) {
  const confirmedItems = items.filter((item) => item.verificationStatus === 'confirmed')

  if (confirmedItems.length === 0) return null

  return (
    <dl className={`space-y-20 sm:space-y-24 ${className}`} {...props}>
      {confirmedItems.map((material, index) => (
        <div
          className={`max-w-2xl ${positionClasses[index % positionClasses.length]}`}
          key={material.id}
        >
          <dt
            className={`font-display text-[3.25rem] leading-none font-medium tracking-[-0.025em] sm:text-[4rem] ${toneClasses[tone].name}`}
          >
            {material.name}
          </dt>
          <dd
            className={`mt-5 max-w-md font-body text-sm leading-7 sm:text-base sm:leading-8 ${toneClasses[tone].description}`}
          >
            {material.description}
          </dd>
        </div>
      ))}
    </dl>
  )
}
