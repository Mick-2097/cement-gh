<script setup>
const emits = defineEmits(['close'])
const props = defineProps(['sensorInformation'])
</script>

<template>
  <section
    @click="emits('close')"
    class="fixed top-0 left-0 z-10 flex justify-center items-center w-screen h-screen bg-black bg-opacity-80"
  >
    <div
      @click.stop
      class="flex flex-col w-72 sm:w-96 bg-white rounded-xl p-4"
    >
      <img
        @click="emits('close')"
        class="self-end cursor-pointer"
        src="@/assets/Carbon-icons/close.svg"
      />
      <h2 class="text-xl font-bold text-center">Sensor information</h2>
      <!-- GUID -->
      <label
        class="cursor-pointer mt-4"
        for="GUID"
      >
        GUID
      </label>
      <input
        disabled
        :value="props.sensorInformation.guid"
        class="text-sm border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="GUID"
      />
      <!-- Serial number -->
      <label
        class="cursor-pointer mt-4"
        for="serial-number"
      >
        Serial number
      </label>
      <input
        disabled
        :value="props.sensorInformation.serial_number"
        class="text-sm border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="serial-number"
      />
      <!-- Type -->
      <label
        class="cursor-pointer mt-4"
        for="type"
      >
        Type
      </label>
      <input
        disabled
        :value="props.sensorInformation.type_id == 1 ? 'Internal' : 'External'"
        class="text-sm border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="type"
      />
      <!-- Status -->
      <label
        class="cursor-pointer mt-4"
        for="status"
      >
        Status
      </label>
      <input
        disabled
        :value="props.sensorInformation.is_installed"
        class="text-sm border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="status"
      />
    </div>
  </section>
</template>

<style scoped></style>
