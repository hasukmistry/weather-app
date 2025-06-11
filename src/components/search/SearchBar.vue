<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconClose from '@/components/icons/IconClose.vue'

const isLoading = ref(true)
const searchStore = useSearchStore()

const searchQuery = ref('')
const router = useRouter()
const emit = defineEmits<{
  (e: 'search', query: string): void
}>()

watch(searchQuery, async (newVal) => {
  if (newVal.trim() !== '' && newVal.length >= 3) {
    await searchStore.search(newVal)
    emit('search', newVal)
    isLoading.value = false
  }
})

const clearSearch = () => {
  searchQuery.value = ''
  router.push('/')
}
</script>

<template>
  <form>
    <div
      class="wa-searchbar flex mt-2 items-center bg-[#F7F7F9] border border-[#F7F7F9] rounded-[10px] py-2 px-[11px]"
    >
      <IconSearch class="shrink-0" />
      <input
        v-model="searchQuery"
        class="flex-1 outline-0 px-2 leading-[100%]"
        type="text"
        placeholder="Search for a city or airport"
      />
      <button v-if="searchQuery" @click.prevent="clearSearch" class="cursor-pointer">
        <span class="sr-only">Clear search</span>
        <IconClose class="shrink-0" />
      </button>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.wa-searchbar {
  &:focus-within {
    outline: 2px solid #0060cc;
  }
  &:has(button:focus) {
    outline: none;
  }
  button {
    letter-spacing: 3%;
  }
}
</style>
