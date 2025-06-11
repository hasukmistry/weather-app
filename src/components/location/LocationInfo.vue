<script setup lang="ts">
import IconBack from '@/components/icons/IconBack.vue'
import IconRemove from '@/components/icons/IconRemove.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'
import IconWeatherModerateRain from '@/components/icons/IconWeatherModerateRain.vue'
</script>

<template>
  <div
    class="wa-location-info text-white flex flex-row items-start px-4 py-8 bg-no-repeat bg-cover bg-center"
  >
    <div class="shrink-0">
      <a href="/">
        <IconBack />
      </a>
    </div>
    <div class="flex flex-1 flex-col text-center justify-center">
      <h1 class="mt-1 mb-6 text-[14px] font-medium leading-[100%]">Milan, Italy</h1>
      <p class="mb-6 font-normal leading-[100%]">Monday, 20 December 2021</p>
      <div class="wa-weather-icon flex items-center justify-center">
        <IconWeatherModerateRain />
      </div>
      <p class="mb-2 font-normal text-[20px] leading-[100%]">24<sup>°</sup> C</p>
      <p class="mb-8 font-bold text-[20px] leading-[100%]">Moderate Rain</p>

      <div class="flex flex-row items-center justify-center gap-1">
        <p class="font-normal leading-[100%]">Last Update 11:00 AM</p>
        <a href="#"><IconRefresh /></a>
      </div>
    </div>
    <div class="shrink-0">
      <a href="#">
        <IconRemove />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wa-location-info {
  background-image: url("data:image/svg+xml,%3Csvg width='375' height='370' viewBox='0 0 375 370' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='375' height='370' fill='url(%23paint0_linear_1_3866)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_1_3866' x1='2.32365e-06' y1='12.6913' x2='436.26' y2='250.266' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%234F80FA'/%3E%3Cstop offset='0.591748' stop-color='%233764D7'/%3E%3Cstop offset='0.794973' stop-color='%23335FD1'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
}
</style>
