<script setup lang="ts">
import WeatherCard from '@/components/home/WeatherCard.vue'
</script>

<template>
  <div class="flex mt-8">
    <ul class="flex w-full flex-col gap-3 justify-center items-center">
      <li class="w-full">
        <a class="flex" href="/weather/blabla"><WeatherCard :mode="'day'" /></a>
      </li>
      <li class="w-full">
        <a class="flex" href="/weather/blabla"><WeatherCard :mode="'day'" /></a>
      </li>
      <li class="w-full">
        <a class="flex" href="/weather/blabla"><WeatherCard :mode="'night'" /></a>
      </li>
    </ul>
  </div>
</template>
