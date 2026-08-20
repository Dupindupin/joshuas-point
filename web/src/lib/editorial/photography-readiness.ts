const textLedDestinationSlugs = new Set(['pulangbato-falls', 'siaton', 'twin-lakes', 'valencia'])

const textLedScenicRouteSlugs = new Set(['twin-lakes-escape'])

export function requiresTextLedDestination(slug: string) {
  return textLedDestinationSlugs.has(slug)
}

export function requiresTextLedScenicRoute(slug: string) {
  return textLedScenicRouteSlugs.has(slug)
}
