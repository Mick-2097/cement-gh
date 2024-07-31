import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLanguage = defineStore(
  'language',
  () => {
    const selectedLanguage = ref('')
    return { selectedLanguage }
  },
  {
    persist: [
      {
        paths: ['selectedLanguage']
      }
    ]
  }
)
