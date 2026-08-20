import {stayOverlapsUnavailablePeriod, type PublicHouseAvailability} from '@/lib/availability/types'
import {
  beyondAvailabilityHorizonMessage,
  unavailableStayMessage,
} from '@/lib/availability/messages'

import type {EnquiryFormState, EnquirySubmission} from './types'

type AvailabilityValidationResult =
  {success: true} | {fieldErrors: NonNullable<EnquiryFormState['fieldErrors']>; success: false}

export function validateEnquiryAvailability(
  enquiry: Pick<EnquirySubmission, 'arrivalDate' | 'departureDate'>,
  availability: PublicHouseAvailability,
): AvailabilityValidationResult {
  if (
    enquiry.arrivalDate > availability.availabilityConfirmedThrough ||
    enquiry.departureDate > availability.availabilityConfirmedThrough
  ) {
    return {
      fieldErrors: {
        departureDate: beyondAvailabilityHorizonMessage,
      },
      success: false,
    }
  }

  if (
    stayOverlapsUnavailablePeriod(enquiry.arrivalDate, enquiry.departureDate, availability.periods)
  ) {
    return {
      fieldErrors: {
        departureDate: unavailableStayMessage,
      },
      success: false,
    }
  }

  return {success: true}
}
