import {cache} from 'react'

import {getOwnerDashboardWeather} from '@/lib/owner-dashboard/weather'

import {sanityClient} from '../client'

type WeatherLocation = {lat?: number | null; lng?: number | null} | null

const weatherLocationQuery = /* groq */ `
  coalesce(
    *[_type == "siteSettings" && _id == "siteSettings"][0].propertyLocation.coordinates,
    *[_type == "diveSite" && _id == "dive-site-zamboanguita"][0].mapLocation.coordinates
  )
`

export const getGuestWeather = cache(async () => {
  try {
    const location = await sanityClient.fetch<WeatherLocation>(
      weatherLocationQuery,
      {},
      {
        next: {
          revalidate: 3600,
          tags: ['sanity:guest-weather-location'],
        },
      },
    )

    if (
      !location ||
      typeof location.lat !== 'number' ||
      typeof location.lng !== 'number'
    ) {
      return null
    }

    return getOwnerDashboardWeather(location.lat, location.lng)
  } catch (error) {
    console.error('Unable to load guest weather.', error)
    return null
  }
})
