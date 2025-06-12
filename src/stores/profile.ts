import { defineStore } from 'pinia'
import type { Profile } from '@/types'

export const useProfileStore = defineStore('profile', {
  state: (): Profile => ({
    slug: 'default',
    fullName: 'Jane Doe',
    email: 'jane@gmail.com',
    phone: '123-456-7890',
    image: '',
  }),
  actions: {
    updateProfile(formData: Profile): void {
      try {
        this.slug = formData.slug || this.slug
        this.fullName = formData.fullName || this.fullName
        this.email = formData.email || this.email
        this.phone = formData.phone || this.phone
        this.image = formData.image || this.image
      } catch (error) {
        console.error('Failed to update profile:', error)
      }
    },
  },
  getters: {
    getSlug: (state): string => state.slug,
    getFullName: (state): string => state.fullName,
    getEmail: (state): string => state.email,
    getPhone: (state): string => state.phone,
    getImage: (state): string => state.image,
  },
})
