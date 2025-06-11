<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useLocationsStore } from '@/stores/locations'
import type { Location } from '@/types'
import AppLoader from '@/components/AppLoader.vue'
import WeatherCard from '@/components/home/WeatherCard.vue'

const isLoading = ref(true)
const locationsStore = useLocationsStore()

onMounted(async () => {
  await locationsStore.fetchCurrentLocation()
  isLoading.value = false
})

const locationList = computed((): Location[] => locationsStore.locationList)
const locationsAvailable = computed((): boolean => locationList.value.length > 0)
</script>

<template>
  <div class="container mx-auto">
    <div
      v-if="isLoading || locationsAvailable"
      class="flex mt-8"
      :class="{ 'flex-col': isLoading }"
    >
      <AppLoader v-if="isLoading" class="mx-auto" />
      <ul class="flex w-full flex-col gap-3 justify-center items-center">
        <li v-for="location in locationList" :key="location.id" class="w-full">
          <router-link class="flex" :to="`/weather/${location.id}`">
            <WeatherCard :location="location" />
          </router-link>
        </li>
      </ul>
    </div>
    <div v-else class="container mx-auto border p-10 my-10 md:my-20 lg:my-40">
      <div class="flex justify-center items-center uppercase">No locations available</div>
    </div>
  </div>
</template>
