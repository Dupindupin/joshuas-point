# Joshua's Point — Sanity Studio Asset Upload Checklist

**Document type:** Internal asset-entry checklist
**Scope:** Site Settings and The House
**Public website copy:** No

## Purpose

Use this checklist when approved assets are ready to enter Sanity Studio. It records where each
asset belongs and what must be reviewed before publication. It does not approve an asset, replace
the photography records, or authorize uploading development photography as final media.

Source documents:

- `JOSHUAS_POINT_LOGO_FINAL_SPECIFICATION.md`
- `JOSHUAS_POINT_BRAND_BOOK.md`
- `THE_HOUSE_SELECTED_PHOTOGRAPHY.md`
- `THE_HOUSE_PHOTOGRAPHY_BRIEF.md`
- `THE_HOUSE_VERIFICATION_RECORD.md`
- `THE_HOUSE_SANITY_CONTENT_ENTRY_GUIDE.md`
- `THE_HOUSE_PRE_SANITY_CHECKLIST.md`

---

## 1. Site Settings → Brand Assets

Open **Website → Site Settings → Identity** and **Social Presence**. Use the existing approved
artwork from `web/public/brand/`. Do not redraw, crop into a new composition, recolour, retype, or
change the proportions of any logo.

| Sanity field         | Required asset                           | Existing source file                   | Recommended upload format    | Purpose                                                                                                                        |
| -------------------- | ---------------------------------------- | -------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `primaryLogo`        | Approved horizontal Joshua's Point logo  | `web/public/brand/logo-horizontal.png` | PNG with transparency        | Full brand identity used by the Header, Footer, and shared brand contexts. The local logo remains the frontend fallback.       |
| `compactLogo`        | Approved Signature No. 5 JP compact mark | `web/public/brand/logo-mark.png`       | Square PNG with transparency | Compact Header identity and organization-logo contexts where the full horizontal logo is unsuitable.                           |
| `squareProfileImage` | Approved square social profile asset     | `web/public/brand/social-profile.png`  | 1080 × 1080 PNG              | Consistent social identity and Site Settings profile-image source. This field is required by the current Site Settings schema. |
| `faviconImage`       | Approved compact favicon reference       | `web/public/brand/favicon-32.png`      | 32 × 32 PNG                  | Sanity-managed reference for browser identity. The approved local `favicon.svg` remains available in the brand package.        |
| `appIconImage`       | Approved square application icon         | `web/public/brand/app-icon.png`        | 1024 × 1024 PNG              | Touch and application identity source.                                                                                         |

### Brand upload checks

- [ ] The source filename matches the approved logo package.
- [ ] The uploaded asset visually matches the approved geometry and colours.
- [ ] Transparent padding is preserved.
- [ ] The logo has not been stretched, tightly cropped, or placed inside a new holding shape.
- [ ] Alternative text or a decorative decision is completed intentionally for each image field.
- [ ] Credit/source information follows the approved brand record.
- [ ] Light and dark website behavior is checked in Preview without changing the artwork.
- [ ] The document remains a draft until every required Site Settings field is complete.

The SVG files remain the scalable masters. The existing PNG exports are the recommended Sanity
uploads because the current frontend brand-image helper uses Sanity's image delivery pipeline.

---

## 2. Default SEO asset

### `defaultSocialImage`

| Requirement                              | Record                                                                                              |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Sanity location                          | **Website → Site Settings → SEO → Default Social Image**                                            |
| Required before publishing Site Settings | Yes                                                                                                 |
| Recommended dimensions                   | 1200 × 630 pixels                                                                                   |
| Recommended format                       | Production-quality JPEG or PNG in the approved social-preview crop                                  |
| Existing source file                     | None approved in the current asset record                                                           |
| Used by                                  | Open Graph and Twitter/X metadata when a public page does not provide its own approved social image |

### Default social-image checks

- [ ] The image is approved for public social sharing.
- [ ] The 1200 × 630 crop works without misleading the house–landscape relationship.
- [ ] Rights, credit, editing, privacy, and visible-location checks are complete.
- [ ] Alt text describes the approved crop accurately.
- [ ] No private coordinate, access detail, family information, or unsupported landmark claim is
      present in the image or metadata.
- [ ] Social-preview testing confirms that the principal subject survives common platform crops.

Do not substitute `social-profile.png`, a logo lockup, or an unapproved House development image
merely to satisfy the required field.

---

## 3. House content photography

All current repository photographs are development photography. They are not production approved
and must remain replaceable. Source originals, rights, credits, capture context, responsive crops,
and owner/editor approval are still required before final publication.

### Hero image

