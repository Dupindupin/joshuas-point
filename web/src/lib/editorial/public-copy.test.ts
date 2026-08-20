import assert from 'node:assert/strict'
import test from 'node:test'

import {getPublicEditorialCopy, isInternalEditorialCopy} from './public-copy'

test('keeps restrained public photo-story introductions', () => {
  assert.equal(
    getPublicEditorialCopy('A closer look at life over the black volcanic sand.'),
    'A closer look at life over the black volcanic sand.',
  )
})

test('removes internal sequence direction from public copy', () => {
  assert.equal(
    getPublicEditorialCopy(
      'The sequence should show why patient observation matters without becoming a catalogue.',
    ),
    undefined,
  )
})

test('removes common review and placeholder language', () => {
  assert.equal(getPublicEditorialCopy('Photography still needed'), undefined)
  assert.equal(getPublicEditorialCopy('Needs owner verification before publication.'), undefined)
})

test('treats development photography labels as internal production guidance', () => {
  const credit = 'Development photography - not production approved - replace before launch'
  assert.equal(isInternalEditorialCopy(credit), true)
  assert.equal(getPublicEditorialCopy(credit), undefined)
})
