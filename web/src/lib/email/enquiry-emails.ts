import type {EnquirySubmission} from '@/lib/enquiry/types'
import {stayPolicyLines} from '@/lib/stay/policy'

import type {EmailMessage} from './types'
import {
  emailDetails,
  emailHeading,
  emailInformationBlock,
  emailParagraph,
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
    `Guests: ${enquiry.guests}`,
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
  const policySummary = ['Current stay information:', ...stayPolicyLines()].join('\n')
  const arrivalDate = formatEmailDate(enquiry.arrivalDate)
  const departureDate = formatEmailDate(enquiry.departureDate)
  const guestEmailLink = `<a href="mailto:${escapeEmailHtml(enquiry.email)}" style="color:#1f3d3a;text-decoration:underline;text-decoration-color:#c8a26a;overflow-wrap:anywhere;word-break:break-word">${escapeEmailHtml(enquiry.email)}</a>`
  const phoneLink = enquiry.phone
    ? `<a href="tel:${escapeEmailHtml(enquiry.phone.replace(/[^+\d]/g, ''))}" style="color:#1f3d3a;text-decoration:underline;text-decoration-color:#c8a26a">${escapeEmailHtml(enquiry.phone)}</a>`
    : undefined

  return [
    {
      from,
      html: renderEmailShell({
        brand,
        content: [
          emailHeading('A new stay enquiry'),
          emailParagraph('A new enquiry has arrived through the Joshua’s Point website.'),
          emailDetails([
            ['Name', enquiry.name],
            ['Email', enquiry.email, guestEmailLink],
            phoneLink
              ? ['Phone / WhatsApp', enquiry.phone ?? 'Not provided', phoneLink]
              : ['Phone / WhatsApp', 'Not provided'],
            ['Arrival', arrivalDate],
            ['Departure', departureDate],
            ['Guests', String(enquiry.guests)],
            ['Message', enquiry.message],
          ]),
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
          emailHeading(`Thank you for writing, ${enquiry.name}`),
          emailParagraph(
            'Your enquiry has arrived. We have included the details you shared below for reference.',
          ),
          emailDetails([
            ['Name', enquiry.name],
            ['Email', enquiry.email],
            ['Phone / WhatsApp', enquiry.phone ?? 'Not provided'],
            ['Arrival', arrivalDate],
            ['Departure', departureDate],
            ['Guests', String(enquiry.guests)],
            ['Message', enquiry.message],
          ]),
          emailInformationBlock('Current stay information', stayPolicyLines()),
          emailParagraph(
            'This message confirms receipt of your enquiry only. It does not confirm availability or a booking.',
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
        policySummary,
        '',
        'This message confirms receipt of your enquiry only. It does not confirm availability or a booking.',
        '',
        'Warmly,',
        'Joshua’s Point',
      ].join('\n'),
      to: [enquiry.email],
    },
  ]
}
