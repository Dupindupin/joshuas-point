import type {ImageProps} from 'next/image'
import Image from 'next/image'

type EditorialImage = {
  alt: string
  src: ImageProps['src']
}

type EditorialMediaProps = {
  image?: EditorialImage
  ratio?: 'landscape' | 'panoramic' | 'portrait'
  sizes: string
  tone?: 'morning' | 'stone'
}

const ratioClasses: Record<NonNullable<EditorialMediaProps['ratio']>, string> = {
  landscape: 'aspect-[3/2]',
  panoramic: 'aspect-[16/9] min-h-[24rem] sm:min-h-[34rem] lg:min-h-[48rem]',
  portrait: 'aspect-[4/5] min-h-[32rem]',
}

const toneClasses: Record<NonNullable<EditorialMediaProps['tone']>, string> = {
  morning:
    'bg-[radial-gradient(circle_at_74%_20%,rgba(246,242,235,0.88),transparent_31%),linear-gradient(146deg,rgba(183,176,166,0.58)_0%,rgba(106,142,161,0.3)_52%,rgba(64,85,72,0.46)_100%)]',
  stone:
    'bg-[radial-gradient(circle_at_26%_18%,rgba(246,242,235,0.62),transparent_29%),linear-gradient(154deg,rgba(183,176,166,0.82)_0%,rgba(165,111,58,0.24)_48%,rgba(64,85,72,0.42)_100%)]',
}

export function EditorialMedia({
  image,
  ratio = 'landscape',
  sizes,
  tone = 'morning',
}: EditorialMediaProps) {
  return (
    <div
      aria-hidden={image ? undefined : true}
      className={`relative w-full overflow-hidden ${ratioClasses[ratio]} ${toneClasses[tone]}`}
    >
      {image ? <Image alt={image.alt} className="object-cover" fill sizes={sizes} src={image.src} /> : null}
    </div>
  )
}
