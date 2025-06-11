import type { Forecast } from '@/types/forecast'
import type { Weather } from '@/types/weather'
import type { ForecastList } from '@/types/forecast-list'

export interface Location {
  coord: {
    lon: number
    lat: number
  }
  dt: number
  id: number
  main: Forecast
  name: string
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  weather: Weather[]
  isMyLocation?: boolean
  lastUpdated?: number
  dailyForecast?: ForecastList[]
  hourlyForecast?: ForecastList[]
}
