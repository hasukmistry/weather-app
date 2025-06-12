<script setup lang="ts">
import { computed } from 'vue'
import type { Location } from '@/types'
import { isDaytime } from '@/utils/functions'

const props = defineProps<{
  location: Location | null
}>()

const cardMode = computed(() =>
  isDaytime(<number>props.location?.dt, <number>props.location?.timezone)
    ? 'wa-card--day'
    : 'wa-card--night',
)

const currentLocation = computed(() =>
  props.location?.isMyLocation
    ? `${props.location?.name}, ${props.location?.sys.country}`
    : `${props.location?.sys.country}`,
)

const currentWeather = computed(() => props.location?.weather[0]?.main)

const currentTemperature = computed(() => {
  const temp = props.location?.main.temp ?? 0
  return Math.round(temp - 273.15)
})

const currentLowTemperature = computed(() => {
  const temp = props.location?.main.temp_max ?? 0
  return Math.round(temp - 273.15)
})

const currentHighTemperature = computed(() => {
  const temp = props.location?.main.temp_min ?? 0
  return Math.round(temp - 273.15)
})

const currentLocationLabel = computed(() => {
  return props.location?.isMyLocation ? 'My Location' : props.location?.name
})
</script>

<template>
  <div :class="[cardMode, 'w-full flex bg-no-repeat bg-cover rounded-2xl']">
    <div class="wa-card flex flex-col text-white w-full justify-between py-[7px] px-[15px]">
      <div class="flex flex-row justify-between">
        <div>
          <h2 class="font-bold text-[25px] leading-[100%]">{{ currentLocationLabel }}</h2>
          <p class="wa-location-info">{{ currentLocation }}</p>
        </div>
        <div>
          <p class="wa-temperature">{{ currentTemperature }}<sup>°</sup></p>
        </div>
      </div>
      <div class="flex flex-row justify-between">
        <div>{{ currentWeather }}</div>
        <div class="flex flex-row gap-2">
          <p>H:{{ currentLowTemperature }}<sup>°</sup></p>
          <p>L:{{ currentHighTemperature }}<sup>°</sup></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wa-card {
  h2 {
    letter-spacing: -1%;
  }
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 1%;

    &.wa-location-info {
      margin-top: 5px;
    }

    &.wa-temperature {
      font-size: 53px;
      font-weight: 300;
      line-height: 100%;
      letter-spacing: 10.5%;
    }
  }
}
</style>
