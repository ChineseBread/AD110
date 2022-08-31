import axios from 'axios'
interface RequestArgs{
    url:string
    data:any
    method?:'GET' | 'POST'
}
const doDataRequest = ({url,data,method = 'GET'}:RequestArgs):Promise<any> => {
    return new Promise( (resolve,reject) => {
        axios.request({
            url:`https://ad110.com/api${url}`,
            method,
            timeout:100000,
            params:data
        }).then(result => {
            resolve(result.data)
        }).catch(reason => {
            reject(reason)
        })
    })
}
const doRequest = ({url,data,method = 'GET'}:RequestArgs):Promise<any> => {
    const obj = method === 'GET' ? {params:data} : {data}
    return new Promise( (resolve,reject) => {
        axios.request({
            url:`https://ad110.com/api${url}`,
            method,
            timeout:100000,
            ...obj
        }).then(result => {
            resolve(result.data)
        }).catch(reason => {
            reject(reason)
        })
    })
}
const getImageUrl = (url:string):string => {
    if (!url || url.indexOf("http") !== -1) return ''
    return `https://ad110.com${url}`
}
export {doDataRequest,getImageUrl,doRequest}