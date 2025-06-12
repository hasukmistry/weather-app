import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import request from '../request'

describe('request service', () => {
  const mockFetch = vi.fn()
  const mockJsonResponse = { data: 'test response' }
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  beforeEach(() => {
    // Setup mock fetch
    vi.stubGlobal('fetch', mockFetch)
    
    // Default mock implementation
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockJsonResponse)
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  describe('GET requests', () => {
    it('should make GET request with default headers', async () => {
      const url = '/api/test'
      await request(url)

      expect(mockFetch).toHaveBeenCalledWith(url, {
        method: 'GET',
        headers: defaultHeaders
      })
    })

    it('should merge custom headers with defaults', async () => {
      const url = '/api/test'
      const customHeaders = {
        'Authorization': 'Bearer token'
      }

      await request(url, { headers: customHeaders })

      expect(mockFetch).toHaveBeenCalledWith(url, {
        method: 'GET',
        headers: {
          ...defaultHeaders,
          ...customHeaders
        }
      })
    })

    it('should return parsed JSON response', async () => {
      const result = await request('/api/test')
      expect(result).toEqual(mockJsonResponse)
    })
  })

  describe('POST requests', () => {
    it('should stringify body for POST requests', async () => {
      const url = '/api/test'
      const body = { test: 'data' }

      await request(url, {
        method: 'POST',
        body
      })

      expect(mockFetch).toHaveBeenCalledWith(url, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(body)
      })
    })

    it('should not stringify body if already a string', async () => {
      const url = '/api/test'
      const body = 'raw string data'

      await request(url, {
        method: 'POST',
        body
      })

      expect(mockFetch).toHaveBeenCalledWith(url, {
        method: 'POST',
        headers: defaultHeaders,
        body
      })
    })
  })

  describe('error handling', () => {
    it('should throw error for non-ok responses', async () => {
      const errorText = 'Not Found'
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        text: () => Promise.resolve(errorText)
      })

      await expect(request('/api/test')).rejects.toThrow('HTTP 404: Not Found')
    })

    it('should handle network errors', async () => {
      const networkError = new Error('Network failure')
      mockFetch.mockRejectedValue(networkError)

      await expect(request('/api/test')).rejects.toThrow(networkError)
    })

    it('should handle JSON parsing errors', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON'))
      })

      await expect(request('/api/test')).rejects.toThrow('Invalid JSON')
    })
  })

  describe('other HTTP methods', () => {
    it('should support PUT requests', async () => {
      const url = '/api/test'
      const body = { test: 'data' }

      await request(url, {
        method: 'PUT',
        body
      })

      expect(mockFetch).toHaveBeenCalledWith(url, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(body)
      })
    })

    it('should support PATCH requests', async () => {
      const url = '/api/test'
      const body = { test: 'data' }

      await request(url, {
        method: 'PATCH',
        body
      })

      expect(mockFetch).toHaveBeenCalledWith(url, {
        method: 'PATCH',
        headers: defaultHeaders,
        body: JSON.stringify(body)
      })
    })

    it('should support DELETE requests', async () => {
      const url = '/api/test'

      await request(url, {
        method: 'DELETE'
      })

      expect(mockFetch).toHaveBeenCalledWith(url, {
        method: 'DELETE',
        headers: defaultHeaders
      })
    })
  })
})
