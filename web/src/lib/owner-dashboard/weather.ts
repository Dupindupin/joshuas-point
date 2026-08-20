import 'server-only'

import {
  parseOpenMeteoWeather,
  type OpenMeteoPayload,
  type OwnerDashboardWeather,
} from './weather-data'

export type {OwnerDashboardWeather} from './weather-data'

const weatherCacheSeconds = 15 * 60

export async function getOwnerDashboardWeather(
  latitude: number,
  longitude: number,
): Promise<OwnerDashboardWeather | null> {
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null
  }

  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(latitude))
  url.searchParams.set('longitude', String(longitude))
  url.searchParams.set(
    'current',
    'temperature_2m,precipitation_probability,weather_code,wind_speed_10m',
  )
  url.searchParams.set('daily', 'sunrise,sunset')
  url.searchParams.set('forecast_days', '1')
  url.searchParams.set('timezone', 'Asia/Manila')

  try {
    const weatherResponse = await fetch(url, {
      headers: {Accept: 'application/json'},
      next: {revalidate: weatherCacheSeconds},
      signal: AbortSignal.timeout(5000),
    })
    if (!weatherResponse.ok) return null

    return parseOpenMeteoWeather((await weatherResponse.json()) as OpenMeteoPayload)
  } catch {
    return null
  }
}
