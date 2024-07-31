<script setup>
import { ref } from 'vue'
import { compositionRequest } from '@/api/compositions'
import Vbutton from '@/components/Vbutton.vue'
import VCompositionsTable from '@/components/concreteCompositions/VCompositionsTable.vue'
import VModalAddComposition from '@/components/modals/VModalAddComposition.vue'

const showAddcompositionModal = ref(false)
const tableKey = ref(0)

const createConcreteComposition = async (newConcreteComposition) => {
  await compositionRequest.create(newConcreteComposition)
  tableKey.value++
}
</script>

<template>
  <section
    class="p-4 flex flex-col items-center min-h-[calc(100vh-68px)] bg-[var(--bg)]"
  >
    <div
      class="wrapper w-full max-w-[1076px] h-[80px] flex items-center justify-between"
    >
      <div class="flex flex-col sm:flex-row sm:gap-20">
        <h1 class="text-lg sm:text-2xl md:text-4xl">
          {{ $t('concreteCompositions.Concrete-compositions') }}
        </h1>
      </div>
      <Vbutton
        @click="showAddcompositionModal = true"
        :buttonText="$t('buttons.Create-new')"
      />
    </div>

    <div class="flex w-full pb-4 mt-8 bg-white shadow-lg">
      <VCompositionsTable
        :key="tableKey"
        @refreshTable="tableKey++"
      />
    </div>
    <Transition name="modal">
      <VModalAddComposition
        v-if="showAddcompositionModal"
        @close="showAddcompositionModal = false"
        @addNewComposition="createConcreteComposition()"
      />
    </Transition>
  </section>
</template>

<style scoped></style>
