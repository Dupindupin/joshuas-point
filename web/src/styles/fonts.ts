import {Manrope, Newsreader} from 'next/font/google'

export const brandDisplayFont = Newsreader({
  display: 'swap',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-jp-display',
  weight: ['400', '500', '600'],
})

export const brandBodyFont = Manrope({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-jp-body',
})

export const brandDisplayFontName = 'Newsreader'
export const brandBodyFontName = 'Manrope'

export const brandFontVariables = `${brandDisplayFont.variable} ${brandBodyFont.variable}`
