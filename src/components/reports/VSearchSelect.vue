<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { areaRequest } from '@/api/area'
import VSpinner from '@/components/VSpinner.vue'

const route = useRoute()
const router = useRouter()
const areaArray = ref([])
const searchInputRef = ref(null)
const listItemRefs = ref([])
const showAreaList = ref(false)
const areasReady = ref(true)

const emptySearchObject = ref({
  building_object_id: +route.params.building_object_id,
  limit: '5'
})
const textSearchObject = ref({
  search: '',
  building_object_id: +route.params.building_object_id,
  limit: '5'
})

const fetchAreas = async () => {
  areasReady.value = false
  areaArray.value = []
  const response = await areaRequest.getLimited(emptySearchObject.value)
  areaArray.value = response.data.list
  if (!showAreaList.value) {
    searchInputRef.value.click()
  }
  areasReady.value = true
}
fetchAreas()

const searchAreas = async () => {
  if (textSearchObject.value.search !== '') {
    const response = await areaRequest.getLimited(textSearchObject.value)
    areasReady.value = true
    areaArray.value = response.data.list
    return
  }
  const response = await areaRequest.getLimited(emptySearchObject.value)
  areasReady.value = true
  areaArray.value = response.data.list
}
let timeout

const updateSearch = async () => {
  areasReady.value = false
  clearTimeout(timeout)
  timeout = setTimeout(searchAreas, 500)
}

const selectArea = (area) => {
  showAreaList.value = false
  router.push({
    name: 'reportsarea',
    params: { area_id: area.id }
  })
  textSearchObject.value.search = area.name
}

watch(
  () => route.params.building_object_id,
  async () => {
    if (route.params.building_object_id) {
      emptySearchObject.value.building_object_id =
        route.params.building_object_id
      fetchAreas()
    }
  }
)
</script>

<template>
  <div
    class="flex flex-col gap-2 p-2 rounded shadow-lg bg-white min-w-[300px] h-fit w-full"
  >
    <div class="relative">
      <input
        @input="updateSearch()"
        @click="showAreaList = !showAreaList"
        class="px-4 h-10 w-full border border-black border-opacity-20 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
        type="text"
        :placeholder="$t('reports.Search')"
        v-model="textSearchObject.search"
        ref="searchInputRef"
      />
      <div
        v-if="!areasReady"
        class="flex justify-center"
      >
        <VSpinner />
      </div>
      <ul
        v-else
        :class="showAreaList && areasReady ? 'scale-y-100' : 'scale-y-0'"
        class="absolute w-full bg-white border-b border-black border-opacity-20 rounded-b shadow-lg transition-all duration-300 origin-top ease-out"
      >
        <li
          v-if="areasReady && !areaArray.length"
          class="flex p-4 items-center h-10 justify-center"
        >
          {{ $t('reports.No-areas') }}
        </li>
        <li
          v-else
          v-for="(area, index) in areaArray"
          :key="index"
          :value="area"
          ref="listItemRefs"
          @click="selectArea(area)"
          class="flex p-4 items-center h-10 cursor-pointer hover:bg-[var(--blue-focus)]"
        >
          {{ area.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
