<script setup>
import { ref } from 'vue'
import VBuildingObjectActions from '@/components/buildingObjectData/VBuildingObjectActions.vue'
import VAreas from '@/components/buildingObjectData/VAreas.vue'
import VChart from '@/components/Charts/VChart.vue'

const emits = defineEmits('refreshSideMenu')
const areaMenuKey = ref(0)
</script>

<template>
  <section class="flex p-4 w-full lg:flex-col">
    <div class="flex flex-col w-full gap-[30px] md:flex-row">
      <!-- Center menu -->
      <section class="gap-4 w-full flex flex-col">
        <VBuildingObjectActions
          @buildingsModified="emits('refreshSideMenu')"
          @areaAdded="areaMenuKey++"
        />
        <!-- Center menu and diagram area -->
        <div class="flex gap-8 mt-4 flex-col lg:flex-row">
          <!-- Areas -->
          <div class="flex flex-col gap-8">
            <VAreas
              :key="areaMenuKey"
              @refreshAreaMenu="areaMenuKey++"
            />
          </div>
          <VChart />
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped></style>
