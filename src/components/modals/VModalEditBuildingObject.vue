<script setup>
import { ref, onBeforeMount } from 'vue'
import { objectRequest } from '@/api/buildingObject'
import { useRoute } from 'vue-router'
import Vbutton from '@/components/Vbutton.vue'

const emits = defineEmits(['close', 'objectEdited'])
const props = defineProps(['buildingObjectID'])
const route = useRoute()
const newObject = ref({})
const buildingObjectDataReady = ref(false)
const invalidName = ref(false)
const invalidDescription = ref(false)

const validateEditObjectInputs = () => {
  if (newObject.value.name === '') invalidName.value = true
  if (newObject.value.description === '') invalidDescription.value = true
  if (invalidName.value || invalidDescription.value) return
  else editObject()
}

const editObject = async () => {
  await objectRequest.update(route.params.building_object_id, newObject.value)
  emits('objectEdited')
}
onBeforeMount(async () => {
  const response = await objectRequest.get(props.buildingObjectID)
  newObject.value = response.data
  buildingObjectDataReady.value = true
})
</script>

<template>
  <section
    @click="emits('close')"
    class="fixed top-0 left-0 z-10 flex justify-center items-center w-screen h-screen bg-black bg-opacity-80"
  >
    <Transition name="scale">
      <div
        v-if="buildingObjectDataReady"
        @click.stop
        class="flex flex-col w-72 sm:w-96 bg-white rounded-xl p-4 gap-2 z-10"
      >
        <img
          @click="emits('close')"
          class="self-end cursor-pointer text-base"
          src="@/assets/Carbon-icons/close.svg"
        />
        <h2 class="text-xl font-bold text-center">
          {{ $t('modals.Edit-building-object') }}
        </h2>
        <label
          for="object-name"
          class="cursor-pointer"
        >
          {{ $t('modals.Name') }}
        </label>
        <input
          @focus="invalidName = false"
          v-model="newObject.name"
          type="text"
          id="object-name"
          :class="
            invalidName
              ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
              : ''
          "
          class="border border-black border-opacity-50 rounded mt-2 h-10 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        />
        <label
          for="object-descriptiion"
          class="cursor-pointer"
        >
          {{ $t('modals.Description') }}
        </label>
        <textarea
          @focus="invalidDescription = false"
          v-model="newObject.description"
          rows="3"
          type="text"
          id="object-descriptiion"
          :class="
            invalidDescription
              ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
              : ''
          "
          class="border border-black border-opacity-50 rounded mt-2 px-2 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        />
        <Vbutton
          @click.once="validateEditObjectInputs()"
          :buttonText="$t('buttons.Edit-object')"
          class="w-1/2 self-center mt-4"
        />
      </div>
    </Transition>
  </section>
</template>

<style scoped></style>
