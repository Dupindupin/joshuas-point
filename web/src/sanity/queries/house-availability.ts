import {cache} from 'react'

import type {PublicAvailabilityPeriod, PublicHouseAvailability} from '@/lib/availability/types'

import {sanityClient} from '../client'

const liveSanityClient = sanityClient.withConfig({useCdn: false})

type SanityHouseAvailability = {
  availabilityConfirmedThrough?: string | null
  periods?: Array<{
    endDate?: string | null
    startDate?: string | null
  } | null> | null
}

const houseAvailabilityQuery = /* groq */ `
  *[
    _type == "houseAvailability" &&
    _id == "houseAvailability" &&
    publicDisplayEnabled == true
  ][0] {
    availabilityConfirmedThrough,
    periods[] {
      startDate,
      endDate
    }
  }
`

function validDate(value: string | null | undefined): value is string {
  return Boolean(value && /^\d{4}-\d{2}-\d{2}$/.test(value))
}

function normalizePeriod(
  period: NonNullable<SanityHouseAvailability['periods']>[number],
): PublicAvailabilityPeriod | null {
  if (
    !period ||
    !validDate(period.startDate) ||
    !validDate(period.endDate) ||
    period.endDate <= period.startDate
  ) {
    return null
  }

  return {endDate: period.endDate, startDate: period.startDate}
}

function normalizeAvailability(
  result: SanityHouseAvailability | null,
): PublicHouseAvailability | null {
  if (!result || !validDate(result.availabilityConfirmedThrough)) return null

  const periods = (result.periods ?? [])
    .map(normalizePeriod)
    .filter((period): period is PublicAvailabilityPeriod => Boolean(period))
    .sort((left, right) => left.startDate.localeCompare(right.startDate))

  return {
    availabilityConfirmedThrough: result.availabilityConfirmedThrough,
    periods,
  }
}

export async function getCurrentPublicHouseAvailability(): Promise<PublicHouseAvailability | null> {
  const result = await liveSanityClient.fetch<SanityHouseAvailability | null>(
    houseAvailabilityQuery,
    {},
    {cache: 'no-store'},
  )

  return normalizeAvailability(result)
}

export const getPublicHouseAvailability = cache(
  async (): Promise<PublicHouseAvailability | null> => {
    try {
      const result = await sanityClient.fetch<SanityHouseAvailability | null>(
        houseAvailabilityQuery,
        {},
        {
          next: {
            revalidate: 3600,
            tags: ['sanity:house-availability'],
          },
        },
      )

      return normalizeAvailability(result)
    } catch (error) {
      console.error('Unable to load public house availability from Sanity.', error)
      return null
    }
  },
)
