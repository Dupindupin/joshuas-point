import assert from 'node:assert/strict'
import test from 'node:test'

import {resolveEnquiryDeliveryState} from './email-status'

test('reports an intentionally disabled configured system as disabled by owner', () => {
  assert.equal(
    resolveEnquiryDeliveryState({
      configured: true,
      lastDeliveryStatus: 'sent',
      mode: 'disabled',
    }),
    'disabledByOwner',
  )
})

test('reports enabled and healthy delivery as system ready', () => {
  assert.equal(
    resolveEnquiryDeliveryState({
      configured: true,
      lastDeliveryStatus: 'sent',
      mode: 'live',
    }),
    'systemReady',
  )
})

test('reports the latest failed or partial delivery as an error', () => {
  for (const lastDeliveryStatus of ['failed', 'partiallySent'] as const) {
    assert.equal(
      resolveEnquiryDeliveryState({configured: true, lastDeliveryStatus, mode: 'live'}),
      'deliveryError',
    )
  }
})

test('reports incomplete configuration as unavailable', () => {
  assert.equal(
    resolveEnquiryDeliveryState({
      configured: false,
      lastDeliveryStatus: null,
      mode: 'disabled',
    }),
    'unavailable',
  )
})
