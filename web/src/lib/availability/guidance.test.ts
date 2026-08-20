import assert from 'node:assert/strict'
import test from 'node:test'

import {getAvailabilityGuidance} from './guidance'
import {getSafeStaySelection, selectStayDate} from './selection'
import type {PublicHouseAvailability} from './types'

const availability: PublicHouseAvailability = {
  availabilityConfirmedThrough: '2026-11-30',
  periods: [{startDate: '2026-09-08', endDate: '2026-09-13'}],
}

test('guides a guest when dates overlap an unavailable period', () => {
  assert.deepEqual(getAvailabilityGuidance(availability, '2026-09-09', '2026-09-12'), {
    message:
      'These dates are unavailable and cannot be submitted. Choose a different arrival and departure, or contact us directly if your dates are flexible.',
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
      'These dates are outside the currently confirmed availability window and cannot be submitted. Choose dates shown in the calendar or contact us directly.',
    tone: 'warning',
  })
})

test('selects an available arrival and departure date', () => {
  const arrival = selectStayDate(
    {arrivalDate: '', departureDate: '', error: null},
    '2026-09-14',
    availability,
  )
  const stay = selectStayDate(arrival, '2026-09-17', availability)

  assert.deepEqual(stay, {
    arrivalDate: '2026-09-14',
    departureDate: '2026-09-17',
    error: null,
  })
})

test('rejects a selected stay that crosses unavailable dates', () => {
  const arrival = selectStayDate(
    {arrivalDate: '', departureDate: '', error: null},
    '2026-09-06',
    availability,
  )
  const stay = selectStayDate(arrival, '2026-09-14', availability)

  assert.equal(stay.arrivalDate, '2026-09-06')
  assert.equal(stay.departureDate, '')
  assert.match(stay.error ?? '', /crosses dates shown as unavailable/)
})

test('preserves only safe selected dates for the enquiry form', () => {
  assert.deepEqual(getSafeStaySelection(availability, '2026-10-02', '2026-10-05'), {
    arrivalDate: '2026-10-02',
    departureDate: '2026-10-05',
    error: null,
  })
  assert.deepEqual(getSafeStaySelection(availability, '2026-09-06', '2026-09-14'), {
    arrivalDate: '',
    departureDate: '',
    error: null,
  })
})
