<script setup lang="ts">
import type { Location } from '@/types'
import LocationWeeklyCard from '@/components/location/LocationWeeklyCard.vue'

const props = defineProps<{
  location: Location | null
}>()
</script>

<template>
  <div class="px-4">
    <div>
      <h2 class="font-medium text-[20px] leading-[100%] mb-6">Weekly Forecast</h2>
    </div>
    <ul class="flex flex-col justify-center items-center gap-4">
      <li
        v-for="forecast in props.location?.dailyForecast"
        :key="forecast.dt"
        class="flex w-full py-3 px-[14px] bg-[#D2DFFF] rounded-xl justify-center items-center"
      >
        <LocationWeeklyCard :forecast="forecast" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
