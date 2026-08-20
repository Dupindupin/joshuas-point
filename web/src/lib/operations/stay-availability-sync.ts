import {createHash} from 'node:crypto'

import {stayPolicy} from '@/lib/stay/policy'

export type StaySyncAction = 'cancel' | 'confirm'
export type AvailabilitySyncStatus = 'conflict' | 'failed' | 'notStarted' | 'pending' | 'synced'

export type OperationsStay = {
  _id: string
  dates?: {arrival?: string; departure?: string}
  guestCount?: number
  status?: 'cancelled' | 'completed' | 'confirmed' | 'proposed'
}

export type ManagedAvailabilityPeriod = {
  _key?: string
  endDate?: string
  operationsStayId?: string
  startDate?: string
  status?: 'closed' | 'maintenance' | 'ownerStay' | 'reserved'
  [key: string]: unknown
}

export type AvailabilityDocument = {
  _id: string
  _rev: string
  periods?: ManagedAvailabilityPeriod[]
}

export type AvailabilityConflict = {
  endDate: string
  startDate: string
}

export type StayAvailabilitySyncResult = {
  action: StaySyncAction
  availabilityChanged: boolean
  conflict?: AvailabilityConflict
  status: 'conflict' | 'synced'
}

export class AvailabilityRevisionConflictError extends Error {
  constructor() {
    super('House Availability changed while it was being updated.')
    this.name = 'AvailabilityRevisionConflictError'
  }
}

export interface StayAvailabilitySyncRepository {
  completeStayTransition(
    stayId: string,
    status: 'cancelled' | 'confirmed',
    attemptedAt: string,
  ): Promise<void>
  getAvailabilityDocuments(): Promise<AvailabilityDocument[]>
  getStay(stayId: string): Promise<OperationsStay | null>
  releaseStayPeriod(documents: AvailabilityDocument[], operationsStayId: string): Promise<boolean>
  reserveStayPeriod(
    documents: AvailabilityDocument[],
    period: Required<
      Pick<
        ManagedAvailabilityPeriod,
        '_key' | 'endDate' | 'operationsStayId' | 'startDate' | 'status'
      >
    >,
  ): Promise<boolean>
  setSyncStatus(
    stayId: string,
    status: Exclude<AvailabilitySyncStatus, 'notStarted'>,
    attemptedAt: string,
  ): Promise<void>
}

const maximumRevisionAttempts = 3

function validDate(value: string | undefined): value is string {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value))
}

function completePeriod(
  period: ManagedAvailabilityPeriod,
): period is ManagedAvailabilityPeriod & {endDate: string; startDate: string} {
  return (
    validDate(period.startDate) && validDate(period.endDate) && period.endDate > period.startDate
  )
}

function overlaps(
  left: {endDate: string; startDate: string},
  right: {endDate: string; startDate: string},
) {
  return left.startDate < right.endDate && right.startDate < left.endDate
}

function linkedPeriods(documents: AvailabilityDocument[], stayId: string) {
  return documents.flatMap((document) =>
    (document.periods ?? []).filter((period) => period.operationsStayId === stayId),
  )
}

function findConflict(
  documents: AvailabilityDocument[],
  requested: {endDate: string; startDate: string},
  stayId: string,
) {
  for (const document of documents) {
    for (const period of document.periods ?? []) {
      if (period.operationsStayId === stayId || !completePeriod(period)) continue
      if (overlaps(period, requested)) {
        return {endDate: period.endDate, startDate: period.startDate}
      }
    }
  }
  return undefined
}

function reservationKey(stayId: string) {
  return `stay-${createHash('sha256').update(stayId).digest('hex').slice(0, 24)}`
}

function assertStayDates(stay: OperationsStay) {
  const arrival = stay.dates?.arrival
  const departure = stay.dates?.departure
  if (!validDate(arrival) || !validDate(departure) || departure <= arrival) {
    throw new Error('The stay needs valid arrival and departure dates before synchronization.')
  }
  return {arrival, departure}
}

