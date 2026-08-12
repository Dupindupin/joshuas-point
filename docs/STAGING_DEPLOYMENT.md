# Joshua’s Point Private Staging Deployment

## Scope and safety boundary

The staging deployment uses two new subdomains and does not replace, proxy, redirect, or modify the existing WordPress website.

| Address | Purpose | Change at launch |
| --- | --- | --- |
| `https://joshuaspoint.com` | Existing WordPress website | None |
| `https://preview.joshuaspoint.com` | Private Next.js staging website | Add a new subdomain only |
| `https://studio.joshuaspoint.com` | Sanity Studio and Owner Dashboard | Add a new subdomain only |

Do not change the apex (`@`) or `www` DNS records while creating the staging subdomains.

## Next.js staging website

Deploy the `web/` directory as an independent Next.js project using the variables in `web/.env.staging.example`.

Required non-secret configuration:

| Variable | Staging value |
| --- | --- |
| `NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT` | `staging` |
| `NEXT_PUBLIC_SITE_URL` | `https://preview.joshuaspoint.com` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `8m6fb3x7` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_REVALIDATE_SECRET` | A unique, long staging-only secret shared with the Sanity webhook |
| `NEXT_PUBLIC_MAP_PROVIDER` | `maplibre` |
| `NEXT_PUBLIC_MAPLIBRE_STYLE_URL_LIGHT` | `/maps/styles/joshuas-point-light.json` |
| `NEXT_PUBLIC_MAPLIBRE_STYLE_URL_DARK` | `/maps/styles/joshuas-point-dark.json` |
| `ENQUIRY_EMAIL_MODE` | `disabled` |

MapLibre is also the centralized application default when `NEXT_PUBLIC_MAP_PROVIDER` is absent.
Keep the explicit staging value so the active provider remains visible in deployment settings.
The application also fails safely to `https://preview.joshuaspoint.com` when the deployment is
explicitly marked `staging` but `NEXT_PUBLIC_SITE_URL` is accidentally omitted. Production URL
resolution is unchanged and still uses its own environment value or the published Site Settings
URL.

### Sanity cache revalidation

Create a signed Sanity document webhook after the staging secret is present in xCloud:

- URL: `https://preview.joshuaspoint.com/api/sanity/revalidate`
- method: `POST`
- dataset: `production`
- drafts: excluded
- secret: exactly the value stored as `SANITY_REVALIDATE_SECRET` in xCloud
- projection: `{"_id": coalesce(_id, before()._id), "_type": coalesce(_type, before()._type), "slug": coalesce(slug.current, before().slug.current)}`

The endpoint verifies Sanity's `sanity-webhook-signature` header against the unmodified request
body, then invalidates only an allowlisted set of existing Sanity cache tags. The existing
one-hour query revalidation remains active as a fallback if a webhook delivery is delayed or
missed. Use a separate secret for a future production deployment.

Use the normal Next.js production build and start commands. MapLibre loads the repository’s Joshua’s Point style files, while the styles reference OpenFreeMap vector tiles and glyphs. No Mapbox token is required.

### Private access

Enable password, identity, or deployment protection in the hosting platform for `preview.joshuaspoint.com`. Store access credentials only in that platform. Do not implement or commit a shared password in the application.

### Search protection

The application fails closed: indexing is enabled only when `NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT=production`.

Every non-production deployment receives:

- page metadata with `noindex, nofollow`;
- an `X-Robots-Tag` response header with `noindex, nofollow, noarchive, nosnippet, noimageindex`;
- a `robots.txt` rule disallowing all crawling;
- an empty sitemap;
- no Organization structured data;
- deployment-specific preview canonicals rather than canonicals for the existing WordPress site.

After deployment, verify both the HTML robots metadata and the response header. Access protection remains the primary privacy control; robots directives are not access control.

### Enquiry email

Staging uses `ENQUIRY_EMAIL_MODE=disabled`. Form submissions stop safely before email configuration is loaded and tell the reviewer that no message was sent.

