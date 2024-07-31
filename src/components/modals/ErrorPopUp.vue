<script setup>
import { errorStore } from '@/stores/error'

const error = errorStore()
const emits = defineEmits(['close'])
const props = defineProps({
  errorMessage: {
    type: String,
    default: 'unknown error'
  }
})
</script>

<template>
  <section
    @click="emits('close')"
    class="fixed top-0 left-0 flex h-screen w-screen justify-center backdrop-blur-sm z-10"
  >
    <div
      @click.stop
      class="flex flex-col text-center min-w-[300px] w-fit max-w-[90%] border-2 p-2 bg-red-100 border-red-500 rounded self-center justify-self-center"
    >
      <img
        @click="emits('close')"
        class="self-end h-4 cursor-pointer"
        src="@/assets/Carbon-icons/close.svg"
        alt="close-button"
      />
      <p
        class="text-red-500 text-2xl -translate-y-4 font-bold w-fit self-center"
      >
        {{ $t('modals.Error') }}
      </p>
      <p class="font-bold wrap break-all">
        {{ error.errorMessage }}
      </p>
    </div>
  </section>
</template>

<style scoped></style>
