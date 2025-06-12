export const getWeatherIconClass = (weatherDescription: string): string => {
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

export const isDaytime = (timestamp: number, timezone: number): boolean => {
  // Convert timestamp to milliseconds, add the timezone offset in ms
  const localTime = new Date((timestamp + timezone) * 1000)

  const localHour = localTime.getUTCHours() // Now gives correct local hour

  // Daytime between 6:00 (inclusive) and 18:00 (exclusive)
  return localHour >= 6 && localHour < 18
}
