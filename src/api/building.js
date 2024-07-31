import { mainApi } from '@/api/main'

const path = 'buildings'

export const buildingRequest = {
  getAll: async function (objectID) {
    return await mainApi.get(path, {
      building_object_id: objectID,
      is_full: true
    })
  },
  get: async function (buildingID) {
    return await mainApi.get(`${path}/${buildingID}`)
  },
  create: async function (body) {
    return await mainApi.post(path, body)
  },
  update: async function (buildingID, body) {
    return await mainApi.put(`${path}/${buildingID}`, body)
  },
  delete: async function (buildingID) {
    return await mainApi.delete(`${path}/${buildingID}`)
  }
}
