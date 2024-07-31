<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { buildingRequest } from '@/api/building'
import { paramStore } from '@/stores/params'
import VModalAddBuilding from '@/components/modals/VModalAddBuilding.vue'
import VModalEditBuilding from '@/components/modals/VModalEditBuilding.vue'
import VModalAddMonitoringSpot from '@/components/modals/VModalAddMonitoringSpot.vue'
import VAreYouSure from '@/components/modals/VAreYouSure.vue'

const emits = defineEmits(['buildingsModified', 'refreshSpots'])
const params = paramStore()
const router = useRouter()
const route = useRoute()
const addBuildingModal = ref(false)
const addSpotModal = ref(false)
const editBuildingModal = ref(false)
const openAreYouSure = ref(false)

const deleteBuilding = async () => {
  openAreYouSure.value = false
  await buildingRequest.delete(route.params.building_id)
  emits('buildingsModified')
  router.push({
    name: 'objectdata',
    params: {
      building_object_id: route.params.building_object_id
    }
  })
}
const addBuilding = async (newBuilding) => {
  addBuildingModal.value = false
  await buildingRequest.create(newBuilding)
  emits('buildingsModified')
}
const editBuilding = () => {
  emits('buildingsModified')
}
</script>

<template>
  <transition name="fade-in">
    <div class="flex min-h-8 w-full justify-between">
      <Transition
        name="fade"
        mode="out-in"
      >
        <h1 class="text-2xl font-semibold">
          {{ params.selectedBuildingName }}
        </h1>
      </Transition>

      <!-- Actions -->
      <div class="flex gap-2 items-center">
        <!-- Delete building -->
        <img
          @click="openAreYouSure = true"
          class="cursor-pointer w-5 h-5 hover:scale-125"
          src="@/assets/Carbon-icons/delete.svg"
          alt="delete building"
          :title="$t('buildingData.Delete-building')"
          tabindex="0"
        />

        <!-- Edit building -->
        <img
          v-if="route.params.building_id"
          @click="editBuildingModal = true"
          class="cursor-pointer w-5 h-5 hover:scale-125"
          src="@/assets/Carbon-icons/edit.svg"
          alt="eedit building"
          :title="$t('buildingData.Edit-building')"
          tabindex="0"
        />

        <!-- Add monitoring spot -->
        <img
          v-if="route.params.building_id"
          @click="addSpotModal = true"
          class="cursor-pointer w-5 h-5 self-center hover:scale-125"
          src="@/assets/Carbon-icons/add-spot.svg"
          alt="add monitoring spot"
          :title="$t('buildingData.Add-monitoring-spot')"
          tabindex="0"
        />

        <!-- Add child -->
        <img
          @click="addBuildingModal = true"
          class="cursor-pointer w-5 h-5 self-center hover:scale-125"
          src="@/assets/Carbon-icons/add-child.svg"
          alt="add child"
          :title="$t('buildingData.Add-child')"
          tabindex="0"
        />
      </div>
    </div>
  </transition>

  <Transition name="modal">
    <VAreYouSure
      v-if="openAreYouSure"
      @cancel="openAreYouSure = false"
      @delete="deleteBuilding()"
    />
  </Transition>

  <Transition name="modal">
    <VModalAddBuilding
      v-if="addBuildingModal"
      @close="addBuildingModal = false"
      @addBuilding="addBuilding"
    />
  </Transition>

  <Transition name="modal">
    <VModalEditBuilding
      v-if="editBuildingModal"
      :buildingID="route.params.building_id"
      @close="editBuildingModal = false"
      @buildingsModified="editBuilding"
    />
  </Transition>

  <Transition name="modal">
    <VModalAddMonitoringSpot
      v-if="addSpotModal"
      @close="addSpotModal = false"
      @refreshSpots="emits('refreshSpots')"
    />
  </Transition>
</template>

<style scoped></style>
