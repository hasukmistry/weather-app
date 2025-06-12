<script setup lang="ts">
import IconBack from '@/components/icons/IconBackBlack.vue'
import IconProfileEdit from '@/components/icons/IconProfileEdit.vue'
import IconCountry from '@/components/icons/IconCountry.vue'

import { ref, reactive, watch } from 'vue'
import { useProfileStore } from '@/stores/profile'
import type { Profile } from '@/types'

const isReadOnly = ref(true)
const errors = ref<string[]>([])
const profileStore = useProfileStore()

const props = defineProps<{
  profile: Profile
}>()

const localProfile = reactive<Profile>({
  slug: '',
  fullName: '',
  email: '',
  phone: '',
  image: '',
})

watch(
  () => props.profile,
  (newProfile) => {
    Object.assign(localProfile, newProfile)
  },
  { immediate: true },
)

const validateProfile = (): boolean => {
  errors.value = []

  if (typeof localProfile.fullName !== 'string' || localProfile.fullName.trim().length === 0) {
    errors.value.push('Full name is required.')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localProfile.email)) {
    errors.value.push('Please enter a valid email address.')
  }

  if (!/^\d{3}-\d{3}-\d{4}$/.test(localProfile.phone)) {
    errors.value.push('Phone number must be in format: 123-456-7890')
  }

  return errors.value.length === 0
}

const handleImageChange = (event: Event) => {
  const file = (event.target as HTMLInputElement)?.files?.[0]
  if (file) {
    localProfile.image = URL.createObjectURL(file)
  }
}

const submitProfile = () => {
  if (!validateProfile()) return
  profileStore.updateProfile({ ...localProfile })
  isReadOnly.value = true
}
</script>

<template>
  <div v-if="profile" class="relative">
    <div
      class="wa-profile-header flex flex-row items-start px-4 py-8 min-h-[240px] bg-no-repeat bg-cover bg-center"
    >
      <div class="mt-2 shrink-0">
        <router-link to="/">
          <IconBack />
        </router-link>
      </div>
      <div class="flex flex-1 flex-col text-center justify-center">
        <h1 class="mb-6 font-medium text-[20px] leading-[28px]">Edit Profile</h1>
      </div>
    </div>
    <div class="wa-profile-image -mt-[60px] flex w-full absolute items-center justify-center">
      <div class="relative">
        <img
          v-if="!localProfile.image.length"
          class=""
          src="@/assets/default-avatar.png"
          alt="Profile Image"
        />
        <img v-else class="rounded-full" :src="localProfile.image" alt="Profile Image" />
        <div v-if="!isReadOnly" class="absolute right-0 bottom-0">
          <label class="cursor-pointer">
            <IconProfileEdit />

            <input type="file" class="hidden" accept="image/*" @change="handleImageChange" />
          </label>
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-[80px] justify-center items-center">
      <h2 class="leading-[100%]">{{ profile.fullName }}</h2>
      <ul class="wa-profile-info flex flex-row">
        <li class="text-[16px] leading-[100%]">{{ profile.email }}</li>
        <li class="text-[16px] leading-[100%]">{{ profile.phone }}</li>
      </ul>
    </div>
  </div>

  <div v-if="errors.length" class="mx-4 mt-4 py-2 text-red-600 text-sm space-y-1 border rounded">
    <div v-for="(error, index) in errors" :key="index">• {{ error }}</div>
  </div>
  <form class="flex flex-col px-4 py-5" :class="errors.length ? '' : 'mt-[31px] '">
    <div class="wa-form-controls flex flex-col min-h-[380px] gap-4">
      <div
        class="wa-form-control flex flex-col rounded-lg px-1 py-[9px]"
        :class="isReadOnly ? 'bg-[#F5F5F5]' : 'bg-[#FFFFFF] border border-[#F5F5F5]'"
      >
        <label class="text-[8px] leading-[100%]" for="fullName">Full name</label>
        <input
          id="fullName"
          type="text"
          class="text-[14px] mt-2 outline-0 leading-[100%] font-[510px]"
          v-model="localProfile.fullName"
          :disabled="isReadOnly"
        />
      </div>

      <div
        class="wa-form-control flex flex-col bg-[#F5F5F5] rounded-lg px-1 py-[9px]"
        :class="isReadOnly ? 'bg-[#F5F5F5]' : 'bg-[#FFFFFF] border border-[#F5F5F5]'"
      >
        <label class="text-[8px] leading-[100%]" for="email">Email</label>
        <input
          id="email"
          type="text"
          class="text-[14px] mt-2 outline-0 leading-[100%] font-[510px]"
          v-model="localProfile.email"
          :disabled="isReadOnly"
        />
      </div>

      <div
        class="wa-form-control flex flex-col bg-[#F5F5F5] rounded-lg px-1 py-[9px]"
        :class="isReadOnly ? 'bg-[#F5F5F5]' : 'bg-[#FFFFFF] border border-[#F5F5F5]'"
      >
        <label class="text-[8px] leading-[100%]" for="phone">Phone Number</label>
        <div class="flex justify-center items-center gap-1">
          <div class="shrink-0 mt-1">
            <IconCountry />
          </div>
          <div class="flex-1">
            <input
              id="phone"
              type="text"
              class="text-[14px] mt-2 outline-0 leading-[100%] font-[510px]"
              v-model="localProfile.phone"
              :disabled="isReadOnly"
            />
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="isReadOnly"
      @click.prevent="() => (isReadOnly = false)"
      class="flex justify-center text-white text-[18px] leading-[28px] font-[590px] py-[12.5px] uppercase rounded-lg bg-[#2E3A5A]"
    >
      Edit
    </button>
    <button
      v-else
      @click.prevent="submitProfile"
      class="flex justify-center text-white text-[18px] leading-[28px] font-[590px] py-[12.5px] uppercase rounded-lg bg-[#2E3A5A]"
    >
      Submit
    </button>
  </form>
</template>

<style lang="scss" scoped>
.wa-profile-header {
  background-image: url("data:image/svg+xml,%3Csvg width='375' height='206' viewBox='0 0 375 206' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H390V181.785C390 181.785 271.719 206.096 194 206C117.05 205.905 0 181.785 0 181.785V0Z' fill='%23F5F8FF'/%3E%3C/svg%3E%0A");

  svg {
    fill: #000000;
  }
}
.wa-profile-image {
  height: 120px;

  img {
    height: 100%;
    width: 120px;
    object-fit: cover;
  }
}
.wa-profile-info {
  li {
    &::after {
      content: '|';
      margin-left: 5px;
      margin-right: 5px;
      font-size: 16px;
    }

    &:last-child::after {
      content: '';
    }
  }
}
form {
  .wa-form-control {
    box-shadow: 0px 2px 25px 1px rgba(0, 0, 0, 0.02);

    &:focus-within {
      outline: 2px solid #0060cc;
    }
  }
}
</style>
