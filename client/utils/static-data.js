
function StaticData(data){
	this._data = data
}

StaticData.prototype.all = function(){
	return this._data
}

StaticData.prototype.get = function(id){
	return this._data[id]
}

export function createStaticData(datas){
	const keys = Object.keys(datas)
	const sd = {}
	keys.forEach(key=>{
		sd[name] = new StaticData(datas[key]) 
	})
	return sd
}