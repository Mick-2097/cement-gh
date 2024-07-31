<script setup>
import { ref } from 'vue'
import VBuildingActions from '@/components/buildingData/VBuildingActions.vue'
import VSpots from '@/components/buildingData/VSpots.vue'

const emits = defineEmits(['refreshSideMenu'])
const spotsMenuKey = ref(0)
</script>

<template>
  <section
    class="p-4 w-full grow-0 lg:flex-col lg:justify-center lg:items-center"
  >
    <div class="flex flex-col gap-[30px] md:flex-row">
      <!-- Center menu -->
      <section class="gap-4 w-full flex flex-col">
        <VBuildingActions
          @buildingsModified="emits('refreshSideMenu')"
          @refreshSpots="spotsMenuKey++"
        />
        <!-- Center menu and diagram area -->
        <div class="flex gap-5 mt-4 flex-col lg:flex-row">
          <!-- Areas -->
          <div class="flex flex-col gap-8">
            <VSpots
              :key="spotsMenuKey"
              @refreshSpots="spotsMenuKey++"
            />
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped></style>
