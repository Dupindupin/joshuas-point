import {Button, Card, Heading, Spinner, Text} from '@sanity/ui'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {IntentButton, useClient} from 'sanity'

import {
  MAXIMUM_WHOLE_HOUSE_GUESTS,
  wholeHouseOccupancyDescription,
} from '../../schemaTypes/operations/occupancy'

const apiVersion = '2026-08-14'

const enquiryStatuses = [
  {label: 'New', value: 'new'},
  {label: 'Replied', value: 'replied'},
  {label: 'Awaiting guest', value: 'awaitingGuest'},
  {label: 'Converted to stay', value: 'convertedToStay'},
  {label: 'Closed', value: 'closed'},
] as const

type EnquiryStatus = (typeof enquiryStatuses)[number]['value']
type StayStatus = 'cancelled' | 'completed' | 'confirmed' | 'proposed'

type StayEnquiry = {
  _id: string
  _rev: string
  guest?: {email?: string; name?: string; phone?: string}
  receivedAt?: string
  referenceNumber?: string
  requestedStay?: {arrival?: string; departure?: string; guestCount?: number}
  status?: EnquiryStatus
}

type WholeHouseStay = {
  _id: string
  _rev: string
  availabilitySync?: {
    lastAttemptAt?: string
    status?: 'conflict' | 'failed' | 'notStarted' | 'pending' | 'synced'
    syncedAt?: string
  }
  dates?: {arrival?: string; departure?: string}
  guestCount?: number
  referenceNumber?: string
  sourceEnquiry?: {
    _id?: string
    guest?: {email?: string; name?: string}
    referenceNumber?: string
  }
  status?: StayStatus
}

type OperationsData = {
  enquiries: StayEnquiry[]
  stays: WholeHouseStay[]
}

const operationsQuery = `{
  "enquiries": *[_type == "stayEnquiry"] | order(receivedAt desc)[0...100] {
    _id,
    _rev,
    receivedAt,
    referenceNumber,
    status,
    guest {name, email, phone},
    requestedStay {arrival, departure, guestCount}
  },
  "stays": *[_type == "wholeHouseStay"] | order(dates.arrival asc)[0...100] {
    _id,
    _rev,
    referenceNumber,
    status,
    availabilitySync {status, lastAttemptAt, syncedAt},
    dates {arrival, departure},
    guestCount,
    "sourceEnquiry": sourceEnquiry->{
      _id,
      referenceNumber,
      guest {name, email}
    }
  }
}`

const studioEnvironment =
  (import.meta as unknown as {env?: Record<string, string | undefined>}).env ?? {}

function resolveStaySyncUrl() {
  const configuredUrl = studioEnvironment.SANITY_STUDIO_STAY_SYNC_URL?.trim()
  const candidate = configuredUrl || 'https://joshuaspoint.com/api/owner/operations/stays/sync'

  try {
    const url = new URL(candidate)
    const approvedProductionOrigin = 'https://joshuaspoint.com'
    const local =
      (url.protocol === 'http:' || url.protocol === 'https:') &&
      (url.hostname === 'localhost' || url.hostname === '127.0.0.1')
    if (url.origin !== approvedProductionOrigin && !local) return null
    return new URL('/api/owner/operations/stays/sync', url.origin)
  } catch {
    return null
  }
}

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
  section: {marginTop: '2rem'},
  sectionHeader: {display: 'grid', gap: '0.4rem', marginBottom: '1rem'},
  grid: {
    display: 'grid',
    gap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
  },
  card: {display: 'grid', gap: '1rem', height: '100%'},
  row: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.75rem',
    justifyContent: 'space-between',
  },
  details: {display: 'grid', gap: '0.5rem'},
  actions: {display: 'flex', flexWrap: 'wrap' as const, gap: '0.6rem'},
  select: {
    background: 'transparent',
    border: '1px solid var(--card-border-color)',
    borderRadius: '0.25rem',
    color: 'inherit',
    font: 'inherit',
    minHeight: '2.25rem',
    padding: '0.35rem 0.55rem',
  },
} as const

const statusTone = {
  awaitingGuest: 'caution',
  cancelled: 'critical',
  closed: 'default',
  completed: 'positive',
  confirmed: 'positive',
  convertedToStay: 'positive',
  new: 'primary',
  proposed: 'caution',
  replied: 'primary',
} as const

