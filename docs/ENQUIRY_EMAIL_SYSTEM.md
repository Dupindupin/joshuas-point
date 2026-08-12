# Enquiry Email System

## Purpose

The contact form sends a stay enquiry without creating a booking, taking payment, storing a guest
record, or subscribing anyone to marketing. A successful submission sends two plain-text emails in
one provider request:

1. An internal notification to the configured Joshua's Point recipient.
2. A receipt confirmation to the guest.

The confirmation states that receipt is not a booking or availability confirmation.

## Architecture

`/contact` passes a dedicated Server Action to the existing client-side form. The Server Action is
the trust boundary: it sanitizes and validates every value again, checks abuse controls, constructs
the two messages, and sends them through the `EmailService` interface.

The first adapter uses Resend's HTTPS batch endpoint directly. No provider SDK is required. The
batch carries an idempotency key so a provider retry does not create another pair of emails.

To change providers, implement `EmailService.sendBatch()` in a new server-only adapter and add it to
the provider switch in `src/lib/email/email-service.ts`. An SMTP adapter can use a maintained SMTP
transport library later; it should map the same `EmailMessage` values and keep credentials entirely
on the server. Page and form code should not change.

## Environment variables

Copy `web/.env.example` to a local `.env.local` and replace every example value. Never commit the
local file or place these values in Sanity.

| Variable                 | Purpose                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `ENQUIRY_EMAIL_PROVIDER` | Active adapter. Currently `resend`.                            |
| `ENQUIRY_FROM_EMAIL`     | Verified transactional sender, optionally with a display name. |
| `ENQUIRY_TO_EMAIL`       | Internal recipient: `mail@joshuaspoint.com`.                   |
| `ENQUIRY_REPLY_TO_EMAIL` | Monitored public address: `mail@joshuaspoint.com`.             |
| `RESEND_API_KEY`         | Server-only Resend API credential.                             |

If any required value is absent or invalid, the form fails safely and tells the guest that nothing
was sent. Builds do not send test email.

## Current deployment readiness

The repository contains the complete Resend adapter, validation, abuse controls, internal
notification, and guest confirmation flow. It does not contain real credentials, recipient
addresses, or an authenticated sender domain. No `web/.env.local` is present in the reviewed
workspace. The environment variables configured in a remote deployment cannot be verified from
the repository and must be checked in that deployment separately.

At this stage, compiling the application proves only that the delivery path is valid TypeScript. It
does not prove that production email can be sent or received.

### Exact remaining deployment steps

1. Confirm that `mail@joshuaspoint.com` is actively monitored and can receive both internal enquiry
   notifications and guest replies. Phone and WhatsApp remain intentionally unconfigured.
2. Create or select the production Resend account without placing its API key in the repository or
   Sanity.
3. In Resend, add a dedicated transactional subdomain such as `updates.joshuaspoint.com`. Resend
   recommends a subdomain to isolate sending reputation. Use the exact domain chosen here in
   `ENQUIRY_FROM_EMAIL`.
4. Copy the SPF, DKIM, and feedback/return-path DNS records displayed by Resend into the DNS
   provider exactly as supplied. Do not create guessed records and do not replace the root domain's
   existing mail records. Resend's default return path uses a `send` subdomain and its displayed SPF
   setup includes both TXT and MX records.
5. Return to the Resend domain page, start or restart verification, and wait until the sending status
   is `verified`. DNS propagation can take up to 72 hours. Do not test production delivery while the
   domain is pending, partially verified, or failed.
6. Create a production API key with **Sending access** restricted to the verified transactional
   domain. Copy it once into the deployment secret store; never commit it or expose it to browser
   code.
7. Review the existing DMARC record for `joshuaspoint.com`. If none exists, begin with a monitored
   `p=none` policy and a valid reporting mailbox; move to `quarantine` or `reject` only after every
   legitimate sender has been identified and tested. Do not overwrite an existing DMARC policy.
8. In the production hosting environment, configure:
   - `ENQUIRY_EMAIL_PROVIDER=resend`
   - `ENQUIRY_FROM_EMAIL="Joshua's Point <enquiries@updates.joshuaspoint.com>"` (replace the
     subdomain only if a different transactional domain was actually verified)
   - `ENQUIRY_TO_EMAIL=mail@joshuaspoint.com`
   - `ENQUIRY_REPLY_TO_EMAIL=mail@joshuaspoint.com`
   - `RESEND_API_KEY` with the production server-only API key
