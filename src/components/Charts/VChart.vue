<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { sensorHistoryRequests } from '@/api/sensorHistories'
import { Line } from 'vue-chartjs'
import VSpinner from '../../components/VSpinner.vue'

import { Chart, registerables, TimeScale } from 'chart.js'
import 'chartjs-adapter-date-fns'
import zoomPlugin from 'chartjs-plugin-zoom'

Chart.register(...registerables, TimeScale, zoomPlugin)

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { getChartOptions, getLineFormattedData } from './chartConfig.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const route = useRoute()
const histories = ref([])
const historiesReady = ref(false)
const dataSetKeys = ['temperature', 'maturity', 'strength']

const setHistories = async () => {
  historiesReady.value = false

  if (!route.params.area_id) {
    return
  }

  const response = await sensorHistoryRequests.getForArea(route.params.area_id)

  histories.value = response.data
  historiesReady.value = true
}
setHistories()

watch(
  () => route.params.area_id,
  () => {
    setHistories()
  }
)
</script>

<template>
  <div class="flex flex-col mb-8 w-full">
    <div
      class="flex items-center justify-center py-12 rounded-lg shadow-lg w-full bg-white"
      v-if="!historiesReady"
    >
      <VSpinner />
    </div>
    <ul
      v-if="historiesReady"
      class="flex flex-col gap-8 w-full pb-8"
    >
      <li
        v-for="dataSetKey in dataSetKeys"
        class="flex p-2 bg-white rounded-2xl shadow-lg justify-center min-h-fit h-96"
      >
        <Line
          class="w-full"
          v-if="histories[dataSetKey]"
          :data="getLineFormattedData(histories[dataSetKey])"
          :options="getChartOptions(dataSetKey, histories[dataSetKey])"
        />
      </li>
    </ul>
    <p
      v-else
      class="text-center text-black text-opacity-60 py-10 bg-white rounded-xl shadow-lg"
    >
      {{ $t('objectData.Empty') }}
    </p>
  </div>
</template>

<style scoped></style>
