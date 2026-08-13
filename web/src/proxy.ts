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
  if (!isComingSoonModeEnabled()) return NextResponse.next()

  const bypassSecret = getComingSoonBypassSecret()
  const accessCookie = request.cookies.get(comingSoonAccessCookie)?.value

  if (bypassSecret && accessCookie) {
    const expectedAccessValue = await createComingSoonAccessValue(bypassSecret)

    if (securelyMatches(accessCookie, expectedAccessValue)) {
      return NextResponse.next()
    }
  }

  return NextResponse.rewrite(new URL('/coming-soon', request.url))
}

export const config = {
  matcher: [
    '/((?!api/sanity/revalidate|coming-soon|robots\\.txt|sitemap\\.xml|_next/static|_next/image|favicon\\.ico|.*\\.[^/]+$).*)',
  ],
}
