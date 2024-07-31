<script setup>
import { ref, onMounted } from 'vue'
import { projectRequest } from '@/api/project'
import Vbutton from '@/components/Vbutton.vue'

const props = defineProps(['project'])
const emits = defineEmits(['close', 'refreshProjects'])
const nameInput = ref()
const editedProject = ref(props.project)
onMounted(() => {
  nameInput.value.focus()
})
const invalidName = ref(false)

const validateEditProjectInputs = () => {
  if (editedProject.value.name === '') invalidName.value = true
  if (invalidName.value) return
  else editProject()
}

const editProject = async () => {
  await projectRequest.update(props.project.id, editedProject.value)
  emits('close')
  emits('refreshProjects')
}
</script>

<template>
  <section
    @click="emits('close')"
    class="fixed top-0 left-0 z-10 flex justify-center items-center w-screen h-screen bg-black bg-opacity-80"
  >
    <div
      @click.stop
      class="flex flex-col w-72 h-fit sm:w-96 bg-white rounded-xl p-4"
    >
      <img
        @click="emits('close')"
        class="self-end cursor-pointer"
        src="@/assets/Carbon-icons/close.svg"
      />
      <h2 class="text-center text-xl font-bold pb-4">
        {{ $t('modals.Edit-project') }}
      </h2>
      <label
        class="text-xl"
        for="name"
      >
        {{ $t('modals.Project-name') }}
      </label>
      <input
        ref="nameInput"
        @focus="invalidName = false"
        :class="
          invalidName
            ? 'border-2 border-red-500 border-opacity-100 bg-pink-100'
            : ''
        "
        class="border border-black border-opacity-50 rounded pl-4 mt-2 h-10 focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        id="name"
        v-model="editedProject.name"
      />
      <Vbutton
        @click.once="validateEditProjectInputs()"
        class="self-center mt-8"
        :buttonText="$t('buttons.Edit-project')"
      />
    </div>
  </section>
</template>

<style scoped></style>
