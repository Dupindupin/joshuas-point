export type PublicAvailabilityPeriod = {
  endDate: string
  startDate: string
}

export type PublicHouseAvailability = {
  availabilityConfirmedThrough: string
  periods: PublicAvailabilityPeriod[]
}

export function stayOverlapsUnavailablePeriod(
  arrivalDate: string,
  departureDate: string,
  periods: PublicAvailabilityPeriod[],
) {
  if (!arrivalDate || !departureDate || departureDate <= arrivalDate) return false

  return periods.some((period) => arrivalDate < period.endDate && period.startDate < departureDate)
}
