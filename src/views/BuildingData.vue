<script setup>
import { ref } from 'vue'
import VBuildingActions from '@/components/buildingData/VBuildingActions.vue'
import VSpots from '@/components/buildingData/VSpots.vue'

const emits = defineEmits(['refreshSideMenu'])
const spotsMenuKey = ref(0)
</script>

<template>
  <section
    class="p-4 min-h-[calc(100vh-68px)] lg:flex-col lg:justify-center lg:items-center"
  >
    <div class="flex flex-col gap-[30px] md:flex-row">
      <!-- Center menu -->
      <div class="gap-4 w-full flex flex-col">
        <!-- Actions -->
        <VBuildingActions
          @buildingsModified="emits('refreshSideMenu')"
          @refreshSpots="spotsMenuKey++"
        />
        <!-- Center menu and diagram area -->
        <div class="flex gap-5 mt-4 flex-col lg:flex-row">
          <!-- Monitoring spots -->
          <VSpots
            :key="spotsMenuKey"
            @refreshSpots="spotsMenuKey++"
          />
          <!-- Diagram area -->
          <div
            class="flex w-full min-h-fit items-center justify-center mt-10 lg:mt-0 border border-black border-opacity-20 rounded text-center"
          >
            <div class="if-empty p-4 text-center">
              {{
                $t('buildingData.No-drawings-or-diagrams-have-been-added-yet')
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