function assertStayOccupancy(stay: OperationsStay) {
  if (
    !Number.isInteger(stay.guestCount) ||
    !stay.guestCount ||
    stay.guestCount < 1 ||
    stay.guestCount > stayPolicy.maximumGuests
  ) {
    throw new Error(
      `The stay must contain between 1 and ${stayPolicy.maximumGuests} guests before synchronization.`,
    )
  }
}

async function markFailedSafely(
  repository: StayAvailabilitySyncRepository,
  stayId: string,
  attemptedAt: string,
) {
  await repository.setSyncStatus(stayId, 'failed', attemptedAt).catch(() => undefined)
}

export async function confirmStayAndReserveAvailability({
  attemptedAt = new Date().toISOString(),
  repository,
  stayId,
}: {
  attemptedAt?: string
  repository: StayAvailabilitySyncRepository
  stayId: string
}): Promise<StayAvailabilitySyncResult> {
  const stay = await repository.getStay(stayId)
  if (!stay) throw new Error('The stay could not be found in private Operations.')
  if (stay.status === 'cancelled' || stay.status === 'completed') {
    throw new Error('A cancelled or completed stay cannot be confirmed.')
  }

  assertStayOccupancy(stay)
  const {arrival, departure} = assertStayDates(stay)
  await repository.setSyncStatus(stayId, 'pending', attemptedAt)

  try {
    for (let attempt = 0; attempt < maximumRevisionAttempts; attempt += 1) {
      const documents = await repository.getAvailabilityDocuments()
      if (!documents.some((document) => document._id === 'houseAvailability')) {
        throw new Error('Published House Availability is missing.')
      }

      const existing = linkedPeriods(documents, stayId)
      if (existing.some((period) => period.startDate !== arrival || period.endDate !== departure)) {
        await repository.setSyncStatus(stayId, 'conflict', attemptedAt)
        return {
          action: 'confirm',
          availabilityChanged: false,
          conflict: {endDate: departure, startDate: arrival},
          status: 'conflict',
        }
      }

      const conflict = findConflict(documents, {endDate: departure, startDate: arrival}, stayId)
      if (conflict) {
        await repository.setSyncStatus(stayId, 'conflict', attemptedAt)
        return {
          action: 'confirm',
          availabilityChanged: false,
          conflict,
          status: 'conflict',
        }
      }

      try {
        const availabilityChanged = await repository.reserveStayPeriod(documents, {
          _key: reservationKey(stayId),
          endDate: departure,
          operationsStayId: stayId,
          startDate: arrival,
          status: 'reserved',
        })
        await repository.completeStayTransition(stayId, 'confirmed', attemptedAt)
        return {action: 'confirm', availabilityChanged, status: 'synced'}
      } catch (error) {
        if (error instanceof AvailabilityRevisionConflictError) continue
        throw error
      }
    }

    throw new Error('House Availability kept changing. Refresh and try again.')
  } catch (error) {
    await markFailedSafely(repository, stayId, attemptedAt)
    throw error
  }
}

export async function cancelStayAndReleaseAvailability({
  attemptedAt = new Date().toISOString(),
  repository,
  stayId,
}: {
  attemptedAt?: string
  repository: StayAvailabilitySyncRepository
  stayId: string
}): Promise<StayAvailabilitySyncResult> {
  const stay = await repository.getStay(stayId)
  if (!stay) throw new Error('The stay could not be found in private Operations.')
  if (stay.status === 'completed') throw new Error('A completed stay cannot be cancelled.')

  await repository.setSyncStatus(stayId, 'pending', attemptedAt)

  try {
    for (let attempt = 0; attempt < maximumRevisionAttempts; attempt += 1) {
      const documents = await repository.getAvailabilityDocuments()
      if (!documents.some((document) => document._id === 'houseAvailability')) {
        throw new Error('Published House Availability is missing.')
      }

      try {
        const availabilityChanged = await repository.releaseStayPeriod(documents, stayId)
        await repository.completeStayTransition(stayId, 'cancelled', attemptedAt)
        return {action: 'cancel', availabilityChanged, status: 'synced'}
      } catch (error) {
        if (error instanceof AvailabilityRevisionConflictError) continue
        throw error
      }
    }

    throw new Error('House Availability kept changing. Refresh and try again.')
  } catch (error) {
    await markFailedSafely(repository, stayId, attemptedAt)
    throw error
  }
}
