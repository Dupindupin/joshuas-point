import {Button, Card, Heading, Spinner, Text} from '@sanity/ui'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {IntentButton, useClient} from 'sanity'

import {ownerDashboardQuery} from './query'
import {resolvePremiumGuideStatus} from './premiumGuideStatus'
import {
  baseDocumentId,
  getContentReadiness,
  isDraftDocument,
  launchContentStatus,
  preferredDocuments,
  publishedDocumentIds,
} from './contentReadiness'
import type {
  DashboardDocument,
  DashboardLiveStatus,
  DashboardSiteSettings,
  DashboardStatus,
  OwnerDashboardData,
} from './types'

const apiVersion = '2026-08-12'
const contentTypes = ['destination', 'diveSite', 'scenicRoute']
const photographyContentTypes = ['destination', 'diveSite', 'scenicRoute', 'room', 'housePage']

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
  actions: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.75rem',
    marginTop: '0.25rem',
  },
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
  subsection: {marginTop: '1.5rem'},
} as const

const resendManagementLinks = {
  audience: 'https://resend.com/audiences',
  broadcasts: 'https://resend.com/broadcasts',
  emails: 'https://resend.com/emails',
} as const

const statusLabels: Record<DashboardStatus, string> = {
  blocked: 'Blocked',
  complete: 'Complete',
  needsAttention: 'Needs attention',
  unknown: 'Unknown',
}

const statusTones = {
  blocked: 'critical',
  complete: 'positive',
  needsAttention: 'caution',
  unknown: 'default',
} as const

function hasImage(image: {asset?: {_ref?: string} | null} | null | undefined) {
  return Boolean(image?.asset?._ref)
}

function documentLabel(document: DashboardDocument) {
  return document.title?.trim() || document.name?.trim() || 'Untitled page'
}

function StatusBadge({label, status}: {label?: string; status: DashboardStatus}) {
  return (
    <Card padding={2} radius={2} tone={statusTones[status]}>
      {label ?? statusLabels[status]}
    </Card>
  )
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
    <section
      aria-labelledby={`dashboard-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      style={styles.section}
    >
      <div style={{display: 'grid', gap: '0.4rem', marginBottom: '1rem'}}>
        <Heading id={`dashboard-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} size={2}>
          {title}
        </Heading>
        <Text muted size={1}>
          {description}
        </Text>
      </div>
      {children}
    </section>
  )
}

function DashboardSubsection({
  children,
  description,
  title,
}: {
  children: React.ReactNode
  description: string
  title: string
}) {
  return (
    <section style={styles.subsection}>
      <div style={{display: 'grid', gap: '0.35rem', marginBottom: '1rem'}}>
        <Heading as="h3" size={1}>
          {title}
        </Heading>
        <Text muted size={1}>
          {description}
        </Text>
      </div>
      {children}
    </section>
  )
}

function SummaryCard({
  children,
  status,
  statusLabel,
  title,
}: {
  children: React.ReactNode
  status: DashboardStatus
  statusLabel?: string
  title: string
}) {
  return (
    <Card border padding={4} radius={3} style={styles.card}>
      <div style={styles.cardBody}>
        <div style={styles.row}>
          <Heading as="h3" size={1}>
            {title}
          </Heading>
          <StatusBadge label={statusLabel} status={status} />
        </div>
        {children}
      </div>
    </Card>
  )
}

function Value({label, value}: {label: string; value?: React.ReactNode}) {
  return (
    <div style={styles.row}>
      <Text muted size={1}>
        {label}
      </Text>
      <Text size={1} weight="medium">
        {value || 'Not added'}
      </Text>
    </div>
  )
}

