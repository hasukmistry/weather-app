<script setup lang="ts">
import LocationInfo from '@/components/location/LocationInfo.vue'
import LocationHourlyForecast from '@/components/location/LocationHourlyForecast.vue'
import LocationWeeklyForecast from '@/components/location/LocationWeeklyForecast.vue'
</script>

<template>
  <main class="flex flex-col">
    <LocationInfo />
    <LocationHourlyForecast />
    <LocationWeeklyForecast />
  </main>
</template>
