<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import VBuildingObjectList from '@/components/reports/VBuildingObjectList.vue'
import VSearchSelect from '@/components/reports/VSearchSelect.vue'
import VReportsList from '@/components/reports/VReportsList.vue'
import VTemperatureListReport from '@/components/reports/reportsForms/VTemperatureListReport.vue'

const i18n = useI18n()
const route = useRoute()
const selectedReport = ref(i18n.t('reports.Select-report'))
</script>

<template>
  <div class="flex flex-col w-full p-0 xsm:p-4 pt-8 gap-8 items-center">
    <div class="flex flex-col w-full gap-[30px] lg:flex-row">
      <VBuildingObjectList />

      <div class="flex flex-col lg:flex-row gap-6">
        <div class="flex flex-col grow items-center gap-6">
          <VSearchSelect v-if="route.params.building_object_id" />
          <select
            v-if="route.params.area_id"
            v-model="selectedReport"
            class="h-10 w-full px-8 shadow-lg focus:outline-none focus:border focus:border-[var(--blue)]"
            name="reports"
            id="report"
          >
            <option
              class="text-center"
              disabled
              selected
            >
              <!-- -- select report -->
              {{ $t('reports.Select-report') }}
            </option>
            <option value="temperature-list">
              {{ $t('reports.Temperature-list') }}
            </option>
          </select>
          <VReportsList v-if="route.params.area_id" />
        </div>
        <transition
          name="modal"
          mode="out-in"
        >
          <VTemperatureListReport
            @close="selectedReport = $t('reports.Select-report')"
            v-if="selectedReport === 'temperature-list'"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
