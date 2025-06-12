<script setup lang="ts">
import { computed } from 'vue'
import { useProfileStore } from '@/stores/profile'
import EditProfile from '@/components/profile/EditProfile.vue'
import type { Profile } from '@/types'

const profileStore = useProfileStore()

const profile = computed<Profile>(
  () =>
    <Profile>{
      slug: profileStore.getSlug,
      fullName: profileStore.getFullName,
      email: profileStore.getEmail,
      phone: profileStore.getPhone,
      image: profileStore.getImage,
    },
)
</script>

<template>
  <main class="flex flex-col">
    <EditProfile :profile="profile" />
  </main>
</template>
