export type EnquiryDeliveryState =
  'deliveryError' | 'disabledByOwner' | 'systemReady' | 'unavailable'

type DeliveryStatus =
  'disabled' | 'failed' | 'notAttempted' | 'partiallySent' | 'pending' | 'sent' | null | undefined

export function resolveEnquiryDeliveryState({
  configured,
  lastDeliveryStatus,
  mode,
}: {
  configured: boolean
  lastDeliveryStatus: DeliveryStatus
  mode: 'disabled' | 'live' | 'test'
}): EnquiryDeliveryState {
  if (!configured) return 'unavailable'
  if (mode === 'disabled') return 'disabledByOwner'
  if (lastDeliveryStatus === 'failed' || lastDeliveryStatus === 'partiallySent') {
    return 'deliveryError'
  }
  return 'systemReady'
}
