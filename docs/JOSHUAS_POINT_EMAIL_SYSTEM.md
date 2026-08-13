# Joshua's Point Email System

## Authority

- Next.js owns the branded HTML shell, transactional templates, validation, security, reply-to behavior, and plain-text alternatives.
- Published Site Settings supplies approved public brand assets, contact details, location, and social profiles. No email HTML is editable in Sanity.
- Resend owns delivery, confirmed Contacts, the Joshua's Point Updates Topic and Segment, Broadcasts, and unsubscribe preferences.

## Transactional messages

The enquiry form sends an internal notification and guest confirmation in a single idempotent batch. Both include HTML and plain text. The internal message replies to the guest; the guest confirmation replies to the public Joshua's Point mailbox.

Public enquiry sending remains controlled exclusively by `ENQUIRY_EMAIL_MODE`.

## Subscription lifecycle

1. A visitor submits an email through Coming Soon.
2. Server validation, honeypot, duplicate protection, and rate limiting run before delivery.
3. A signed link valid for 24 hours is emailed to the visitor.
4. Following the link creates or updates the Resend Contact and opts it into the configured Topic and Segment.
5. A welcome email is sent.

No subscriber is stored in Sanity. The public response does not disclose whether an address already exists.

## Resend preparation

Create:

- A Segment named `Joshua's Point Updates` for internal campaign organization.
- A Topic named `Joshua's Point Updates`, with an explicit opt-in policy.
- A separate API key with Contacts-management access for the server-side confirmation route.
- Keep the existing domain-restricted sending key for transactional email delivery.

Future launch and news messages must use Resend Broadcasts, the Updates Topic, and Resend's managed unsubscribe footer. Do not send them through the transactional batch endpoint.

## Activation order

1. Configure all subscription environment variables with `SUBSCRIPTION_EMAIL_MODE=disabled`.
2. Test rendering and confirmation with an owner-controlled address.
3. Verify the Contact, Segment, Topic, welcome email, and unsubscribe behavior in Resend.
4. Enable `SUBSCRIPTION_EMAIL_MODE=live` only after owner approval.
5. Keep `ENQUIRY_EMAIL_MODE=disabled` until the separate production enquiry test is approved.
