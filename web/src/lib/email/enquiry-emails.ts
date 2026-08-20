import type {EnquirySubmission} from '@/lib/enquiry/types'
import {stayPolicy} from '@/lib/stay/policy'

import type {EmailMessage} from './types'
import {
  defaultEmailBrand,
  emailHeading,
  emailKicker,
  emailMessageBlock,
  emailParagraph,
  emailSummaryCards,
  escapeEmailHtml,
  renderEmailShell,
} from './email-shell'
import type {EmailBrand} from './types'

type EnquiryEmailPairOptions = {
  enquiry: EnquirySubmission
  from: string
  internalRecipient: string
  replyTo: string
  brand?: EmailBrand
}

function formatEmailDate(value: string) {
  const date = new Date(`${value}T00:00:00.000Z`)
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(date)
}

function enquirySummary(enquiry: EnquirySubmission) {
  return [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone / WhatsApp: ${enquiry.phone ?? 'Not provided'}`,
    `Arrival: ${enquiry.arrivalDate}`,
    `Departure: ${enquiry.departureDate}`,
    `Guests: ${enquiry.guests} (maximum ${stayPolicy.maximumGuests} for the whole-house stay)`,
    '',
    'Message:',
    enquiry.message,
  ].join('\n')
}

export function createEnquiryEmails({
  enquiry,
  from,
  internalRecipient,
  replyTo,
  brand,
}: EnquiryEmailPairOptions): readonly EmailMessage[] {
  const summary = enquirySummary(enquiry)
  const resolvedBrand = brand ?? defaultEmailBrand
  const cancellationPolicyUrl = new URL('/cancellation-policy', resolvedBrand.siteUrl).toString()
  const policyLink = `<a class="email-link" href="${escapeEmailHtml(cancellationPolicyUrl)}" style="color:#1f3d3a;text-decoration:underline;text-decoration-color:#c8a26a;overflow-wrap:anywhere;word-break:break-word">Cancellation &amp; Rebooking Policy</a>`
  const arrivalDate = formatEmailDate(enquiry.arrivalDate)
  const departureDate = formatEmailDate(enquiry.departureDate)
  const guestEmailLink = `<a class="email-link" href="mailto:${escapeEmailHtml(enquiry.email)}" style="color:#1f3d3a;text-decoration:underline;text-decoration-color:#c8a26a;overflow-wrap:anywhere;word-break:break-word">${escapeEmailHtml(enquiry.email)}</a>`
  const phoneLink = enquiry.phone
    ? `<a class="email-link" href="tel:${escapeEmailHtml(enquiry.phone.replace(/[^+\d]/g, ''))}" style="color:#1f3d3a;text-decoration:underline;text-decoration-color:#c8a26a">${escapeEmailHtml(enquiry.phone)}</a>`
    : undefined

  return [
    {
      from,
      html: renderEmailShell({
        brand,
        content: [
          emailKicker('Owner notification'),
          emailHeading('A new stay enquiry'),
          emailParagraph('The essential details are grouped below for a quick reply.'),
          emailSummaryCards([
            ['Arrival', arrivalDate],
            ['Departure', departureDate],
            [`Guests (maximum ${stayPolicy.maximumGuests})`, String(enquiry.guests)],
            ['Guest', enquiry.name],
            ['Email', enquiry.email, guestEmailLink],
            phoneLink
              ? ['Phone / WhatsApp', enquiry.phone ?? 'Not provided', phoneLink]
              : ['Phone / WhatsApp', 'Not provided'],
          ]),
          emailMessageBlock('Guest message', enquiry.message),
          emailParagraph(
            'Reply directly to this email to continue the conversation with the guest.',
          ),
        ].join(''),
        preheader: `New stay enquiry from ${enquiry.name}`,
      }),
      replyTo: enquiry.email,
      subject: `Stay enquiry — ${enquiry.name}, ${arrivalDate}`,
      text: [
        'A new enquiry has arrived through the Joshua’s Point website.',
        '',
        summary,
        '',
        'Reply directly to this email to continue the conversation with the guest.',
      ].join('\n'),
      to: [internalRecipient],
    },
    {
      from,
      html: renderEmailShell({
        brand,
        content: [
          emailKicker('Enquiry received'),
          emailHeading(`Thank you for writing, ${enquiry.name}`),
          emailParagraph(
            'Thank you for thinking of Joshua’s Point for your stay. Your message has reached us, and we will read it personally before we reply.',
          ),
          emailSummaryCards([
            ['Arrival', arrivalDate],
            ['Departure', departureDate],
            [`Guests (maximum ${stayPolicy.maximumGuests})`, String(enquiry.guests)],
          ]),
          emailMessageBlock('Your message', enquiry.message),
          emailParagraph(
            `For general guidance, read the ${policyLink}. The stay-specific payment and cancellation terms in your personal written confirmation will be authoritative.`,
          ),
          emailParagraph(
            'This message confirms receipt of your enquiry only. A stay is confirmed only when Joshua’s Point sends your personal written confirmation.',
          ),
          emailParagraph('Warmly,<br>Joshua’s Point'),
        ].join(''),
        preheader: 'We received your Joshua’s Point enquiry.',
      }),
      replyTo,
      subject: 'We received your enquiry — Joshua’s Point',
      text: [
        `Hello ${enquiry.name},`,
        '',
        'Thank you for writing to Joshua’s Point. Your enquiry has arrived, and the details you shared are included below for reference.',
        '',
        summary,
        '',
        `Cancellation & Rebooking Policy: ${cancellationPolicyUrl}`,
        'The stay-specific payment and cancellation terms in your personal written confirmation will be authoritative.',
        '',
        'This message confirms receipt of your enquiry only. A stay is confirmed only when Joshua’s Point sends your personal written confirmation.',
        '',
        'Warmly,',
        'Joshua’s Point',
      ].join('\n'),
      to: [enquiry.email],
    },
  ]
}
