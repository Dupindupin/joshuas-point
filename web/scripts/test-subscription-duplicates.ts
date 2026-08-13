import {
  prepareResendSubscriptionRequest,
  type ResendSubscriptionRequestStatus,
} from '../src/lib/subscriptions/resend-contacts'

const email = 'owner@example.com'
const topicId = 'topic-updates'
const apiKey = 'test-only-key'

type MockResponse = {
  body?: unknown
  status: number
}

function mockFetch(responses: MockResponse[]) {
  const requests: Array<{body?: string; method: string; url: string}> = []
  const fetcher: typeof fetch = async (input, init) => {
    const next = responses.shift()
    if (!next) throw new Error('Unexpected Resend request.')
    requests.push({
      body: typeof init?.body === 'string' ? init.body : undefined,
      method: init?.method ?? 'GET',
      url: String(input),
    })
    return new Response(next.body === undefined ? null : JSON.stringify(next.body), {
      headers: {'Content-Type': 'application/json'},
      status: next.status,
    })
  }
  return {fetcher, requests}
}

async function expectStatus(
  name: string,
  expected: ResendSubscriptionRequestStatus,
  responses: MockResponse[],
  expectedRequests: number,
) {
  const {fetcher, requests} = mockFetch(responses)
  const actual = await prepareResendSubscriptionRequest({apiKey, email, topicId}, fetcher)
  if (actual !== expected) throw new Error(`${name}: expected ${expected}, received ${actual}.`)
  if (requests.length !== expectedRequests) {
    throw new Error(`${name}: expected ${expectedRequests} requests, received ${requests.length}.`)
  }
  console.log(`Passed: ${name}`)
}

async function main() {
  await expectStatus(
    'new address creates one pending contact and permits one confirmation',
    'send-confirmation',
    [{status: 404}, {body: {id: 'contact-new'}, status: 200}],
    2,
  )

  await expectStatus(
    'pending contact suppresses a duplicate confirmation',
    'pending',
    [
      {body: {email, id: 'contact-pending', unsubscribed: true}, status: 200},
      {body: {data: [{id: topicId, subscription: 'opt_out'}]}, status: 200},
    ],
    2,
  )

  await expectStatus(
    'confirmed contact suppresses a duplicate confirmation',
    'confirmed',
    [
      {body: {email, id: 'contact-confirmed', unsubscribed: false}, status: 200},
      {body: {data: [{id: topicId, subscription: 'opt_in'}]}, status: 200},
    ],
    2,
  )

  await expectStatus(
    'existing unrelated contact is marked pending before its first confirmation',
    'send-confirmation',
    [
      {body: {email, id: 'contact-existing', unsubscribed: false}, status: 200},
      {body: {data: []}, status: 200},
      {body: {id: topicId}, status: 200},
    ],
    3,
  )

  await expectStatus(
    'concurrent duplicate observes the newly pending contact and is suppressed',
    'pending',
    [
      {status: 404},
      {status: 409},
      {body: {email, id: 'contact-raced', unsubscribed: true}, status: 200},
      {body: {data: [{id: topicId, subscription: 'opt_out'}]}, status: 200},
    ],
    4,
  )

  console.log('Subscription duplicate handling tests passed. No email was sent.')
}

void main()
