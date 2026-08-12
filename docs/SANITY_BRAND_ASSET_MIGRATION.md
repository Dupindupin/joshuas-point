# Joshua's Point — Site Settings Brand Asset Migration

**Script:** `scripts/migrate-site-settings-brand-assets.mjs`
**Target document:** Published `siteSettings` singleton
**Content changed:** Brand asset references only

## What the migration does

The script reads the approved PNG files from `web/public/brand/`, uploads them to the configured
Sanity dataset when an identical asset is not already present, and updates only these fields:

| Site Settings field  | Approved source file                   |
| -------------------- | -------------------------------------- |
| `primaryLogo`        | `web/public/brand/logo-horizontal.png` |
| `compactLogo`        | `web/public/brand/logo-mark.png`       |
| `squareProfileImage` | `web/public/brand/social-profile.png`  |
| `faviconImage`       | `web/public/brand/favicon-32.png`      |
| `appIconImage`       | `web/public/brand/app-icon.png`        |

It does not change frontend code, other Site Settings fields, logo artwork, or editorial content.

## Safety behavior

- Dry run is the default. No upload or document mutation occurs without `--apply`.
- The script requires explicit project, dataset, and token environment variables.
- The fixed published `siteSettings` document must already exist.
- Every source file must exist and have a valid PNG signature.
- Existing Sanity image assets are reused by SHA-1 content hash.
- Existing field metadata is preserved when the field already points to the approved binary.
- A field containing a different asset stops the migration unless `--apply --force` is explicitly
  used.
- The final asset references are read back and verified after the patch.
- The token value is never printed.

The uploaded brand images are marked decorative in the Sanity image object. The existing Header,
Footer, and structured-data consumers provide their own accessible identity context rather than
using photography-style alt text.

## Required environment variables

```text
SANITY_PROJECT_ID
SANITY_DATASET
SANITY_TOKEN
```

Use a Sanity token with permission to upload image assets and update the target dataset. Keep the
token in a local secret store or ignored environment file. Never commit it, paste it into source
code, or use a `NEXT_PUBLIC_` variable.

## Safe run procedure

### 1. Confirm the repository and source assets

Run from the repository root:

```sh
git status --short
ls web/public/brand/logo-horizontal.png \
  web/public/brand/logo-mark.png \
  web/public/brand/social-profile.png \
  web/public/brand/favicon-32.png \
  web/public/brand/app-icon.png
```

Review the files against `JOSHUAS_POINT_LOGO_FINAL_SPECIFICATION.md` before continuing.

### 2. Provide credentials locally

Set the three environment variables through the local shell, hosting secret manager, or another
non-versioned secret source:

```sh
export SANITY_PROJECT_ID="your-project-id"
export SANITY_DATASET="your-dataset"
export SANITY_TOKEN="your-write-token"
```

Do not place real values in documentation or committed environment examples.

### 3. Run the dry run

```sh
node scripts/migrate-site-settings-brand-assets.mjs
```

Confirm:

- the displayed project and dataset are correct;
- every field is mapped to the intended filename;
- existing approved assets are reported as reusable or already linked; and
- no field-conflict error is present.

The dry run performs read-only Sanity queries. It does not upload or patch anything.

### 4. Apply the migration

```sh
node scripts/migrate-site-settings-brand-assets.mjs --apply
```

Do not use `--force` during a normal migration. If a different asset is already connected, open
Site Settings in Studio and review it first. Use `--apply --force` only after confirming that the
existing field is wrong and should be replaced.

### 5. Review in Studio

Open **Website → Site Settings** and verify:

- Primary Logo
- Compact Logo Mark
- Square Profile Image
- Favicon Reference
- App Icon Reference

Preview Header, Footer, browser icon, structured identity, light theme, dark theme, desktop, and
mobile behavior before treating the migration as complete.

### 6. Remove the token from the shell

```sh
unset SANITY_TOKEN
```

The project ID and dataset are not credentials, but the token must remain private.

## Recovery

Sanity retains document revision history. If the wrong asset is applied, do not edit frontend
fallbacks or upload replacement artwork blindly. Restore the prior Site Settings revision in Studio
or reconnect the previously approved asset, then run the dry run again.
