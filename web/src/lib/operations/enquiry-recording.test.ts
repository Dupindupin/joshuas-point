import assert from 'node:assert/strict'
import test from 'node:test'

import type {EnquirySubmission} from '@/lib/enquiry/types'

import {
  buildStayEnquiryRecord,
  recordAndDeliverEnquiry,
  type EnquiryDeliveryStatus,
  type OperationsWarning,
  type StayEnquiryRecord,
  type StayEnquiryRepository,
} from './enquiry-recording'

const enquiry: EnquirySubmission = {
  arrivalDate: '2027-02-10',
  departureDate: '2027-02-15',
  email: 'owner-controlled@example.com',
  guests: 4,
  message: 'We would like to ask about staying at Joshua’s Point.',
  name: 'Test Guest',
}

class MemoryRepository implements StayEnquiryRepository {
  deliveryStatus: EnquiryDeliveryStatus | undefined
  ensureCalls = 0
  failEnsure = false
  failStatus = false
  lastAttemptAt: string | undefined

  async ensure(record: StayEnquiryRecord) {
    this.ensureCalls += 1
    if (this.failEnsure) throw new Error('Simulated operations write failure')
    this.deliveryStatus ??= record.emailDelivery.status
    return {deliveryStatus: this.deliveryStatus}
  }

  async setDeliveryStatus(
    _documentId: string,
    status: 'failed' | 'pending' | 'sent',
    attemptedAt: string,
  ) {
    if (this.failStatus) throw new Error('Simulated status write failure')
    this.deliveryStatus = status
    this.lastAttemptAt = attemptedAt
  }
}

function record() {
  return buildStayEnquiryRecord({
    enquiry,
    fingerprint: 'a'.repeat(64),
    receivedAt: '2026-08-14T08:30:00.000Z',
  })
}

test('builds a private record containing only validated enquiry and workflow data', () => {
  const result = record()

  assert.equal(result._id, `stayEnquiry.${'a'.repeat(64)}`)
  assert.equal(result.referenceNumber, 'JP-E-20260814-AAAAAAAA')
  assert.equal(result.source, 'websiteEnquiry')
  assert.equal(result.status, 'new')
  assert.equal(result.requestedStay.guestCount, 4)
  assert.equal(result.emailDelivery.status, 'pending')
  assert.equal('ipAddress' in result, false)
  assert.equal('userAgent' in result, false)
})

test('records one enquiry and marks a successful delivery as sent', async () => {
  const repository = new MemoryRepository()
  let deliveries = 0

  const result = await recordAndDeliverEnquiry({
    deliver: async () => {
      deliveries += 1
    },
    now: () => new Date('2026-08-14T08:31:00.000Z'),
    record: record(),
    repository,
    warn: () => assert.fail('No warning expected'),
  })

  assert.deepEqual(result, {alreadyDelivered: false})
  assert.equal(deliveries, 1)
  assert.equal(repository.deliveryStatus, 'sent')
  assert.equal(repository.lastAttemptAt, '2026-08-14T08:31:00.000Z')
})

test('does not deliver again when the idempotent record is already sent', async () => {
  const repository = new MemoryRepository()
  repository.deliveryStatus = 'sent'
  let deliveries = 0

  const result = await recordAndDeliverEnquiry({
    deliver: async () => {
      deliveries += 1
    },
    record: record(),
    repository,
    warn: () => assert.fail('No warning expected'),
  })

  assert.deepEqual(result, {alreadyDelivered: true})
  assert.equal(deliveries, 0)
  assert.equal(repository.ensureCalls, 1)
})

test('preserves the enquiry and marks delivery failed when email delivery fails', async () => {
  const repository = new MemoryRepository()
  const deliveryError = new Error('Simulated email failure')

  await assert.rejects(
    recordAndDeliverEnquiry({
      deliver: async () => {
        throw deliveryError
      },
      record: record(),
      repository,
      warn: () => assert.fail('No warning expected'),
    }),
    deliveryError,
  )

  assert.equal(repository.deliveryStatus, 'failed')
})

test('reports a sanitized operational warning when email succeeds but storage fails', async () => {
  const repository = new MemoryRepository()
  repository.failEnsure = true
  const warnings: OperationsWarning[] = []

  const result = await recordAndDeliverEnquiry({
    deliver: async () => undefined,
    record: record(),
    repository,
    warn: (warning) => warnings.push(warning),
  })

  assert.deepEqual(result, {alreadyDelivered: false})
  assert.deepEqual(
    warnings.map(({code, errorType, referenceNumber}) => ({code, errorType, referenceNumber})),
    [
      {
        code: 'initial_record_write_failed',
        errorType: 'Error',
        referenceNumber: 'JP-E-20260814-AAAAAAAA',
      },
      {
        code: 'delivery_succeeded_record_update_failed',
        errorType: 'Error',
        referenceNumber: 'JP-E-20260814-AAAAAAAA',
      },
    ],
  )
  assert.equal(JSON.stringify(warnings).includes(enquiry.email), false)
  assert.equal(JSON.stringify(warnings).includes(enquiry.message), false)
})

test('reports a warning without hiding the delivery error when both systems fail', async () => {
  const repository = new MemoryRepository()
  repository.failEnsure = true
  const warnings: OperationsWarning[] = []
  const deliveryError = new Error('Simulated email failure')

  await assert.rejects(
    recordAndDeliverEnquiry({
      deliver: async () => {
        throw deliveryError
      },
      record: record(),
      repository,
      warn: (warning) => warnings.push(warning),
    }),
    deliveryError,
  )

  assert.deepEqual(
    warnings.map(({code}) => code),
    ['initial_record_write_failed', 'delivery_failed_record_update_failed'],
  )
})
