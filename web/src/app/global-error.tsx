'use client'

import * as Sentry from '@sentry/nextjs'
import Link from 'next/link'
import {useEffect} from 'react'

export default function GlobalError({error}: {error: Error & {digest?: string}}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          background: '#f3ede6',
          color: '#282828',
          display: 'grid',
          fontFamily: 'Georgia, Times New Roman, serif',
          margin: 0,
          minHeight: '100vh',
          padding: '2rem',
          placeItems: 'center',
        }}
      >
        <main style={{maxWidth: '36rem', textAlign: 'center'}}>
          <p style={{color: '#496b5b', letterSpacing: '0.16em', textTransform: 'uppercase'}}>
            Joshua&apos;s Point
          </p>
          <h1 style={{color: '#1f3d3a', fontSize: 'clamp(2rem, 7vw, 4rem)', fontWeight: 400}}>
            This page needs a moment.
          </h1>
          <p style={{fontFamily: 'Arial, Helvetica, sans-serif', lineHeight: 1.7}}>
            Please refresh the page or return to the beginning.
          </p>
          <Link
            href="/"
            style={{
              color: '#1f3d3a',
              display: 'inline-block',
              fontFamily: 'Arial, Helvetica, sans-serif',
              marginTop: '1.5rem',
              textUnderlineOffset: '0.35em',
            }}
          >
            Return home
          </Link>
        </main>
      </body>
    </html>
  )
}
