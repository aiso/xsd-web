import Promise from 'nd-promise'
import store from '../../store'
import request from '../../utils/request'
import base64 from '../../utils/base64'


const xsdCache = []
let _requestQue = []

function chkAuth(){
	const user = store.getters.user
	if(!!user){
	  return  { mutate: options => {
	    //console.log(user);
	    options['headers']['Authorization'] = base64.encode(user.id + ":" + user.token);
	    return Promise.resolve(options)
	  } }
	}

	return null
}

const _request = options => {
  return request(Object.assign(options, chkAuth())).then(data => {
    if(!!data.aiso_auth_refresh){
      store.commit('SET_USER', data.aiso_auth_refresh)
    }
    return data;
  }).catch(result=>{
    //console.log(options)
    //console.log(result)
    if(result.error.code == 401){
      store.commit('SET_AUTH', null);
      router.go({ name:'login' })
    }else{
      const toast = { _id:Date.now() ,class:'error', timeout:0, message:result.error.message, remove:()=>{
        store.commit('DELETE_TOAST', toast)
      } }
      store.commit('ADD_TOAST', toast)
      //this.$alert.error(result)
    }

    return Promise.reject(result)
  }).finally(result=>{
    _requestQue = _requestQue.filter(r=>r.url!=options.url)

  })
}


const apiGet = url => {
  if(typeof(url) == 'string'){
    //return _request({ url })

    let req = _requestQue.find(r=>r.url==url)
    if(!!req){
      return req.promise
    }else{
      req = { url, promise:_request({ url }) }
      _requestQue.push(req)
      return req.promise
    }
  }
  else if(url instanceof Array){
    return Promise.all(url.map(u=>apiGet(u)))
  }
}
const apiPost = (url, data) => _request({ url, method:'POST', params:data })
const apiDelete = url => _request({ url, method:'DELETE' })
const apiGetCache = (url, dirty = false) => {
  if(typeof(url) == 'string'){
    if(!!xsdCache[url] && xsdCache[url].dirty !== true && dirty === false )
      return Promise.resolve(xsdCache[url])
    else{
      return apiGet(url).then(data=>{
        xsdCache[url] = data
        return data
      })
    }
  }
  else if(url instanceof Array){
    return Promise.all(url.map(u=>apiGetCache(u, dirty)))
  }
}

const api = {
  get:apiGet,
  post:apiPost,
  delete:apiDelete,
  getCache:apiGetCache,
  dirty(url){
    if(!!xsdCache[url]) xsdCache[url].dirty = true
  }
}

export default api