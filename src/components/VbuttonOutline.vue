<script setup>
const props = defineProps({
  buttonText: String,
  textColor: {
    type: String,
    default:
      'text-[var(--blue)] hover:text-white hover:bg-[var(--blue)] transition duration-500'
  },
  borderColor: {
    type: String,
    default: 'border-[var(--blue)]'
  }
})
</script>

<template>
  <button
    :class="[textColor, borderColor]"
    class="cursor-pointer font-base font-bold h-10 bg-transparent border-2 rounded min-w-[120px]"
  >
    {{ buttonText }}
  </button>
</template>

<style scoped></style>
