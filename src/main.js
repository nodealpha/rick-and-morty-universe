import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import AppLayout from './layout/index.vue'
import router from './router'

import './scss/style.scss'

Vue.config.productionTip = false

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('serviceWorker.js')
}

new Vue({
  name: 'Root',
  router,
  render: h => h(AppLayout)
}).$mount('#app')