9. Redeploy the application so the Server Action receives the new environment values.
10. Submit one controlled enquiry using an owner-approved, non-guest test address. Confirm that
    exactly one internal
    notification and one guest confirmation arrive and that their dates, guest count, and message
    are correct.
11. Reply to the guest confirmation and verify that the reply reaches
    `ENQUIRY_REPLY_TO_EMAIL`—not the provider sender or a no-reply mailbox.
12. Repeat the test with an external mailbox and inspect inbox/spam placement. Confirm that no guest
    data appears in Sanity, application logs, or analytics.
13. Record who monitors delivery failures and the internal inbox. Review provider activity after
    launch and establish an operational response if delivery begins failing.

Do not enable the public enquiry flow in production until steps 1–12 pass. Do not use a real guest's
address or enquiry for deployment testing.

### Production readiness checklist

Email delivery is operational only after all of the following have been completed in the target
deployment environment:

- `mail@joshuaspoint.com` has been confirmed as the monitored recipient and reply-to mailbox.
- The selected sender domain has been authenticated with the provider.
- All required environment variables have been configured outside the repository.
- An end-to-end test has delivered both the internal notification and guest confirmation.
- A reply to the guest confirmation has reached the monitored Joshua's Point mailbox.
- Inbox and spam placement have been checked with representative external addresses.
- Provider failures and delivery activity have an owner and a monitoring routine.

Do not use a production guest address for the initial test. Builds and static validation prove the
integration compiles; they do not prove mailbox delivery.

## Validation and abuse controls

- Native browser validation supports the guest; the Server Action independently validates all
  fields.
- Text is normalized, control characters are removed, and email content remains plain text.
- Dates must be real calendar dates, arrival cannot be in the past, departure must follow arrival,
  and technical limits reject implausibly distant or oversized requests.
- The Server Action body is capped at 32 KB. Field and aggregate character limits add a second
  boundary.
- An off-screen honeypot quietly accepts likely automated submissions without delivering email.
- A lightweight in-memory limiter allows five attempts per client fingerprint per 15 minutes and
  suppresses identical submissions for two minutes. Raw IP addresses are not stored.
- Next.js applies its same-origin Server Action protection. Configure `allowedOrigins` only if a
  trusted reverse proxy requires it.

The in-memory limiter is intentionally the first layer, not a distributed guarantee. Multi-instance
production hosting should move this interface to a shared, expiring store such as managed Redis or
the deployment platform's rate-limit service. Confirm which proxy headers are trusted before using
them as a production identity signal.

## Domain authentication

Before production, verify the sending domain with the chosen provider and publish the exact SPF and
DKIM records it supplies. Review the existing SPF policy before adding another record; a domain
should not have competing SPF records. Add DMARC in monitoring mode first, review delivery reports,
then strengthen the policy deliberately. Use a dedicated transactional sender or subdomain when it
helps separate operational mail from personal correspondence.

The configured `From` address must belong to the authenticated domain. The guest address is used
only as `Reply-To` on the internal notification, avoiding sender spoofing and alignment failures.

Current provider references:

- [Resend domain verification](https://resend.com/docs/dashboard/domains/introduction)
- [Resend API key permissions](https://resend.com/docs/dashboard/api-keys/introduction)
- [Resend DMARC guidance](https://resend.com/docs/dashboard/domains/dmarc)
- [Resend domain-verification troubleshooting](https://resend.com/docs/knowledge-base/what-if-my-domain-is-not-verifying)

## Privacy

Enquiry values exist only in the request and the two transactional email messages. The application
does not write them to Sanity, a database, analytics, logs, or a newsletter. Retention then follows
the policies of the configured mailboxes and provider; those settings must be reviewed before
launch. Delivery errors are logged without guest content.

## Future protection

Before adding CAPTCHA, prefer stronger shared rate limiting, provider monitoring, origin and bot
signals available from the hosting edge, and operational alerting. Add a privacy-conscious CAPTCHA
only if measured abuse justifies its effect on accessibility and completion.
