import { mainApi } from '@/api/main'

const path = 'monitoring_spots'

export const spotRequest = {
  getAll: async function (buildingID) {
    return await mainApi.get(path, { building_id: buildingID })
  },
  get: async function (spotID) {
    return await mainApi.get(`${path}/${spotID}`)
  },
  create: async function (body) {
    return await mainApi.post(path, body)
  },
  update: async function (spotID, body) {
    return await mainApi.put(`${path}/${spotID}`, body)
  },
  delete: async function (spotID) {
    return await mainApi.delete(`${path}/${spotID}`)
  }
}
