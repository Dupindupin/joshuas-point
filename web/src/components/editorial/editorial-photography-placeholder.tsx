import {EditorialMedia} from './editorial-media'

export function EditorialPhotographyPlaceholder({subject}: {subject: string}) {
  return (
    <section aria-label={subject} className="overflow-hidden">
      <EditorialMedia ratio="panoramic" tone="stone" />
    </section>
  )
}
