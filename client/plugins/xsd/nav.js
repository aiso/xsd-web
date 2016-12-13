import Promise from 'nd-promise'
import store from '../../store'

const _baseUrl = () => {
	if(window.location.href.indexOf('localhost') > 0)
		return 'http://localhost/xiansda/1'
	else 
		return 'http://xiansda.sinaapp.com'
}

const payment = id => {
	window.location.href = _baseUrl() + '/weixin/wx_jspay.php?payment='+id
}

const back = () => {
	history.back()
}

module.exports = {
	payment,
	back
}