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

| Variable                 | Purpose                                                           |
| ------------------------ | ----------------------------------------------------------------- |
| `ENQUIRY_EMAIL_PROVIDER` | Active adapter. Currently `resend`.                               |
| `ENQUIRY_FROM_EMAIL`     | Verified sender, optionally with a display name.                  |
| `ENQUIRY_TO_EMAIL`       | Internal recipient for new enquiries.                             |
| `ENQUIRY_REPLY_TO_EMAIL` | Property address used when a guest replies to their confirmation. |
| `RESEND_API_KEY`         | Server-only Resend API credential.                                |

If any required value is absent or invalid, the form fails safely and tells the guest that nothing
was sent. Builds do not send test email.

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

## Privacy

Enquiry values exist only in the request and the two transactional email messages. The application
does not write them to Sanity, a database, analytics, logs, or a newsletter. Retention then follows
the policies of the configured mailboxes and provider; those settings must be reviewed before
launch. Delivery errors are logged without guest content.

## Future protection

Before adding CAPTCHA, prefer stronger shared rate limiting, provider monitoring, origin and bot
signals available from the hosting edge, and operational alerting. Add a privacy-conscious CAPTCHA
only if measured abuse justifies its effect on accessibility and completion.
