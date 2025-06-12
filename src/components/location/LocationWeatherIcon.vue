<script setup lang="ts">
import { computed } from 'vue'
import IconWeatherCloudy from '@/components/icons/IconWeatherCloudy.vue'
import IconWeatherHeavyRain from '@/components/icons/IconWeatherHeavyRain.vue'
import IconWeatherModerateRain from '@/components/icons/IconWeatherModerateRain.vue'
import IconWeatherThunder from '@/components/icons/IconWeatherThunder.vue'
import IconWeatherSunny from '@/components/icons/IconWeatherSunny.vue'

const props = defineProps<{
  weather: string
}>()

const weather = computed(() => props.weather.toLowerCase())
</script>

<template>
  <IconWeatherCloudy v-if="weather.includes('clouds')" />
  <IconWeatherHeavyRain v-else-if="weather.includes('heavy rain')" />
  <IconWeatherModerateRain v-else-if="weather.includes('light rain')" />
  <IconWeatherThunder v-else-if="weather.includes('thunder')" />
  <IconWeatherSunny v-else />
</template>

<style lang="scss" scoped></style>
