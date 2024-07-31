<script setup>
import { onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguage } from '@/stores/language'

const i18n = useI18n()
const language = useLanguage()
onBeforeMount(() => {
  if (language.selectedLanguage.value !== '') {
    i18n.locale.value = language.selectedLanguage
  }
})
</script>

<template>
  <div>
    <select
      @change="language.selectedLanguage = i18n.locale.value"
      v-model="$i18n.locale"
      class="pl-4 focus:outline-none focus:border-[var(--blue)] focus:border-2 focus:rounded border-2 border-black border-opacity-15 rounded"
    >
      <option
        disabled
        selected
        value
      >
        {{ $t('Language') }}
      </option>
      <option
        v-for="locale in $i18n.availableLocales"
        :key="`locale-${locale}`"
        :value="locale"
      >
        {{ locale }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
