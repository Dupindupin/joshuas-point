export type EnquiryField =
  'arrivalDate' | 'departureDate' | 'email' | 'guests' | 'message' | 'name' | 'phone'

export type EnquiryFormState = {
  fieldErrors?: Partial<Record<EnquiryField, string>>
  message?: string
  status: 'error' | 'idle' | 'success'
}

export type EnquiryFormAction = (
  previousState: EnquiryFormState,
  formData: FormData,
) => Promise<EnquiryFormState>

export type EnquirySubmission = {
  arrivalDate: string
  departureDate: string
  email: string
  guests: number
  message: string
  name: string
  phone?: string
}

export const initialEnquiryFormState: EnquiryFormState = {status: 'idle'}
