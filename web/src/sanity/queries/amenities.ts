import {cache} from 'react'

import {sanityClient} from '../client'
import type {SanityAmenity} from '../types'

const amenitiesQuery = /* groq */ `
  *[_type == "amenity" && active == true] | order(name asc) {
    _id,
    active,
    category,
    internalKey,
    name,
    shortDescription
  }
`

export const getPublicAmenities = cache(async (): Promise<SanityAmenity[]> => {
  try {
    return await sanityClient.fetch<SanityAmenity[]>(
      amenitiesQuery,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['sanity:amenities'],
        },
      },
    )
  } catch (error) {
    console.error('Unable to load approved amenities from Sanity.', error)
    return []
  }
})
