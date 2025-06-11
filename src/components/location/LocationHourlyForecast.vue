<script setup lang="ts">
import type { Location } from '@/types'
import LocationHourlyCard from '@/components/location/LocationHourlyCard.vue'

const props = defineProps<{
  location: Location | null
}>()
</script>

<template>
  <div v-if="location?.hourlyForecast" class="px-4 py-8">
    <div>
      <h2 class="font-medium text-[20px] leading-[100%] mb-6">Hourly Forecast</h2>
    </div>
    <ul class="flex flex-row items-center gap-4">
      <li
        v-for="forecast in location.hourlyForecast"
        :key="forecast.dt"
        class="flex flex-1 flex-col max-w-[120px] py-3 px-[14px] bg-[#f5f5f5] rounded-sm items-center text-center"
      >
        <LocationHourlyCard :forecast="forecast" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
