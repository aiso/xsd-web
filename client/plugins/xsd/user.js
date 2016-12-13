import store from '../../store'
import api from './api'
import staticData from './static'

module.exports = {
  login: auth=>{
    return api.post('user/login', auth).then( data => {
      store.commit('SET_AUTH', { user:data.user, profile:data.profile });
      return data.user
    }).then(user=>{
      if(user.role == staticData.role.client){
        return false
        /*
        store.commit('SET_NAVIGATIONS', require('../../router/client').navigation)
        return true
        */
        /*
        return api.get('client/props').then(data=>{
          store.commit(SET_FAVORITES, data.favorites)
          return true
        })*/
      }
      else if(user.role == staticData.role.supplier){
        store.commit('SET_NAVIGATIONS', require('../../router/supplier').navigation)
        return true
      }
      else if(user.role == staticData.role.station){
        store.commit('SET_NAVIGATIONS', require('../../router/station').navigation)
        return true
      }else
        return false
    })
  },
  logout: ()=>{
    store.commit('SET_AUTH', null)
  }
}