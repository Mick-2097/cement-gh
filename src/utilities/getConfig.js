import development from '/config/development'
import production from '/config/production'

export function getConfig() {
  const configs = {
    development,
    production
  }
  return configs[import.meta.env.MODE]
}
