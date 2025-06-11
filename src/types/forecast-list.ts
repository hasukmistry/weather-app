import type { Forecast } from '@/types/forecast'
import type { Weather } from '@/types/weather'

export interface ForecastList {
  dt: number
  dt_text: string
  main: Forecast
  weather: Weather[]
}
