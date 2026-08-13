const resendApi = 'https://api.resend.com'

async function resendRequest(apiKey: string, path: string, method: string, body: unknown) {
  return fetch(`${resendApi}${path}`, {
    ...(method === 'POST' && path.includes('/segments/') ? {} : {body: JSON.stringify(body)}),
    headers: {Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json'},
    method,
    signal: AbortSignal.timeout(10_000),
  })
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
