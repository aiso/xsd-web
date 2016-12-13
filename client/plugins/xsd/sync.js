import Promise from 'nd-promise'
import store from '../../store'
import api from './api'
import sd from './static'
import service from './service'
import action from './action'

const entities = {
	base : () => {
		return api.get('static/default').then(data=>{
		    //sd.initActions(data.actions)
		    action.init(data.actions)
		    service.init(data.services)
			return data
        })
	},
	transes : () =>{
		const user = store.getters.user
		if(!!user){
			return api.get(sd.roleName(user.role)+'/transes').then(data=>{
				store.commit('SET_TRANSES', data.transes)
				return data
	        })
		}else
			Promise.resolve()
	},
	items : () =>{
		const user = store.getters.user
		if(!!user){
			return api.get(sd.roleName(user.role)+'/items').then(data=>{
				store.commit('SET_ITEMS', data.items)
				return data
	        })
		}else
			Promise.resolve()
	},
	/*
	works : () => {
		if(!!store.getters.user){
			return api.get('user/works/all').then(data=>{
				store.commit(SET_WORKS, data.works)
				return data
	        })
		}else
			Promise.resolve()
	}*/
}

const loadEntity = (...names) => {
	if(names.length == 0)
		return Promise.reject('name error!')
	else if(names.length == 1)
		return (!!entities[names[0]])?entities[names[0]]():Promise.reject('name error!')
	else
		return Promise.all(names.map(name=>loadEntity(name)))
}

module.exports = {
	load : loadEntity,
	loadAll: ()=>{
		const names = Object.keys(entities)
		return Promise.all(names.map(name=>loadEntity(name)))
	}

}