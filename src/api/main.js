import { authStore } from '@/stores/auth'
import { errorStore } from '@/stores/error'
import { getConfig } from '@/utilities/getConfig'

export const mainApi = {
  fetchData: async function (method, uri, body = {}, isFormData = false) {
    const auth = authStore()
    const error = errorStore()
    const config = getConfig()

    const headers = new Headers({
      Authorization: `Bearer ${auth.token}`
    })

    const options = {
      method,
      headers
    }

    if (method !== 'GET' && !isFormData) {
      options.body = JSON.stringify(body)
    }
    if (method === 'GET' && Object.keys(body).length) {
      uri = uri + '?' + new URLSearchParams(body).toString()
    }
    if (!isFormData) {
      headers.set('Content-Type', 'application/json')
    }
    if (isFormData) {
      options.body = this.bodyToFormData(body)
    }

    const response = await fetch(config.API.main.root + uri, options)

    const responseJSON = await response.json()
    if (!responseJSON?.status) {
      error.setError(responseJSON.message)
    }
    return responseJSON
  },
  get: async function (uri, body = {}) {
    return await this.fetchData('GET', uri, body)
  },
  delete: async function (uri) {
    return await this.fetchData('DELETE', uri)
  },
  post: async function (uri, body = {}) {
    return await this.fetchData('POST', uri, body)
  },
  put: async function (uri, body = {}) {
    return await this.fetchData('PUT', uri, body)
  },
  postFormData: async function (uri, body = {}) {
    return await this.fetchData('POST', uri, body, true)
  },
  bodyToFormData: function (body) {
    const formData = new FormData()

    Object.keys(body).forEach((key) => {
      let currentValue = body[key]

      if (Array.isArray(currentValue)) {
        currentValue.forEach((item) => {
          formData.append(`${key}[]`, item)
        })
      } else {
        formData.append(key, currentValue)
      }
    })

    return formData
  }
}
