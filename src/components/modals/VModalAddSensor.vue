<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { sensorRequest } from '@/api/sensors.js'
import VSpinner from '@/components/VSpinner.vue'
import Vbutton from '@/components/Vbutton.vue'

const emits = defineEmits(['close'])
const route = useRoute()
const sensorArray = ref([])
const sensorsReady = ref(false)
const showSensorList = ref(false)
const searchInputRef = ref()
const selectedSensor = ref()

const emptySearchObject = ref({
  limit: '5'
})
const textSearchObject = ref({
  search: '',
  limit: '5'
})

const searchSensors = async () => {
  if (textSearchObject.value.search !== '') {
    const response = await sensorRequest.getLimited(textSearchObject.value)
    sensorsReady.value = true
    sensorArray.value = response.data.list
    return
  }
  const response = await sensorRequest.getLimited(emptySearchObject.value)
  sensorArray.value = response.data.list
  sensorsReady.value = true
  showSensorList.value = true
}
searchSensors()
let timeout

const updateSearch = async () => {
  sensorsReady.value = false
  clearTimeout(timeout)
  timeout = setTimeout(searchSensors, 500)
}
const selectSensor = (sensor) => {
  selectedSensor.value = sensor
  textSearchObject.value.search = sensor.serial_number
  showSensorList.value = false
}
const installSensor = async () => {
  await sensorRequest.install(
    selectedSensor.value.serial_number,
    route.params.spot_id
  )
  emits('close')
}
</script>

<template>
  <section
    @click="emits('close')"
    class="fixed top-0 left-0 z-10 flex justify-center items-center w-screen h-screen bg-black bg-opacity-80"
  >
    <div
      @click.stop
      class="flex flex-col w-72 h-96 sm:w-96 bg-white rounded-xl p-4"
    >
      <img
        @click="emits('close')"
        class="self-end cursor-pointer"
        src="@/assets/Carbon-icons/close.svg"
      />
      <h2 class="text-xl font-bold text-center mb-5">
        {{ $t('modals.Add-sensor') }}
      </h2>

      <!-- search select -->
      <div class="relative mb-5">
        <input
          @input="updateSearch()"
          class="px-4 h-10 w-full border border-black border-opacity-20 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="text"
          :placeholder="$t('reports.Search')"
          v-model="textSearchObject.search"
          ref="searchInputRef"
        />
        <div
          v-if="!sensorsReady"
          class="flex justify-center"
        >
          <VSpinner />
        </div>
        <ul
          v-else
          :class="showSensorList && sensorsReady ? 'scale-y-100' : 'scale-y-0'"
          class="absolute w-full bg-white border-b border-black border-opacity-20 rounded-b shadow-lg transition-all duration-300 origin-top ease-out"
        >
          <li
            v-if="sensorsReady && !sensorArray.length"
            class="flex p-4 items-center h-10 justify-center"
          >
            {{ $t('sensors.No-sensors') }}
          </li>
          <li
            v-else
            @click="selectSensor(sensor)"
            v-for="(sensor, index) in sensorArray"
            :key="index"
            :value="sensor"
            ref="listItemRefs"
            class="flex px-4 text-xs items-center h-6 cursor-pointer hover:bg-[var(--blue-focus)]"
          >
            {{ sensor.serial_number }}
          </li>
        </ul>
      </div>
      <Vbutton
        @click="installSensor()"
        buttonText="I'm a button"
        class="mb-0 mt-auto"
      />
    </div>
  </section>
</template>

<style scoped></style>
