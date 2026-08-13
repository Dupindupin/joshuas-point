# Joshua's Point direct WordPress-to-Next.js cutover runbook

**Status:** Preparation only

**Live WordPress site:** xCloud site `207535`

**Next.js candidate:** xCloud site `242660`

**Target domain:** `https://joshuaspoint.com`

This runbook prepares the existing `preview.joshuaspoint.com` Next.js application to become the
public Joshua's Point website. It does not authorize a domain change, WordPress deletion, content
publication, or email activation.

## 1. Existing deployment

- Repository: `https://github.com/Dupindupin/joshuas-point.git`
- Branch: `main`
- Next.js application directory: `web/`
- xCloud environment file path: `web/.env.production`
- Install: `npm --prefix web ci`
- Build: `npm --prefix web run build`
- Runtime: PM2 starts Next.js from `web/` on the existing Node port.
- Sanity project: `8m6fb3x7`
- Sanity dataset: `production`
- Map provider: MapLibre with bundled Joshua's Point styles.

The current xCloud Next.js application can be converted directly. A second Node application is not
required for the direct-cutover approach. WordPress must remain intact as the rollback target.

## 2. Production environment

Configure these values in the Node.js Environment for xCloud site `242660`. Do not commit real
secrets.

```dotenv
NEXT_PUBLIC_DEPLOYMENT_ENVIRONMENT=production
NEXT_PUBLIC_SITE_URL=https://joshuaspoint.com
NEXT_PUBLIC_SANITY_PROJECT_ID=8m6fb3x7
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_REVALIDATE_SECRET=<production-webhook-secret>

NEXT_PUBLIC_MAP_PROVIDER=maplibre
NEXT_PUBLIC_MAPLIBRE_STYLE_URL_LIGHT=/maps/styles/joshuas-point-light.json
NEXT_PUBLIC_MAPLIBRE_STYLE_URL_DARK=/maps/styles/joshuas-point-dark.json

COMING_SOON_MODE=enabled
COMING_SOON_BYPASS_SECRET=<unique-server-only-review-secret>

ENQUIRY_EMAIL_MODE=disabled
ENQUIRY_EMAIL_PROVIDER=resend
ENQUIRY_FROM_EMAIL="Joshua's Point <enquiries@updates.joshuaspoint.com>"
ENQUIRY_TO_EMAIL=mail@joshuaspoint.com
ENQUIRY_REPLY_TO_EMAIL=mail@joshuaspoint.com
RESEND_API_KEY=<domain-restricted-production-key>
```

With Coming Soon mode enabled:

- public application routes receive the Joshua's Point maintenance page with HTTP `503`;
- responses carry `Retry-After` and `noindex` protections;
- `/robots.txt` disallows crawling;
- `/sitemap.xml` is empty;
- the signed Sanity revalidation endpoint remains available;
- approved reviewers use `/coming-soon?access=1` and receive a secure, HTTP-only 24-hour access
  cookie after entering the server-only review password.

## 3. Pre-cutover verification

- [ ] Create a final xCloud snapshot and database/files backup of WordPress site `207535`.
- [ ] Record the complete DNS zone, including web, MX, SPF, DKIM, DMARC, Resend, and verification
      records.
- [ ] Export or crawl the current WordPress URL inventory.
- [ ] Confirm the latest approved `main` commit is deployed to xCloud site `242660`.
- [ ] Install the production environment with Coming Soon enabled and enquiry email disabled.
- [ ] Redeploy and verify the public maintenance page returns HTTP `503`.
- [ ] Verify the internal-review password opens the complete website without exposing the secret in
      the URL.
- [ ] Verify Home, House, Rooms, Destinations, Dive Guides, Scenic Routes, Explorer, Getting Here,
      FAQ, Plan Your Stay, Contact, Privacy, and Terms.
- [ ] Verify Sanity content, images, MapLibre, accessible map fallbacks, navigation, mobile behavior,
      and themes.
- [ ] Verify production canonical and Open Graph URLs use `https://joshuaspoint.com`.
- [ ] Confirm the contact form fails safely while `ENQUIRY_EMAIL_MODE=disabled`.

## 4. Redirect and SEO protection

- [ ] Match every valuable WordPress URL to an existing Next.js page or an approved permanent
      redirect.
- [ ] Check for redirect chains and loops.
- [ ] Preserve Search Console and other domain-verification DNS records.
- [ ] Approve the default social image before opening the site.
- [ ] Confirm page-specific SEO values override Site Settings defaults.
- [ ] Confirm drafts and `seo.noIndex` documents are absent from public queries.
- [ ] Confirm production Organization and FAQ structured data after Coming Soon mode is disabled.
- [ ] Prepare Search Console sitemap submission for `https://joshuaspoint.com/sitemap.xml`.

## 5. xCloud and domain sequence

1. Freeze WordPress edits and take the final backup.
2. Keep `COMING_SOON_MODE=enabled` on xCloud site `242660`.
3. Remove `joshuaspoint.com` and, if configured, `www.joshuaspoint.com` from WordPress site `207535`.
4. Attach those domains to Next.js site `242660`.
5. Make `https://joshuaspoint.com` the primary canonical domain.
6. Configure a single permanent `www`-to-root redirect.
7. Change root/`www` DNS records only if xCloud's target differs. Preserve every mail and
   verification record.
8. Issue SSL for the root domain and `www` where used; verify renewal, HTTPS redirect, and no mixed
   content.
9. Purge xCloud/OpenLiteSpeed caches.
10. Test the protected main domain and internal website before opening it publicly.

If both sites remain on the same xCloud server address, the web DNS records may not need to change;
the xCloud virtual-host/domain assignment still must change.

## 6. Open the website and activate email

1. Disable `COMING_SOON_MODE` and run a fresh production build/deployment so the production
   indexing headers are regenerated.
2. Verify the main domain, SSL, routes, canonical metadata, robots, sitemap, structured data, maps,
   and redirects.
3. Change `ENQUIRY_EMAIL_MODE=live` only after the website is stable.
4. Run one controlled end-to-end enquiry test.
5. Confirm the internal notification, guest confirmation, reply-to behavior, spam placement, and
   Resend delivery logs.
6. If email fails, return only `ENQUIRY_EMAIL_MODE` to `disabled`; the website can remain live.

After launch, redirect `preview.joshuaspoint.com` permanently to the main domain or remove it from
the production application. Do not serve duplicate indexable content on both hostnames.

## 7. Rollback

Rollback triggers include invalid SSL, unavailable critical routes, widespread content/image
failure, incorrect production `noindex`, serious redirect failure, or DNS/email disruption.

1. Re-enable Coming Soon mode on the Next.js site.
2. Remove the main domain from xCloud site `242660`.
3. Reattach it to WordPress site `207535`.
4. Restore prior web DNS records if they changed.
5. Purge xCloud/OpenLiteSpeed caches.
6. Verify WordPress, HTTPS, and mail-related DNS.

Keep WordPress intact and disconnected from the public domain until the agreed stabilization period
has passed and Tobias separately approves its retirement.
