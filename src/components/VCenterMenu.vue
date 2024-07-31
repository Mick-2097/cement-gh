<script setup></script>

<template>
  <!-- Center menu of figma design -->

  <div class="flex flex-col py-2 px-4 bg-white rounded-xl shadow-xl">
    <h3 class="pb-2 text-center text-[#999]">Parent element</h3>

    <select
      class="w-full h-10 rounded text-base text-[#999] px-2"
      name=""
      id=""
    >
      <option value="no">no</option>
      <option value="yes">yes</option>
    </select>
  </div>
  <div class="flex flex-col py-2 px-4 bg-white rounded-xl shadow-xl">
    <h3 class="pb-2 text-center text-[#999]">Drawings and diagrams</h3>
    <hr />
    <ul>
      <li></li>
    </ul>
    <hr />
    <label
      class="cursor-pointer text-[var(--blue)] text-xl text-center pt-2"
      for="add-file"
    >
      + Add (jpg, png)
      <input
        class="hidden"
        type="file"
        name=""
        id="add-file"
      />
    </label>
  </div>
  <div class="flex flex-col py-2 px-4 bg-white rounded-xl shadow-xl">
    <h3 class="pb-2 text-center text-[#999]">Child elements</h3>
    <hr />
    <label
      class="cursor-pointer text-[var(--blue)] text-xl text-center pt-2"
      for=""
      >+ Add
    </label>
  </div>
  <div class="flex flex-col py-2 px-4 bg-white rounded-xl shadow-xl">
    <h3 class="pb-2 text-center text-[#999]">Monitoring points</h3>
    <hr />
    <label
      class="cursor-pointer text-[var(--blue)] text-xl text-center pt-2"
      for=""
      >+ Add
    </label>
  </div>
</template>

<style scoped></style>
