import Link from 'next/link'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'

export type SiteFooterLink = {
  href: string
  label: string
}

export type SiteFooterSocialLink = SiteFooterLink

export type SiteFooterGuide = {
  status: string
  title: string
}

export type SiteFooterProps = {
  closingStatement?: string
  contactHref?: string
  copyrightText?: string
  email?: string
  exploreLinks?: SiteFooterLink[]
  guides?: SiteFooterGuide[]
  legalLinks?: SiteFooterLink[]
  location?: string
  siteName?: string
  socialLinks?: SiteFooterSocialLink[]
  stayLinks?: SiteFooterLink[]
}

const defaultStayLinks: SiteFooterLink[] = [
  {href: '/the-house', label: 'The House'},
  {href: '/rooms', label: 'Rooms'},
  {href: '/contact', label: 'Plan Your Stay'},
]

const defaultExploreLinks: SiteFooterLink[] = [
  {href: '/destinations', label: 'Destinations'},
  {href: '/dive-sites', label: 'Dive Guide'},
  {href: '/experiences', label: 'Experiences'},
  {href: '/journal', label: 'Journal'},
]

const defaultGuides: SiteFooterGuide[] = [
  {status: 'Coming soon', title: 'Southern Negros Explorer'},
  {status: 'Coming soon', title: 'Dive Guide'},
  {status: 'Coming soon', title: 'Scooter Guide'},
]

const defaultLegalLinks: SiteFooterLink[] = [
  {href: '/privacy', label: 'Privacy'},
  {href: '/terms', label: 'Terms'},
]

function FooterLinkGroup({links, title}: {links: SiteFooterLink[]; title: string}) {
  return (
    <nav aria-label={`${title} links`}>
      <EditorialText as="h3" className="text-linen/50" tone="inverse" variant="eyebrow">
        {title}
      </EditorialText>
      <ul className="mt-7 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="rounded-sm font-body text-sm leading-7 text-linen/78 hover:text-linen focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function FooterGuides({guides}: {guides: SiteFooterGuide[]}) {
  return (
    <section aria-labelledby="footer-guides-title">
      <EditorialText
        as="h3"
        className="text-linen/50"
        id="footer-guides-title"
        tone="inverse"
        variant="eyebrow"
      >
        Guides
      </EditorialText>
      <ul className="mt-7 space-y-4">
        {guides.map((guide) => (
          <li className="font-body text-sm leading-6 text-linen/72" key={guide.title}>
            <span className="block">{guide.title}</span>
            <span className="mt-1 block text-[0.6875rem] tracking-[0.12em] text-linen/38 uppercase">
              {guide.status}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function FooterContact({
  contactHref,
  email,
  location,
  socialLinks,
}: Required<Pick<SiteFooterProps, 'contactHref' | 'location' | 'socialLinks'>> &
  Pick<SiteFooterProps, 'email'>) {
  return (
    <section aria-labelledby="footer-contact-title">
      <EditorialText
        as="h3"
        className="text-linen/50"
        id="footer-contact-title"
        tone="inverse"
        variant="eyebrow"
      >
        Contact
      </EditorialText>
      <address className="mt-7 space-y-6 not-italic">
        <div>
          <p className="font-body text-[0.6875rem] tracking-[0.12em] text-linen/38 uppercase">
            Email
          </p>
          {email ? (
            <a
              className="mt-2 inline-flex rounded-sm font-body text-sm leading-7 text-linen/78 hover:text-linen focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          ) : (
            <Link
              className="mt-2 inline-flex rounded-sm font-body text-sm leading-7 text-linen/78 hover:text-linen focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
              href={contactHref}
            >
              Contact Joshua&apos;s Point
            </Link>
          )}
        </div>

        <div>
          <p className="font-body text-[0.6875rem] tracking-[0.12em] text-linen/38 uppercase">
            Location
          </p>
          <p className="mt-2 font-body text-sm leading-7 text-linen/72">{location}</p>
        </div>

        {socialLinks.length > 0 ? (
          <div>
            <p className="font-body text-[0.6875rem] tracking-[0.12em] text-linen/38 uppercase">
              Social
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="rounded-sm font-body text-sm leading-7 text-linen/78 hover:text-linen focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </address>
    </section>
  )
}

export function SiteFooter({
  closingStatement = 'A quiet place from which to discover Southern Negros.',
  contactHref = '/contact',
  copyrightText = "Joshua's Point",
  email,
  exploreLinks = defaultExploreLinks,
  guides = defaultGuides,
  legalLinks = defaultLegalLinks,
  location = 'Southern Negros, Philippines',
  siteName = "Joshua's Point",
  socialLinks = [],
  stayLinks = defaultStayLinks,
}: SiteFooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-evening text-linen">
      <SectionSpacing as="div" size="generous">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-8">
              <EditorialText
                as="h2"
                className="max-w-4xl"
                headingSize="large"
                tone="inverse"
                variant="heading"
              >
                {siteName}
              </EditorialText>
              <EditorialText className="mt-8 max-w-2xl text-linen/68" tone="inverse" variant="lead">
                {closingStatement}
              </EditorialText>
            </div>
          </EditorialGrid>

          <div className="mt-28 grid gap-y-16 sm:mt-36 sm:grid-cols-2 sm:gap-x-12 lg:mt-48 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-20">
            <div className="lg:col-span-2">
              <FooterLinkGroup links={stayLinks} title="Stay" />
            </div>
            <div className="lg:col-span-2 lg:col-start-4">
              <FooterLinkGroup links={exploreLinks} title="Explore" />
            </div>
            <div className="lg:col-span-3 lg:col-start-7">
              <FooterGuides guides={guides} />
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <FooterContact
                contactHref={contactHref}
                email={email}
                location={location}
                socialLinks={socialLinks}
              />
            </div>
          </div>

          <div className="mt-24 border-t border-linen/16 pt-7 sm:mt-32 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <p className="font-body text-[0.6875rem] leading-6 tracking-[0.06em] text-linen/42">
              © {year} {copyrightText}
            </p>
            <nav aria-label="Legal" className="mt-4 sm:mt-0">
              <ul className="flex gap-6">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="rounded-sm font-body text-[0.6875rem] leading-6 text-linen/42 hover:text-linen/75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </EditorialContainer>
      </SectionSpacing>
    </footer>
  )
}
