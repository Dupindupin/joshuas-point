import assert from 'node:assert/strict'
import test from 'node:test'

import {describeWeatherCode, interpretGuestWeather, parseOpenMeteoWeather} from './weather-data'

test('uses plain-language WMO weather descriptions', () => {
  assert.equal(describeWeatherCode(0), 'Clear sky')
  assert.equal(describeWeatherCode(63), 'Rain')
  assert.equal(describeWeatherCode(95), 'Thunderstorms')
  assert.equal(describeWeatherCode(500), 'Conditions unavailable')
})

test('normalizes a valid weather response without exposing coordinates', () => {
  assert.deepEqual(
    parseOpenMeteoWeather(
      {
        current: {
          precipitation_probability: 47.6,
          temperature_2m: 29.24,
          weather_code: 2,
          wind_speed_10m: 11.16,
        },
        daily: {
          sunrise: ['2026-08-20T05:36'],
          sunset: ['2026-08-20T18:03'],
        },
      },
      '2026-08-20T08:00:00.000Z',
    ),
    {
      condition: 'Partly cloudy',
      fetchedAt: '2026-08-20T08:00:00.000Z',
      rainProbabilityPercent: 48,
      sunrise: '2026-08-19T21:36:00.000Z',
      sunset: '2026-08-20T10:03:00.000Z',
      temperatureCelsius: 29.2,
      windKilometresPerHour: 11.2,
    },
  )
})

test('rejects incomplete weather responses', () => {
  assert.equal(parseOpenMeteoWeather({current: {weather_code: 0}}), null)
})

test('gives guests a calm interpretation without overstating the forecast', () => {
  const baseWeather = {
    condition: 'Mainly clear',
    fetchedAt: '2026-08-20T08:00:00.000Z',
    rainProbabilityPercent: 18,
    sunrise: '2026-08-19T21:36:00.000Z',
    sunset: '2026-08-20T10:03:00.000Z',
    temperatureCelsius: 28,
    windKilometresPerHour: 8,
  }

  assert.equal(interpretGuestWeather(baseWeather), 'Lovely weather for relaxing by the pool.')
  assert.equal(
    interpretGuestWeather({...baseWeather, rainProbabilityPercent: 68}),
    'Rain is likely today, so plans can stay easy and flexible.',
  )
  assert.equal(
    interpretGuestWeather({...baseWeather, rainProbabilityPercent: 42}),
    'A passing shower is possible, with plenty of time to enjoy the house.',
  )
})
