import assert from 'node:assert/strict'
import test from 'node:test'

import {getAvailabilityGuidance} from './guidance'
import type {PublicHouseAvailability} from './types'

const availability: PublicHouseAvailability = {
  availabilityConfirmedThrough: '2026-11-30',
  periods: [{startDate: '2026-09-08', endDate: '2026-09-13'}],
}

test('guides a guest when dates overlap an unavailable period', () => {
  assert.deepEqual(getAvailabilityGuidance(availability, '2026-09-09', '2026-09-12'), {
    message:
      'These dates overlap dates currently shown as unavailable. You may still enquire if your dates are flexible.',
    tone: 'warning',
  })
})

test('guides a guest when dates are shown as available', () => {
  assert.deepEqual(getAvailabilityGuidance(availability, '2026-10-02', '2026-10-05'), {
    message:
      'These dates are currently shown as available. Your stay is confirmed only after we reply.',
    tone: 'neutral',
  })
})

test('guides a guest when dates extend beyond the confirmation horizon', () => {
  assert.deepEqual(getAvailabilityGuidance(availability, '2026-12-02', '2026-12-05'), {
    message:
      'These dates extend beyond the current confirmation window. We will check them personally.',
    tone: 'neutral',
  })
})