function ExternalButton({href, text}: {href: string; text: string}) {
  return (
    <Button
      as="a"
      href={href}
      mode="ghost"
      rel="noreferrer"
      target="_blank"
      text={text}
      tone="primary"
    />
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
  if (documents.length === 0)
    return (
      <Text muted size={1}>
        Nothing needs attention.
      </Text>
    )

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

function DetailedIssueList({
  issues,
}: {
  issues: Array<{detail: string; document: DashboardDocument}>
}) {
  if (issues.length === 0)
    return (
      <Text muted size={1}>
        Nothing needs attention.
      </Text>
    )

  return (
    <ul style={styles.issueList}>
      {issues.map(({detail, document}) => (
        <li key={`${document._type}-${document._id}-${detail}`} style={styles.issue}>
          <div style={{display: 'grid', gap: '0.2rem'}}>
            <Text size={1}>{documentLabel(document)}</Text>
            <Text muted size={1}>
              {detail}
            </Text>
          </div>
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

function configuredLabel(value: boolean | undefined) {
  if (value === undefined) return 'Unavailable'
  return value ? 'Configured' : 'Not configured'
}

function enabledLabel(value: boolean | undefined) {
  if (value === undefined) return 'Unavailable'
  return value ? 'Enabled' : 'Disabled'
}

function isDashboardLiveStatus(value: unknown): value is DashboardLiveStatus {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const status = value as Record<string, unknown>
  const booleanFields = [
    'analyticsEnabled',
    'comingSoon',
    'resendConfigured',
    'senderConfigured',
    'sendingDomainConfigured',
    'sentryEnabled',
    'siteDomainConfigured',
  ]

  return (
    booleanFields.every((field) => typeof status[field] === 'boolean') &&
    typeof status.checkedAt === 'string' &&
    !Number.isNaN(Date.parse(status.checkedAt)) &&
    ['disabled', 'live', 'test'].includes(String(status.enquiryMode)) &&
    ['disabled', 'live'].includes(String(status.subscriptionMode)) &&
    ['needsAttention', 'ready'].includes(String(status.newsletterReadiness))
  )
}

function resolveOwnerStatusUrl() {
  const configuredUrl = studioEnvironment.SANITY_STUDIO_OWNER_STATUS_URL?.trim()
  const candidate = configuredUrl || 'https://joshuaspoint.com/api/owner/status'

  try {
    const url = new URL(candidate)
    const allowedProductionOrigins = new Set([
      'https://joshuaspoint.com',
      'https://preview.joshuaspoint.com',
    ])
    const local =
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      (url.hostname === 'localhost' || url.hostname === '127.0.0.1')

    if (!allowedProductionOrigins.has(url.origin) && !local) return null
    return new URL('/api/owner/status', url.origin)
  } catch {
    return null
  }
}

function resolveOwnerPageUrl(pathname: string) {
  const statusUrl = resolveOwnerStatusUrl()
  return statusUrl ? new URL(pathname, statusUrl.origin).toString() : null
}

function OwnerDashboardContent({
  data,
  liveStatus,
  liveStatusError,
}: {
  data: OwnerDashboardData
  liveStatus: DashboardLiveStatus | null
  liveStatusError: string | null
}) {
  const settings = data.settings
  const currentDocuments = preferredDocuments(data.documents)
  const editorialDocuments = currentDocuments.filter((document) =>
    contentTypes.includes(document._type),
  )
  const destinations = editorialDocuments.filter((document) => document._type === 'destination')
  const diveSites = editorialDocuments.filter((document) => document._type === 'diveSite')
  const scenicRoutes = editorialDocuments.filter((document) => document._type === 'scenicRoute')
  const rooms = currentDocuments.filter((document) => document._type === 'room')
  const houseDocuments = currentDocuments.filter((document) => document._type === 'housePage')

  const photographyDocuments = currentDocuments.filter((document) =>
    photographyContentTypes.includes(document._type),
  )
  const photographyReadiness = photographyDocuments.map((document) => ({
    document,
    readiness: getContentReadiness(document, settings ?? null),
  }))
  const incompletePhotography = photographyReadiness.filter(
    ({readiness}) => readiness.photographyStatus === 'needsAttention',
  )
  const missingHeroes = photographyDocuments.filter((document) => !hasImage(document.heroImage))

  const publicSeoDocuments = currentDocuments.filter((document) => document._type !== 'room')
  const seoReadiness = publicSeoDocuments.map((document) => ({
    document,
    readiness: getContentReadiness(document, settings ?? null),
  }))
  const missingEffectiveTitles = seoReadiness.filter(({readiness}) => !readiness.effectiveTitle)
  const missingEffectiveDescriptions = seoReadiness.filter(
    ({readiness}) => !readiness.effectiveDescription,
  )
  const missingSocialImageFallback = seoReadiness.filter(
    ({readiness}) => readiness.socialImageSource === 'unknown',
  )
  const usingDefaultSocialImage = seoReadiness.filter(
    ({readiness}) => readiness.socialImageSource === 'default',
  )
  const canonicalIssues = seoReadiness.filter(({readiness}) => !readiness.canonicalReady)
  const noIndexDocuments = publicSeoDocuments.filter((document) => document.noIndex)
  const documentsWithoutSlugs = editorialDocuments.filter((document) => !document.slug?.trim())

  const draftDocuments = data.documents.filter(isDraftDocument)
  const draftsAwaitingReview = draftDocuments.filter(
    (document) => document.workflowStatus === 'inReview',
  )
  const approvedDocuments = currentDocuments.filter(
    (document) => document.workflowStatus === 'approved',
  )
  const publishedIds = publishedDocumentIds(data.documents)
  const remainingReviewCount = Math.max(0, currentDocuments.length - approvedDocuments.length)
  const publishedCurrentCount = currentDocuments.filter((document) =>
    publishedIds.has(baseDocumentId(document._id)),
  ).length
  const unpublishedCurrentCount = Math.max(0, currentDocuments.length - publishedCurrentCount)
  const reviewDocuments = currentDocuments.filter((document) =>
    photographyContentTypes.includes(document._type),
  )
  const reviewReadiness = reviewDocuments.map((document) => ({
    document,
    status: getContentReadiness(document, settings ?? null).reviewStatus,
  }))
  const missingReviews = reviewReadiness.filter(({status}) => status === 'missing')
  const staleReviews = reviewReadiness.filter(({status}) => status === 'stale')
  const currentReviews = reviewReadiness.filter(({status}) => status === 'current')

  const contentGroups = [
    {documents: destinations, label: 'Destinations'},
    {documents: diveSites, label: 'Dive Sites'},
    {documents: scenicRoutes, label: 'Scenic Routes'},
    {
      documents: currentDocuments.filter((document) =>
        ['room', 'roomsPage'].includes(document._type),
      ),
      label: 'Rooms',
    },
    {documents: houseDocuments, label: 'The House'},
  ].map((group) => ({
    ...group,
    status: launchContentStatus(group.documents, data.documents, settings ?? null),
  }))

  const destinationMaps = destinations.filter((document) => document.mapLocation?.coordinates)
  const diveMaps = diveSites.filter((document) => document.mapLocation?.coordinates)
  const routeMaps = scenicRoutes.filter((document) => (document.routePathCount ?? 0) >= 2)
  const mountainLakeRoute = scenicRoutes.find((document) =>
    document.slug?.includes('mountain-lake'),
  )

  const emailReady = Boolean(
    liveStatus?.resendConfigured &&
    liveStatus.sendingDomainConfigured &&
    liveStatus.senderConfigured &&
    liveStatus.enquiryMode !== 'disabled',
  )
  const mapProviderConfigured = studioEnvironment.SANITY_STUDIO_MAP_PROVIDER_CONFIGURED === 'true'

  const legalLabels = (settings?.footer?.legalLinks ?? []).flatMap((link) =>
    link?.label ? [link.label.toLowerCase()] : [],
  )
  const legalComplete =
    legalLabels.some((label) => label.includes('privacy')) &&
    legalLabels.some((label) => label.includes('terms'))

  const premiumGuide = resolvePremiumGuideStatus(data)
  const emailPreviewUrl = resolveOwnerPageUrl('/internal/email-preview')

  const launchItems: Array<{label: string; status: DashboardStatus}> = [
    {
      label: 'Website',
      status: requiredWebsiteSettingsComplete(settings) ? 'complete' : 'needsAttention',
    },
    {
      label: 'Photography',
      status: photographyDocuments.length
        ? incompletePhotography.length
          ? 'needsAttention'
          : 'complete'
        : 'unknown',
    },
    {label: 'Premium Guide', status: premiumGuide.overallStatus},
    {
      label: 'Maps',
      status:
        mapProviderConfigured && settings?.propertyLocation?.coordinates
          ? 'complete'
          : 'needsAttention',
    },
    {
      label: 'SEO',
      status: seoReadiness.length
        ? seoReadiness.every(({readiness}) => readiness.seoStatus === 'complete')
          ? 'complete'
          : 'needsAttention'
        : 'unknown',
    },
    {label: 'Email', status: emailReady ? 'complete' : 'blocked'},
    {
      label: 'Social',
      status:
        socialStatus(settings, 'instagram') && socialStatus(settings, 'facebook')
          ? 'complete'
          : 'needsAttention',
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
                  : item.status === 'unknown'
                    ? 'There is not enough content information to assess this yet.'
                    : 'Open the sections below to see what needs attention.'}
            </Text>
          </SummaryCard>
        ))}
      </div>

      <DashboardSection
        title="Website Center"
        description="Public website settings and safe live production status in one place."
      >
        <div style={styles.sectionGrid}>
          <SummaryCard
            status={requiredWebsiteSettingsComplete(settings) ? 'complete' : 'needsAttention'}
            title="Public website"
          >
            <Value label="Site title" value={settings?.siteTitle} />
            <Value label="Description" value={settings?.siteDescription} />
            <Value label="Canonical URL" value={settings?.siteUrl} />
            <Value label="Public email" value={settings?.contactDetails?.email} />
            <Value label="Phone" value={settings?.contactDetails?.phone} />
            <Value label="WhatsApp" value={settings?.contactDetails?.whatsappUrl} />
            <Value label="Public location" value={formatAddress(settings)} />
            <Value
              label="Booking"
              value={
                settings?.bookingLinks?.enabled
                  ? settings.bookingLinks.primary?.label || 'Enabled'
                  : 'Not enabled'
              }
            />
            <Value label="Navigation items" value={settings?.primaryNavigation?.length || 0} />
            <IntentButton
              intent="edit"
              params={{id: 'siteSettings', type: 'siteSettings'}}
              text="Edit Site Settings"
            />
          </SummaryCard>
          <SummaryCard
            status={liveStatus?.siteDomainConfigured ? 'complete' : 'needsAttention'}
            title="Production status"
          >
            <Value label="Domain" value={settings?.siteUrl} />
            <Value
              label="Domain configuration"
              value={configuredLabel(liveStatus?.siteDomainConfigured)}
            />
            <Value label="Coming Soon" value={enabledLabel(liveStatus?.comingSoon)} />
            <Value label="Plausible analytics" value={enabledLabel(liveStatus?.analyticsEnabled)} />
            <Value label="Sentry monitoring" value={enabledLabel(liveStatus?.sentryEnabled)} />
            <Value
              label="Checked"
              value={liveStatus ? new Date(liveStatus.checkedAt).toLocaleString() : 'Unavailable'}
            />
            {liveStatusError ? (
              <Text muted size={1}>
                {liveStatusError}
              </Text>
            ) : null}
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
            <Value
              label="Primary logo"
              value={hasImage(settings?.primaryLogo) ? 'Added' : undefined}
            />
            <Value
              label="Compact mark"
              value={hasImage(settings?.compactLogo) ? 'Added' : undefined}
            />
            <Value
              label="Social profile image"
              value={hasImage(settings?.squareProfileImage) ? 'Added' : undefined}
            />
            <Value
              label="Default sharing image"
              value={hasImage(settings?.defaultSocialImage) ? 'Added' : undefined}
            />
            <Value
              label="Favicon reference"
              value={hasImage(settings?.faviconImage) ? 'Added' : undefined}
            />
            <Value
              label="App icon reference"
              value={hasImage(settings?.appIconImage) ? 'Added' : undefined}
            />
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
                <Text muted size={1}>
                  {name}
                </Text>
                <div style={{alignItems: 'center', display: 'flex', gap: '0.5rem'}}>
                  <span
                    aria-hidden="true"
                    style={{
                      background: colour,
                      border: '1px solid currentColor',
                      borderRadius: '50%',
                      height: 20,
                      width: 20,
                    }}
                  />
                  <Text size={1} weight="medium">
                    {colour}
                  </Text>
                </div>
              </div>
            ))}
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Social"
        description="Only confirmed HTTPS profiles in Site Settings are shown publicly."
      >
        <div style={styles.sectionGrid}>
          {[
            {platform: 'instagram', required: true},
            {platform: 'facebook', required: true},
            {platform: 'youtube', required: false},
            {platform: 'tiktok', required: false},
            {platform: 'pinterest', required: false},
          ].map(({platform, required}) => {
            const connected = socialStatus(settings, platform)
            return (
              <SummaryCard
                key={platform}
                status={connected ? 'complete' : required ? 'needsAttention' : 'unknown'}
                statusLabel={connected ? 'Connected' : required ? 'Required' : 'Optional'}
                title={platform[0].toUpperCase() + platform.slice(1)}
              >
                <Text muted size={1}>
                  {connected
                    ? 'Connected with an approved public URL.'
                    : required
                      ? 'A confirmed public profile has not been connected yet.'
                      : 'No optional profile is connected.'}
                </Text>
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
              <Text size={1} weight="medium">
                Current source: {premiumGuide.source}
              </Text>
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
                  The Premium Guide is currently produced from the approved Edition 1 manuscript and
                  build system. It has not yet been migrated into Sanity as the authoritative
                  content source.
                </Text>
              </Card>
            ) : null}
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Content Center"
        description="Editorial workflow, photography, maps and SEO readiness from the existing Phase 2 content checks."
      >
        <DashboardSubsection
          title="Workflow"
          description="Draft, approval, publication and factual-review status come directly from Sanity. Publishing remains a separate action."
        >
          <div style={styles.sectionGrid}>
            <SummaryCard
              status={draftsAwaitingReview.length ? 'needsAttention' : 'complete'}
              title="Drafts awaiting review"
            >
              <Value label="All draft documents" value={draftDocuments.length} />
              <Value label="Marked In Review" value={draftsAwaitingReview.length} />
              <IssueList documents={draftsAwaitingReview} />
            </SummaryCard>
            <SummaryCard
              status={
                remainingReviewCount === 0 && currentDocuments.length ? 'complete' : 'unknown'
              }
              statusLabel={
                remainingReviewCount === 0 && currentDocuments.length
                  ? 'All approved'
                  : 'In progress'
              }
              title="Approved content"
            >
              <Value label="Approved documents" value={approvedDocuments.length} />
              <Value label="Remaining review" value={remainingReviewCount} />
              <Text muted size={1}>
                Approval is an editorial workflow state and does not publish a document.
              </Text>
            </SummaryCard>
            <SummaryCard
              status={
                unpublishedCurrentCount === 0 && currentDocuments.length ? 'complete' : 'unknown'
              }
              statusLabel={
                unpublishedCurrentCount === 0 && currentDocuments.length
                  ? draftDocuments.length
                    ? 'Published with drafts'
                    : 'All published'
                  : 'Mixed state'
              }
              title="Published content"
            >
              <Value label="Published documents" value={publishedCurrentCount} />
              <Value label="Not yet published" value={unpublishedCurrentCount} />
              <Value label="Draft documents" value={draftDocuments.length} />
              <Text muted size={1}>
                Draft changes are assessed separately from their published versions.
              </Text>
            </SummaryCard>
            <SummaryCard
              status={missingReviews.length || staleReviews.length ? 'needsAttention' : 'complete'}
              title="Factual review dates"
            >
              <Value label="Current" value={currentReviews.length} />
              <Value label="Missing" value={missingReviews.length} />
              <Value label="Stale" value={staleReviews.length} />
              <DetailedIssueList
                issues={[
                  ...missingReviews.map(({document}) => ({
                    detail: 'Review date is missing',
                    document,
                  })),
                  ...staleReviews.map(({document}) => ({
                    detail: 'Review date is older than this content type allows',
                    document,
                  })),
                ]}
              />
            </SummaryCard>
          </div>
        </DashboardSubsection>

        <DashboardSubsection
          title="Launch content summary"
          description="A content type is complete only when its current documents are approved, published, reviewed, visually ready and covered by effective SEO."
        >
          <div style={styles.sectionGrid}>
            {contentGroups.map(({documents, label, status}) => (
              <SummaryCard key={label} status={status} title={label}>
                <Value label="Documents" value={documents.length} />
                <Value
                  label="Published"
                  value={
                    documents.filter((document) => publishedIds.has(baseDocumentId(document._id)))
                      .length
                  }
                />
                <Value
                  label="Approved"
                  value={
                    documents.filter((document) => document.workflowStatus === 'approved').length
                  }
                />
              </SummaryCard>
            ))}
          </div>
        </DashboardSubsection>

        <DashboardSubsection
          title="Photography"
          description="Required visual roles are assessed by content type. Optional editorial photo stories do not reduce readiness."
        >
          <div style={styles.sectionGrid}>
            {[
              ['Destinations', destinations],
              ['Dive Sites', diveSites],
              ['Scenic Routes', scenicRoutes],
              ['Rooms', rooms],
              ['The House', houseDocuments],
            ].map(([label, documents]) => {
              const values = documents as DashboardDocument[]
              const incomplete = values.flatMap((document) => {
                const readiness = getContentReadiness(document, settings ?? null)
                return readiness.photographyStatus === 'needsAttention'
                  ? [{detail: readiness.photographyIssues.join(', '), document}]
                  : []
              })
              return (
                <SummaryCard
                  key={label as string}
                  status={incomplete.length ? 'needsAttention' : 'complete'}
                  title={label as string}
                >
                  <Value label="Complete" value={values.length - incomplete.length} />
                  <Value label="Incomplete" value={incomplete.length} />
                  <DetailedIssueList issues={incomplete} />
                </SummaryCard>
              )
            })}
            <SummaryCard
              status={missingHeroes.length ? 'needsAttention' : 'complete'}
              title="Missing hero images"
            >
              <IssueList documents={missingHeroes} />
            </SummaryCard>
            <SummaryCard status="complete" title="Optional photo stories">
              <Text muted size={1}>
                Photo stories add editorial depth when available. Empty or partial optional stories
                do not make a page incomplete.
              </Text>
            </SummaryCard>
          </div>
        </DashboardSubsection>

        <DashboardSubsection
          title="Maps"
          description="Only the presence of approved public map data is shown. Coordinates themselves remain hidden here."
        >
          <div style={styles.sectionGrid}>
            <SummaryCard
              status={mapProviderConfigured ? 'complete' : 'needsAttention'}
              title="Explorer"
            >
              <Value
                label="Interactive provider"
                value={mapProviderConfigured ? 'Configured' : undefined}
              />
              <Value
                label="Public Joshua’s Point coordinate"
                value={
                  settings?.propertyLocation?.coordinates ? 'Approved location present' : undefined
                }
              />
            </SummaryCard>
            <SummaryCard
              status={
                destinationMaps.length === destinations.length ? 'complete' : 'needsAttention'
              }
              title="Destination maps"
            >
              <Value label="Mapped" value={`${destinationMaps.length} of ${destinations.length}`} />
              <IssueList
                documents={destinations.filter((document) => !destinationMaps.includes(document))}
              />
            </SummaryCard>
            <SummaryCard
              status={routeMaps.length === scenicRoutes.length ? 'complete' : 'needsAttention'}
              title="Scenic Routes"
            >
              <Value
                label="Routes with geometry"
                value={`${routeMaps.length} of ${scenicRoutes.length}`}
              />
              <IssueList
                documents={scenicRoutes.filter((document) => !routeMaps.includes(document))}
              />
            </SummaryCard>
            <SummaryCard
              status={diveMaps.length === diveSites.length ? 'complete' : 'needsAttention'}
              title="Dive Areas"
            >
              <Value label="Mapped" value={`${diveMaps.length} of ${diveSites.length}`} />
              <IssueList documents={diveSites.filter((document) => !diveMaps.includes(document))} />
            </SummaryCard>
            <SummaryCard
              status={mountainLakeRoute ? 'complete' : 'blocked'}
              title="Mountain & Lake route"
            >
              <Text muted size={1}>
                {mountainLakeRoute
                  ? 'An approved route document is available.'
                  : 'No approved route document is available yet.'}
              </Text>
            </SummaryCard>
          </div>
        </DashboardSubsection>

        <DashboardSubsection
          title="SEO"
          description="Effective metadata follows the same page, content and Site Settings fallbacks used by the website."
        >
          <div style={styles.sectionGrid}>
            <SummaryCard
              status={
                settings?.defaultSeo?.metaTitle && settings.defaultSeo.metaDescription
                  ? 'complete'
                  : 'needsAttention'
              }
              title="Site defaults"
            >
              <Value label="Default title" value={settings?.defaultSeo?.metaTitle} />
              <Value label="Default description" value={settings?.defaultSeo?.metaDescription} />
              <Value
                label="Default social image"
                value={hasImage(settings?.defaultSocialImage) ? 'Added' : undefined}
              />
            </SummaryCard>
            <SummaryCard
              status={missingEffectiveTitles.length ? 'needsAttention' : 'complete'}
              title="Effective titles"
            >
              <Value
                label="Ready"
                value={publicSeoDocuments.length - missingEffectiveTitles.length}
              />
              <DetailedIssueList
                issues={missingEffectiveTitles.map(({document}) => ({
                  detail: 'No page title or usable content title',
                  document,
                }))}
              />
            </SummaryCard>
            <SummaryCard
              status={missingEffectiveDescriptions.length ? 'needsAttention' : 'complete'}
              title="Effective descriptions"
            >
              <Value
                label="Ready"
                value={publicSeoDocuments.length - missingEffectiveDescriptions.length}
              />
              <DetailedIssueList
                issues={missingEffectiveDescriptions.map(({document}) => ({
                  detail: 'No page, content or site-default description',
                  document,
                }))}
              />
            </SummaryCard>
            <SummaryCard
              status={missingSocialImageFallback.length ? 'needsAttention' : 'complete'}
              title="Social sharing images"
            >
              <Value label="Using Site Settings fallback" value={usingDefaultSocialImage.length} />
              <Value label="Missing every fallback" value={missingSocialImageFallback.length} />
              <DetailedIssueList
                issues={missingSocialImageFallback.map(({document}) => ({
                  detail: 'No page, hero or default social image',
                  document,
                }))}
              />
            </SummaryCard>
            <SummaryCard
              status={canonicalIssues.length ? 'needsAttention' : 'complete'}
              title="Sitemap and canonical readiness"
            >
              <Value label="Canonical site URL" value={settings?.siteUrl} />
              <Value label="Pages missing URL slugs" value={documentsWithoutSlugs.length} />
              <Value label="Canonical issues" value={canonicalIssues.length} />
              <DetailedIssueList
                issues={canonicalIssues.map(({document}) => ({
                  detail: 'No valid canonical route can be resolved',
                  document,
                }))}
              />
            </SummaryCard>
            <SummaryCard
              status={noIndexDocuments.length ? 'needsAttention' : 'complete'}
              title="Hidden from search"
            >
              <IssueList documents={noIndexDocuments} />
            </SummaryCard>
          </div>
        </DashboardSubsection>
      </DashboardSection>

      <DashboardSection
        title="Email Center"
        description="Review the real email presentation and see delivery readiness without sending from Studio."
      >
        <div style={styles.sectionGrid}>
          <SummaryCard status={emailReady ? 'complete' : 'blocked'} title="Enquiry email delivery">
            <Value
              label="Resend configured"
              value={liveStatus ? (liveStatus.resendConfigured ? 'Yes' : 'No') : 'Unavailable'}
            />
            <Value
              label="Sending domain"
              value={configuredLabel(liveStatus?.sendingDomainConfigured)}
            />
            <Value label="Public sender" value={configuredLabel(liveStatus?.senderConfigured)} />
            <Value label="Enquiry mode" value={liveStatus?.enquiryMode ?? 'Unavailable'} />
            <Value
              label="Subscription mode"
              value={liveStatus?.subscriptionMode ?? 'Unavailable'}
            />
            <Value label="Test-email readiness" value={emailReady ? 'Ready' : 'Not ready'} />
            {liveStatus?.enquiryMode === 'disabled' ? (
              <Card padding={3} radius={2} tone="caution">
                <Text size={1}>Enquiry delivery is disabled. Studio cannot send email.</Text>
              </Card>
            ) : null}
            {liveStatusError ? (
              <Text muted size={1}>
                {liveStatusError}
              </Text>
            ) : null}
            <Text muted size={1}>
              API keys, SMTP passwords and provider tokens are never available in Studio.
            </Text>
          </SummaryCard>
          <SummaryCard status={emailPreviewUrl ? 'complete' : 'blocked'} title="Email previews">
            <Text muted size={1}>
              Preview the real branded HTML shell with safe sample information. Opening a preview
              never sends an email.
            </Text>
            {emailPreviewUrl ? (
              <div style={styles.actions}>
                <ExternalButton
                  href={`${emailPreviewUrl}#guest-confirmation`}
                  text="Transactional previews"
                />
                <ExternalButton
                  href={`${emailPreviewUrl}#subscription-confirmation`}
                  text="Subscription previews"
                />
              </div>
            ) : (
              <Text muted size={1}>
                The approved owner preview URL is unavailable.
              </Text>
            )}
            <Text muted size={1}>
              The website’s internal-review access cookie is required.
            </Text>
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Newsletter Center"
        description="Resend remains the source of truth for contacts, preferences, broadcasts and delivery."
      >
        <div style={styles.sectionGrid}>
          <SummaryCard
            status={liveStatus?.newsletterReadiness === 'ready' ? 'complete' : 'needsAttention'}
            title="Newsletter readiness"
          >
            <Value label="Configuration" value={liveStatus?.newsletterReadiness ?? 'Unavailable'} />
            <Value
              label="Subscription mode"
              value={liveStatus?.subscriptionMode ?? 'Unavailable'}
            />
            {liveStatus?.subscriptionMode === 'disabled' ? (
              <Card padding={3} radius={2} tone="caution">
                <Text size={1}>
                  Public subscription delivery is disabled. Manage preparation in Resend without
                  sending from Studio.
                </Text>
              </Card>
            ) : null}
            <Text muted size={1}>
              Subscriber addresses and unsubscribe preferences are never stored in Sanity.
            </Text>
          </SummaryCard>
          <SummaryCard status="complete" statusLabel="Managed in Resend" title="Newsletter work">
            <Text muted size={1}>
              Review contacts and preferences, prepare a broadcast, preview it and run any approved
              test inside Resend. Campaigns are not created or duplicated in Sanity.
            </Text>
            <div style={styles.actions}>
              <ExternalButton href={resendManagementLinks.audience} text="Contacts and audience" />
              <ExternalButton href={resendManagementLinks.broadcasts} text="Broadcasts" />
              <ExternalButton href={resendManagementLinks.emails} text="Delivery activity" />
            </div>
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
  const [liveStatus, setLiveStatus] = useState<DashboardLiveStatus | null>(null)
  const [liveStatusError, setLiveStatusError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    setLiveStatusError(null)
    try {
      const result = await client.fetch<OwnerDashboardData>(
        ownerDashboardQuery,
        {},
        {perspective: 'raw'},
      )
      setData(result)

      const token = client.config().token
      if (!token) {
        setLiveStatus(null)
        setLiveStatusError(
          'Live deployment status is unavailable because Studio authentication could not be verified.',
        )
        return
      }

      const statusUrl = resolveOwnerStatusUrl()
      if (!statusUrl) {
        setLiveStatus(null)
        setLiveStatusError(
          'Live deployment status is unavailable because its endpoint is not approved.',
        )
        return
      }

      try {
        const statusResponse = await fetch(statusUrl, {
          cache: 'no-store',
          headers: {Authorization: `Bearer ${token}`},
        })
        const payload = (await statusResponse.json()) as {
          ok?: boolean
          status?: DashboardLiveStatus
        }

        if (!statusResponse.ok || !payload.ok || !isDashboardLiveStatus(payload.status)) {
          throw new Error('The live status service rejected the request.')
        }

        setLiveStatus(payload.status)
      } catch {
        setLiveStatus(null)
        setLiveStatusError(
          'Live deployment status could not be verified. No services are assumed ready.',
        )
      }
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
      return (
        <div aria-label="Loading owner dashboard" style={{padding: '5rem', textAlign: 'center'}}>
          <Spinner muted />
        </div>
      )
    }
    if (error) {
      return (
        <Card padding={4} radius={3} tone="critical">
          <Text>{error}</Text>
        </Card>
      )
    }
    return data ? (
      <OwnerDashboardContent
        data={data}
        liveStatus={liveStatus}
        liveStatusError={liveStatusError}
      />
    ) : null
  }, [data, error, liveStatus, liveStatusError, loading])

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
