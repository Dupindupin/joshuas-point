import type {EnquiryField, EnquirySubmission} from './types'

type ValidationResult =
  | {data: EnquirySubmission; success: true}
  | {fieldErrors: Partial<Record<EnquiryField, string>>; success: false}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[+\d][\d\s().-]*$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/

const MAX_FORM_CHARACTERS = 3_000
const MAX_GUESTS = 50
const MAX_STAY_DAYS = 365
const MAX_ADVANCE_DAYS = 1_095

function cleanSingleLine(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanMessage(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/\r\n?/g, '\n')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
}

function parseDate(value: string) {
  if (!datePattern.test(value)) return null
  const date = new Date(`${value}T00:00:00.000Z`)
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date
}

export function validateEnquiryForm(formData: FormData): ValidationResult {
  const name = cleanSingleLine(formData.get('name'))
  const email = cleanSingleLine(formData.get('email')).toLowerCase()
  const phone = cleanSingleLine(formData.get('phone'))
  const arrivalDate = cleanSingleLine(formData.get('arrivalDate'))
  const departureDate = cleanSingleLine(formData.get('departureDate'))
  const guestsValue = cleanSingleLine(formData.get('guests'))
  const message = cleanMessage(formData.get('message'))
  const fieldErrors: Partial<Record<EnquiryField, string>> = {}

  if (name.length < 2 || name.length > 100) {
    fieldErrors.name = 'Enter a name between 2 and 100 characters.'
  }

  if (email.length > 254 || !emailPattern.test(email)) {
    fieldErrors.email = 'Enter a valid email address.'
  }

  if (phone && (phone.length < 7 || phone.length > 40 || !phonePattern.test(phone))) {
    fieldErrors.phone = 'Enter a valid phone or WhatsApp number, or leave this field empty.'
  }

  const arrival = parseDate(arrivalDate)
  const departure = parseDate(departureDate)
  const todayValue = new Date().toISOString().slice(0, 10)
  const today = parseDate(todayValue)!

  if (!arrival) {
    fieldErrors.arrivalDate = 'Enter a valid arrival date.'
  } else if (arrival < today) {
    fieldErrors.arrivalDate = 'Arrival cannot be in the past.'
  } else if (arrival.getTime() - today.getTime() > MAX_ADVANCE_DAYS * 86_400_000) {
    fieldErrors.arrivalDate = 'Choose an arrival date within the next three years.'
  }

  if (!departure) {
    fieldErrors.departureDate = 'Enter a valid departure date.'
  } else if (arrival && departure <= arrival) {
    fieldErrors.departureDate = 'Departure must be after arrival.'
  } else if (arrival && departure.getTime() - arrival.getTime() > MAX_STAY_DAYS * 86_400_000) {
    fieldErrors.departureDate = 'An enquiry cannot cover more than 365 nights.'
  }

  const guests = Number(guestsValue)
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) {
    fieldErrors.guests = `Enter a whole number between 1 and ${MAX_GUESTS}.`
  }

  if (message.length < 10 || message.length > 2_000) {
    fieldErrors.message = 'Enter a message between 10 and 2,000 characters.'
  }

  const totalCharacters =
    name.length +
    email.length +
    phone.length +
    arrivalDate.length +
    departureDate.length +
    guestsValue.length +
    message.length

  if (totalCharacters > MAX_FORM_CHARACTERS) {
    fieldErrors.message = 'This enquiry is too large. Please shorten the message and try again.'
  }

  if (Object.keys(fieldErrors).length > 0) return {fieldErrors, success: false}

  return {
    data: {
      arrivalDate,
      departureDate,
      email,
      guests,
      message,
      name,
      ...(phone ? {phone} : {}),
    },
    success: true,
  }
}
