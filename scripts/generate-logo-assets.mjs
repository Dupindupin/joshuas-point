import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

import sharp from '../web/node_modules/sharp/dist/index.mjs'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = path.join(projectRoot, 'web/public/brand')
const cssDirectory = path.join(projectRoot, 'web/.next/static/css')
const sourceDirectory = path.join(projectRoot, 'scripts/logo-source')

const palette = {
  charcoal: '#282828',
  deepOcean: '#1F3D3A',
  forest: '#496B5B',
  linen: '#F3EDE6',
  warmSand: '#C8A26A',
}

const primarySignature = JSON.parse(
  fs.readFileSync(path.join(sourceDirectory, 'primary-signature.json'), 'utf8'),
)
const compactSignature = JSON.parse(
  fs.readFileSync(path.join(sourceDirectory, 'compact-signature.json'), 'utf8'),
)

function readBuiltFont(family) {
  const css = fs
    .readdirSync(cssDirectory)
    .filter((file) => file.endsWith('.css'))
    .map((file) => fs.readFileSync(path.join(cssDirectory, file), 'utf8'))
    .join('\n')

  const expression = new RegExp(
    `@font-face\\{font-family:${family};[^}]*src:url\\(/_next/static/media/([^)]*?\\.woff2)\\)[^}]*unicode-range:u\\+00\\?\\?`,
    'i',
  )
  const match = css.match(expression)

  if (!match) {
    throw new Error(
      `Could not locate the built ${family} Latin font. Run the web production build first.`,
    )
  }

  return fs
    .readFileSync(path.join(projectRoot, 'web/.next/static/media', match[1]))
    .toString('base64')
}

const newsreader = readBuiltFont('Newsreader')
const manrope = readBuiltFont('Manrope')

const fontStyles = `
  @font-face {
    font-family: "JP Newsreader";
    src: url("data:font/woff2;base64,${newsreader}") format("woff2");
    font-style: normal;
    font-weight: 400 600;
  }
  @font-face {
    font-family: "JP Manrope";
    src: url("data:font/woff2;base64,${manrope}") format("woff2");
    font-style: normal;
    font-weight: 400 600;
  }
  .wordmark {
    font-family: "JP Newsreader", Georgia, serif;
    font-weight: 500;
  }
  .tagline {
    font-family: "JP Manrope", Arial, sans-serif;
    font-weight: 500;
  }
`

function signatureMarkup(signature, markColor) {
  return `<path fill="${markColor}" fill-rule="evenodd" d="${signature.darkPath}" />
  <path fill="${palette.warmSand}" fill-rule="evenodd" d="${signature.goldPath}" />`
}

