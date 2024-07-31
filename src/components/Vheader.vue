<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { authStore } from '@/stores/auth'
import LocaleSwitch from '@/components/LocaleSwitch.vue'

const route = useRoute()
const auth = authStore()
const showUserMenu = ref(false)
const searchInput = ref(null)
const mobileSearchInput = ref(null)
const showMobileSearch = ref(false)
const hideSearchIcon = ref(false)
const isSmallScreen = ref(false)
const watchScreenWidth = () => {
  isSmallScreen.value = window.innerWidth < 801
}

// used for search input, don't delete
let focusInput = () => {
  if (isSmallScreen.value) {
    hideSearchIcon.value = true
    showMobileSearch.value = true
    setTimeout(() => {
      mobileSearchInput.value.focus()
    }, 100)
    return
  }
  searchInput.value.focus()
}
onMounted(() => {
  window.addEventListener('resize', watchScreenWidth)
  isSmallScreen.value = window.innerWidth < 801
})
</script>

<template>
  <header class="flex-wrap w-full">
    <div class="md:justify-between min-h-[68px] flex bg-white justify-between">
      <!-- Left side icon and home link -->
      <div
        class="flex xsm:pl-8 max-w-1/2 py-0 px-4 justify-start items-center gap-3"
      >
        <img
          class="icon-small"
          src="@/assets/icon-small.png"
          alt=""
        />
        <div class="flex flex-wrap">
          <RouterLink
            :to="{ name: 'projects' }"
            class="flex-grow"
          >
            <button
              class="border-none text-base"
              :class="
                route.path !== '/projects'
                  ? ['text-[var(--blue)]', 'cursor-pointer']
                  : ['cursor-default']
              "
              tabindex="0"
            >
              {{ $t('projects.Projects') }}
            </button>
          </RouterLink>
        </div>
      </div>

      <!-- Search input -->
      <div
        class="flex xsm:pr-8 bg-white max-w-1/2 py-0 px-4 items-center justify-end gap-3"
      >
        <!-- <div class="flex max-w-sm bg-white">
          <input
            ref="searchInput"
            class="hidden md:flex w-full h-10 border rounded border-gray-400 pt-0 pr-8 pb-0 pl-4 text-base focus:outline-none focus:border-[var(--blue)] focus:border-2"
            type="search"
            id="search-input"
            placeholder="Search..." />
          <img
            v-if="!hideSearchIcon"
            @click="focusInput"
            class="md:flex cursor-pointer md:-translate-x-8"
            src="@/assets/search.svg"
            alt="" />
        </div> -->

        <!-- Right side name notifications and ? -->
        <div class="flex items-center gap-4">
          <div
            @click="showUserMenu = !showUserMenu"
            class="relative flex shrink-0 gap-2 cursor-pointer"
          >
            <img
              class="h-8"
              src="@/assets/Carbon-icons/Profile.svg"
              alt=""
            />
            <p class="md:flex self-center">
              {{ auth.user.name }}
            </p>
            <div
              :class="showUserMenu ? 'scale-y-100' : 'scale-y-0'"
              class="absolute w-full min-w-fit h-fit z-10 top-[calc(100%+20px)] bg-white rounded-b-lg shadow-lg transition-all duration-200 origin-top ease-out"
            >
              <ul>
                <li
                  @click="auth.logout()"
                  class="p-2 text-center border-b border-black rounded-b-lg border-t-0 border-opacity-15 hover:bg-[var(--blue-focus)]"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>

          <LocaleSwitch />

          <!-- <div
            class="shrink-0 relative cursor-pointer translate-y-0.5 after:absolute after:flex after:justify-center after:items-center after:h-4 after:w-4 after:text-white after:bg-red-500 after:rounded-[50%] after:text-[10px] after:top-[-3px] after:right-[-3px] after:content-['99']">
            <img
              src="@/assets/icons/Notification.svg"
              alt=""
              class="h-7 w-7" />
          </div> -->
          <!-- <a
            class="shrink-0 flex w-5 h-5 text-sm font-bold justify-center items-center border-2 border-black rounded-xl cursor-pointer"
            >?</a
          > -->
        </div>
      </div>
    </div>
    <!-- Bottom row mobile search -->
    <!-- <div
      class="flex justify-center items-center overflow-hidden bg-white transition duration-300 ease-linear"
      :style="{
        height:
          isSmallScreen && showMobileSearch ? '68px' : '0'
      }">
      <transition name="fade-in">
        <input
          v-if="showMobileSearch"
          type="search"
          ref="mobileSearchInput"
          class="h-10 border border-gray-400 rounded pt-0 pr-8 pb-0 pl-4 text-base absolute md:hidden focus:outline-none focus:border-[var(--blue)] focus:border-2"
          id="mobile-search-input"
          placeholder="Search..." />
      </transition>
      <transition name="fade-in">
        <img
          v-if="showMobileSearch"
          class="relative translate-x-[110px]"
          src="@/assets/search.svg"
          alt="" />
      </transition>
    </div> -->
  </header>
</template>

<style scoped></style>
