import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { getCurrentLocation, fetchRequest } from '../api'
import request from '@/services/request'

// Mock the request module
vi.mock('@/services/request', () => ({
  default: vi.fn(),
}))

describe('api service', () => {
  describe('getCurrentLocation', () => {
    const mockGeolocation = {
      getCurrentPosition: vi.fn(),
    }

    beforeEach(() => {
      // Setup mock geolocation
      vi.stubGlobal('navigator', {
        geolocation: mockGeolocation,
      })
    })

    afterEach(() => {
      vi.unstubAllGlobals()
    })

    it('should resolve with coordinates when geolocation succeeds', async () => {
      const mockPosition = {
        coords: {
          latitude: 51.5074,
          longitude: -0.1278,
        },
      }

      mockGeolocation.getCurrentPosition.mockImplementation((success) => success(mockPosition))

      const result = await getCurrentLocation()

      expect(result).toEqual({ lat: 51.5074, lng: -0.1278 })
      expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
      )
    })

    it('should reject when geolocation fails', async () => {
      const mockError = { message: 'User denied geolocation' }
      mockGeolocation.getCurrentPosition.mockImplementation((success, error) => error(mockError))

      await expect(getCurrentLocation()).rejects.toThrow('User denied geolocation')
    })

    it('should throw error if geolocation is not supported', async () => {
      vi.stubGlobal('navigator', {})

      await expect(getCurrentLocation()).rejects.toThrow(
        'Geolocation is not supported by this browser.',
      )
    })
  })

  describe('fetchRequest', () => {
    it('should call request with the provided URL', async () => {
      const mockUrl = '/api/test'
      const mockResponse = { data: 'test' }

      vi.mocked(request).mockResolvedValue(mockResponse)

      const result = await fetchRequest(mockUrl)

      expect(request).toHaveBeenCalledWith(mockUrl)
      expect(result).toBe(mockResponse)
    })

    it('should handle request errors', async () => {
      const mockUrl = '/api/test'
      const mockError = new Error('Network error')

      vi.mocked(request).mockRejectedValue(mockError)

      await expect(fetchRequest(mockUrl)).rejects.toThrow('Network error')
    })
  })
})
