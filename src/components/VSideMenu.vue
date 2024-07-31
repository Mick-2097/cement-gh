<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import VTreeMenu from '@/components/VTreeMenu.vue'
import docsIcon from '@/assets/Carbon-icons/Info_and_docs.svg'
import sensorIcon from '@/assets/Carbon-icons/sensor.svg'
import cementTruckIcon from '@/assets/Carbon-icons/cement.svg'

const i18n = useI18n()
const route = useRoute()
const router = useRouter()
const treeMenuKey = ref(0)
const pagesList = computed(() => [
  {
    routeName: ['reports', 'reportsobject', 'reportsarea'],
    text: i18n.t('sideMenu.Reports'),
    icon: docsIcon
  },
  {
    routeName: ['sensors', 'sensorsbuildingobject', 'sensorssensorid'],
    text: i18n.t('sideMenu.Sensors'),
    icon: sensorIcon
  },
  {
    routeName: ['compositions'],
    text: i18n.t('sideMenu.Concrete-composition'),
    icon: cementTruckIcon
  }
])

const goToPage = (routeName) => {
  router.push({
    name: routeName
  })
}
</script>

<template>
  <section class="flex flex-col p-4 gap-5 min-w-[300px]">
    <!-- pages list card -->

    <ul
      class="list-none py-2 flex flex-col bg-white border-b border-black border-opacity-20 rounded-xl shadow-lg"
    >
      <li
        @click="goToPage(page.routeName[0])"
        :class="
          page.routeName.includes(route.name) ? 'bg-[var(--blue-focus)]' : ''
        "
        class="flex px-4 py-2 gap-2 text-start cursor-pointer hover:bg-[var(--blue-focus)] items-center focus:bg-[var(--blue-focus)]"
        v-for="(page, index) in pagesList"
        :key="index"
      >
        <div class="h-6 w-6">
          <img
            :src="page.icon"
            alt="document icon"
          />
        </div>
        {{ page.text }}
      </li>
    </ul>

    <!-- building object tree card -->
    <VTreeMenu
      :key="treeMenuKey"
      @refreshTreeMenu="treeMenuKey++"
    />
  </section>
</template>

<style scoped></style>
