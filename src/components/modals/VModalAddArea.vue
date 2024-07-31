<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { areaRequest } from '@/api/area'
import { concreteRequest } from '@/api/concrete'
import Vbutton from '@/components/Vbutton.vue'

const emits = defineEmits(['close'])
const route = useRoute()
const concreteCompositions = ref([])
const invalidID = ref(false)
const invalidName = ref(false)
const invalidDescription = ref(false)
const invalidFill = ref(false)

const newArea = ref({
  building_object_id: route.params.building_object_id,
  concrete_composition_id: '',
  name: '',
  description: '',
  filling_time: ''
})
const getConcreteCompositions = async () => {
  const response = await concreteRequest.getAll(+route.params.company_id)
  concreteCompositions.value = response.data.list
}
getConcreteCompositions()

const validateAddAreaInputs = () => {
  if (newArea.value.concrete_composition_id === '') {
    invalidID.value = true
  }
  if (newArea.value.name === '') {
    invalidName.value = true
  }
  if (newArea.value.description === '') {
    invalidDescription.value = true
  }
  if (newArea.value.filling_time === '') {
    invalidFill.value = true
  }
  if (
    invalidID.value === true ||
    invalidName.value === true ||
    invalidDescription.value === true ||
    invalidFill.value === true
  ) {
    return
  } else {
    addArea()
  }
}
const addArea = async () => {
  await areaRequest.create(newArea.value)
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
      class="flex flex-col w-72 sm:w-96 bg-white rounded-xl p-4"
    >
      <img
        @click="emits('close')"
        class="self-end cursor-pointer"
        src="@/assets/Carbon-icons/close.svg"
      />
      <h2 class="text-xl font-bold text-center">
        {{ $t('modals.Add-area') }}
      </h2>
      <!-- Composition -->
      <label
        class="cursor-pointer mt-4 mb-3"
        for="concrete-composition"
      >
        {{ $t('modals.Concrete-compostition') }}
      </label>
      <select
        @focus="invalidID = false"
        :class="
          invalidID
            ? 'bg-pink-100 border-2 border-red-500 border-opacity-100'
            : ''
        "
        v-model="newArea.concrete_composition_id"
        class="border border-black rounded border-opacity-40 h-10 min-w-[calc(100%-200px)] text-center focus:outline-none focus:border-[var(--blue)] focus:border-2"
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
          {{ compostion.name }}
        </option>
      </select>
      <!-- Name -->
      <label
        class="cursor-pointer mt-4"
        for="area-name"
      >
        {{ $t('modals.Name') }}
      </label>
      <input
        @focus="invalidName = false"
        :class="
          invalidName
            ? 'bg-pink-100 border-2 border-red-500 border-opacity-100'
            : ''
        "
        v-model="newArea.name"
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="area-name"
      />
      <!-- Description -->
      <label
        class="cursor-pointer mt-4"
        for="area-description"
      >
        {{ $t('modals.Description') }}
      </label>
      <textarea
        @focus="invalidDescription = false"
        :class="
          invalidDescription
            ? 'bg-pink-100 border-2 border-red-500 border-opacity-100'
            : ''
        "
        v-model="newArea.description"
        rows="3"
        class="border border-black border-opacity-50 rounded mt-2 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="area-description"
      />
      <!-- Fill time -->
      <label
        class="cursor-pointer mt-4"
        for="fill-time"
      >
        {{ $t('modals.Fill-time') }}
      </label>
      <input
        @focus="invalidFill = false"
        :class="
          invalidFill
            ? 'bg-pink-100 border-2 border-red-500 border-opacity-100'
            : ''
        "
        v-model="newArea.filling_time"
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="datetime-local"
        id="fill-time"
        tabindex="0"
      />

      <Vbutton
        @click.once="validateAddAreaInputs()"
        class="mt-8 mb-4 w-fit self-center"
        :buttonText="$t('modals.Add-area')"
      />
    </div>
  </section>
</template>

<style scoped></style>
