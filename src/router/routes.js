// single pages
import App from '../pages/App.vue'
import notFoundPage from '../pages/NotFound.vue'

import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: App,
    meta: { title: `${DOMAIN_TITLE} | home` }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  }
]
