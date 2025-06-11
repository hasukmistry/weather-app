<script setup lang="ts">
import PageHeader from '@/components/home/PageHeader.vue'
import SearchBar from '@/components/search/SearchBar.vue'
import WeatherCards from '@/components/home/WeatherCards.vue'
</script>

<template>
  <main class="flex flex-col mx-4 my-8">
    <PageHeader />
    <SearchBar />
    <WeatherCards />
  </main>
</template>
