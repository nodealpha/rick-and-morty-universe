// single pages
import Home from '../pages/Home.vue'
import Character from '../pages/Character.vue'
import notFoundPage from '../pages/NotFound.vue'

import { DOMAIN_TITLE } from '../.env'

export const routes = [
  {
    path: '/',
    name: 'index',
    component: Home,
    meta: { title: `${DOMAIN_TITLE} | home` }
  },
  {
    path: '/character/:id',
    name: 'character',
    component: Character,
    meta: { title: `${DOMAIN_TITLE} | character` }
  },
  {
    path: '*',
    component: notFoundPage,
    meta: { title: `${DOMAIN_TITLE} | not found` }
  }
]
