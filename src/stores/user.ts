import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { UserProfile } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const profile = ref<UserProfile | null>(null)

  const setProfile = (value: UserProfile | null) => {
    profile.value = value
  }

  return {
    profile,
    setProfile
  }
})

