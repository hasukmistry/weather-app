export const getWeatherIconClass = (weatherDescription: string): string => {
  if (!weatherDescription) return '--sunny'

  if (weatherDescription.includes('clouds')) {
    return 'cloudy'
  } else if (weatherDescription.includes('heavy rain')) {
    return 'heavy_rain'
  } else if (
    weatherDescription.includes('light rain') ||
    weatherDescription.includes('moderate rain')
  ) {
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

export const getTemperatureInCelcius = (temperature: number): string => {
  const temp = temperature ?? 0

  return Math.round(temp - 273.15).toString()
}

export const getFormattedHourlyTime = (datetimeStr: string, timezone: number): string => {
  // Parse as UTC date
  const utcDate = new Date(datetimeStr.replace(' ', 'T') + 'Z')

  // Shift by timezone offset
  const localDate = new Date(utcDate.getTime() + timezone * 1000)

  // Format using UTC to avoid local timezone interference
  return localDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  })
}

export const getFormattedFullDate = (timestamp: number, timezone: number): string => {
  // Convert timestamp to milliseconds and apply timezone offset
  const localDate = new Date((timestamp + timezone) * 1000)

  // Format using UTC to avoid local timezone interference
  return localDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export const getLastUpdatedTime = (timestamp: number): string => {
  const localDate = new Date(timestamp)

  // Format using UTC to avoid local timezone interference
  return localDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })
}

export const getFormattedDay = (datetimeStr: string, timezone: number): string => {
  // Parse as UTC date
  const utcDate = new Date(datetimeStr.replace(' ', 'T') + 'Z')

  // Shift by timezone offset
  const localDate = new Date(utcDate.getTime() + timezone * 1000)

  const dayIndex = localDate.getDay()

  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  return weekdays[dayIndex]
}
