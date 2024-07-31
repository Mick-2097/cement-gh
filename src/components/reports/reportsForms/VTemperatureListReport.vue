<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { mainApi } from '@/api/main'
import Vbutton from '@/components/Vbutton.vue'

const emits = defineEmits(['close'])
const route = useRoute()
const newDocument = ref({
  area_id: +route.params.area_id,
  performer: '',
  heating_type: '',
  heating_start: '',
  heating_start_temperature: '',
  heating_end: '',
  heating_end_temperature: '',
  theoretical_strength: '',
  samples_age: '',
  samples_strength: '',
  sketch_number: ''
})

const postNewDocument = async () => {
  emits('close')
  await mainApi.post('documents', newDocument.value)
}
</script>

<template>
  <section
    class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 z-10 overflow-scroll"
  >
    <div
      class="flex flex-col min-w-[280px] max-w-[600px] gap-2 justify-between bg-white border rounded-xl p-6 shadow-lg m-auto mt-[5vh]"
    >
      <img
        @click="emits('close')"
        class="self-end cursor-pointer"
        src="@/assets/Carbon-icons/close.svg"
      />
      <h3 class="text-center font-bold text-xl py-2">
        {{ $t('reports.Temperature-list') }}
      </h3>
      <div class="flex justify-between flex-wrap items-center">
        <label
          class="min-w-[230px] pb-2"
          for="producer-name"
        >
          {{ $t('reports-Temperature-list.Work-producer') }}
        </label>
        <input
          v-model="newDocument.performer"
          class="border border-black border-opacity-30 px-2 min-w-[230px] flex-grow max-w-[600px] h-10 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="text"
          id="producer-name"
        />
      </div>
      <div class="flex justify-between flex-wrap items-center">
        <label
          class="min-w-[230px] pb-2"
          for="warm-up-type"
        >
          {{ $t('reports-Temperature-list.Warm-up-type') }}
        </label>
        <input
          v-model="newDocument.heating_type"
          class="border border-black border-opacity-30 px-2 min-w-[230px] flex-grow max-w-[600px] h-10 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="text"
          id="warm-up-type"
        />
      </div>
      <div class="flex justify-between flex-wrap items-center">
        <label
          class="min-w-[230px] pb-2"
          for="start-date"
        >
          {{ $t('reports-Temperature-list.Warm-up-start-date') }}
        </label>
        <input
          v-model="newDocument.heating_start"
          class="border border-black border-opacity-30 px-2 min-w-[230px] flex-grow max-w-[600px] h-10 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="datetime-local"
          id="start-date"
        />
      </div>
      <div class="flex justify-between flex-wrap items-center">
        <label
          class="min-w-[230px] pb-2"
          for="end-date"
        >
          {{ $t('reports-Temperature-list.Warm-up-end-date') }}
        </label>
        <input
          v-model="newDocument.heating_end"
          class="border border-black border-opacity-30 px-2 min-w-[230px] flex-grow max-w-[600px] h-10 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="datetime-local"
          id="end-date"
        />
      </div>
      <div class="flex justify-between flex-wrap items-center">
        <label
          class="min-w-[230px] pb-2"
          for="start-temperature"
        >
          {{ $t('reports-Temperature-list.Start-temperature') }}
        </label>
        <input
          v-model="newDocument.heating_start_temperature"
          class="border border-black border-opacity-30 px-2 min-w-[230px] flex-grow max-w-[600px] h-10 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="number"
          id="start-temperature"
          step="0.05"
        />
      </div>
      <div class="flex justify-between flex-wrap items-center">
        <label
          class="min-w-[230px] pb-2"
          for="end-warm-up-temperature"
        >
          {{ $t('reports-Temperature-list.End-warm-up-temperature') }}
        </label>
        <input
          v-model="newDocument.heating_end_temperature"
          class="border border-black border-opacity-30 px-2 min-w-[230px] flex-grow max-w-[600px] h-10 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="number"
          id="end-warm-up-temperature"
          step="0.05"
        />
      </div>
      <div class="flex justify-between flex-wrap items-center">
        <label
          class="min-w-[230px] pb-2"
          for="strength-percent"
        >
          {{ $t('reports-Temperature-list.Theoretical-strength') }}
        </label>
        <input
          v-model="newDocument.theoretical_strength"
          class="border border-black border-opacity-30 px-2 min-w-[230px] flex-grow max-w-[600px] h-10 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="number"
          id="strength-percent"
          step="0.05"
          min="0"
          max="100"
        />
      </div>
      <div class="flex justify-between flex-wrap items-center">
        <label
          class="min-w-[230px] pb-2"
          for="sample-age"
        >
          {{ $t('reports-Temperature-list.Age-of-samples-days') }}
        </label>
        <input
          v-model="newDocument.samples_age"
          class="border border-black border-opacity-30 px-2 min-w-[230px] flex-grow max-w-[600px] h-10 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="number"
          id="sample-age"
        />
      </div>
      <div class="flex justify-between flex-wrap items-center">
        <label
          class="min-w-[230px] pb-2"
          for="sample-strength"
        >
          {{ $t('reports-Temperature-list.Strength-of-samples') }}
        </label>
        <input
          v-model="newDocument.samples_strength"
          class="border border-black border-opacity-30 px-2 min-w-[230px] flex-grow max-w-[600px] h-10 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="number"
          id="sample-strength"
          step="0.05"
          min="0"
          max="100"
        />
      </div>
      <Vbutton
        @click.once="postNewDocument()"
        class="w-fit self-center mt-4"
        buttonText="Create document"
      />
    </div>
  </section>
</template>

<style scoped></style>
