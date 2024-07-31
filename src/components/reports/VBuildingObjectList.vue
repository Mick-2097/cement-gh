<script setup>
import { ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { objectRequest } from '@/api/buildingObject.js'

const route = useRoute()
const router = useRouter()
const buildingObjects = ref()
const listItemRefs = ref([])

const selectBuildingObject = (id) => {
  router.push({
    name: 'reportsobject',
    params: { building_object_id: id }
  })
}
const getBuildingObjects = async () => {
  const response = await objectRequest.getAll(route.params.project_id)
  buildingObjects.value = response.data.list

  await nextTick()
  if (listItemRefs.value.length) {
    listItemRefs.value[0].click()
  }
}
getBuildingObjects()
</script>

<template>
  <ul
    class="list-none flex flex-col h-fit min-w-[300px] bg-white border-b border-black border-opacity-20 rounded-xl shadow-lg"
  >
    <h2 class="font-bold text-center py-2">
      {{ $t('reports.Building-objects') }}
    </h2>
    <li
      ref="listItemRefs"
      @click="selectBuildingObject(object.id)"
      v-for="(object, index) in buildingObjects"
      :key="object.id"
      :class="route.path.includes(object.id) ? 'bg-[var(--blue-focus)]' : ''"
      class="flex items-center px-4 h-10 cursor-pointer focus:bg-[var(--blue-focus)]"
      tabindex="0"
    >
      {{ object.name }}
    </li>
  </ul>
</template>

<style scoped></style>
