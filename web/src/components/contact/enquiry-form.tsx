'use client'

import {useState} from 'react'
import type {FormEvent} from 'react'

export type EnquiryFormAction = (formData: FormData) => Promise<void> | void

type EnquiryFormProps = {
  action?: EnquiryFormAction
}

const inputClasses =
  'mt-3 min-h-12 w-full rounded-none border-0 border-b border-charcoal/28 bg-transparent px-0 py-3 font-body text-base text-charcoal outline-none placeholder:text-charcoal/35 focus:border-forest focus:ring-0'

const labelClasses = 'font-body text-xs font-semibold tracking-[0.16em] text-charcoal/62 uppercase'

function RequiredLabel({children}: {children: string}) {
  return (
    <>
      {children}
      <span aria-hidden="true" className="ml-1 text-timber">
        *
      </span>
      <span className="sr-only"> (required)</span>
    </>
  )
}

export function EnquiryForm({action}: EnquiryFormProps) {
  const [developmentMessage, setDevelopmentMessage] = useState<string>()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (action) return

    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const arrivalDate = String(formData.get('arrivalDate') ?? '')
    const departureDate = String(formData.get('departureDate') ?? '')
    const departureInput = form.elements.namedItem('departureDate') as HTMLInputElement | null

    if (arrivalDate && departureDate && departureDate <= arrivalDate) {
      departureInput?.setCustomValidity('Departure must be after arrival.')
      departureInput?.reportValidity()
      departureInput?.focus()
      setDevelopmentMessage(undefined)
      return
    }

    departureInput?.setCustomValidity('')
    setDevelopmentMessage(
      'Your enquiry has not been sent. Delivery will be enabled after transactional email is configured.',
    )
  }

  return (
    <form
      action={action}
      aria-describedby="enquiry-form-development-note enquiry-form-privacy-note"
      className="w-full"
      onSubmit={handleSubmit}
    >
      <div
        className="border-l border-charcoal/25 pl-5 font-body text-sm leading-7 text-charcoal/65 sm:pl-6"
        id="enquiry-form-development-note"
      >
        Development form: details entered here are not sent or stored yet.
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
              className={inputClasses}
              id="enquiry-name"
              maxLength={100}
              name="name"
              required
              type="text"
            />
          </div>

          <div>
            <label className={labelClasses} htmlFor="enquiry-email">
              <RequiredLabel>Email</RequiredLabel>
            </label>
            <input
              autoComplete="email"
              className={inputClasses}
              id="enquiry-email"
              maxLength={254}
              name="email"
              required
              type="email"
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClasses} htmlFor="enquiry-phone">
              Phone or WhatsApp <span className="normal-case tracking-normal">(optional)</span>
            </label>
            <input
              autoComplete="tel"
              className={inputClasses}
              id="enquiry-phone"
              inputMode="tel"
              maxLength={40}
              name="phone"
              type="tel"
            />
          </div>

          <div>
            <label className={labelClasses} htmlFor="enquiry-arrival-date">
              <RequiredLabel>Arrival date</RequiredLabel>
            </label>
            <input
              className={inputClasses}
              id="enquiry-arrival-date"
              name="arrivalDate"
              required
              type="date"
            />
          </div>

          <div>
            <label className={labelClasses} htmlFor="enquiry-departure-date">
              <RequiredLabel>Departure date</RequiredLabel>
            </label>
            <input
              className={inputClasses}
              id="enquiry-departure-date"
              name="departureDate"
              onInput={(event) => event.currentTarget.setCustomValidity('')}
              required
              type="date"
            />
          </div>

          <div>
            <label className={labelClasses} htmlFor="enquiry-guests">
              <RequiredLabel>Number of guests</RequiredLabel>
            </label>
            <input
              className={inputClasses}
              id="enquiry-guests"
              inputMode="numeric"
              min={1}
              name="guests"
              required
              step={1}
              type="number"
            />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClasses} htmlFor="enquiry-message">
              <RequiredLabel>Message</RequiredLabel>
            </label>
            <textarea
              className={`${inputClasses} min-h-40 resize-y leading-8`}
              id="enquiry-message"
              maxLength={2000}
              name="message"
              required
              rows={6}
            />
          </div>
        </div>
      </fieldset>

      <p
        className="mt-9 max-w-xl font-body text-sm leading-7 text-charcoal/62"
        id="enquiry-form-privacy-note"
      >
        Enquiry details will be used only to understand and respond to your message. They will not
        be added to a newsletter or used for unrelated marketing.
      </p>

      <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <button
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-charcoal bg-charcoal px-7 py-3 font-body text-sm font-semibold tracking-[0.01em] text-linen hover:border-forest hover:bg-forest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest"
          type="submit"
        >
          Prepare enquiry
        </button>
        <p
          aria-live="polite"
          className="max-w-md font-body text-sm leading-7 text-charcoal/68"
          role="status"
        >
          {developmentMessage}
        </p>
      </div>
    </form>
  )
}
