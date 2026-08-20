import type {EnquirySubmission} from '@/lib/enquiry/types'
import {stayPolicy} from '@/lib/stay/policy'

export type EnquiryDeliveryStatus =
  'disabled' | 'failed' | 'notAttempted' | 'partiallySent' | 'pending' | 'sent'

export type StayEnquiryRecord = {
  _id: string
  _type: 'stayEnquiry'
  emailDelivery: {
    status: EnquiryDeliveryStatus
  }
  guest: {
    email: string
    name: string
    phone?: string
  }
  idempotencyKey: string
  message: string
  receivedAt: string
  referenceNumber: string
  requestedStay: {
    arrival: string
    departure: string
    guestCount: number
  }
  source: 'websiteEnquiry'
  status: 'new'
  timestamps: {
    statusChangedAt: string
  }
}

export type StoredStayEnquiry = {
  deliveryStatus: EnquiryDeliveryStatus
}

export interface StayEnquiryRepository {
  ensure(record: StayEnquiryRecord): Promise<StoredStayEnquiry>
  setDeliveryStatus(
    documentId: string,
    status: Extract<EnquiryDeliveryStatus, 'failed' | 'pending' | 'sent'>,
    attemptedAt: string,
  ): Promise<void>
}

export type OperationsWarning = {
  code:
    | 'delivery_failed_record_update_failed'
    | 'delivery_succeeded_record_update_failed'
    | 'initial_record_write_failed'
    | 'pending_status_update_failed'
  errorType: string
  referenceNumber: string
}

type RecordAndDeliverOptions = {
  deliver: () => Promise<void>
  now?: () => Date
  record: StayEnquiryRecord
  repository: StayEnquiryRepository
  warn: (warning: OperationsWarning) => void
}

function safeErrorType(error: unknown) {
  return error instanceof Error && error.name ? error.name : 'UnknownError'
}

async function safelyPersistDeliveryStatus(
  repository: StayEnquiryRepository,
  record: StayEnquiryRecord,
  status: Extract<EnquiryDeliveryStatus, 'failed' | 'sent'>,
  attemptedAt: string,
) {
  await repository.ensure(record)
  await repository.setDeliveryStatus(record._id, status, attemptedAt)
}

export function buildStayEnquiryRecord({
  enquiry,
  fingerprint,
  receivedAt = new Date().toISOString(),
}: {
  enquiry: EnquirySubmission
  fingerprint: string
  receivedAt?: string
}): StayEnquiryRecord {
  if (
    !Number.isInteger(enquiry.guests) ||
    enquiry.guests < 1 ||
    enquiry.guests > stayPolicy.maximumGuests
  ) {
    throw new Error(`A stay enquiry must contain between 1 and ${stayPolicy.maximumGuests} guests.`)
  }

  const idempotencyKey = `jp-enquiry-${fingerprint}`
  const referenceDate = receivedAt.slice(0, 10).replaceAll('-', '')
  const referenceSuffix = fingerprint.slice(0, 8).toUpperCase()

  return {
    _id: `stayEnquiry.${fingerprint}`,
    _type: 'stayEnquiry',
    emailDelivery: {status: 'pending'},
    guest: {
      email: enquiry.email,
      name: enquiry.name,
      ...(enquiry.phone ? {phone: enquiry.phone} : {}),
    },
    idempotencyKey,
    message: enquiry.message,
    receivedAt,
    referenceNumber: `JP-E-${referenceDate}-${referenceSuffix}`,
    requestedStay: {
      arrival: enquiry.arrivalDate,
      departure: enquiry.departureDate,
      guestCount: enquiry.guests,
    },
    source: 'websiteEnquiry',
    status: 'new',
    timestamps: {statusChangedAt: receivedAt},
  }
}

export async function recordAndDeliverEnquiry({
  deliver,
  now = () => new Date(),
  record,
  repository,
  warn,
}: RecordAndDeliverOptions) {
  let stored: StoredStayEnquiry | null = null

  try {
    stored = await repository.ensure(record)
  } catch (error) {
    warn({
      code: 'initial_record_write_failed',
      errorType: safeErrorType(error),
      referenceNumber: record.referenceNumber,
    })
  }

  if (stored?.deliveryStatus === 'sent') {
    return {alreadyDelivered: true}
  }

  const attemptedAt = now().toISOString()
  if (stored) {
    try {
      await repository.setDeliveryStatus(record._id, 'pending', attemptedAt)
    } catch (error) {
      warn({
        code: 'pending_status_update_failed',
        errorType: safeErrorType(error),
        referenceNumber: record.referenceNumber,
      })
    }
  }

  try {
    await deliver()
  } catch (deliveryError) {
    try {
      await safelyPersistDeliveryStatus(repository, record, 'failed', attemptedAt)
    } catch (recordError) {
      warn({
        code: 'delivery_failed_record_update_failed',
        errorType: safeErrorType(recordError),
        referenceNumber: record.referenceNumber,
      })
    }
    throw deliveryError
  }

  try {
    await safelyPersistDeliveryStatus(repository, record, 'sent', attemptedAt)
  } catch (error) {
    warn({
      code: 'delivery_succeeded_record_update_failed',
      errorType: safeErrorType(error),
      referenceNumber: record.referenceNumber,
    })
  }

  return {alreadyDelivered: false}
}
