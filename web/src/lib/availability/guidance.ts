import {
  stayOverlapsUnavailablePeriod,
  type PublicHouseAvailability,
} from './types'

export type AvailabilityGuidance = {
  message: string
  tone: 'neutral' | 'warning'
}

export function getAvailabilityGuidance(
  availability: PublicHouseAvailability | null | undefined,
  arrivalDate: string,
  departureDate: string,
): AvailabilityGuidance | null {
  if (!availability || !arrivalDate || !departureDate || departureDate <= arrivalDate) {
    return null
  }

  if (stayOverlapsUnavailablePeriod(arrivalDate, departureDate, availability.periods)) {
    return {
      message:
        'These dates overlap dates currently shown as unavailable. You may still enquire if your dates are flexible.',
      tone: 'warning',
    }
  }

  if (departureDate > availability.availabilityConfirmedThrough) {
    return {
      message:
        'These dates extend beyond the current confirmation window. We will check them personally.',
      tone: 'neutral',
    }
  }

  return {
    message:
      'These dates are currently shown as available. Your stay is confirmed only after we reply.',
    tone: 'neutral',
  }
}
