<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Vbutton from '@/components/Vbutton.vue'
import VProjectList from '@/components/projects/VProjectList.vue'

const emits = defineEmits(['setProject'])
const projectsKey = ref(0)

const catchemits = (name) => {
  emits('setProject', name)
}
</script>

<template>
  <section
    class="p-4 flex flex-col items-center min-h-[calc(100vh-68px)] bg-[var(--bg)]"
  >
    <div
      class="wrapper w-full max-w-[1076px] h-[80px] flex items-center justify-between"
    >
      <div class="flex flex-col sm:flex-row sm:gap-20">
        <h1 class="text-2xl sm:text-4xl sm:text-normal">
          {{ $t('projects.Projects') }}
        </h1>
      </div>

      <RouterLink :to="{ name: 'create' }">
        <Vbutton :buttonText="$t('buttons.Create-new')" />
      </RouterLink>
    </div>
    <VProjectList
      :key="projectsKey"
      @refreshProjects="projectsKey++"
      @setProject="catchemits"
    />
  </section>
</template>

<style scoped></style>