function formatDate(value?: string) {
  if (!value) return 'Date not added'
  const parsed = new Date(`${value}T00:00:00`)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString(undefined, {day: 'numeric', month: 'short', year: 'numeric'})
}

function formatDateTime(value?: string) {
  if (!value) return 'Time not recorded'
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleString(undefined, {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function dateRange(arrival?: string, departure?: string) {
  if (!arrival || !departure) return 'Dates incomplete'
  return `${formatDate(arrival)} – ${formatDate(departure)}`
}

function StatusBadge({label, status}: {label: string; status: keyof typeof statusTone}) {
  return (
    <Card padding={2} radius={2} tone={statusTone[status]}>
      <Text size={1} weight="medium">
        {label}
      </Text>
    </Card>
  )
}

function EmptyState({children}: {children: React.ReactNode}) {
  return (
    <Card border padding={4} radius={3}>
      <Text muted size={1}>
        {children}
      </Text>
    </Card>
  )
}

function EnquiryCard({
  busy,
  enquiry,
  onConvert,
  onStatusChange,
}: {
  busy: boolean
  enquiry: StayEnquiry
  onConvert: (enquiry: StayEnquiry) => Promise<void>
  onStatusChange: (enquiry: StayEnquiry, status: EnquiryStatus) => Promise<void>
}) {
  const currentStatus = enquiry.status ?? 'new'
  const statusLabel =
    enquiryStatuses.find((option) => option.value === currentStatus)?.label ?? 'Unknown'
  const replyHref = enquiry.guest?.email
    ? `mailto:${encodeURIComponent(enquiry.guest.email)}?subject=${encodeURIComponent(
        `Joshua's Point enquiry ${enquiry.referenceNumber ?? ''}`.trim(),
      )}`
    : undefined

  return (
    <Card border padding={4} radius={3}>
      <div style={styles.card}>
        <div style={styles.row}>
          <div style={{display: 'grid', gap: '0.3rem'}}>
            <Heading as="h4" size={1}>
              {enquiry.guest?.name || 'Guest name missing'}
            </Heading>
            <Text muted size={1}>
              {enquiry.referenceNumber || 'Reference missing'}
            </Text>
          </div>
          <StatusBadge label={statusLabel} status={currentStatus} />
        </div>

        <div style={styles.details}>
          <Text size={1}>
            {dateRange(enquiry.requestedStay?.arrival, enquiry.requestedStay?.departure)}
          </Text>
          <Text size={1}>
            {enquiry.requestedStay?.guestCount
              ? `${enquiry.requestedStay.guestCount} guest${enquiry.requestedStay.guestCount === 1 ? '' : 's'}`
              : 'Guest count missing'}
          </Text>
          <Text muted size={1}>
            Received {formatDateTime(enquiry.receivedAt)}
          </Text>
        </div>

        <label style={{display: 'grid', gap: '0.35rem'}}>
          <Text muted size={1}>
            Enquiry status
          </Text>
          <select
            aria-label={`Status for ${enquiry.referenceNumber || enquiry.guest?.name || 'enquiry'}`}
            disabled={busy}
            onChange={(event) =>
              void onStatusChange(enquiry, event.currentTarget.value as EnquiryStatus)
            }
            style={styles.select}
            value={currentStatus}
          >
            {enquiryStatuses.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div style={styles.actions}>
          <IntentButton
            intent="edit"
            mode="ghost"
            params={{id: enquiry._id, type: 'stayEnquiry'}}
            text="Open enquiry"
          />
          {replyHref ? (
            <Button as="a" href={replyHref} mode="ghost" text="Open email reply" />
          ) : null}
          {currentStatus !== 'convertedToStay' && currentStatus !== 'closed' ? (
            <Button
              disabled={busy}
              onClick={() => void onConvert(enquiry)}
              text="Convert to proposed stay"
              tone="primary"
            />
          ) : null}
        </div>
      </div>
    </Card>
  )
}

function StayCard({
  busy,
  onStatusChange,
  stay,
}: {
  busy: boolean
  onStatusChange: (stay: WholeHouseStay, status: StayStatus) => Promise<void>
  stay: WholeHouseStay
}) {
  const currentStatus = stay.status ?? 'proposed'
  const labels: Record<StayStatus, string> = {
    cancelled: 'Cancelled',
    completed: 'Completed',
    confirmed: 'Confirmed',
    proposed: 'Proposed',
  }

  return (
    <Card border padding={4} radius={3}>
      <div style={styles.card}>
        <div style={styles.row}>
          <div style={{display: 'grid', gap: '0.3rem'}}>
            <Heading as="h4" size={1}>
              {stay.sourceEnquiry?.guest?.name || stay.referenceNumber || 'Whole-house stay'}
            </Heading>
            <Text muted size={1}>
              {stay.referenceNumber || 'Reference missing'}
            </Text>
          </div>
          <StatusBadge label={labels[currentStatus]} status={currentStatus} />
        </div>

        <div style={styles.details}>
          <Text size={1}>{dateRange(stay.dates?.arrival, stay.dates?.departure)}</Text>
          <Text size={1}>
            {stay.guestCount
              ? `${stay.guestCount} guest${stay.guestCount === 1 ? '' : 's'}`
              : 'Guest count missing'}
          </Text>
          <Text muted size={1}>
            Availability sync: {stay.availabilitySync?.status ?? 'not started'}
          </Text>
        </div>

        <div style={styles.actions}>
          <IntentButton
            intent="edit"
            mode="ghost"
            params={{id: stay._id, type: 'wholeHouseStay'}}
            text="Open stay"
          />
          {stay.sourceEnquiry?._id ? (
            <IntentButton
              intent="edit"
              mode="ghost"
              params={{id: stay.sourceEnquiry._id, type: 'stayEnquiry'}}
              text="Open linked enquiry"
            />
          ) : null}
          {currentStatus === 'proposed' ? (
            <Button
              disabled={busy}
              onClick={() => void onStatusChange(stay, 'confirmed')}
              text="Confirm stay"
              tone="positive"
            />
          ) : null}
          {currentStatus === 'proposed' || currentStatus === 'confirmed' ? (
            <Button
              disabled={busy}
              mode="ghost"
              onClick={() => void onStatusChange(stay, 'cancelled')}
              text="Cancel stay"
              tone="critical"
            />
          ) : null}
          {currentStatus === 'confirmed' ? (
            <Button
              disabled={busy}
              onClick={() => void onStatusChange(stay, 'completed')}
              text="Mark completed"
              tone="positive"
            />
          ) : null}
        </div>
      </div>
    </Card>
  )
}

function Section({
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
      aria-labelledby={`operations-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      style={styles.section}
    >
      <div style={styles.sectionHeader}>
        <Heading id={`operations-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} size={2}>
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

function EnquiryCollection({
  busyId,
  enquiries,
  emptyMessage,
  onConvert,
  onStatusChange,
}: {
  busyId: string | null
  emptyMessage: string
  enquiries: StayEnquiry[]
  onConvert: (enquiry: StayEnquiry) => Promise<void>
  onStatusChange: (enquiry: StayEnquiry, status: EnquiryStatus) => Promise<void>
}) {
  if (!enquiries.length) return <EmptyState>{emptyMessage}</EmptyState>
  return (
    <div style={styles.grid}>
      {enquiries.map((enquiry) => (
        <EnquiryCard
          busy={busyId === enquiry._id}
          enquiry={enquiry}
          key={enquiry._id}
          onConvert={onConvert}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  )
}

function StayCollection({
  busyId,
  emptyMessage,
  onStatusChange,
  stays,
}: {
  busyId: string | null
  emptyMessage: string
  onStatusChange: (stay: WholeHouseStay, status: StayStatus) => Promise<void>
  stays: WholeHouseStay[]
}) {
  if (!stays.length) return <EmptyState>{emptyMessage}</EmptyState>
  return (
    <div style={styles.grid}>
      {stays.map((stay) => (
        <StayCard
          busy={busyId === stay._id}
          key={stay._id}
          onStatusChange={onStatusChange}
          stay={stay}
        />
      ))}
    </div>
  )
}

export function OperationsOwnerDashboard() {
  const client = useClient({apiVersion})
  const [data, setData] = useState<OperationsData>({enquiries: [], stays: []})
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setError(null)
    try {
      const next = await client.fetch<OperationsData>(
        operationsQuery,
        {},
        {perspective: 'published'},
      )
      setData(next)
    } catch {
      setError('Operations data could not be loaded. Check your Operations project access.')
    } finally {
      setLoading(false)
    }
  }, [client])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const changeEnquiryStatus = useCallback(
    async (enquiry: StayEnquiry, status: EnquiryStatus) => {
      if (status === enquiry.status) return
      setBusyId(enquiry._id)
      setError(null)
      const now = new Date().toISOString()
      const timestampField: Partial<Record<EnquiryStatus, string>> = {
        closed: 'timestamps.closedAt',
        convertedToStay: 'timestamps.convertedAt',
        replied: 'timestamps.repliedAt',
      }
      const values: Record<string, string> = {
        status,
        'timestamps.statusChangedAt': now,
      }
      if (timestampField[status]) values[timestampField[status] as string] = now

      try {
        await client.patch(enquiry._id).ifRevisionId(enquiry._rev).set(values).commit()
        await refresh()
      } catch {
        setError('The enquiry changed elsewhere or could not be updated. Refresh and try again.')
      } finally {
        setBusyId(null)
      }
    },
    [client, refresh],
  )

  const convertToStay = useCallback(
    async (enquiry: StayEnquiry) => {
      const {arrival, departure, guestCount} = enquiry.requestedStay ?? {}
      if (!arrival || !departure || !guestCount) {
        setError('This enquiry needs complete dates and a guest count before conversion.')
        return
      }
      if (guestCount < 1 || guestCount > MAXIMUM_WHOLE_HOUSE_GUESTS) {
        setError(
          `This enquiry must contain between 1 and ${MAXIMUM_WHOLE_HOUSE_GUESTS} guests before conversion.`,
        )
        return
      }

      setBusyId(enquiry._id)
      setError(null)
      const now = new Date().toISOString()
      const suffix = enquiry._id.replace(/^stayEnquiry\./, '').replace(/[^a-zA-Z0-9_-]/g, '-')
      const stayId = `wholeHouseStay.${suffix}`
      const stayReference = enquiry.referenceNumber?.replace(/^JP-E-/, 'JP-S-') || `JP-S-${suffix}`

      try {
        await client
          .transaction()
          .createIfNotExists({
            _id: stayId,
            _type: 'wholeHouseStay',
            availabilitySync: {status: 'notStarted'},
            dates: {arrival, departure},
            guestCount,
            referenceNumber: stayReference,
            sourceEnquiry: {_ref: enquiry._id, _type: 'reference'},
            status: 'proposed',
            timestamps: {proposedAt: now, statusChangedAt: now},
          })
          .patch(enquiry._id, (patch) =>
            patch.ifRevisionId(enquiry._rev).set({
              status: 'convertedToStay',
              'timestamps.convertedAt': now,
              'timestamps.statusChangedAt': now,
            }),
          )
          .commit()
        await refresh()
      } catch {
        setError('The proposed stay could not be created. Refresh and check the enquiry details.')
      } finally {
        setBusyId(null)
      }
    },
    [client, refresh],
  )

  const changeStayStatus = useCallback(
    async (stay: WholeHouseStay, status: StayStatus) => {
      if (status === stay.status) return
      setBusyId(stay._id)
      setError(null)
      try {
        if (status === 'confirmed' || status === 'cancelled') {
          const token = client.config().token
          const syncUrl = resolveStaySyncUrl()
          if (!token || !syncUrl) {
            throw new Error('Owner authentication for availability synchronization is unavailable.')
          }

          const syncResponse = await fetch(syncUrl, {
            body: JSON.stringify({
              action: status === 'confirmed' ? 'confirm' : 'cancel',
              stayId: stay._id,
            }),
            cache: 'no-store',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })
          const payload = (await syncResponse.json()) as {message?: string; ok?: boolean}
          if (!syncResponse.ok || !payload.ok) {
            throw new Error(payload.message || 'Availability synchronization was rejected.')
          }
        } else {
          const now = new Date().toISOString()
          const values: Record<string, string> = {
            status,
            'timestamps.statusChangedAt': now,
          }
          if (status === 'completed') values['timestamps.completedAt'] = now
          await client.patch(stay._id).ifRevisionId(stay._rev).set(values).commit()
        }
        await refresh()
      } catch (caught) {
        setError(
          caught instanceof Error
            ? caught.message
            : 'The stay could not be updated safely. Refresh and try again.',
        )
      } finally {
        setBusyId(null)
      }
    },
    [client, refresh],
  )

  const grouped = useMemo(() => {
    const recentEnquiries = data.enquiries
      .filter((enquiry) => enquiry.status !== 'new')
      .slice(0, 12)
    return {
      newEnquiries: data.enquiries.filter((enquiry) => (enquiry.status ?? 'new') === 'new'),
      recentEnquiries,
      cancelled: data.stays.filter((stay) => stay.status === 'cancelled'),
      completed: data.stays.filter((stay) => stay.status === 'completed'),
      confirmed: data.stays.filter((stay) => stay.status === 'confirmed'),
      proposed: data.stays.filter((stay) => (stay.status ?? 'proposed') === 'proposed'),
    }
  }, [data])

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={{display: 'grid', gap: '0.5rem'}}>
          <Heading size={4}>Owner Operations</Heading>
          <Text muted size={1}>
            Private guest enquiries and whole-house stays. Nothing here is exposed publicly.
          </Text>
          <Text muted size={1}>
            {wholeHouseOccupancyDescription}
          </Text>
        </div>
        <Button disabled={loading} mode="ghost" onClick={() => void refresh()} text="Refresh" />
      </header>

      {error ? (
        <Card marginBottom={4} padding={4} radius={3} tone="critical">
          <Text>{error}</Text>
        </Card>
      ) : null}

      {loading ? (
        <Card padding={5} radius={3}>
          <div style={{alignItems: 'center', display: 'flex', gap: '0.75rem'}}>
            <Spinner muted />
            <Text muted>Loading private Operations records…</Text>
          </div>
        </Card>
      ) : (
        <>
          <Section
            description="Open, reply to, update, or convert private website enquiries."
            title="Enquiry Center"
          >
            <div style={{display: 'grid', gap: '2rem'}}>
              <div>
                <Heading as="h3" size={1} style={{marginBottom: '1rem'}}>
                  New enquiries ({grouped.newEnquiries.length})
                </Heading>
                <EnquiryCollection
                  busyId={busyId}
                  emptyMessage="There are no new enquiries."
                  enquiries={grouped.newEnquiries}
                  onConvert={convertToStay}
                  onStatusChange={changeEnquiryStatus}
                />
              </div>
              <div>
                <Heading as="h3" size={1} style={{marginBottom: '1rem'}}>
                  Recent enquiries ({grouped.recentEnquiries.length})
                </Heading>
                <EnquiryCollection
                  busyId={busyId}
                  emptyMessage="No recent processed enquiries yet."
                  enquiries={grouped.recentEnquiries}
                  onConvert={convertToStay}
                  onStatusChange={changeEnquiryStatus}
                />
              </div>
            </div>
          </Section>

          <Section
            description="Confirming a stay reserves its dates after a fresh conflict check. Cancelling releases only that stay's linked period."
            title="Stay Center"
          >
            <div style={{display: 'grid', gap: '2rem'}}>
              {(
                [
                  ['Proposed stays', grouped.proposed, 'There are no proposed stays.'],
                  ['Confirmed stays', grouped.confirmed, 'There are no confirmed stays.'],
                  ['Cancelled stays', grouped.cancelled, 'There are no cancelled stays.'],
                  ['Completed stays', grouped.completed, 'There are no completed stays.'],
                ] as const
              ).map(([title, stays, emptyMessage]) => (
                <div key={title}>
                  <Heading as="h3" size={1} style={{marginBottom: '1rem'}}>
                    {title} ({stays.length})
                  </Heading>
                  <StayCollection
                    busyId={busyId}
                    emptyMessage={emptyMessage}
                    onStatusChange={changeStayStatus}
                    stays={stays}
                  />
                </div>
              ))}
            </div>
          </Section>
        </>
      )}
    </main>
  )
}
