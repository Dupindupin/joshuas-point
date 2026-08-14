import 'server-only'

import {createClient, type SanityClient} from '@sanity/client'

import type {StayEnquiryRecord, StayEnquiryRepository, StoredStayEnquiry} from './enquiry-recording'

const operationsApiVersion = '2026-08-14'
const publicWebsiteProjectId = '8m6fb3x7'

type OperationsEnvironmentName =
  'SANITY_OPERATIONS_DATASET' | 'SANITY_OPERATIONS_PROJECT_ID' | 'SANITY_OPERATIONS_TOKEN'

function requiredServerEnvironment(name: OperationsEnvironmentName) {
  const value = process.env[name]?.trim()
  if (!value || /[\r\n]/.test(value)) {
    throw new Error(`${name} is not configured for private operations storage.`)
  }
  return value
}

function createOperationsClient() {
  const dataset = requiredServerEnvironment('SANITY_OPERATIONS_DATASET')
  const projectId = requiredServerEnvironment('SANITY_OPERATIONS_PROJECT_ID')

  if (dataset !== 'operations') {
    throw new Error('Private operations storage must use the operations dataset.')
  }
  if (projectId === publicWebsiteProjectId) {
    throw new Error('Private operations storage must not use the public website project.')
  }

  return createClient({
    apiVersion: operationsApiVersion,
    dataset,
    perspective: 'published',
    projectId,
    token: requiredServerEnvironment('SANITY_OPERATIONS_TOKEN'),
    useCdn: false,
  })
}

export class SanityStayEnquiryRepository implements StayEnquiryRepository {
  private client: SanityClient | undefined

  constructor(private readonly clientFactory: () => SanityClient = createOperationsClient) {}

  private getClient() {
    return (this.client ??= this.clientFactory())
  }

  async ensure(record: StayEnquiryRecord): Promise<StoredStayEnquiry> {
    const document = await this.getClient().createIfNotExists(record)
    return {deliveryStatus: document.emailDelivery?.status ?? 'notAttempted'}
  }

  async setDeliveryStatus(
    documentId: string,
    status: 'failed' | 'pending' | 'sent',
    attemptedAt: string,
  ) {
    await this.getClient()
      .patch(documentId)
      .set({
        'emailDelivery.lastAttemptAt': attemptedAt,
        'emailDelivery.status': status,
      })
      .commit()
  }
}

let repository: SanityStayEnquiryRepository | undefined

export function getStayEnquiryRepository() {
  return (repository ??= new SanityStayEnquiryRepository())
}
