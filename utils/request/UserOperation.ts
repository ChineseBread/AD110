import {doDataRequest, doRequest} from "@utils/request/request";

class UserOperation{

    static sendBlogComment(logid:BlogInfoData['log_id'],nickname:string,comment:string,website:string,email:string):Promise<Result<BlogComment>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'/blog_comment/write_comment',data:{logid,nickname,comment,website,email}})
                if (result.Ok){
                    resolve({Ok:true,comm_id:result.Data.commid,comm_postip:result.Data.ip})
                }else{
                    resolve({Ok:false})
                }
            }catch (e) {
                resolve({Ok:false})
            }
        })
    }
    static likeBlog(logid:BlogInfoData['log_id']):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            let result = await doRequest({url:'/blog_content/like_blog',data:{logid}})
            resolve({Ok:result.Ok,Msg:result.Msg || '服务器异常请稍后'})
        })
    }
    static likeUrl(urlid:BlogLink['url_id']):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            let result = await doRequest({url:'/web_urls/like_url',data:{urlid}})
            resolve({Ok:result.Ok,Msg:result.Msg || '服务器异常请稍后'})
        })
    }
    static uploadUrl(name:string,url:string,info:string):Promise<Result<any>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doRequest({url:'/submit/submit_url',data:{name,url,info},method:'POST'})
                resolve({Ok:result?.Ok,Msg:result.Msg || '请求超时'})
            }catch (e){
                resolve({Ok:false})
            }
        })
    }

    /**
     * @description 点击链接增加浏览量
     */
    static async clickUrl(urlid:BlogLink['url_id']):Promise<Result<void>>{
        await doRequest({url:'/web_urls/hit_url',data:{urlid}})
    }

    static getSearchData(keyword:string,page = 1):Promise<Result<{SearchData:{BlogList:BlogData[],UrlList:BlogLink[],total:number}}>>{
        return new Promise(async (resolve,reject) => {
            try {
                let result = await doDataRequest({url:'/search/search_all',data:{keyword,page}})
                if (result.Ok){
                    const {Data:{Blog,Urls}} = result
                    resolve({Ok:true,SearchData:{BlogList:Blog.data,UrlList:Urls.data,total:Blog.total + Urls.total}})
                }else{
                    resolve({Ok:false})
                }
            }catch (e) {
                resolve({Ok:false})
            }
        })
    }
}
export default UserOperation