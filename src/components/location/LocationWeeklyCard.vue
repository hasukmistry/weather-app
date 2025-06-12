<script setup lang="ts">
import { computed } from 'vue'
import type { ForecastList } from '@/types'
import IconRight from '@/components/icons/IconRight.vue'
import { getWeatherIconClass } from '@/utils/functions'

const props = defineProps<{
  forecast: ForecastList | null
}>()

const currentTemperature = computed(() => {
  const temp = props.forecast?.main.temp ?? 0
  return Math.round(temp - 273.15)
})
const currentWeather = computed(() => props.forecast?.weather[0]?.main)
const currentFormattedDay = computed(() => {
  if (!props.forecast) return ''
  const date = new Date(props.forecast?.dt_txt)
  const dayIndex = date.getDay()
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return weekdays[dayIndex]
})
const currentWeatherIconClass = computed(() => {
  const weatherDescription = props.forecast?.weather[0]?.description?.toLowerCase()

  return getWeatherIconClass(<string>weatherDescription)
})
</script>

<template>
  <div
    class="wa-forecast-icon-wrapper shrink-0 flex justify-center items-center w-[40px] h-[40px] bg-[#9AB6FF] rounded-[25px]"
  >
    <div
      class="wa-weekly-forecast-icon"
      :class="`wa-weekly-forecast-icon--${currentWeatherIconClass}`"
    ></div>
  </div>
  <div class="flex-1 font-semibold leading-[100%] px-4">
    <p class="font-bold text-[14px] leading-[100%]">{{ currentFormattedDay }}</p>
    <p class="pt-[4px] text-[13px] leading-[100%]">{{ currentWeather }}</p>
  </div>
  <p class="flex text-[12px] leading-[100%] shrink-0 font-bold items-center gap-4">
    <span>{{ currentTemperature }}<sup>°</sup> C</span>
    <a href="#" target="_blank" rel="noopener noreferrer">
      <IconRight />
    </a>
  </p>
</template>

<style lang="scss" scoped>
.wa-weekly-forecast-icon {
  height: 24px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