Do not add a production Resend API key, SMTP password, sender credential, or transactional-domain secret to staging. A later controlled email test can use `ENQUIRY_EMAIL_MODE=test` with separate test credentials.

## Sanity Studio

Deploy the repository root as a separate static Studio project:

- install: `npm ci`
- build: `npm run studio:build`
- output directory: `dist`
- SPA fallback: all unknown paths must serve `dist/index.html`

Set:

| Variable | Value |
| --- | --- |
| `SANITY_STUDIO_RESEND_CONFIGURED` | `false` |
| `SANITY_STUDIO_EMAIL_DOMAIN_STATUS` | `not_configured` |
| `SANITY_STUDIO_PUBLIC_SENDER_EMAIL` | empty |
| `SANITY_STUDIO_MAP_PROVIDER_CONFIGURED` | `true` after the preview map is verified |

Only `SANITY_STUDIO_` variables intended for display in the browser may be used here. Never add API keys, write tokens, SMTP passwords, map tokens, GitHub tokens, or deployment credentials.

## xCloud monorepo compatibility

xCloud may detect the repository root even when the website lives in `web/`. The root package scripts therefore delegate the default deployment lifecycle to the Next.js application:

- root `npm run build` installs `web/package-lock.json` and runs `web`'s `next build`;
- root `npm start` runs `web`'s `next start`;
- root `npm run dev` runs the Next.js development server.

This is a deployment safeguard, not a generic workspace conversion. Sanity Studio commands remain explicit under the `studio:*` namespace. The preview website must never use a `studio:*` command.

For xCloud, use `npm ci`, `npm run build`, and `npm start` at the repository root if its monorepo root setting cannot be changed. Configure the xCloud SSR application port as `3001`. Do not use `cd web && ...` as a PM2 start command.

The Studio project and production dataset are fixed in the reviewed Sanity configuration as project `8m6fb3x7`, dataset `production`; they are not secret values.

Sanity authentication remains responsible for Studio access. Add `https://studio.joshuaspoint.com` to the Sanity project CORS origins with authenticated requests enabled. Do not use a wildcard origin.

Sanity-hosted Studio deployment produces a `*.sanity.studio` address. To keep the requested `studio.joshuaspoint.com` address, host the compiled Studio as a static single-page application or register that external Studio through the current Sanity deployment workflow.

## DNS and hosting sequence

1. Create the Next.js staging project from `web/`.
2. Create the Studio static project from the repository root.
3. Confirm both provider-generated preview addresses work before changing DNS.
4. Add a DNS record for `preview` using the exact target supplied by the Next.js host.
5. Add a DNS record for `studio` using the exact target supplied by the Studio host.
6. Leave the apex and `www` records unchanged.
7. Add the Studio origin to Sanity CORS with credentials enabled.
8. Enable hosting-platform access protection for the preview website.
9. Verify TLS certificates for both subdomains.

## Acceptance checks

### Preview website

- The existing WordPress website still resolves normally.
- The preview site reads published content from Sanity project `8m6fb3x7`, dataset `production`.
- `/robots.txt` disallows `/` and does not advertise a sitemap.
- `/sitemap.xml` contains no public URLs.
- Every response includes the staging `X-Robots-Tag` header.
- Page source contains `noindex` and `nofollow`.
- Canonical URLs use `https://preview.joshuaspoint.com`.
- MapLibre renders in light and dark modes and OpenFreeMap attribution remains visible.
- Enquiry submission reports that staging delivery is disabled and sends nothing.
- Hosting-platform access protection is active.

### Studio

- `https://studio.joshuaspoint.com` opens the Owner Dashboard first.
- A Sanity login is required before content can be managed.
- The production dataset is visible.
- Direct links from dashboard issues open the correct documents.
- No secret values appear in the Studio bundle or Owner Dashboard.

## Rollback

Removing only the `preview` and `studio` DNS records disconnects the new staging services. The existing WordPress apex and `www` records are outside this change and remain untouched.
