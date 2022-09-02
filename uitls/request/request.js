import axios from "axios";
function doRequest({url,data,method = 'GET'}){
	const dataObj = method.toUpperCase() === 'GET' ? {params:data} : {data}
	return new Promise((resolve, reject) => {
		axios.request({
			url:`https://ad110.com/api${url}`,
			// url:`/api${url}`,
			...dataObj,
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
	const dataObj = method.toUpperCase() === 'GET' ? {params:data} : {data}
	return new Promise((resolve, reject) => {
		axios.request({
			url:`https://ad110.com/api${url}`,
			// url:`/api${url}`,
			...dataObj,
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
	return `https://ad110.com${url}`
}
export {doDataRequest,doRequest,getImageUrl}
