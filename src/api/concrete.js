import { mainApi } from '@/api/main'

const path = 'concretes'

export const concreteRequest = {
  getAll: async function () {
    return await mainApi.get(path)
  }
}
