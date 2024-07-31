import { mainApi } from '@/api/main'

const path = 'projects'

export const projectRequest = {
  getAll: async function (companyID) {
    return await mainApi.get(path, { company_id: companyID })
  },
  get: async function (projectID) {
    return await mainApi.get(`${path}/${projectID}`)
  },
  create: async function (body) {
    return await mainApi.post(`${path}?`, body)
  },
  update: async function (projectID, body) {
    return await mainApi.put(`${path}/${projectID}`, body)
  },
  delete: async function (projectID) {
    return await mainApi.delete(`${path}/${projectID}`)
  }
}
