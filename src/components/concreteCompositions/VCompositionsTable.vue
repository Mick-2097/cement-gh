<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { compositionRequest } from '@/api/compositions'
import VSpinner from '@/components/VSpinner.vue'
import VModalEditComposition from '@/components/modals/VModalEditComposition.vue'
import VAreYouSure from '@/components/modals/VAreYouSure.vue'

const emits = defineEmits(['refreshTable'])
const route = useRoute()
const compositionsList = ref([])
const selectedCompositionID = ref('')
const compositionsReady = ref(false)
const openEditCompositionModal = ref(false)
const openAreYouSure = ref(false)

const openEditModal = (id) => {
  selectedCompositionID.value = id
  openEditCompositionModal.value = true
}

const editComposition = async (editedConcreteComposition) => {
  await compositionRequest.update(
    selectedCompositionID.value,
    editedConcreteComposition
  )
  emits('refreshTable')
}

const deleteButtonClicked = (id) => {
  openAreYouSure.value = true
  selectedCompositionID.value = id
}

const deleteComposition = async () => {
  openAreYouSure.value = false
  await compositionRequest.delete(selectedCompositionID.value)
  emits('refreshTable')
}

const fetchCompositions = async () => {
  compositionsReady.value = false
  const response = await compositionRequest.getAll(route.params.company_id)
  compositionsList.value = response.data.list
  compositionsReady.value = true
}
fetchCompositions()
</script>

<template>
  <div class="flex flex-col w-full bg-[var(--bg)]">
    <div
      v-if="!compositionsReady"
      class="flex w-full justify-center bg-[var(--bg)]"
    >
      <VSpinner />
    </div>
    <table
      v-else
      class="w-full bg-white overflow-scroll"
    >
      <thead>
        <tr class="h-10 bg-blue-100">
          <th class="px-2">#</th>
          <th class="px-2">{{ $t('concreteCompositions.Name') }}</th>
          <th class="px-2">{{ $t('concreteCompositions.Brand') }}</th>
          <th class="px-2">{{ $t('concreteCompositions.Action') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="composition in compositionsList"
          :key="composition.id"
          class="h-10 cursor-default"
        >
          <td class="text-center">
            {{ composition.id }}
          </td>
          <td class="text-center">
            {{ composition.name }}
          </td>
          <td class="text-center">
            {{ composition.concrete.brand }}
          </td>
          <td class="">
            <div class="flex justify-center gap-2">
              <!-- Edit -->
              <img
                @click="openEditModal(composition.id)"
                class="cursor-pointer w-5 h-5 hover:scale-125"
                src="@/assets/Carbon-icons/edit.svg"
                alt="edit composition"
                :title="$t('concreteCompositions.Edit-composition')"
                tabindex="0"
              />
              <!-- Delete-->
              <img
                @click="deleteButtonClicked(composition.id)"
                class="cursor-pointer w-5 h-5 hover:scale-125"
                src="@/assets/Carbon-icons/delete.svg"
                alt="delete composition"
                :title="$t('concreteCompositions.Delete-composition')"
                tabindex="0"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Transition name="modal">
    <VModalEditComposition
      v-if="openEditCompositionModal"
      :compositionID="selectedCompositionID"
      @close="openEditCompositionModal = false"
      @editComposition="editComposition"
    />
  </Transition>
  <Transition name="modal">
    <VAreYouSure
      v-if="openAreYouSure"
      @cancel="openAreYouSure = false"
      @delete="deleteComposition()"
    />
  </Transition>
</template>

<style scoped></style>
