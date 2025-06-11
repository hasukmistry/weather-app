import type { FeelsLike } from '@/types/feels-like'

export interface Forecast {
  feels_like: number | FeelsLike
  humidity: number
  pressure: number
  temp: number
  temp_max: number
  temp_min: number
}
