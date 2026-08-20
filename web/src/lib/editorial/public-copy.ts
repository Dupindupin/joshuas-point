const internalEditorialPatterns = [
  /\bthe sequence should\b/i,
  /\bthis (?:photo )?story should\b/i,
  /\binternal (?:editorial )?(?:note|guidance|review)\b/i,
  /\bfor (?:editorial|owner) review\b/i,
  /\bphotography still needed\b/i,
  /\bplaceholder (?:copy|content|image|photography)\b/i,
  /\bneeds? (?:owner )?(?:approval|confirmation|verification)\b/i,
  /\bdevelopment photography\b/i,
  /\bnot production approved\b/i,
  /\breplace before launch\b/i,
] as const

export function isInternalEditorialCopy(value: string | null | undefined) {
  const copy = value?.trim()
  return Boolean(copy && internalEditorialPatterns.some((pattern) => pattern.test(copy)))
}

/** Keeps Studio production guidance from becoming public editorial copy. */
export function getPublicEditorialCopy(value: string | null | undefined) {
  const copy = value?.trim()
  if (!copy) return undefined
  return isInternalEditorialCopy(copy) ? undefined : copy
}
