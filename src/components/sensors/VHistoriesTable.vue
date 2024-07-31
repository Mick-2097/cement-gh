<script setup>
const props = defineProps(['sensorHistories'])
const emits = defineEmits(['export'])
</script>

<template>
  <table class="w-full bg-white overflow-scroll mb-8 shadow-xl">
    <thead class="h-10 bg-blue-100">
      <tr>
        <th class="px-2 cursor-default">{{ $t('histories.Temperature') }}</th>
        <th class="px-2 cursor-default">{{ $t('histories.Time') }}</th>
        <th class="px-2 cursor-default">{{ $t('histories.Maturity') }}</th>
        <th class="px-2 cursor-default">{{ $t('histories.Strength') }}</th>
        <th class="px-2 cursor-default">{{ $t('histories.Voltage') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="h-10 cursor-default border-b border-b-black border-opacity-20 hover:bg-blue-100"
        v-for="(history, index) in props.sensorHistories"
        :key="index"
      >
        <td class="text-center text-sm">{{ history.temperature }}</td>
        <td class="text-center text-sm">{{ history.time }}</td>
        <td class="text-center text-sm">{{ history.maturity }}</td>
        <td class="text-center text-sm">{{ history.strength }}</td>
        <td class="text-center text-sm">{{ history.voltage }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
