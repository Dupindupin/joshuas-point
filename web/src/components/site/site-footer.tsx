import Link from 'next/link'

import {
  EditorialContainer,
  EditorialGrid,
  EditorialText,
  SectionSpacing,
} from '@/components/editorial'
import {ThemeControl} from '@/components/theme/theme-control'
import {normalizeSocialProfiles, type SocialProfile} from '@/lib/social-profiles'
import {getSiteSeoSettings} from '@/sanity/queries/site-settings'

import {BrandLogo} from './brand-logo'
import {SocialProfileLinks} from './social-profile-links'

export type SiteFooterLink = {
  href: string
  label: string
}

export type SiteFooterSocialLink = Pick<SocialProfile, 'href' | 'label' | 'platform'>

export type SiteFooterGuide = {
  href?: string
  status?: string
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
  {href: '/plan-your-stay', label: 'Plan Your Stay'},
]

const defaultExploreLinks: SiteFooterLink[] = [
  {href: '/explorer', label: 'Explorer Map'},
  {href: '/destinations', label: 'Destinations'},
  {href: '/scenic-routes', label: 'Scenic Routes'},
  {href: '/dive-sites', label: 'Dive Guide'},
]

const defaultGuides: SiteFooterGuide[] = [
  {href: '/guide', title: 'Southern Negros Explorer'},
  {href: '/dive-sites', title: 'Dive Guide'},
]

const defaultLegalLinks: SiteFooterLink[] = [
  {href: '/privacy', label: 'Privacy'},
  {href: '/terms', label: 'Terms'},
]

function FooterLinkGroup({links, title}: {links: SiteFooterLink[]; title: string}) {
  return (
    <nav aria-label={`${title} links`}>
      <EditorialText as="h3" className="text-inverse/50" tone="inverse" variant="eyebrow">
        {title}
      </EditorialText>
      <ul className="mt-7 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="rounded-sm font-body text-sm leading-7 text-inverse/78 hover:text-inverse focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
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
        className="text-inverse/50"
        id="footer-guides-title"
        tone="inverse"
        variant="eyebrow"
      >
        Guides
      </EditorialText>
      <ul className="mt-7 space-y-4">
        {guides.map((guide) => (
          <li className="font-body text-sm leading-6 text-inverse/72" key={guide.title}>
            {guide.href ? (
              <Link
                className="rounded-sm hover:text-inverse focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
                href={guide.href}
              >
                {guide.title}
              </Link>
            ) : (
              <span className="block">{guide.title}</span>
            )}
            {guide.status ? (
              <span className="mt-1 block text-[0.6875rem] tracking-[0.12em] text-inverse/60 uppercase">
                {guide.status}
              </span>
            ) : null}
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
        className="text-inverse/50"
        id="footer-contact-title"
        tone="inverse"
        variant="eyebrow"
      >
        Contact
      </EditorialText>
      <address className="mt-7 space-y-6 not-italic">
        <div>
          <p className="font-body text-[0.6875rem] tracking-[0.12em] text-inverse/60 uppercase">
            Email
          </p>
          {email ? (
            <a
              className="mt-2 inline-flex rounded-sm font-body text-sm leading-7 text-inverse/78 hover:text-inverse focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
              href={`mailto:${email}`}
            >
              {email}
            </a>
          ) : (
            <Link
              className="mt-2 inline-flex rounded-sm font-body text-sm leading-7 text-inverse/78 hover:text-inverse focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
              href={contactHref}
            >
              Contact Joshua&apos;s Point
            </Link>
          )}
        </div>

        <div>
          <p className="font-body text-[0.6875rem] tracking-[0.12em] text-inverse/60 uppercase">
            Location
          </p>
          <p className="mt-2 font-body text-sm leading-7 text-inverse/72">{location}</p>
        </div>

        {socialLinks.length > 0 ? (
          <div>
            <p className="font-body text-[0.6875rem] tracking-[0.12em] text-inverse/60 uppercase">
              Social
            </p>
            <SocialProfileLinks profiles={socialLinks} tone="inverse" />
          </div>
        ) : null}
      </address>
    </section>
  )
}

export async function SiteFooter(props: SiteFooterProps = {}) {
  const settings = await getSiteSeoSettings()
  const closingStatement =
    props.closingStatement ?? 'A quiet place from which to discover Southern Negros.'
  const contactHref = props.contactHref ?? '/contact'
  const copyrightText = props.copyrightText ?? "Joshua's Point"
  const email = props.email ?? 'mail@joshuaspoint.com'
  const exploreLinks = props.exploreLinks ?? defaultExploreLinks
  const guides = props.guides ?? defaultGuides
  const legalLinks = props.legalLinks ?? defaultLegalLinks
  const location =
    props.location ??
    settings?.propertyLocation?.label?.trim() ??
    "Joshua's Point, Calango, Zamboanguita 6218, Negros Oriental, Philippines"
  const siteName = props.siteName ?? "Joshua's Point"
  const socialLinks = props.socialLinks ?? normalizeSocialProfiles(settings?.socialProfiles)
  const stayLinks = props.stayLinks ?? defaultStayLinks
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-footer text-inverse">
      <SectionSpacing as="div" size="generous">
        <EditorialContainer>
          <EditorialGrid gap="generous">
            <div className="lg:col-span-8">
              <h2>
                <Link
                  className="inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-evening-accent"
                  href="/"
                >
                  <BrandLogo
                    alt={siteName}
                    className="h-auto w-[17rem] sm:w-[22rem]"
                    tone="inverse"
                  />
                </Link>
              </h2>
              <EditorialText
                className="mt-8 max-w-2xl text-inverse/68"
                tone="inverse"
                variant="lead"
              >
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

          <div className="mt-24 border-t border-inverse/16 pt-7 sm:mt-32 sm:flex sm:items-center sm:justify-between sm:gap-8">
            <p className="font-body text-[0.6875rem] leading-6 tracking-[0.06em] text-inverse/60">
              © {year} {copyrightText}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6 sm:mt-0">
              <ThemeControl tone="inverse" />
              <nav aria-label="Legal">
                <ul className="flex gap-6">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="rounded-sm font-body text-[0.6875rem] leading-6 text-inverse/60 hover:text-inverse/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-evening-accent"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </EditorialContainer>
      </SectionSpacing>
    </footer>
  )
}
