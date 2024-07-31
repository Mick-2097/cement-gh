import { ref } from 'vue'
import { defineStore } from 'pinia'

export const paramStore = defineStore('params', () => {
  const selectedProjectName = ref('')
  const selectedBuildingName = ref('')
  const buildingObjects = ref({})
  return {
    selectedProjectName,
    selectedBuildingName,
    buildingObjects
  }
})
