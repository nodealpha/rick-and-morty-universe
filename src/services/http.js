import { API_END_POINT } from '@/.env'

export default class Http {
  constructor () {
    this.endPoint = API_END_POINT
  }

  async getRes (apiPath) {
    const response = await this._fetch('GET', apiPath)
    return this._handleResponse(response)
  }

  async _fetch (method, apiPath, data = {}) {
    if (!this.endPoint) {
      throw new Error('End point not defined')
    }

    if (!apiPath) {
      throw new Error('API path is required')
    }

    const headers = {
      'Content-Type': 'application/json'
    }

    const options = {
      headers
    }

    if (method !== 'GET') {
      options.method = method
    }

    if (method !== 'GET' && method !== 'DELETE') {
      options.body = JSON.stringify(data)
    }
    return fetch(`${this.endPoint}/${apiPath}`, options)
  }

  async _handleResponse (response) {
    // on NO_CONTENT
    if (response.status === 204) {
      return response.ok
    }

    if (response.status > 199 && response.status < 300) {
      return response.json().catch(console.log)
    }

    const error = await response.json()
    throw error
  }
}
