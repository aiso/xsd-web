
function XsdService(config){
	this.config = config
}

XsdService.prototype.surl = function(url){
	return '/s'+ this.config.id +'/' + url
}
XsdService.prototype.route = function(url, params){
	router.go({ name:this.surl(url), params })
}

/*
XsdService.prototype.router = function(url, params){
	return { name:this.surl(url), params }
}

XsdService.prototype.routeItemService = function(id){
	return { name:this.surl('item/service'), params:{ id } }
}
XsdService.prototype.routeItem = function(id){
	return { name:this.surl('item'), params:{ id } }
}
*/

let services = []

const init = configs => {
	services = configs.map(config=>new XsdService(config))
}

const all = () => services
const get = sid => services.find(s=>s.config.id==sid)
const config = sid => get(sid).config

module.exports = {
	init,
	all,
	get,
	config
}