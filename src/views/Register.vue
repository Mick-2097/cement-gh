<script setup>
import { RouterLink } from 'vue-router'
import Vbutton from '@/components/Vbutton.vue'
</script>

<template>
  <section
    class="flex w-screen h-screen justify-center items-center bg-[var(--bg)]"
  >
    <div
      class="flex flex-col gap-5 min-w-fit grow max-w-[400px] bg-white rounded-xl p-6 shadow-2xl"
    >
      <img
        class="self-center h-[82px] w-[82px]"
        src="@/assets/icon-small.png"
        alt=""
      />
      <h1 class="self-center text-2xl font-normal">
        {{ $t('login.Registration') }}
      </h1>
      <div>
        <label
          class="cursor-pointer text-[13px]"
          for="email"
        >
          {{ $t('login.E-mail') }}
        </label>
        <input
          class="w-full h-10 outline-none border border-black border-opacity-40 rounded pl-4 focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="text"
          id="email"
        />
      </div>
      <div class="input-wrap">
        <label
          class="cursor-pointer text-[13px]"
          for="password"
        >
          {{ $t('login.Password') }}
        </label>
        <input
          class="w-full h-10 outline-none border border-black border-opacity-40 rounded pl-4 focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="text"
          id="password"
        />
      </div>
      <Vbutton :buttonText="$t('buttons.Create-an-account')" />
      <div class="flex justify-center text-base">
        <RouterLink to="/test-login">
          {{ $t('login.Already-have-an-account?') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
