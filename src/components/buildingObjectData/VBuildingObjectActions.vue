<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { buildingRequest } from '@/api/building'
import { objectRequest } from '@/api/buildingObject'
import { paramStore } from '@/stores/params'
import VModalAddBuilding from '@/components/modals/VModalAddBuilding.vue'
import VModalAddArea from '@/components/modals/VModalAddArea.vue'
import VModalEditBuildingObject from '@/components/modals/VModalEditBuildingObject.vue'
import VAreYouSure from '@/components/modals/VAreYouSure.vue'

const emits = defineEmits(['buildingsModified', 'areaAdded'])
const params = paramStore()
const route = useRoute()
const router = useRouter()
const editBuildingObjectID = ref('')
const addBuildingModal = ref(false)
const addAreaModal = ref(false)
const editBuildingObjectModal = ref(false)
const openAreYouSure = ref(false)

const deleteBuildingObject = async () => {
  const response = await objectRequest.delete(route.params.building_object_id)
  emits('buildingsModified')
  router.push({
    name: 'projectdata',
    params: {
      project_id: route.params.project_id
    }
  })
}
const openEditBuildingObjectModal = () => {
  editBuildingObjectID.value = route.params.building_object_id
  editBuildingObjectModal.value = true
}

const addBuilding = async (newBuilding) => {
  await buildingRequest.create(newBuilding)
  emits('buildingsModified')
  addBuildingModal.value = false
}
const buildingObjectEdited = () => {
  emits('buildingsModified')
  editBuildingObjectModal.value = false
}
const areaAdded = () => {
  addAreaModal.value = false
  emits('areaAdded')
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
      <div class="flex gap-3 items-center">
        <!-- Delete object -->
        <img
          @click="openAreYouSure = true"
          class="cursor-pointer w-5 h-5 hover:scale-125"
          src="@/assets/Carbon-icons/delete.svg"
          alt="delete building object"
          :title="$t('objectData.Delete-building-object')"
          tabindex="0"
        />

        <!-- Edit object -->
        <img
          @click="openEditBuildingObjectModal"
          class="cursor-pointer w-5 h-5 hover:scale-125"
          src="@/assets/Carbon-icons/edit.svg"
          alt="edit building object"
          :title="$t('objectData.Edit-building-object')"
          tabindex="0"
        />

        <!-- Add child -->
        <img
          @click="addBuildingModal = true"
          class="cursor-pointer w-5 h-5 self-center hover:scale-125"
          src="@/assets/Carbon-icons/add-child.svg"
          alt="add child"
          :title="$t('objectData.Add-child')"
          tabindex="0"
        />

        <!-- Add area -->
        <img
          @click="addAreaModal = true"
          v-if="!route.params.building_id"
          class="cursor-pointer w-5 h-5 hover:scale-125"
          src="@/assets/Carbon-icons/add-area.svg"
          alt="add area"
          :title="$t('objectData.Add-area')"
          tabindex="0"
        />
      </div>
    </div>
  </transition>
  <Transition name="modal">
    <VAreYouSure
      v-if="openAreYouSure"
      @cancel="openAreYouSure = false"
      @delete="deleteBuildingObject()"
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
    <VModalAddArea
      v-if="addAreaModal"
      @close="areaAdded()"
    />
  </Transition>
  <Transition name="modal">
    <VModalEditBuildingObject
      v-if="editBuildingObjectModal"
      :buildingObjectID="editBuildingObjectID"
      @close="editBuildingObjectModal = false"
      @objectEdited="buildingObjectEdited()"
    />
  </Transition>
</template>

<style scoped></style>
