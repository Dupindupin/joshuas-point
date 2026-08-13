const resendApi = 'https://api.resend.com'

type Fetcher = typeof fetch

type ResendTopic = {
  id: string
  subscription: 'opt_in' | 'opt_out'
}

export type ResendSubscriptionRequestStatus = 'confirmed' | 'pending' | 'send-confirmation'

async function resendRequest(
  apiKey: string,
  path: string,
  method: string,
  body?: unknown,
  fetcher: Fetcher = fetch,
) {
  return fetcher(`${resendApi}${path}`, {
    ...(body === undefined || (method === 'POST' && path.includes('/segments/'))
      ? {}
      : {body: JSON.stringify(body)}),
    headers: {Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json'},
    method,
    signal: AbortSignal.timeout(10_000),
  })
}

async function contactTopics(response: Response) {
  const body = (await response.json()) as {data?: ResendTopic[]}
  return Array.isArray(body.data) ? body.data : []
}

export async function prepareResendSubscriptionRequest(
  {
    apiKey,
    email,
    topicId,
  }: {
    apiKey: string
    email: string
    topicId: string
  },
  fetcher: Fetcher = fetch,
): Promise<ResendSubscriptionRequestStatus> {
  const contactPath = `/contacts/${encodeURIComponent(email)}`
  const contact = await resendRequest(apiKey, contactPath, 'GET', undefined, fetcher)

  if (contact.status === 404) {
    const create = await resendRequest(
      apiKey,
      '/contacts',
      'POST',
      {
        email,
        topics: [{id: topicId, subscription: 'opt_out'}],
        unsubscribed: true,
      },
      fetcher,
    )
    if (create.ok) return 'send-confirmation'
    if (create.status !== 409) {
      throw new Error(`Resend pending contact creation failed (${create.status}).`)
    }

    // A concurrent request created the contact first. Re-read its topic state
    // instead of sending a second confirmation email.
    return prepareResendSubscriptionRequest({apiKey, email, topicId}, fetcher)
  }

  if (!contact.ok) throw new Error(`Resend contact lookup failed (${contact.status}).`)

  const topicsResponse = await resendRequest(
    apiKey,
    `${contactPath}/topics`,
    'GET',
    undefined,
    fetcher,
  )
  if (!topicsResponse.ok) {
    throw new Error(`Resend contact topic lookup failed (${topicsResponse.status}).`)
  }
  const topic = (await contactTopics(topicsResponse)).find((entry) => entry.id === topicId)
  if (topic?.subscription === 'opt_in') return 'confirmed'
  if (topic) return 'pending'

  // Existing contacts from another workflow are not subscribers yet. Mark the
  // requested topic as pending before sending the first confirmation.
  const pending = await resendRequest(
    apiKey,
    `${contactPath}/topics`,
    'PATCH',
    {topics: [{id: topicId, subscription: 'opt_out'}]},
    fetcher,
  )
  if (!pending.ok) {
    throw new Error(`Resend pending topic update failed (${pending.status}).`)
  }
  return 'send-confirmation'
}

export async function confirmResendSubscription({
  apiKey,
  email,
  segmentId,
  topicId,
}: {
  apiKey: string
  email: string
  segmentId: string
  topicId: string
}) {
  const create = await resendRequest(apiKey, '/contacts', 'POST', {
    email,
    segments: [{id: segmentId}],
    topics: [{id: topicId, subscription: 'opt_in'}],
    unsubscribed: false,
  })
  if (create.ok) return
  if (create.status !== 409) throw new Error(`Resend contact creation failed (${create.status}).`)

  const contactPath = `/contacts/${email}`
  const update = await resendRequest(apiKey, contactPath, 'PATCH', {unsubscribed: false})
  if (!update.ok) throw new Error(`Resend contact update failed (${update.status}).`)
  const topic = await resendRequest(apiKey, `${contactPath}/topics`, 'PATCH', {
    topics: [{id: topicId, subscription: 'opt_in'}],
  })
  if (!topic.ok) throw new Error(`Resend topic update failed (${topic.status}).`)
  const segment = await resendRequest(apiKey, `${contactPath}/segments/${segmentId}`, 'POST', {})
  if (!segment.ok && segment.status !== 409) {
    throw new Error(`Resend segment update failed (${segment.status}).`)
  }
}
