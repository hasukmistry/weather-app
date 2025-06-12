<script setup lang="ts">
import { computed } from 'vue'
import type { Location } from '@/types'
import { useLocationsStore } from '@/stores/locations'
import { useRouter } from 'vue-router'

const locationsStore = useLocationsStore()
const router = useRouter()

import IconBack from '@/components/icons/IconBack.vue'
import IconRemove from '@/components/icons/IconRemove.vue'
import IconAdd from '@/components/icons/IconAdd.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'
import LocationWeatherIcon from '@/components/location/LocationWeatherIcon.vue'

const props = defineProps<{
  location: Location | null
}>()

const emit = defineEmits<{
  (e: 'loadingStart', val: boolean): void
  (e: 'loadingDone', val: boolean): void
}>()

const currentLocation = computed(() => `${props.location?.name}, ${props.location?.sys.country}`)

const localTimestamp = computed(() => {
  if (!props.location) return ''
  const date = new Date(props.location.dt * 1000)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
})
const currentTemperature = computed(() => {
  const temp = props.location?.main.temp ?? 0
  return Math.round(temp - 273.15)
})
const currentWeather = computed(() => props.location?.weather[0]?.main)
const currentWeatherDescription = computed(() => props.location?.weather[0]?.description)
const lastUpdated = computed(() => {
  if (!props.location) return ''
  const date = new Date(props.location?.lastUpdated)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
})
const isLocationAdded = computed(
  () => locationsStore.getLocationById(<number>props.location?.id) !== undefined,
)
const addLocation = () => {
  locationsStore.addSearchedLocation(<number>props.location?.id)
  router.push('/')
}
const removeLocation = () => {
  locationsStore.removeFromLocationList(<number>props.location?.id)
  router.push('/')
}
const refreshLocation = async () => {
  emit('loadingStart', true)
  try {
    locationsStore.removeFromLocationList(<number>props.location?.id)
    const searchedLocation = await locationsStore.fetchLocation(
      <number>props.location?.coord?.lat,
      <number>props.location?.coord?.lon,
    )
    locationsStore.addSearchedLocation(<number>searchedLocation?.id)
    locationsStore.clearSearchedLocations()
  } catch (error) {
    console.error('Error refreshing location:', error)
  } finally {
    emit('loadingDone', true)
  }
}
</script>

<template>
  <div
    v-if="location"
    class="wa-location-info text-white flex flex-row items-start px-4 py-8 bg-no-repeat bg-cover bg-center"
  >
    <div class="shrink-0">
      <router-link to="/">
        <IconBack />
      </router-link>
    </div>
    <div class="flex flex-1 flex-col text-center justify-center">
      <h1 class="mt-1 mb-6 text-[14px] font-medium leading-[100%]">{{ currentLocation }}</h1>
      <p class="mb-6 font-normal leading-[100%]">{{ localTimestamp }}</p>
      <div class="w-full flex items-center justify-center">
        <div class="wa-weather-icon flex justify-center items-center">
          <LocationWeatherIcon :weather="currentWeatherDescription" />
        </div>
      </div>
      <p class="mb-2 font-normal text-[20px] leading-[100%]">
        {{ currentTemperature }}<sup>°</sup> C
      </p>
      <p class="mb-8 font-bold text-[20px] leading-[100%]">{{ currentWeather }}</p>

      <div class="flex flex-row items-center justify-center gap-1">
        <p class="font-normal leading-[100%]">Last Update {{ lastUpdated }}</p>
        <button @click.prevent="refreshLocation">
          <IconRefresh />
        </button>
      </div>
    </div>
    <div class="shrink-0">
      <button v-if="isLocationAdded && !location?.isMyLocation" @click.prevent="removeLocation">
        <IconRemove />
      </button>
      <button v-else-if="!isLocationAdded" @click.prevent="addLocation">
        <IconAdd />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wa-location-info {
  background-image: url("data:image/svg+xml,%3Csvg width='375' height='370' viewBox='0 0 375 370' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='375' height='370' fill='url(%23paint0_linear_1_3866)'/%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_1_3866' x1='2.32365e-06' y1='12.6913' x2='436.26' y2='250.266' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%234F80FA'/%3E%3Cstop offset='0.591748' stop-color='%233764D7'/%3E%3Cstop offset='0.794973' stop-color='%23335FD1'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E");
  .wa-weather-icon {
    width: 250px;

    svg {
      height: 100%;
      object-fit: contain;
      scale: 1.2;
    }
  }
}
</style>
