import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const currentCategory = ref('全部')

  const setCurrentCategory = (category: string) => {
    currentCategory.value = category
  }

  return {
    currentCategory,
    setCurrentCategory
  }
})

