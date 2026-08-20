import {Button, Card, Heading, Spinner, Text} from '@sanity/ui'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {IntentButton, useClient} from 'sanity'

import {
  MAXIMUM_WHOLE_HOUSE_GUESTS,
  wholeHouseOccupancyDescription,
} from '../../schemaTypes/operations/occupancy'

import {ownerDashboardQuery} from './query'
import {resolvePremiumGuideStatus} from './premiumGuideStatus'
import {
  baseDocumentId,
  getContentReadiness,
  isDraftDocument,
  launchContentStatus,
  ownerPhotographyNeeds,
  preferredDocuments,
  publishedDocumentIds,
} from './contentReadiness'
import type {
  DashboardAvailabilityPeriod,
  DashboardDocument,
  DashboardLiveStatus,
  DashboardSiteSettings,
  DashboardStatus,
  OwnerDashboardData,
} from './types'

const apiVersion = '2026-08-12'
const contentTypes = ['destination', 'diveSite', 'scenicRoute']
const photographyContentTypes = ['destination', 'diveSite', 'scenicRoute', 'room', 'housePage']
const intentionallyNoIndexInformationPageIds = new Set([
  'accessibilityStatement',
  'cancellationAndRebookingPolicy',
  'cookiePolicy',
  'emergencyInformation',
  'guestInformation',
  'houseGuide',
  'privacyPolicy',
  'termsAndConditions',
])
const ownerDecisionInformationPages = [
  {id: 'guestInformation', label: 'Guest Information'},
  {id: 'cookiePolicy', label: 'Cookie Policy'},
  {id: 'accessibilityStatement', label: 'Accessibility Statement'},
  {id: 'emergencyInformation', label: 'Emergency Information'},
] as const
const ownerDecisionInformationPageIds = new Set<string>(
  ownerDecisionInformationPages.map(({id}) => id),
)

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
  quickAction: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '4.5rem',
    textAlign: 'center' as const,
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
  contacts: 'https://resend.com/audience',
  broadcasts: 'https://resend.com/broadcasts',
  emails: 'https://resend.com/emails',
  topics: 'https://resend.com/audience/topics',
} as const

const operationsStudioUrl = 'https://joshuas-point-operations.sanity.studio/owner-operations'

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

type LaunchControlStatus = Extract<DashboardStatus, 'complete' | 'needsAttention' | 'unknown'>

const launchControlLabels: Record<LaunchControlStatus, string> = {
  complete: 'Ready',
  needsAttention: 'Needs attention',
  unknown: 'Unknown',
}

const availabilityStatusLabels: Record<
  NonNullable<DashboardAvailabilityPeriod['status']>,
  string
> = {
  closed: 'Closed',
  maintenance: 'Maintenance',
  ownerStay: 'Owner stay',
  reserved: 'Reserved',
}

