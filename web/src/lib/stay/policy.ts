export const stayPolicy = {
  cancellation:
    'The 20% deposit is non-refundable for cancellations made within 14 days before arrival.',
  checkIn: '2:00 PM',
  checkOut: '12:00 noon',
  deposit: '20% deposit required',
  minimumStay: '2 nights',
} as const

export function stayPolicyLines() {
  return [
    `Check-in: ${stayPolicy.checkIn}`,
    `Check-out: ${stayPolicy.checkOut}`,
    `Minimum stay: ${stayPolicy.minimumStay}`,
    `Deposit: ${stayPolicy.deposit}`,
    `Cancellation: ${stayPolicy.cancellation}`,
  ] as const
}
