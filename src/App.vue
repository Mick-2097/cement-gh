<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRoute, useRouter, RouterView } from 'vue-router'
import { errorStore } from '@/stores/error'
import { paramStore } from '@/stores/params'
import { projectRequest } from '@/api/project'
import { objectRequest } from '@/api/buildingObject'
import { buildingRequest } from '@/api/building'
import ErrorPopUp from '@/components/modals/ErrorPopUp.vue'
import Vheader from '@/components/Vheader.vue'
import VSideMenu from '@/components/VSideMenu.vue'

const params = paramStore()
const route = useRoute()
const error = errorStore()
const menuKey = ref(0)
const renderAppComponents = ref(false)

if (route.name !== 'projects' && route.name !== 'create') {
  setTimeout(() => {
    renderAppComponents.value = true
  }, 200)
}

watch(
  () => route.name,
  () => {
    if (route.name !== 'projects' && route.name !== 'create') {
      setTimeout(() => {
        renderAppComponents.value = true
      }, 200)
      return
    }
    renderAppComponents.value = false
  }
)

onBeforeMount(async () => {
  if (route.params.project_id) {
    const response = await projectRequest.get(route.params.project_id)
    params.selectedProjectName = response.data.name
  }
  if (route.params.building_object_id && !route.params.building_id) {
    const response = await objectRequest.get(route.params.building_object_id)
    params.selectedBuildingName = response.data.name
  }
  if (route.params.building_id) {
    const response = await buildingRequest.get(route.params.building_id)
    params.selectedBuildingName = response.data.name
  }
})
</script>

<template>
  <Vheader @returnToProjects="renderAppComponents = false" />

  <div class="flex-col xsm:px-4 min-h-[calc(100vh-68px)]">
    <Transition
      name="fade"
      mode="out-in"
    >
      <h1
        v-if="route.name !== 'projects' && renderAppComponents"
        class="text-2xl px-4 pt-4 cursor-default"
      >
        {{ params.selectedProjectName }}
      </h1>
    </Transition>

    <div class="flex flex-col md:flex-row w-full min-h-[calc(100vh-68px)]">
      <transition
        name="fade"
        mode="out-in"
      >
        <VSideMenu
          v-if="renderAppComponents"
          :key="menuKey"
        />
      </transition>

      <RouterView
        v-slot="{ Component }"
        class="bg-[var(--bg)] w-full py-4 xsm:px-4 lg:flex-col"
      >
        <transition
          name="fade"
          mode="out-in"
        >
          <component
            :is="Component"
            @refreshSideMenu="menuKey++"
          />
        </transition>
      </RouterView>
      <ErrorPopUp
        v-if="error.isError"
        @close="error.isError = false"
      />
    </div>
  </div>
</template>

<style scoped></style>
