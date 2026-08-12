import {Button, Card, Heading, Spinner, Text} from '@sanity/ui'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {IntentButton, useClient} from 'sanity'

import {ownerDashboardQuery} from './query'
import {resolvePremiumGuideStatus} from './premiumGuideStatus'
import type {
  DashboardDocument,
  DashboardPhotoStory,
  DashboardSiteSettings,
  DashboardStatus,
  OwnerDashboardData,
} from './types'

const apiVersion = '2026-08-12'
const contentTypes = ['destination', 'diveSite', 'scenicRoute']

const studioEnvironment =
  (import.meta as unknown as {env?: Record<string, string | undefined>}).env ?? {}

const styles = {
  page: {
    margin: '0 auto',
    maxWidth: 1440,
    padding: 'clamp(1rem, 3vw, 3rem)',
  },
  header: {
    alignItems: 'flex-start',
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  sectionGrid: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))',
  },
  section: {marginTop: '2rem'},
  card: {height: '100%'},
  cardBody: {display: 'grid', gap: '0.8rem'},
  row: {
    alignItems: 'center',
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'space-between',
  },
  issueList: {display: 'grid', gap: '0.5rem', margin: 0, padding: 0},
  issue: {
    alignItems: 'center',
    display: 'flex',
    gap: '0.75rem',
    justifyContent: 'space-between',
    listStyle: 'none',
  },
} as const

const statusLabels: Record<DashboardStatus, string> = {
  blocked: 'Blocked',
  complete: 'Complete',
  needsAttention: 'Needs attention',
}

const statusTones = {
  blocked: 'critical',
  complete: 'positive',
  needsAttention: 'caution',
} as const

function hasImage(image: {asset?: {_ref?: string} | null} | null | undefined) {
  return Boolean(image?.asset?._ref)
}

function imageCount(images: Array<{asset?: {_ref?: string} | null}> | null | undefined) {
  return (images ?? []).filter(hasImage).length
}

function photoStoryIsComplete(story: DashboardPhotoStory) {
  return (
    hasImage(story.heroImage) &&
    imageCount(story.openingImages) >= 1 &&
    imageCount(story.journeyImages) >= 3 &&
    imageCount(story.detailImages) >= 2 &&
    imageCount(story.closingImages) >= 1
  )
}

function documentLabel(document: DashboardDocument) {
  return document.title?.trim() || document.name?.trim() || 'Untitled page'
}

function StatusBadge({status}: {status: DashboardStatus}) {
  return <Card padding={2} radius={2} tone={statusTones[status]}>{statusLabels[status]}</Card>
}

function DashboardSection({
  children,
  description,
  title,
}: {
  children: React.ReactNode
  description: string
  title: string
}) {
  return (
    <section aria-labelledby={`dashboard-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} style={styles.section}>
      <div style={{display: 'grid', gap: '0.4rem', marginBottom: '1rem'}}>
        <Heading id={`dashboard-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} size={2}>
          {title}
        </Heading>
        <Text muted size={1}>{description}</Text>
      </div>
      {children}
    </section>
  )
}

function SummaryCard({
  children,
  status,
  title,
}: {
  children: React.ReactNode
  status: DashboardStatus
  title: string
}) {
  return (
    <Card border padding={4} radius={3} style={styles.card}>
      <div style={styles.cardBody}>
        <div style={styles.row}>
          <Heading as="h3" size={1}>{title}</Heading>
          <StatusBadge status={status} />
        </div>
        {children}
      </div>
    </Card>
  )
}

function Value({label, value}: {label: string; value?: React.ReactNode}) {
  return (
    <div style={styles.row}>
      <Text muted size={1}>{label}</Text>
      <Text size={1} weight="medium">{value || 'Not added'}</Text>
    </div>
  )
}

function EditDocumentButton({document}: {document: DashboardDocument}) {
  return (
    <IntentButton
      intent="edit"
      mode="ghost"
      params={{id: document._id.replace(/^drafts\./, ''), type: document._type}}
      text="Open"
      tone="primary"
    />
  )
}

function IssueList({documents}: {documents: DashboardDocument[]}) {
  if (documents.length === 0) return <Text muted size={1}>Nothing needs attention.</Text>

  return (
    <ul style={styles.issueList}>
      {documents.map((document) => (
        <li key={`${document._type}-${document._id}`} style={styles.issue}>
          <Text size={1}>{documentLabel(document)}</Text>
          <EditDocumentButton document={document} />
        </li>
      ))}
    </ul>
  )
}

