import {
  stayOverlapsUnavailablePeriod,
  type PublicHouseAvailability,
} from './types'
import {
  beyondAvailabilityHorizonMessage,
  unavailableStayMessage,
} from './messages'

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
      message: unavailableStayMessage,
      tone: 'warning',
    }
  }

  if (departureDate > availability.availabilityConfirmedThrough) {
    return {
      message: beyondAvailabilityHorizonMessage,
      tone: 'warning',
    }
  }

  return {
    message:
      'These dates are currently shown as available. Your stay is confirmed only after we reply.',
    tone: 'neutral',
  }
}
