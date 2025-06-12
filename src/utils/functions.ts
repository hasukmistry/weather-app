export function getWeatherIconClass(weatherDescription: string): string {
  if (!weatherDescription) return '--sunny'

  if (weatherDescription.includes('clouds')) {
    return 'cloudy'
  } else if (weatherDescription.includes('heavy rain')) {
    return 'heavy_rain'
  } else if (weatherDescription.includes('light rain')) {
    return 'moderate_rain'
  } else if (weatherDescription.includes('thunder')) {
    return 'thunder'
  }
  return 'sunny'
}
