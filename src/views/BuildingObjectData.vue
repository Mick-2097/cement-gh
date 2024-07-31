<script setup>
import { ref } from 'vue'
import VBuildingObjectActions from '@/components/buildingObjectData/VBuildingObjectActions.vue'
import VAreas from '@/components/buildingObjectData/VAreas.vue'

const emits = defineEmits(['refreshSideMenu'])
const areaMenuKey = ref(0)
</script>

<template>
  <section
    class="p-4 min-h-[calc(100vh-68px)] lg:flex-col lg:justify-center lg:items-center"
  >
    <div class="flex flex-col gap-[30px] md:flex-row">
      <!-- Center menu -->
      <section class="gap-4 w-full flex flex-col">
        <!-- Actions -->
        <VBuildingObjectActions
          @buildingsModified="emits('refreshSideMenu')"
          @areaAdded="areaMenuKey++"
        />
        <!-- Center menu and diagram area -->
        <div class="flex flex-col gap-5 mt-4 lg:flex-row">
          <!-- Areas -->
          <div class="flex flex-col gap-8">
            <VAreas
              :key="areaMenuKey"
              @refreshAreaMenu="areaMenuKey++"
            />
          </div>
          <!-- Diagram area -->
          <!-- <div
                    class="flex w-full items-center justify-center mt-10 lg:mt-0 border border-black border-opacity-20 rounded text-center h-fit">
                    <ul>
                      <li>
                        <div class="if-empty p-4 text-center h-fit">No drawings or diagrams have been added
                            yet
                        </div>
                      </li>
                    </ul>
                </div> -->
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped></style>
