<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { sensorHistoryRequests } from '@/api/sensorHistories'
import VbuttonOutline from '@/components/VbuttonOutline.vue'
import VSensorTable from '@/components/sensors/VSensorTable.vue'
import VSpinner from '@/components/VSpinner.vue'
import VHistoriesTable from '@/components/sensors/VHistoriesTable.vue'
import VSensorModal from '@/components/modals/VModalViewSensor.vue'

const route = useRoute()
const router = useRouter()
const isSensorModal = ref(false)
const isHistoriesTable = ref(false)
const sensorHistories = ref()
const historiesReady = ref(false)
const sensorInformation = ref({})
const sensorHistoryID = ref()
const fileInput = ref(null)

const setSensorInfo = (sensor) => {
  sensorInformation.value = sensor
  isSensorModal.value = true
}

const getHistories = async (ID) => {
  router.push({
    name: 'sensorssensorid',
    params: { sensor_id: ID }
  })
  sensorHistoryID.value = ID
  historiesReady.value = false
  isHistoriesTable.value = true
  const response = await sensorHistoryRequests.getSensorHistory(ID)
  sensorHistories.value = response.data.list
  historiesReady.value = true
}

const exportHistory = () => {
  return sensorHistoryRequests.exportData(sensorHistoryID.value)
}

const clearHistory = async () => {
  historiesReady.value = false
  await sensorHistoryRequests.deleteData(sensorHistoryID.value)
  getHistories(sensorHistoryID.value)
  historiesReady.value = true
}

const importHistory = async (event) => {
  historiesReady.value = false
  const file = event.target.files[0]
  if (file) {
    await sensorHistoryRequests.importData(sensorHistoryID.value, file)
    getHistories(sensorHistoryID.value)
  }
  historiesReady.value = true
}

onMounted(() => {
  if (route.params.sensor_id) {
    getHistories(route.params.sensor_id)
  }
})
</script>

<template>
  <div class="flex flex-col w-full bg-[var(--bg)]">
    <VSensorTable
      @viewSensor="setSensorInfo"
      @viewHistories="getHistories"
    />
    <!-- History table section -->
    <Transition name="fade">
      <div
        v-if="route.name === 'sensorssensorid'"
        class="justify-center flex w-full bg-[var(--bg)]"
      >
        <div v-if="!historiesReady">
          <VSpinner />
        </div>
        <div
          v-else
          class="w-full"
        >
          <div class="flex gap-3 justify-center mb-4">
            <a
              :href="exportHistory()"
              target="_self"
            >
              <VbuttonOutline
                :buttonText="$t('histories.Export')"
                textColor="text-blue-500 hover:text-white hover:bg-blue-500 transition duration-500"
                borderColor="border-blue-500"
                :title="$t('histories.Export-sensor-history')"
              />
            </a>
            <VbuttonOutline
              :buttonText="$t('histories.Clear')"
              textColor="text-red-500 hover:text-white hover:bg-red-500 transition duration-500"
              borderColor="border-red-500"
              @click.once="clearHistory()"
              :title="$t('histories.Clear-sensor-history')"
            />

            <VbuttonOutline
              @click.once="fileInput.click()"
              :buttonText="$t('histories.Import')"
              :title="$t('histories.Import-sensor-history')"
            />
            <input
              ref="fileInput"
              @change="importHistory"
              class="hidden"
              type="file"
              accept=".xls"
              name=""
              id=""
            />
          </div>
          <div
            v-if="historiesReady && !sensorHistories.length"
            class="flex items-center justify-center w-full h-24"
          >
            <p class="text-lg">{{ $t('sensors.No-sensor-history') }}</p>
          </div>
          <VHistoriesTable
            v-else
            :sensorHistories="sensorHistories"
          />
        </div>
      </div>
    </Transition>
    <Transition name="modal">
      <VSensorModal
        :sensorInformation="sensorInformation"
        v-if="isSensorModal"
        @close="isSensorModal = false"
      />
    </Transition>
  </div>
</template>

<style scoped></style>
