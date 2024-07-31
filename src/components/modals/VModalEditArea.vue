<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { areaRequest } from '@/api/area'
import { concreteRequest } from '@/api/concrete'
import Vbutton from '@/components/Vbutton.vue'

const props = defineProps(['areaID'])
const emits = defineEmits(['close', 'save'])
const route = useRoute()
const concreteCompositions = ref()
const areaToEdit = ref({})
const invalidID = ref(false)
const invalidName = ref(false)
const invalidDescription = ref(false)
const invalidFill = ref(false)

const validateEditAreaInputs = () => {
  if (areaToEdit.value.concrete_composition_id === '') invalidID.value = true
  if (areaToEdit.value.name === '') invalidName.value = true
  if (areaToEdit.value.description === '') invalidDescription.value = true
  if (areaToEdit.value.filling_time === '') invalidFill.value = true
  if (
    invalidID.value ||
    invalidName.value ||
    invalidDescription.value ||
    invalidFill.value
  )
    return
  else editArea()
}

const editArea = async () => {
  await areaRequest.update(props.areaID, areaToEdit.value)
  emits('save')
}

const getConcreteCompositions = async () => {
  const response = await concreteRequest.getAll(+route.params.company_id)
  concreteCompositions.value = response.data.list
}

onBeforeMount(async () => {
  getConcreteCompositions()
  const response = await areaRequest.get(props.areaID)
  areaToEdit.value = response.data
})
</script>

<template>
  <section
    @click="emits('close')"
    class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-10"
  >
    <div
      @click.stop
      class="flex flex-col w-72 sm:w-96 bg-white rounded-xl m-auto mt-[10vh] p-4"
    >
      <img
        @click="emits('close')"
        class="self-end cursor-pointer"
        src="@/assets/Carbon-icons/close.svg"
      />
      <h2 class="text-xl font-bold text-center">
        {{ $t('modals.Edit-area') }}
      </h2>

      <label
        class="cursor-pointer mt-4 mb-3"
        for="concrete-composition"
      >
        {{ $t('modals.Concrete-compostition') }}
      </label>
      <select
        @focus="invalidID = false"
        v-model="areaToEdit.concrete_composition_id"
        :class="
          invalidID
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-solid border-black rounded border-opacity-40 h-10 min-w-[calc(100%-200px)] text-center focus:outline-none focus:border-[var(--blue)] focus:border-2"
        name=""
        id="concrete-composition"
      >
        <option
          disabled
          selected
          value
        >
          {{ $t('modals.Select-concrete-composition') }}
        </option>
        <option
          v-for="compostion in concreteCompositions"
          :key="compostion.id"
          :value="compostion.id"
        >
          {{ compostion.brand }}
        </option>
      </select>
      <label
        class="cursor-pointer mt-4"
        for="area-name"
      >
        {{ $t('modals.Name') }}
      </label>
      <input
        @focus="invalidName = false"
        v-model="areaToEdit.name"
        :class="
          invalidName
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="area-name"
      />
      <label
        class="cursor-pointer mt-4"
        for="area-description"
      >
        {{ $t('modals.Description') }}
      </label>
      <textarea
        @focus="invalidDescription = false"
        v-model="areaToEdit.description"
        rows="3"
        :class="
          invalidDescription
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="area-description"
      />
      <label
        class="cursor-pointer mt-4"
        for="fill-time"
      >
        {{ $t('modals.Fill-time') }}
      </label>
      <input
        @focus="invalidFill = false"
        v-model="areaToEdit.filling_time"
        :class="
          invalidFill
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="datetime-local"
        id="fill-time"
      />
      <Vbutton
        @click.once="validateEditAreaInputs()"
        class="mt-8 mb-4 w-fit self-center"
        :buttonText="$t('buttons.Edit-area')"
      />
    </div>
  </section>
</template>

<style scoped></style>
