import 'server-only'

import {createClient} from '@sanity/client'

export type OwnerEnquiryOperationsSummary = {
  lastDeliveryStatus:
    'disabled' | 'failed' | 'notAttempted' | 'partiallySent' | 'pending' | 'sent' | null
  lastSuccessfulOwnerTest: {
    completedAt: string
    referenceNumber: string
  } | null
  newEnquiryCount: number
  nextArrival: {
    arrival: string
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
    const today = new Intl.DateTimeFormat('en-CA', {timeZone: 'Asia/Manila'}).format(new Date())

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
        },
        "newEnquiryCount": count(*[_type == "stayEnquiry" && status == "new"]),
        "nextArrival": *[
          _type == "wholeHouseStay" &&
          status == "confirmed" &&
          dates.arrival >= $today
        ] | order(dates.arrival asc)[0] {
          "arrival": dates.arrival,
          referenceNumber
        }
      }`,
      {testMailboxes, today},
    )
  } catch {
    return null
  }
}
