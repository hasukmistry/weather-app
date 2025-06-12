import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useLocationsStore } from '../locations'
import { getCurrentLocation, fetchRequest } from '@/services/api'
import type { Location } from '@/types'

// Mock the API services
vi.mock('@/services/api', () => ({
  getCurrentLocation: vi.fn(),
  fetchRequest: vi.fn(),
}))

describe('locations store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('state', () => {
    it('should have empty initial state', () => {
      const store = useLocationsStore()
      expect(store.locations).toEqual([])
      expect(store._searched).toEqual([])
    })
  })

  describe('actions', () => {
    describe('fetchWeatherInformation', () => {
      it('should fetch and format weather information correctly', async () => {
        const store = useLocationsStore()
        const mockWeatherRes = {
          coord: {
            lon: -0.1278,
            lat: 51.5074,
          },
          dt: Math.floor(Date.now() / 1000),
          id: 1,
          main: {
            feels_like: 18,
            humidity: 65,
            pressure: 1013,
            temp: 20,
            temp_max: 22,
            temp_min: 17,
          },
          name: 'London',
          sys: {
            country: 'GB',
            sunrise: Math.floor(Date.now() / 1000) - 3600,
            sunset: Math.floor(Date.now() / 1000) + 3600,
          },
          timezone: 0,
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        }
        const mockForecastRes = {
          list: [
            {
              dt: Math.floor(Date.now() / 1000),
              dt_txt: new Date().toISOString().split('T')[0] + ' 12:00:00',
              main: {
                feels_like: 18,
                humidity: 65,
                pressure: 1013,
                temp: 20,
                temp_max: 22,
                temp_min: 17,
              },
              weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
            },
            {
              dt: Math.floor(Date.now() / 1000) + 3600,
              dt_txt: new Date().toISOString().split('T')[0] + ' 15:00:00',
              main: {
                feels_like: 20,
                humidity: 65,
                pressure: 1013,
                temp: 22,
                temp_max: 24,
                temp_min: 19,
              },
              weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
            },
            {
              dt: Math.floor(Date.now() / 1000) + 86400,
              dt_txt: new Date(Date.now() + 86400000).toISOString().split('T')[0] + ' 12:00:00',
              main: {
                feels_like: 17,
                humidity: 65,
                pressure: 1013,
                temp: 19,
                temp_max: 21,
                temp_min: 16,
              },
              weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
            },
          ],
        }

        vi.mocked(fetchRequest).mockImplementation((url) => {
          if (url.includes('/api/weather')) {
            return Promise.resolve(mockWeatherRes)
          }
          return Promise.resolve(mockForecastRes)
        })

        const result = await store.fetchWeatherInformation(51.5074, -0.1278)

        expect(result).toMatchObject({
          ...mockWeatherRes,
          hourlyForecast: expect.arrayContaining([
            expect.objectContaining({
              dt_txt: expect.stringContaining(new Date().toISOString().split('T')[0]),
            }),
          ]),
          dailyForecast: expect.arrayContaining([
            expect.objectContaining({ dt_txt: expect.any(String) }),
          ]),
        })
        expect(result.lastUpdated).toBeDefined()
      })

      it('should handle api errors gracefully', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        const store = useLocationsStore()
        vi.mocked(fetchRequest).mockRejectedValue(new Error('API Error'))

        const result = await store.fetchWeatherInformation(51.5074, -0.1278)
        expect(result).toEqual(null)
        expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch locations:', expect.any(Error))
        consoleSpy.mockRestore()
      })
    })

    describe('fetchCurrentLocation', () => {
      it('should fetch current location and set it as my location', async () => {
        const store = useLocationsStore()
        const mockCoords = { lat: 51.5074, lng: -0.1278 }
        const mockLocation: Location = {
          coord: {
            lon: -0.1278,
            lat: 51.5074,
          },
          dt: Math.floor(Date.now() / 1000),
          id: 1,
          main: {
            feels_like: 18,
            humidity: 65,
            pressure: 1013,
            temp: 20,
            temp_max: 22,
            temp_min: 17,
          },
          name: 'London',
          sys: {
            country: 'GB',
            sunrise: Math.floor(Date.now() / 1000) - 3600,
            sunset: Math.floor(Date.now() / 1000) + 3600,
          },
          timezone: 0,
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          hourlyForecast: [],
          dailyForecast: [],
        }

        vi.mocked(getCurrentLocation).mockResolvedValue(mockCoords)
        vi.spyOn(store, 'fetchWeatherInformation').mockResolvedValue(mockLocation)

        await store.fetchCurrentLocation()

        expect(getCurrentLocation).toHaveBeenCalled()
        expect(store.fetchWeatherInformation).toHaveBeenCalledWith(mockCoords.lat, mockCoords.lng)
        expect(store.locations).toEqual([{ ...mockLocation, isMyLocation: true }])
      })

      it('should not fetch if locations already exist', async () => {
        const store = useLocationsStore()
        const mockLocation: Location = {
          coord: {
            lon: -0.1278,
            lat: 51.5074,
          },
          dt: Math.floor(Date.now() / 1000),
          id: 1,
          main: {
            feels_like: 18,
            humidity: 65,
            pressure: 1013,
            temp: 20,
            temp_max: 22,
            temp_min: 17,
          },
          name: 'Existing Location',
          sys: {
            country: 'GB',
            sunrise: Math.floor(Date.now() / 1000) - 3600,
            sunset: Math.floor(Date.now() / 1000) + 3600,
          },
          timezone: 0,
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
          isMyLocation: true,
        }
        store.locations = [mockLocation]

        await store.fetchCurrentLocation()

        expect(getCurrentLocation).not.toHaveBeenCalled()
        // No need to check fetchWeatherInformation since it won't be called if
        // getCurrentLocation is not called
      })
    })

    describe('location management', () => {
      it('should add searched location if not already in list', () => {
        const store = useLocationsStore()
        const mockLocation: Location = {
          coord: {
            lon: -0.1278,
            lat: 51.5074,
          },
          dt: Math.floor(Date.now() / 1000),
          id: 1,
          main: {
            feels_like: 18,
            humidity: 65,
            pressure: 1013,
            temp: 20,
            temp_max: 22,
            temp_min: 17,
          },
          name: 'Test Location',
          sys: {
            country: 'GB',
            sunrise: Math.floor(Date.now() / 1000) - 3600,
            sunset: Math.floor(Date.now() / 1000) + 3600,
          },
          timezone: 0,
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        }
        store._searched = [mockLocation]

        store.addSearchedLocation(1)
        expect(store.locations).toEqual([mockLocation])

        // Adding same location again should not duplicate
        store.addSearchedLocation(1)
        expect(store.locations).toHaveLength(1)
      })

      it('should remove location from list', () => {
        const store = useLocationsStore()
        const mockLocation: Location = {
          coord: {
            lon: -0.1278,
            lat: 51.5074,
          },
          dt: Math.floor(Date.now() / 1000),
          id: 1,
          main: {
            feels_like: 18,
            humidity: 65,
            pressure: 1013,
            temp: 20,
            temp_max: 22,
            temp_min: 17,
          },
          name: 'Test Location',
          sys: {
            country: 'GB',
            sunrise: Math.floor(Date.now() / 1000) - 3600,
            sunset: Math.floor(Date.now() / 1000) + 3600,
          },
          timezone: 0,
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        }
        store.locations = [mockLocation]

        store.removeFromLocationList(1)
        expect(store.locations).toEqual([])
      })

      it('should clear searched locations', () => {
        const store = useLocationsStore()
        const mockLocation: Location = {
          coord: {
            lon: -0.1278,
            lat: 51.5074,
          },
          dt: Math.floor(Date.now() / 1000),
          id: 1,
          main: {
            feels_like: 18,
            humidity: 65,
            pressure: 1013,
            temp: 20,
            temp_max: 22,
            temp_min: 17,
          },
          name: 'Test Location',
          sys: {
            country: 'GB',
            sunrise: Math.floor(Date.now() / 1000) - 3600,
            sunset: Math.floor(Date.now() / 1000) + 3600,
          },
          timezone: 0,
          weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
        }
        store._searched = [mockLocation]

        store.clearSearchedLocations()
        expect(store._searched).toEqual([])
      })
    })
  })

  describe('getters', () => {
    const createMockLocation = (id: number, name: string): Location => ({
      coord: { lon: -0.1278, lat: 51.5074 },
      dt: Math.floor(Date.now() / 1000),
      id,
      main: {
        feels_like: 18,
        humidity: 65,
        pressure: 1013,
        temp: 20,
        temp_max: 22,
        temp_min: 17,
      },
      name,
      sys: {
        country: 'GB',
        sunrise: Math.floor(Date.now() / 1000) - 3600,
        sunset: Math.floor(Date.now() / 1000) + 3600,
      },
      timezone: 0,
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
    })

    it('should return location list', () => {
      const store = useLocationsStore()
      const mockLocations = [
        createMockLocation(1, 'Location 1'),
        createMockLocation(2, 'Location 2'),
      ]
      store.locations = mockLocations

      expect(store.locationList).toEqual(mockLocations)
    })

    it('should find location by id', () => {
      const store = useLocationsStore()
      const mockLocations = [
        createMockLocation(1, 'Location 1'),
        createMockLocation(2, 'Location 2'),
      ]
      store.locations = mockLocations

      expect(store.getLocationById(1)).toEqual(mockLocations[0])
      expect(store.getLocationById(3)).toBeUndefined()
    })

    it('should return searched locations', () => {
      const store = useLocationsStore()
      const mockLocation = createMockLocation(1, 'Searched Location')
      store._searched = [mockLocation]

      expect(store.searchedList).toEqual([mockLocation])
    })

    it('should find location from searched by id', () => {
      const store = useLocationsStore()
      const mockLocation = createMockLocation(1, 'Searched Location')
      store._searched = [mockLocation]

      expect(store.getLocationFromSearchedById(1)).toEqual(mockLocation)
      expect(store.getLocationFromSearchedById(2)).toBeUndefined()
    })
  })
})
