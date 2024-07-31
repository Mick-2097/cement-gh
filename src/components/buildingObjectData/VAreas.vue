<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { areaRequest } from '@/api/area.js'
import VSpinner from '@/components/VSpinner.vue'
import VModalEditArea from '@/components/modals/VModalEditArea.vue'
import VAreYouSure from '@/components/modals/VAreYouSure.vue'

const emits = defineEmits(['refreshAreaMenu'])
const route = useRoute()
const router = useRouter()
const listOfAreas = ref([])
const editAreaID = ref(0)
const areasReady = ref(false)
const showEditModal = ref(false)
const openAreYouSure = ref(false)

const fetchAreas = async () => {
  areasReady.value = false
  const response = await areaRequest.getAll(route.params.building_object_id)
  listOfAreas.value = response.data.list
  areasReady.value = true
}
fetchAreas()

const selectArea = (area) => {
  router.push({
    name: 'areadata',
    params: { area_id: area.id }
  })
}

const deleteArea = async () => {
  await areaRequest.delete(route.params.area_id)
  emits('refreshAreaMenu')
  router.push({
    name: 'objectdata',
    params: { building_object_id: route.params.building_object_id }
  })
}
const openEditAreaModal = (areaID) => {
  editAreaID.value = areaID
  showEditModal.value = true
}
const closeEditModal = () => {
  showEditModal.value = false
}

watch(
  () => route.params.building_object_id,
  () => {
    if (route.params.building_object_id) {
      fetchAreas()
    }
  }
)
</script>

<template>
  <div
    class="flex flex-col min-w-[290px] min-h-fit py-2 bg-white border-b border-black border-opacity-20 rounded-xl shadow-xl"
  >
    <h3
      class="py-2 w-full text-center opacity-60 border-b border-b-black border-opacity-20"
    >
      {{ $t('objectData.Areas') }}
    </h3>

    <VSpinner
      v-if="!route.params.building_id && !areasReady"
      class="self-center"
    />
    <div v-else>
      <p
        v-if="!listOfAreas.length"
        class="text-center py-2"
      >
        {{ $t('objectData.Empty') }}
      </p>
      <ul
        v-else
        class="list-none"
      >
        <li
          v-for="area in listOfAreas"
          @click="selectArea(area)"
          :class="
            route.path.includes(`areas/${area.id}`)
              ? 'bg-[var(--blue-focus)]'
              : ''
          "
          class="flex justify-between gap-4 px-4 py-2 cursor-pointer hover:bg-[var(--blue-focus)] focus:bg-[var(--blue-focus)] focus:outline-none text-wrap"
          tabindex="0"
        >
          {{ area.name }}
          <div
            v-if="route.params.area_id"
            class="flex gap-2"
          >
            <img
              @click="openEditAreaModal(area.id)"
              class="w-5 hover:scale-125"
              src="@/assets/Carbon-icons/edit.svg"
              alt="edit-area"
              :title="$t('VAreas.Edit-area')"
            />
            <img
              @click="openAreYouSure = true"
              class="w-5 hover:scale-125"
              src="@/assets/Carbon-icons/delete.svg"
              alt="delete-area"
              :title="$t('VAreas.Delete-area')"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
  <Transition name="modal">
    <VModalEditArea
      :areaID="editAreaID"
      v-if="showEditModal"
      @close="closeEditModal()"
      @save="emits('refreshAreaMenu'), closeEditModal()"
    />
  </Transition>
  <Transition name="modal">
    <VAreYouSure
      v-if="openAreYouSure"
      @cancel="openAreYouSure = false"
      @delete="deleteArea()"
    />
  </Transition>
</template>

<style scoped></style>
