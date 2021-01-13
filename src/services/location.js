import Http from './http'

class Location extends Http {
  async get () {
    return this.getRes('location')
  }
}

export default new Location()
