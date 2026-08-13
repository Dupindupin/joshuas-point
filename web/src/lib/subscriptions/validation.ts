const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizeSubscriptionEmail(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return null
  const email = value.trim().toLowerCase()
  return email.length <= 254 && emailPattern.test(email) ? email : null
}
