export type OwnerDashboardWeather = {
  condition: string
  fetchedAt: string
  rainProbabilityPercent: number
  sunrise: string
  sunset: string
  temperatureCelsius: number
  windKilometresPerHour: number
}

export function interpretGuestWeather(weather: OwnerDashboardWeather) {
  const condition = weather.condition.toLowerCase()

  if (
    condition.includes('thunder') ||
    condition.includes('rain') ||
    condition.includes('drizzle') ||
    weather.rainProbabilityPercent >= 60
  ) {
    return 'Rain is likely today, so plans can stay easy and flexible.'
  }

  if (weather.rainProbabilityPercent >= 35) {
    return 'A passing shower is possible, with plenty of time to enjoy the house.'
  }

  if (weather.windKilometresPerHour >= 25) {
    return 'A breezy day for enjoying the changing light across the ridge.'
  }

  if (weather.temperatureCelsius >= 30) {
    return 'A warm day for slowing down by the pool.'
  }

  if (['clear sky', 'mainly clear', 'partly cloudy'].includes(condition)) {
    return 'Lovely weather for relaxing by the pool.'
  }

  return 'A gentle day to enjoy the house and let plans unfold naturally.'
}

export type OpenMeteoPayload = {
  current?: {
    precipitation_probability?: number
    temperature_2m?: number
    weather_code?: number
    wind_speed_10m?: number
  }
  daily?: {
    sunrise?: string[]
    sunset?: string[]
  }
}

const philippineTimeOffset = '+08:00'

export function describeWeatherCode(code: number) {
  if (code === 0) return 'Clear sky'
  if (code === 1) return 'Mainly clear'
  if (code === 2) return 'Partly cloudy'
  if (code === 3) return 'Overcast'
  if (code === 45 || code === 48) return 'Foggy'
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle'
  if ([61, 63, 65, 66, 67].includes(code)) return 'Rain'
  if ([71, 73, 75, 77].includes(code)) return 'Snow'
  if ([80, 81, 82].includes(code)) return 'Rain showers'
  if ([85, 86].includes(code)) return 'Snow showers'
  if ([95, 96, 99].includes(code)) return 'Thunderstorms'
  return 'Conditions unavailable'
}

function validNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function propertyTimeToIso(value: string | undefined) {
  if (!value) return null
  const parsed = new Date(`${value}:00${philippineTimeOffset}`)
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString()
}

export function parseOpenMeteoWeather(
  payload: OpenMeteoPayload,
  fetchedAt = new Date().toISOString(),
): OwnerDashboardWeather | null {
  const current = payload.current
  const sunrise = propertyTimeToIso(payload.daily?.sunrise?.[0])
  const sunset = propertyTimeToIso(payload.daily?.sunset?.[0])

  if (
    !current ||
    !validNumber(current.weather_code) ||
    !validNumber(current.temperature_2m) ||
    !validNumber(current.precipitation_probability) ||
    !validNumber(current.wind_speed_10m) ||
    !sunrise ||
    !sunset
  ) {
    return null
  }

  return {
    condition: describeWeatherCode(current.weather_code),
    fetchedAt,
    rainProbabilityPercent: Math.round(current.precipitation_probability),
    sunrise,
    sunset,
    temperatureCelsius: Math.round(current.temperature_2m * 10) / 10,
    windKilometresPerHour: Math.round(current.wind_speed_10m * 10) / 10,
  }
}
