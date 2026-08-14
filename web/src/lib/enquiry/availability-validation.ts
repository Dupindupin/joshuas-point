import {stayOverlapsUnavailablePeriod, type PublicHouseAvailability} from '@/lib/availability/types'

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
        departureDate:
          'These dates are outside the currently confirmed availability window. Choose dates shown in the calendar or contact us directly.',
      },
      success: false,
    }
  }

  if (
    stayOverlapsUnavailablePeriod(enquiry.arrivalDate, enquiry.departureDate, availability.periods)
  ) {
    return {
      fieldErrors: {
        departureDate:
          'These dates are no longer available. Please choose a different arrival and departure.',
      },
      success: false,
    }
  }

  return {success: true}
}
