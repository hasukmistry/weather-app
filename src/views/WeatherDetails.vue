<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useLocationsStore } from '@/stores/locations'
import AppLoader from '@/components/AppLoader.vue'
import type { Location } from '@/types'

import LocationInfo from '@/components/location/LocationInfo.vue'
import LocationHourlyForecast from '@/components/location/LocationHourlyForecast.vue'
import LocationWeeklyForecast from '@/components/location/LocationWeeklyForecast.vue'

const isLoading = ref(false)

const route = useRoute()
const locationsStore = useLocationsStore()

const locationId = computed(() => Number(route.params.location))
const location = computed<Location | undefined>(
  () =>
    locationsStore.getLocationById(locationId.value) ||
    locationsStore.getLocationFromSearchedById(locationId.value),
)

const onLoadingStart = () => {
  isLoading.value = true
}
const onLoadingDone = () => {
  isLoading.value = false
}
</script>

<template>
  <main v-if="location" class="flex flex-col">
    <LocationInfo
      :location="location"
      @loadingStart="onLoadingStart"
      @loadingDone="onLoadingDone"
    />
    <LocationHourlyForecast :location="location" />
    <LocationWeeklyForecast :location="location" />
  </main>
  <main
    v-else-if="!isLoading"
    class="container flex flex-col items-center justify-center gap-4 p-20"
  >
    <div class="flex justify-center items-center uppercase">Location not found</div>
    <div class="shrink-0 border rounded-full py-2 px-4">
      <router-link to="/">Back</router-link>
    </div>
  </main>
  <AppLoader v-else-if="isLoading" class="flex mt-8" />
</template>
