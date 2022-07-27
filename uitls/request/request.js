import axios from "axios";
import qs from 'qs'
function doRequest({url,data,method = 'GET'}){
	data = getQueryData(data)
	return new Promise((resolve, reject) => {
		axios.request({
			url:`http://server.watish.xyz:9501${url}?${data}`,
			method,
			timeout:10000
		}).then(value => {
			resolve(value.data)
		},reason => {
			reject(reason)
		})
	})
}
function doDataRequest({url,data,method = 'GET'}){
	data = getQueryData(data)
	return new Promise((resolve, reject) => {
		axios.request({
			url:`http://server.watish.xyz:9501${url}?${data}`,
			method,
			timeout:10000
		}).then(value => {
			resolve(value.data)
		},reason => {
			reject(reason)
		})
	})
}
function getImageUrl(url){
	if (!url || url.indexOf("http") !== -1) return ''
	return `http://server.watish.xyz:4090${url}`
}
function getQueryData(data) {
	return qs.stringify(data, {
		encoder: function (str, defaultEncoder, charset, type) {
			if (type === 'value' || type === 'key') return encodeURIComponent(str);
		}
	})
}
export {doDataRequest,doRequest,getImageUrl}