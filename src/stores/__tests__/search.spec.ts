import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSearchStore } from '../search'
import { fetchRequest } from '@/services/api'
import type { SearchResult } from '@/types'

vi.mock('@/services/api', () => ({
  fetchRequest: vi.fn(),
}))

describe('search store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('state', () => {
    it('should have empty initial state', () => {
      const store = useSearchStore()
      expect(store.results).toEqual([])
    })
  })

  describe('actions', () => {
    describe('search', () => {
      it('should fetch and store search results', async () => {
        const store = useSearchStore()
        const mockResults: SearchResult[] = [
          {
            name: 'London',
            lat: 51.5074,
            lon: -0.1278,
            country: 'GB',
            state: 'England'
          },
          {
            name: 'London',
            lat: 42.9834,
            lon: -81.233,
            country: 'CA',
            state: 'Ontario'
          }
        ]

        vi.mocked(fetchRequest).mockResolvedValue(mockResults)

        await store.search('London')

        expect(fetchRequest).toHaveBeenCalledWith('/api/geo?q=London&limit=5')
        expect(store.results).toEqual(mockResults)
      })

      it('should handle special characters in search query', async () => {
        const store = useSearchStore()
        const mockResults: SearchResult[] = [
          {
            name: 'São Paulo',
            lat: -23.5505,
            lon: -46.6333,
            country: 'BR',
            state: 'São Paulo'
          }
        ]

        vi.mocked(fetchRequest).mockResolvedValue(mockResults)

        await store.search('São Paulo')

        expect(fetchRequest).toHaveBeenCalledWith('/api/geo?q=S%C3%A3o%20Paulo&limit=5')
        expect(store.results).toEqual(mockResults)
      })

      it('should handle api errors gracefully', async () => {
        const store = useSearchStore()
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        
        vi.mocked(fetchRequest).mockRejectedValue(new Error('API Error'))

        await store.search('Invalid Query')

        expect(store.results).toEqual([])
        expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch results:', expect.any(Error))
        consoleSpy.mockRestore()
      })
    })
  })

  describe('getters', () => {
    it('should return search results', () => {
      const store = useSearchStore()
      const mockResults: SearchResult[] = [
        {
          name: 'London',
          lat: 51.5074,
          lon: -0.1278,
          country: 'GB',
          state: 'England'
        }
      ]
      
      store.results = mockResults

      expect(store.resultList).toEqual(mockResults)
    })
  })
})
