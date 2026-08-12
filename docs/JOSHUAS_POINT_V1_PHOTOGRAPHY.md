# Joshua's Point Version 1 Photography

## Status language

Every image in this record is owner photography used for Version 1 development. Unless Tobias separately approves an image for production, its status remains:

- Development photography
- Not production approved
- Replace before launch

Images remain attached through explicit Sanity image fields so they can be replaced without frontend or layout changes. Static House fallback images follow the same rule.

## Home

| Role               | Current Version 1 image                                      | Crop and focal review                                                                                                                                 | Replacement priority                                       |
| ------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Hero               | `4F003BED-1A9C-412A-9137-BEE683305BF5_1_105_c.jpeg`          | Landscape composition keeps the pool, covered deck, and distant landscape legible at desktop and mobile crops. Keep the pool horizon near the centre. | Medium — replace with a wider arrival image when approved. |
| The Place          | `EC3207AF-79BF-4DC1-AB4E-1B9E0682848E_1_105_c.jpeg`          | The living room and open edge remain readable in the landscape crop.                                                                                  | Medium.                                                    |
| Shared Life        | `AE351CE6-C211-44AA-A596-67573955A50D_1_105_c.jpeg`          | Kitchen, dining, and living areas share the frame without relying on a narrow edge detail.                                                            | Medium.                                                    |
| Morning Narrative  | `1BB34E83-3CE5-45A0-B1BD-28FF9CB0E861_1_105_c.jpeg`          | The room-to-deck relationship survives the editorial crop. It does not claim to show a specific morning event.                                        | High — replace with a genuine morning ritual photograph.   |
| Closing Reflection | `B20B565B-9359-4FBD-BAA0-9647E963AD2D_1_105_c.jpeg`          | Evening house and pool remain central at wide and mobile widths.                                                                                      | Medium.                                                    |
| Southern Negros    | No approved section content or image is currently published. | The optional section remains absent rather than using an unrelated regional image.                                                                    | High once the section is editorially approved.             |

## The House

The current static development set completes the existing photography-first structure: Hero, Shared Heart, View placeholder, Indoor / Outdoor, Morning placeholder, Rain placeholder, Evening, and Materials. All images remain replaceable through the existing `HousePageData` and Sanity mapper.

Highest-priority replacements are the View, Morning, and Rain roles. Their present images support visual pacing but are not dedicated photographs of those moments. Hero and indoor/outdoor crops are landscape-safe; portrait and mobile crops should keep openings, deck edges, and the pool relationship near the centre rather than focusing on decorative details.

## Rooms

| Role                  | Current Version 1 image                             | Source basis and alt-text boundary                                                                                                                                             | Replacement priority                                                                              |
| --------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Ocean Suite preview   | Existing site image `12.webp`                       | The legacy House page explicitly assigns this image to Ocean Suite. Alt text describes the suite and deck opening without adding a view claim.                                 | High — the migrated source is soft and should be replaced with a sharp, room-specific photograph. |
| Garden Suite preview  | Existing site image `15.webp`                       | The legacy House page explicitly assigns this image to Garden Suite. Alt text describes the pool-side opening without repeating outdated bed information from the legacy page. | High.                                                                                             |
| Editorial image break | `5D6C1A69-C229-4E90-AB87-0D6BC31B18EF_1_105_c.jpeg` | A sharp, wide view of the suite wing and pool; well suited to panoramic and mobile centre crops.                                                                               | Low.                                                                                              |

## Destinations

Existing hero assignments remain in place for Apo Island, Casaroro Falls, Dauin, Dumaguete, Lake Balanan, Najandig Peak, and Valencia. Their alt text describes visible content rather than promotional claims.

The Destinations index now uses the Najandig Peak ridge as a broad Southern Negros landscape. Siaton uses the Lake Balanan boat photograph because Lake Balanan is an established Siaton destination; the alt text names the photographed place rather than implying a town view.

Pulangbato Falls and Twin Lakes remain without hero photography. The available legacy pages do not contain truthful place-specific photographs for either destination, so assigning Casaroro Falls or Najandig Peak would be misleading. Both are high-priority production gaps.

## Scenic Routes

| Route                     | Current Version 1 image   | Truthful relationship                                                         | Replacement priority                         |
| ------------------------- | ------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------- |
| Scenic Routes index       | Najandig Peak ridge       | A verified Southern Negros route destination and broad mountain-road context. | Medium.                                      |
| Coastal Ride to Dumaguete | Dumaguete bell tower      | Dumaguete is a documented destination and stop on the route.                  | High — replace with the coastal road itself. |
| Southern Explorer         | Lake Balanan boat journey | Lake Balanan is a documented stop and related destination.                    | Medium.                                      |
| Valencia Highlands Loop   | Casaroro Falls            | Casaroro Falls is a documented related destination in the Valencia highlands. | Medium.                                      |
| Waterfall Explorer        | Casaroro Falls            | Casaroro Falls is a documented stop and related destination.                  | Medium.                                      |
| Twin Lakes Escape         | No image assigned         | No truthful Twin Lakes or route photograph is currently available.            | High.                                        |

## Dive Guides

The Dive Guide index uses the Apo Island sea-turtle photograph. Apo Island and Dauin retain their existing underwater heroes. Zamboanguita uses the existing `Ghost.jpg` owner photograph from the legacy Zamboanguita diving page; its alt text describes only the visible blue-and-yellow underwater subject and does not assert species, dive-site, depth, or conditions.

Zamboanguita remains a high-priority replacement because the migrated portrait is a development image and the exact subject has not been named publicly.

## Southern Negros Guide

The Guide remains deliberately text-led. Destination, scenic-route, and dive photography appears when a visitor follows its editorial links. Adding a separate image composition would change the approved layout, so no photography was introduced during this pass.

## Explorer

The Explorer is map-led rather than photography-led. Its verified markers, route geometry, selected-place panels, and accessible list provide the visual experience. No decorative photograph is required, and no image was added.

## Crop, focal-point, and accessibility review

- Sanity image URLs continue to use the stored crop and hotspot data when editors set them; no page-specific image architecture was added.
- Current landscape photographs use centre-safe compositions for the existing panoramic and 3:2 render roles.
- Portrait source images such as Casaroro Falls remain replacement candidates where a wide route or index crop is required.
- Every newly assigned image is non-decorative and has concise alt text describing visible content.
- Alt text avoids unsupported weather, view, route-condition, species, and experience claims.
- Mobile crops should be rechecked whenever a production replacement is approved, especially for suite previews and portrait waterfall photography.

## Highest-priority production replacements

1. Pulangbato Falls and Twin Lakes destination heroes.
2. Twin Lakes Escape route hero.
3. Sharp, room-specific Ocean Suite and Garden Suite previews.
4. Dedicated House View, Morning, and Rain photography.
5. A route-specific photograph for Coastal Ride to Dumaguete.
6. A confirmed, production-quality Zamboanguita dive-area hero.
7. A genuine morning ritual image for Home.
