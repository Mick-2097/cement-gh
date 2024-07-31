import { mainApi } from '@/api/main'

const path = 'building_objects'

export const objectRequest = {
  getAll: async function (projectID) {
    return await mainApi.get(path, { project_id: projectID })
  },
  get: async function (objectID) {
    return await mainApi.get(`${path}/${objectID}`)
  },
  create: async function (body) {
    return await mainApi.post(path, body)
  },
  update: async function (objectID, body) {
    return await mainApi.put(`${path}/${objectID}`, body)
  },
  delete: async function (objectID) {
    return await mainApi.delete(`${path}/${objectID}`)
  }
}
