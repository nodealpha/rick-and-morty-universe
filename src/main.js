import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import AppLayout from './layout/index.vue'
import router from './router'
import store from './store'

import './mixins'
import './thirdParty'

import './scss/style.scss'

Vue.config.productionTip = false

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceWorker.js')
}

new Vue({
  name: 'Root',
  router,
  store,
  mounted () {
    store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth)
    window.addEventListener('resize', () => store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth))
  },

  beforeDestroy () {
    window.removeEventListener('resize', () => store.commit('dom/SET_WINDOW_WIDTH', window.innerWidth))
  },
  render: h => h(AppLayout)
}).$mount('#app')
