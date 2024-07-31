<script setup>
import { ref, onMounted } from 'vue'
import { mainApi } from '@/api/main'
import { projectRequest } from '@/api/project'
import { paramStore } from '@/stores/params'
import VSpinner from '@/components/VSpinner.vue'
import VModalEditProject from '@/components/modals/VModalEditProject.vue'
import VAreYouSure from '@/components/modals/VAreYouSure.vue'

const emits = defineEmits(['refreshProjects', 'setProject'])
const params = paramStore()
const companies = ref([])
const projectsKey = ref(0)
const projectToEdit = ref({})
const dataReady = ref(false)
const openEditModal = ref(false)
const openAreYouSure = ref(false)
const indices = ref({
  projectId: 0
})

const fetchCompanies = async () => {
  const response = await mainApi.get('companies')
  for (let i = 0; i < response.data.length; i++) {
    response.data[i].projects = await fetchProjects(response.data[i].id)
  }
  companies.value = response.data
  dataReady.value = true
}

const fetchProjects = async (companyID) => {
  const response = await projectRequest.getAll(companyID)
  return response.data.list
}

const openEditProjectModal = (project) => {
  projectToEdit.value = project
  openEditModal.value = true
}
const deleteProject = async (companyIndex, projectID) => {
  openAreYouSure.value = false
  const response = await projectRequest.delete(projectID)
  if (response.status) {
    companies.value[companyIndex].projects = companies.value[
      companyIndex
    ].projects.filter((project) => project.id !== projectID)
  }
}
const areYouSure = (companyIndex, projectId) => {
  indices.value.companyIndex = companyIndex
  indices.value.projectId = projectId
  openAreYouSure.value = true
}
onMounted(() => {
  fetchCompanies()
})
</script>

<template>
  <VSpinner v-if="!dataReady" />
  <section
    v-if="dataReady"
    class="flex w-full max-w-[1076px] mb-[40px] bg-white py-2 px-4 rounded-xl shadow-lg"
    v-for="(company, companyIndex) in companies"
    :key="company.id"
  >
    <table
      class="w-full text-left h-fit border-collapse"
      :key="projectsKey"
    >
      <thead>
        <tr class="h-[60px] w-full">
          <th class="opacity-70">
            <span class="text-xl font-bold"> {{ company.name }}, </span>
            {{ $t('projects.Organisation') }}
          </th>
        </tr>
      </thead>
      <tbody class="pb-10">
        <tr class="sm:hidden block h-5"></tr>
        <tr
          v-for="(project, projectIndex) in company.projects"
          :key="project.id"
          class="h-10 hover:bg-[#bef6f2] cursor-pointer"
        >
          <td class="px-2">
            <RouterLink
              :to="{
                name: 'projectdata',
                params: {
                  company_id: company.id,
                  project_id: project.id
                }
              }"
            >
              <p
                @click="params.selectedProjectName = project.name"
                class="min-w-[50%] w-full h-full flex items-center"
              >
                {{ project.name }}
              </p>
            </RouterLink>
          </td>
          <td class="flex justify-end items-center h-full pr-2">
            <div class="flex shrink-0 my-2 gap-2">
              <img
                @click="openEditProjectModal(project)"
                class="align-center pl-4 hover:scale-125 h-5"
                src="@/assets/Carbon-icons/edit.svg"
                alt="edit"
                :title="$t('projects.Edit-project')"
              />
              <img
                @click="areYouSure(companyIndex, project.id)"
                class="cursor-pointer hover:scale-125 w-5 h-5"
                src="@/assets/Carbon-icons/delete.svg"
                alt="delete"
                :title="$t('projects.Delete-project')"
              />
            </div>
          </td>
          <!-- Hidden -->
          <td class="hidden date">
            02.03.2022 – 20.12.2023 (still
            <span>312 d.</span>)
          </td>
          <td class="hidden text-center">
            <p class="hidden w-fit py-0.5 px-1 bg-white rounded m-auto">159</p>
          </td>
          <td class="hidden text-center">
            <p
              class="hidden w-fit py-0.5 px-1 bg-white rounded m-auto border border-solid border-[var(--green)]"
            >
              15
            </p>
          </td>
          <td class="hidden text-center">
            <p
              class="hidden w-fit py-0.5 px-1 font-bold text-white bg-[var(--green)] rounded m-auto"
            >
              49
            </p>
          </td>
          <!-- Hidden -->
        </tr>
      </tbody>
    </table>
  </section>
  <!-- If there is no data -->
  <section
    v-if="!companies.length && dataReady"
    class="flex flex-col w-[394px] max-w-[90%] text-xl text-center gap-4 opacity-40 my-[100px] mx-auto"
  >
    <p>You don't have any projects yet.</p>
    <p>You can create a project or you can be added to a project.</p>
  </section>

  <Transition name="modal">
    <VModalEditProject
      v-if="openEditModal"
      @close="openEditModal = false"
      @refreshProjects="emits('refreshProjects')"
      :project="projectToEdit"
    />
  </Transition>

  <Transition name="modal">
    <VAreYouSure
      v-if="openAreYouSure"
      @cancel="openAreYouSure = false"
      @delete="deleteProject(indices.companyIndex, indices.projectId)"
    />
  </Transition>
</template>

<style scoped></style>
