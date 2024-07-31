<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sensorRequest } from '@/api/sensors.js'
import { paramStore } from '@/stores/params'
import VSpinner from '@/components/VSpinner.vue'
import VSensorTableHead from './VSensorTableHead.vue'
import VSensorTableRow from './VSensorTableRow.vue'

const route = useRoute()
const router = useRouter()
const emits = defineEmits(['viewSensor', 'viewHistories'])
const params = paramStore()
const sensorsReady = ref(false)
const sensorList = ref([])
const lastPage = ref(0)
const objectSelect = ref()
const sensorLimit = ref({
  building_object_id: +route.params.building_object_id,
  limit: 6,
  page: 1
})

const emitSensorInfo = (sensorInfo) => {
  emits('viewSensor', sensorInfo)
}

const emitViewHistories = (id) => {
  emits('viewHistories', id)
}

const gotoSensors = (increment) => {
  router.push({
    name: 'sensorsbuildingobject',
    params: { building_object_id: sensorLimit.value.building_object_id }
  })
  fetchSensors(increment)
}

const fetchSensors = async (increment = 0) => {
  sensorsReady.value = false
  sensorLimit.value.page += increment
  const response = await sensorRequest.getLimited(sensorLimit.value)
  sensorList.value = response.data.list
  lastPage.value = response.data.lastPage
  sensorsReady.value = true
}
// edge case; navigate back to sensors page
watch(route, () => {
  if (route.name === 'sensors') {
    sensorLimit.value.building_object_id = 0
  }
})

onMounted(() => {
  if (route.params.building_object_id) {
    fetchSensors(0)
  }
})
</script>

<template>
  <div class="flex flex-col items-center">
    <!-- building object dropdown -->
    <div
      class="md:w-1/2 bg-white border-b border-black border-opacity-30 mb-6 rounded-lg shadow-lg"
    >
      <label
        class="flex flex-col text-center p-2 text-lg"
        for="building-object"
        >{{ $t('sensors.Select-an-option') }}
        <select
          v-model="sensorLimit.building_object_id"
          @change="gotoSensors(0)"
          class="px-2 py-1 text-base border border-black border-opacity-40 rounded"
          name="building-object"
          ref="objectSelect"
        >
          <option
            value=""
            selected
            disabled
          ></option>
          <option
            v-for="buildingObject in params.buildingObjects.value"
            :key="buildingObject.id"
            :value="buildingObject.id"
          >
            {{ buildingObject.name }}
          </option>
        </select>
      </label>
    </div>
    <div
      v-if="
        route.name === 'sensorsbuildingobject' ||
        route.name === 'sensorssensorid'
      "
      class="w-full"
    >
      <div
        v-if="route.params.building_object_id && !sensorsReady"
        class="flex items-center w-full min-h-[353px] justify-center bg-[var(--bg)]"
      >
        <VSpinner class="h-fit" />
      </div>
      <div
        v-else
        class="flex flex-col items-center"
      >
        <div
          v-if="!sensorList.length"
          class="w-full h-24 flex items-center justify-center"
        >
          <p>{{ $t('sensors.No-sensors') }}</p>
        </div>
        <table
          v-else
          class="bg-white overflow-scroll mb-8 shadow-xl w-full"
        >
          <VSensorTableHead />
          <tbody>
            <VSensorTableRow
              :sensorList="sensorList"
              @viewSensor="emitSensorInfo"
              @getHistories="emitViewHistories"
              @sensorsUpdated="fetchSensors(0)"
            />
            <!-- Pagination -->
            <tr class="border-b border-b-black border-opacity-20">
              <td class="flex py-2 pl-2">
                <img
                  @click="fetchSensors(-1)"
                  v-if="sensorLimit.page > 1"
                  class="rotate-90 h-6 border border-black cursor-pointer"
                  src="@/assets/Carbon-icons/Arrow-sm.svg"
                  alt="previous page"
                  :title="$t('sensors.Previous')"
                />
                <div
                  v-else
                  class="w-6"
                ></div>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="flex justify-end bg-white py-2 pr-2">
                <img
                  @click="fetchSensors(1)"
                  v-if="sensorLimit.page < lastPage"
                  class="-rotate-90 h-6 border border-black cursor-pointer"
                  src="@/assets/Carbon-icons/Arrow-sm.svg"
                  alt="next page"
                  :title="$t('sensors.Next')"
                />
                <div
                  v-else
                  class="w-6"
                ></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
