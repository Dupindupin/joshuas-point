import 'server-only'

import {createClient, type SanityClient} from '@sanity/client'

import {sanityConfig} from '@/sanity/config'

import {
  AvailabilityRevisionConflictError,
  type AvailabilityDocument,
  type ManagedAvailabilityPeriod,
  type OperationsStay,
  type StayAvailabilitySyncRepository,
} from './stay-availability-sync'

const apiVersion = '2026-08-14'
const operationsProjectId = 'bx0jlvt3'
const operationsDataset = 'operations'

function revisionConflict(error: unknown) {
  return Boolean(
    error &&
    typeof error === 'object' &&
    'statusCode' in error &&
    (error as {statusCode?: unknown}).statusCode === 409,
  )
}

function rethrowMutationError(error: unknown): never {
  if (revisionConflict(error)) throw new AvailabilityRevisionConflictError()
  throw error
}

export function createOwnerStayAvailabilitySyncRepository(token: string) {
  const operationsClient = createClient({
    apiVersion,
    dataset: operationsDataset,
    perspective: 'published',
    projectId: operationsProjectId,
    token,
    useCdn: false,
  })
  const publicClient = createClient({
    ...sanityConfig,
    apiVersion,
    perspective: 'raw',
    token,
    useCdn: false,
  })

  return new SanityStayAvailabilitySyncRepository(operationsClient, publicClient)
}

export class SanityStayAvailabilitySyncRepository implements StayAvailabilitySyncRepository {
  constructor(
    private readonly operationsClient: SanityClient,
    private readonly publicClient: SanityClient,
  ) {}

  async getStay(stayId: string) {
    return this.operationsClient.fetch<OperationsStay | null>(
      `*[_type == "wholeHouseStay" && _id == $stayId][0]{_id, status, dates{arrival, departure}}`,
      {stayId},
      {cache: 'no-store'},
    )
  }

  async getAvailabilityDocuments() {
    return this.publicClient.fetch<AvailabilityDocument[]>(
      `*[_type == "houseAvailability" && _id in ["houseAvailability", "drafts.houseAvailability"]]{
        _id,
        _rev,
        periods[]{...}
      }`,
      {},
      {cache: 'no-store'},
    )
  }

  async setSyncStatus(
    stayId: string,
    status: 'conflict' | 'failed' | 'pending' | 'synced',
    attemptedAt: string,
  ) {
    const values: Record<string, string> = {
      'availabilitySync.lastAttemptAt': attemptedAt,
      'availabilitySync.status': status,
    }
    if (status === 'synced') values['availabilitySync.syncedAt'] = attemptedAt

    await this.operationsClient
      .patch(stayId)
      .setIfMissing({availabilitySync: {status: 'notStarted'}})
      .set(values)
      .commit()
  }

  async reserveStayPeriod(
    documents: AvailabilityDocument[],
    period: Required<
      Pick<
        ManagedAvailabilityPeriod,
        '_key' | 'endDate' | 'operationsStayId' | 'startDate' | 'status'
      >
    >,
  ) {
    const missing = documents.filter(
      (document) =>
        !(document.periods ?? []).some(
          (candidate) => candidate.operationsStayId === period.operationsStayId,
        ),
    )
    if (!missing.length) return false

    let transaction = this.publicClient.transaction()
    for (const document of missing) {
      transaction = transaction.patch(document._id, (patch) =>
        patch
          .ifRevisionId(document._rev)
          .setIfMissing({periods: []})
          .append('periods', [{...period, _type: 'availabilityPeriod'}]),
      )
    }

    try {
      await transaction.commit()
      return true
    } catch (error) {
      rethrowMutationError(error)
    }
  }

  async releaseStayPeriod(documents: AvailabilityDocument[], operationsStayId: string) {
    const changed = documents
      .map((document) => ({
        document,
        periods: (document.periods ?? []).filter(
          (period) => period.operationsStayId !== operationsStayId,
        ),
      }))
      .filter(({document, periods}) => periods.length !== (document.periods ?? []).length)
    if (!changed.length) return false

    let transaction = this.publicClient.transaction()
    for (const {document, periods} of changed) {
      transaction = transaction.patch(document._id, (patch) =>
        patch.ifRevisionId(document._rev).set({periods}),
      )
    }

    try {
      await transaction.commit()
      return true
    } catch (error) {
      rethrowMutationError(error)
    }
  }

  async completeStayTransition(
    stayId: string,
    status: 'cancelled' | 'confirmed',
    attemptedAt: string,
  ) {
    const statusTimestamp =
      status === 'confirmed' ? 'timestamps.confirmedAt' : 'timestamps.cancelledAt'

    await this.operationsClient
      .patch(stayId)
      .setIfMissing({availabilitySync: {status: 'notStarted'}})
      .set({
        'availabilitySync.lastAttemptAt': attemptedAt,
        'availabilitySync.status': 'synced',
        'availabilitySync.syncedAt': attemptedAt,
        status,
        [statusTimestamp]: attemptedAt,
        'timestamps.statusChangedAt': attemptedAt,
      })
      .commit()
  }
}
