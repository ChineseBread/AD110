import axios from "axios";
import qs from 'qs'
function doRequest({url,data,method = 'GET'}){
	data = getQueryData(data)
	return new Promise((resolve, reject) => {
		axios.request({
			// type your api server here
			//all the requests will be send by these two function
			url:`https://ad110.com${url}?${data}`,
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
			url:`https://ad110.com${url}?${data}`,
			method,
			timeout:10000
		}).then(value => {
			resolve(value.data)
		},reason => {
			reject(reason)
		})
	})
}
// this is the function which you get the image src from
function getImageUrl(url){
	// your can remove this if your are sure that all the image urls are not undefined
	if (!url || url.indexOf("http") !== -1) return ''
	// type your own image url server here
	return `https://ad110.com${url}`
}
function getQueryData(data) {
	return qs.stringify(data, {
		encoder: function (str, defaultEncoder, charset, type) {
			if (type === 'value' || type === 'key') return encodeURIComponent(str);
		}
	})
}
export {doDataRequest,doRequest,getImageUrl}
