<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { objectRequest } from '@/api/buildingObject.js'
import { buildingRequest } from '@/api/building.js'
import { paramStore } from '@/stores/params.js'
import VSpinner from '@/components/VSpinner.vue'
import VBranch from '@/components/VBranch.vue'
import VModalAddBuildingObject from '@/components/modals/VModalAddBuildingObject.vue'

const emits = defineEmits(['refreshTreeMenu', 'setSelectedBuilding'])
const params = paramStore()
const route = useRoute()
const router = useRouter()
const buildingObjects = ref([])
const addObject = ref(false)
const objectsReady = ref(false)

const selectBuildingObject = (object) => {
  router.push({
    name: 'buildingobjectdata',
    params: {
      building_object_id: object.id
    }
  })
  setTimeout(() => {
    params.selectedBuildingName = object.name
  }, 200)
}
const fetchBuildings = async (objectID) => {
  const response = await buildingRequest.getAll(objectID)
  return response.data
}
const fetchBuildingObjects = async (projectID) => {
  const response = await objectRequest.getAll(projectID)
  params.buildingObjects.value = response.data.list
  for (let i = 0; i < response.data.list.length; i++) {
    response.data.list[i].buildings = await fetchBuildings(
      response.data.list[i].id
    )
  }
  buildingObjects.value = response.data.list
  objectsReady.value = true
}
const vFocus = {
  mounted(summary, binding) {
    if (
      route.name === 'sensorsbuildingobject' ||
      route.name === 'sensorssensorid'
    ) {
      return
    } else if (
      binding.value[1] === +route.params.building_object_id &&
      !route.path.includes('reports')
    ) {
      let details = summary.parentElement
      while (details.tagName !== 'DIV') {
        if (details.tagName === 'DETAILS') {
          details.open = true
        }
        details = details.parentElement
      }
      summary.focus()
    }
  }
}
onMounted(async () => {
  await fetchBuildingObjects(route.params.project_id)
})
</script>

<template>
  <div
    class="bg-white border-b border-black border-opacity-20 rounded-xl shadow-lg pb-2 overflow-x-auto"
  >
    <!-- building objects tree -->
    <div class="flex flex-col">
      <div class="flex p-2 border-b border-[#D9D9d9]">
        <h2 class="text-base text-normal text-center cursor-default mx-auto">
          {{ $t('sideMenu.All-buildings-on-the-map') }}
        </h2>
      </div>
      <VSpinner
        v-if="!objectsReady"
        class="self-center"
      />

      <ul
        v-else
        class="list-none"
      >
        <li
          v-for="object in buildingObjects"
          :key="object.id"
          tabindex="0"
        >
          <details
            class="flex w-full focus:bg-[var(--blue-focus)] focus:outline-none"
            tabindex="0"
          >
            <summary
              @click="selectBuildingObject(object)"
              :class="[
                !object.buildings.length ? `no-content` : ``,
                !route.path.includes('reports') &&
                !route.path.includes('sensors') &&
                route.path.includes(object.id) &&
                !route.params.building_id
                  ? 'bg-[var(--blue-focus)]'
                  : ''
              ]"
              class="relative pl-6 py-2 flex items-center text-base text-black text-opacity-70 font-bold tracking-wide cursor-pointer hover:bg-[var(--blue-focus)] focus:bg-[var(--blue-focus)] focus:outline-none before:absolute before:h-[18px] before:w-[18px] before:left-[4px] before:top-[10px] before:-rotate-90 before:transition-all before:duration-150 before:content-[url('../assets/Carbon-icons/Arrow-sm.svg')] justify-between"
              v-focus="[object.name, object.id]"
            >
              {{ object.name }}
            </summary>
            <VBranch :buildings="object.buildings" />
          </details>
        </li>
      </ul>
      <p
        @click="addObject = true"
        class="flex text-[var(--blue)] pl-2 pt-2 pb-4 text-xl border-t cursor-pointer"
        tabindex="0"
      >
        {{ $t('sideMenu.+Add') }}
      </p>
    </div>
  </div>
  <Transition name="modal">
    <VModalAddBuildingObject
      v-if="addObject"
      @close="addObject = false"
      @refreshTreeMenu="emits('refreshTreeMenu')"
    />
  </Transition>
</template>

<style scoped>
.no-content::before {
  content: '';
}

details[open] > summary::before {
  transform: rotate(0deg);
}
</style>
