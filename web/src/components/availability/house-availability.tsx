'use client'

import Link from 'next/link'
import {useMemo, useState} from 'react'

import {enquiryHref, selectStayDate, type StayDateSelection} from '@/lib/availability/selection'
import type {PublicAvailabilityPeriod, PublicHouseAvailability} from '@/lib/availability/types'

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

function parseDate(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

function dateValue(date: Date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function startOfMonth(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
}

function addMonths(date: Date, amount: number) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + amount, 1))
}

function addDays(date: Date, amount: number) {
  const result = new Date(date)
  result.setUTCDate(result.getUTCDate() + amount)
  return result
}

function propertyTodayValue() {
  const parts = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'Asia/Manila',
    year: 'numeric',
  }).formatToParts(new Date())
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}

function formatDate(value: string) {
  return parseDate(value).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  })
}

function formatUnavailablePeriod(period: PublicAvailabilityPeriod) {
  const finalUnavailableDate = dateValue(addDays(parseDate(period.endDate), -1))
  return `${formatDate(period.startDate)} – ${formatDate(finalUnavailableDate)}`
}

function unavailableOn(date: string, periods: PublicAvailabilityPeriod[]) {
  return periods.some((period) => period.startDate <= date && period.endDate > date)
}

function monthWeeks(month: Date) {
  const firstDayOffset = (month.getUTCDay() + 6) % 7
  const daysInMonth = new Date(
    Date.UTC(month.getUTCFullYear(), month.getUTCMonth() + 1, 0),
  ).getUTCDate()
  const cells = [
    ...Array.from({length: firstDayOffset}, () => null),
    ...Array.from(
      {length: daysInMonth},
      (_, index) => new Date(Date.UTC(month.getUTCFullYear(), month.getUTCMonth(), index + 1)),
    ),
  ]
  const trailingCells = (7 - (cells.length % 7)) % 7
  cells.push(...Array.from({length: trailingCells}, () => null))

  return Array.from({length: cells.length / 7}, (_, index) => cells.slice(index * 7, index * 7 + 7))
}

