import path from 'node:path'
import type {NextConfig} from 'next'

import {sanityConfig} from './src/sanity/config'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'cdn.sanity.io',
        pathname: `/images/${sanityConfig.projectId}/${sanityConfig.dataset}/**`,
        port: '',
        protocol: 'https',
      },
    ],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
