'use client'

import Link from 'next/link'
import {useActionState, useEffect, useRef} from 'react'
import type {FormEvent, ReactNode} from 'react'

import {
  initialEnquiryFormState,
  type EnquiryField,
  type EnquiryFormAction,
} from '@/lib/enquiry/types'
import {stayPolicyLines} from '@/lib/stay/policy'

type EnquiryFormProps = {
  action: EnquiryFormAction
}

const inputClasses =
  'mt-3 min-h-12 w-full rounded-none border-0 border-b border-ink/28 bg-transparent px-0 py-3 font-body text-base text-ink outline-none placeholder:text-ink/35 focus:border-accent focus:ring-0'

const labelClasses = 'font-body text-xs font-semibold tracking-[0.16em] text-ink/62 uppercase'

function RequiredLabel({children}: {children: string}) {
  return (
    <>
      {children}
      <span aria-hidden="true" className="ml-1 text-warning">
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  )
}

function FieldError({children, id}: {children?: ReactNode; id: string}) {
  if (!children) return null

  return (
    <p className="mt-2 font-body text-sm leading-6 text-warning" id={id}>
      {children}
    </p>
  )
}

export function EnquiryForm({action}: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(action, initialEnquiryFormState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'success') formRef.current?.reset()
  }, [state.status])

  function fieldError(field: EnquiryField) {
    return state.fieldErrors?.[field]
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget
    const formData = new FormData(form)
    const arrivalDate = String(formData.get('arrivalDate') ?? '')
    const departureDate = String(formData.get('departureDate') ?? '')
    const departureInput = form.elements.namedItem('departureDate') as HTMLInputElement | null

    if (arrivalDate && departureDate && departureDate <= arrivalDate) {
      departureInput?.setCustomValidity('Departure must be after arrival.')
      departureInput?.reportValidity()
      departureInput?.focus()
      event.preventDefault()
      return
    }

    departureInput?.setCustomValidity('')
  }

  return (
    <form
      action={formAction}
      aria-describedby="enquiry-form-delivery-note enquiry-form-privacy-note"
      aria-label="Stay enquiry"
      className="w-full"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div
        className="border-l border-ink/25 pl-5 font-body text-sm leading-7 text-ink/65 sm:pl-6"
        id="enquiry-form-delivery-note"
      >
        Your details are used only to understand and respond to this enquiry.
      </div>

      <div className="mt-8 border-l border-ink/25 pl-5 sm:pl-6">
        <p className="font-body text-xs font-semibold tracking-[0.16em] text-ink/62 uppercase">
          Current stay information
        </p>
        <ul className="mt-4 space-y-1 font-body text-sm leading-7 text-ink/65">
          {stayPolicyLines().map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="enquiry-website">Website</label>
        <input autoComplete="off" id="enquiry-website" name="website" tabIndex={-1} type="text" />
      </div>

      <fieldset className="mt-14">
        <legend className="sr-only">Your contact details and stay enquiry</legend>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          <div>
            <label className={labelClasses} htmlFor="enquiry-name">
              <RequiredLabel>Name</RequiredLabel>
            </label>
            <input
              autoComplete="name"
              aria-describedby={fieldError('name') ? 'enquiry-name-error' : undefined}
              aria-invalid={fieldError('name') ? true : undefined}
              className={inputClasses}
              id="enquiry-name"
              maxLength={100}
              name="name"
              required
              type="text"
            />
            <FieldError id="enquiry-name-error">{fieldError('name')}</FieldError>
          </div>

          <div>
            <label className={labelClasses} htmlFor="enquiry-email">
              <RequiredLabel>Email</RequiredLabel>
            </label>
            <input
              autoComplete="email"
              aria-describedby={fieldError('email') ? 'enquiry-email-error' : undefined}
              aria-invalid={fieldError('email') ? true : undefined}
              className={inputClasses}
              id="enquiry-email"
              maxLength={254}
              name="email"
              required
              type="email"
            />
            <FieldError id="enquiry-email-error">{fieldError('email')}</FieldError>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClasses} htmlFor="enquiry-phone">
              Phone or WhatsApp <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              autoComplete="tel"
              aria-describedby={fieldError('phone') ? 'enquiry-phone-error' : undefined}
              aria-invalid={fieldError('phone') ? true : undefined}
              className={inputClasses}
              id="enquiry-phone"
              inputMode="tel"
              maxLength={40}
              name="phone"
              type="tel"
            />
            <FieldError id="enquiry-phone-error">{fieldError('phone')}</FieldError>
          </div>

          <div>
            <label className={labelClasses} htmlFor="enquiry-arrival-date">
              <RequiredLabel>Arrival date</RequiredLabel>
            </label>
            <input
              aria-describedby={
                fieldError('arrivalDate') ? 'enquiry-arrival-date-error' : undefined
              }
              aria-invalid={fieldError('arrivalDate') ? true : undefined}
              className={inputClasses}
              id="enquiry-arrival-date"
              name="arrivalDate"
              required
              type="date"
            />
            <FieldError id="enquiry-arrival-date-error">{fieldError('arrivalDate')}</FieldError>
          </div>

          <div>
            <label className={labelClasses} htmlFor="enquiry-departure-date">
              <RequiredLabel>Departure date</RequiredLabel>
            </label>
            <input
              aria-describedby={
                fieldError('departureDate') ? 'enquiry-departure-date-error' : undefined
              }
              aria-invalid={fieldError('departureDate') ? true : undefined}
              className={inputClasses}
              id="enquiry-departure-date"
              name="departureDate"
              onInput={(event) => event.currentTarget.setCustomValidity('')}
              required
              type="date"
            />
            <FieldError id="enquiry-departure-date-error">{fieldError('departureDate')}</FieldError>
          </div>

          <div>
            <label className={labelClasses} htmlFor="enquiry-guests">
              <RequiredLabel>Number of guests</RequiredLabel>
            </label>
            <input
              aria-describedby={fieldError('guests') ? 'enquiry-guests-error' : undefined}
              aria-invalid={fieldError('guests') ? true : undefined}
              className={inputClasses}
              id="enquiry-guests"
              inputMode="numeric"
              max={50}
              min={1}
              name="guests"
              required
              step={1}
              type="number"
            />
            <FieldError id="enquiry-guests-error">{fieldError('guests')}</FieldError>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClasses} htmlFor="enquiry-message">
              <RequiredLabel>Message</RequiredLabel>
            </label>
            <textarea
              aria-describedby={fieldError('message') ? 'enquiry-message-error' : undefined}
              aria-invalid={fieldError('message') ? true : undefined}
              className={`${inputClasses} min-h-40 resize-y leading-8`}
              id="enquiry-message"
              maxLength={2000}
              name="message"
              required
              rows={6}
            />
            <FieldError id="enquiry-message-error">{fieldError('message')}</FieldError>
          </div>
        </div>
      </fieldset>

      <p
        className="mt-9 max-w-xl font-body text-sm leading-7 text-ink/62"
        id="enquiry-form-privacy-note"
      >
        Enquiry details will be used only to understand and respond to your message. They will not
        be added to a newsletter or used for unrelated marketing. Read the{' '}
        <Link
          className="rounded-sm border-b border-ink/35 pb-0.5 font-semibold text-ink hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
          href="/privacy"
        >
          privacy notice
        </Link>
        .
      </p>

      <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink bg-inverse-surface px-7 py-3 font-body text-sm font-semibold tracking-[0.01em] text-inverse hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus disabled:cursor-wait disabled:opacity-55"
          disabled={pending}
          type="submit"
        >
          {pending ? 'Sending enquiry…' : 'Send enquiry'}
        </button>
        <p
          aria-live={state.status === 'error' ? 'assertive' : 'polite'}
          className={`max-w-md font-body text-sm leading-7 ${state.status === 'error' ? 'text-warning' : 'text-ink-muted'}`}
          role={state.status === 'error' ? 'alert' : 'status'}
        >
          {state.message}
        </p>
      </div>
    </form>
  )
}
