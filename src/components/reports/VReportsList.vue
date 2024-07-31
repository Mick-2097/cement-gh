<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { mainApi } from '@/api/main'
import VSpinner from '@/components/VSpinner.vue'

const route = useRoute()
const reports = ref([])
const reportsReady = ref(false)
const lastPage = ref(0)
const requestParams = computed(() => ({
  area_id: route.params.area_id,
  limit: 15,
  page: 1
}))

const fetchReports = async (increment = 0) => {
  reportsReady.value = false
  requestParams.value.page += increment
  const response = await mainApi.get(`documents`, requestParams.value)
  lastPage.value = response.data.lastPage
  reports.value = response.data.list
  reportsReady.value = true
}
fetchReports()

watch(
  () => route.params.area_id,
  () => {
    if (route.params.area_id) {
      fetchReports()
    }
  }
)
</script>

<template>
  <div
    v-if="reports.length"
    class="flex flex-col min-w-[300px] w-full rounded-xl bg-white shadow-lg h-fit"
  >
    <h3
      class="text-center font-bold border-b border-black border-opacity-20 w-full py-4"
    >
      Reports
    </h3>
    <ul class="flex flex-col relative">
      <VSpinner
        v-if="!reportsReady"
        class="absolute inset-0 flex items-center justify-center"
      />
      <li
        v-for="report in reports"
        :key="report.id"
        class="px-4 py-2 border-b border-black border-opacity-20"
      >
        <div
          class="flex flex-col text-center gap-4 items-center justify-between sm:flex-row sm:gap-4 sm:text-left"
        >
          <a
            class="flex-wrap text-sm underline-offset-4 hover:underline hover:text-blue-700 cursor-pointer text-balance"
            :href="report.link"
            target="_blank"
          >
            {{ report.name }}
          </a>
          <p class="min-w-fit cursor-default text-sm">
            {{ report.created_at }}
          </p>
        </div>
      </li>
    </ul>
    <div class="flex px-4 py-2 items-center justify-between">
      <img
        @click="fetchReports(-1)"
        v-if="requestParams.page > 1"
        class="rotate-90 h-6 border border-black cursor-pointer"
        src="@/assets/Carbon-icons/Arrow-sm.svg"
        alt="previous page"
      />
      <div
        v-else
        class="w-6"
      ></div>

      <img
        @click="fetchReports(1)"
        v-if="requestParams.page < lastPage"
        class="-rotate-90 h-6 border border-black cursor-pointer"
        src="@/assets/Carbon-icons/Arrow-sm.svg"
        alt="next page"
      />
      <div
        v-else
        class="w-6"
      ></div>
    </div>
  </div>
  <div
    v-else
    class="flex flex-col w-full min-w[300px] border rounded-xl bg-white p-4 shadow-lg"
  >
    <h3 class="text-center font-bold w-full py-4">
      {{ $t('reports.No-reports') }}
    </h3>
  </div>
</template>

<style scoped></style>
