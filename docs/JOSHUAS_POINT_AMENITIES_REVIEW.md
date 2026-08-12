# Joshua's Point Amenities Review

Internal migration and presentation guidance. This is not public website copy and does not by
itself approve a factual claim for publication.

## Sources and authority

The legacy [House page](https://joshuaspoint.com/the-house/) was reviewed as a migration source,
not as the active frontend. Its useful structure is preserved below, but newer owner-confirmed
records in this repository take precedence where the two disagree.

Current authoritative project records:

- `THE_ROOMS_VERIFICATION_RECORD.md`
- `THE_HOUSE_VERIFICATION_RECORD.md`
- `THE_HOUSE_CONTENT_MAP.md`
- the registered `room` and `housePage` schemas

## Existing source content found

### Rooms

The legacy House page describes two suites and presents bed, ensuite, pool, sea, and garden details.
The current project record confirms the following narrower inventory:

| Room         | Confirmed structured details                                                |
| ------------ | --------------------------------------------------------------------------- |
| Ocean Suite  | Two guests; one king-size bed; private ensuite; Bohol Sea and pool outlooks |
| Garden Suite | Two guests; one queen bed; private ensuite; garden and pool outlooks        |

The legacy Garden Suite text says king bed. It is superseded by the newer owner-confirmed queen-bed
record and must not be migrated.

### House — confirmed in current owner records

- Connected kitchen, dining, living, and deck spaces.
- A three-metre covered deck used for sitting, dining, yoga, and quiet time.
- An infinity pool positioned toward the south/east and related to the landscape and view.
- A 15 kW solar array, two Dyness PowerBrick Pro batteries, 28.7 kWh battery capacity, grid backup,
  and provision for future battery expansion.
- A 2,000-litre rainwater collection system used for watering plants.
- Wood, concrete, stone-coated metal roof sheets, sliding doors, and stone detail on cement; the
  final terminology for the stone detail remains to be confirmed.

Architecture and materials should remain editorial stories, not be flattened into a hotel-style
amenity checklist.

### House — legacy migration candidates requiring confirmation

The legacy amenities section also names air conditioning, a stated fibre speed, a smart television,
an outdoor shower, covered parking, filtered drinking water, laundry service, guest scooters,
airport transfers, barbecue equipment, and a fully equipped kitchen. These are useful migration
candidates, but they should not enter the new Sanity dataset until their current availability,
wording, and any conditions are owner-confirmed. Exact measurements and performance claims should
also remain out until reconciled with current records.

## Recommended Sanity structure

The approved content architecture already defines the right separation:

### `amenity` document

| Field         | Type                | Recommendation                                                                                              |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `name`        | `string`            | Required, concise factual title.                                                                            |
| `category`    | controlled `string` | Required; use a small taxonomy such as bathing, climate, connectivity, cooking, outdoor, parking, or water. |
| `description` | `text`              | Optional short factual explanation; no promotional language.                                                |
| `internalKey` | `slug` or `string`  | Required stable key for frontend presentation and integrations.                                             |
| `active`      | `boolean`           | Required; permits retirement without breaking existing room references.                                     |

Icons should remain a frontend concern keyed from `internalKey` or category. Editors should not
choose decorative icons, and an amenity must remain understandable without one.

### `roomAmenity` object

- `amenity`: required reference to an active `amenity` document.
- `note`: optional room-specific factual clarification.

Room capacity, beds, bathroom type, and outlooks should remain in their existing explicit room
fields. They should not be duplicated as amenity references.

### House content

Do not add the room amenity array to `housePage` by default. The House page should continue to tell
the relationship between its spaces, materials, and landscape. If a practical House facilities
summary is approved later, it should reference the same amenity vocabulary in one restrained,
optional section rather than create a second taxonomy.

## Presentation recommendation

- Use a semantic definition list rather than cards or a feature grid.
- Keep icons small, optional, and visually secondary to the words.
- Limit room previews to the four already verified facts: capacity, bed, bathroom, and outlook.
- Group future practical amenities sparingly; do not display every operational detail at once.
- Keep sustainability as an editorial account of how the house works, not a badge collection.
- Omit empty and unconfirmed items entirely.

The reusable frontend presentation is deliberately data-agnostic so current room facts and future
Sanity amenity references can share the same quiet visual language.
