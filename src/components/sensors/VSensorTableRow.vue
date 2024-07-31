<script setup>
import { sensorRequest } from '@/api/sensors'
const props = defineProps(['sensorList'])
const emits = defineEmits(['viewSensor', 'getHistories', 'sensorsUpdated'])

const emitSensorInfo = (sensorInfo) => {
  emits('viewSensor', sensorInfo)
}

const emitViewHistories = (id) => {
  emits('getHistories', id)
}

const decoupleSensor = async (sensor) => {
  await sensorRequest.uninstall(sensor.serial_number)
  emits('sensorsUpdated')
}
</script>

<template>
  <tr
    v-for="sensor in props.sensorList"
    :key="sensor.id"
    class="h-10 cursor-default border-b border-b-black border-opacity-20 hover:bg-blue-100"
  >
    <td class="text-center text-sm">{{ sensor.id }}</td>
    <td class="text-center text-xs">{{ sensor.guid }}</td>
    <td class="text-center text-xs">
      {{ sensor.monitoring_spot?.name ? sensor.monitoring_spot.name : '' }}
    </td>
    <td class="text-center text-xs text-wrap">
      {{ sensor.serial_number }}
    </td>
    <td class="text-center text-xs">
      {{ sensor.type_id == '1' ? 'Internal' : 'External' }}
    </td>
    <td class="">
      <div class="flex justify-center gap-1">
        <!-- View -->
        <img
          @click="emitSensorInfo(sensor)"
          class="cursor-pointer w-5 h-5 hover:scale-125"
          src="@/assets/Carbon-icons/view.svg"
          alt="view sensor"
          :title="$t('sensors.View-sensor')"
          tabindex="0"
        />
        <!-- Decouple -->
        <img
          @click="decoupleSensor(sensor)"
          class="cursor-pointer w-5 h-5 hover:scale-125"
          src="@/assets/Carbon-icons/decouple.svg"
          alt="decouple sensor"
          :title="$t('sensors.Decouple-sensor')"
          tabindex="0"
        />
        <!-- View history-->
        <img
          @click="emitViewHistories(sensor.id)"
          class="cursor-pointer w-5 h-5 hover:scale-125"
          src="@/assets/Carbon-icons/view-history.svg"
          alt="see history"
          :title="$t('sensors.See-history')"
          tabindex="0"
        />
      </div>
    </td>
  </tr>
</template>

<style scoped></style>
