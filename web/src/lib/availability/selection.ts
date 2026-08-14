import {stayOverlapsUnavailablePeriod, type PublicHouseAvailability} from './types'

export type StayDateSelection = {
  arrivalDate: string
  departureDate: string
  error: string | null
}

const emptySelection: StayDateSelection = {
  arrivalDate: '',
  departureDate: '',
  error: null,
}

export function isDateValue(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))

  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  )
}

export function selectStayDate(
  selection: StayDateSelection,
  date: string,
  availability: PublicHouseAvailability,
): StayDateSelection {
  if (!isDateValue(date)) return selection

  if (!selection.arrivalDate || selection.departureDate || date <= selection.arrivalDate) {
    return {arrivalDate: date, departureDate: '', error: null}
  }

  if (stayOverlapsUnavailablePeriod(selection.arrivalDate, date, availability.periods)) {
    return {
      ...selection,
      departureDate: '',
      error:
        'That stay crosses dates shown as unavailable. Please choose a different departure date.',
    }
  }

  return {arrivalDate: selection.arrivalDate, departureDate: date, error: null}
}

export function getSafeStaySelection(
  availability: PublicHouseAvailability | null | undefined,
  arrivalDate: string | undefined,
  departureDate: string | undefined,
): StayDateSelection {
  if (
    !availability ||
    !arrivalDate ||
    !departureDate ||
    !isDateValue(arrivalDate) ||
    !isDateValue(departureDate) ||
    departureDate <= arrivalDate ||
    arrivalDate > availability.availabilityConfirmedThrough ||
    departureDate > availability.availabilityConfirmedThrough ||
    stayOverlapsUnavailablePeriod(arrivalDate, departureDate, availability.periods)
  ) {
    return emptySelection
  }

  return {arrivalDate, departureDate, error: null}
}

export function enquiryHref(selection: StayDateSelection) {
  const parameters = new URLSearchParams({
    arrival: selection.arrivalDate,
    departure: selection.departureDate,
  })

  return `/contact?${parameters.toString()}#enquiry-form-title`
}
