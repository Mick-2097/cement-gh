<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { mainApi } from '@/api/main'
import { projectRequest } from '@/api/project'
import Vbutton from '@/components/Vbutton.vue'

const router = useRouter()
const companies = ref([])
const isSmallScreen = ref(false)
const watchScreenWidth = () => {
  isSmallScreen.value = window.innerWidth < 801
}
const newProject = ref({
  company_id: '',
  name: ''
})

const createProject = async () => {
  await projectRequest.create(newProject.value)

  router.push({
    name: 'projects'
  })
}
onMounted(async () => {
  companies.value = await mainApi.get('companies')
  window.addEventListener('resize', watchScreenWidth)
  isSmallScreen.value = window.innerWidth < 801
})
</script>

<template>
  <div>
    <main
      class="flex flex-col items-center w-full bg-[var(--bg)] min-h-[calc(100vh-68px)]"
    >
      <div class="flex w-[1078px] max-w-[90%]">
        <h1 class="font-normal text-4xl wrap-balance mt-12 mb-2.5">
          {{ $t('createProject.Create-a-new-project') }}
        </h1>
      </div>
      <div class="shadow-lg bg-white rounded-xl p-4 w-[1078px] max-w-[90%]">
        <div class="flex w-full items-center mb-2.5 flex-wrap">
          <label
            class="cursor-pointer w-[200px] min-w-fit mb-[10px]"
            for="organisation"
          >
            {{ $t('createProject.Organisation') }}
          </label>
          <select
            v-model="newProject.company_id"
            id="organisation"
            class="border border-solid border-black rounded border-opacity-40 h-10 min-w-[calc(100%-200px)] text-center"
          >
            <option
              disabled
              selected
              value
            >
              <!-- -- select organisation -- -->
              {{ $t('createProject.Select-organisation') }}
            </option>
            <option
              v-for="company in companies.data"
              :key="company.id"
              :value="company.id"
              class="h-10"
            >
              {{ company.name }} {{ company.id }}
            </option>
          </select>
        </div>
        <div class="flex w-full items-center mb-2.5 flex-wrap">
          <label
            class="cursor-pointer w-[200px] min-w-fit mb-[10px]"
            for="project-name"
            >{{ $t('createProject.Project-name') }}</label
          >
          <input
            class="h-10 text-base px-4 self-center border border-solid border-black rounded border-opacity-40 min-w-[calc(100%-200px)]"
            type="text"
            id="project-name"
            v-model="newProject.name"
          />
        </div>
        <div class="flex pt-2 w-full justify-center gap-2">
          <Vbutton
            @click="createProject(companyID, projectName)"
            :buttonText="$t('buttons.Create-project')"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
