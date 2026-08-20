import type {PortableTextBlock} from '@portabletext/react'
import {cache} from 'react'

import {sanityClient} from '../client'
import type {SeoData} from '../types'

export type InformationPageData = {
  _id: string
  _updatedAt?: string
  body: PortableTextBlock[]
  eyebrow: string
  introduction: string
  seo?: SeoData | null
  title: string
}

const informationPageQuery = /* groq */ `
  *[_type == "informationPage" && _id == $documentId][0] {
    _id,
    _updatedAt,
    body,
    eyebrow,
    introduction,
    seo,
    title
  }
`

export const getInformationPage = cache(async (documentId: string) => {
  try {
    return await sanityClient.fetch<InformationPageData | null>(
      informationPageQuery,
      {documentId},
      {
        next: {
          revalidate: 3600,
          tags: [`sanity:informationPage:${documentId}`],
        },
      },
    )
  } catch (error) {
    console.error(`Unable to load information page “${documentId}”.`, error)
    return null
  }
})