| Item                          | Record                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| Sanity field                  | `housePage.hero.image`                                                                                  |
| Required before publishing    | Yes                                                                                                     |
| Preferred image type          | Wide or panoramic, production-resolution house-within-landscape photograph with mobile-safe composition |
| Current development candidate | `web/public/images/house/hero/4F003BED-1A9C-412A-9137-BEE683305BF5_1_105_c.jpeg`                        |
| Current status                | Needs verification; a wider definitive Hero is still preferred                                          |

Approval notes:

- [ ] The house reads as part of the setting rather than an isolated property image.
- [ ] Capture time, viewpoint, weather, edit history, rights, credit, and responsive focal position
      are recorded.
- [ ] Named landmarks are matched to the actual frame before appearing in alt text or captions.
- [ ] The current reduced derivative is replaced with a production-resolution original.

### Shared Heart image

| Item                          | Record                                                                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Sanity field                  | `housePage.sharedHeart.images[]`                                                                                                   |
| Required before publishing    | Yes; at least one image                                                                                                            |
| Preferred image type          | Landscape image showing the connected kitchen, dining, living room, deck, and outside relationship as honestly as one frame allows |
| Current development candidate | `web/public/images/house/shared-heart/AE351CE6-C211-44AA-A596-67573955A50D_1_105_c.jpeg`                                           |
| Current status                | Candidate; final source, staging, rights, and outside relationship require review                                                  |

Approval notes:

- [ ] The first image is the primary story image.
- [ ] A second image is added only when it contributes a distinct approved observation.
- [ ] Wide-angle perspective does not materially exaggerate the space.
- [ ] Visible people, screens, documents, personal objects, and reflections pass privacy review.
- [ ] The current reduced derivative is replaced with a production-resolution original.

### View image

| Item                            | Record                                                                                                   |
| ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Sanity field                    | `housePage.view.image`                                                                                   |
| Required before publishing      | Yes when The House is marked Approved                                                                    |
| Preferred image type            | Uninterrupted production-resolution panorama from a verified position at or immediately around the house |
| Current development placeholder | `web/public/images/house/view/1BB34E83-3CE5-45A0-B1BD-28FF9CB0E861_1_105_c.jpeg`                         |
| Current status                  | Missing; the placeholder is not an approved View photograph                                              |

Approval notes:

- [ ] A truthful final View photograph replaces the temporary placeholder.
- [ ] Viewpoint, capture date, approximate time, weather, and edits are recorded privately.
- [ ] Bohol Sea, Apo Island, Siquijor Island, and Mount Talinis are named only after being matched to
      the selected frame.
- [ ] The public caption remains optional and contains only verified context.
- [ ] Precise private viewpoint and coordinate information stays outside public fields and asset
      metadata.

### Indoor / Outdoor images

| Editorial role    | Sanity role        | Required before publishing                   | Preferred image type                                                                                   | Current development candidate                                                              | Status    |
| ----------------- | ------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ | --------- |
| Open threshold    | `threshold`        | At least one Indoor/Outdoor role is required | Landscape image joining an interior space to deck, pool, planting, and landscape                       | `web/public/images/house/indoor-outdoor/EC3207AF-79BF-4DC1-AB4E-1B9E0682848E_1_105_c.jpeg` | Candidate |
| Deck and shelter  | `deckShelter`      | Optional when another role is complete       | Human-height landscape or vertical detail showing the covered deck, roof edge, shelter, and vegetation | `web/public/images/house/indoor-outdoor/1FDE1119-111D-417D-93A8-60CE26137A23_1_105_c.jpeg` | Candidate |
| Pool relationship | `poolRelationship` | Optional when another role is complete       | Wider landscape image showing pool within the deck, rooms, roof, planting, and view relationship       | `web/public/images/house/indoor-outdoor/5D6C1A69-C229-4E90-AB87-0D6BC31B18EF_1_105_c.jpeg` | Candidate |

Approval notes:

- [ ] Use each controlled role only once.
- [ ] Use only the number of images needed for the story.
- [ ] Door position, furniture arrangement, pool alignment, and ordinary use are confirmed.
- [ ] Crops do not manufacture alignment or exaggerate scale.
- [ ] No roof, shade, drainage, cooling, ventilation, or weather-performance claim is inferred from
      appearance.
- [ ] Production-resolution originals replace the current derivatives.

### Daily Rhythm images

Each moment is optional. A retained moment requires both approved text and a truthful photograph.
Leave the entire moment empty when either is missing.

