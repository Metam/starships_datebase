import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Ship from '@/components/Ship'
import Page404 from '@/components/Page404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/1'
    },
    {
      path: '/:id',
      component: Main,
      name: 'main'
    },
    {
      path: '/ship/:id',
      component: Ship,
      name: 'ship'
    },
    {
      name: '404',
      path: '*',
      component: Page404
    }
  ],
  mode: 'history',
  scrollBehavior (to, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})