function localDateValue(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDashboardDate(value: string | null | undefined) {
  if (!value) return 'Not added'
  const parsed = new Date(`${value}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return 'Invalid date'
  return parsed.toLocaleDateString(undefined, {day: 'numeric', month: 'short', year: 'numeric'})
}

function formatDashboardDateTime(value: string | null | undefined) {
  if (!value) return 'Not added'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return 'Invalid date'
  return parsed.toLocaleString(undefined, {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function completeAvailabilityPeriods(periods: DashboardAvailabilityPeriod[] | null | undefined) {
  return (periods ?? [])
    .filter(
      (
        period,
      ): period is DashboardAvailabilityPeriod & {
        endDate: string
        startDate: string
        status: NonNullable<DashboardAvailabilityPeriod['status']>
      } => Boolean(period.startDate && period.endDate && period.status),
    )
    .sort((left, right) => left.startDate.localeCompare(right.startDate))
}

function formatAvailabilityPeriod(period: DashboardAvailabilityPeriod) {
  const status = period.status ? availabilityStatusLabels[period.status] : 'Status missing'
  return `${formatDashboardDate(period.startDate)} – ${formatDashboardDate(period.endDate)} · ${status}`
}

function hasImage(image: {asset?: {_ref?: string} | null} | null | undefined) {
  return Boolean(image?.asset?._ref)
}

function documentLabel(document: DashboardDocument) {
  return document.title?.trim() || document.name?.trim() || 'Untitled page'
}

function hasCompleteInformationContent(document: DashboardDocument | null | undefined) {
  return Boolean(document?.title && document.summaryDescription && document.contentBlockCount)
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
  const sectionId = `dashboard-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <section aria-labelledby={`${sectionId}-title`} id={sectionId} style={styles.section}>
      <div style={{display: 'grid', gap: '0.4rem', marginBottom: '1rem'}}>
        <Heading id={`${sectionId}-title`} size={2}>
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
  const sectionId = `dashboard-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <section aria-labelledby={`${sectionId}-title`} id={sectionId} style={styles.subsection}>
      <div style={{display: 'grid', gap: '0.35rem', marginBottom: '1rem'}}>
        <Heading as="h3" id={`${sectionId}-title`} size={1}>
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

function QuickLink({
  external = false,
  href,
  text,
}: {
  external?: boolean
  href: string
  text: string
}) {
  return (
    <Button
      as="a"
      href={href}
      mode="default"
      rel={external ? 'noreferrer' : undefined}
      style={styles.quickAction}
      target={external ? '_blank' : undefined}
      text={text}
      tone="primary"
    />
  )
}

function QuickDocument({id, text, type}: {id: string; text: string; type: string}) {
  return (
    <IntentButton
      intent="edit"
      params={{id, type}}
      style={styles.quickAction}
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
    'enquiryReplyToConfigured',
    'segmentConfigured',
    'sendingDomainConfigured',
    'sentryEnabled',
    'siteDomainConfigured',
    'sitemapEnabled',
    'sslReady',
    'subscriptionReplyToConfigured',
    'topicConfigured',
  ]

  return (
    booleanFields.every((field) => typeof status[field] === 'boolean') &&
    (status.productionDomain === null || typeof status.productionDomain === 'string') &&
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
  const availabilityDraft = data.houseAvailability?.draft
  const availabilityPublished = data.houseAvailability?.published
  const availability = availabilityDraft ?? availabilityPublished
  const today = localDateValue()
  const validAvailabilityPeriods = completeAvailabilityPeriods(availability?.periods)
  const currentUnavailablePeriod = validAvailabilityPeriods.find(
    (period) => period.startDate <= today && period.endDate > today,
  )
  const upcomingUnavailablePeriods = validAvailabilityPeriods.filter(
    (period) => period.endDate > today,
  )
  const confirmationHorizonExpired = Boolean(
    availability?.availabilityConfirmedThrough && availability.availabilityConfirmedThrough < today,
  )
  const availabilityState = currentUnavailablePeriod
    ? 'Unavailable'
    : availability?.availabilityConfirmedThrough && !confirmationHorizonExpired
      ? 'Available'
      : 'Unknown'
  const availabilityWarnings = [
    ...(!availability ? ['House Availability has not been created yet.'] : []),
    ...(availability && availability.publicDisplayEnabled !== true
      ? ['Public availability display is disabled.']
      : []),
    ...(availability && !availability.availabilityConfirmedThrough
      ? ['The confirmation horizon is missing.']
      : []),
    ...(availability && !availability.lastReviewedAt ? ['The last reviewed date is missing.'] : []),
    ...(confirmationHorizonExpired ? ['The confirmation horizon has expired.'] : []),
    ...((availability?.periods ?? []).length !== validAvailabilityPeriods.length
      ? ['One or more unavailable periods has incomplete data.']
      : []),
    ...(availabilityDraft ? ['Unpublished availability changes exist.'] : []),
  ]
  const currentDocuments = preferredDocuments(data.documents)
  const editorialDocuments = currentDocuments.filter((document) =>
    contentTypes.includes(document._type),
  )
  const destinations = editorialDocuments.filter((document) => document._type === 'destination')
  const diveSites = editorialDocuments.filter((document) => document._type === 'diveSite')
  const scenicRoutes = editorialDocuments.filter((document) => document._type === 'scenicRoute')
  const rooms = currentDocuments.filter((document) => document._type === 'room')
  const houseDocuments = currentDocuments.filter((document) => document._type === 'housePage')

  const publishedIds = publishedDocumentIds(data.documents)
  const publicSeoDocuments = currentDocuments.filter(
    (document) =>
      document._type !== 'room' &&
      !(
        document._type === 'informationPage' &&
        ownerDecisionInformationPageIds.has(baseDocumentId(document._id)) &&
        !publishedIds.has(baseDocumentId(document._id))
      ),
  )
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
  const intentionalNoIndexDocuments = noIndexDocuments.filter(
    (document) =>
      document._type === 'informationPage' &&
      intentionallyNoIndexInformationPageIds.has(baseDocumentId(document._id)),
  )
  const unexpectedNoIndexDocuments = noIndexDocuments.filter(
    (document) => !intentionalNoIndexDocuments.includes(document),
  )
  const documentsWithoutSlugs = editorialDocuments.filter((document) => !document.slug?.trim())

  const draftDocuments = data.documents.filter(isDraftDocument)
  const draftsAwaitingReview = draftDocuments.filter(
    (document) => document.workflowStatus === 'inReview',
  )
  const approvedDocuments = currentDocuments.filter(
    (document) => document.workflowStatus === 'approved',
  )
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

  const premiumGuide = resolvePremiumGuideStatus(data)
  const emailPreviewUrl = resolveOwnerPageUrl('/internal/email-preview')
  const reviewUrl = resolveOwnerPageUrl('/coming-soon?access=1')
  const informationPageStateFor = (id: string) => {
    const published = data.documents.find(
      (document) => document._type === 'informationPage' && document._id === id,
    )
    const draft = data.documents.find(
      (document) => document._type === 'informationPage' && document._id === `drafts.${id}`,
    )

    return {current: draft ?? published, draft, published}
  }
  const guestInformationPages = [
    {
      id: 'planningYourStay',
      label: 'Planning Your Stay',
      ownerDecision: false,
      route: '/plan-your-stay',
    },
    {id: 'guestInformation', label: 'Guest Information', ownerDecision: true, route: null},
    {id: 'houseGuide', label: 'House Guide', ownerDecision: false, route: '/house-guide'},
    {
      id: 'emergencyInformation',
      label: 'Emergency Information',
      ownerDecision: true,
      route: null,
    },
  ] as const
  const legalPages = [
    {id: 'privacyPolicy', label: 'Privacy Policy', ownerDecision: false, route: '/privacy'},
    {id: 'termsAndConditions', label: 'Terms & Conditions', ownerDecision: false, route: '/terms'},
    {
      id: 'cancellationAndRebookingPolicy',
      label: 'Cancellation & Rebooking Policy',
      ownerDecision: false,
      route: '/cancellation-policy',
    },
    {id: 'cookiePolicy', label: 'Cookie Policy', ownerDecision: true, route: null},
    {
      id: 'accessibilityStatement',
      label: 'Accessibility Statement',
      ownerDecision: true,
      route: null,
    },
  ] as const

  const photographyNeededLabels = ownerPhotographyNeeds.map(({label}) => label)

  const websiteLaunchStatus: LaunchControlStatus = !liveStatus
    ? 'unknown'
    : requiredWebsiteSettingsComplete(settings) &&
        liveStatus.siteDomainConfigured &&
        liveStatus.sslReady &&
        liveStatus.comingSoon
      ? 'complete'
      : 'needsAttention'
  const emailLaunchStatus: LaunchControlStatus = !liveStatus
    ? 'unknown'
    : emailReady
      ? 'complete'
      : 'needsAttention'
  const newsletterLaunchStatus: LaunchControlStatus = !liveStatus
    ? 'unknown'
    : liveStatus.newsletterReadiness === 'ready' && liveStatus.subscriptionMode === 'live'
      ? 'complete'
      : 'needsAttention'
  const analyticsLaunchStatus: LaunchControlStatus = !liveStatus
    ? 'unknown'
    : liveStatus.analyticsEnabled
      ? 'complete'
      : 'unknown'
  const contentLaunchStatus: LaunchControlStatus = contentGroups.some(
    ({status}) => status === 'needsAttention' || status === 'blocked',
  )
    ? 'needsAttention'
    : contentGroups.every(({status}) => status === 'complete')
      ? 'complete'
      : 'unknown'
  const photographyLaunchStatus: LaunchControlStatus = photographyNeededLabels.length
    ? 'needsAttention'
    : 'complete'

  const launchControlItems: Array<{
    category: string
    detail: string
    label: string
    status: LaunchControlStatus
  }> = [
    {
      detail:
        websiteLaunchStatus === 'complete'
          ? 'The production-review domain is healthy and protected by Coming Soon. The full website remains private.'
          : websiteLaunchStatus === 'unknown'
            ? 'Live domain and Coming Soon status could not be verified.'
            : 'Review the domain, SSL, required Site Settings or Coming Soon protection below.',
      category: 'Technical readiness',
      label: 'Website status',
      status: websiteLaunchStatus,
    },
    {
      detail:
        emailLaunchStatus === 'complete'
          ? 'Transactional delivery configuration and enquiry sending mode are ready.'
          : emailLaunchStatus === 'unknown'
            ? 'Live transactional email status could not be verified.'
            : 'Transactional email delivery is incomplete or remains disabled.',
      category: 'Technical readiness',
      label: 'Email readiness',
      status: emailLaunchStatus,
    },
    {
      detail:
        newsletterLaunchStatus === 'complete'
          ? 'Subscriber configuration is ready and subscription delivery is live.'
          : newsletterLaunchStatus === 'unknown'
            ? 'Live newsletter configuration could not be verified.'
            : 'Subscriber configuration needs attention or subscription delivery remains disabled.',
      category: 'Technical readiness',
      label: 'Newsletter readiness',
      status: newsletterLaunchStatus,
    },
    {
      detail:
        analyticsLaunchStatus === 'complete'
          ? 'Privacy-conscious production analytics is enabled.'
          : liveStatus
            ? 'Analytics is an optional improvement and does not block protected production review.'
            : 'Live analytics status could not be verified.',
      category: 'Optional improvement',
      label: 'Analytics readiness',
      status: analyticsLaunchStatus,
    },
    {
      detail:
        contentLaunchStatus === 'complete'
          ? 'Published launch content passes publication, editorial review and SEO checks. Photography is assessed separately.'
          : contentLaunchStatus === 'unknown'
            ? 'There is not enough current content information to assess launch readiness.'
            : 'One or more launch content groups has a genuine publication, review or SEO issue.',
      category: contentLaunchStatus === 'complete' ? 'Content readiness' : 'Content incomplete',
      label: 'Content readiness',
      status: contentLaunchStatus,
    },
    {
      category: 'Owner decision resolved',
      detail: wholeHouseOccupancyDescription,
      label: 'Whole-house occupancy',
      status: 'complete',
    },
    {
      category: photographyNeededLabels.length ? 'Photography needed' : 'Photography readiness',
      detail: photographyNeededLabels.length
        ? `${photographyNeededLabels.length} text-led pages still need owner-approved, place-specific photography. Their content is not treated as broken.`
        : 'No current production photography requirement is recorded.',
      label: 'Photography readiness',
      status: photographyLaunchStatus,
    },
  ]

  const technicalIssues = [
    ...(!requiredWebsiteSettingsComplete(settings)
      ? ['Required Site Settings are incomplete.']
      : []),
    ...(liveStatus && !liveStatus.siteDomainConfigured
      ? ['The production site domain is not configured.']
      : []),
    ...(liveStatus && !liveStatus.sslReady ? ['Production SSL is not ready.'] : []),
    ...(liveStatus && !liveStatus.comingSoon
      ? ['Coming Soon protection is disabled. Restore it before continuing private review.']
      : []),
    ...(emailLaunchStatus === 'needsAttention'
      ? ['Transactional enquiry email is not launch-ready.']
      : []),
    ...(newsletterLaunchStatus === 'needsAttention'
      ? ['Newsletter signup is not launch-ready.']
      : []),
  ]
  const ownerDecisions = ownerDecisionInformationPages
    .filter(({id}) => !publishedIds.has(id))
    .map(({label}) => `${label} — owner review and publication decision.`)
  const contentIssues = contentGroups
    .filter(({status}) => status === 'needsAttention' || status === 'blocked')
    .map(({label}) => `${label} has a publication, review or SEO issue.`)
  const photographyNeeds = photographyNeededLabels.map((label) => `${label} — photography needed.`)
  const optionalImprovements = [
    ...(!liveStatus?.analyticsEnabled
      ? ['Production analytics can be enabled after owner review.']
      : []),
  ]

  return (
    <>
      <DashboardSection
        title="Owner Quick Actions"
        description="Start every regular owner task here. Review and preview links open safely without publishing the website."
      >
        <div style={styles.sectionGrid}>
          {reviewUrl ? (
            <QuickLink external href={reviewUrl} text="🌐 Open Website (Review Mode)" />
          ) : (
            <Button disabled style={styles.quickAction} text="🌐 Website Review Unavailable" />
          )}
          {emailPreviewUrl ? (
            <QuickLink external href={emailPreviewUrl} text="📧 Email Preview" />
          ) : (
            <Button disabled style={styles.quickAction} text="📧 Email Preview Unavailable" />
          )}
          <QuickDocument
            id="houseAvailability"
            text="📅 House Availability"
            type="houseAvailability"
          />
          <QuickLink external href={operationsStudioUrl} text="📥 Enquiries & Stays" />
          <QuickLink href="#dashboard-launch-control" text="🚀 Launch Control" />
          <QuickDocument id="siteSettings" text="📝 Site Settings" type="siteSettings" />
          <QuickLink href="#dashboard-photography" text="📷 Photography" />
          <QuickLink href="/structure/travel-guide;destination" text="📍 Destinations" />
          <QuickLink href="#dashboard-maps" text="🗺 Explorer / Maps" />
          <QuickDocument id="guestInformation" text="📄 Guest Information" type="informationPage" />
          <QuickDocument id="privacyPolicy" text="⚖ Legal Pages" type="informationPage" />
        </div>
      </DashboardSection>

      <DashboardSection
        title="Launch Control"
        description="One truthful overview of what is ready for launch and what still needs attention. No services can be enabled from this dashboard."
      >
        <div style={styles.sectionGrid}>
          {launchControlItems.map((item) => (
            <SummaryCard
              key={item.label}
              status={item.status}
              statusLabel={launchControlLabels[item.status]}
              title={item.label}
            >
              <Value label="Type" value={item.category} />
              <Text muted size={1}>
                {item.detail}
              </Text>
            </SummaryCard>
          ))}
          <SummaryCard
            status={technicalIssues.length ? 'needsAttention' : liveStatus ? 'complete' : 'unknown'}
            statusLabel={technicalIssues.length ? 'Technical issue' : 'No technical issue'}
            title="Technical issues"
          >
            {technicalIssues.length ? (
              <ul style={styles.issueList}>
                {technicalIssues.map((issue) => (
                  <li key={issue} style={{listStyle: 'none'}}>
                    <Text size={1}>{issue}</Text>
                  </li>
                ))}
              </ul>
            ) : (
              <Text muted size={1}>
                {liveStatus
                  ? 'No technical blocker is reported by the current checks.'
                  : 'Live technical checks are unavailable.'}
              </Text>
            )}
          </SummaryCard>
          <SummaryCard status="unknown" statusLabel="Owner decision" title="Owner decisions">
            <ul style={styles.issueList}>
              {ownerDecisions.map((decision) => (
                <li key={decision} style={{listStyle: 'none'}}>
                  <Text size={1}>{decision}</Text>
                </li>
              ))}
            </ul>
          </SummaryCard>
          <SummaryCard
            status={contentIssues.length ? 'needsAttention' : 'complete'}
            statusLabel={contentIssues.length ? 'Content incomplete' : 'Content complete'}
            title="Content issues"
          >
            {contentIssues.length ? (
              <ul style={styles.issueList}>
                {contentIssues.map((issue) => (
                  <li key={issue} style={{listStyle: 'none'}}>
                    <Text size={1}>{issue}</Text>
                  </li>
                ))}
              </ul>
            ) : (
              <Text muted size={1}>
                No current content or photography need is recorded.
              </Text>
            )}
          </SummaryCard>
          <SummaryCard
            status={photographyNeeds.length ? 'needsAttention' : 'complete'}
            statusLabel={photographyNeeds.length ? 'Photography needed' : 'Photography ready'}
            title="Photography needs"
          >
            {photographyNeeds.length ? (
              <ul style={styles.issueList}>
                {photographyNeeds.map((need) => (
                  <li key={need} style={{listStyle: 'none'}}>
                    <Text size={1}>{need}</Text>
                  </li>
                ))}
              </ul>
            ) : (
              <Text muted size={1}>
                No current photography need is recorded.
              </Text>
            )}
          </SummaryCard>
          <SummaryCard
            status={optionalImprovements.length ? 'unknown' : 'complete'}
            statusLabel={optionalImprovements.length ? 'Optional improvement' : 'Complete'}
            title="Optional improvements"
          >
            {optionalImprovements.length ? (
              <ul style={styles.issueList}>
                {optionalImprovements.map((improvement) => (
                  <li key={improvement} style={{listStyle: 'none'}}>
                    <Text size={1}>{improvement}</Text>
                  </li>
                ))}
              </ul>
            ) : (
              <Text muted size={1}>
                No optional improvement is currently reported.
              </Text>
            )}
          </SummaryCard>
        </div>
      </DashboardSection>

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
            <Value label="Production domain" value={liveStatus?.productionDomain} />
            <Value label="SSL" value={configuredLabel(liveStatus?.sslReady)} />
            <Value
              label="Domain configuration"
              value={configuredLabel(liveStatus?.siteDomainConfigured)}
            />
            <Value label="Coming Soon" value={enabledLabel(liveStatus?.comingSoon)} />
            <Value
              label="Robots"
              value={liveStatus?.comingSoon ? 'Protected: no indexing' : 'Launch rules active'}
            />
            <Value
              label="Sitemap"
              value={
                liveStatus?.sitemapEnabled ? 'Public routes enabled' : 'Withheld while private'
              }
            />
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
        title="Analytics"
        description="Production analytics status and the underlying privacy-conscious service."
      >
        <div style={styles.sectionGrid}>
          <SummaryCard
            status={liveStatus?.analyticsEnabled ? 'complete' : 'needsAttention'}
            title="Plausible Analytics"
          >
            <Value label="Analytics" value={enabledLabel(liveStatus?.analyticsEnabled)} />
            <Value
              label="Search Console readiness"
              value={
                liveStatus?.sitemapEnabled ? 'Ready for submission' : 'Wait until public launch'
              }
            />
            <Value
              label="Last status check"
              value={formatDashboardDateTime(liveStatus?.checkedAt)}
            />
            <ExternalButton href="https://plausible.io" text="Open Plausible" />
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Monitoring"
        description="Error monitoring and hosting remain in their specialist services, reachable from here."
      >
        <div style={styles.sectionGrid}>
          <SummaryCard
            status={liveStatus?.sentryEnabled ? 'complete' : 'needsAttention'}
            title="Production monitoring"
          >
            <Value label="Sentry" value={enabledLabel(liveStatus?.sentryEnabled)} />
            <Value
              label="Last status check"
              value={formatDashboardDateTime(liveStatus?.checkedAt)}
            />
            <div style={styles.actions}>
              <ExternalButton href="https://sentry.io" text="Open Sentry" />
              <ExternalButton href="https://xcloud.host" text="Open xCloud" />
            </div>
          </SummaryCard>
        </div>
      </DashboardSection>

      <DashboardSection
        title="Guest Information"
        description="Owner-managed practical pages. Pages remain unpublished or return not found until their Studio content is complete and published."
      >
        <div style={styles.sectionGrid}>
          {guestInformationPages.map(({id, label, ownerDecision, route}) => {
            const page = informationPageStateFor(id)
            const publishedAndComplete = hasCompleteInformationContent(page.published)
            return (
              <SummaryCard
                key={id}
                status={
                  publishedAndComplete ? 'complete' : ownerDecision ? 'unknown' : 'needsAttention'
                }
                statusLabel={
                  publishedAndComplete
                    ? 'Published / live'
                    : ownerDecision
                      ? 'Owner decision / Draft'
                      : 'Content incomplete'
                }
                title={label}
              >
                <Value
                  label="Content"
                  value={
                    page.current?.contentBlockCount
                      ? `${page.current.contentBlockCount} blocks`
                      : 'Not added'
                  }
                />
                <Value
                  label="Publication"
                  value={
                    page.published && page.draft
                      ? 'Published with draft changes'
                      : page.published
                        ? 'Published'
                        : page.draft
                          ? 'Draft / unpublished'
                          : 'Draft not created'
                  }
                />
                <Value label="Workflow" value={page.current?.workflowStatus ?? 'Owner decision'} />
                {route && page.published ? <Value label="Live route" value={route} /> : null}
                <QuickDocument id={id} text={`Edit ${label}`} type="informationPage" />
              </SummaryCard>
            )
          })}
        </div>
      </DashboardSection>

      <DashboardSection
        title="Legal"
        description="Legal wording is owned in Studio rather than application code. Obtain professional review where required."
      >
        <div style={styles.sectionGrid}>
          {legalPages.map(({id, label, ownerDecision, route}) => {
            const page = informationPageStateFor(id)
            const publishedAndComplete = hasCompleteInformationContent(page.published)
            return (
              <SummaryCard
                key={id}
                status={
                  publishedAndComplete ? 'complete' : ownerDecision ? 'unknown' : 'needsAttention'
                }
                statusLabel={
                  publishedAndComplete
                    ? 'Published / live'
                    : ownerDecision
                      ? 'Owner decision / Draft'
                      : 'Content incomplete'
                }
                title={label}
              >
                <Value
                  label="Content"
                  value={
                    page.current?.contentBlockCount
                      ? `${page.current.contentBlockCount} blocks`
                      : 'Not added'
                  }
                />
                <Value
                  label="Publication"
                  value={
                    page.published && page.draft
                      ? 'Published with draft changes'
                      : page.published
                        ? 'Published'
                        : page.draft
                          ? 'Draft / unpublished'
                          : 'Draft not created'
                  }
                />
                <Value label="Workflow" value={page.current?.workflowStatus ?? 'Owner decision'} />
                {route && page.published ? <Value label="Live route" value={route} /> : null}
                <QuickDocument id={id} text={`Edit ${label}`} type="informationPage" />
              </SummaryCard>
            )
          })}
        </div>
      </DashboardSection>

      <DashboardSection
        title="Booking Center"
        description="Whole-house availability only. Internal notes are never loaded or displayed here."
      >
        <div style={styles.sectionGrid}>
          <SummaryCard
            status={
              availabilityState === 'Available'
                ? 'complete'
                : availabilityState === 'Unavailable'
                  ? 'needsAttention'
                  : 'unknown'
            }
            statusLabel={availabilityState}
            title="House Availability"
          >
            <Value label="Current state" value={availabilityState} />
            <Value
              label="Next unavailable period"
              value={
                upcomingUnavailablePeriods[0]
                  ? formatAvailabilityPeriod(upcomingUnavailablePeriods[0])
                  : 'None recorded'
              }
            />
            <Value
              label="Confirmed through"
              value={formatDashboardDate(availability?.availabilityConfirmedThrough)}
            />
            <Value
              label="Last reviewed"
              value={formatDashboardDateTime(availability?.lastReviewedAt)}
            />

            <div style={{display: 'grid', gap: '0.5rem'}}>
              <Text muted size={1}>
                Upcoming unavailable periods
              </Text>
              {upcomingUnavailablePeriods.length ? (
                <ul style={styles.issueList}>
                  {upcomingUnavailablePeriods.slice(0, 5).map((period, index) => (
                    <li
                      key={period._key ?? `${period.startDate}-${index}`}
                      style={{listStyle: 'none'}}
                    >
                      <Text size={1}>{formatAvailabilityPeriod(period)}</Text>
                    </li>
                  ))}
                </ul>
              ) : (
                <Text size={1}>None recorded</Text>
              )}
              {upcomingUnavailablePeriods.length > 5 ? (
                <Text muted size={1}>
                  {upcomingUnavailablePeriods.length - 5} more period(s) are available in the
                  calendar.
                </Text>
              ) : null}
            </div>

            {availabilityWarnings.length ? (
              <Card padding={3} radius={2} tone="caution">
                <div style={{display: 'grid', gap: '0.4rem'}}>
                  {availabilityWarnings.map((warning) => (
                    <Text key={warning} size={1}>
                      {warning}
                    </Text>
                  ))}
                </div>
              </Card>
            ) : null}

            <IntentButton
              intent="edit"
              params={{id: 'houseAvailability', type: 'houseAvailability'}}
              text="Manage House Availability"
              tone="primary"
            />
          </SummaryCard>
          <SummaryCard
            status="complete"
            statusLabel="Owner confirmed"
            title="Whole-house occupancy"
          >
            <Value label="Maximum occupancy" value={`${MAXIMUM_WHOLE_HOUSE_GUESTS} guests`} />
            <Text muted size={1}>
              The Ocean Suite and Garden Suite are always offered together as one private
              whole-house stay. Their individual capacities remain room facts.
            </Text>
          </SummaryCard>
          <SummaryCard status="complete" statusLabel="Private Operations" title="Enquiries & Stays">
            <Text muted size={1}>
              Guest records, enquiry status, whole-house stays, and reservation workflow stay in the
              separate private Operations project.
            </Text>
            <ExternalButton href={operationsStudioUrl} text="Open Enquiries & Stays" />
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
          description="Content completeness covers approval, publication, factual review and SEO. Photography is reported separately so a truthful text-led page is not called broken."
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
                  statusLabel={incomplete.length ? 'Photography needed' : 'Photography ready'}
                  title={label as string}
                >
                  <Value label="Photography ready" value={values.length - incomplete.length} />
                  <Value label="Photography needed" value={incomplete.length} />
                  <DetailedIssueList issues={incomplete} />
                </SummaryCard>
              )
            })}
            <SummaryCard
              status={photographyNeededLabels.length ? 'needsAttention' : 'complete'}
              statusLabel={photographyNeededLabels.length ? 'Photography needed' : 'Complete'}
              title="Current production photography needs"
            >
              <Value label="Pages" value={photographyNeededLabels.length} />
              <ul style={styles.issueList}>
                {photographyNeededLabels.map((label) => (
                  <li key={label} style={{listStyle: 'none'}}>
                    <Text size={1}>{label}</Text>
                  </li>
                ))}
              </ul>
              <Text muted size={1}>
                These pages may remain intentionally text-led. Photography is needed, but their
                content is not classified as incomplete.
              </Text>
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
              status={unexpectedNoIndexDocuments.length ? 'needsAttention' : 'complete'}
              statusLabel={unexpectedNoIndexDocuments.length ? 'Needs attention' : 'Intentional'}
              title="Search visibility"
            >
              <Value label="Intentionally excluded" value={intentionalNoIndexDocuments.length} />
              <Value label="Unexpected exclusions" value={unexpectedNoIndexDocuments.length} />
              <IssueList documents={unexpectedNoIndexDocuments} />
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
            <Value label="Reply-To" value={configuredLabel(liveStatus?.enquiryReplyToConfigured)} />
            <Value
              label="Subscription mode"
              value={liveStatus?.subscriptionMode ?? 'Unavailable'}
            />
            <Value label="Test-email readiness" value={emailReady ? 'Ready' : 'Not ready'} />
            <Value
              label="Last successful test"
              value="Not recorded by the current delivery service"
            />
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
            <IntentButton
              intent="edit"
              params={{id: 'siteSettings', type: 'siteSettings'}}
              text="Edit Email Content"
            />
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
                  text="Preview Guest Email"
                />
                <ExternalButton
                  href={`${emailPreviewUrl}#internal-notification`}
                  text="Preview Internal Email"
                />
                <ExternalButton
                  href={`${emailPreviewUrl}#subscription-confirmation`}
                  text="Preview Subscription Confirmation"
                />
                <ExternalButton
                  href={`${emailPreviewUrl}#welcome-email`}
                  text="Preview Welcome Email"
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
            <Value label="Topic" value={configuredLabel(liveStatus?.topicConfigured)} />
            <Value label="Segment" value={configuredLabel(liveStatus?.segmentConfigured)} />
            <Value
              label="Reply-To"
              value={configuredLabel(liveStatus?.subscriptionReplyToConfigured)}
            />
            <Value label="Subscriber count" value="View live count in Resend" />
            <Value
              label="Broadcast readiness"
              value={
                liveStatus?.newsletterReadiness === 'ready' ? 'Ready in Resend' : 'Needs attention'
              }
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
              <ExternalButton href={resendManagementLinks.contacts} text="Resend Contacts" />
              <ExternalButton href={resendManagementLinks.broadcasts} text="Broadcasts" />
              <ExternalButton href={resendManagementLinks.topics} text="Topics" />
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
      const result = await client
        .withConfig({useCdn: false})
        .fetch<OwnerDashboardData>(ownerDashboardQuery, {}, {perspective: 'raw'})
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
        statusUrl.searchParams.set('_checkedAt', Date.now().toString())
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
