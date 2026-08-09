import {createClient} from '@sanity/client'

import {sanityConfig} from './config'

export const sanityClient = createClient({
  ...sanityConfig,
  perspective: 'published',
  useCdn: true,
})
