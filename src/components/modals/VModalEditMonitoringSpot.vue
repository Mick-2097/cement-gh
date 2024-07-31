<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import Vbutton from '@/components/Vbutton.vue'
import { spotRequest } from '@/api/spot'

const emits = defineEmits(['close', 'refreshSpots'])
const props = defineProps(['spotID'])
const route = useRoute()
const editedSpot = ref({})
const invalidName = ref(false)
const invalidID = ref(false)
const invalidX = ref(false)
const invalidY = ref(false)

const validateEditSpotInput = () => {
  if (editedSpot.value.name === '') invalidName.value = true
  if (editedSpot.value.type_id === '') invalidID.value = true
  if (editedSpot.value.axis_x === '') invalidX.value = true
  if (editedSpot.value.axis_y === '') invalidY.value = true
  if (invalidName.value || invalidID.value || invalidX.value || invalidY.value)
    return
  else editSpot()
}

const editSpot = async () => {
  await spotRequest.update(route.params.spot_id, editedSpot.value)
  emits('refreshSpots', 'close')
}
onBeforeMount(async () => {
  const response = await spotRequest.get(props.spotID)
  editedSpot.value = response.data
})
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
      <h2 class="text-xl font-bold text-center">
        {{ $t('modals.Edit-monitoring-spot') }}
      </h2>

      <!-- Name -->
      <label
        class="cursor-pointer mt-4"
        for="spot-name"
      >
        {{ $t('modals.Name') }}
      </label>
      <input
        @focus="invalidName = false"
        v-model="editedSpot.name"
        :class="
          invalidName
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="spot-name"
      />

      <!-- Sensor type -->
      <label
        class="cursor-pointer mt-4 mb-2"
        for="spot-type"
      >
        {{ $t('modals.Sensor-type') }}
      </label>
      <select
        @focus="invalidID = false"
        v-model="editedSpot.type_id"
        :class="
          invalidID
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-solid border-black rounded border-opacity-40 h-10 min-w-[calc(100%-200px)] text-center focus:outline-none focus:border-[var(--blue)] focus:border-2"
        name="spot-type"
        id="spot-type"
      >
        <option
          disabled
          selected
          value
        >
          {{ $t('modals.Select-sensor-type') }}
        </option>
        <option value="1">
          {{ $t('modals.Internal') }}
        </option>
        <option value="2">
          {{ $t('modals.External') }}
        </option>
      </select>

      <!-- Axes -->
      <label
        class="cursor-pointer mt-4"
        for="axis-x"
      >
        {{ $t('modals.X-axis') }}
      </label>
      <input
        @focus="invalidX = false"
        :class="
          invalidX
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        v-model="editedSpot.axis_x"
        type="number"
        step="0.1"
        id="axis-x"
      />

      <label
        class="cursor-pointer mt-4"
        for="axis-y"
      >
        {{ $t('modals.Y-axis') }}
      </label>
      <input
        @focus="invalidY - false"
        :class="
          invalidY
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        v-model="editedSpot.axis_y"
        type="number"
        step="0.1"
        id="axis-y"
      />

      <Vbutton
        @click.once="validateEditSpotInput()"
        class="mt-8 mb-4 w-fit self-center"
        :buttonText="$t('buttons.Edit-spot')"
      />
    </div>
  </section>
</template>

<style scoped></style>
