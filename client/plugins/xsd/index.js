/* global Vue */
import store from '../../store'
import api from './api'
import sync from './sync'


const xsd = {}
xsd.install = function (Vue) {
	if(this.installed) return;

	Object.defineProperties(Vue.prototype, {
	  xsd:{
      get() {
        return {
          api,
          sync,
          item:require('./item'),
          user:require('./user'),
          service:require('./service'),
          action:require('./action'),
          static:require('./static'),
          nav:require('./nav'),
          trans:require('./trans'),
          regex:require('./regex'),
          state: {
            normal:'normal',
            loading:'loading'
          } 
        }
      }
	  },
    $alert: {
      get () {
        return this.$root.$refs.xsdAlert
      }
    },
    $confirm: {
      get () {
        return this.$root.$refs.xsdConfirm
      }
    },
    $textbox: {
      get () {
        return this.$root.$refs.xsdTextbox
      }
    },
    $navbar: {
      get () {
        return this.$root.$refs.xsdNavbar
      }
    },
  
 	})

  require('./filter').install(Vue)
  
	this.installed = true;
}

xsd.init = () =>{
  return sync.load('base')
}

if (window.Vue) {
  //window.xsd = xsdModules
  Vue.use(xsd)
}

module.exports = xsd