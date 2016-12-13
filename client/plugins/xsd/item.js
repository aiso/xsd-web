import Promise from 'nd-promise'
import api from './api'

const _items = []

module.exports = {
  get(id){
    if(id instanceof Array){
      const reqs = id.filter(i=>typeof(_items[i]) == 'undefined')
      if(reqs.length > 0){
        return api.get('items/'+reqs.join(',')+'?with=images&fields=content').then(data=>{
          data.items.forEach(i=>{
            _items[i.id] = i
          })
          return id.map(i=>_items[i])
        })
      }else{
        return Promise.resolve(id.map(i=>_items[i]))
      }
    }else if(typeof(id) === 'number'){
      if(!!_items[id])
        return Promise.resolve(_items[id])
      else
        return api.get('item/'+id+'?with=images&fields=content').then(data=>{
          _items[id] = data.item
          return data.item
        })
    }else if(typeof(id) === 'string'){
      return this.get(parseInt(id))
    }else
      return Promise.resolve(null)
  },
  dirty(id){
    delete _items[id]
  }
}