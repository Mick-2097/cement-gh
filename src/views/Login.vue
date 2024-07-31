<script setup>
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
        class="self-center h-[82px ] w-[82px]"
        src="@/assets/icon-small.png"
        alt=""
      />
      <h1 class="self-center text-2xl font-normal">
        {{ $t('login.Login') }}
      </h1>
      <div
        class="bg-[var(--beige)] w-full h-10 rounded flex justify-center items-center px-4 gap-2"
      >
        <!-- <img
          src="@/assets/error.svg"
          alt=""
        /> -->
        <p class="text-[13px] text-[var(--red)] text-center">
          {{ $t('login.Incorrect-email-or-password') }}
        </p>
      </div>
      <div class="h-[60px]">
        <label
          class="text-[13px] cursor-pointer"
          for="login"
        >
          {{ $t('login.E-mail') }}
        </label>
        <input
          class="w-full h-10 pl-4 border border-black border-opacity-40 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="text"
          id="login"
        />
      </div>
      <div>
        <label
          class="text-[13px] cursor-pointer"
          for="password"
        >
          {{ $t('login.Password') }}
        </label>
        <input
          class="w-full h-10 pl-4 border border-black border-opacity-40 rounded focus:outline-none focus:border-[var(--blue)] focus:border-2"
          type="text"
          id="password"
        />
      </div>
      <Vbutton :buttonText="$t('login.Enter')" />

      <div class="flex justify-between gap-4 text-base">
        <a class="cursor-pointer hover:text-[var(--blue)]">
          {{ $t('login.Forgot-password?') }}
        </a>
        <RouterLink
          class="cursor-pointer hover:text-[var(--blue)]"
          to="/register"
        >
          {{ $t('login.Registration') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
