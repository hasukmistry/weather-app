<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import { useLocationsStore } from '@/stores/locations'
import AppLoader from '@/components/AppLoader.vue'
import type { SearchResult } from '@/types'

const isLoading = ref(false)
const router = useRouter()

const searchStore = useSearchStore()
const locationsStore = useLocationsStore()

const resultsList = computed((): SearchResult[] => searchStore.resultList)
const resultsAvailable = computed((): boolean => resultsList.value.length > 0)

const setAsSearchedLocation = async (result: SearchResult) => {
  isLoading.value = true
  const searchedLocation = await locationsStore.fetchLocation(result.lat, result.lon)
  isLoading.value = false

  router.push(`/weather/${searchedLocation.id}`)
}
</script>

<template>
  <ul v-if="resultsAvailable" class="flex flex-col mt-4">
    <li v-for="(result, index) in resultsList" :key="index">
      <button
        @click="setAsSearchedLocation(result)"
        class="wa-search-result flex w-full text-[14px] font-medium leading-[100%] py-2 border-b border-[#D4D4D4] hover:bg-[#F7F7F9] focus:bg-[#F5F5F5] focus:outline-none"
      >
        {{ result?.name }}
        {{ result?.state ? ', ' + result.state : '' }}
        {{ result?.country ? ', ' + result.country : '' }}
      </button>
    </li>
  </ul>
  <AppLoader v-if="isLoading" class="mx-auto" />
</template>

<style lang="scss" scoped>
.wa-search-result {
  letter-spacing: -0.5%;
}
</style>
