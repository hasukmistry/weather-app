import { defineStore } from 'pinia'
import type { SearchResult, SearchResultsStore } from '@/types'
import { fetchRequest } from '@/services/api'

export const useSearchStore = defineStore('search', {
  state: (): SearchResultsStore => ({
    results: [],
  }),
  actions: {
    async search(query: string): Promise<void> {
      try {
        const requestUrl = `/api/geo?q=${encodeURIComponent(query)}&limit=5`

        const results = await fetchRequest(requestUrl)

        this.results = <SearchResult[]>results
      } catch (error) {
        console.error('Failed to fetch results:', error)
      }
    },
  },
  getters: {
    resultList: (state): SearchResult[] => state.results,
  },
})
