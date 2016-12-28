const ROLE_STATION = 30

const routes = [
    {
      path: '/station/posts',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../views/station/posts'))
        }, 'group-station')
      },
      meta: { 
        icon:'material-local_offer',
        title:'代理产品',
        requiresAuth: true, role: ROLE_STATION
      }
    },
    {
      path: '/station/access',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../views/station/access'))
        }, 'group-station')
      },
      meta: { 
        icon:'material-person_add',
        title:'人员接入',
        requiresAuth: true, role: ROLE_STATION
      }
    },
    {
      path: '/station/user',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../views/station/user'))
        }, 'group-station')
      },
      meta: { 
        icon:'material-person',
        title:'用户',
        requiresAuth: true, role : ROLE_STATION
      }
    },
]

const navigation = {
  routes: [
    '/station/posts',
    '/station/access',
    '/station/user'
  ],
  home : '/station/access'
}

module.exports = {
	routes,
	navigation
}
