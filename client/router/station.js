const ROLE_STATION = 30

const routes = [
    {
      path: '/station/access',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../views/station/access'))
        }, 'group-station')
      },
      meta: { 
        icon:'material-work',
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
    '/station/access',
    '/station/user'
  ],
  home : '/station/access'
}

module.exports = {
	routes,
	navigation
}
