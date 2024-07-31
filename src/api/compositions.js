import { mainApi } from '@/api/main'

const path = 'concrete_compositions'

export const compositionRequest = {
  getAll: async function (companyID) {
    return await mainApi.get(path, { company_id: companyID })
  },
  get: async function (compositionID) {
    return await mainApi.get(`${path}/${compositionID}`)
  },
  create: async function (body) {
    return await mainApi.post(path, body)
  },
  update: async function (compositionID, body) {
    return await mainApi.put(`${path}/${compositionID}`, body)
  },
  delete: async function (compositionID) {
    return await mainApi.delete(`${path}/${compositionID}`)
  }
}
