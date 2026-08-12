import {createHash} from 'node:crypto'
import {readFile} from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import {fileURLToPath} from 'node:url'

import {getCliClient} from 'sanity/cli'

const apiVersion = '2026-08-12'
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const brandDirectory = path.join(projectRoot, 'web/public/brand')

const assetDefinitions = [
  {
    field: 'primaryLogo',
    filename: 'logo-horizontal.png',
  },
  {
    field: 'compactLogo',
    filename: 'logo-mark.png',
  },
  {
    field: 'squareProfileImage',
    filename: 'social-profile.png',
  },
  {
    field: 'faviconImage',
    filename: 'favicon-32.png',
  },
  {
    field: 'appIconImage',
    filename: 'app-icon.png',
  },
]

const supportedArguments = new Set(['--apply', '--force'])
const argumentsSet = new Set(process.argv.slice(2))
const unknownArguments = [...argumentsSet].filter((argument) => !supportedArguments.has(argument))

if (unknownArguments.length > 0) {
  throw new Error(
    `Unknown argument${unknownArguments.length > 1 ? 's' : ''}: ${unknownArguments.join(', ')}`,
  )
}

const applyChanges = argumentsSet.has('--apply')
const forceReplacement = argumentsSet.has('--force')

if (forceReplacement && !applyChanges) {
  throw new Error('--force may be used only together with --apply.')
}

function requireEnvironmentVariable(name) {
  const value = process.env[name]?.trim()
  if (!value) throw new Error(`Missing required environment variable: ${name}`)
  return value
}

function log(message = '') {
  process.stdout.write(`${message}\n`)
}

function isPng(buffer) {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
  return signature.every((byte, index) => buffer[index] === byte)
}

function imageValue(assetId) {
  return {
    _type: 'image',
    asset: {
      _ref: assetId,
      _type: 'reference',
    },
    decorative: true,
  }
}

async function readSourceAsset(definition) {
  const filePath = path.join(brandDirectory, definition.filename)
  const buffer = await readFile(filePath)

  if (!isPng(buffer)) {
    throw new Error(`${definition.filename} is not a valid PNG source asset.`)
  }

  return {
    ...definition,
    buffer,
    filePath,
    sha1hash: createHash('sha1').update(buffer).digest('hex'),
  }
}

async function main() {
  const projectId = requireEnvironmentVariable('SANITY_PROJECT_ID')
  const dataset = requireEnvironmentVariable('SANITY_DATASET')
  const token = requireEnvironmentVariable('SANITY_TOKEN')

  const client = getCliClient({
    apiVersion,
    dataset,
    perspective: 'raw',
    projectId,
    token,
    useCdn: false,
  })

  const sourceAssets = await Promise.all(assetDefinitions.map(readSourceAsset))
  const settingsProjection = assetDefinitions
    .map(({field}) => `${field}{asset->{_id, sha1hash}}`)
    .join(',\n')
  const settings = await client.fetch(
    `*[_id == "siteSettings" && _type == "siteSettings"][0]{_id, _rev, ${settingsProjection}}`,
  )

  if (!settings?._id) {
    throw new Error(
      'The published siteSettings singleton does not exist. Create and review it before running this migration.',
    )
  }

  const plans = await Promise.all(
    sourceAssets.map(async (source) => {
      const matchingAsset = await client.fetch(
        '*[_type == "sanity.imageAsset" && sha1hash == $sha1hash][0]{_id, originalFilename, sha1hash}',
        {sha1hash: source.sha1hash},
      )
      const currentAsset = settings[source.field]?.asset
      const currentMatchesSource = currentAsset?.sha1hash === source.sha1hash

      if (currentAsset?._id && !currentMatchesSource && !forceReplacement) {
        throw new Error(
          `${source.field} already references a different asset (${currentAsset._id}). Review it in Studio or rerun intentionally with --apply --force.`,
        )
      }

      return {
        ...source,
        currentAssetId: currentAsset?._id,
        currentMatchesSource,
        matchingAssetId: matchingAsset?._id,
      }
    }),
  )

  log(`Sanity target: ${projectId}/${dataset}`)
  log(`Mode: ${applyChanges ? 'APPLY' : 'DRY RUN'}`)
  for (const plan of plans) {
    const status = plan.currentMatchesSource
      ? 'already linked'
      : plan.matchingAssetId
        ? 'reuse existing Sanity asset'
        : 'upload required'
    log(`- ${plan.field}: ${plan.filename} — ${status}`)
  }

  if (!applyChanges) {
    log('\nDry run complete. No assets were uploaded and Site Settings was not changed.')
    log('Run again with --apply after reviewing this plan.')
    return
  }

  const resolvedAssets = []
  for (const plan of plans) {
    if (plan.currentMatchesSource) {
      resolvedAssets.push({...plan, assetId: plan.currentAssetId})
      continue
    }

    if (plan.matchingAssetId) {
      resolvedAssets.push({...plan, assetId: plan.matchingAssetId})
      continue
    }

    const uploadedAsset = await client.assets.upload('image', plan.buffer, {
      contentType: 'image/png',
      filename: plan.filename,
      source: {
        id: `web/public/brand/${plan.filename}`,
        name: "Joshua's Point approved brand package",
      },
    })
    resolvedAssets.push({...plan, assetId: uploadedAsset._id})
  }

  const fieldUpdates = Object.fromEntries(
    resolvedAssets
      .filter((asset) => !asset.currentMatchesSource)
      .map((asset) => [asset.field, imageValue(asset.assetId)]),
  )

  if (Object.keys(fieldUpdates).length > 0) {
    await client.patch('siteSettings').set(fieldUpdates).commit()
  }

  const verification = await client.fetch(
    `*[_id == "siteSettings" && _type == "siteSettings"][0]{${settingsProjection}}`,
  )

  for (const asset of resolvedAssets) {
    const verifiedAssetId = verification?.[asset.field]?.asset?._id
    if (verifiedAssetId !== asset.assetId) {
      throw new Error(
        `Verification failed for ${asset.field}: expected ${asset.assetId}, received ${verifiedAssetId ?? 'no asset'}.`,
      )
    }
  }

  log('\nMigration complete. The five Site Settings brand fields reference the approved assets.')
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
  process.exitCode = 1
})
