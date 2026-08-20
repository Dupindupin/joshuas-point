import 'server-only'

import {createClient} from '@sanity/client'

export type OwnerEnquiryOperationsSummary = {
  lastDeliveryStatus:
    'disabled' | 'failed' | 'notAttempted' | 'partiallySent' | 'pending' | 'sent' | null
  lastSuccessfulOwnerTest: {
    completedAt: string
    referenceNumber: string
  } | null
}

const operationsApiVersion = '2026-08-20'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function configuredTestMailboxes() {
  return [
    process.env.ENQUIRY_OWNER_TEST_EMAIL,
    process.env.ENQUIRY_TO_EMAIL,
    process.env.ENQUIRY_REPLY_TO_EMAIL,
  ]
    .map((value) => value?.trim().toLowerCase())
    .filter((value): value is string => Boolean(value && emailPattern.test(value)))
    .filter((value, index, values) => values.indexOf(value) === index)
}

export async function getOwnerEnquiryOperationsSummary(): Promise<OwnerEnquiryOperationsSummary | null> {
  const projectId = process.env.SANITY_OPERATIONS_PROJECT_ID?.trim()
  const dataset = process.env.SANITY_OPERATIONS_DATASET?.trim()
  const token = process.env.SANITY_OPERATIONS_TOKEN?.trim()
  const testMailboxes = configuredTestMailboxes()

  if (!projectId || !dataset || !token || dataset !== 'operations') return null

  const client = createClient({
    apiVersion: operationsApiVersion,
    dataset,
    perspective: 'published',
    projectId,
    token,
    useCdn: false,
  })

  try {
    return await client.fetch<OwnerEnquiryOperationsSummary>(
      /* groq */ `{
        "lastDeliveryStatus": *[
          _type == "stayEnquiry" && defined(emailDelivery.lastAttemptAt)
        ] | order(emailDelivery.lastAttemptAt desc)[0].emailDelivery.status,
        "lastSuccessfulOwnerTest": *[
          _type == "stayEnquiry" &&
          emailDelivery.status == "sent" &&
          lower(guest.email) in $testMailboxes
        ] | order(emailDelivery.lastAttemptAt desc)[0] {
          "completedAt": emailDelivery.lastAttemptAt,
          referenceNumber
        }
      }`,
      {testMailboxes},
    )
  } catch {
    return null
  }
}
