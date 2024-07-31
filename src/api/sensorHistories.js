import { mainApi } from './main'
import { getConfig } from '@/utilities/getConfig'

const config = getConfig()
const path = 'sensor_histories'

export const sensorHistoryRequests = {
  getSensorHistory: async function (id) {
    return await mainApi.get(path + `/${id}/data`)
  },
  getForArea: async function (areaId) {
    return await mainApi.get(path, { area_id: areaId })
  },
  exportData: function (id) {
    return config.API.main.root + path + `/${id}/data/export`
  },
  importData: async function (id, file) {
    return await mainApi.postFormData(path + `/${id}/data/import`, { file })
  },
  deleteData: async function (id) {
    return await mainApi.delete(path + `/${id}/data`)
  }
}
