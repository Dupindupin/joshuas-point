import type {EnquirySubmission} from '@/lib/enquiry/types'

import type {EmailMessage} from './types'

type EnquiryEmailPairOptions = {
  enquiry: EnquirySubmission
  from: string
  internalRecipient: string
  replyTo: string
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
}: EnquiryEmailPairOptions): readonly EmailMessage[] {
  const summary = enquirySummary(enquiry)

  return [
    {
      from,
      replyTo: enquiry.email,
      subject: 'New stay enquiry',
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
      replyTo,
      subject: 'We received your enquiry — Joshua’s Point',
      text: [
        `Hello ${enquiry.name},`,
        '',
        'Thank you for writing to Joshua’s Point. Your enquiry has arrived, and the details you shared are included below for reference.',
        '',
        summary,
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
