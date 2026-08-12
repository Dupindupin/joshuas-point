# Joshua's Point Editorial Polish Review

## Purpose

This review records the Phase 4 public-writing pass across Joshua's Point. The work was selective:
strong passages were preserved, while wording was changed only when it felt generic, repetitive,
overly formal, process-driven, or unlike a host speaking naturally about a place he knows.

The editorial standard remains:

- personal, grounded, and quietly enthusiastic;
- specific before promotional;
- first-hand observation and approved facts before general travel language;
- Joshua's Point speaking as a thoughtful host, never as a hotel; and
- no private family history, private meaning behind the Joshua name, or Studio-only notes.

## Major writing improvements

### The House

- Replaced abstract architectural phrasing with the confirmed arrival experience: the deck, view,
  and infinity pool are noticed first, then the quieter relationship with the landscape becomes
  clear.
- Made the shared-space description more natural while preserving the approved uses of the
  kitchen, dining area, living room, and deck.
- Replaced the metaphorical View heading with a simpler observation: the view is always present.
- Added approved daily details already supplied by Tobias: coffee on the deck, birds, bamboo in the
  wind, rain, warm evening air, distant island lights, and the lights around the house.

### Destinations

- Replaced the Destinations index's migration/process language with a direct explanation of how the
  guide is used: fewer recommendations, enough context to choose, and time for the road itself.
- Reframed Casaroro Falls from a report about Tobias into a Joshua's Point recommendation. The
  Descent → Gorge → Return structure and Tobias's meaning remain intact.
- Reframed Lake Balanan around repeated visits and the remembered sequence across the lake, through
  the jungle, and toward the small waterfall. Private family context remains excluded.
- Kept place names naturally present in titles, excerpts, and metadata without adding search terms.

### Scenic Routes and Southern Negros Explorer

- Replaced repeated third-person references to “Tobias recommends” with the warmer Joshua's Point
  voice: roads “we know,” “we use,” and “we return to.”
- Preserved the central route principle that the road is part of the day.
- Simplified route headings that sounded written for an editorial system rather than for a guest.

### Dive Guide

- Replaced “Marine adventures” and “shared through observation rather than promises” with a direct
  introduction to Apo Island, Dauin, and Zamboanguita.
- Kept technical dive decisions with qualified local operators and did not add depths, conditions,
  seasons, or sightings.
- Removed two report-like references to Tobias while preserving the actual memories and
  recommendations beneath them.

### Getting Here, FAQ, Plan Your Stay, and Contact

- Replaced institutional phrases such as “final handoff,” “terms that shape the reservation,” and
  “prepared orientation” with clear, human language.
- Kept all confirmed stay policies unchanged.
- Made Contact more direct: a date and a simple question are enough to begin.
- Kept unconfirmed transport, payment, and stay details absent rather than filling the pages with
  guesses.

### Privacy and Terms

- Removed public pre-launch and internal-review notices.
- Replaced implementation terminology with plain explanations of what happens to an enquiry.
- Kept the legal meaning and confirmed system behavior intact; this was a clarity pass, not a legal
  rewrite.
- Retained `noIndex` behavior for both routes.

### Maps

- Removed public references to provider adapters and future integration.
- The fallback now says simply that the map view is unavailable while keeping the verified textual
  location and route information accessible.

## Passages deliberately preserved

The following writing was already specific, calm, and useful, so it received no substantive
rewrite:

- Home's published Hero, Place, Shared Life, Morning, and Closing Reflection.
- The verified Ocean Suite and Garden Suite names, capacities, beds, bathrooms, outlooks, and short
  descriptions.
- Apo Island's island-and-community narrative on the Destination page.
- Dauin's black-sand coast, close-looking, and everyday shoreline narrative.
- Dumaguete's boulevard, coffee, market, and unplanned-street rhythm.
- Valencia, Twin Lakes, Najandig Peak, Pulangbato Falls, and Siaton destination stories.
- The five individual Scenic Route stories, apart from shared presentation headings.
- Dauin's Dive Guide and all existing technical restraint around sightings and conditions.
- Confirmed check-in, check-out, minimum-stay, deposit, and cancellation wording.
- The Contact closing line: “A stay can begin quietly—with a date, a question, and a little room
  for the rest to take shape.”

These passages remain because they contain real place-specific detail or clear confirmed facts.
Changing them merely to sound different would weaken the migration principle.

## Repeated or process-driven phrases removed

- Repeated “Tobias recommends” and “For Tobias” constructions where the surrounding page already
  speaks for Joshua's Point.
- “The guide will grow,” “built through first-hand observation,” and similar descriptions of the
  editorial workflow.
- “Editorial introduction,” “editorial guidance,” and provider-adapter language exposed in the
  public interface.
- “Owner and legal review required,” “prepared system,” “launch approval,” and other internal
  production-status messages.
- Overly formal phrases including “final handoff,” “before commitment,” and “terms that shape the
  reservation.”

## Remaining owner-source gaps

These gaps were not filled during the polish pass:

- Getting Here: confirmed arrival routes from Dumaguete and Bacolod, current flight and ferry
  guidance, local transport, scooter rental guidance, grocery stops, and arrival arrangements.
- FAQ: children, sleeping arrangements, kitchen use, Wi-Fi and signal, power system, pool use,
  transport, diving, food and groceries, house rules, pets, accessibility, longer stays, and rainy
  season guidance.
- Plan Your Stay: maximum guest policy, children, pets, parking, kitchen and pool use, Wi-Fi,
  accepted payment methods, balance timing, currency, inclusions, and exclusions.
- Rooms: approved room photography and any additional room information Tobias wants to share.
- Dive Guides: qualified technical review for levels, depths, visibility, current, entry, season,
  and site-specific safety notes.
- Privacy and Terms: final operator details, retention policy, and formal legal review remain launch
  governance work; they should not be displayed as editorial notices to guests.

## Content kept untouched because it is authentic

- Coffee on the deck, birds in the morning, bamboo in the wind, rain, and warm evening air.
- The Casaroro Falls journey as descent, gorge, waterfall, and return.
- Lake Balanan as a connected lake, jungle, mountain, and small-waterfall journey.
- Everyday coastal and town life in Dauin, Dumaguete, Siaton, and the scenic routes.
- The repeated editorial preference for one place and enough time, rather than a list of
  attractions.

These details are the strongest evidence of Tobias's voice. Future edits should protect them.

## CMS authority and migration notes

- Published Sanity content remains authoritative for Home, Rooms, Destinations, Scenic Routes, and
  Dive Guides.
- The House currently resolves from its approved static presentation data in the configured
  production dataset because no published `housePage` singleton is present there.
- The editorial migration script records the field-level CMS changes so future migrations do not
  silently restore the older wording.
- No Sanity schema, workflow status, review date, image, relationship, map, or practical factual
  field was changed during this pass.