| Moment  | Sanity field                           | Required before publishing               | Preferred image type                                                                           | Current development asset                                                                        | Status                                                                                           |
| ------- | -------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Morning | `housePage.dailyRhythms.morning.image` | Only when the Morning moment is retained | Real morning light or an observed morning relationship with the deck, sea, mountain, or nature | `web/public/images/house/daily-rhythm/morning/D2C7104D-837A-4FD1-8866-3B129B51EADB_1_105_c.jpeg` | Missing final image; current file is a visual-testing placeholder and is not verified as Morning |
| Rain    | `housePage.dailyRhythms.rain.image`    | Only when the Rain moment is retained    | Real rain or rainy conditions experienced from a representative sheltered position             | `web/public/images/house/daily-rhythm/rain/C563E734-F8F4-4F04-BD10-E649613674E4_4_5005_c.jpeg`   | Missing final image; current file does not show rain and must not be described as Rain           |
| Evening | `housePage.dailyRhythms.evening.image` | Only when the Evening moment is retained | Landscape image joining interior light, deck, pool, trees, and evening conditions              | `web/public/images/house/daily-rhythm/evening/B20B565B-9359-4FBD-BAA0-9647E963AD2D_1_105_c.jpeg` | Candidate; capture and rights verification required                                              |

Approval notes:

- [ ] The image visibly supports the named time or weather condition.
- [ ] Capture time and weather are recorded.
- [ ] Natural light and weather are not staged or mislabelled.
- [ ] The observation does not promise a fixed guest routine, weather, quiet, visibility, or sound.
- [ ] Production-resolution originals replace the current derivatives.

### Materials images

| Item                          | Record                                                                                                                           |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Sanity field                  | `housePage.materialsAndArchitecture.materials[].image`                                                                           |
| Required before publishing    | No; the entire Materials section is optional, and each material image is optional                                                |
| Preferred image type          | Portrait or close editorial detail of a verified material, application, joinery, roof edge, deck surface, or ordinary weathering |
| Current development candidate | `web/public/images/house/materials-details/61919986-5595-4830-A7A8-99AF1F658A4B_1_105_c.jpeg`                                    |
| Current status                | Needs verification                                                                                                               |

Approval notes:

- [ ] The exact photographed material or element is identified before upload.
- [ ] Material name, application, finish, and public description are verified.
- [ ] The image supports a completed material story rather than filling an empty slot.
- [ ] “Stone detail on cement” is not used as public terminology.
- [ ] No local, natural, reclaimed, handmade, sustainable, thermal, sourcing, or maintenance claim
      is inferred from appearance.
- [ ] The current reduced derivative is replaced with a production-resolution original.

---

## 4. Studio upload workflow

1. **Open the existing singleton.** Use **Website → Site Settings** or **Website → The House**. Do
   not create duplicate singleton documents.
2. **Confirm the editorial role.** Match the asset to the exact field and House story role before
   uploading.
3. **Upload in Studio.** Select the approved source original or approved derivative. Do not upload a
   duplicate merely because the same development file appears in more than one local folder.
4. **Complete image fields.** Add intentional alt text or mark the asset decorative only when that
   decision is correct. Add approved credit and optional credit URL. Add a caption only when it
   contributes verified public context.
5. **Set the crop and hotspot.** Preview the final composition at desktop and mobile sizes. Preserve
   the approved logo padding and the truthful photographic relationship.
6. **Review context and safety.** Check rights, edits, privacy, people, visible documents, security
   details, location precision, and metadata.
7. **Save as Draft.** Keep House workflow status as Draft while any retained field, photograph,
   fact, SEO value, or review record is incomplete.
8. **Preview the complete page.** Check image order, repetition, captions, accessibility, light and
   dark surfaces, mobile crops, and page rhythm.
9. **Record material review.** Add `lastReviewedAt` only after factual, privacy, photography, and
   rights review—not after upload or proofreading alone.
10. **Publish only after review.** Move The House to Approved only when every required section,
    retained optional section, SEO field, and asset has passed the publication checklist.

---

## 5. Safety rules

Never place the following in image fields, captions, alt text, credits, filenames intended for
public delivery, Studio verification notes, or public metadata:

- private coordinates, private camera positions, access routes, keys, controls, security details,
  or embedded location metadata;
- the private meaning of the Joshua's Point name;
- private family information, relationships, memories, conversations, routines, or personal
  circumstances;
- guest identities or identifiable people without explicit approval and consent;
- unapproved geographical, architectural, material, sustainability, environmental, performance,
  weather, or guest-experience claims;
- unverified photographer names, ownership statements, permissions, or credit requirements;
- raw interviews, rights agreements, consent records, evidence files, or other restricted source
  material;
- captions that identify a location, landmark, time, weather condition, activity, or material the
  photograph does not actually show.

Development photography must remain labelled internally as:

- **Development photography**
- **Not production approved**
- **Replace before launch**

Empty optional image fields are preferable to misleading or unverified assets.
