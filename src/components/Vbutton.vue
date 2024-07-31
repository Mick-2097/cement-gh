<script setup>
const props = defineProps({
  buttonText: String
})
</script>

<template>
  <button
    class="text-white text-base font-bold min-w-fit min-h-10 h-fit bg-[var(--blue)] px-3 rounded cursor-pointer"
  >
    {{ buttonText }}
  </button>
</template>

<style scoped></style>
