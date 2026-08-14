import assert from 'node:assert/strict'
import test from 'node:test'

import {
  AvailabilityRevisionConflictError,
  cancelStayAndReleaseAvailability,
  confirmStayAndReserveAvailability,
  type AvailabilityDocument,
  type ManagedAvailabilityPeriod,
  type OperationsStay,
  type StayAvailabilitySyncRepository,
} from './stay-availability-sync'

class MemoryRepository implements StayAvailabilitySyncRepository {
  documents: AvailabilityDocument[]
  reserveConflictsRemaining = 0
  stay: OperationsStay & {availabilitySync?: {status: string}}

  constructor({documents, stay}: {documents: AvailabilityDocument[]; stay?: OperationsStay}) {
    this.documents = structuredClone(documents)
    this.stay = structuredClone(
      stay ?? {
        _id: 'wholeHouseStay.test',
        dates: {arrival: '2026-09-10', departure: '2026-09-12'},
        status: 'proposed',
      },
    )
  }

  async getStay(stayId: string) {
    return stayId === this.stay._id ? structuredClone(this.stay) : null
  }

  async getAvailabilityDocuments() {
    return structuredClone(this.documents)
  }

  async setSyncStatus(_stayId: string, status: string) {
    this.stay.availabilitySync = {status}
  }

  async reserveStayPeriod(_documents: AvailabilityDocument[], period: ManagedAvailabilityPeriod) {
    if (this.reserveConflictsRemaining > 0) {
      this.reserveConflictsRemaining -= 1
      throw new AvailabilityRevisionConflictError()
    }
    let changed = false
    this.documents = this.documents.map((document) => {
      if (
        (document.periods ?? []).some(
          (candidate) => candidate.operationsStayId === period.operationsStayId,
        )
      ) {
        return document
      }
      changed = true
      return {...document, periods: [...(document.periods ?? []), period]}
    })
    return changed
  }

  async releaseStayPeriod(_documents: AvailabilityDocument[], operationsStayId: string) {
    let changed = false
    this.documents = this.documents.map((document) => {
      const periods = (document.periods ?? []).filter((period) => {
        if (period.operationsStayId !== operationsStayId) return true
        changed = true
        return false
      })
      return {...document, periods}
    })
    return changed
  }

  async completeStayTransition(_stayId: string, status: 'cancelled' | 'confirmed') {
    this.stay.status = status
    this.stay.availabilitySync = {status: 'synced'}
  }
}

const publishedAvailability = (periods: ManagedAvailabilityPeriod[] = []) => ({
  _id: 'houseAvailability',
  _rev: 'revision-1',
  periods,
})

test('confirmation is blocked when requested dates overlap an unavailable period', async () => {
  const manualPeriod = {
    _key: 'manual',
    endDate: '2026-09-11',
    startDate: '2026-09-09',
    status: 'ownerStay' as const,
  }
  const repository = new MemoryRepository({documents: [publishedAvailability([manualPeriod])]})

  const result = await confirmStayAndReserveAvailability({repository, stayId: repository.stay._id})

  assert.equal(result.status, 'conflict')
  assert.deepEqual(result.conflict, {endDate: '2026-09-11', startDate: '2026-09-09'})
  assert.equal(repository.stay.status, 'proposed')
  assert.equal(repository.stay.availabilitySync?.status, 'conflict')
  assert.deepEqual(repository.documents[0]?.periods, [manualPeriod])
})

test('successful confirmation adds a linked reserved period and confirms the stay', async () => {
  const repository = new MemoryRepository({documents: [publishedAvailability()]})

  const result = await confirmStayAndReserveAvailability({repository, stayId: repository.stay._id})

  assert.equal(result.status, 'synced')
  assert.equal(result.availabilityChanged, true)
  assert.equal(repository.stay.status, 'confirmed')
  assert.equal(repository.stay.availabilitySync?.status, 'synced')
  assert.deepEqual(
    repository.documents[0]?.periods?.map(({startDate, endDate, status, operationsStayId}) => ({
      startDate,
      endDate,
      status,
      operationsStayId,
    })),
    [
      {
        endDate: '2026-09-12',
        operationsStayId: 'wholeHouseStay.test',
        startDate: '2026-09-10',
        status: 'reserved',
      },
    ],
  )
})

test('cancellation removes only the period linked to the stay', async () => {
  const manualPeriod = {
    _key: 'manual',
    endDate: '2026-10-04',
    startDate: '2026-10-01',
    status: 'maintenance' as const,
  }
  const linkedPeriod = {
    _key: 'managed',
    endDate: '2026-09-12',
    operationsStayId: 'wholeHouseStay.test',
    startDate: '2026-09-10',
    status: 'reserved' as const,
  }
  const repository = new MemoryRepository({
    documents: [publishedAvailability([manualPeriod, linkedPeriod])],
    stay: {
      _id: 'wholeHouseStay.test',
      dates: {arrival: '2026-09-10', departure: '2026-09-12'},
      status: 'confirmed',
    },
  })

  const result = await cancelStayAndReleaseAvailability({
    repository,
    stayId: repository.stay._id,
  })

  assert.equal(result.status, 'synced')
  assert.equal(result.availabilityChanged, true)
  assert.equal(repository.stay.status, 'cancelled')
  assert.deepEqual(repository.documents[0]?.periods, [manualPeriod])
})

test('confirmation retries revision conflicts and remains idempotent', async () => {
  const repository = new MemoryRepository({documents: [publishedAvailability()]})
  repository.reserveConflictsRemaining = 1

  const first = await confirmStayAndReserveAvailability({repository, stayId: repository.stay._id})
  const second = await confirmStayAndReserveAvailability({repository, stayId: repository.stay._id})

  assert.equal(first.status, 'synced')
  assert.equal(first.availabilityChanged, true)
  assert.equal(second.status, 'synced')
  assert.equal(second.availabilityChanged, false)
  assert.equal(repository.documents[0]?.periods?.length, 1)
})
