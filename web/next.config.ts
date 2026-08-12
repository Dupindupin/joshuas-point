import path from 'node:path'
import type {NextConfig} from 'next'

import {sanityConfig} from './src/sanity/config'

const indexingAllowed = process.env.NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT === 'production'

const nextConfig: NextConfig = {
  async headers() {
    if (indexingAllowed) return []

    return [
      {
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
          },
        ],
        source: '/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        destination: '/destinations/casaroro-falls',
        permanent: true,
        source: '/casaroro-falls',
      },
      {
        destination: '/destinations/lake-balanan',
        permanent: true,
        source: '/lake-balanan-siaton',
      },
      {
        destination: '/destinations/apo-island',
        permanent: true,
        source: '/apo-island',
      },
      {
        destination: '/destinations/dauin',
        permanent: true,
        source: '/dauin-negros-oriental',
      },
      {
        destination: '/destinations/dumaguete',
        permanent: true,
        source: '/dumaguete',
      },
      {
        destination: '/destinations/valencia',
        permanent: true,
        source: '/valencia-negros-oriental',
      },
      {
        destination: '/destinations/pulangbato-falls',
        permanent: true,
        source: '/pulangbato-falls',
      },
      {
        destination: '/destinations/twin-lakes',
        permanent: true,
        source: '/twin-lakes-negros-oriental',
      },
      {
        destination: '/destinations/najandig-peak',
        permanent: true,
        source: '/najandig-peak',
      },
      {
        destination: '/destinations/siaton',
        permanent: true,
        source: '/siaton',
      },
      {
        destination: '/scenic-routes/coastal-ride-to-dumaguete',
        permanent: true,
        source: '/coastal-ride-to-dumaguete',
      },
      {
        destination: '/scenic-routes/valencia-highlands-loop',
        permanent: true,
        source: '/valencia-highlands-loop',
      },
      {
        destination: '/scenic-routes/waterfall-explorer',
        permanent: true,
        source: '/waterfall-explorer',
      },
      {
        destination: '/scenic-routes/twin-lakes-escape',
        permanent: true,
        source: '/twin-lakes-escape',
      },
      {
        destination: '/scenic-routes/southern-explorer',
        permanent: true,
        source: '/southern-explorer',
      },
      {
        destination: '/guide',
        permanent: true,
        source: '/negros-oriental',
      },
      {
        destination: '/destinations',
        permanent: true,
        source: '/explore-all-destinations',
      },
      {
        destination: '/guide#waterfalls',
        permanent: true,
        source: '/waterfalls',
      },
      {
        destination: '/guide#mountains-and-lakes',
        permanent: true,
        source: '/mountains-and-lakes',
      },
      {
        destination: '/guide#cities-and-culture',
        permanent: true,
        source: '/cities-and-culture',
      },
      {
        destination: '/dive-sites',
        permanent: true,
        source: '/marine-adventures',
      },
      {
        destination: '/dive-sites/apo-island',
        permanent: true,
        source: '/apo-island-diving',
      },
      {
        destination: '/dive-sites/dauin',
        permanent: true,
        source: '/dauin-diving',
      },
      {
        destination: '/dive-sites/zamboanguita',
        permanent: true,
        source: '/zamboanguita-diving',
      },
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '32kb',
    },
  },
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
