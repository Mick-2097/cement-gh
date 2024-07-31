<script setup>
import VbuttonOutline from '@/components/VbuttonOutline.vue'
const emits = defineEmits(['delete', 'cancel'])
</script>

<template>
  <section
    @click="emits('cancel')"
    class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80"
  >
    <div
      @click.stop
      class="flex flex-col w-72 sm:w-96 m-auto mt-[30vh] items-center border border-white rounded-lg p-6 gap-4 bg-black"
    >
      <h1 class="text-white text-2xl text-center">
        {{ $t('modals.Are-you-sure?') }}
      </h1>
      <div class="flex gap-4">
        <VbuttonOutline
          @click="emits('delete')"
          textColor="text-red-500"
          borderColor="border-red-500"
          :buttonText="$t('buttons.Delete')"
          class="hover:text-white hover:bg-red-700 hover:border-white"
        />
        <VbuttonOutline
          @click="emits('cancel')"
          :buttonText="$t('buttons.Cancel')"
          class="hover:text-white hover:border-white hover:bg-[var(--blue)]"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