function documentShell({
  width,
  height,
  title,
  description,
  content,
  background,
  includeFonts = true,
}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title description">
  <title id="title">${title}</title>
  <desc id="description">${description}</desc>
  ${includeFonts ? `<style>${fontStyles}</style>` : ''}
  ${background ? `<rect width="${width}" height="${height}" fill="${background}" />` : ''}
  ${content}
</svg>
`
}

function horizontalLogo({light = false, background} = {}) {
  const markColor = light ? palette.linen : palette.deepOcean
  const wordColor = light ? palette.linen : palette.charcoal

  return documentShell({
    width: 1200,
    height: 360,
    title: "Joshua's Point horizontal logo",
    description:
      "The approved handwritten JP signature and landscape line above the Joshua's Point wordmark and the tagline A place between sea and mountain.",
    background,
    content: `
  <g transform="translate(180 18) scale(1.35)">
    ${signatureMarkup(primarySignature, markColor)}
  </g>
  <text class="wordmark" x="600" y="276" fill="${wordColor}" font-size="59" letter-spacing="5" text-anchor="middle">JOSHUA’S POINT</text>
  <text class="tagline" x="600" y="326" fill="${palette.warmSand}" font-size="17" letter-spacing="5.5" text-anchor="middle">A PLACE BETWEEN SEA AND MOUNTAIN</text>`,
  })
}

function stackedLogo() {
  return documentShell({
    width: 640,
    height: 720,
    title: "Joshua's Point stacked logo",
    description:
      "The approved handwritten JP signature and landscape line above the stacked Joshua's Point wordmark and the tagline A place between sea and mountain.",
    content: `
  <g transform="translate(98 105) scale(0.82)">
    ${signatureMarkup(primarySignature, palette.deepOcean)}
  </g>
  <text class="wordmark" x="320" y="335" fill="${palette.charcoal}" font-size="56" letter-spacing="4.5" text-anchor="middle">JOSHUA’S</text>
  <text class="wordmark" x="320" y="405" fill="${palette.charcoal}" font-size="56" letter-spacing="4.5" text-anchor="middle">POINT</text>
  <text class="tagline" x="320" y="478" fill="${palette.warmSand}" font-size="13" letter-spacing="4" text-anchor="middle">A PLACE BETWEEN</text>
  <text class="tagline" x="320" y="510" fill="${palette.warmSand}" font-size="13" letter-spacing="4" text-anchor="middle">SEA AND MOUNTAIN</text>
  <path d="M290 552 H350" fill="none" stroke="${palette.warmSand}" stroke-linecap="round" stroke-width="2" />`,
  })
}

function compactLogo({light = false, background, title, description} = {}) {
  const markColor = light ? palette.linen : palette.deepOcean

  return documentShell({
    width: 512,
    height: 512,
    title: title ?? "Joshua's Point compact mark",
    description:
      description ?? 'The approved Signature No. 5 JP mark with its warm point and flowing line.',
    background,
    includeFonts: false,
    content: `<g transform="translate(59 183) scale(2.05)">
    ${signatureMarkup(compactSignature, markColor)}
  </g>`,
  })
}

function faviconLogo() {
  return documentShell({
    width: 64,
    height: 64,
    title: "Joshua's Point favicon",
    description: 'The approved Signature No. 5 mark in linen on a deep ocean circle.',
    includeFonts: false,
    content: `
  <circle cx="32" cy="32" r="30" fill="${palette.deepOcean}" />
  <g transform="translate(5 22.5) scale(0.28)">
    ${signatureMarkup(compactSignature, palette.linen)}
  </g>`,
  })
}

const vectorAssets = {
  'logo-horizontal.svg': horizontalLogo(),
  'logo-stacked.svg': stackedLogo(),
  'logo-mark.svg': compactLogo(),
  'logo-light.svg': horizontalLogo({light: true}),
  'logo-dark.svg': horizontalLogo(),
  'favicon.svg': faviconLogo(),
}

fs.mkdirSync(outputDirectory, {recursive: true})

for (const [name, contents] of Object.entries(vectorAssets)) {
  fs.writeFileSync(path.join(outputDirectory, name), contents)
}

const rasterAssets = [
  ['logo-horizontal.png', horizontalLogo(), 1200, 360],
  ['logo-stacked.png', stackedLogo(), 640, 720],
  ['logo-mark.png', compactLogo(), 512, 512],
  ['logo-light.png', horizontalLogo({light: true}), 1200, 360],
  ['logo-dark.png', horizontalLogo(), 1200, 360],
  [
    'social-profile.png',
    compactLogo({
      background: palette.linen,
      title: "Joshua's Point social profile image",
      description: 'The approved Signature No. 5 mark on a warm linen square.',
    }),
    1080,
    1080,
  ],
  [
    'app-icon.png',
    compactLogo({
      light: true,
      background: palette.deepOcean,
      title: "Joshua's Point application icon",
      description: 'The approved Signature No. 5 mark in linen on a deep ocean square.',
    }),
    1024,
    1024,
  ],
  [
    'apple-touch-icon.png',
    compactLogo({
      light: true,
      background: palette.deepOcean,
      title: "Joshua's Point Apple touch icon",
      description: 'The approved Signature No. 5 mark in linen on a deep ocean square.',
    }),
    180,
    180,
  ],
  ['favicon-32.png', faviconLogo(), 32, 32],
]

for (const [name, contents, width, height] of rasterAssets) {
  await sharp(Buffer.from(contents))
    .resize(width, height)
    .png({compressionLevel: 9})
    .toFile(path.join(outputDirectory, name))
}

const faviconPng = fs.readFileSync(path.join(outputDirectory, 'favicon-32.png'))
const faviconHeader = Buffer.alloc(22)
faviconHeader.writeUInt16LE(0, 0)
faviconHeader.writeUInt16LE(1, 2)
faviconHeader.writeUInt16LE(1, 4)
faviconHeader.writeUInt8(32, 6)
faviconHeader.writeUInt8(32, 7)
faviconHeader.writeUInt8(0, 8)
faviconHeader.writeUInt8(0, 9)
faviconHeader.writeUInt16LE(1, 10)
faviconHeader.writeUInt16LE(32, 12)
faviconHeader.writeUInt32LE(faviconPng.length, 14)
faviconHeader.writeUInt32LE(faviconHeader.length, 18)
fs.writeFileSync(
  path.join(projectRoot, 'web/src/app/favicon.ico'),
  Buffer.concat([faviconHeader, faviconPng]),
)

console.log(
  `Generated ${Object.keys(vectorAssets).length} SVG and ${rasterAssets.length} PNG logo assets in ${outputDirectory}`,
)