export function HouseAvailabilityCalendar({availability}: {availability: PublicHouseAvailability}) {
  const todayValue = useMemo(() => propertyTodayValue(), [])
  const firstMonth = startOfMonth(parseDate(todayValue))
  const confirmationMonth = startOfMonth(parseDate(availability.availabilityConfirmedThrough))
  const [visibleMonth, setVisibleMonth] = useState(firstMonth)
  const [selection, setSelection] = useState<StayDateSelection>({
    arrivalDate: '',
    departureDate: '',
    error: null,
  })
  const weeks = monthWeeks(visibleMonth)
  const previousDisabled = visibleMonth <= firstMonth
  const nextDisabled = addMonths(visibleMonth, 1) > confirmationMonth
  const currentPeriods = availability.periods.filter(
    (period) =>
      period.endDate > todayValue && period.startDate <= availability.availabilityConfirmedThrough,
  )
  const horizonExpired = availability.availabilityConfirmedThrough < todayValue

  function handleDateSelection(value: string) {
    setSelection((current) => selectStayDate(current, value, availability))
  }

  return (
    <section
      aria-labelledby="house-availability-title"
      className="border-y border-ink/18 py-10 sm:py-12"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="font-body text-xs font-semibold tracking-[0.16em] text-ink-subtle uppercase">
            Whole house
          </p>
          <h2
            className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl"
            id="house-availability-title"
          >
            Current availability
          </h2>
          <p className="mt-5 font-body text-base leading-8 text-ink-muted">
            This calendar has been reviewed through{' '}
            <strong className="font-semibold text-ink">
              {formatDate(availability.availabilityConfirmedThrough)}
            </strong>
            . A stay is confirmed only after we reply.
          </p>
        </div>
        <div
          aria-label="Availability key"
          className="flex flex-wrap gap-x-5 gap-y-2 font-body text-sm text-ink-muted"
        >
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="h-4 w-4 rounded-full border border-ink/25 bg-surface-soft"
            />
            Available
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="h-4 w-4 rounded-full bg-ink" />
            Unavailable
          </span>
        </div>
      </div>

      {horizonExpired ? (
        <p className="mt-9 border-l border-warning/60 pl-5 font-body text-sm leading-7 text-ink-muted">
          The current availability window has ended. Please send an enquiry while the calendar is
          being reviewed.
        </p>
      ) : (
        <div className="mt-10 max-w-3xl">
          <div className="flex items-center justify-between gap-4 border-b border-ink/18 pb-5">
            <button
              aria-label="Show previous month"
              className="min-h-11 rounded-full border border-ink/25 px-4 py-2 font-body text-sm text-ink hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-35"
              disabled={previousDisabled}
              onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
              type="button"
            >
              Previous
            </button>
            <p aria-live="polite" className="font-display text-xl text-ink sm:text-2xl">
              {visibleMonth.toLocaleDateString('en-US', {
                month: 'long',
                timeZone: 'UTC',
                year: 'numeric',
              })}
            </p>
            <button
              aria-label="Show next month"
              className="min-h-11 rounded-full border border-ink/25 px-4 py-2 font-body text-sm text-ink hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-35"
              disabled={nextDisabled}
              onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
              type="button"
            >
              Next
            </button>
          </div>

          <p
            aria-live="polite"
            className="mt-7 font-body text-sm leading-7 text-ink-muted"
            id="availability-selection-help"
          >
            {!selection.arrivalDate
              ? 'Choose an arrival date, then choose a departure date.'
              : selection.departureDate
                ? `Selected stay: ${formatDate(selection.arrivalDate)} to ${formatDate(selection.departureDate)}.`
                : `Arrival: ${formatDate(selection.arrivalDate)}. Now choose a departure date.`}
          </p>

          <table className="mt-5 w-full table-fixed border-separate border-spacing-1 sm:border-spacing-2">
            <caption className="sr-only">
              Whole-house availability for{' '}
              {visibleMonth.toLocaleDateString('en-US', {
                month: 'long',
                timeZone: 'UTC',
                year: 'numeric',
              })}
            </caption>
            <thead>
              <tr>
                {weekdays.map((weekday) => (
                  <th
                    className="pb-2 text-center font-body text-[0.68rem] font-semibold tracking-[0.08em] text-ink-subtle uppercase sm:text-xs"
                    key={weekday}
                    scope="col"
                  >
                    {weekday}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {weeks.map((week, weekIndex) => (
                <tr key={`week-${weekIndex}`}>
                  {week.map((day, dayIndex) => {
                    if (!day) return <td aria-hidden="true" key={`empty-${dayIndex}`} />

                    const value = dateValue(day)
                    const withinWindow =
                      value >= todayValue && value <= availability.availabilityConfirmedThrough
                    const unavailable = withinWindow && unavailableOn(value, currentPeriods)
                    const state = unavailable ? 'Unavailable' : withinWindow ? 'Available' : null
                    const selected =
                      value === selection.arrivalDate || value === selection.departureDate
                    const withinSelectedStay =
                      Boolean(selection.arrivalDate && selection.departureDate) &&
                      value > selection.arrivalDate &&
                      value < selection.departureDate

                    const cellClasses = `flex aspect-square min-h-11 w-full items-center justify-center rounded-sm font-body text-sm sm:min-h-12 sm:text-base ${
                      unavailable
                        ? 'bg-ink text-canvas'
                        : selected
                          ? 'border border-accent bg-accent text-inverse'
                          : withinSelectedStay
                            ? 'border border-accent/35 bg-accent/12 text-ink'
                            : withinWindow
                              ? 'border border-ink/15 bg-surface-soft text-ink'
                              : 'text-ink-subtle/45'
                    }`

                    return (
                      <td key={value}>
                        {withinWindow && !unavailable ? (
                          <button
                            aria-describedby="availability-selection-help"
                            aria-label={`${formatDate(value)}, available${selected ? ', selected' : ''}`}
                            aria-pressed={selected}
                            className={`${cellClasses} cursor-pointer ${selected ? 'hover:brightness-95' : 'hover:border-accent hover:text-accent'} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus`}
                            onClick={() => handleDateSelection(value)}
                            type="button"
                          >
                            <time dateTime={value}>{day.getUTCDate()}</time>
                          </button>
                        ) : (
                          <div className={cellClasses}>
                            <time dateTime={value}>{day.getUTCDate()}</time>
                            <span className="sr-only">
                              , {state ?? 'outside the confirmed availability window'}
                            </span>
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-7 min-h-7" role="status">
            {selection.error ? (
              <p className="font-body text-sm leading-7 text-warning">{selection.error}</p>
            ) : null}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-5">
            {selection.arrivalDate && selection.departureDate ? (
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink bg-inverse-surface px-7 py-3 font-body text-sm font-semibold text-inverse hover:border-accent hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                href={enquiryHref(selection)}
              >
                Plan your stay
              </Link>
            ) : null}
            {selection.arrivalDate ? (
              <button
                className="inline-flex min-h-11 items-center border-b border-ink/35 font-body text-sm font-semibold text-ink hover:border-accent hover:text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                onClick={() => setSelection({arrivalDate: '', departureDate: '', error: null})}
                type="button"
              >
                Clear dates
              </button>
            ) : null}
          </div>
        </div>
      )}

      <details className="mt-9 max-w-3xl border-t border-ink/18 pt-6">
        <summary className="flex min-h-11 cursor-pointer items-center font-body text-sm font-semibold text-ink focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus">
          Read availability as text
        </summary>
        <div className="mt-5 font-body text-sm leading-7 text-ink-muted">
          {currentPeriods.length ? (
            <>
              <p>Unavailable dates currently shown:</p>
              <ul className="mt-3 list-disc space-y-1 pl-5">
                {currentPeriods.map((period) => (
                  <li key={`${period.startDate}-${period.endDate}`}>
                    {formatUnavailablePeriod(period)}
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                Other future dates through {formatDate(availability.availabilityConfirmedThrough)}{' '}
                are shown as available. Please enquire for final confirmation.
              </p>
            </>
          ) : (
            <p>
              No unavailable dates are recorded through{' '}
              {formatDate(availability.availabilityConfirmedThrough)}. Please enquire for final
              confirmation.
            </p>
          )}
        </div>
      </details>
    </section>
  )
}

export function HouseAvailabilitySummary({
  availability,
  id = 'enquiry-house-availability',
}: {
  availability: PublicHouseAvailability
  id?: string
}) {
  const todayValue = propertyTodayValue()
  const futurePeriods = availability.periods.filter(
    (period) =>
      period.endDate > todayValue && period.startDate <= availability.availabilityConfirmedThrough,
  )

  return (
    <aside className="mb-8 border-y border-ink/18 py-6" id={id}>
      <p className="font-body text-xs font-semibold tracking-[0.16em] text-ink-subtle uppercase">
        Whole-house availability
      </p>
      <p className="mt-4 font-body text-sm leading-7 text-ink-muted">
        This calendar has been reviewed through{' '}
        <strong className="font-semibold text-ink">
          {formatDate(availability.availabilityConfirmedThrough)}
        </strong>
        . A stay is confirmed only after we reply.
      </p>
      {futurePeriods.length ? (
        <div className="mt-4">
          <p className="font-body text-sm text-ink">Unavailable dates:</p>
          <ul className="mt-2 space-y-1 font-body text-sm leading-7 text-ink-muted">
            {futurePeriods.slice(0, 2).map((period) => (
              <li key={`${period.startDate}-${period.endDate}`}>
                {formatUnavailablePeriod(period)}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-4 font-body text-sm leading-7 text-ink-muted">
          No unavailable dates are currently recorded within that window.
        </p>
      )}
      <Link
        className="mt-4 inline-flex min-h-11 items-center border-b border-ink/35 font-body text-sm font-semibold text-ink hover:border-accent hover:text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        href="/plan-your-stay#house-availability-title"
      >
        View the full availability calendar
      </Link>
    </aside>
  )
}
