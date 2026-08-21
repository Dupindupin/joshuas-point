import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

import {
  comingSoonAccessCookie,
  createComingSoonAccessValue,
  getComingSoonBypassSecret,
  isComingSoonModeEnabled,
  securelyMatches,
} from '@/lib/coming-soon'

export async function proxy(request: NextRequest) {
  const comingSoonEnabled = isComingSoonModeEnabled()
  const isPrivateReadingRoute =
    request.nextUrl.pathname === '/premium-guide' ||
    request.nextUrl.pathname.startsWith('/premium-guide/') ||
    request.nextUrl.pathname === '/premium-guide-preview' ||
    request.nextUrl.pathname.startsWith('/premium-guide-preview/')
  const bypassSecret = getComingSoonBypassSecret()
  const accessCookie = request.cookies.get(comingSoonAccessCookie)?.value
  let hasReviewAccess = false

  if (bypassSecret && accessCookie) {
    const expectedAccessValue = await createComingSoonAccessValue(bypassSecret)
    hasReviewAccess = securelyMatches(accessCookie, expectedAccessValue)
  }

  if (hasReviewAccess) return NextResponse.next()

  if (isPrivateReadingRoute && !comingSoonEnabled) {
    return new NextResponse('Not Found', {
      headers: {
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
      status: 404,
    })
  }

  if (!comingSoonEnabled) return NextResponse.next()

  const response = NextResponse.rewrite(new URL('/coming-soon', request.url))
  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  return response
}

export const config = {
  matcher: [
    '/((?!api/owner/status|api/owner/operations|api/sanity/revalidate|api/subscriptions|coming-soon|internal/email-preview|robots\\.txt|sitemap\\.xml|_next/static|_next/image|favicon\\.ico|.*\\.[^/]+$).*)',
  ],
}
