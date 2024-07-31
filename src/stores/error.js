import { ref } from 'vue'
import { defineStore } from 'pinia'

export const errorStore = defineStore('error', () => {
  const errorMessage = ref('Unknown error')
  const isError = ref(false)
  const setError = (message) => {
    errorMessage.value = message
    isError.value = true
  }
  return {
    errorMessage,
    isError,
    setError
  }
})
