<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import Vbutton from '@/components/Vbutton.vue'
import { buildingRequest } from '@/api/building'

const emits = defineEmits(['close', 'buildingsModified'])
const props = defineProps(['buildingID'])
const route = useRoute()
const newBuilding = ref({})
const invalidName = ref(false)
const invalidDescription = ref(false)

const validateEditBuildingInputs = () => {
  if (newBuilding.value.name === '') invalidName.value = true
  if (newBuilding.value.description === '') invalidDescription.value = true
  if (invalidName.value || invalidDescription.value) return
  else editBuilding()
}

const editBuilding = async () => {
  await buildingRequest.update(route.params.building_id, newBuilding.value)
  emits('buildingsModified')
  emits('close')
}
onBeforeMount(async () => {
  const response = await buildingRequest.get(props.buildingID)
  newBuilding.value = response.data
})
</script>

<template>
  <section
    @click="emits('close')"
    class="fixed top-0 left-0 z-10 flex justify-center items-center w-screen h-screen bg-black bg-opacity-80"
  >
    <div
      @click.stop
      class="flex flex-col w-72 sm:w-96 bg-white rounded-xl p-4 gap-2"
    >
      <img
        @click="emits('close')"
        class="self-end cursor-pointer text-base"
        src="@/assets/Carbon-icons/close.svg"
      />

      <h2 class="text-xl font-bold text-center">
        {{ $t('modals.Edit-building') }}
      </h2>
      <label
        for="building-name"
        class="cursor-pointer"
      >
        {{ $t('modals.Name') }}
      </label>
      <input
        @focus="invalidName = false"
        v-model="newBuilding.name"
        type="text"
        id="building-name"
        :class="
          invalidName
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
      />

      <label
        for="building-descriptiion"
        class="cursor-pointer"
      >
        {{ $t('modals.Description') }}
      </label>
      <textarea
        @focus="invalidDescription - false"
        v-model="newBuilding.description"
        rows="3"
        type="text"
        id="building-descriptiion"
        :class="
          invalidDescription
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
      />

      <Vbutton
        @click.once="validateEditBuildingInputs()"
        :buttonText="$t('buttons.Edit-building')"
        class="w-1/2 self-center mt-4"
      />
    </div>
  </section>
</template>

<style scoped></style>
