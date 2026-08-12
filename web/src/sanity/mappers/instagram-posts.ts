import type {EditorialImage} from '@/components/editorial'
import {normalizeInstagramUrl} from '@/lib/social-profiles'

import {getEditorialImage} from '../image'
import type {SanityInstagramPost} from '../types'

export type EditorialInstagramPost = {
  caption?: string
  href: string
  id: string
  image: EditorialImage
}

export function mapInstagramPosts(
  posts: readonly SanityInstagramPost[] | null | undefined,
): EditorialInstagramPost[] {
  return (posts ?? []).slice(0, 3).flatMap((post, index) => {
    const href = normalizeInstagramUrl(post.postUrl)
    const image = getEditorialImage(post.image, {height: 1200, width: 960})
    if (!href || !image) return []

    return [
      {
        caption: post.caption?.trim() || post.image?.caption?.trim() || undefined,
        href,
        id: post._key?.trim() || `${href}-${index}`,
        image,
      },
    ]
  })
}
