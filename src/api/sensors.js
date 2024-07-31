import { mainApi } from './main'

const path = 'sensors'

export const sensorRequest = {
  getForBuildingObject: async function (id) {
    return await mainApi.get(path, {
      building_object_id: id
    })
  },
  getAll: async function () {
    return await mainApi.get(path)
  },
  getLimited: async function (limit) {
    return await mainApi.get(path, limit)
  },
  get: async function (sensorID) {
    return await mainApi.get(`${path}/${sensorID}`)
  },
  update: async function (sensorID, body) {
    return await mainApi.put(`${path}/${sensorID}`, body)
  },
  install: async function (serialNumber, monitoringSpotId) {
    return await mainApi.put(`${path}/install`, {
      monitoring_spot_id: monitoringSpotId,
      serial_number: serialNumber
    })
  },
  uninstall: async function (serialNumber) {
    return await mainApi.put(`${path}/install`, {
      monitoring_spot_id: null,
      serial_number: serialNumber
    })
  }
}
