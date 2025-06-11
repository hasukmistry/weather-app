<script setup lang="ts">
import { ref } from 'vue'
import PageHeader from '@/components/home/PageHeader.vue'
import SearchBar from '@/components/search/SearchBar.vue'
import WeatherCards from '@/components/home/WeatherCards.vue'
import SearchResults from '@/components/search/SearchResults.vue'

const isSearch = ref(false)

const onSearch = (searchTerm: string) => {
  isSearch.value = true
}
</script>

<template>
  <main class="flex flex-col mx-4 my-8">
    <PageHeader v-if="!isSearch" />
    <SearchBar @search="onSearch" />
    <WeatherCards v-if="!isSearch" />
    <SearchResults v-if="isSearch" />
  </main>
</template>
