<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { concreteRequest } from '@/api/concrete'
import VButton from '@/components/Vbutton.vue'

const emits = defineEmits(['close', 'addNewComposition'])
const route = useRoute()
const concretes = ref([])
const invalidConcrete = ref(false)
const invalidName = ref(false)
const invalidDescription = ref(false)
const invalidParamA = ref(false)
const invalidParamB = ref(false)

const newConcreteComposition = ref({
  concrete_id: '',
  company_id: route.params.company_id,
  name: '',
  description: '',
  parameter_a: '',
  parameter_b: ''
})

const validateCreateCompositionInputs = () => {
  if (newConcreteComposition.value.concrete_id === '') {
    invalidConcrete.value = true
  }
  if (newConcreteComposition.value.name === '') {
    invalidName.value = true
  }
  if (newConcreteComposition.value.description === '') {
    invalidDescription.value = true
  }
  if (newConcreteComposition.value.parameter_a === '') {
    invalidParamA.value = true
  }
  if (newConcreteComposition.value.parameter_b === '') {
    invalidParamB.value = true
  }
  if (
    invalidConcrete.value === true ||
    invalidName.value === true ||
    invalidDescription.value === true ||
    invalidParamA.value === true ||
    invalidParamB.value === true
  ) {
    return
  } else {
    emits('addNewComposition', newConcreteComposition.value)
    emits('close')
  }
}
const fetchConcretes = async () => {
  const response = await concreteRequest.getAll()
  concretes.value = response.data.list
}
fetchConcretes()
</script>

<template>
  <section
    @click="emits('close')"
    class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-10"
  >
    <div
      @click.stop
      class="flex flex-col w-72 sm:w-96 bg-white rounded-xl m-auto mt-[5vh] p-4"
    >
      <img
        @click="emits('close')"
        class="self-end cursor-pointer"
        src="@/assets/Carbon-icons/close.svg"
      />
      <h2 class="text-xl font-bold text-center">
        {{ $t('modals.Add-concrete-composition') }}
      </h2>
      <!-- concrete id -->
      <label
        for="concrete-id"
        class="cursor-pointer mt-4 mb-3"
      >
        {{ $t('modals.Select-concrete') }}
      </label>
      <select
        @focus="invalidConcrete = false"
        :class="
          invalidConcrete
            ? 'bg-pink-100 border-2 border-red-500 border-opacity-100'
            : ''
        "
        v-model="newConcreteComposition.concrete_id"
        class="border border-solid border-black rounded border-opacity-40 h-10 min-w-[calc(100%-200px)] text-center focus:outline-none focus:border-[var(--blue)] focus:border-2"
        id="concrete-id"
      >
        <option
          disabled
          selected
          value
        >
          {{ $t('modals.Select-concrete-type') }}
        </option>
        <option
          v-for="concrete in concretes"
          :key="concrete.id"
          :value="concrete.id"
        >
          {{ concrete.brand }}
        </option>
      </select>
      <!-- name -->
      <label
        for="concrete-name"
        class="cursor-pointer mt-4"
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
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        v-model="newConcreteComposition.name"
        name=""
        type="text"
        id="concrete-name"
      />
      <!-- description -->
      <label
        for="concrete-description"
        class="cursor-pointer mt-4"
      >
        {{ $t('modals.Description') }}
      </label>
      <input
        @focus="invalidDescription = false"
        :class="
          invalidDescription
            ? 'bg-pink-100 border-2 border-red-500 border-opacity-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        v-model="newConcreteComposition.description"
        type="text"
        id="concrete-description"
      />
      <!-- param a -->
      <label
        for="param-a"
        class="cursor-pointer mt-4"
      >
        {{ $t('modals.Parameter-a') }}
      </label>
      <input
        @focus="invalidParamA = false"
        :class="
          invalidParamA
            ? 'bg-pink-100 border-2 border-red-500 border-opacity-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        v-model="newConcreteComposition.parameter_a"
        type="number"
        id="param-a"
      />
      <!-- param b -->
      <label
        for="param-b"
        class="cursor-pointer mt-4"
      >
        {{ $t('modals.Parameter-b') }}
      </label>
      <input
        @focus="invalidParamB = false"
        :class="
          invalidParamB
            ? 'bg-pink-100 border-2 border-red-500 border-opacity-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        v-model="newConcreteComposition.parameter_b"
        type="number"
        id
        param-b
      />
      <VButton
        @click="validateCreateCompositionInputs()"
        class="mt-8 mb-4 w-fit self-center"
        :buttonText="$t('buttons.Add-composition')"
      />
    </div>
  </section>
</template>

<style scoped></style>
