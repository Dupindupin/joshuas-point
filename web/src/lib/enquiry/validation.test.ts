import assert from 'node:assert/strict'
import test from 'node:test'

import {validateEnquiryForm} from './validation'

function enquiryFormData(guests: number) {
  const formData = new FormData()
  formData.set('name', 'Owner Test')
  formData.set('email', 'owner@example.com')
  formData.set('arrivalDate', '2027-02-10')
  formData.set('departureDate', '2027-02-13')
  formData.set('guests', String(guests))
  formData.set('message', 'We would like to enquire about a private whole-house stay.')
  return formData
}

test('accepts the owner-approved maximum of four guests', () => {
  const result = validateEnquiryForm(enquiryFormData(4))
  assert.equal(result.success, true)
  if (result.success) assert.equal(result.data.guests, 4)
})

test('rejects a stay enquiry above four guests', () => {
  const result = validateEnquiryForm(enquiryFormData(5))
  assert.equal(result.success, false)
  if (!result.success) {
    assert.equal(result.fieldErrors.guests, 'Enter a whole number between 1 and 4.')
  }
})
