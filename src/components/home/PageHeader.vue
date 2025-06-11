<script setup lang="ts">
import IconProfile from '@/components/icons/IconProfile.vue'
</script>

<template>
  <header class="flex w-full">
    <div class="flex justify-between items-center w-full">
      <h1 class="wa-app-heading font-bold text-[37px] leading-[100%]">Weather</h1>
      <router-link to="/profile"><IconProfile /></router-link>
    </div>
  </header>
</template>

<style scoped>
.wa-app-heading {
  letter-spacing: -0.5%;
}
</style>
