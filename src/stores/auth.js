import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Keycloak from 'keycloak-js'
import { getConfig } from '@/utilities/getConfig'

export const authStore = defineStore('auth', () => {
  const user = ref({})
  const token = ref('')
  const config = getConfig()

  const isDeveloper = computed(() => {
    return hasRole('developer')
  })

  const isAdmin = computed(() => {
    return hasRole('bimadmin')
  })

  async function getKeycloakInstance() {
    return new Keycloak({
      url: config.KEYCLOAK.url,
      realm: config.KEYCLOAK.realm,
      clientId: config.KEYCLOAK.clientId
    })
  }

  async function initialize() {
    const keycloak = await getKeycloakInstance()

    await keycloak.init({
      onLoad: 'login-required'
    })

    user.value = keycloak.tokenParsed
    token.value = keycloak.token
  }

  async function logout() {
    token.value = null
    const keycloak = await getKeycloakInstance()
    await keycloak.init({})
    await keycloak.logout()
  }

  function hasRole(roleName) {
    const rolesList =
      user.value?.resource_access[config.KEYCLOAK.clientId]?.roles

    if (!rolesList) {
      return false
    }

    return rolesList.includes(roleName)
  }

  return {
    user,
    token,
    isDeveloper,
    isAdmin,
    initialize,
    logout
  }
})
