# Joshua's Point — Social Presence & Sharing Guide

**Status:** Version 1 launch reference
**Owner authority:** Tobias Steger
**Website:** <https://joshuaspoint.com/>

## Purpose

Joshua's Point should have one recognizable public identity across the website and the social
accounts Tobias has approved. Social presence extends the editorial invitation; it must not turn
Joshua's Point into a hotel campaign, a volume-driven content channel, or a collection of invented
experiences.

The website's Site Settings document is the single source for public social-profile URLs. The
footer, Contact page, and structured data consume the same list. An account that is absent, empty,
unsupported, malformed, or not approved remains invisible.

## Confirmed official accounts

| Platform | Official account name | Identifier | Confirmed URL | Status |
| --- | --- | --- | --- | --- |
| Instagram | Joshua’s Point | `@joshuaspoint` | <https://www.instagram.com/joshuaspoint/> | Confirmed by Tobias; public profile resolves |
| Facebook | Joshua’s Point | No username approved | <https://www.facebook.com/profile.php?id=61578440434300> | Confirmed by Tobias; URL resolves to the Joshua’s Point profile |
| YouTube | — | — | — | Not confirmed; do not expose |
| TikTok | — | — | — | Not confirmed; do not expose |
| Pinterest | — | — | — | Not confirmed; do not expose |

Do not infer a YouTube, TikTok, Pinterest, Facebook username, shortened URL, or vanity URL from the
brand name. Add a platform only after Tobias supplies and approves its exact public profile URL.

## Site Settings entry

Enter confirmed profiles at:

> Site Settings → Footer → Social Links

Use these values:

| Platform value | URL |
| --- | --- |
| Instagram | `https://www.instagram.com/joshuaspoint/` |
| Facebook | `https://www.facebook.com/profile.php?id=61578440434300` |

The current production dataset does not contain a published `siteSettings` singleton. The social
accounts therefore remain intentionally absent from public website UI and structured data until
Site Settings is completed, the default social image is approved, and the singleton is published.

Do not hard-code these URLs into the footer, Contact page, JSON-LD, or individual page files.

The **Social Presence** group also owns:

- The required square profile image used by verified Organization structured data.
- Up to three optional Home Instagram selections.

Each selected post stores an approved original editorial image in Sanity, a short optional caption,
and the exact Instagram post URL. Destination documents expose the same optional selection only
when the posts genuinely deepen that destination story.

## Identity convention

### Profile name

Use **Joshua’s Point** as the display name wherever the platform permits it. Use one consistent
apostrophe style and capitalization. A location may be included in the profile's descriptive fields
when useful, but it should not replace or fragment the core name.

### Username and handle

- Keep the confirmed Instagram handle `@joshuaspoint`.
- Do not invent, rename, or claim a handle for another platform through this project.
- If Tobias later approves a new account, prefer the closest available form of `joshuaspoint` and
  record the exact final URL in Site Settings.

### Website URL

Use the canonical homepage:

> `https://joshuaspoint.com/`

Remove obsolete `/coming-soon` links once the production site is live. The reviewed Instagram
profile currently links to `joshuaspoint.com/coming-soon`, so that profile field requires an owner
update at launch.

## Profile bio direction

The bio should answer three things in very little space:

1. Joshua's Point is a home connected to nature.
2. It is a place from which to discover Southern Negros.
3. The website is the authoritative place to learn more or begin an enquiry.

Use approved language such as:

> A home connected to nature, and a quiet place from which to discover Southern Negros.

This is a direction, not a requirement to force identical punctuation into every platform.

Avoid:

- “Dream vacation,” “luxury escape,” “exclusive,” “paradise,” or hotel/resort terminology.
- Unsupported location, amenity, availability, price, or ranking claims.
- Emoji-heavy bios that make the identity feel generic or promotional.
- Multiple competing booking, messenger, or link-collection destinations at launch.
- Claims that could describe any accommodation in the Philippines.

The reviewed Instagram bio currently uses “Your dream vacation.” It should be replaced before the
account is presented as launch-ready because it conflicts with the approved Joshua's Point voice.

## Profile image and logo

- Use one owner-approved square identity image across confirmed accounts.
- Prefer the established Joshua's Point wordmark or a simple approved brand mark with enough clear
  space to remain legible in a circular crop.
- Do not create an alternate social logo, badge, hotel star mark, or platform-specific identity.
- Test the asset at small avatar size in Light and Dark platform interfaces.
- Keep the original file, crop decision, and approval record with the brand assets.

No new profile image is approved by this document. Tobias must select the final asset.

## Cover and header imagery

When a platform supports a cover/header image:

- Use truthful owner photography showing Joshua's Point in relationship with the landscape.
- Prefer a wide house-and-land composition with generous negative space and a mobile-safe focal
  area.
- Keep the image natural; avoid global darkening, heavy filters, harsh HDR, and oversaturation.
- Avoid text baked into the photograph unless the platform genuinely requires it.
- Do not substitute a destination photograph for the house or imply that a regional place is on the
  property.
- Recheck crops on desktop and mobile because platforms crop the same source differently.

No cover image becomes final without owner approval.

## Website social sharing hierarchy

Every public launch page should emit:

- A canonical URL.
- Open Graph title and description.
- Open Graph image.
- Twitter/X card title, description, image, and card type.

Image selection follows this order:

1. Page-specific SEO social image from Sanity.
2. The page's truthful owner hero image, when the page model supplies one.
3. The approved Site Settings default social image.

The final fallback cannot work until `siteSettings.defaultSocialImage` is populated and published.
Pages without an image must not borrow an unrelated destination or activity photograph merely to
produce a large card.

### Launch route expectations

| Area | Preferred social image |
| --- | --- |
| Home | Home SEO image, then Home hero |
| The House | House SEO image, then CMS hero; otherwise the Site Settings default |
| Rooms | Rooms SEO image, then the first approved room preview; otherwise the default |
| Destinations index | Index SEO image, then index hero; otherwise the default |
| Destination detail | Destination SEO image, then that destination's hero; otherwise the default |
| Scenic Routes index | Index SEO image, then index hero; otherwise the default |
| Scenic Route detail | Route SEO image, then that route's hero; otherwise the default |
| Southern Negros Guide | Approved Site Settings default unless a dedicated guide image is added later |
| Dive Guide index | Index SEO image, then index hero; otherwise the default |
| Dive Guide detail | Dive SEO image, then that guide's hero; otherwise the default |
| Plan Your Stay | Approved Site Settings default |

## Structured data

The root website may emit an `Organization` entity only when published Site Settings supplies a
verified site title and canonical site URL. Its `sameAs` array is derived from the same confirmed
social list used by the footer and Contact page.

Do not add `LodgingBusiness`, address, telephone, price range, ratings, reviews, availability,
amenities, or booking claims until the relevant Site Settings facts and business identity are
verified and approved for structured data.

## Instagram integration and privacy

Version 1 does **not** load Instagram embeds, iframes, tracking pixels, or Meta JavaScript. Selected
Instagram moments are rendered from owner-approved images stored in Sanity and link outward to the
confirmed post. Images use the existing responsive Next.js pipeline and remain lazy-loaded below
the Home hero.

This approach means:

- Instagram availability cannot break the page.
- Meta receives no page-view request merely because someone visits Joshua's Point.
- The Home page remains complete when no posts are selected; it shows a quiet profile link instead.
- Destination pages show nothing unless an editor deliberately selects at least one relevant post.
- No Instagram content contributes to the Hero or LCP path.

If a future release introduces native Instagram embeds, it requires a new privacy and performance
review, lazy activation, documented third-party data behavior, and any consent treatment required by
the production jurisdiction. Do not add Meta scripts globally.

## Link behavior and accessibility

- Social profiles use visible platform names; no unlabeled icon-only links are needed.
- Each link has an accessible label naming the platform, Joshua's Point, and the new-tab behavior.
- External links use HTTPS, open in a new tab, and apply `rel="noreferrer"`.
- An empty or unsupported profile renders no link and no “Social” heading.
- Platform identity is communicated in text, not color or icon shape alone.
- Social links must remain keyboard reachable with a visible focus indicator.

## Editorial use of social channels

Social posts should follow the same source rules as the website:

- Tobias's observations and existing Joshua's Point content come first.
- Preserve the meaning; improve grammar and pacing without replacing the voice.
- Use real places, weather, routes, photographs, and moments.
- Keep practical claims conservative and current.
- Send readers to the relevant canonical page, not a generic conversion funnel.
- Do not publish private family meaning or internal verification notes.
- Do not post simply to satisfy a frequency target.

## Launch verification checklist

- [ ] Complete and publish Site Settings.
- [ ] Enter only the confirmed Instagram and Facebook URLs.
- [ ] Confirm Instagram still resolves to `@joshuaspoint`.
- [ ] Confirm Facebook still resolves to the official Joshua's Point profile.
- [ ] Replace the Instagram `/coming-soon` website URL with the canonical homepage.
- [ ] Replace the current Instagram “dream vacation” bio with approved brand-aligned wording.
- [ ] Align public profile names with **Joshua’s Point**.
- [ ] Select and approve the shared square profile image.
- [ ] Select and approve any platform cover/header image.
- [ ] Select and publish the 1200 × 630 default social image in Site Settings.
- [ ] Confirm the footer and Contact page show exactly Instagram and Facebook.
- [ ] Confirm no placeholder icon or empty Social heading appears.
- [ ] Keyboard-test both links and their focus indicators.
- [ ] Confirm external-link accessible labels communicate platform and new-tab behavior.
- [ ] Inspect Organization JSON-LD and confirm `sameAs` contains the same two URLs.
- [ ] Test Home, House, Rooms, index pages, one image-rich detail page, and one image-light page with
  Facebook Sharing Debugger and a representative Open Graph/Twitter card inspector.
- [ ] Confirm canonical URL, title, description, image dimensions/crop, and card type after the
  production deployment is live.

## Owner social URLs still required

No additional URL is required for Version 1 if Instagram and Facebook are the complete approved
social presence.

Exact owner-approved public URLs are still required before exposing any of these optional channels:

- YouTube.
- TikTok.
- Pinterest.

Until Tobias provides one, the platform remains absent from Site Settings and invisible everywhere
on the public website.
