# Joshua's Point Enquiry Delivery Activation Checklist

This checklist completes the operational path from a guest enquiry to an owner-confirmed stay. It does not create instant booking, payments, room calendars, or a reservation database.

## 1. Before enabling delivery

- [ ] Keep `COMING_SOON_MODE=enabled` until the separate public-launch decision.
- [ ] Confirm the Resend sending domain `updates.joshuaspoint.com` remains verified.
- [ ] Confirm the existing Resend transactional API key is available in the production Next.js environment.
- [ ] Confirm the House Availability document is published, its confirmation horizon is current, and its unavailable periods do not overlap.
- [ ] Confirm the Sanity revalidation webhook targets `https://joshuaspoint.com/api/sanity/revalidate` and returns HTTP 200 for a signed delivery.
- [ ] Confirm `mail@joshuaspoint.com` can receive and reply to ordinary email.

## 2. Required production environment

Install these values in the production Next.js application. Do not put them in Sanity or commit them to Git.

```text
ENQUIRY_EMAIL_MODE=live
ENQUIRY_EMAIL_PROVIDER=resend
ENQUIRY_FROM_EMAIL=Joshua's Point <enquiries@updates.joshuaspoint.com>
ENQUIRY_TO_EMAIL=mail@joshuaspoint.com
ENQUIRY_REPLY_TO_EMAIL=mail@joshuaspoint.com
RESEND_API_KEY=<configured transactional sending key>
```

Safety checks:

- [ ] There is exactly one `ENQUIRY_EMAIL_MODE` value.
- [ ] Every variable occupies its own line.
- [ ] The API key is not joined to another value and is never printed in deployment logs.
- [ ] Subscription variables and `SUBSCRIPTION_EMAIL_MODE` remain unchanged.

## 3. Controlled delivery test

Use an owner-controlled guest email address for the first test.

- [ ] Submit an enquiry with future dates currently shown as available.
- [ ] Confirm the form reports success once.
- [ ] Confirm the internal notification arrives at `mail@joshuaspoint.com`.
- [ ] Confirm the guest confirmation arrives at the owner-controlled guest address.
- [ ] Reply to the internal notification and confirm the reply is addressed to the guest email.
- [ ] Reply to the guest confirmation and confirm the reply is addressed to `mail@joshuaspoint.com`.
- [ ] Confirm both messages show successful delivery in Resend.
- [ ] Repeat the same submission and confirm duplicate protection prevents a second send.
- [ ] Submit dates overlapping an unavailable period and confirm no email is sent.
- [ ] Submit dates beyond the confirmed availability horizon and confirm no email is sent.

## 4. Owner handling for every real enquiry

1. Read the internal notification in the Joshua's Point mailbox.
2. Open **Owner Dashboard → Booking Center → Manage House Availability**.
3. Check the requested range against the latest published unavailable periods.
4. Reply personally to the guest. The automated receipt is not a booking confirmation.
5. When the stay is agreed, add one `Reserved` period:
   - `startDate` is the guest's arrival date and is unavailable.
   - `endDate` is the guest's departure date and is the first available day after the stay.
6. Do not put guest contact details, payment information, or other sensitive information in `internalNotes`.
7. Review the complete period list for overlaps, update `lastReviewedAt`, and publish House Availability.
8. Confirm the signed webhook returns HTTP 200 and includes the House Availability cache tag.
9. Verify the dates appear unavailable on Plan Your Stay without waiting for the hourly fallback.
10. Send the personal confirmation to the guest only after the calendar has been updated.

## 5. Failure handling

- If the server cannot verify the latest availability, no enquiry email is sent and the guest is directed to `mail@joshuaspoint.com`.
- If Resend delivery fails, no enquiry is stored by the website. Check Resend delivery activity and the Joshua's Point mailbox before asking the guest to retry.
- If the calendar cannot be updated immediately, do not promise the dates to another guest until the first enquiry is resolved.

## 6. Activation complete when

- [ ] Available dates pass server-side revalidation and deliver both emails.
- [ ] Unavailable and unconfirmed dates are rejected before delivery.
- [ ] Reply-to behavior is correct in both directions.
- [ ] The owner can reach House Availability directly from the Owner Dashboard.
- [ ] A confirmed stay is recorded as a published `Reserved` period.
- [ ] The public calendar updates through webhook revalidation.
- [ ] Coming Soon and subscription settings remain in their separately approved states.
