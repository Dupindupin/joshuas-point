import {Cormorant_Garamond, Fraunces, Instrument_Serif} from 'next/font/google'

import {brandFontVariables} from '@/styles/fonts'

export const instrumentSerif = Instrument_Serif({
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-lab-instrument-serif',
  weight: '400',
})

export const fraunces = Fraunces({
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-lab-fraunces',
  weight: '400',
})

export const cormorantGaramond = Cormorant_Garamond({
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-lab-cormorant-garamond',
  weight: '400',
})

export const typographyLabFontVariables = [
  brandFontVariables,
  instrumentSerif.variable,
  fraunces.variable,
  cormorantGaramond.variable,
].join(' ')

// Add Canela here with next/font/local only after a webfont license is confirmed.
