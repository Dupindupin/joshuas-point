import Link from 'next/link'

import {
  EditorialGrid,
  EditorialMedia,
  EditorialText,
  type EditorialImage,
  type EditorialMediaTone,
} from '@/components/editorial'

export type ExperiencePreviewData = {
  description: string
  href: string
  id: string
  image?: EditorialImage
  name: string
  tone?: EditorialMediaTone
}

type ExperiencePreviewProps = {
  experience: ExperiencePreviewData
  layout?: 'portrait-right' | 'wide-left'
}

const mediaClasses: Record<NonNullable<ExperiencePreviewProps['layout']>, string> = {
  'wide-left': 'lg:col-span-8 lg:row-start-1',
  'portrait-right': 'lg:col-span-5 lg:col-start-8 lg:row-start-1',
}

const contentClasses: Record<NonNullable<ExperiencePreviewProps['layout']>, string> = {
  'wide-left': 'lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:self-end lg:pb-8',
  'portrait-right': 'lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-center',
}

export function ExperiencePreview({experience, layout = 'wide-left'}: ExperiencePreviewProps) {
  const headingId = `${experience.id}-title`
  const portrait = layout === 'portrait-right'

  return (
    <article aria-labelledby={headingId}>
      <EditorialGrid gap="generous">
        <EditorialMedia
          className={mediaClasses[layout]}
          image={experience.image}
          ratio={portrait ? 'portrait' : 'landscape'}
          sizes={portrait ? '(min-width: 1024px) 42vw, 100vw' : '(min-width: 1024px) 66vw, 100vw'}
          tone={experience.tone}
        />

        <div className={contentClasses[layout]}>
          <EditorialText as="h3" headingSize="small" id={headingId} variant="heading">
            {experience.name}
          </EditorialText>
          <EditorialText className="mt-7 max-w-md" variant="body">
            {experience.description}
          </EditorialText>
          <Link
            className="mt-9 inline-flex rounded-sm font-body text-xs font-semibold tracking-[0.04em] text-charcoal underline decoration-charcoal/30 underline-offset-8 hover:decoration-charcoal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
            href={experience.href}
          >
            Read more
          </Link>
        </div>
      </EditorialGrid>
    </article>
  )
}
