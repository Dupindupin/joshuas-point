# Joshua's Point Rooms Verification Record

## Document purpose

This is the factual intake record for Step 1 of the Fast Rooms Migration. It is an internal planning document, not public website copy.

**Current status:** Owner verification complete for the first Rooms migration
**Migration gate:** Cleared for the explicit roomsPage schema and unpublished draft.
**Owner confirmation recorded:** 2026-08-09

## Source and editorial rules

- Use owner-confirmed facts or another identified authoritative source.
- Keep room names, occupancy, beds, descriptions, and photographs tied to the same verified room.
- Use development photography only for visual review.
- Mark every development image as:
  - development photography
  - not production approved
  - replace before launch
- Do not infer facts from a photograph.
- Do not claim a view, cooling method or performance, quietness, orientation, or environmental feature unless separately verified.
- Individual room pages are outside this migration milestone.

## Existing frontend entries

The current /rooms page contains editorial placeholders. Repository documentation does not verify these entries, so none may be migrated into Sanity as room facts.

| Current placeholder | Unverified information                                                                        | Migration treatment                |
| ------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------- |
| The Ridge Room      | Name, two-guest capacity, location, light, material description, and URL                      | Exclude pending owner confirmation |
| The Garden Room     | Name, two-guest capacity, courtyard relationship, shade, airflow, garden description, and URL | Exclude pending owner confirmation |
| The Courtyard Room  | Name, four-guest capacity, location, morning experience, sky relationship, and URL            | Exclude pending owner confirmation |

The existing “View Room” links also imply individual room pages that are not part of this milestone. They must not determine the CMS model or migration content.

## Verification status

| Required fact                      | Current status                                | Evidence needed                                                 |
| ---------------------------------- | --------------------------------------------- | --------------------------------------------------------------- |
| Number of guest rooms              | Owner-confirmed: two suites                   | No further verification required for this migration             |
| Public name of each room           | Owner-confirmed: Ocean Suite and Garden Suite | Preserve exact spelling                                         |
| Maximum guest capacity per room    | Owner-confirmed: two guests per suite         | Preserve as maximum occupancy                                   |
| Bed types and quantities per room  | Owner-confirmed                               | Ocean Suite: one King size bed; Garden Suite: one Queen bed     |
| Private bathroom                   | Owner-confirmed                               | Each suite has a private ensuite                                |
| Short factual description per room | Owner-approved                                | Use the exact approved descriptions recorded below              |
| Outlooks                           | Owner-confirmed                               | Ocean Suite: Bohol Sea and pool; Garden Suite: garden and pool  |
| Preview image identity per room    | Not verified                                  | Owner confirmation that the selected image shows the named room |
| Photography rights and credits     | Not verified                                  | Rights-holder and credit confirmation before production         |

## Confirmed room inventory

### Ocean Suite

| Fact                | Approved information                                                     |
| ------------------- | ------------------------------------------------------------------------ |
| Public name         | Ocean Suite                                                              |
| Maximum capacity    | 2 guests                                                                 |
| Bed                 | 1 King size bed                                                          |
| Bathroom            | Private ensuite                                                          |
| Short description   | “A king bed, a private ensuite for two, and views toward the Bohol Sea.” |
| Additional outlooks | Pool view; sea view                                                      |
| Preview image       | Unassigned pending room-identity verification                            |

### Garden Suite

| Fact                | Approved information                                                  |
| ------------------- | --------------------------------------------------------------------- |
| Public name         | Garden Suite                                                          |
| Maximum capacity    | 2 guests                                                              |
| Bed                 | 1 Queen bed                                                           |
| Bathroom            | Private ensuite                                                       |
| Short description   | “A Queen bed, a private ensuite, and a calm garden-and-pool outlook.” |
| Additional outlooks | Garden outlook; pool outlook                                          |
| Preview image       | Unassigned pending room-identity verification                         |

## Minimum verified record for each room

Create one record for every owner-confirmed guest room. Do not create provisional rooms to fill the collection.

| Field             | Required verification                                                          |
| ----------------- | ------------------------------------------------------------------------------ |
| Public room name  | Exact spelling and capitalization                                              |
| Maximum guests    | One operationally accurate whole number                                        |
| Beds              | Type and quantity; include a room label or notes only when confirmed           |
| Short description | One or two public-safe sentences using observable, verified information        |
| Preview image     | Existing filename or “none”; owner must confirm the image belongs to that room |
| Image status      | Development photography, not production approved, replace before launch        |

Adults, children, bed dimensions, accessibility, ensuite facilities, outlook, orientation, cooling, and other amenities should remain empty unless the owner chooses to verify them for a later milestone.

## Available development-photography candidates

These files are possible preview assets based only on their visible subject in the existing House development-photography record. No room identity, room name, outlook, or feature has been inferred.

| Filename                                          | Visible subject for review                                        | Assignment status                                             | Production status                                                       |
| ------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 1BB34E83-3CE5-45A0-B1BD-28FF9CB0E861_1_105_c.jpeg | A room interior opening toward the covered deck                   | Inspected and left unassigned; suite identity is not verified | Development photography; not production approved; replace before launch |
| D2C7104D-837A-4FD1-8866-3B129B51EADB_1_105_c.jpeg | Covered deck beside glazed room openings                          | Inspected and left unassigned; suite identity is not verified | Development photography; not production approved; replace before launch |
| B20B565B-9359-4FBD-BAA0-9647E963AD2D_1_105_c.jpeg | A lit room and covered deck beside the pool in evening conditions | Inspected and left unassigned; suite identity is not verified | Development photography; not production approved; replace before launch |

The canonical development sources remain under web/public/images/house/. Files should only be copied into a future Rooms workspace after their room role is confirmed. Existing House assets must not be moved or renamed.

## Readiness gate for Step 2

The room facts required for Step 2 are confirmed. Photography remains deliberately unassigned:

- do not infer which suite appears in an existing image;
- allow the development page to use the shared editorial placeholder treatment;
- attach an image only after its suite identity is verified; and
- retain the labels “Development photography”, “Not production approved”, and “Replace before launch” for every later development assignment.

The Ridge Room, Garden Room, and Courtyard Room placeholders remain excluded. Individual room pages are deferred.

### Photography assignment review

The available room-adjacent photographs were visually reviewed on 2026-08-09. The images show real Joshua's Point rooms, but the repository contains no reliable suite-to-filename record. Apparent bed proportions or outlooks are not sufficient evidence of room identity.

No image is attached to Ocean Suite or Garden Suite in the first CMS publication. The frontend's existing editorial media placeholder remains the truthful temporary treatment until the owner confirms the mapping.
