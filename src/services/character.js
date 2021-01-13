import Http from './http'

class Character extends Http {
  async get (id) {
    if (!id) {
      throw new Error('Character ID is required')
    }
    return this.getRes(`character/${id}`)
  }

  async getEpisode (id) {
    if (!id) {
      throw new Error('Episode ID is required')
    }
    return this.getRes(`episode/${id}`)
  }
}

export default new Character()
