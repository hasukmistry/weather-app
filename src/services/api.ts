import request from '@/services/request'

export async function getCurrentLocation(): Promise<{ lat: number; lng: number }> {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by this browser.')
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        resolve({ lat: latitude, lng: longitude })
      },
      (error) => {
        reject(new Error(error.message))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  })
}

export function fetchRequest<T = unknown>(requestUrl: string): Promise<T> {
  return request(requestUrl)
}
