import {app, xsd} from './app'

xsd.init().then(()=>{
  app.$mount('#app')
}).catch(err=>{
  console.log(err)
})

//app.$mount('#app')
