import assert from 'node:assert/strict'
import test from 'node:test'

import {requiresTextLedDestination, requiresTextLedScenicRoute} from './photography-readiness'

test('destinations awaiting approved photography remain text-led', () => {
  for (const slug of ['pulangbato-falls', 'siaton', 'twin-lakes', 'valencia']) {
    assert.equal(requiresTextLedDestination(slug), true)
  }
  assert.equal(requiresTextLedDestination('casaroro-falls'), false)
})

test('Twin Lakes Escape remains text-led', () => {
  assert.equal(requiresTextLedScenicRoute('twin-lakes-escape'), true)
  assert.equal(requiresTextLedScenicRoute('waterfall-explorer'), false)
})
