import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useProfileStore } from '../profile'
import type { Profile } from '@/types'

describe('profile store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('state', () => {
    it('should have default initial state', () => {
      const store = useProfileStore()
      expect(store.$state).toEqual({
        slug: 'default',
        fullName: 'Jane Doe',
        email: 'jane@gmail.com',
        phone: '123-456-7890',
        image: '',
      })
    })
  })

  describe('actions', () => {
    describe('updateProfile', () => {
      it('should update all profile fields', () => {
        const store = useProfileStore()
        const newProfile: Profile = {
          slug: 'john-doe',
          fullName: 'John Doe',
          email: 'john@gmail.com',
          phone: '987-654-3210',
          image: 'profile.jpg',
        }

        store.updateProfile(newProfile)

        expect(store.$state).toEqual(newProfile)
      })

      it('should only update provided fields', () => {
        const store = useProfileStore()
        const initialState = { ...store.$state }
        const partialUpdate: Partial<Profile> = {
          fullName: 'John Doe',
          email: 'john@gmail.com',
        }

        store.updateProfile(partialUpdate as Profile)

        expect(store.$state).toEqual({
          ...initialState,
          ...partialUpdate,
        })
      })

      it('should handle errors gracefully', () => {
        const store = useProfileStore()
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        const initialState = { ...store.$state }

        // Trigger an error by passing invalid data
        store.updateProfile(null as unknown as Profile)

        expect(store.$state).toEqual(initialState)
        expect(consoleSpy).toHaveBeenCalledWith('Failed to update profile:', expect.any(Error))
        consoleSpy.mockRestore()
      })
    })
  })

  describe('getters', () => {
    it('should get all profile fields correctly', () => {
      const store = useProfileStore()
      const testProfile: Profile = {
        slug: 'john-doe',
        fullName: 'John Doe',
        email: 'john@gmail.com',
        phone: '987-654-3210',
        image: 'profile.jpg',
      }

      store.updateProfile(testProfile)

      expect(store.getSlug).toBe(testProfile.slug)
      expect(store.getFullName).toBe(testProfile.fullName)
      expect(store.getEmail).toBe(testProfile.email)
      expect(store.getPhone).toBe(testProfile.phone)
      expect(store.getImage).toBe(testProfile.image)
    })
  })
})
