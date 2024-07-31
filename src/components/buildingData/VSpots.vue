<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { spotRequest } from '@/api/spot.js'
import VSpinner from '@/components/VSpinner.vue'
import VModalEditMonitoringSpot from '@/components/modals/VModalEditMonitoringSpot.vue'
import VAddSensor from '@/components/modals/VModalAddSensor.vue'
import VAreYouSure from '@/components/modals/VAreYouSure.vue'

const emits = defineEmits(['refreshSpots'])
const route = useRoute()
const router = useRouter()
const spots = ref([])
const editSpotID = ref(0)
const spotsReady = ref(false)
const openEditModal = ref(false)
const openAddSensorModal = ref(false)
const openAreYouSure = ref(false)

const fetchSpots = async () => {
  openEditModal.value = false
  const response = await spotRequest.getAll(route.params.building_id)
  spots.value = response.data.list
  spotsReady.value = true
}
fetchSpots()

const selectSpot = (spot) => {
  router.push({
    name: 'spotdata',
    params: { spot_id: spot.id }
  })
}

const deleteSpot = async () => {
  await spotRequest.delete(route.params.spot_id)
  emits('refreshSpots')
  router.push({
    name: 'buildingdata',
    params: { building_id: route.params.building_id }
  })
}
const closeEditModal = () => {
  emits('refreshSpots')
}

const openEditSpotModal = (id) => {
  editSpotID.value = id
  openEditModal.value = true
}

watch(
  () => route.params.building_id,
  () => {
    if (route.params.building_id) {
      spotsReady.value = false
      fetchSpots()
    }
  }
)
</script>

<template>
  <div
    class="flex flex-col py-2 bg-white rounded-xl shadow-xl min-h-fit min-w-[300px]"
  >
    <h3
      class="py-2 w-full text-center opacity-60 border-b border-b-black border-opacity-20"
    >
      {{ $t('VSpots.Monitoring-spots') }}
    </h3>
    <VSpinner
      v-if="!spotsReady"
      class="self-center"
    />
    <div v-else>
      <p
        v-if="!spots.length"
        class="text-center py-2"
      >
        {{ $t('VSpots.Empty') }}
      </p>
      <ul class="list-none">
        <li
          v-for="spot in spots"
          :key="spot.id"
          @click="selectSpot(spot)"
          :class="
            route.path.includes(`spots/${spot.id}`)
              ? 'bg-[var(--blue-focus)]'
              : ''
          "
          class="flex px-4 py-2 justify-between cursor-pointer hover:bg-[var(--blue-focus)] focus:bg-[var(--blue-focus)] focus:outline-none text-wrap"
          tabindex="0"
        >
          {{ spot.name }}
          <div
            v-if="route.params.spot_id"
            class="flex gap-2"
          >
            <img
              @click="openEditSpotModal(spot.id)"
              class="w-5 hover:scale-125 cursor-pointer"
              src="@/assets/Carbon-icons/edit.svg"
              alt="edit-spot"
              :title="$t('VSpots.Edit-spot')"
            />
            <img
              @click="openAreYouSure = true"
              class="w-5 hover:scale-125 cursor-pointer"
              src="@/assets/Carbon-icons/delete.svg"
              alt="delete-spot"
              :title="$t('VSpots.Delete-spot')"
            />
            <img
              @click="openAddSensorModal = true"
              class="w-5 hover:scale-125 cursor-pointer"
              src="@/assets/Carbon-icons/qr-code.svg"
              alt="delete-spot"
              :title="$t('VSpots.Delete-spot')"
            />
          </div>
        </li>
      </ul>
    </div>
    <Transition name="modal">
      <VModalEditMonitoringSpot
        :spotID="editSpotID"
        v-if="openEditModal"
        @close="openEditModal = false"
        @refreshSpots="closeEditModal()"
      />
    </Transition>
    <Transition name="modal">
      <VAreYouSure
        v-if="openAreYouSure"
        @cancel="openAreYouSure = false"
        @delete="deleteSpot()"
      />
    </Transition>
    <Transition name="modal">
      <VAddSensor
        v-if="openAddSensorModal"
        @close="openAddSensorModal = false"
      />
    </Transition>
  </div>
</template>

<style scoped></style>
