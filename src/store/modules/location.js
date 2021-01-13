export default {
  namespaced: true,

  state: {
    list: []
  },

  mutations: {
    GET_LOCATION (state, list) {
      state.list = list
    }
  }
}
