# Enquiry Flow Readiness

## Purpose

This is the operational checklist for making the existing enquiry flow ready for real guests. It
does not change the form architecture or define business terms on the owner's behalf.

## Current decisions

- The global action is **Plan Your Stay** and leads to `/plan-your-stay`.
- `/contact` remains the place where a guest starts an enquiry.
- The website does not take payment or create a booking.
- An enquiry does not reserve dates or confirm availability.
- Email delivery remains the only implemented submission channel.

## Email delivery

### Prepared

- Server-side validation and sanitization
- Provider-independent email service contract
- Resend adapter
- Internal notification and guest confirmation
- Honeypot, request-size limit, duplicate protection, and initial rate limiting
- Guest-safe handling when configuration or delivery fails
- Environment variable template without real credentials

### Owner or deployment input required

- [ ] Confirm the internal recipient email address.
- [ ] Confirm the monitored reply-to email address.
- [ ] Choose and authenticate the transactional sender domain.
- [ ] Configure the production provider credential.
- [ ] Define who monitors delivery failures and provider status.
- [ ] Complete an end-to-end delivery and reply test before launch.

## Direct contact methods

Do not publish a method until its real value and operational owner are confirmed.

- [ ] Public email address
- [ ] WhatsApp number in international format
- [ ] Display format for the WhatsApp number
- [ ] Phone number in international format
- [ ] Display format for the phone number
- [ ] Hours or conditions under which WhatsApp and phone should be used

Until these are supplied, the Contact page intentionally marks the methods as unconfirmed.

## Response expectation

No response-time promise is approved. Confirm:

- [ ] Normal response window
- [ ] Time zone used to interpret that window
- [ ] Whether weekends and Philippine public holidays differ
- [ ] Who provides coverage when the primary host is unavailable
- [ ] The fallback process if email delivery is unavailable

Only then should the pending statement on `/contact` be replaced.

## Stay information required

### Check-in

- [x] Check-in: 2:00 PM
- [ ] Late-arrival process and limits
- [ ] Handover or self-arrival process
- [ ] Information required before arrival

### Check-out

- [x] Check-out: 12:00 noon
- [ ] Late check-out policy, if any
- [ ] Departure and key-handover process

### Minimum stay

- [x] Minimum stay: 2 nights

### Payment

- [ ] Accepted payment methods
- [ ] Booking currency
- [x] Deposit: 20% deposit required
- [ ] When the deposit is due
- [ ] When the balance is due
- [ ] Who pays transaction or currency-conversion fees
- [ ] How payment and reservation confirmation are recorded

### Cancellation and changes

- [x] Confirmed wording: “The 20% deposit is non-refundable for cancellations made within 14 days
  before arrival.”

Do not expand this wording or imply any additional cancellation, refund, date-change, no-show, or
exceptional-circumstance rule without new owner approval.

### Inclusions and exclusions

- [ ] Linen and towels
- [ ] Housekeeping frequency
- [ ] Arrival provisions and pantry basics
- [ ] Utilities, Wi-Fi, parking, and pool access
- [ ] Transport or transfers
- [ ] Food, shopping, delivery, and outside services
- [ ] Activities, diving, equipment, and operator services
- [ ] Any stay-dependent or seasonal differences

## Privacy and terms readiness

The `/privacy` and `/terms` routes describe only current, verifiable website behavior. Before launch,
the owner must confirm:

- [ ] Legal operator identity and business contact details
- [ ] Applicable jurisdiction and professionally reviewed legal wording
- [ ] Enquiry mailbox and email-provider retention periods
- [ ] Process for access, correction, and deletion requests
- [ ] Approved stay, payment, cancellation, and refund terms
- [ ] Whether any additional analytics or processors are introduced

The prepared routes are not a substitute for professional legal review.

## Launch gate

The enquiry flow is ready for real guests only when email delivery has passed an end-to-end test,
at least one fallback contact method is confirmed, a response expectation is approved, and the
privacy and stay terms have completed owner and legal review.
