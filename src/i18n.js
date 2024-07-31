import { createI18n } from 'vue-i18n'
import English from '@/locales/en.json'
import Russian from '@/locales/ru.json'

function loadLocaleMessages() {
  return { English, Russian }
}
export default createI18n({
  legacy: false,
  locale: 'Russian',
  fallbackLocale: 'English',
  legacy: false,
  messages: loadLocaleMessages()
})
