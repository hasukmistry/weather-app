import { defineStore } from 'pinia'
import type { ForecastList, Location, LocationStore } from '@/types'
import { getCurrentLocation, fetchRequest } from '@/services/api'

export const useLocationsStore = defineStore('locations', {
  state: (): LocationStore => ({
    locations: [],
    _searched: [],
  }),
  actions: {
    async fetchWeatherInformation(lat: number, lng: number): Promise<Location> {
      try {
        const requestUrl1 = `/api/weather?lat=${lat}&lon=${lng}`
        const requestUrl2 = `/api/forecast/daily?lat=${lat}&lon=${lng}&cnt=40`

        const [weatherRes, forecastRes] = await Promise.all([
          fetchRequest(requestUrl1),
          fetchRequest(requestUrl2),
        ])

        // Generate mapping for hourly forecast
        const today = new Date().toISOString().split('T')[0]
        const todayForecast = forecastRes?.list.filter((entry: ForecastList) => {
          return entry?.dt_txt.startsWith(today)
        })

        // Generate mapping for daily forecast
        const seenDates = new Set<string>()
        const dailyForecast = forecastRes?.list.filter((entry: ForecastList) => {
          return (
            !seenDates.has(entry?.dt_txt.split(' ')[0]) &&
            seenDates.add(entry?.dt_txt.split(' ')[0])
          )
        })

        const location: Location = {
          ...(<Location>weatherRes),
          lastUpdated: Date.now(),
          hourlyForecast: todayForecast,
          dailyForecast: dailyForecast,
        }

        return location
      } catch (error) {
        console.error('Failed to fetch locations:', error)
      }

      return null as unknown as Location
    },
    async fetchCurrentLocation(): Promise<void> {
      try {
        if (this.locations.length > 0) {
          return
        }
        const { lat, lng } = await getCurrentLocation()

        const location = await this.fetchWeatherInformation(lat, lng)

        location.isMyLocation = true

        this.locations = [location]
      } catch (error) {
        console.error('Failed to fetch locations:', error)
      }
    },
    async fetchLocation(lat: number, lng: number): Promise<Location> {
      try {
        const location = await this.fetchWeatherInformation(lat, lng)

        this._searched = [location]

        return location
      } catch (error) {
        console.error('Failed to fetch locations:', error)
      }
      return null as unknown as Location
    },
    addSearchedLocation(id: number): void {
      const existingLocation = this.getLocationFromSearchedById(id)
      if (existingLocation) {
        // Check if the location already exists in the main list
        const isAlreadyAdded = this.locations.some((loc) => loc.id === existingLocation.id)
        if (!isAlreadyAdded) {
          this.locations.push(existingLocation)
        }
      }
    },
    removeFromLocationList(id: number): void {
      this.locations = this.locations.filter((loc) => loc.id !== id)
    },
    clearSearchedLocations(): void {
      this._searched = []
    },
  },
  getters: {
    locationList: (state): Location[] => state.locations,
    getLocationById: (state) => (id: number) => {
      return state.locations.find((loc) => loc.id === id)
    },
    searchedList: (state): Location[] => <Location[]>state._searched,
    getLocationFromSearchedById: (state) => (id: number) => {
      return (<Location[]>state._searched).find((loc) => loc.id === id)
    },
  },
})
