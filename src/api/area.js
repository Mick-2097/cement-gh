import { mainApi } from './main'

const path = 'areas'

export const areaRequest = {
  getAll: async function (objectID) {
    return await mainApi.get(path, { building_object_id: objectID })
  },
  get: async function (areaID) {
    return await mainApi.get(`${path}/${areaID}`)
  },
  getLimited: async function (body) {
    return await mainApi.get(path, body)
  },
  create: async function (body) {
    return await mainApi.post(path, body)
  },
  update: async function (areaID, body) {
    return await mainApi.put(`${path}/${areaID}`, body)
  },
  delete: async function (areaID) {
    return await mainApi.delete(`${path}/${areaID}`)
  }
}
