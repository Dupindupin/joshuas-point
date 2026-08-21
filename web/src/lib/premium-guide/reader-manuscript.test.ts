import assert from 'node:assert/strict'
import test from 'node:test'

import {getReaderChapter, readerChapters, readerChapterSlugs} from './reader-manuscript'

test('Edition 1 exposes nine complete chapters in reading order', () => {
  assert.equal(readerChapters.length, 9)
  assert.equal(new Set(readerChapterSlugs).size, 9)
  assert.equal(readerChapters[0]?.slug, 'from-joshuas-point')
  assert.equal(readerChapters.at(-1)?.slug, 'practical-field-notes')

  for (const chapter of readerChapters) {
    assert.ok(chapter.introduction.length > 40)
    assert.ok(chapter.sections.length > 0)
    assert.equal(getReaderChapter(chapter.slug), chapter)
  }
})

test('reader-facing manuscript contains no editorial workflow language', () => {
  const copy = JSON.stringify(readerChapters)

  for (const phrase of [
    'cms',
    'draft',
    'owner review',
    'production approval',
    'placeholder',
    'replace before',
  ]) {
    assert.doesNotMatch(copy, new RegExp(phrase, 'i'))
  }
})

test('field notes are intentionally styled and map chapters have reader captions', () => {
  assert.ok(
    readerChapters.some((chapter) =>
      chapter.sections.some((section) => section.kind === 'field-notes'),
    ),
  )

  for (const chapter of readerChapters.filter((item) => item.mapCaption)) {
    assert.ok(chapter.journeySlug)
  }
})
