<script setup lang="ts">
import { computed } from 'vue'
import type { ForecastList } from '@/types'
import {
  getWeatherIconClass,
  getTemperatureInCelcius,
  getFormattedHourlyTime,
} from '@/utils/functions'

const props = defineProps<{
  forecast: ForecastList | null
  timezone: number
}>()

const currentTemperature = computed(() => {
  return getTemperatureInCelcius(props.forecast?.main.temp ?? 0)
})

const currentFormattedTime = computed(() => {
  if (!props.forecast) return ''
  return getFormattedHourlyTime(props.forecast?.dt_txt, props.timezone)
})

const currentWeatherIconClass = computed(() => {
  const weatherDescription = props.forecast?.weather[0]?.description?.toLowerCase()
  return getWeatherIconClass(<string>weatherDescription)
})
</script>

<template>
  <div
    class="wa-hourly-forecast-icon mb-[15px]"
    :class="`wa-hourly-forecast-icon--${currentWeatherIconClass}`"
  ></div>
  <p class="font-semibold leading-[100%]">{{ currentTemperature }}<sup>°</sup></p>
  <p class="pt-[14px] text-[12px] leading-[100%]">{{ currentFormattedTime }}</p>
</template>

<style lang="scss" scoped>
.wa-hourly-forecast-icon {
  height: 40px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
