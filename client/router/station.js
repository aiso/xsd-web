const ROLE_STATION = 30

const routes = [
    {
      path: '/station/transes',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../views/station/transes'))
        }, 'group-station')
      },
      meta: { 
        icon:'material-work',
        title:'我的事务',
        requiresAuth: true, role: ROLE_STATION
      }
    },
    {
      path: '/station/transes/client/:id(\\d+)',
      name: '/station/transes/client',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../views/station/transes-client'))
        }, 'group-station')
      },
      meta: { 
        icon:'material-work',
        title:'事务',
        requiresAuth: true, role: ROLE_STATION
      }
    },
    {
      path: '/station/agents',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../views/station/agents'))
        }, 'group-station')
      },
      meta: { 
        icon:'material-local_offer',
        title:'我的代理',
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
    {
      path: '/station/item/:id(\\d+)',
      name: '/station/item',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../views/station/item'))
        }, 'group-station')
      },
      meta: { 
        icon:'material-local_offer',
        title:'产品',
        requiresAuth: true, role : ROLE_STATION
      }
    },
    {
      path: '/station/agent/supplier/:id(\\d+)',
      name: '/station/agent/supplier',
      component: resolve => {
        require.ensure([], () => {
          resolve(require('../views/station/agent-supplier'))
        }, 'group-station')
      },
      meta: { 
        icon:'material-local_offer',
        title:'代理',
        requiresAuth: true, role : ROLE_STATION
      }
    },
]

const navigation = {
  routes: [
    '/station/transes',
    '/station/agents',
    '/station/user'
  ],
  home : '/station/transes'
}

module.exports = {
	routes,
	navigation
}