function socialStatus(settings: DashboardSiteSettings | null | undefined, platform: string) {
  return settings?.footer?.socialLinks?.some(
    (profile) => profile?.platform === platform && profile.url?.startsWith('https://'),
  )
}

function requiredWebsiteSettingsComplete(settings: DashboardSiteSettings | null | undefined) {
  return Boolean(
    settings?.siteTitle?.trim() &&
      settings.siteDescription?.trim() &&
      settings.siteUrl?.startsWith('https://') &&
      settings.contactDetails?.email?.trim() &&
      settings.contactDetails.address?.locality?.trim() &&
      settings.primaryNavigation?.length &&
      settings.defaultSeo?.metaTitle?.trim() &&
      settings.defaultSeo.metaDescription?.trim(),
  )
}

function formatAddress(settings: DashboardSiteSettings | null | undefined) {
  const address = settings?.contactDetails?.address
  return [address?.locality, address?.region, address?.postalCode, address?.country]
    .filter(Boolean)
    .join(', ')
}

function OwnerDashboardContent({data}: {data: OwnerDashboardData}) {
  const settings = data.settings
  const editorialDocuments = data.documents.filter((document) => contentTypes.includes(document._type))
  const destinations = editorialDocuments.filter((document) => document._type === 'destination')
  const diveSites = editorialDocuments.filter((document) => document._type === 'diveSite')
  const scenicRoutes = editorialDocuments.filter((document) => document._type === 'scenicRoute')

  const missingHeroes = editorialDocuments.filter((document) => !hasImage(document.heroImage))
  const incompletePhotoStories = editorialDocuments.filter(
    (document) =>
      !document.stories?.length || document.stories.some((story) => !photoStoryIsComplete(story)),
  )
  const incompletePhotography = editorialDocuments.filter(
    (document) => missingHeroes.includes(document) || incompletePhotoStories.includes(document),
  )

  const missingSeoTitles = data.documents.filter((document) => !document.seoTitle?.trim())
  const missingSeoDescriptions = data.documents.filter((document) => !document.seoDescription?.trim())
  const missingSocialImages = data.documents.filter((document) => !hasImage(document.seoSocialImage))
  const noIndexDocuments = data.documents.filter((document) => document.noIndex)
  const documentsWithoutSlugs = editorialDocuments.filter((document) => !document.slug?.trim())

  const destinationMaps = destinations.filter((document) => document.mapLocation?.coordinates)
  const diveMaps = diveSites.filter((document) => document.mapLocation?.coordinates)
  const routeMaps = scenicRoutes.filter((document) => (document.routePathCount ?? 0) >= 2)
  const mountainLakeRoute = scenicRoutes.find((document) =>
    document.slug?.includes('mountain-lake'),
  )

  const resendConfigured = studioEnvironment.SANITY_STUDIO_RESEND_CONFIGURED === 'true'
  const emailDomainStatus =
    studioEnvironment.SANITY_STUDIO_EMAIL_DOMAIN_STATUS || 'not configured'
  const publicSender = studioEnvironment.SANITY_STUDIO_PUBLIC_SENDER_EMAIL
  const emailReady = resendConfigured && emailDomainStatus === 'verified' && Boolean(publicSender)
  const mapProviderConfigured =
    studioEnvironment.SANITY_STUDIO_MAP_PROVIDER_CONFIGURED === 'true'

  const legalLabels = (settings?.footer?.legalLinks ?? []).flatMap((link) =>
    link?.label ? [link.label.toLowerCase()] : [],
  )
  const legalComplete =
    legalLabels.some((label) => label.includes('privacy')) &&
    legalLabels.some((label) => label.includes('terms'))

  const premiumGuide = resolvePremiumGuideStatus(data)

  const launchItems: Array<{label: string; status: DashboardStatus}> = [
    {label: 'Website', status: requiredWebsiteSettingsComplete(settings) ? 'complete' : 'needsAttention'},
    {label: 'Photography', status: incompletePhotography.length ? 'needsAttention' : 'complete'},
    {label: 'Premium Guide', status: premiumGuide.overallStatus},
    {
      label: 'Maps',
      status: mapProviderConfigured && settings?.propertyLocation?.coordinates ? 'complete' : 'needsAttention',
    },
    {
      label: 'SEO',
      status:
        settings?.defaultSeo?.metaTitle && settings.defaultSeo.metaDescription && !documentsWithoutSlugs.length
          ? 'complete'
          : 'needsAttention',
    },
    {label: 'Email', status: emailReady ? 'complete' : 'blocked'},
    {
      label: 'Social',
      status: socialStatus(settings, 'instagram') && socialStatus(settings, 'facebook') ? 'complete' : 'needsAttention',
    },
    {label: 'Legal / privacy', status: legalComplete ? 'complete' : 'needsAttention'},
  ]

  return (
    <>
      <div style={styles.sectionGrid}>
        {launchItems.map((item) => (
          <SummaryCard key={item.label} status={item.status} title={item.label}>
            <Text muted size={1}>
              {item.status === 'complete'
                ? 'Ready based on current published information.'
                : item.status === 'blocked'
                  ? 'A required external or content decision is still missing.'
                  : 'Open the sections below to see what needs attention.'}
            </Text>
          </SummaryCard>
        ))}
      </div>

      <DashboardSection
        title="Website"
        description="The public identity, contact details, booking links and navigation all come from Site Settings."
      >
        <div style={styles.sectionGrid}>
          <SummaryCard status={requiredWebsiteSettingsComplete(settings) ? 'complete' : 'needsAttention'} title="Public website">
            <Value label="Site title" value={settings?.siteTitle} />
            <Value label="Description" value={settings?.siteDescription} />
            <Value label="Canonical URL" value={settings?.siteUrl} />
            <Value label="Public email" value={settings?.contactDetails?.email} />
            <Value label="Phone" value={settings?.contactDetails?.phone} />
            <Value label="WhatsApp" value={settings?.contactDetails?.whatsappUrl} />
            <Value label="Public location" value={formatAddress(settings)} />
            <Value
              label="Booking"
              value={settings?.bookingLinks?.enabled ? settings.bookingLinks.primary?.label || 'Enabled' : 'Not enabled'}
            />
            <Value label="Navigation items" value={settings?.primaryNavigation?.length || 0} />
            <IntentButton intent="edit" params={{id: 'siteSettings', type: 'siteSettings'}} text="Edit Site Settings" />
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Brand"
        description="Approved identity assets are managed in Site Settings. Palette and typography are shown here as a read-only reference."
      >
        <div style={styles.sectionGrid}>
          <SummaryCard
            status={
              hasImage(settings?.primaryLogo) &&
              hasImage(settings?.compactLogo) &&
              hasImage(settings?.defaultSocialImage) &&
              hasImage(settings?.squareProfileImage)
                ? 'complete'
                : 'needsAttention'
            }
            title="Brand assets"
          >
            <Value label="Primary logo" value={hasImage(settings?.primaryLogo) ? 'Added' : undefined} />
            <Value label="Compact mark" value={hasImage(settings?.compactLogo) ? 'Added' : undefined} />
            <Value label="Social profile image" value={hasImage(settings?.squareProfileImage) ? 'Added' : undefined} />
            <Value label="Default sharing image" value={hasImage(settings?.defaultSocialImage) ? 'Added' : undefined} />
            <Value label="Favicon reference" value={hasImage(settings?.faviconImage) ? 'Added' : undefined} />
            <Value label="App icon reference" value={hasImage(settings?.appIconImage) ? 'Added' : undefined} />
          </SummaryCard>
          <SummaryCard status="complete" title="Approved design language">
            <Value label="Display type" value="Newsreader" />
            <Value label="Body type" value="Manrope" />
            {[
              ['Deep Ocean', '#1F3D3A'],
              ['Forest', '#496B5B'],
              ['Warm Sand', '#C8A26A'],
              ['Linen', '#F3EDE6'],
              ['Charcoal', '#282828'],
            ].map(([name, colour]) => (
              <div key={name} style={styles.row}>
                <Text muted size={1}>{name}</Text>
                <div style={{alignItems: 'center', display: 'flex', gap: '0.5rem'}}>
                  <span aria-hidden="true" style={{background: colour, border: '1px solid currentColor', borderRadius: '50%', height: 20, width: 20}} />
                  <Text size={1} weight="medium">{colour}</Text>
                </div>
              </div>
            ))}
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection title="Social" description="Only confirmed HTTPS profiles in Site Settings are shown publicly.">
        <div style={styles.sectionGrid}>
          {['instagram', 'facebook', 'youtube', 'tiktok', 'pinterest'].map((platform) => {
            const connected = socialStatus(settings, platform)
            return (
              <SummaryCard key={platform} status={connected ? 'complete' : 'needsAttention'} title={platform[0].toUpperCase() + platform.slice(1)}>
                <Text muted size={1}>{connected ? 'Connected with an approved public URL.' : 'No approved account is connected.'}</Text>
              </SummaryCard>
            )
          })}
        </div>
      </DashboardSection>

      <DashboardSection
        title="Premium Guide"
        description="Edition 1 production status without duplicating manuscript content or claiming CMS authority."
      >
        <div style={styles.sectionGrid}>
          <SummaryCard status={premiumGuide.overallStatus} title={premiumGuide.title}>
            <Card padding={3} radius={2} tone="primary">
              <Text size={1} weight="medium">Current source: {premiumGuide.source}</Text>
            </Card>
            <Value label="Manuscript" value={premiumGuide.manuscript} />
            <Value
              label="Chapters"
              value={`${premiumGuide.chapters.complete} / ${premiumGuide.chapters.total}`}
            />
            <Value
              label="Core journeys"
              value={`${premiumGuide.journeys.complete} / ${premiumGuide.journeys.total}`}
            />
            <Value label="Web edition" value={premiumGuide.webEdition} />
            <Value label="PDF" value={premiumGuide.pdf} />
            <Value label="EPUB" value={premiumGuide.epub} />
            <Value label="Photography" value={premiumGuide.photography} />
            <Value label="Static offline maps" value={premiumGuide.staticOfflineMaps} />
            <Value label="Mountain & Lake route" value={premiumGuide.mountainLakeRoute} />
            <Value label="Commerce" value={premiumGuide.commerce} />
            {premiumGuide.source === 'File-backed Edition 1 production' ? (
              <Card border padding={3} radius={2}>
                <Text size={1}>
                  The Premium Guide is currently produced from the approved Edition 1 manuscript
                  and build system. It has not yet been migrated into Sanity as the authoritative
                  content source.
                </Text>
              </Card>
            ) : null}
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Photography"
        description="A complete story has a hero, opening, journey, details and closing sequence. Every item below opens directly in Studio."
      >
        <div style={styles.sectionGrid}>
          {[
            ['Destinations', destinations],
            ['Dive Sites', diveSites],
            ['Scenic Routes', scenicRoutes],
          ].map(([label, documents]) => {
            const values = documents as DashboardDocument[]
            const incomplete = values.filter((document) => incompletePhotography.includes(document))
            return (
              <SummaryCard key={label as string} status={incomplete.length ? 'needsAttention' : 'complete'} title={label as string}>
                <Value label="Complete" value={values.length - incomplete.length} />
                <Value label="Incomplete" value={incomplete.length} />
                <IssueList documents={incomplete} />
              </SummaryCard>
            )
          })}
          <SummaryCard status={missingHeroes.length ? 'needsAttention' : 'complete'} title="Missing hero images">
            <IssueList documents={missingHeroes} />
          </SummaryCard>
          <SummaryCard status={incompletePhotoStories.length ? 'needsAttention' : 'complete'} title="Incomplete photo stories">
            <IssueList documents={incompletePhotoStories} />
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection title="Maps" description="Only the presence of approved public map data is shown. Coordinates themselves remain hidden here.">
        <div style={styles.sectionGrid}>
          <SummaryCard status={mapProviderConfigured ? 'complete' : 'needsAttention'} title="Explorer">
            <Value label="Interactive provider" value={mapProviderConfigured ? 'Configured' : undefined} />
            <Value label="Public Joshua’s Point coordinate" value={settings?.propertyLocation?.coordinates ? 'Approved location present' : undefined} />
          </SummaryCard>
          <SummaryCard status={destinationMaps.length === destinations.length ? 'complete' : 'needsAttention'} title="Destination maps">
            <Value label="Mapped" value={`${destinationMaps.length} of ${destinations.length}`} />
            <IssueList documents={destinations.filter((document) => !destinationMaps.includes(document))} />
          </SummaryCard>
          <SummaryCard status={routeMaps.length === scenicRoutes.length ? 'complete' : 'needsAttention'} title="Scenic Routes">
            <Value label="Routes with geometry" value={`${routeMaps.length} of ${scenicRoutes.length}`} />
            <IssueList documents={scenicRoutes.filter((document) => !routeMaps.includes(document))} />
          </SummaryCard>
          <SummaryCard status={diveMaps.length === diveSites.length ? 'complete' : 'needsAttention'} title="Dive Areas">
            <Value label="Mapped" value={`${diveMaps.length} of ${diveSites.length}`} />
            <IssueList documents={diveSites.filter((document) => !diveMaps.includes(document))} />
          </SummaryCard>
          <SummaryCard status={mountainLakeRoute ? 'complete' : 'blocked'} title="Mountain & Lake route">
            <Text muted size={1}>{mountainLakeRoute ? 'An approved route document is available.' : 'No approved route document is available yet.'}</Text>
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection title="SEO" description="Page-specific gaps are shown without overriding the approved site-wide defaults.">
        <div style={styles.sectionGrid}>
          <SummaryCard status={settings?.defaultSeo?.metaTitle && settings.defaultSeo.metaDescription ? 'complete' : 'needsAttention'} title="Site defaults">
            <Value label="Default title" value={settings?.defaultSeo?.metaTitle} />
            <Value label="Default description" value={settings?.defaultSeo?.metaDescription} />
            <Value label="Default social image" value={hasImage(settings?.defaultSocialImage) ? 'Added' : undefined} />
          </SummaryCard>
          <SummaryCard status={missingSeoTitles.length ? 'needsAttention' : 'complete'} title="Missing page titles">
            <IssueList documents={missingSeoTitles} />
          </SummaryCard>
          <SummaryCard status={missingSeoDescriptions.length ? 'needsAttention' : 'complete'} title="Missing descriptions">
            <IssueList documents={missingSeoDescriptions} />
          </SummaryCard>
          <SummaryCard status={missingSocialImages.length ? 'needsAttention' : 'complete'} title="Using default social image">
            <Text muted size={1}>These pages do not have a page-specific sharing image.</Text>
            <IssueList documents={missingSocialImages} />
          </SummaryCard>
          <SummaryCard status={documentsWithoutSlugs.length ? 'blocked' : 'complete'} title="Sitemap and canonical readiness">
            <Value label="Canonical site URL" value={settings?.siteUrl} />
            <Value label="Pages missing URL slugs" value={documentsWithoutSlugs.length} />
            <IssueList documents={documentsWithoutSlugs} />
          </SummaryCard>
          <SummaryCard status={noIndexDocuments.length ? 'needsAttention' : 'complete'} title="Hidden from search">
            <IssueList documents={noIndexDocuments} />
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection title="Email" description="Only safe configuration status is visible. Credentials remain in hosting environment variables.">
        <div style={styles.sectionGrid}>
          <SummaryCard status={emailReady ? 'complete' : 'blocked'} title="Enquiry email delivery">
            <Value label="Resend configured" value={resendConfigured ? 'Yes' : 'No'} />
            <Value label="Email domain" value={emailDomainStatus.replaceAll('_', ' ')} />
            <Value label="Public sender" value={publicSender} />
            <Value label="Test-email readiness" value={emailReady ? 'Ready' : 'Not ready'} />
            <Text muted size={1}>API keys, SMTP passwords and provider tokens are never available in Studio.</Text>
          </SummaryCard>
        </div>
      </DashboardSection>
    </>
  )
}

export function OwnerDashboard() {
  const client = useClient({apiVersion})
  const [data, setData] = useState<OwnerDashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await client.fetch<OwnerDashboardData>(ownerDashboardQuery, {}, {perspective: 'drafts'})
      setData(result)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'The dashboard could not be loaded.')
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    void load()
  }, [load])

  const content = useMemo(() => {
    if (loading) {
      return <div aria-label="Loading owner dashboard" style={{padding: '5rem', textAlign: 'center'}}><Spinner muted /></div>
    }
    if (error) {
      return <Card padding={4} radius={3} tone="critical"><Text>{error}</Text></Card>
    }
    return data ? <OwnerDashboardContent data={data} /> : null
  }, [data, error, loading])

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={{display: 'grid', gap: '0.5rem'}}>
          <Heading size={4}>Owner Dashboard</Heading>
          <Text muted>One clear view of what is ready and what needs attention.</Text>
        </div>
        <Button disabled={loading} mode="ghost" onClick={() => void load()} text="Refresh status" />
      </header>
      {content}
    </main>
  )
}
