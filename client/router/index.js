import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)


let routes = [
    {
      path: '/',
      component: require('../views/Home')
    },
    {
      path: '/login',
      component: require('../views/Login')
    },
    {
      path: '/map/location',
      component: require('../views/map/location')
    },
    {
      path: '/demo/validator',
      component: require('../views/demo/Validator'),
      //meta: { requiresAuth: true }      
    },   
    {
      path: '/demo/lists',
      component: require('../views/demo/Lists'),
    }, 
]

import supplier from './supplier'
routes = routes.concat(supplier.routes)

import station from './station'
routes = routes.concat(station.routes)

import utils from './utils'
routes = routes.concat(utils.routes)

const router = new Router({
  mode: 'hash',
  routes
})

//  auth check
router.beforeEach((to, from, next) => {
  //if (to.matched.some(record => record.meta.requiresAuth)) {
  if(to.meta.requiresAuth === true){
    const user = store.getters.user
    if (!user) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else if(typeof(to.meta.role) == 'number' && to.meta.role != user.role){
      next(false)
      alert('角色错误！')
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
