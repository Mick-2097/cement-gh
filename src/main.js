import '@/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authStore } from '@/stores/auth'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import i18n from '@/i18n'
import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(i18n)

const auth = authStore()
await auth.initialize()

app.mount('#app')
