<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { objectRequest } from '@/api/buildingObject.js'
import Vbutton from '@/components/Vbutton.vue'

const emits = defineEmits(['close', 'refreshTreeMenu'])
const passed = defineProps(['props'])
const route = useRoute()
const newObject = ref({
  project_id: route.params.project_id,
  name: '',
  description: ''
})
const invalidName = ref(false)
const invalidDescription = ref(false)

const validateAddObjectInputs = () => {
  if (newObject.value.name === '') invalidName.value = true
  if (newObject.value.description === '') invalidDescription.value = true
  if (invalidName.value === true || invalidDescription.value === true) return
  else addObject()
}

const addObject = async () => {
  const response = await objectRequest.create(newObject.value)
  response.data.buildings = []
  emits('refreshTreeMenu')
  emits('close')
}
</script>

<template>
  <section
    @click="emits('close')"
    class="fixed top-0 left-0 z-10 w-screen h-screen bg-black bg-opacity-80"
  >
    <div
      @click.stop
      class="flex flex-col w-72 sm:w-96 bg-white rounded-xl m-auto mt-[10%] p-4 gap-2"
    >
      <img
        @click="emits('close')"
        class="self-end cursor-pointer text-base"
        src="@/assets/Carbon-icons/close.svg"
      />
      <h2 class="text-xl font-bold text-center">
        {{ $t('modals.Add-building-object') }}
      </h2>

      <label for="name">
        {{ $t('modals.Name') }}
      </label>
      <input
        @focus="invalidName = false"
        v-model="newObject.name"
        :class="
          invalidName
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="name"
        autocomplete="off"
      />
      <label for="description">
        {{ $t('modals.Description') }}
      </label>
      <textarea
        @focus="invalidDescription = false"
        v-model="newObject.description"
        rows="3"
        :class="
          invalidDescription
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded mt-2 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="description"
      />
      <Vbutton
        :buttonText="$t('buttons.Add-building-object')"
        class="mt-8 w-fit self-center"
        @click.once="validateAddObjectInputs()"
      />
    </div>
  </section>
</template>

<style scoped></style>
