import assert from 'node:assert/strict'
import test from 'node:test'

import type {PublicHouseAvailability} from '@/lib/availability/types'

import {validateEnquiryAvailability} from './availability-validation'

const availability: PublicHouseAvailability = {
  availabilityConfirmedThrough: '2027-12-31',
  periods: [{startDate: '2027-05-10', endDate: '2027-05-15'}],
}

test('accepts a stay inside the confirmed available window', () => {
  assert.deepEqual(
    validateEnquiryAvailability(
      {arrivalDate: '2027-06-03', departureDate: '2027-06-08'},
      availability,
    ),
    {success: true},
  )
})

test('rejects a stay that overlaps a newly unavailable period', () => {
  const result = validateEnquiryAvailability(
    {arrivalDate: '2027-05-09', departureDate: '2027-05-16'},
    availability,
  )

  assert.equal(result.success, false)
  if (!result.success) assert.match(result.fieldErrors.departureDate ?? '', /no longer available/)
})

test('rejects a stay beyond the current confirmation horizon', () => {
  const result = validateEnquiryAvailability(
    {arrivalDate: '2027-12-30', departureDate: '2028-01-03'},
    availability,
  )

  assert.equal(result.success, false)
  if (!result.success) {
    assert.match(result.fieldErrors.departureDate ?? '', /confirmed availability window/)
  }
})
